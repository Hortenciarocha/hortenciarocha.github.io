'use client'

import { useState } from 'react'
import { useWorkspaceMembers } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface MemberListProps {
  workspaceId: string
}

export function MemberList({ workspaceId }: MemberListProps) {
  const { members, isLoading, error } = useWorkspaceMembers(workspaceId)
  const [removingId, setRemovingId] = useState<string>()

  if (isLoading) {
    return <div className="text-center py-8">Carregando membros...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Erro ao carregar membros</AlertDescription>
      </Alert>
    )
  }

  const handleRemove = async (memberId: string) => {
    try {
      setRemovingId(memberId)
      const response = await fetch(
        `/api/workspaces/${workspaceId}/members/${memberId}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        // Reload members
        window.location.reload()
      }
    } catch (err) {
      console.error('Erro ao remover membro', err)
    } finally {
      setRemovingId(undefined)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membros ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <div>
                <p className="font-medium">{member.user?.name || member.user?.email}</p>
                <p className="text-sm text-muted-foreground">{member.user?.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.role?.name}
                </p>
              </div>
              <Button
                size="sm"
                variant="destructive"
                disabled={removingId === member.id}
                onClick={() => handleRemove(member.id)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
