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
      'Develop and maintain enterprise web applications using Laravel.',
      'Build RESTful APIs for internal systems.',
      'Design and optimize PostgreSQL, Oracle, SQL Server, MySQL, and MariaDB databases.',
      'Create Stored Procedures, Functions, Views, and Indexes.',
      'Optimize SQL queries for better performance.',
      'Develop new modules based on business requirements.',
      'Maintain and enhance existing systems.',
      'Perform bug fixing and troubleshooting.',
      'Conduct Unit Testing before deployment.',
      'Write technical documentation and system documentation.',
      'Collaborate with Business Analysts, QA, and other developers.',
      'Participate in code reviews.',
      'Deploy applications to production environments.',
      'Support users and resolve production issues.',
    ],
  },
  {
    id: 'gkd',
    company: 'PT Gemala Kempa Daya',
    logo: '/assets/company/gkd.png',
    period: 'Nov 2021 – Apr 2023',
    position: 'Intern Web Developer',
    responsibilities: [
      'Assist in developing internal web applications.',
      'Build CRUD modules using Laravel.',
      'Create responsive frontend pages.',
      'Develop REST APIs.',
      'Write SQL queries and database migrations.',
      'Fix application bugs.',
      'Maintain existing features.',
      'Participate in testing.',
      'Learn software development best practices.',
      'Work closely with senior developers.',
      'Prepare technical documentation.',
    ],
  },
]
