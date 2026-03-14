import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { workspaceService } from '@/services/workspace-service'
import { updateWorkspaceSchema } from '@/lib/validations'
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
    const workspace = await workspaceService.getWorkspace(params.id)
    return NextResponse.json(successResponse(workspace))
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
    const validData = await updateWorkspaceSchema.parseAsync(body)

    const workspace = await workspaceService.updateWorkspace(
      params.id,
      session.user.id,
      validData
    )

    return NextResponse.json(successResponse(workspace))
  } catch (error) {
    return handleApiError(error)
  }
}

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

    await workspaceService.deleteWorkspace(params.id, session.user.id)

    return NextResponse.json(successResponse(null))
  } catch (error) {
    return handleApiError(error)
  }
}
