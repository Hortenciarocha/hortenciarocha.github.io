'use client'

import { useState } from 'react'
import { useWorkspaces } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export function WorkspaceList() {
  const { workspaces, isLoading, error } = useWorkspaces()
  const [selectedId, setSelectedId] = useState<string>()

  if (isLoading) {
    return <div className="text-center py-8">Carregando workspaces...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Erro ao carregar workspaces</AlertDescription>
      </Alert>
    )
  }

  if (workspaces.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground mb-4">Nenhum workspace criado ainda</p>
          <Link href="/dashboard/workspaces/new">
            <Button>Criar Workspace</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meus Workspaces</h2>
        <Link href="/dashboard/workspaces/new">
          <Button>Novo Workspace</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workspaces.map((workspace) => (
          <Card
            key={workspace.id}
            className={`cursor-pointer transition-colors ${
              selectedId === workspace.id ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedId(workspace.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{workspace.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {workspace.slug}
                </span>
              </CardTitle>
              {workspace.description && (
                <CardDescription>{workspace.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex gap-2">
              <Link href={`/dashboard/workspace/${workspace.id}`}>
                <Button size="sm" variant="outline">
                  Abrir
                </Button>
              </Link>
              <Link href={`/dashboard/workspace/${workspace.id}/settings`}>
                <Button size="sm" variant="ghost">
                  Configurações
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
