# SaaS Platform - Arquitetura Escalável

Uma plataforma SaaS profissional e escalável, construída com Next.js 16, TypeScript, Prisma e PostgreSQL.

## 🚀 Características

- ✅ **Next.js 16** - Framework React com Server Components
- ✅ **TypeScript** - Type safety completo
- ✅ **Prisma ORM** - Gerenciamento de banco de dados
- ✅ **NextAuth.js** - Autenticação com OAuth
- ✅ **Multi-Tenancy** - Isolamento de dados por workspace
- ✅ **RBAC** - Controle de acesso baseado em papéis
- ✅ **Tailwind CSS** - Styling profissional
- ✅ **shadcn/ui** - Componentes reutilizáveis
- ✅ **Stripe Integration** - Sistema de pagamentos
- ✅ **API REST** - Endpoints estruturados

## 📋 Requisitos

- Node.js >= 18.0.0
- npm, yarn, ou pnpm
- PostgreSQL (local ou Supabase/Neon)

## 🔧 Setup Local

### 1. Clone e Instale Dependências

```bash
git clone https://github.com/seu-usuario/saas-platform.git
cd saas-platform
npm install
```

### 2. Configure Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generated-secret-key"
```

### 3. Configure o Banco de Dados

Gere o cliente Prisma e execute as migrações:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Inicie o Servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
/app                 # Next.js App Router
  /api              # API Routes
  /(auth)           # Rotas de autenticação
  /(dashboard)      # Rotas protegidas
/components          # Componentes React
  /ui               # Componentes shadcn/ui
  /providers        # Context Providers
/lib                # Utilitários e configurações
/types              # Tipos TypeScript
/prisma             # Configuração do banco
  schema.prisma
```

## 🔐 Autenticação

### Fluxo de Login

1. Usuário entra com email/password ou OAuth
2. NextAuth.js valida credenciais
3. Session é criada
4. Workspace padrão é atribuído
5. Usuário é redirecionado para dashboard

### Implementação

```typescript
import { useSession } from 'next-auth/react'

export function MyComponent() {
  const { data: session } = useSession()
  
  return <div>{session?.user?.email}</div>
}
```

## 🏢 Multi-Tenancy

### Isolamento de Dados

Todos os recursos incluem `workspaceId`:

```typescript
const projects = await db.project.findMany({
  where: {
    workspace: {
      id: workspaceId,
      members: {
        some: {
          userId: userId,
        },
      },
    },
  },
})
```

### Validação de Acesso

Middleware valida permissão antes de acessar recursos:

```typescript
export async function middleware(request: NextRequest) {
  const workspaceId = request.nextUrl.pathname.split('/')[2]
  const session = await auth()
  
  // Verificar se usuário tem acesso ao workspace
}
```

## 💳 Sistema de Billing

### Planos Disponíveis

- **Free**: Até 3 workspaces, 5 usuários
- **Pro**: Workspaces ilimitados, 50 usuários
- **Enterprise**: Customizado

### Fluxo de Checkout

```typescript
// 1. Redirecionar para Stripe Checkout
const session = await stripe.checkout.sessions.create({
  customer: stripeCustomerId,
  line_items: [{ price: planPriceId, quantity: 1 }],
})

// 2. Webhook recebe confirmação
// POST /api/billing/webhook

// 3. Subscription é atualizada
await db.subscription.update({
  where: { id },
  data: { status: 'active' },
})
```

## 🧪 Testes

Execute os testes:

```bash
npm run test
npm run test:coverage
```

## 📚 Documentação Adicional

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)

## 🚢 Deploy em Produção

### Vercel (Recomendado)

```bash
vercel deploy
```

Configure as variáveis de ambiente no painel do Vercel.

### Docker

```bash
docker build -t saas-platform .
docker run -p 3000:3000 saas-platform
```

## 📄 Licença

MIT

## 👥 Contribuindo

Veja [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para detalhes.

## 🆘 Suporte

Para problemas e dúvidas, abra uma issue no repositório.

---

**Versão**: 1.0.0
**Última atualização**: 2024
