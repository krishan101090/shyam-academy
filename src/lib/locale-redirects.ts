const localeLessRedirects: { source: string; destination: string }[] = [
  { source: "about", destination: "about" },
  { source: "about-us", destination: "about" },
  { source: "services", destination: "services" },
  { source: "nios", destination: "nios" },
  { source: "nios-admission-delhi", destination: "nios-admission-delhi" },
  { source: "nios-admissions-delhi", destination: "nios-admission-delhi" },
  { source: "career-counselling", destination: "career-counselling" },
  { source: "career-counseling", destination: "career-counselling" },
  { source: "entrance-exams", destination: "entrance-exams" },
  { source: "entrance-exam", destination: "entrance-exams" },
  { source: "entrance-after-12th", destination: "entrance-after-12th" },
  { source: "contact", destination: "contact" },
  { source: "updates", destination: "updates" },
  { source: "subjects", destination: "subjects" },
  { source: "home-tuition", destination: "home-tuition" },
];

export function localeLessToEnRedirects() {
  return localeLessRedirects.flatMap(({ source, destination }) => [
    { source: `/${source}`, destination: `/en/${destination}`, permanent: true as const },
    { source: `/${source}/`, destination: `/en/${destination}`, permanent: true as const },
  ]);
}
