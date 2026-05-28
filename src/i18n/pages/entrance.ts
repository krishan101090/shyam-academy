import type { Locale } from "../config";

const en = {
  breadcrumb: "Entrance exams",
  home: "Home",
  eyebrow: "KVS · CUET · CTET · Delhi",
  title: "Entrance exam coaching in Delhi — KVS, CUET & CTET",
  lead: "One place for major entrance exam preparation in Delhi — Kendriya Vidyalaya (KVS) recruitment, CUET for university admission, and CTET for teaching eligibility — with classroom support in West Sagarpur.",
  ctaForm: "Enquire for entrance coaching",
  ctaCall: "Call +91 84485 37313",
  examsTitle: "All entrance exams we prepare for",
  examsIntro:
    "Syllabus and exam patterns change when authorities issue new notifications. We align batches to the latest official structure and focus on consistent practice — not shortcuts.",
  whyTitle: "Why prepare with Shri Shyam Academy",
  whyItems: [
    "Small batches so doubts are addressed, not postponed.",
    "Faculty experienced in school boards, NIOS, and competitive exam formats.",
    "Local centre in West Sagarpur — easy for West Delhi and Sagarpur families.",
    "Career counselling available if you are unsure which exam to target.",
  ],
  whyCareer: "career counselling",
  whyTuition: "NIOS tuition",
  whyBefore: "Unsure which path fits you? See",
  whyMiddle: ". Need school or NIOS support? See",
  whyAfter: ".",
  jumpLabel: "Jump to:",
  joinTitle: "Join an entrance exam batch",
  joinLead: "Select entrance exam coaching on the enquiry form and name KVS, CUET, or CTET — we will call you with batch details.",
  joinCta: "Request callback",
  joinOther: "NIOS & other enquiries",
  faqTitle: "Entrance exams — FAQs",
  ctaTitle: "Start with a free callback",
  ctaLead: "Mention KVS, CUET, or CTET on the enquiry form — we will call you about batches and syllabus.",
  ctaEnquire: "Enquire now",
  metaTitle: "Entrance Exam Coaching Delhi | KVS, CUET, CTET | Shri Shyam Academy",
  metaDescription:
    "Entrance exam preparation in Delhi: KVS, CUET, and CTET coaching with exam strategy, practice, and doubt support at Shri Shyam Academy, West Sagarpur.",
  exams: [
    {
      id: "kvs",
      name: "KVS (Kendriya Vidyalaya Sangathan)",
      audience: "Aspiring teachers & staff recruitment",
      points: [
        "Concept revision aligned to notified KVS syllabus and exam pattern",
        "Previous-year style practice and time-bound mock tests",
        "General English, Hindi, and teaching aptitude focus where applicable",
        "Doubt clearing for topics you find repeatedly weak in mocks",
      ],
    },
    {
      id: "cuet",
      name: "CUET (Common University Entrance Test)",
      audience: "Class 12 / equivalent students targeting central universities",
      points: [
        "Subject-wise preparation based on your CUET domain choices",
        "Speed and accuracy for MCQ-style university entrance papers",
        "Revision plans that run parallel to board or NIOS study where needed",
        "Guidance on balancing CUET subjects with limited study hours",
      ],
    },
    {
      id: "ctet",
      name: "CTET (Central Teacher Eligibility Test)",
      audience: "Candidates seeking central teacher eligibility",
      points: [
        "Paper I and Paper II orientation as per your target level",
        "Child development, pedagogy, and subject content practice",
        "Structured answer approach for teaching eligibility exams",
        "Regular assessment to track readiness before the exam date",
      ],
    },
  ],
  faqs: [
    {
      q: "Which entrance exams do you coach for in Delhi?",
      a: "Shri Shyam Academy provides coaching for KVS recruitment exams, CUET (university entrance), and CTET (central teacher eligibility). Enquire on our callback form and mention the exam name so we can discuss batch fit.",
    },
    {
      q: "Is entrance exam coaching available alongside NIOS tuition?",
      a: "Yes, many learners combine NIOS Senior Secondary subjects with CUET or CTET preparation. We help you plan weekly hours so neither goal is ignored.",
    },
    {
      q: "Do you guarantee selection in KVS, CUET, or CTET?",
      a: "No institute can guarantee results. We provide structured teaching, practice, and feedback; final selection depends on your preparation, exam difficulty, and official cut-offs.",
    },
    {
      q: "How do I join an entrance exam batch?",
      a: "Submit the enquiry form on our contact page, select entrance exam coaching, and mention KVS, CUET, or CTET. We will call you with batch timing, fees, and syllabus coverage.",
    },
    {
      q: "Where are entrance exam classes held?",
      a: "At Shri Shyam Academy, West Sagarpur, New Delhi (near Shanker Park). Call +91 84485 37313 for directions and trial class availability.",
    },
  ],
};

const hi = {
  breadcrumb: "प्रवेश परीक्षा",
  home: "होम",
  eyebrow: "KVS · CUET · CTET · दिल्ली",
  title: "दिल्ली में प्रवेश परीक्षा कोचिंग — KVS, CUET और CTET",
  lead: "दिल्ली में KVS भर्ती, विश्वविद्यालय प्रवेश के लिए CUET और शिक्षण पात्रता CTET — वेस्ट सागरपुर में कक्षा सहायता के साथ।",
  ctaForm: "प्रवेश कोचिंग पूछताछ",
  ctaCall: "+91 84485 37313 पर कॉल करें",
  examsTitle: "जिन सभी प्रवेश परीक्षाओं की हम तैयारी कराते हैं",
  examsIntro:
    "पाठ्यक्रम और पैटर्न अधिसूचना से बदलते हैं। हम नवीनतम आधिकारिक संरचना के अनुसार बैच और नियमित अभ्यास पर ध्यान देते हैं।",
  whyTitle: "श्री श्याम एकेडमी के साथ क्यों तैयारी",
  whyItems: [
    "छोटे बैच — डाउट तुरंत सुलझते हैं।",
    "स्कूल बोर्ड, NIOS और प्रतियोगी परीक्षा अनुभव।",
    "वेस्ट सागरपुर में स्थानीय केंद्र।",
    "कौन सी परीक्षा लक्ष्य करें — करियर परामर्श उपलब्ध।",
  ],
  whyCareer: "करियर परामर्श",
  whyTuition: "NIOS ट्यूशन",
  whyBefore: "रास्ता तय नहीं? देखें",
  whyMiddle: "। स्कूल या NIOS सहायता? देखें",
  whyAfter: "।",
  jumpLabel: "सीधे जाएँ:",
  joinTitle: "प्रवेश परीक्षा बैच में शामिल हों",
  joinLead: "पूछताछ फ़ॉर्म पर प्रवेश कोचिंग चुनें और KVS, CUET या CTET लिखें।",
  joinCta: "कॉलबैक अनुरोध",
  joinOther: "NIOS और अन्य पूछताछ",
  faqTitle: "प्रवेश परीक्षा — अक्सर पूछे जाने वाले प्रश्न",
  ctaTitle: "मुफ़्त कॉलबैक से शुरू करें",
  ctaLead: "पूछताछ फ़ॉर्म पर KVS, CUET या CTET लिखें — बैच और पाठ्यक्रम के लिए हम कॉल करेंगे।",
  ctaEnquire: "अभी पूछताछ",
  metaTitle: "प्रवेश परीक्षा कोचिंग दिल्ली | KVS CUET CTET | श्री श्याम एकेडमी",
  metaDescription:
    "दिल्ली में KVS, CUET और CTET कोचिंग — परीक्षा रणनीति, अभ्यास और डाउट सहायता, वेस्ट सागरपुर।",
  exams: [
    {
      id: "kvs",
      name: "KVS (केंद्रीय विद्यालय संगठन)",
      audience: "शिक्षक और कर्मचारी भर्ती के इच्छुक",
      points: [
        "सूचित KVS पाठ्यक्रम और परीक्षा पैटर्न के अनुसार रिवीजन",
        "पिछले वर्ष शैली अभ्यास और समयबद्ध मॉक टेस्ट",
        "सामान्य अंग्रेज़ी, हिंदी और शिक्षण योग्यता पर ध्यान",
        "मॉक में कमज़ोर विषयों पर डाउट क्लियरिंग",
      ],
    },
    {
      id: "cuet",
      name: "CUET (सामान्य विश्वविद्यालय प्रवेश परीक्षा)",
      audience: "केंद्रीय विश्वविद्यालयों के लक्ष्य वाले 12वीं / समकक्ष",
      points: [
        "आपके CUET डोमेन विकल्पों के अनुसार विषयवार तैयारी",
        "MCQ शैली पेपर के लिए गति और सटीकता",
        "बोर्ड या NIOS अध्ययन के साथ समानांतर रिवीजन योजना",
        "सीमित समय में CUET विषय संतुलन मार्गदर्शन",
      ],
    },
    {
      id: "ctet",
      name: "CTET (केंद्रीय शिक्षक पात्रता परीक्षा)",
      audience: "केंद्रीय शिक्षक पात्रता चाहने वाले",
      points: [
        "लक्ष्य स्तर के अनुसार पेपर I और II अभिविन्यास",
        "बाल विकास, शिक्षाशास्त्र और विषय सामग्री अभ्यास",
        "शिक्षण पात्रता परीक्षा के लिए संरचित उत्तर दृष्टि",
        "परीक्षा तिथि से पहले तैयारी ट्रैकिंग",
      ],
    },
  ],
  faqs: [
    {
      q: "दिल्ली में किन प्रवेश परीक्षाओं की कोचिंग?",
      a: "KVS भर्ती, CUET (विश्वविद्यालय प्रवेश) और CTET। पूछताछ फ़ॉर्म पर परीक्षा का नाम लिखें।",
    },
    {
      q: "क्या NIOS ट्यूशन के साथ प्रवेश कोचिंग?",
      a: "हाँ, कई विद्यार्थी NIOS 12वीं के साथ CUET या CTET जोड़ते हैं। हम साप्ताहिक घंटे की योजना बनाते हैं।",
    },
    {
      q: "क्या चयन की गारंटी?",
      a: "कोई संस्थान परिणाम की गारंटी नहीं दे सकता। हम संरचित शिक्षण और अभ्यास देते हैं; चयन आपकी तैयारी और कट-ऑफ़ पर निर्भर।",
    },
    {
      q: "बैच में कैसे शामिल हों?",
      a: "संपर्क पेज पर फ़ॉर्म भरें, प्रवेश कोचिंग चुनें और KVS/CUET/CTET लिखें। समय और फ़ीस के लिए कॉल करेंगे।",
    },
    {
      q: "कक्षाएँ कहाँ?",
      a: "श्री श्याम एकेडमी, वेस्ट सागरपुर, नई दिल्ली। +91 84485 37313।",
    },
  ],
};

export function getEntranceContent(locale: Locale) {
  return locale === "hi" ? hi : en;
}
