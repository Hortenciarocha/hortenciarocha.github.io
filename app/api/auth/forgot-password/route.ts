import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { successResponse, handleApiError } from '@/lib/error-handler'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Email é obrigatório', code: 'MISSING_EMAIL' },
        },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    })

    // Always return success for security reasons (don't leak if email exists)
    // TODO: Send reset email
    return NextResponse.json(
      successResponse({
        message: 'Se o email existe, você receberá instruções',
      })
    )
  } catch (error) {
    return handleApiError(error)
  }
}
