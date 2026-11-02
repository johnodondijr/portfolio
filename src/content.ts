// Copy that rarely changes lives here. Projects and testimonials come from Supabase.
export const contact = {
  email: "johnfredonly@gmail.com",
  phone: "+254 704 320 399",
  phoneHref: "tel:+254704320399",
  whatsapp: "https://wa.me/254704320399",
};

export const stats = [
  { value: 3, label: "+ years of design" },
  { value: 100, label: "+ designs delivered" },
  { value: 5, label: "+ happy clients" },
];

export const services = [
  {
    icon: "instagram",
    title: "Social Media Graphics",
    text: "Eye-catching posts, carousels, stories and ads that stop the scroll and keep your feed looking consistent.",
    tags: ["Posts", "Carousels", "Stories", "Ads"],
  },
  {
    icon: "print",
    title: "Posters & Print",
    text: "Event posters, flyers and booklets that grab attention and work just as well printed as they do online.",
    tags: ["Posters", "Flyers", "Booklets"],
  },
  {
    icon: "star",
    title: "Brand Identity",
    text: "Logos, colour palettes and typography that give your business a clear and memorable personality.",
    tags: ["Logo", "Colours", "Guidelines"],
  },
  {
    icon: "screen",
    title: "UI Design",
    text: "Clean, modern screens for websites and mobile apps, designed to look good and feel easy to use.",
    tags: ["Web", "Mobile", "Figma"],
  },
] as const;

export const extras = ["AI generated visuals", "Copywriting", "Custom tools & SaaS"];

export const tools = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Figma",
  "Canva",
  "After Effects",
  "InDesign",
  "ChatGPT",
  "Gemini",
  "Claude",
];

export const filters = [
  { id: "all", label: "All" },
  { id: "social", label: "Social Media" },
  { id: "ui", label: "UI Design" },
  { id: "branding", label: "Branding" },
] as const;

export const process = [
  { title: "Brief", text: "You tell me about your brand, your goals and who you want to reach." },
  { title: "Ideas", text: "I research, gather inspiration and sketch out a few creative directions." },
  { title: "Design", text: "I develop the chosen idea and refine it with your feedback until it's right." },
  { title: "Delivery", text: "You receive high quality files, ready to post, print or hand over to developers." },
];

export const faqs = [
  {
    q: "What kind of design work do you do?",
    a: "I mainly design social media graphics such as posts, carousels, stories and ads. I also create event posters, flyers, booklets, logos, brand identities and UI designs for websites and apps.",
  },
  {
    q: "Can you design for my social media every month?",
    a: "Yes. I offer monthly design packages so your pages stay active, consistent and on brand all month long.",
  },
  {
    q: "How long does a project take?",
    a: "Most social media designs are ready within 2 to 4 days. Branding and UI projects usually take 1 to 3 weeks, depending on the scope.",
  },
  {
    q: "Do you use AI in your designs?",
    a: "Yes, as a creative assistant. AI helps me explore ideas, generate visuals and polish copy faster, but every design is directed, refined and finished by me so it stays original and true to your brand.",
  },
  {
    q: "How much do you charge?",
    a: "Every project is different, so pricing depends on what you need. Send me a message with your project details and I'll get back to you with a quote.",
  },
  {
    q: "How do I get started?",
    a: `Send me an email, call or WhatsApp me on ${contact.phone} and tell me a little about your brand and what you need. I'll reply and we'll take it from there.`,
  },
];
