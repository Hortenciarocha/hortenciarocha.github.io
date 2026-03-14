'use client'

import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import type { WorkspaceData, WorkspaceMemberData } from '@/types'

export function useWorkspace(workspaceId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    workspaceId ? `/workspaces/${workspaceId}` : null,
    (url) => apiClient.get<WorkspaceData>(url).then(res => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    workspace: data,
    isLoading,
    error,
    mutate,
  }
}

export function useWorkspaces() {
  const { data, error, isLoading, mutate } = useSWR(
    '/workspaces',
    (url) => apiClient.get<WorkspaceData[]>(url).then(res => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    workspaces: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useWorkspaceMembers(workspaceId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    workspaceId ? `/workspaces/${workspaceId}/members` : null,
    (url) => apiClient.get<WorkspaceMemberData[]>(url).then(res => res.data),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    members: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useWorkspaceRole(workspaceId: string, userId: string) {
  const { members, isLoading } = useWorkspaceMembers(workspaceId)

  const userRole = useMemo(() => {
    return members.find(m => m.userId === userId)?.role
  }, [members, userId])

  const hasPermission = useCallback((permission: string) => {
    return userRole?.permissions.includes(permission) || false
  }, [userRole])

  const isAdmin = useMemo(() => {
    return userRole?.name === 'admin'
  }, [userRole])

  return {
    role: userRole,
    isLoading,
    hasPermission,
    isAdmin,
  }
}
