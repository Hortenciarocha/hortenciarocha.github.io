import { db } from '@/lib/db'
import { ROLES, PLAN_NAMES, FEATURE_LIMITS } from '@/config/constants'

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // Create default roles
    console.log('📝 Criando roles padrão...')
    
    const adminRole = await db.role.upsert({
      where: { name: ROLES.ADMIN },
      update: {},
      create: {
        name: ROLES.ADMIN,
        description: 'Administrador com acesso total',
        permissions: [
          'workspace:manage',
          'workspace:view',
          'members:manage',
          'members:invite',
          'members:remove',
          'billing:manage',
          'billing:view',
          'settings:manage',
        ],
      },
    })

    const editorRole = await db.role.upsert({
      where: { name: ROLES.EDITOR },
      update: {},
      create: {
        name: ROLES.EDITOR,
        description: 'Editor com acesso limitado',
        permissions: [
          'workspace:view',
          'members:invite',
          'billing:view',
        ],
      },
    })

    const viewerRole = await db.role.upsert({
      where: { name: ROLES.VIEWER },
      update: {},
      create: {
        name: ROLES.VIEWER,
        description: 'Visualizador com acesso somente leitura',
        permissions: [
          'workspace:view',
          'billing:view',
        ],
      },
    })

    // Create subscription plans
    console.log('💳 Criando planos de assinatura...')
    
    await db.subscriptionPlan.upsert({
      where: { name: PLAN_NAMES.FREE },
      update: {},
      create: {
        name: PLAN_NAMES.FREE,
        description: 'Plano gratuito para começar',
        priceMonthly: 0,
        features: [
          'Dashboard básico',
          'Até 3 workspaces',
          '5 usuários por workspace',
          'Suporte por email',
        ],
        limits: FEATURE_LIMITS[PLAN_NAMES.FREE],
        isActive: true,
      },
    })

    await db.subscriptionPlan.upsert({
      where: { name: PLAN_NAMES.PRO },
      update: {},
      create: {
        name: PLAN_NAMES.PRO,
        description: 'Para equipes em crescimento',
        priceMonthly: 9900, // $99 USD
        priceYearly: 99900, // $999 USD
        features: [
          'Dashboard avançado',
          'Workspaces ilimitados',
          '50 usuários por workspace',
          'Analytics avançado',
          'Suporte prioritário',
          '100GB de armazenamento',
        ],
        limits: FEATURE_LIMITS[PLAN_NAMES.PRO],
        isActive: true,
      },
    })

    await db.subscriptionPlan.upsert({
      where: { name: PLAN_NAMES.ENTERPRISE },
      update: {},
      create: {
        name: PLAN_NAMES.ENTERPRISE,
        description: 'Solução customizada para empresas',
        priceMonthly: 0,
        features: [
          'Tudo do plano Pro',
          'Usuários ilimitados',
          'Armazenamento ilimitado',
          'SSO/SAML',
          'Suporte dedicado',
          'SLA garantido',
        ],
        limits: FEATURE_LIMITS[PLAN_NAMES.ENTERPRISE],
        isActive: true,
      },
    })

    console.log('✅ Seed concluído com sucesso!')
    console.log('📊 Resumo:')
    console.log(`  - ${3} roles criados`)
    console.log(`  - ${3} planos de assinatura criados`)
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error)
    throw error
  }
}

seed()
  .then(() => {
    console.log('✨ Seed finalizado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
