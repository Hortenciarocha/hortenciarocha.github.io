import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { workspaceService } from '@/services/workspace-service'
import { successResponse, handleApiError, AppError } from '@/lib/error-handler'
import { z } from 'zod'

type RouteParams = {
  params: {
    id: string
    memberId: string
  }
}

const updateMemberSchema = z.object({
  roleId: z.string().min(1, 'roleId é obrigatório'),
})

export async function DELETE(
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

    await workspaceService.removeMember(
      params.id,
      session.user.id,
      params.memberId
    )

    return NextResponse.json(successResponse(null))
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
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
    const validData = await updateMemberSchema.parseAsync(body)

    const member = await workspaceService.updateMemberRole(
      params.id,
      session.user.id,
      params.memberId,
      validData.roleId
    )

    return NextResponse.json(successResponse(member))
  } catch (error) {
    return handleApiError(error)
  }
}
