export const contact = {
  office: "Kampala, Uganda",
  email: "shebanahurira@gmail.com",
  phone: "+256 752 973 828",
  phoneHref: "tel:+256752973828",
  hours: "Mon – Fri, 9:00 – 17:00 EAT",
  whatsapp: "+256 752 973 828",
  whatsappHref: `https://wa.me/256752973828?text=${encodeURIComponent(
    "Hello Komushana Consultancy, I'd like to book a consultation.",
  )}`,
};

export type Service = {
  n: string;
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    n: "01",
    slug: "organisational-build",
    title: "Organisational Build & Startup Systems",
    short: "Structure, governance and accountability for organisations formalising or scaling.",
    body: "Designing organisational structures, governance frameworks, reporting cultures, and accountability systems for organisations formalising for the first time or going through significant growth.",
    points: [
      "Organisational structure & role design",
      "Governance & board frameworks",
      "Reporting cultures and accountability systems",
      "Founder-independent operating models",
    ],
  },
  {
    n: "02",
    slug: "hr-systems",
    title: "HR Systems & People Management",
    short: "Policies, contracts, handbooks and KPI frameworks built for Ugandan law.",
    body: "Building HR policy frameworks, employment contracts, staff handbooks, performance management systems, and KPI frameworks tailored to your size, sector, and Ugandan legal requirements.",
    points: [
      "HR policy frameworks & staff handbooks",
      "Employment contracts (Uganda-compliant)",
      "Performance management & KPI frameworks",
      "People management systems",
    ],
  },
  {
    n: "03",
    slug: "ngo-compliance",
    title: "NGO & CBO Compliance and Registration",
    short: "NGO Bureau registration, compliance, EU Quality Label and governance.",
    body: "Supporting non-governmental and community-based organisations with NGO Bureau registration, legal compliance, EU Quality Label acquisition, and governance structuring.",
    points: [
      "NGO Bureau registration support",
      "Legal & regulatory compliance",
      "EU Quality Label acquisition & application",
      "Governance structuring",
    ],
  },
  {
    n: "04",
    slug: "sme-operations",
    title: "SME & Startup Operations",
    short: "The internal systems growing businesses need to run consistently.",
    body: "Setting up the internal systems growing businesses need to function consistently — from HR and finance procedures to asset management and documentation.",
    points: [
      "HR policies & performance frameworks",
      "Company property & asset management",
      "Finance & requisition procedures",
      "Communication & documentation systems",
    ],
  },
  {
    n: "05",
    slug: "corporate-events",
    title: "Corporate Event Planning & Management",
    short: "End-to-end corporate events for NGOs and the private sector.",
    body: "Professional planning and execution of corporate events for both NGOs and private sector organisations — handled end to end.",
    points: [
      "Full event planning & coordination",
      "On-the-day execution & management",
      "Vendor & logistics handling",
      "NGO and private-sector events",
    ],
  },
];
