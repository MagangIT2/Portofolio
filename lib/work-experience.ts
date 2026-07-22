export interface WorkExperience {
  id: string
  company: string
  logo: string
  period: string
  position: string
  responsibilities: string[]
}

export const workExperience: WorkExperience[] = [
  {
    id: 'forisa',
    company: 'PT Forisa Nusapersada',
    logo: '/assets/company/forisa.png',
    period: 'Feb 2023 – Present',
    position: 'Senior System Developer',
    responsibilities: [
      'Develop and maintain internal web applications using Framework Laravel.',
      'Built automated Excel and PDF reports using SQL Server Reporting Services (SSRS) to support management decision-making.',
      'Designed and managed relational databases using SQL Server,MariaDB and PostgreSQL, including query optimization and data reporting.',
      'Write detailed user manuals and functional requirement documents to ensure seamless onboarding and a clear understanding of application features for end-users.',
      'Write technical documentation and system documentation.',
      'Migrated Bosnet (AzureSQL) and sales data (SQL Server) to PostgreSQL using Apache Nifi 2.7.',
      'Supported the sales team by translating business requirements into SQL based data analysis and reporting solutions.',
    ],
  },
  {
    id: 'gkd',
    company: 'PT Gemala Kempa Daya',
    logo: '/assets/company/gkd.png',
    period: 'Nov 2021 – Apr 2023',
    position: 'Web Development Intern',
    responsibilities: [
      'Developed application features based on user requirements and business needs.',
      'Analyzed user requirements and proposed technical solutions in collaboration with the IT team.',
      'Advanced ability to operate database management system : PostgresSQL and Oracle.',
      'Conducted user acceptance testing (UAT) to ensure system functionality and usability.',
      'Collaborated closely with the IT Section Head and development team to identify, discuss, and resolve system issues.',
      'Maintain existing features.',
      'Participate in testing.',
    ],
  },
]
