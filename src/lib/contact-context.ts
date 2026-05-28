import type { Locale } from "@/i18n/config";
import { getArea, zoneAreas, zoneLabels, type ZoneKey } from "@/lib/home-tuition-data";

export type ContactPageContext = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  bullet1: string;
  bullet2: string;
  formTitle: string;
  formHint: string;
  interest: string;
  backLink?: { href: string; label: string };
  faqIds: string[];
  highlightPath?: string;
  metaTitle?: string;
  metaDescription?: string;
};

type ContextCopy = Omit<ContactPageContext, "interest">;

const enContexts: Record<string, ContextCopy> = {
  default: {
    id: "default",
    eyebrow: "Free callback · West Sagarpur, Delhi",
    title: "Request a callback — tuition, Accounts, NIOS & more",
    lead: "Tell us what you need. We call you within 24 hours from our centre at West Sagarpur, Gandhi Market.",
    bullet1: "✓ Accounts classes with Ajay Sir (11th & 12th)",
    bullet2: "✓ Home tuition, Economics, NIOS & entrance coaching",
    formTitle: "Request free callback",
    formHint: "Takes under 1 minute · phone required",
    faqIds: ["accounts", "home-tuition", "nios-admission", "nios-tuition", "callback-free", "response-time", "location"],
  },
  accounts: {
    id: "accounts",
    eyebrow: "Accounts enquiry · Ajay Sir",
    title: "Enquire for Accounts classes — Class 11th & 12th",
    lead: "You came from our Accounts page. Tell us your class and board — we will call about batches and home tuition with Ajay Sir (20+ years, Paschim Vihar & West Sagarpur).",
    bullet1: "✓ Classroom batches at West Sagarpur, Gandhi Market",
    bullet2: "✓ Home tuition for Accounts in Paschim Vihar & West Delhi",
    formTitle: "Accounts classes callback",
    formHint: "We will call about 11th/12th Accounts — CBSE or ICSE",
    faqIds: ["accounts", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects/accounts", label: "← Back to Accounts classes" },
    highlightPath: "/subjects/accounts",
    metaTitle: "Enquire for Accounts Classes | Ajay Sir | Shri Shyam Academy",
    metaDescription:
      "Request a callback for Class 11th & 12th Accounts with Ajay Sir. Classroom and home tuition in West Sagarpur and Paschim Vihar.",
  },
  economics: {
    id: "economics",
    eyebrow: "Economics tuition enquiry",
    title: "Enquire for Economics home tuition",
    lead: "You are enquiring about Economics tuition for Class 11th or 12th. Share your area, board, and topics — we will suggest home tuition or batch options in West Delhi.",
    bullet1: "✓ Microeconomics, macroeconomics & statistics",
    bullet2: "✓ CBSE and ICSE · home tuition across West Delhi",
    formTitle: "Economics tuition callback",
    formHint: "Mention your class, board, and locality",
    faqIds: ["home-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects/economics", label: "← Back to Economics tuition" },
    highlightPath: "/subjects/economics",
    metaTitle: "Enquire for Economics Tuition in West Delhi | Shri Shyam Academy",
    metaDescription: "Free callback for Class 11th & 12th Economics home tuition in West Delhi. CBSE and ICSE.",
  },
  "home-tuition": {
    id: "home-tuition",
    eyebrow: "Home tuition enquiry · West Delhi",
    title: "Enquire for home tuition in West Delhi",
    lead: "Looking for a private home tutor? Tell us your locality, class, subjects, and board — we will match you with the right support in West Delhi.",
    bullet1: "✓ Economics, Accounts, and all major subjects",
    bullet2: "✓ CBSE/ICSE · Class 1st to 12th",
    formTitle: "Home tuition callback",
    formHint: "Include area name, class, and subjects",
    faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
    backLink: { href: "/home-tuition", label: "← Back to home tuition areas" },
    highlightPath: "/home-tuition/west-delhi",
    metaTitle: "Enquire for Home Tuition in West Delhi | Shri Shyam Academy",
    metaDescription: "Request a callback for home tuition in West Delhi — Economics, Accounts, CBSE/ICSE, Class 1–12.",
  },
  "entrance-after-12th": {
    id: "entrance-after-12th",
    eyebrow: "Entrance coaching enquiry",
    title: "Enquire for entrance exam coaching after 12th",
    lead: "Interested in CUET, IPMAT, CLAT, NDA, or other entrance tracks? Submit the form and we will call with batch details and how we can help after Class 12th.",
    bullet1: "✓ CUET, IPMAT, CLAT, NDA & foundation courses",
    bullet2: "✓ Guidance from our West Sagarpur centre",
    formTitle: "Entrance coaching callback",
    formHint: "Mention which entrance exam you are targeting",
    faqIds: ["callback-free", "response-time", "location", "home-tuition"],
    backLink: { href: "/entrance-after-12th", label: "← Back to entrance after 12th" },
    highlightPath: "/entrance-after-12th",
    metaTitle: "Enquire for Entrance Coaching After 12th | Shri Shyam Academy",
    metaDescription: "Free callback for CUET, IPMAT, CLAT, NDA and entrance preparation after Class 12th in West Delhi.",
  },
  nios: {
    id: "nios",
    eyebrow: "NIOS enquiry · Delhi",
    title: "NIOS admission & tuition enquiry",
    lead: "Need help with NIOS 10th or 12th admission, subjects, or ongoing tuition? We guide you on SDMIS steps and coaching at our West Sagarpur centre.",
    bullet1: "✓ NIOS 10th & 12th admission guidance",
    bullet2: "✓ Tuition, TMA support & exam practice",
    formTitle: "NIOS enquiry callback",
    formHint: "Select 10th or 12th admission or tuition in the form",
    faqIds: ["nios-admission", "nios-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/nios-admission-delhi", label: "← Back to NIOS admission Delhi" },
    highlightPath: "/nios-admission-delhi",
    metaTitle: "NIOS Enquiry Delhi | Admission & Tuition Callback",
    metaDescription: "Free callback for NIOS 10th & 12th admission and tuition in West Sagarpur, Delhi.",
  },
  career: {
    id: "career",
    eyebrow: "Career counselling enquiry",
    title: "Book a career counselling callback",
    lead: "Planning stream, subjects, or next steps after Class 10th or 12th? Request a call from our counsellors at West Sagarpur.",
    bullet1: "✓ Stream and subject guidance",
    bullet2: "✓ NIOS vs board and entrance planning",
    formTitle: "Career counselling callback",
    formHint: "Mention current class or situation",
    faqIds: ["callback-free", "response-time", "location"],
    backLink: { href: "/career-counselling", label: "← Back to career counselling" },
    highlightPath: "/career-counselling",
    metaTitle: "Career Counselling Enquiry | Shri Shyam Academy Delhi",
    metaDescription: "Free callback for career counselling after Class 10th and 12th in West Sagarpur, Delhi.",
  },
  "entrance-exams": {
    id: "entrance-exams",
    eyebrow: "Entrance exam enquiry",
    title: "Enquire for KVS, CUET, CTET coaching",
    lead: "You are enquiring about entrance exam preparation at Shri Shyam Academy. Tell us which exam — we will call with batch and trial class information.",
    bullet1: "✓ KVS, CUET, and CTET preparation",
    bullet2: "✓ Classes at West Sagarpur, Delhi",
    formTitle: "Entrance exam callback",
    formHint: "Mention KVS, CUET, CTET, or other exam",
    faqIds: ["callback-free", "response-time", "location"],
    backLink: { href: "/entrance-exams", label: "← Back to entrance exams" },
    highlightPath: "/entrance-exams",
    metaTitle: "Entrance Exam Coaching Enquiry | KVS CUET CTET | Delhi",
    metaDescription: "Free callback for KVS, CUET, and CTET coaching at Shri Shyam Academy, West Sagarpur.",
  },
  subjects: {
    id: "subjects",
    eyebrow: "Subject tuition enquiry",
    title: "Enquire about our subjects",
    lead: "Choose your subject in the form — Accounts with Ajay Sir or Economics home tuition — and we will call within 24 hours.",
    bullet1: "✓ Accounts — 11th & 12th specialist",
    bullet2: "✓ Economics — home tuition in West Delhi",
    formTitle: "Subject enquiry callback",
    formHint: "Select Accounts or Economics in the form",
    faqIds: ["accounts", "home-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects", label: "← Back to all subjects" },
    highlightPath: "/subjects",
  },
};

const hiContexts: Record<string, ContextCopy> = {
  default: {
    id: "default",
    eyebrow: "मुफ़्त कॉलबैक · वेस्ट सागरपुर, दिल्ली",
    title: "कॉलबैक अनुरोध — ट्यूशन, Accounts, NIOS और अधिक",
    lead: "अपनी ज़रूरत बताएँ। वेस्ट सागरपुर, गांधी मार्केट से 24 घंटे के अंदर कॉल करेंगे।",
    bullet1: "✓ Accounts — Ajay Sir (11वीं और 12वीं)",
    bullet2: "✓ होम ट्यूशन, Economics, NIOS और प्रवेश कोचिंग",
    formTitle: "मुफ़्त कॉलबैक अनुरोध",
    formHint: "1 मिनट से कम · फ़ोन आवश्यक",
    faqIds: ["accounts", "home-tuition", "nios-admission", "nios-tuition", "callback-free", "response-time", "location"],
  },
  accounts: {
    id: "accounts",
    eyebrow: "Accounts पूछताछ · Ajay Sir",
    title: "Accounts क्लास के लिए पूछताछ — 11वीं और 12वीं",
    lead: "आप Accounts पेज से आए हैं। कक्षा और बोर्ड बताएँ — Ajay Sir के साथ बैच और होम ट्यूशन के बारे में कॉल करेंगे।",
    bullet1: "✓ वेस्ट सागरपुर, गांधी मार्केट पर क्लास",
    bullet2: "✓ पश्चिम विहार और वेस्ट दिल्ली में Accounts होम ट्यूशन",
    formTitle: "Accounts क्लास कॉलबैक",
    formHint: "11वीं/12वीं Accounts — CBSE या ICSE",
    faqIds: ["accounts", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects/accounts", label: "← Accounts क्लास पर वापस" },
    highlightPath: "/subjects/accounts",
    metaTitle: "Accounts क्लास पूछताछ | Ajay Sir | श्री श्याम एकेडमी",
    metaDescription: "11वीं और 12वीं Accounts के लिए कॉलबैक — Ajay Sir, वेस्ट सागरपुर।",
  },
  economics: {
    id: "economics",
    eyebrow: "Economics ट्यूशन पूछताछ",
    title: "Economics होम ट्यूशन पूछताछ",
    lead: "आप Economics ट्यूशन के बारे में पूछ रहे हैं। इलाका, कक्षा और बोर्ड बताएँ — वेस्ट दिल्ली में विकल्प समझाएँगे।",
    bullet1: "✓ Microeconomics, macroeconomics और statistics",
    bullet2: "✓ CBSE और ICSE · वेस्ट दिल्ली होम ट्यूशन",
    formTitle: "Economics कॉलबैक",
    formHint: "कक्षा, बोर्ड और इलाका लिखें",
    faqIds: ["home-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects/economics", label: "← Economics पर वापस" },
    highlightPath: "/subjects/economics",
    metaTitle: "Economics ट्यूशन पूछताछ | वेस्ट दिल्ली",
    metaDescription: "11वीं और 12वीं Economics होम ट्यूशन के लिए मुफ़्त कॉलबैक।",
  },
  "home-tuition": {
    id: "home-tuition",
    eyebrow: "होम ट्यूशन पूछताछ · वेस्ट दिल्ली",
    title: "वेस्ट दिल्ली में होम ट्यूशन पूछताछ",
    lead: "प्राइवेट होम ट्यूटर चाहिए? इलाका, कक्षा, विषय और बोर्ड बताएँ — वेस्ट दिल्ली में सही सपोर्ट के लिए कॉल करेंगे।",
    bullet1: "✓ Economics, Accounts और सभी मुख्य विषय",
    bullet2: "✓ CBSE/ICSE · कक्षा 1 से 12",
    formTitle: "होम ट्यूशन कॉलबैक",
    formHint: "इलाका, कक्षा और विषय लिखें",
    faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
    backLink: { href: "/home-tuition", label: "← होम ट्यूशन पर वापस" },
    highlightPath: "/home-tuition/west-delhi",
    metaTitle: "होम ट्यूशन पूछताछ | वेस्ट दिल्ली",
    metaDescription: "वेस्ट दिल्ली में होम ट्यूशन के लिए कॉलबैक।",
  },
  "entrance-after-12th": {
    id: "entrance-after-12th",
    eyebrow: "प्रवेश कोचिंग पूछताछ",
    title: "12वीं के बाद प्रवेश कोचिंग पूछताछ",
    lead: "CUET, IPMAT, CLAT, NDA या अन्य ट्रैक में रुचि? फ़ॉर्म भरें — बैच और मार्गदर्शन के बारे में कॉल करेंगे।",
    bullet1: "✓ CUET, IPMAT, CLAT, NDA",
    bullet2: "✓ वेस्ट सागरपुर केंद्र",
    formTitle: "प्रवेश कोचिंग कॉलबैक",
    formHint: "कौन सी प्रवेश परीक्षा लक्ष्य है बताएँ",
    faqIds: ["callback-free", "response-time", "location", "home-tuition"],
    backLink: { href: "/entrance-after-12th", label: "← प्रवेश कोचिंग पर वापस" },
    highlightPath: "/entrance-after-12th",
    metaTitle: "12वीं के बाद प्रवेश कोचिंग पूछताछ",
    metaDescription: "CUET, IPMAT, CLAT, NDA के लिए मुफ़्त कॉलबैक।",
  },
  nios: {
    id: "nios",
    eyebrow: "NIOS पूछताछ · दिल्ली",
    title: "NIOS दाखिला और ट्यूशन पूछताछ",
    lead: "NIOS 10वीं या 12वीं दाखिला, विषय या ट्यूशन चाहिए? SDMIS कदम और वेस्ट सागरपुर कोचिंग समझाएँगे।",
    bullet1: "✓ NIOS 10वीं और 12वीं दाखिला",
    bullet2: "✓ ट्यूशन, TMA और परीक्षा अभ्यास",
    formTitle: "NIOS कॉलबैक",
    formHint: "फ़ॉर्म में दाखिला या ट्यूशन चुनें",
    faqIds: ["nios-admission", "nios-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/nios-admission-delhi", label: "← NIOS दाखिला पर वापस" },
    highlightPath: "/nios-admission-delhi",
    metaTitle: "NIOS पूछताछ दिल्ली",
    metaDescription: "NIOS दाखिला और ट्यूशन कॉलबैक।",
  },
  career: {
    id: "career",
    eyebrow: "करियर परामर्श पूछताछ",
    title: "करियर परामर्श कॉलबैक",
    lead: "10वीं या 12वीं के बाद स्ट्रीम और करियर प्लानिंग? वेस्ट सागरपुर से कॉलबैक अनुरोध करें।",
    bullet1: "✓ स्ट्रीम और विषय मार्गदर्शन",
    bullet2: "✓ NIOS vs बोर्ड और प्रवेश योजना",
    formTitle: "करियर कॉलबैक",
    formHint: "वर्तमान कक्षा या स्थिति बताएँ",
    faqIds: ["callback-free", "response-time", "location"],
    backLink: { href: "/career-counselling", label: "← करियर परामर्श पर वापस" },
    highlightPath: "/career-counselling",
    metaTitle: "करियर परामर्श पूछताछ",
    metaDescription: "करियर परामर्श मुफ़्त कॉलबैक।",
  },
  "entrance-exams": {
    id: "entrance-exams",
    eyebrow: "प्रवेश परीक्षा पूछताछ",
    title: "KVS, CUET, CTET कोचिंग पूछताछ",
    lead: "प्रवेश परीक्षा तैयारी के बारे में पूछ रहे हैं। कौन सी परीक्षा — बैच की जानकारी के लिए कॉल करेंगे।",
    bullet1: "✓ KVS, CUET, CTET",
    bullet2: "✓ वेस्ट सागरपुर, दिल्ली",
    formTitle: "प्रवेश परीक्षा कॉलबैक",
    formHint: "KVS, CUET, CTET या अन्य लिखें",
    faqIds: ["callback-free", "response-time", "location"],
    backLink: { href: "/entrance-exams", label: "← प्रवेश परीक्षा पर वापस" },
    highlightPath: "/entrance-exams",
    metaTitle: "KVS CUET CTET पूछताछ",
    metaDescription: "प्रवेश परीक्षा कोचिंग कॉलबैक।",
  },
  subjects: {
    id: "subjects",
    eyebrow: "विषय पूछताछ",
    title: "हमारे विषयों के बारे में पूछताछ",
    lead: "फ़ॉर्म में विषय चुनें — Accounts (Ajay Sir) या Economics — 24 घंटे के अंदर कॉल करेंगे।",
    bullet1: "✓ Accounts — 11वीं और 12वीं",
    bullet2: "✓ Economics — वेस्ट दिल्ली होम ट्यूशन",
    formTitle: "विषय पूछताछ कॉलबैक",
    formHint: "Accounts या Economics चुनें",
    faqIds: ["accounts", "home-tuition", "callback-free", "response-time", "location"],
    backLink: { href: "/subjects", label: "← सभी विषय पर वापस" },
    highlightPath: "/subjects",
  },
};

const needToInterest: Record<string, string> = {
  "Accounts Classes (11th & 12th)": "Accounts Classes (11th & 12th)",
  "Economics Tuition": "Economics Tuition",
  "Home Tuition": "Home Tuition",
  "CUET Coaching": "CUET Coaching",
  "Entrance Coaching After 12th": "Entrance Coaching After 12th",
};

const needToContextId: Record<string, string> = {
  "Accounts Classes (11th & 12th)": "accounts",
  "Economics Tuition": "economics",
  "Home Tuition": "home-tuition",
  "CUET Coaching": "entrance-after-12th",
  "Entrance Coaching After 12th": "entrance-after-12th",
};

function getContexts(locale: Locale) {
  return locale === "hi" ? hiContexts : enContexts;
}

function buildAreaContext(locale: Locale, zone: ZoneKey, areaSlug: string): ContactPageContext {
  const area = getArea(zone, areaSlug);
  const areaName = area?.name ?? areaSlug;
  const zoneName = zoneLabels[zone];
  const isHi = locale === "hi";

  const copy: ContextCopy = isHi
    ? {
        id: `area-${areaSlug}`,
        eyebrow: `${areaName} · होम ट्यूशन`,
        title: `${areaName} में होम ट्यूशन पूछताछ`,
        lead: `आप ${areaName}, ${zoneName} के होम ट्यूशन पेज से आए हैं। कक्षा, विषय और बोर्ड बताएँ — होम ट्यूटर के लिए कॉल करेंगे।`,
        bullet1: "✓ Economics, Accounts और स्कूल विषय",
        bullet2: "✓ CBSE/ICSE · कक्षा 1 से 12",
        formTitle: `${areaName} होम ट्यूशन कॉलबैक`,
        formHint: "कक्षा, विषय और समय की पसंद लिखें",
        faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
        backLink: {
          href: `/home-tuition/${zone}/${areaSlug}`,
          label: `← ${areaName} होम ट्यूशन पर वापस`,
        },
        highlightPath: `/home-tuition/${zone}/${areaSlug}`,
        metaTitle: `${areaName} होम ट्यूशन पूछताछ | श्री श्याम एकेडमी`,
        metaDescription: `${areaName}, ${zoneName} में होम ट्यूशन के लिए कॉलबैक।`,
      }
    : {
        id: `area-${areaSlug}`,
        eyebrow: `Home tuition · ${areaName}`,
        title: `Enquire for home tuition in ${areaName}`,
        lead: `You came from our ${areaName}, ${zoneName} home tuition page. Share class, subjects, and board — we will call about a private tutor in your area.`,
        bullet1: "✓ Economics, Accounts & school subjects",
        bullet2: "✓ CBSE/ICSE · Class 1st to 12th",
        formTitle: `Callback — home tuition in ${areaName}`,
        formHint: "Include class, subjects, and preferred timing",
        faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
        backLink: {
          href: `/home-tuition/${zone}/${areaSlug}`,
          label: `← Back to home tuition in ${areaName}`,
        },
        highlightPath: `/home-tuition/${zone}/${areaSlug}`,
        metaTitle: `Home Tuition Enquiry in ${areaName} | Shri Shyam Academy`,
        metaDescription: `Request a callback for home tuition in ${areaName}, ${zoneName}. Economics, Accounts, CBSE/ICSE.`,
      };

  if (areaSlug === "paschim-vihar" || areaSlug === "west-sagarpur") {
    copy.bullet1 = isHi
      ? "✓ Accounts क्लास — Ajay Sir (पास केंद्र पर)"
      : "✓ Accounts classes with Ajay Sir (nearby centre)";
    copy.highlightPath = "/subjects/accounts";
  }

  return { ...copy, interest: "Home Tuition" };
}

function buildZoneContext(locale: Locale, zone: ZoneKey): ContactPageContext {
  const zoneName = zoneLabels[zone];
  const isHi = locale === "hi";
  const copy: ContextCopy = isHi
    ? {
        id: `zone-${zone}`,
        eyebrow: `${zoneName} · होम ट्यूशन`,
        title: `${zoneName} में होम ट्यूशन पूछताछ`,
        lead: `आप ${zoneName} होम ट्यूशन पेज से आए हैं। इलाका और विषय बताएँ — होम ट्यूटर के लिए कॉल करेंगे।`,
        bullet1: "✓ सभी प्रमुख इलाकों में होम ट्यूटर",
        bullet2: "✓ Economics, Accounts, CBSE/ICSE",
        formTitle: `${zoneName} होम ट्यूशन कॉलबैक`,
        formHint: "अपना इलाका और कक्षा लिखें",
        faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
        backLink: { href: `/home-tuition/${zone}`, label: `← ${zoneName} इलाके पर वापस` },
        highlightPath: `/home-tuition/${zone}`,
      }
    : {
        id: `zone-${zone}`,
        eyebrow: `Home tuition · ${zoneName}`,
        title: `Enquire for home tuition in ${zoneName}`,
        lead: `You came from our ${zoneName} home tuition page. Tell us your locality and subjects — we will call about private tutoring.`,
        bullet1: "✓ Home tutors across major localities",
        bullet2: "✓ Economics, Accounts, CBSE/ICSE",
        formTitle: `${zoneName} home tuition callback`,
        formHint: "Include your area and class",
        faqIds: ["home-tuition", "accounts", "callback-free", "response-time", "location"],
        backLink: { href: `/home-tuition/${zone}`, label: `← Back to ${zoneName} areas` },
        highlightPath: `/home-tuition/${zone}`,
      };

  return { ...copy, interest: "Home Tuition" };
}

function resolveContextId(source?: string, need?: string): string {
  if (source) {
    if (source.startsWith("subjects:accounts") || source === "accounts-classes") return "accounts";
    if (source.startsWith("subjects:economics") || source.startsWith("subject:economics")) return "economics";
    if (source.startsWith("home-tuition:")) {
      const parts = source.split(":");
      if (parts.length >= 3) return `area:${parts[2]}`;
      if (parts.length === 2) return `zone:${parts[1]}`;
    }
    if (source.startsWith("area:")) return `area:${source.slice(5)}`;
    if (source.startsWith("zone:")) return `zone:${source.slice(5)}`;
    if (source in enContexts) return source;
    if (source.startsWith("home-tuition")) return "home-tuition";
    if (source.startsWith("nios")) return "nios";
    if (source.startsWith("career")) return "career";
    if (source.startsWith("entrance-exams")) return "entrance-exams";
    if (source.startsWith("entrance")) return "entrance-after-12th";
    if (source.startsWith("subjects")) return "subjects";
  }
  if (need && needToContextId[need]) return needToContextId[need];
  return "default";
}

export function resolveContactContext(
  locale: Locale,
  options: { source?: string; need?: string }
): ContactPageContext {
  const { source, need } = options;
  const contextId = resolveContextId(source, need);

  if (contextId.startsWith("area:")) {
    const areaSlug = contextId.slice(5);
    const zone: ZoneKey = "west-delhi";
    return buildAreaContext(locale, zone, areaSlug);
  }

  if (contextId.startsWith("zone:")) {
    const zone = contextId.slice(5) as ZoneKey;
    if (zone in zoneLabels) return buildZoneContext(locale, zone);
  }

  if (source?.startsWith("home-tuition:") && source.split(":").length >= 3) {
    const [, zone, areaSlug] = source.split(":") as [string, ZoneKey, string];
    if (zone in zoneLabels) return buildAreaContext(locale, zone, areaSlug);
  }

  const contexts = getContexts(locale);
  const base = contexts[contextId] ?? contexts.default;

  const defaultInterestByContext: Record<string, string> = {
    accounts: "Accounts Classes (11th & 12th)",
    economics: "Economics Tuition",
    "home-tuition": "Home Tuition",
    "entrance-after-12th": "Entrance Coaching After 12th",
    nios: "NIOS 10th admission",
    career: "Career counselling",
    "entrance-exams": "Entrance exam — CUET",
    subjects: "Accounts Classes (11th & 12th)",
  };

  const interest = (need && needToInterest[need]) || defaultInterestByContext[contextId] || need || "Home Tuition";

  return { ...base, interest };
}

export type ContactTopic =
  | "accounts-classes"
  | "economics-tuition"
  | "home-tuition"
  | "nios-admission"
  | "career-counselling"
  | "entrance-after-12th"
  | "entrance-exams"
  | "subjects";

const CONTACT_TOPIC_SET = new Set<string>([
  "accounts-classes",
  "economics-tuition",
  "home-tuition",
  "nios-admission",
  "career-counselling",
  "entrance-after-12th",
  "entrance-exams",
  "subjects",
]);

const slugToSource: Record<ContactTopic, string> = {
  "accounts-classes": "subjects:accounts",
  "economics-tuition": "subjects:economics",
  "home-tuition": "home-tuition",
  "nios-admission": "nios",
  "career-counselling": "career-counselling",
  "entrance-after-12th": "entrance-after-12th",
  "entrance-exams": "entrance-exams",
  subjects: "subjects",
};

export function contactPathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/contact";
  const [topic, zone, area] = slug;
  if (topic === "home-tuition") {
    if (zone && area) return `/contact/home-tuition/${zone}/${area}`;
    if (zone) return `/contact/home-tuition/${zone}`;
    return "/contact/home-tuition";
  }
  if (CONTACT_TOPIC_SET.has(topic)) return `/contact/${topic}`;
  return "";
}

export function parseContactSlug(slug?: string[]): { source?: string; path: string } | null {
  if (!slug?.length) return { path: "/contact" };
  const [topic, zone, area] = slug;
  if (topic === "home-tuition") {
    if (zone && area) {
      if (!(zone in zoneLabels)) return null;
      if (!getArea(zone as ZoneKey, area)) return null;
      return { source: `home-tuition:${zone}:${area}`, path: `/contact/home-tuition/${zone}/${area}` };
    }
    if (zone) {
      if (!(zone in zoneLabels)) return null;
      return { source: `home-tuition:${zone}`, path: `/contact/home-tuition/${zone}` };
    }
    return { source: "home-tuition", path: "/contact/home-tuition" };
  }
  if (!CONTACT_TOPIC_SET.has(topic)) return null;
  const topicKey = topic as ContactTopic;
  return { source: slugToSource[topicKey], path: `/contact/${topic}` };
}

export function legacyQueryToContactPath(query: { source?: string; need?: string }): string | null {
  const { source, need } = query;
  if (!source && !need) return null;
  if (source) {
    if (source.startsWith("subjects:accounts") || source === "accounts-classes") return "/contact/accounts-classes";
    if (source.startsWith("subjects:economics") || source.startsWith("subject:economics"))
      return "/contact/economics-tuition";
    if (source.startsWith("home-tuition:")) {
      const parts = source.split(":");
      if (parts.length >= 3) return `/contact/home-tuition/${parts[1]}/${parts[2]}`;
      if (parts.length === 2) return `/contact/home-tuition/${parts[1]}`;
    }
    if (source.startsWith("area:")) return `/contact/home-tuition/west-delhi/${source.slice(5)}`;
    if (source.startsWith("zone:")) return `/contact/home-tuition/${source.slice(5)}`;
    if (source.startsWith("home-tuition")) return "/contact/home-tuition";
    if (source.startsWith("nios")) return "/contact/nios-admission";
    if (source.startsWith("career")) return "/contact/career-counselling";
    if (source.startsWith("entrance-exams")) return "/contact/entrance-exams";
    if (source.startsWith("entrance")) return "/contact/entrance-after-12th";
    if (source.startsWith("subjects")) return "/contact/subjects";
  }
  if (need && needToContextId[need]) {
    const id = needToContextId[need];
    if (id === "accounts") return "/contact/accounts-classes";
    if (id === "economics") return "/contact/economics-tuition";
    if (id === "home-tuition") return "/contact/home-tuition";
    if (id === "entrance-after-12th") return "/contact/entrance-after-12th";
  }
  return null;
}

export function contactHref(topic: ContactTopic, options?: { zone?: ZoneKey; area?: string; hash?: string }) {
  let path = "/contact";
  if (topic === "home-tuition") {
    const zone = options?.zone ?? (options?.area ? "west-delhi" : undefined);
    if (zone && options?.area) path += `/home-tuition/${zone}/${options.area}`;
    else if (zone) path += `/home-tuition/${zone}`;
    else path += "/home-tuition";
  } else {
    path += `/${topic}`;
  }
  return options?.hash ? `${path}#${options.hash}` : path;
}

export function allContactSlugParams(): { slug?: string[] }[] {
  const base: { slug?: string[] }[] = [
    {},
    { slug: ["accounts-classes"] },
    { slug: ["economics-tuition"] },
    { slug: ["home-tuition"] },
    { slug: ["home-tuition", "west-delhi"] },
    { slug: ["nios-admission"] },
    { slug: ["career-counselling"] },
    { slug: ["entrance-after-12th"] },
    { slug: ["entrance-exams"] },
    { slug: ["subjects"] },
  ];
  for (const area of zoneAreas["west-delhi"]) {
    base.push({ slug: ["home-tuition", "west-delhi", area.slug] });
  }
  return base;
}

export type ContactFaq = { id: string; q: string; a: string };

export function getContactFaqs(locale: Locale): ContactFaq[] {
  const isHi = locale === "hi";
  const items = isHi
    ? [
        { id: "accounts", q: "Ajay Sir से Accounts क्लास के लिए कैसे पूछें?", a: "फ़ॉर्म में Accounts Classes चुनें या +91 84485 37313 पर कॉल करें।" },
        { id: "home-tuition", q: "वेस्ट दिल्ली में होम ट्यूशन?", a: "हाँ। फ़ॉर्म में Home Tuition चुनें और इलाका बताएँ।" },
        { id: "nios-admission", q: "NIOS दाखिला पूछताछ?", a: "फ़ॉर्म में NIOS 10वीं या 12वीं दाखिला चुनें।" },
        { id: "nios-tuition", q: "केवल NIOS ट्यूशन?", a: "हाँ। पहले से दाखिल हैं तो ट्यूशन चुनें।" },
        { id: "callback-free", q: "क्या कॉलबैक मुफ़्त है?", a: "हाँ। पहली चर्चा मुफ़्त है।" },
        { id: "response-time", q: "कितनी जल्दी संपर्क?", a: "24 घंटे के अंदर कॉल का लक्ष्य। जल्दी हो तो +91 84485 37313।" },
        { id: "location", q: "केंद्र कहाँ है?", a: "RZ 41 A, शंकर पार्क, वेस्ट सागरपुर गांधी मार्केट, नई दिल्ली 110046।" },
      ]
    : [
        { id: "accounts", q: "How do I enquire for Accounts classes with Ajay Sir?", a: "Select Accounts Classes in the form or call +91 84485 37313." },
        { id: "home-tuition", q: "Can I request home tuition in West Delhi?", a: "Yes. Choose Home Tuition and mention your area and class." },
        { id: "nios-admission", q: "How do I enquire for NIOS admission?", a: "Select NIOS 10th or 12th admission in the form." },
        { id: "nios-tuition", q: "NIOS tuition only?", a: "Yes. Choose NIOS 10th or 12th tuition if already enrolled." },
        { id: "callback-free", q: "Is the callback free?", a: "Yes. The first enquiry call is free." },
        { id: "response-time", q: "How soon will you contact me?", a: "Within 24 hours on working days. Call +91 84485 37313 for urgent queries." },
        { id: "location", q: "Where is the centre?", a: "RZ 41 A, Shanker Park, West Sagarpur Gandhi Market, New Delhi 110046." },
      ];
  return items;
}
