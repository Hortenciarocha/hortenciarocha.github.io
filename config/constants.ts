// Roles
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const

// Permissions
export const PERMISSIONS = {
  // Workspace
  MANAGE_WORKSPACE: 'workspace:manage',
  VIEW_WORKSPACE: 'workspace:view',
  
  // Members
  MANAGE_MEMBERS: 'members:manage',
  INVITE_MEMBERS: 'members:invite',
  REMOVE_MEMBERS: 'members:remove',
  
  // Billing
  MANAGE_BILLING: 'billing:manage',
  VIEW_BILLING: 'billing:view',
  
  // Settings
  MANAGE_SETTINGS: 'settings:manage',
} as const

// Subscription Statuses
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  PAST_DUE: 'past_due',
} as const

// Billing History Statuses
export const BILLING_STATUS = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  PENDING: 'pending',
} as const

// Plan Names
export const PLAN_NAMES = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const

// Feature Limits
export const FEATURE_LIMITS = {
  [PLAN_NAMES.FREE]: {
    maxWorkspaces: 3,
    maxUsersPerWorkspace: 5,
    maxStorage: 5 * 1024 * 1024 * 1024, // 5GB
  },
  [PLAN_NAMES.PRO]: {
    maxWorkspaces: -1, // unlimited
    maxUsersPerWorkspace: 50,
    maxStorage: 100 * 1024 * 1024 * 1024, // 100GB
  },
  [PLAN_NAMES.ENTERPRISE]: {
    maxWorkspaces: -1,
    maxUsersPerWorkspace: -1,
    maxStorage: -1,
  },
} as const

// API Constants
export const API = {
  TIMEOUT: 30000,
  RETRIES: 3,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 100,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

// Cache
export const CACHE_DURATION = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 24 * 60 * 60, // 24 hours
} as const
