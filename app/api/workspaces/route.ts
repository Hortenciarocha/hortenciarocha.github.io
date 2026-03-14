import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { workspaceService } from '@/services/workspace-service'
import { createWorkspaceSchema } from '@/lib/validations'
import { successResponse, handleApiError } from '@/lib/error-handler'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Não autenticado' } },
        { status: 401 }
      )
    }

    const workspaces = await workspaceService.getUserWorkspaces(session.user.id)

    return NextResponse.json(
      successResponse(workspaces, {
        total: workspaces.length,
      })
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Não autenticado' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validData = await createWorkspaceSchema.parseAsync(body)

    const workspace = await workspaceService.createWorkspace(
      session.user.id,
      validData
    )

    return NextResponse.json(
      successResponse(workspace),
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
