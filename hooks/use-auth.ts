'use client'

import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import type { AuthSession } from '@/types'

export function useAuth() {
  const { data: session, status, update } = useSession()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  const user = session?.user

  const updateSession = useCallback(async () => {
    await update()
  }, [update])

  return {
    session: session as AuthSession | null,
    user,
    isLoading,
    isAuthenticated,
    updateSession,
    status,
  }
}
