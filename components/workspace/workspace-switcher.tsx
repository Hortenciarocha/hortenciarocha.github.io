'use client'

import { useWorkspaces } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function WorkspaceSwitcher() {
  const { workspaces, isLoading } = useWorkspaces()

  if (isLoading || workspaces.length === 0) {
    return (
      <Link href="/dashboard/workspaces">
        <Button variant="outline" size="sm">
          Workspaces
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard/workspaces">
        <Button variant="outline" size="sm">
          {workspaces[0]?.name || 'Workspaces'} ({workspaces.length})
        </Button>
      </Link>
    </div>
  )
}
