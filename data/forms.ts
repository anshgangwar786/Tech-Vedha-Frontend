
/**
 * Starter copy of the two enquiry forms. Every page that shows a form stores its OWN copy of one of these in its
 * content (e.g. home.contact.form, about.contact.form, contact.form, site.projectForm), so the labels, the service
 * choices, the messages and the "Enquiry sent" pop-up can differ from page to page. The objects below are only the
 * starting point: pages spread a deep copy (formCopy()) into their bundled content.
 */

/** Messages shown under a field when it is filled in wrong (lib/formValidation.ts). */
export const VALIDATION_COPY = {
  phoneRequired: "Mobile number is required.",
  phoneCharacters: "Use digits only.",
  phoneLength: "Must be 10 digits.",
  phoneStart: "Must start with 5, 6, 7, 8 or 9.",
  emailRequired: "Email is required.",
  emailTooLong: "Email is too long.",
  emailSpaces: "Remove the spaces.",
  emailOneAt: "Use one @, like name@company.com",
  emailNameMissing: "Add your name before the @.",
  emailDots: "Check the dots in your email.",
  emailDomain: "Check the part after the @.",
  nameRequired: "Name is required.",
  nameTooShort: "Enter at least 2 characters.",
  nameTooLong: "Name is too long.",
  nameNumbers: "Name can't contain numbers.",
  nameLetters: "Use letters only.",
  /** {field} = the field's name. */
  textRequired: "{field} is required.",
  textTooShort: "Enter at least 2 characters.",
  /** {max} = the character limit. */
  textTooLong: "Keep it under {max} characters.",
  serviceRequired: "Select at least one service.",
  otherServiceName: "The service you need",
  companyName: "Company",
  cityName: "City / country",
  timeframeRequired: "Pick when you'd like to start.",
};

export type ValidationCopy = typeof VALIDATION_COPY;

/** "Enquiry sent" pop-up shown after a form is sent. */
export const SENT_COPY = {
  /** Optional custom icon from the admin; empty shows the built-in tick. */
  icon: { src: "", alt: "", width: 64, height: 64 },
  title: "Enquiry sent",
  text: "Thank you. One person from our team will reply with next steps, and a written plan follows the discovery call.",
  homeLabel: "Back to home",
  homeHref: "/",
  closeLabel: "Close",
};

export type SentCopy = typeof SENT_COPY;

/** Short enquiry form ("Let's talk" block on the homepage, About and service pages). */
export const ENQUIRY_FORM_COPY = {
  formLabel: "Project enquiry",
  nameLabel: "Name",
  phoneLabel: "Phone / WhatsApp",
  phonePrefill: "+91 ",
  phonePlaceholder: "+91 98765 43210",
  emailLabel: "Email",
  serviceLabel: "Service",
  servicePlaceholder: "Select a service",
  /** Choices in the "Service" drop-down. */
  serviceOptions: ["Digital Marketing", "App Development", "CAD Design and Planning", "Software and Cybersecurity"],
  messageLabel: "Message",
  messagePlaceholder: "A few lines about your project",
  submitLabel: "Send enquiry",
  /** Shown when the server turns the enquiry down without a reason. */
  errorMessage: "Please check your details and try again.",
  /** Used when the visitor's email app opens instead (the website couldn't reach the admin). */
  emailSubject: "Project enquiry",
  emailNoService: "Not sure yet",
  validation: VALIDATION_COPY,
  sent: SENT_COPY,
};

export type EnquiryFormCopy = typeof ENQUIRY_FORM_COPY;

/** Full enquiry form (Contact page and the "Start a project" pop-up). */
export const CONTACT_FORM_COPY = {
  title: "Send an enquiry",
  requiredNote: "Fields marked * are required.",
  step1: "What you need",
  servicesLabel: "What do you need?",
  /** Choices in "What do you need?" (the "Others" choice is added after them). */
  serviceOptions: ["Digital Marketing", "App Development", "CAD Design and Planning", "Software and Cybersecurity"],
  otherServiceLabel: "Others",
  otherServicePlaceholder: "Tell us the service you need",
  step2: "About you",
  nameLabel: "Your name",
  namePlaceholder: "Full name",
  companyLabel: "Company",
  companyPlaceholder: "Business or brand name",
  phoneLabel: "Phone / WhatsApp",
  phonePrefill: "+91 ",
  phonePlaceholder: "98765 43210",
  emailLabel: "Email",
  emailPlaceholder: "you@company.com",
  cityLabel: "City / country",
  cityPlaceholder: "Where is the business?",
  step3: "Timing and details",
  timeframeLabel: "When do you want to start?",
  timeframePlaceholder: "Select a timeframe",
  /** Choices in "When do you want to start?". */
  timeframes: ["As soon as possible", "Within a month", "In 1–3 months", "Later this year", "Just exploring"],
  messageLabel: "Tell us about the project (optional)",
  messagePlaceholder: "Goals, current setup, anything we should know…",
  submitLabel: "Send enquiry",
  whatsappLabel: "Prefer WhatsApp? Send these details there",
  /** Shown instead of whatsappLabel on phones. */
  whatsappShortLabel: "Send on WhatsApp instead",
  note: "One person from our team replies with next steps. No spam, no sales calls.",
  /** Messages in the box under the buttons. */
  status: {
    fixFields: "Please fix the highlighted fields.",
    sending: "Sending your enquiry…",
    sent: "Your enquiry is in. We’ll reply with next steps.",
    error: "Please check your details and try again.",
    emailOpened: "Your email app should open with your details. Send it and we’ll reply.",
    whatsappOpened: "WhatsApp opened in a new tab with your details filled in.",
  },
  /** The ready-made message when the visitor sends by email or WhatsApp. */
  summary: {
    emailSubject: "Project enquiry",
    serviceLabel: "Service",
    servicesLabel: "Services",
    otherPrefix: "Other",
    startLabel: "Start",
    whatsappTitle: "NEW PROJECT ENQUIRY",
    whatsappSubtitle: "Sent from the website contact form",
    whatsappServicesHeading: "Services needed",
    whatsappContactHeading: "Contact details",
    whatsappLocationLabel: "Location",
    whatsappTimelineHeading: "Timeline",
    whatsappDetailsHeading: "Project details",
  },
  validation: VALIDATION_COPY,
  sent: SENT_COPY,
};

export type ContactFormCopy = typeof CONTACT_FORM_COPY;

/** A deep copy, so each page's bundled content is its own object. */
export const formCopy = <T,>(copy: T): T => structuredClone(copy);
