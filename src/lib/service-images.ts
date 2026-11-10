import orgBuild from "@/assets/service-org-build.jpg";
import hr from "@/assets/service-hr.jpg";
import ngo from "@/assets/service-ngo.jpg";
import sme from "@/assets/service-sme.jpg";
import events from "@/assets/service-events.jpg";

export type ServiceImage = { src: string; alt: string; width: number; height: number };

/** One distinct photo per service - never reuse a photo across services. */
export const serviceImages: Record<string, ServiceImage> = {
  "organisational-build": {
    src: orgBuild,
    alt: "A team mapping an organisational structure with notes on an office wall in Kampala",
    width: 1280,
    height: 1600,
  },
  "hr-systems": {
    src: hr,
    alt: "An HR manager holding a one-on-one review with a staff member",
    width: 1440,
    height: 1440,
  },
  "ngo-compliance": {
    src: ngo,
    alt: "A community organisation leader signing registration documents",
    width: 1440,
    height: 1440,
  },
  "sme-operations": {
    src: sme,
    alt: "A business owner and assistant taking stock in a tidy storeroom",
    width: 1440,
    height: 1440,
  },
  "corporate-events": {
    src: events,
    alt: "A corporate conference in a hotel ballroom with a speaker on stage",
    width: 1280,
    height: 1600,
  },
};
