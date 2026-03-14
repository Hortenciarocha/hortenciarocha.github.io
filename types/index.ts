// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

export interface ApiError {
  message: string
  code: string
  status: number
}

// User Types
export interface UserProfile {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: Date
  emailVerified?: Date
}

// Workspace Types
export interface WorkspaceData {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkspaceMemberData {
  id: string
  userId: string
  workspaceId: string
  roleId: string
  createdAt: Date
  updatedAt: Date
  user?: UserProfile
  role?: RoleData
}

// Role Types
export interface RoleData {
  id: string
  name: string
  description?: string
  permissions: string[]
}

// Subscription Types
export interface SubscriptionPlanData {
  id: string
  name: string
  description?: string
  priceMonthly: number
  priceYearly?: number
  features: string[]
  limits: Record<string, any>
  isActive: boolean
}

export interface SubscriptionData {
  id: string
  workspaceId: string
  planId: string
  status: 'active' | 'cancelled' | 'past_due'
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  plan?: SubscriptionPlanData
}

// Billing Types
export interface BillingHistoryData {
  id: string
  workspaceId: string
  amount: number
  currency: string
  description: string
  status: 'completed' | 'failed' | 'pending'
  invoiceId?: string
  createdAt: Date
}

// Audit Log Types
export interface AuditLogData {
  id: string
  userId: string
  workspaceId: string
  action: string
  entity: string
  entityId: string
  changes?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

// Pagination Types
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

// Auth Session Types
export interface AuthSession {
  user: {
    id: string
    email: string
    name?: string
    image?: string
  }
  workspaceId?: string
  expires: string
}
