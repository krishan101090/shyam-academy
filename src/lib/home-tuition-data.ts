export type ZoneKey = "west-delhi";

export type AreaItem = {
  name: string;
  slug: string;
};

export const zoneLabels: Record<ZoneKey, string> = {
  "west-delhi": "West Delhi",
};

export const zoneAreas: Record<ZoneKey, AreaItem[]> = {
  "west-delhi": [
    { name: "West Sagarpur", slug: "west-sagarpur" },
    { name: "Paschim Vihar", slug: "paschim-vihar" },
    { name: "Janakpuri", slug: "janakpuri" },
    { name: "Rajouri Garden", slug: "rajouri-garden" },
    { name: "Punjabi Bagh", slug: "punjabi-bagh" },
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

export function getArea(zone: ZoneKey, areaSlug: string): AreaItem | undefined {
  return zoneAreas[zone].find((item) => item.slug === areaSlug);
}

export function allAreaParams() {
  return (Object.keys(zoneAreas) as ZoneKey[]).flatMap((zone) =>
    zoneAreas[zone].map((area) => ({ zone, area: area.slug }))
  );
}
