import type { Locale } from "@/i18n/config";

const en = {
  metaTitle: "NIOS Delhi News & Admission Updates | Shri Shyam Academy",
  metaDescription:
    "Latest NIOS Delhi / NCR admission notices, exam datesheets, and SDMIS updates from Regional Centre Delhi and NIOS India. Refreshed daily.",
  breadcrumb: "NIOS Delhi updates",
  eyebrow: "Updated daily · NIOS Delhi / NCR & national notices",
  title: "NIOS Delhi news & admission updates",
  lead: "Admission deadlines, exam schedules, and notices for Delhi NCR learners — from NIOS Regional Centre Delhi (Sector-62, Noida) and official NIOS India pages. Refreshed every 24 hours.",
  syncedLabel: "Last refreshed",
  filterAll: "All",
  readOfficial: "Read official notice",
  viewDetails: "View summary",
  helpTitle: "Need help with NIOS admission in Delhi?",
  helpLead: "We guide you through SDMIS, subject choice, and coaching at our West Sagarpur centre.",
  helpCta: "Enquire for NIOS admission",
  helpCall: "Call +91 84485 37313",
  disclaimer:
    "Notices are from NIOS Regional Centre Delhi / NCR (rcdelhi.nios.ac.in) and nios.ac.in. Always confirm dates on the official link before applying. For admission help in West Delhi, contact Shri Shyam Academy, West Sagarpur.",
  empty: "No updates in this category right now. Check back soon or call us for the latest admission help.",
  detailBack: "← All updates",
  detailSource: "Source",
  detailPublished: "Published",
  detailCategory: "Category",
  detailCta: "Get NIOS admission help",
};

const hi: typeof en = {
  metaTitle: "NIOS दिल्ली समाचार और दाखिला अपडेट | श्री श्याम एकेडमी",
  metaDescription:
    "NIOS दिल्ली / NCR दाखिला सूचनाएँ, परीक्षा डेटशीट और SDMIS अपडेट — क्षेत्रीय केंद्र दिल्ली और NIOS India से। रोज़ाना अपडेट।",
  breadcrumb: "NIOS दिल्ली अपडेट",
  eyebrow: "रोज़ाना अपडेट · NIOS दिल्ली / NCR",
  title: "NIOS दिल्ली समाचार और दाखिला अपडेट",
  lead: "दिल्ली NCR शिक्षार्थियों के लिए दाखिला अंतिम तिथि, परीक्षा कार्यक्रम और सूचनाएँ — NIOS क्षेत्रीय केंद्र दिल्ली (सेक्टर-62, नोएडा) और आधिकारिक NIOS India से। हर 24 घंटे में रिफ्रेश।",
  syncedLabel: "अंतिम अपडेट",
  filterAll: "सभी",
  readOfficial: "आधिकारिक सूचना पढ़ें",
  viewDetails: "सारांश देखें",
  helpTitle: "दिल्ली में NIOS दाखिले में मदद चाहिए?",
  helpLead: "SDMIS, विषय चयन और वेस्ट सागरपुर केंद्र पर कोचिंग में मार्गदर्शन।",
  helpCta: "NIOS दाखिला पूछताछ",
  helpCall: "+91 84485 37313 पर कॉल करें",
  disclaimer:
    "सूचनाएँ NIOS क्षेत्रीय केंद्र दिल्ली / NCR (rcdelhi.nios.ac.in) और nios.ac.in से हैं। आवेदन से पहले आधिकारिक लिंक पर तिथि पुष्टि करें। वेस्ट दिल्ली में दाखिला सहायता: श्री श्याम एकेडमी, वेस्ट सागरपुर।",
  empty: "इस श्रेणी में अभी कोई अपडेट नहीं। जल्द देखें या नवीनतम दाखिला सहायता के लिए कॉल करें।",
  detailBack: "← सभी अपडेट",
  detailSource: "स्रोत",
  detailPublished: "प्रकाशित",
  detailCategory: "श्रेणी",
  detailCta: "NIOS दाखिला सहायता लें",
};

export function getUpdatesContent(locale: Locale) {
  return locale === "hi" ? hi : en;
}
