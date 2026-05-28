export type SubjectSlug = "accounts" | "economics";

export type SubjectItem = {
  slug: SubjectSlug;
  title: string;
  shortTitle: string;
  hubDescription: string;
  metaTitle: string;
  metaDescription: string;
  contactInterest: string;
  badge?: string;
  featured?: boolean;
};

export const subjects: SubjectItem[] = [
  {
    slug: "accounts",
    title: "Accounts Classes",
    shortTitle: "Accounts",
    hubDescription:
      "Pioneers in Class 11th & 12th Accounts with Ajay Sir — 20+ years experience, home tuition and batches at West Sagarpur, Gandhi Market.",
    metaTitle:
      "Best Accounts Classes in Paschim Vihar & West Sagarpur | Ajay Sir | 11th & 12th Specialist",
    metaDescription:
      "Pioneers in Accounts classes with Ajay Sir — 20+ years experience, best Accounts teacher in Paschim Vihar. Class 11th & 12th Accounts specialist. Home tuition and classes at West Sagarpur Gandhi Market.",
    contactInterest: "Accounts Classes (11th & 12th)",
    badge: "Featured · Ajay Sir",
    featured: true,
  },
  {
    slug: "economics",
    title: "Economics Tuition",
    shortTitle: "Economics",
    hubDescription:
      "Class 11th & 12th Economics home tuition and coaching in West Delhi — microeconomics, macroeconomics, statistics, and board exam preparation.",
    metaTitle: "Economics Tuition in West Delhi | Class 11th & 12th | CBSE & ICSE",
    metaDescription:
      "Best Economics home tutor in West Delhi for Class 11th and 12th. CBSE and ICSE microeconomics, macroeconomics, statistics, and board-focused revision.",
    contactInterest: "Economics Tuition",
    featured: true,
  },
];

export function getSubject(slug: string): SubjectItem | undefined {
  return subjects.find((item) => item.slug === slug);
}

export function allSubjectSlugs() {
  return subjects.map((item) => ({ slug: item.slug }));
}
