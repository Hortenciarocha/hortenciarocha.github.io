import { NextResponse } from 'next/server'
import type { ApiResponse, ApiError } from '@/types'

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string = 'INTERNAL_ERROR',
    public status: number = 500
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 'NOT_FOUND', 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Acesso proibido') {
    super(message, 'FORBIDDEN', 403)
  }
}

export function successResponse<T>(
  data: T,
  meta?: Record<string, any>
): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  }
}

export function errorResponse(
  error: ApiError | AppError | Error
): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.status }
    )
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  )
}

export async function handleApiError(
  error: unknown
): Promise<NextResponse> {
  console.error('[API Error]', error)

  if (error instanceof AppError) {
    return errorResponse(error)
  }

  if (error instanceof Error) {
    return errorResponse(error)
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Erro desconhecido',
        code: 'UNKNOWN_ERROR',
      },
    },
    { status: 500 }
  )
}
