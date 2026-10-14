import type { Lang } from "@/components/content";

type Localized = Record<Lang, string>;
type ProductId = "FixTrack" | "FixWork" | "FixSight";
export type CustomerIconKey = "briefcase" | "truck" | "users" | "shield" | "cpu" | "bus" | "pickaxe" | "blocks" | "recycle" | "cold";

export type CustomerMenuItem = {
  slug: string;
  label: Localized;
  description: Localized;
  icon: CustomerIconKey;
};

export const customerMenuGroups: { id: "role" | "industry"; heading: Localized; items: CustomerMenuItem[] }[] = [
  {
    id: "role",
    heading: { en: "Customer by Role", id: "Pelanggan berdasarkan Peran" },
    items: [
      { slug: "business-owners-executives", icon: "briefcase", label: { en: "Business Owners & Executives", id: "Pemilik Bisnis & Eksekutif" }, description: { en: "Help your business run more efficiently with better visibility into assets, workforce, and operational activity.", id: "Bantu bisnis berjalan lebih efisien dengan visibilitas yang lebih baik terhadap aset, tenaga kerja, dan aktivitas operasional." } },
      { slug: "operations-fleet-managers", icon: "truck", label: { en: "Operations & Fleet Managers", id: "Manajer Operasional & Armada" }, description: { en: "Keep operations under control by monitoring vehicle conditions, trips, and fleet activity in one system.", id: "Jaga operasional tetap terkendali dengan memantau kondisi kendaraan, perjalanan, dan aktivitas armada dalam satu sistem." } },
      { slug: "hr-workforce-leaders", icon: "users", label: { en: "HR & Workforce Leaders", id: "Pimpinan HR & Tenaga Kerja" }, description: { en: "Simplify employee management so HR teams can work in a more structured way without repetitive manual processes.", id: "Sederhanakan pengelolaan karyawan agar tim HR bisa bekerja lebih terstruktur tanpa terbebani proses manual yang berulang." } },
      { slug: "hse-safety-security-leaders", icon: "shield", label: { en: "HSE, Safety & Security Leaders", id: "Pimpinan HSE, Keselamatan & Keamanan" }, description: { en: "Improve workplace visibility with intelligent monitoring that helps teams identify potential risks earlier.", id: "Tingkatkan visibilitas di area kerja dengan pemantauan cerdas yang membantu tim mengenali potensi risiko lebih awal." } },
      { slug: "it-digital-transformation-leaders", icon: "cpu", label: { en: "IT & Digital Transformation Leaders", id: "Pimpinan TI & Transformasi Digital" }, description: { en: "Choose solutions that fit operational needs and help your company use technology more effectively.", id: "Pilih solusi yang sesuai dengan kebutuhan operasional dan bantu perusahaan memanfaatkan teknologi secara lebih efektif." } },
    ],
  },
  {
    id: "industry",
    heading: { en: "Customer by Industry", id: "Pelanggan berdasarkan Industri" },
    items: [
      { slug: "logistics", icon: "truck", label: { en: "Logistics", id: "Logistik" }, description: { en: "Track fleet activity and delivery journeys to keep distribution operations visible and under control.", id: "Pantau aktivitas armada dan perjalanan pengiriman agar operasional distribusi tetap terlihat dan terkendali." } },
      { slug: "public-transportation", icon: "bus", label: { en: "Public Transportation", id: "Transportasi Umum" }, description: { en: "Monitor vehicle locations and status to support more coordinated public transportation operations.", id: "Pantau lokasi dan status kendaraan untuk mendukung operasional transportasi umum yang lebih terkoordinasi." } },
      { slug: "mining", icon: "pickaxe", label: { en: "Mining", id: "Pertambangan" }, description: { en: "Track fleet and vehicle movement across large and remote mining sites.", id: "Pantau pergerakan armada dan kendaraan di area tambang yang luas dan terpencil." } },
      { slug: "ready-mix-concrete", icon: "blocks", label: { en: "Ready-Mix Concrete", id: "Beton Siap Pakai" }, description: { en: "Monitor concrete delivery journeys and fleet status with greater visibility.", id: "Pantau perjalanan armada pengiriman beton dan status pengiriman dengan lebih mudah." } },
      { slug: "construction", icon: "blocks", label: { en: "Construction", id: "Konstruksi" }, description: { en: "Track vehicles and heavy equipment moving between project sites.", id: "Pantau kendaraan dan alat berat yang bergerak di antara berbagai lokasi proyek." } },
      { slug: "waste-management", icon: "recycle", label: { en: "Waste Management", id: "Pengelolaan Limbah" }, description: { en: "Track collection routes and fleet activity to support waste management operations.", id: "Pantau rute pengangkutan dan aktivitas armada untuk mendukung operasional pengelolaan limbah." } },
      { slug: "bus-operators", icon: "bus", label: { en: "Bus Operators", id: "Operator Bus" }, description: { en: "Monitor bus locations and journeys to help keep services coordinated.", id: "Pantau lokasi dan perjalanan bus agar operasional layanan lebih terkoordinasi." } },
      { slug: "cold-chain", icon: "cold", label: { en: "Cold Chain", id: "Rantai Dingin" }, description: { en: "Follow vehicles and delivery routes supporting temperature-sensitive goods.", id: "Pantau kendaraan dan rute pengiriman barang yang sensitif terhadap suhu." } },
    ],
  },
];

export type CustomerBenefit = { title: Localized; description: Localized; product: ProductId };

export type BenefitPreset = "leadership" | "fleet" | "workforce" | "safety" | "technology" | "distribution" | "transit" | "mining" | "concrete" | "construction" | "waste" | "bus" | "coldChain";

const benefitPresets: Record<BenefitPreset, CustomerBenefit[]> = {
  leadership: [
    { title: { en: "Fleet visibility", id: "Visibilitas armada" }, description: { en: "Review vehicle locations, journeys, and fleet activity alongside the rest of your operation.", id: "Tinjau lokasi kendaraan, perjalanan, dan aktivitas armada bersama informasi operasional lainnya." }, product: "FixTrack" },
    { title: { en: "Workforce processes", id: "Proses tenaga kerja" }, description: { en: "Bring employee records, attendance, payroll, and HR workflows into one integrated platform.", id: "Kelola data karyawan, absensi, payroll, dan alur kerja HR dalam satu platform terintegrasi." }, product: "FixWork" },
    { title: { en: "Workplace monitoring", id: "Pemantauan area kerja" }, description: { en: "Use existing CCTV for visibility into workplace activity, safety compliance, and potential risks.", id: "Manfaatkan CCTV yang tersedia untuk melihat aktivitas kerja, kepatuhan keselamatan, dan potensi risiko." }, product: "FixSight" },
  ],
  fleet: [
    { title: { en: "Vehicle location", id: "Lokasi kendaraan" }, description: { en: "Keep vehicle locations and movement visible to the people coordinating fleet operations.", id: "Buat lokasi dan pergerakan kendaraan lebih mudah dilihat oleh tim yang mengoordinasikan armada." }, product: "FixTrack" },
    { title: { en: "Trip context", id: "Konteks perjalanan" }, description: { en: "Review journeys, vehicle status, and activity to understand how fleet operations are progressing.", id: "Tinjau perjalanan, status kendaraan, dan aktivitas untuk memahami perkembangan operasional armada." }, product: "FixTrack" },
    { title: { en: "Operational decisions", id: "Keputusan operasional" }, description: { en: "Use fleet data and the AI Control Tower to identify issues and prioritize action.", id: "Gunakan data armada dan AI Control Tower untuk mengenali masalah dan menentukan prioritas tindakan." }, product: "FixTrack" },
  ],
  workforce: [
    { title: { en: "Employee information", id: "Informasi karyawan" }, description: { en: "Manage employee data in an integrated platform for HR and workforce processes.", id: "Kelola data karyawan dalam platform terintegrasi untuk proses HR dan tenaga kerja." }, product: "FixWork" },
    { title: { en: "Attendance and payroll", id: "Absensi dan payroll" }, description: { en: "Connect attendance and payroll tasks with the wider employee administration workflow.", id: "Hubungkan tugas absensi dan payroll dengan alur administrasi karyawan yang lebih luas." }, product: "FixWork" },
    { title: { en: "Structured HR workflows", id: "Alur kerja HR yang terstruktur" }, description: { en: "Organize recruitment, onboarding, approvals, and administration in one place.", id: "Tata proses rekrutmen, onboarding, persetujuan, dan administrasi dalam satu tempat." }, product: "FixWork" },
  ],
  safety: [
    { title: { en: "Workplace activity", id: "Aktivitas area kerja" }, description: { en: "Turn conventional CCTV into AI-powered monitoring for workplace activity and productivity.", id: "Ubah CCTV konvensional menjadi pemantauan berbasis AI untuk aktivitas dan produktivitas kerja." }, product: "FixSight" },
    { title: { en: "Safety compliance", id: "Kepatuhan keselamatan" }, description: { en: "Monitor safety compliance and PPE use through existing camera coverage.", id: "Pantau kepatuhan keselamatan dan penggunaan APD melalui jangkauan kamera yang tersedia." }, product: "FixSight" },
    { title: { en: "Potential risks", id: "Potensi risiko" }, description: { en: "Improve visibility into activity that can help teams identify potential risks earlier.", id: "Tingkatkan visibilitas aktivitas untuk membantu tim mengenali potensi risiko lebih awal." }, product: "FixSight" },
  ],
  technology: [
    { title: { en: "Fit the operational need", id: "Sesuai kebutuhan operasional" }, description: { en: "Explore fleet, workforce, and AI monitoring products according to the processes that need support.", id: "Pilih solusi armada, tenaga kerja, dan pemantauan AI sesuai proses yang perlu didukung." }, product: "FixTrack" },
    { title: { en: "Evaluate integration", id: "Evaluasi integrasi" }, description: { en: "Discuss integrations based on current systems, required data, and technical readiness.", id: "Diskusikan integrasi berdasarkan sistem yang digunakan, data yang dibutuhkan, dan kesiapan teknis." }, product: "FixWork" },
    { title: { en: "Connect operational visibility", id: "Hubungkan visibilitas operasional" }, description: { en: "Explore the product mix that best matches your operational scope and implementation needs.", id: "Jelajahi kombinasi produk yang sesuai dengan cakupan operasi dan kebutuhan implementasi." }, product: "FixSight" },
  ],
  distribution: [
    { title: { en: "Fleet and delivery activity", id: "Aktivitas armada dan pengiriman" }, description: { en: "Follow fleet activity and delivery journeys across distribution operations.", id: "Pantau aktivitas armada dan perjalanan pengiriman dalam operasional distribusi." }, product: "FixTrack" },
    { title: { en: "Trip and vehicle context", id: "Konteks perjalanan dan kendaraan" }, description: { en: "Review vehicle locations, status, and journeys in one operational view.", id: "Tinjau lokasi, status, dan perjalanan kendaraan dalam satu tampilan operasional." }, product: "FixTrack" },
    { title: { en: "Fleet-based decisions", id: "Keputusan berbasis data armada" }, description: { en: "Use fleet information to identify issues and determine what needs attention.", id: "Gunakan informasi armada untuk mengenali masalah dan menentukan hal yang perlu ditangani." }, product: "FixTrack" },
  ],
  transit: [
    { title: { en: "Vehicle location and status", id: "Lokasi dan status kendaraan" }, description: { en: "Monitor vehicle locations and status to support coordinated transportation operations.", id: "Pantau lokasi dan status kendaraan untuk mendukung operasional transportasi yang terkoordinasi." }, product: "FixTrack" },
    { title: { en: "Journeys and movement", id: "Perjalanan dan pergerakan" }, description: { en: "Keep vehicle movement visible as teams coordinate service activity.", id: "Buat pergerakan kendaraan terlihat saat tim mengoordinasikan aktivitas layanan." }, product: "FixTrack" },
    { title: { en: "Operational context", id: "Konteks operasional" }, description: { en: "Review fleet activity and trip information to support day-to-day decisions.", id: "Tinjau aktivitas armada dan informasi perjalanan untuk mendukung keputusan harian." }, product: "FixTrack" },
  ],
  mining: [
    { title: { en: "Remote fleet visibility", id: "Visibilitas armada di lokasi terpencil" }, description: { en: "Track fleet and vehicle movement across large and remote mining sites.", id: "Pantau pergerakan armada dan kendaraan di area tambang yang luas dan terpencil." }, product: "FixTrack" },
    { title: { en: "Vehicle activity", id: "Aktivitas kendaraan" }, description: { en: "Review vehicle locations, journeys, and movement as part of daily operations.", id: "Tinjau lokasi, perjalanan, dan pergerakan kendaraan dalam aktivitas operasional harian." }, product: "FixTrack" },
    { title: { en: "Worksite visibility", id: "Visibilitas area kerja" }, description: { en: "Use AI CCTV monitoring to gain visibility into workplace activity and safety compliance.", id: "Gunakan pemantauan CCTV AI untuk melihat aktivitas kerja dan kepatuhan keselamatan." }, product: "FixSight" },
  ],
  concrete: [
    { title: { en: "Delivery journeys", id: "Perjalanan pengiriman" }, description: { en: "Monitor concrete delivery journeys and fleet status with greater visibility.", id: "Pantau perjalanan pengiriman beton dan status armada dengan visibilitas yang lebih baik." }, product: "FixTrack" },
    { title: { en: "Fleet movement", id: "Pergerakan armada" }, description: { en: "Follow vehicle locations and movement during delivery operations.", id: "Pantau lokasi dan pergerakan kendaraan selama proses pengiriman." }, product: "FixTrack" },
    { title: { en: "Delivery operations", id: "Operasional pengiriman" }, description: { en: "Use trip information and fleet activity to support operational decisions.", id: "Gunakan informasi perjalanan dan aktivitas armada untuk mendukung keputusan operasional." }, product: "FixTrack" },
  ],
  construction: [
    { title: { en: "Vehicles and equipment", id: "Kendaraan dan alat berat" }, description: { en: "Track vehicles and heavy equipment moving between project sites.", id: "Pantau kendaraan dan alat berat yang bergerak di antara berbagai lokasi proyek." }, product: "FixTrack" },
    { title: { en: "Movement between sites", id: "Pergerakan antar lokasi" }, description: { en: "Review locations and journeys to keep fleet movement visible across projects.", id: "Tinjau lokasi dan perjalanan agar pergerakan armada terlihat di berbagai proyek." }, product: "FixTrack" },
    { title: { en: "Worksite activity", id: "Aktivitas area kerja" }, description: { en: "Use AI CCTV to monitor workplace activity and safety compliance on site.", id: "Gunakan CCTV AI untuk memantau aktivitas kerja dan kepatuhan keselamatan di lokasi." }, product: "FixSight" },
  ],
  waste: [
    { title: { en: "Collection routes", id: "Rute pengangkutan" }, description: { en: "Track collection routes to support waste management operations.", id: "Pantau rute pengangkutan untuk mendukung operasional pengelolaan limbah." }, product: "FixTrack" },
    { title: { en: "Fleet activity", id: "Aktivitas armada" }, description: { en: "Review vehicle locations and movement during collection activity.", id: "Tinjau lokasi dan pergerakan kendaraan selama aktivitas pengangkutan." }, product: "FixTrack" },
    { title: { en: "Operational decisions", id: "Keputusan operasional" }, description: { en: "Use trip and fleet information to identify issues and prioritize action.", id: "Gunakan informasi perjalanan dan armada untuk mengenali masalah dan menentukan prioritas tindakan." }, product: "FixTrack" },
  ],
  bus: [
    { title: { en: "Bus locations", id: "Lokasi bus" }, description: { en: "Monitor bus locations to help keep services coordinated.", id: "Pantau lokasi bus agar operasional layanan lebih terkoordinasi." }, product: "FixTrack" },
    { title: { en: "Bus journeys", id: "Perjalanan bus" }, description: { en: "Review journeys and vehicle movement as teams coordinate service activity.", id: "Tinjau perjalanan dan pergerakan kendaraan saat tim mengoordinasikan aktivitas layanan." }, product: "FixTrack" },
    { title: { en: "Fleet status", id: "Status armada" }, description: { en: "Keep fleet activity and vehicle status visible in day-to-day operations.", id: "Buat aktivitas armada dan status kendaraan terlihat dalam operasional harian." }, product: "FixTrack" },
  ],
  coldChain: [
    { title: { en: "Delivery route visibility", id: "Visibilitas rute pengiriman" }, description: { en: "Follow vehicles and routes supporting temperature-sensitive deliveries.", id: "Pantau kendaraan dan rute yang mendukung pengiriman barang sensitif terhadap suhu." }, product: "FixTrack" },
    { title: { en: "Vehicle movement", id: "Pergerakan kendaraan" }, description: { en: "Review vehicle locations and movement as goods move between destinations.", id: "Tinjau lokasi dan pergerakan kendaraan saat barang berpindah antar tujuan." }, product: "FixTrack" },
    { title: { en: "Trip context", id: "Konteks perjalanan" }, description: { en: "Use trip information and fleet activity to support delivery operations.", id: "Gunakan informasi perjalanan dan aktivitas armada untuk mendukung operasional pengiriman." }, product: "FixTrack" },
  ],
};

export type CustomerPageData = {
  slug: string;
  group: "role" | "industry";
  preset: BenefitPreset;
  products: ProductId[];
  image: string;
  imageAlt: Localized;
  imagePosition: string;
  faqIndexes: number[];
  en: { title: string; intro: string; solutionTitle: string; solutionIntro: string; featureTitle: string; faqTitle: string; faqIntro: string; trustTitle: string };
  id: { title: string; intro: string; solutionTitle: string; solutionIntro: string; featureTitle: string; faqTitle: string; faqIntro: string; trustTitle: string };
};

export const customerPages: Record<string, CustomerPageData> = {
  "business-owners-executives": {
    slug: "business-owners-executives", group: "role", preset: "leadership", products: ["FixTrack", "FixWork", "FixSight"], image: "/customer-photos/business-owners-executives.webp", imageAlt: { en: "Business executives discussing plans around a boardroom table", id: "Para eksekutif bisnis membahas rencana di meja ruang rapat" }, imagePosition: "50% 50%", faqIndexes: [0, 2, 4, 5],
    en: { title: "See the operation behind every decision.", intro: "Bring fleet activity, workforce processes, and workplace monitoring into clearer view to support informed day-to-day decisions.", solutionTitle: "A broader view of business operations", solutionIntro: "Explore the Treffix products that help leaders understand activity across vehicles, teams, and work sites.", featureTitle: "Choose the operational area to explore", faqTitle: "Questions from business leaders", faqIntro: "Learn how Treffix solutions can fit your operational scope.", trustTitle: "Organizations using Treffix" },
    id: { title: "Lihat gambaran operasional di balik setiap keputusan.", intro: "Dapatkan visibilitas lebih jelas atas aktivitas armada, proses tenaga kerja, dan pemantauan area kerja untuk mendukung keputusan harian.", solutionTitle: "Gambaran yang lebih luas tentang operasional bisnis", solutionIntro: "Kenali produk Treffix untuk memahami aktivitas kendaraan, tim, dan area kerja.", featureTitle: "Pilih area operasional yang ingin Anda kenali", faqTitle: "Pertanyaan dari pimpinan bisnis", faqIntro: "Kenali cara solusi Treffix dapat sesuai dengan cakupan operasional Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "operations-fleet-managers": {
    slug: "operations-fleet-managers", group: "role", preset: "fleet", products: ["FixTrack"], image: "/customer-photos/operations-fleet-managers.webp", imageAlt: { en: "A logistics worker checking a cargo truck", id: "Pekerja logistik memeriksa truk kargo" }, imagePosition: "70% 50%", faqIndexes: [0, 2, 3, 4],
    en: { title: "Keep fleet activity in clearer view.", intro: "Follow vehicle locations, journeys, and fleet activity to support the teams coordinating daily operations.", solutionTitle: "Fleet information for day-to-day operations", solutionIntro: "FixTrack brings together vehicle and trip visibility to help teams identify issues and prioritize action.", featureTitle: "Explore fleet capabilities", faqTitle: "Questions from operations teams", faqIntro: "Find out how fleet tracking fits your vehicles and operating needs.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau aktivitas armada dengan lebih jelas.", intro: "Ikuti lokasi kendaraan, perjalanan, dan aktivitas armada untuk mendukung tim yang mengoordinasikan operasional harian.", solutionTitle: "Informasi armada untuk operasional harian", solutionIntro: "FixTrack menyatukan visibilitas kendaraan dan perjalanan untuk membantu tim mengenali masalah dan menentukan prioritas tindakan.", featureTitle: "Kenali kemampuan pelacakan armada", faqTitle: "Pertanyaan dari tim operasional", faqIntro: "Ketahui bagaimana pelacakan armada sesuai dengan kendaraan dan kebutuhan operasional Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "hr-workforce-leaders": {
    slug: "hr-workforce-leaders", group: "role", preset: "workforce", products: ["FixWork"], image: "/customer-photos/hr-workforce-leaders.webp", imageAlt: { en: "An HR professional interviewing a job candidate in an office", id: "Profesional HR mewawancarai kandidat kerja di kantor" }, imagePosition: "50% 45%", faqIndexes: [0, 2, 3, 4, 5],
    en: { title: "Bring people operations into a clearer workflow.", intro: "Organize employee data, attendance, payroll, recruitment, and everyday HR administration through FixWork.", solutionTitle: "More structure for workforce management", solutionIntro: "FixWork helps teams manage employee information and connect common HR processes in one platform.", featureTitle: "Explore workforce capabilities", faqTitle: "Questions from HR teams", faqIntro: "Learn about the devices, processes, and implementation considerations for FixWork.", trustTitle: "Organizations using Treffix" },
    id: { title: "Tata operasional tenaga kerja dengan alur yang lebih jelas.", intro: "Kelola data karyawan, absensi, payroll, rekrutmen, dan administrasi HR harian melalui FixWork.", solutionTitle: "Pengelolaan tenaga kerja yang lebih terstruktur", solutionIntro: "FixWork membantu tim mengelola informasi karyawan dan menghubungkan proses HR dalam satu platform.", featureTitle: "Kenali kemampuan pengelolaan tenaga kerja", faqTitle: "Pertanyaan dari tim HR", faqIntro: "Pelajari perangkat, proses, dan persiapan implementasi FixWork.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "hse-safety-security-leaders": {
    slug: "hse-safety-security-leaders", group: "role", preset: "safety", products: ["FixSight"], image: "/customer-photos/hse-safety-security-leaders.webp", imageAlt: { en: "A factory worker in a hard hat inspecting industrial equipment", id: "Pekerja pabrik dengan helm keselamatan memeriksa peralatan industri" }, imagePosition: "60% 48%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "See workplace activity and safety in context.", intro: "Use AI-powered CCTV monitoring to review workplace activity, safety compliance, PPE use, and potential risks.", solutionTitle: "More visibility for safety teams", solutionIntro: "FixSight turns conventional CCTV into AI-powered monitoring for workplace activity and safety compliance.", featureTitle: "Explore workplace monitoring capabilities", faqTitle: "Questions about safety monitoring", faqIntro: "Review how AI CCTV fits existing cameras and operating conditions.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pahami aktivitas dan keselamatan kerja secara lebih utuh.", intro: "Gunakan pemantauan CCTV berbasis AI untuk melihat aktivitas kerja, kepatuhan keselamatan, penggunaan APD, dan potensi risiko.", solutionTitle: "Visibilitas lebih baik bagi tim keselamatan", solutionIntro: "FixSight mengubah CCTV konvensional menjadi pemantauan berbasis AI untuk aktivitas dan kepatuhan keselamatan kerja.", featureTitle: "Kenali kemampuan pemantauan area kerja", faqTitle: "Pertanyaan tentang pemantauan keselamatan", faqIntro: "Pelajari kesesuaian CCTV AI dengan kamera dan kondisi operasional yang tersedia.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "it-digital-transformation-leaders": {
    slug: "it-digital-transformation-leaders", group: "role", preset: "technology", products: ["FixTrack", "FixWork", "FixSight"], image: "/customer-photos/it-digital-transformation-leaders.webp", imageAlt: { en: "Technology professionals collaborating at computers in an office", id: "Para profesional teknologi berkolaborasi di depan komputer di kantor" }, imagePosition: "55% 50%", faqIndexes: [0, 2, 3, 4],
    en: { title: "Connect the tools that fit your operations.", intro: "Explore fleet, workforce, and AI monitoring solutions according to your systems, data needs, and implementation scope.", solutionTitle: "Digital solutions shaped around operational needs", solutionIntro: "Evaluate the right Treffix products and integration approach for your technical environment.", featureTitle: "Explore the Treffix product capabilities", faqTitle: "Questions about systems and integration", faqIntro: "Integration needs are evaluated against current systems, required data, and technical readiness.", trustTitle: "Organizations using Treffix" },
    id: { title: "Hubungkan teknologi yang sesuai dengan operasional Anda.", intro: "Jelajahi solusi armada, tenaga kerja, dan pemantauan AI berdasarkan sistem, kebutuhan data, dan cakupan implementasi.", solutionTitle: "Solusi digital sesuai kebutuhan operasional", solutionIntro: "Evaluasi produk Treffix dan pendekatan integrasi yang sesuai dengan lingkungan teknis Anda.", featureTitle: "Kenali kemampuan produk Treffix", faqTitle: "Pertanyaan tentang sistem dan integrasi", faqIntro: "Kebutuhan integrasi dievaluasi berdasarkan sistem yang digunakan, data yang dibutuhkan, dan kesiapan teknis.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  logistics: {
    slug: "logistics", group: "industry", preset: "distribution", products: ["FixTrack"], image: "/customer-photos/logistics.webp", imageAlt: { en: "A freight truck leaving a warehouse loading dock", id: "Truk kargo keluar dari area bongkar muat gudang" }, imagePosition: "50% 55%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Follow fleet movement across distribution operations.", intro: "Keep vehicle locations, fleet activity, and delivery journeys visible as goods move through logistics operations.", solutionTitle: "Fleet visibility for logistics and distribution", solutionIntro: "FixTrack helps teams follow vehicles and trips and understand activity across their distribution operations.", featureTitle: "Explore fleet capabilities for logistics", faqTitle: "Questions from logistics teams", faqIntro: "Learn how fleet tracking can support your delivery operations.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau pergerakan armada dalam operasional distribusi.", intro: "Lihat lokasi kendaraan, aktivitas armada, dan perjalanan pengiriman saat barang bergerak dalam operasional logistik.", solutionTitle: "Visibilitas armada untuk logistik dan distribusi", solutionIntro: "FixTrack membantu tim memantau kendaraan dan perjalanan serta memahami aktivitas distribusi.", featureTitle: "Kenali kemampuan armada untuk logistik", faqTitle: "Pertanyaan dari tim logistik", faqIntro: "Pelajari bagaimana pelacakan armada mendukung operasional pengiriman Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "public-transportation": {
    slug: "public-transportation", group: "industry", preset: "transit", products: ["FixTrack"], image: "/customer-photos/public-transportation.webp", imageAlt: { en: "A city bus traveling along an urban street", id: "Bus kota melaju di jalan perkotaan" }, imagePosition: "72% 50%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Coordinate public transport with clearer vehicle visibility.", intro: "Monitor vehicle locations, status, and movement to support coordinated public transportation operations.", solutionTitle: "Vehicle visibility for transportation teams", solutionIntro: "FixTrack gives teams fleet and trip information to support day-to-day transportation decisions.", featureTitle: "Explore transportation fleet capabilities", faqTitle: "Questions from transportation teams", faqIntro: "Understand how fleet tracking aligns with your vehicles and operating scope.", trustTitle: "Organizations using Treffix" },
    id: { title: "Koordinasikan transportasi umum dengan visibilitas kendaraan yang lebih jelas.", intro: "Pantau lokasi, status, dan pergerakan kendaraan untuk mendukung operasional transportasi umum yang terkoordinasi.", solutionTitle: "Visibilitas kendaraan untuk tim transportasi", solutionIntro: "FixTrack menyediakan informasi armada dan perjalanan untuk mendukung keputusan transportasi harian.", featureTitle: "Kenali kemampuan armada transportasi", faqTitle: "Pertanyaan dari tim transportasi", faqIntro: "Pahami kesesuaian pelacakan armada dengan kendaraan dan cakupan operasional Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  mining: {
    slug: "mining", group: "industry", preset: "mining", products: ["FixTrack", "FixSight"], image: "/customer-photos/mining.webp", imageAlt: { en: "A haul truck transporting material in an open-pit mine", id: "Truk tambang mengangkut material di tambang terbuka" }, imagePosition: "48% 52%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Keep fleet activity visible across remote sites.", intro: "Follow vehicle movement across large mining areas and explore AI CCTV monitoring for workplace visibility.", solutionTitle: "Visibility for mining operations", solutionIntro: "Bring fleet tracking and workplace monitoring into view for teams coordinating activity across sites.", featureTitle: "Explore fleet and worksite capabilities", faqTitle: "Questions from mining teams", faqIntro: "Explore which Treffix features are relevant to your operational locations and processes.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau aktivitas armada di lokasi operasional terpencil.", intro: "Ikuti pergerakan kendaraan di area tambang yang luas dan kenali pemantauan CCTV AI untuk visibilitas area kerja.", solutionTitle: "Visibilitas untuk operasional pertambangan", solutionIntro: "Pantau armada dan area kerja untuk membantu tim mengoordinasikan aktivitas di berbagai lokasi.", featureTitle: "Kenali kemampuan armada dan area kerja", faqTitle: "Pertanyaan dari tim pertambangan", faqIntro: "Jelajahi fitur Treffix yang relevan dengan lokasi dan proses operasional Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "ready-mix-concrete": {
    slug: "ready-mix-concrete", group: "industry", preset: "concrete", products: ["FixTrack"], image: "/customer-photos/ready-mix-concrete.webp", imageAlt: { en: "Construction workers pouring concrete from a mixer truck", id: "Pekerja konstruksi menuangkan beton dari truk molen" }, imagePosition: "62% 50%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Keep concrete deliveries and fleet activity in view.", intro: "Monitor concrete delivery journeys and fleet status to support better visibility across delivery operations.", solutionTitle: "Fleet tracking for ready-mix operations", solutionIntro: "FixTrack helps teams review vehicle movement and delivery journeys as part of daily operations.", featureTitle: "Explore delivery fleet capabilities", faqTitle: "Questions about ready-mix operations", faqIntro: "Learn how fleet tracking can fit your delivery processes and vehicle needs.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau pengiriman beton dan aktivitas armada.", intro: "Pantau perjalanan pengiriman beton dan status armada untuk mendukung visibilitas operasional pengiriman.", solutionTitle: "Pelacakan armada untuk operasional beton siap pakai", solutionIntro: "FixTrack membantu tim meninjau pergerakan kendaraan dan perjalanan pengiriman dalam aktivitas harian.", featureTitle: "Kenali kemampuan armada pengiriman", faqTitle: "Pertanyaan tentang operasional beton siap pakai", faqIntro: "Pelajari kesesuaian pelacakan armada dengan proses pengiriman dan kebutuhan kendaraan Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  construction: {
    slug: "construction", group: "industry", preset: "construction", products: ["FixTrack", "FixSight"], image: "/customer-photos/construction.webp", imageAlt: { en: "Construction workers in hard hats assessing an active project site", id: "Pekerja konstruksi berhelm keselamatan meninjau lokasi proyek aktif" }, imagePosition: "56% 50%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Follow vehicles and equipment between project sites.", intro: "Track fleet movement and use workplace monitoring to build visibility into activity across project locations.", solutionTitle: "Operational visibility across project sites", solutionIntro: "Explore FixTrack for vehicles and equipment and FixSight for AI-powered workplace monitoring.", featureTitle: "Explore construction operation capabilities", faqTitle: "Questions from construction teams", faqIntro: "Find out how Treffix products can fit the vehicles, sites, and processes you use.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau kendaraan dan alat berat antar lokasi proyek.", intro: "Lacak pergerakan armada dan gunakan pemantauan area kerja untuk melihat aktivitas di berbagai lokasi proyek.", solutionTitle: "Visibilitas operasional di berbagai lokasi proyek", solutionIntro: "Kenali FixTrack untuk kendaraan dan alat berat serta FixSight untuk pemantauan area kerja berbasis AI.", featureTitle: "Kenali kemampuan operasional konstruksi", faqTitle: "Pertanyaan dari tim konstruksi", faqIntro: "Ketahui kesesuaian produk Treffix dengan kendaraan, lokasi, dan proses kerja Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "waste-management": {
    slug: "waste-management", group: "industry", preset: "waste", products: ["FixTrack"], image: "/customer-photos/waste-management.webp", imageAlt: { en: "A municipal collection truck and sanitation workers on a city street", id: "Truk pengangkut sampah dan petugas kebersihan di jalan kota" }, imagePosition: "60% 55%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Bring collection routes and fleet activity into view.", intro: "Track collection routes, vehicle movement, and fleet activity across waste management operations.", solutionTitle: "Fleet visibility for collection operations", solutionIntro: "FixTrack helps teams follow vehicle movement and trip activity during collection operations.", featureTitle: "Explore collection fleet capabilities", faqTitle: "Questions from waste management teams", faqIntro: "Review how fleet tracking can support your routes and operating processes.", trustTitle: "Organizations using Treffix" },
    id: { title: "Lihat rute pengangkutan dan aktivitas armada dengan lebih jelas.", intro: "Pantau rute pengangkutan, pergerakan kendaraan, dan aktivitas armada dalam operasional pengelolaan limbah.", solutionTitle: "Visibilitas armada untuk operasional pengangkutan", solutionIntro: "FixTrack membantu tim memantau pergerakan kendaraan dan aktivitas perjalanan selama pengangkutan.", featureTitle: "Kenali kemampuan armada pengangkutan", faqTitle: "Pertanyaan dari tim pengelolaan limbah", faqIntro: "Pelajari bagaimana pelacakan armada dapat mendukung rute dan proses operasional Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "bus-operators": {
    slug: "bus-operators", group: "industry", preset: "bus", products: ["FixTrack"], image: "/customer-photos/bus-operators.webp", imageAlt: { en: "A city bus carrying passengers through an urban street", id: "Bus kota yang mengangkut penumpang melintasi jalan perkotaan" }, imagePosition: "50% 75%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "See bus locations and journeys in one operational view.", intro: "Monitor bus locations, fleet status, and journeys to help keep services coordinated.", solutionTitle: "Fleet tracking for bus operators", solutionIntro: "FixTrack helps teams follow vehicle locations and movement as they coordinate bus operations.", featureTitle: "Explore bus fleet capabilities", faqTitle: "Questions from bus operators", faqIntro: "Understand how fleet tracking aligns with your service operations and vehicles.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau lokasi dan perjalanan bus dalam satu tampilan operasional.", intro: "Pantau lokasi bus, status armada, dan perjalanan agar operasional layanan lebih terkoordinasi.", solutionTitle: "Pelacakan armada untuk operator bus", solutionIntro: "FixTrack membantu tim memantau lokasi dan pergerakan kendaraan saat mengoordinasikan operasional bus.", featureTitle: "Kenali kemampuan armada bus", faqTitle: "Pertanyaan dari operator bus", faqIntro: "Pahami kesesuaian pelacakan armada dengan operasional layanan dan kendaraan Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
  "cold-chain": {
    slug: "cold-chain", group: "industry", preset: "coldChain", products: ["FixTrack"], image: "/customer-photos/cold-chain.webp", imageAlt: { en: "Refrigerated semi-trailers parked at a distribution facility", id: "Trailer berpendingin terparkir di fasilitas distribusi" }, imagePosition: "50% 70%", faqIndexes: [0, 1, 2, 3, 4],
    en: { title: "Keep cold-chain deliveries visible while in transit.", intro: "Follow vehicles and delivery routes supporting temperature-sensitive goods, with fleet visibility based on vehicle movement and trip information.", solutionTitle: "Fleet visibility for cold-chain deliveries", solutionIntro: "FixTrack helps teams follow vehicles and delivery journeys that support cold-chain operations.", featureTitle: "Explore fleet capabilities for cold-chain operations", faqTitle: "Questions about cold-chain operations", faqIntro: "Review how fleet tracking relates to your delivery processes, systems, and devices.", trustTitle: "Organizations using Treffix" },
    id: { title: "Pantau pengiriman rantai dingin selama perjalanan.", intro: "Ikuti kendaraan dan rute pengiriman barang yang sensitif terhadap suhu dengan visibilitas armada berdasarkan pergerakan kendaraan dan informasi perjalanan.", solutionTitle: "Visibilitas armada untuk pengiriman rantai dingin", solutionIntro: "FixTrack membantu tim memantau kendaraan dan perjalanan pengiriman yang mendukung operasional rantai dingin.", featureTitle: "Kenali kemampuan armada untuk operasional rantai dingin", faqTitle: "Pertanyaan tentang operasional rantai dingin", faqIntro: "Pelajari hubungan pelacakan armada dengan proses pengiriman, sistem, dan perangkat Anda.", trustTitle: "Organisasi yang menggunakan Treffix" },
  },
};

export const customerBenefits = benefitPresets;

export const customerLogos = [
  { name: "B-Log", src: "/client-logos/b-log-logo.webp" },
  { name: "Simpan Sini Aja", src: "/client-logos/ssa-logo.webp" },
  { name: "Fleetify", src: "/client-logos/fleetify-logo-bold.webp" },
  { name: "Sembilan Sejahtera", src: "/client-logos/sembilan-sejahtera-logo.webp" },
  { name: "Paus", src: "/client-logos/paus-logo.webp" },
  { name: "IBU", src: "/client-logos/ibu-logo-bold.webp" },
  { name: "KON", src: "/client-logos/kon-logo.webp" },
  { name: "DOM", src: "/client-logos/dom-logo-bold.webp" },
  { name: "GPB", src: "/client-logos/gpb-logo.webp" },
];

export function getCustomerPage(slug: string) {
  return customerPages[slug];
}

export function getCustomerLabel(slug: string, language: Lang) {
  return customerMenuGroups.flatMap((group) => group.items).find((item) => item.slug === slug)?.label[language];
}
