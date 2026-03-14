import { db } from '@/lib/db'
import { AppError, ValidationError } from '@/lib/error-handler'
import type { WorkspaceData, WorkspaceMemberData } from '@/types'

export class WorkspaceService {
  async createWorkspace(
    userId: string,
    data: {
      name: string
      slug: string
      description?: string
    }
  ): Promise<WorkspaceData> {
    // Check if slug is unique
    const existingWorkspace = await db.workspace.findUnique({
      where: { slug: data.slug },
    })

    if (existingWorkspace) {
      throw new ValidationError('Este slug já está em uso')
    }

    // Create workspace
    const workspace = await db.workspace.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    })

    // Get admin role
    const adminRole = await db.role.findUnique({
      where: { name: 'admin' },
    })

    if (!adminRole) {
      throw new AppError('Role de admin não encontrada')
    }

    // Add creator as admin
    await db.workspaceMember.create({
      data: {
        userId,
        workspaceId: workspace.id,
        roleId: adminRole.id,
      },
    })

    return workspace
  }

  async getWorkspace(workspaceId: string): Promise<WorkspaceData> {
    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
    })

    if (!workspace) {
      throw new AppError('Workspace não encontrado', 'NOT_FOUND', 404)
    }

    return workspace
  }

  async getUserWorkspaces(userId: string): Promise<WorkspaceData[]> {
    const members = await db.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
    })

    return members.map(m => m.workspace)
  }

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    data: {
      name?: string
      description?: string
    }
  ): Promise<WorkspaceData> {
    // Check if user is admin
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member || member.role.name !== 'admin') {
      throw new AppError('Acesso negado', 'FORBIDDEN', 403)
    }

    const workspace = await db.workspace.update({
      where: { id: workspaceId },
      data,
    })

    return workspace
  }

  async deleteWorkspace(workspaceId: string, userId: string): Promise<void> {
    // Check if user is admin
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member || member.role.name !== 'admin') {
      throw new AppError('Acesso negado', 'FORBIDDEN', 403)
    }

    // Delete workspace (cascade delete will handle members, subscriptions, etc)
    await db.workspace.delete({
      where: { id: workspaceId },
    })
  }

  async inviteMember(
    workspaceId: string,
    userId: string,
    inviteData: {
      email: string
      roleId: string
    }
  ): Promise<WorkspaceMemberData> {
    // Check if user is admin
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member || member.role.name !== 'admin') {
      throw new AppError('Acesso negado', 'FORBIDDEN', 403)
    }

    // Find user by email
    const invitedUser = await db.user.findUnique({
      where: { email: inviteData.email },
    })

    if (!invitedUser) {
      throw new AppError('Usuário não encontrado', 'NOT_FOUND', 404)
    }

    // Check if user is already member
    const existingMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: invitedUser.id,
          workspaceId,
        },
      },
    })

    if (existingMember) {
      throw new ValidationError('Usuário já é membro do workspace')
    }

    // Add member
    const newMember = await db.workspaceMember.create({
      data: {
        userId: invitedUser.id,
        workspaceId,
        roleId: inviteData.roleId,
      },
      include: { user: true, role: true },
    })

    return newMember
  }

  async removeMember(
    workspaceId: string,
    userId: string,
    memberId: string
  ): Promise<void> {
    // Check if user is admin
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member || member.role.name !== 'admin') {
      throw new AppError('Acesso negado', 'FORBIDDEN', 403)
    }

    // Remove member
    await db.workspaceMember.delete({
      where: { id: memberId },
    })
  }

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    memberId: string,
    roleId: string
  ): Promise<WorkspaceMemberData> {
    // Check if user is admin
    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      include: { role: true },
    })

    if (!member || member.role.name !== 'admin') {
      throw new AppError('Acesso negado', 'FORBIDDEN', 403)
    }

    // Update member role
    const updatedMember = await db.workspaceMember.update({
      where: { id: memberId },
      data: { roleId },
      include: { user: true, role: true },
    })

    return updatedMember
  }

  async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMemberData[]> {
    const members = await db.workspaceMember.findMany({
      where: { workspaceId },
      include: { user: true, role: true },
    })

    return members
  }
}

export const workspaceService = new WorkspaceService()
