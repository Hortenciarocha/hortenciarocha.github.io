import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { registerSchema } from '@/lib/validations'
import { successResponse, handleApiError, ValidationError } from '@/lib/error-handler'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = await registerSchema.parseAsync(body)

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validation.email },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Este email já está registrado',
            code: 'USER_EXISTS',
          },
        },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validation.password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email: validation.email,
        name: validation.name,
        password: hashedPassword,
      },
    })

    // Create default workspace
    const workspace = await db.workspace.create({
      data: {
        name: `${validation.name}'s Workspace`,
        slug: validation.name.toLowerCase().replace(/\s+/g, '-'),
      },
    })

    // Get admin role
    const adminRole = await db.role.findUnique({
      where: { name: 'admin' },
    })

    // Add user to workspace
    if (adminRole) {
      await db.workspaceMember.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          roleId: adminRole.id,
        },
      })
    }

    // TODO: Send verification email

    return NextResponse.json(
      successResponse({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
