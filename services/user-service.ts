import { db } from '@/lib/db'
import { AppError } from '@/lib/error-handler'
import type { UserProfile } from '@/types'

export class UserService {
  async getUserById(userId: string): Promise<UserProfile> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        emailVerified: true,
      },
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 'NOT_FOUND', 404)
    }

    return user
  }

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        emailVerified: true,
      },
    })

    return user
  }

  async updateUser(
    userId: string,
    data: {
      name?: string
      image?: string
    }
  ): Promise<UserProfile> {
    const user = await db.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        emailVerified: true,
      },
    })

    return user
  }

  async deleteUser(userId: string): Promise<void> {
    // Delete user and cascade delete related records
    await db.user.delete({
      where: { id: userId },
    })
  }

  async getUserWorkspaceRole(
    userId: string,
    workspaceId: string
  ): Promise<{ role: string; permissions: string[] } | null> {
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member) {
      return null
    }

    return {
      role: member.role.name,
      permissions: member.role.permissions,
    }
  }
}

export const userService = new UserService()
