export type Certificate = {
  slug: string
  title: string
  description?: string
  // longDescription?: string
  image: string
  tech?: string[]
  pdfUrl?: string // <- tambahan baru
}

export const certificates: Certificate[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Programming With C#',
    // description: '',
    image: '/projects/Certificates/introduction.png',
    // tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Maria DB', 'HTML', 'CSS'],
    pdfUrl: '/projects/Certificates/Coursera_Intruduction_Programming.pdf',
  },
  {
    slug: 'foundations',
    title: 'Foundations of Coding Full-Stack',
    // description: '',
    image: '/projects/Certificates/foundation.png',
    // tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Maria DB', 'HTML', 'CSS'],
    pdfUrl: '/projects/Certificates/Coursera_Foundation of Coding Full Stack.pdf',
  },
  {
    slug: 'devops',
    title: 'Belajar Dasar-Dasar DevOps',
    // description: '',
    image: '/projects/Certificates/devops.png',
    // tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Maria DB', 'HTML', 'CSS'],
    pdfUrl: '/projects/Certificates/sertifikat_course_382_1022906_180923105414.pdf',
  },
]

export function getProjectBySlug(slug: string) {
  return certificates.find((p) => p.slug === slug)
}