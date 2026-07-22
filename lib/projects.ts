export type Project = {
  slug: string
  title: string
  description: string
  longDescription?: string
  image: string
  tech: string[]
}

export const projects: Project[] = [
  {
    slug: 'pos-forisa',
    title: 'Web-Based Point of Sale (POS) System',
    description:
      'An internal web application to manage real-time sales, transactions, and inventory across multiple outlets with live dashboards for event PRJ and SIAL Interfood.',
    longDescription:
      'A comprehensive point-of-sale system built to handle real-time transactions across multiple outlets simultaneously. The system provides live dashboards for tracking sales performance during major events like PRJ and SIAL Interfood, with inventory synchronization to prevent overselling and detailed reporting for management.',
    image: '/projects/POS/pos_forisa.png',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Maria DB', 'HTML', 'CSS'],
  },
  {
    slug: 'database-migration-nifi',
    title: 'Database Migration With Apache Nifi',
    description:
      'Designed and implemented a database migration from Azure SQL and SQL Server to PostgreSQL, providing a centralized data platform that enables the Sales Analytics team to efficiently query, analyze, and manipulate data.',
    longDescription:
      'Led the end-to-end migration of legacy data sources into a unified PostgreSQL platform using Apache NiFi for ETL pipelines. This centralized data platform significantly improved query performance and gave the Sales Analytics team self-service access to clean, structured data.',
    image: '/projects/migrasi.png',
    tech: ['Apache NiFi', 'PostgreSQL', 'ETL', 'SQL Server', 'Azure SQL'],
  },
  {
    slug: 'dashboard-npl',
    title: 'Dashboard NPL',
    description:
      'Developed an executive dashboard for the Board of Directors (BOD) to track new product development, project timelines, managers leave and business travel schedules, and upcoming meetings.',
    longDescription:
      'An executive-level dashboard giving the Board of Directors a single view into ongoing initiatives — from new product launches and project timelines to team availability and upcoming meetings. Designed for quick scanning with minimal clicks to find critical information.',
    image: '/projects/npl/npl.png',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS'],
  },
  {
    slug: 'comming soon',
    title: 'Program Commitment Marketing',
    description:
      'Developed the Commitment Marketing Program, a tier-based discount system that rewards distributors with higher discounts based on their purchase volume, according to predefined business rules.',
    longDescription:
      'An executive-level dashboard giving the Board of Directors a single view into ongoing initiatives — from new product launches and project timelines to team availability and upcoming meetings. Designed for quick scanning with minimal clicks to find critical information.',
    image: '/images/coming_soon.webp',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS'],
  },
  {
    slug: 'comming soon2',
    title: 'Ajuan POSM Request',
    description:
      'Developed a Distributor POSM Inventory System to manage warehouse inventory distribution, track material deliveries, and monitor stock movements, improving operational transparency and reducing the risk of fraud.',
    longDescription:
      'An executive-level dashboard giving the Board of Directors a single view into ongoing initiatives — from new product launches and project timelines to team availability and upcoming meetings. Designed for quick scanning with minimal clicks to find critical information.',
    image: '/images/coming_soon.webp',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS'],
  },
  {
    slug: 'comming soon3',
    title: 'Distributor POSM Inventory',
    description:
      'Developed an executive dashboard for the Board of Directors (BOD) to track new product development, project timelines, managers leave and business travel schedules, and upcoming meetings.',
    longDescription:
      'An executive-level dashboard giving the Board of Directors a single view into ongoing initiatives — from new product launches and project timelines to team availability and upcoming meetings. Designed for quick scanning with minimal clicks to find critical information.',
    image: '/images/coming_soon.webp',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS'],
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}