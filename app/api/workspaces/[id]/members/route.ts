import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { workspaceService } from '@/services/workspace-service'
import { inviteMemberSchema } from '@/lib/validations'
import { successResponse, handleApiError } from '@/lib/error-handler'

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const members = await workspaceService.getWorkspaceMembers(params.id)
    return NextResponse.json(
      successResponse(members, { total: members.length })
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Não autenticado' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validData = await inviteMemberSchema.parseAsync(body)

    const member = await workspaceService.inviteMember(
      params.id,
      session.user.id,
      validData
    )

    return NextResponse.json(
      successResponse(member),
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
