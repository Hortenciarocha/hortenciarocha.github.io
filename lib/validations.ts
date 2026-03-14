import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

export type RegisterInput = z.infer<typeof registerSchema>

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

// Workspace Schemas
export const createWorkspaceSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string().min(2, 'Slug deve ter pelo menos 2 caracteres').regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  description: z.string().max(500, 'Descrição muito longa').optional(),
})

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>

export const inviteMemberSchema = z.object({
  email: z.string().email('Email inválido'),
  roleId: z.string().min(1, 'Role é obrigatória'),
})

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>

// Subscription Schemas
export const createSubscriptionSchema = z.object({
  planId: z.string().min(1, 'Plano é obrigatório'),
  workspaceId: z.string().min(1, 'Workspace é obrigatório'),
})

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>

// Pagination Schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
})

export type PaginationInput = z.infer<typeof paginationSchema>

// Helper function to validate data
export async function validateData<T>(
  schema: z.ZodSchema,
  data: unknown
): Promise<{ success: boolean; data?: T; error?: z.ZodError }> {
  try {
    const validData = await schema.parseAsync(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error }
    }
    throw error
  }
}
