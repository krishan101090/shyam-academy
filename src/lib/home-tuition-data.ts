export type ZoneKey = "north-delhi" | "west-delhi";

export type AreaItem = {
  name: string;
  slug: string;
};

export const zoneLabels: Record<ZoneKey, string> = {
  "north-delhi": "North Delhi",
  "west-delhi": "West Delhi",
};

export const zoneAreas: Record<ZoneKey, AreaItem[]> = {
  "north-delhi": [
    { name: "Rohini", slug: "rohini" },
    { name: "Pitampura", slug: "pitampura" },
    { name: "Shalimar Bagh", slug: "shalimar-bagh" },
    { name: "Ashok Vihar", slug: "ashok-vihar" },
    { name: "Model Town", slug: "model-town" },
    { name: "Civil Lines", slug: "civil-lines" },
    { name: "Kamla Nagar", slug: "kamla-nagar" },
    { name: "Mukherjee Nagar", slug: "mukherjee-nagar" },
    { name: "Burari", slug: "burari" },
    { name: "Hudson Lane", slug: "hudson-lane" },
    { name: "GTB Nagar", slug: "gtb-nagar" },
    { name: "Wazirabad", slug: "wazirabad" },
    { name: "Narela", slug: "narela" },
    { name: "Alipur", slug: "alipur" },
    { name: "Majnu Ka Tila", slug: "majnu-ka-tila" },
  ],
  "west-delhi": [
    { name: "Janakpuri", slug: "janakpuri" },
    { name: "Rajouri Garden", slug: "rajouri-garden" },
    { name: "Punjabi Bagh", slug: "punjabi-bagh" },
    { name: "Paschim Vihar", slug: "paschim-vihar" },
    { name: "Vikaspuri", slug: "vikaspuri" },
    { name: "Uttam Nagar", slug: "uttam-nagar" },
    { name: "Tilak Nagar", slug: "tilak-nagar" },
    { name: "Dwarka", slug: "dwarka" },
    { name: "Kirti Nagar", slug: "kirti-nagar" },
    { name: "Patel Nagar", slug: "patel-nagar" },
    { name: "Subhash Nagar", slug: "subhash-nagar" },
    { name: "Tagore Garden", slug: "tagore-garden" },
    { name: "Nangloi", slug: "nangloi" },
    { name: "Peeragarhi", slug: "peeragarhi" },
    { name: "Moti Nagar", slug: "moti-nagar" },
  ],
};

export const coreSubjects = [
  "Economics",
  "Accounts / Accounting",
  "Political Science",
  "Hindi",
  "English",
  "Computer Science",
];

export const additionalCourses = [
  "English Communication",
  "Computer Basics",
  "AI Basics",
  "Digital Marketing",
  "JavaScript",
  "Python",
];

export const schoolCoverage = [
  "Class 1st to 10th — all subjects",
  "Class 11th & 12th — Economics, Accounts, Political Science, Hindi, English, Computer Science",
  "CBSE and ICSE board support",
];

export const subjectLanding = [
  { slug: "economics-tuition", title: "Economics Tuition", h1: "Economics Home Tutor in Delhi" },
  { slug: "accounts-tuition", title: "Accounts Tuition", h1: "Accounts Home Tutor in Delhi" },
  { slug: "cbse-icse-home-tuition", title: "CBSE/ICSE Home Tuition", h1: "CBSE & ICSE Home Tuition in Delhi" },
];

export function getArea(zone: ZoneKey, areaSlug: string): AreaItem | undefined {
  return zoneAreas[zone].find((item) => item.slug === areaSlug);
}

export function allAreaParams() {
  return (Object.keys(zoneAreas) as ZoneKey[]).flatMap((zone) =>
    zoneAreas[zone].map((area) => ({ zone, area: area.slug }))
  );
}
