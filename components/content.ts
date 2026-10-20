import { Camera, Route, Users } from "lucide-react";

export type Lang = "id" | "en";

export const copy = {
  en: {
    nav: ["Solutions", "Customers", "Company", "Blog"],
    companyMenu: {
      about: "About",
      aboutDescription: "Learn about Treffix and how we support connected business operations.",
      stories: "Customer Success Stories",
      storiesDescription: "See how businesses use Treffix to support their teams and operations.",
    },
    solutionMenuProducts: {
      FixTrack: {
        category: "Fleet Intelligence & GPS Tracking",
        description: "Monitor your fleet in real time, identify inefficient activity, and make operational decisions based on trip data.",
        link: "Discover FixTrack",
      },
      FixWork: {
        category: "HRIS & Workforce Management",
        description: "Simplify employee administration, connect HR processes, and improve visibility into attendance and workforce productivity.",
        link: "Discover FixWork",
      },
      FixSight: {
        category: "AI Video Analytics & Safety Monitoring",
        description: "Turn CCTV footage into operational insights to monitor safety compliance, identify potential risks, and evaluate on-site activity.",
        link: "Discover FixSight",
      },
    },
    talk: "Talk to our team",
    eyebrow: "BUILT FOR BETTER BUSINESS OPERATIONS",
    heroA: "Run your business operations with", heroB: "greater clarity and control.",
    heroText: "Treffix helps businesses improve operational efficiency, connect teams, and simplify everyday workflows with intelligent digital solutions built for real-world work.",
    explore: "Explore products", industriesExplore: "Explore industries", headerConsultationCta: "Talk to Our Team", headerConsultationMessage: "Hello Treffix, I'd like to consult about digital solutions for my business operations.", network: "Connected network", trust: "BUILT FOR OPERATIONS THAT NEVER STAND STILL", openMenu: "Open navigation", closeMenu: "Close navigation", primaryNav: "Main navigation", switchLanguage: "Choose language", homeLabel: "Treffix home", skipToContent: "Skip to main content",
    aboutEyebrow: "ABOUT TREFFIX", aboutTitle: "Digital solutions for fleet tracking, workforce management, and operational monitoring.", aboutText: "Treffix provides digital solutions to help businesses manage operations more efficiently and stay connected.", partnersTitle: "Trusted by Businesses to Support Their Operations", aboutPartnerPlaceholder: "Partner logo placeholders. Replace with approved wordmarks before publication.",
    solutionsEyebrow: "OPERATIONAL SOLUTIONS", solutionsTitle: "Digital Solutions for More Efficient and Connected Business Operations", solutionsText: "Explore FixTrack, FixWork, and FixSight: solutions for fleet tracking, workforce management, and AI-powered site monitoring.", fixTrackPrimaryCta: "Explore AI Fleet Intelligence ↗", fixTrackSecondaryCta: "Discuss Your Fleet Needs", fixWorkPrimaryCta: "Explore FixWork", fixWorkSecondaryCta: "Discuss Your Workforce Needs", fixSightPrimaryCta: "Explore FixSight ↗", fixSightSecondaryCta: "Discuss Your Monitoring Needs", fixSightSectionEyebrow: "AI VIDEO ANALYTICS", track: "Fleet and vehicle tracking", work: "HRMS and workforce management", sight: "AI CCTV camera monitoring and PPE detection", industriesLabel: "Built for",
    approachTitle: "How We Approach", approachIntroTitle: "A clearer path to better operations", approachIntroText: "We start by understanding how work gets done, identify what needs attention, and connect the right solutions for lasting improvement.", approachSteps: [{ title: "Understand the Operation", description: "Learn how teams work, what they need, and where operational challenges occur." }, { title: "Identify the Blind Spots", description: "Find visibility gaps, inefficient processes, and risks in day-to-day operations." }, { title: "Connect the Right Solutions", description: "Match Treffix technology and products to the business’s operational needs." }, { title: "Improve with Data", description: "Use operational visibility and insights to support decisions and continuous improvement." }],
    testimonialsEyebrow: "TESTIMONIALS", testimonialsTitle: "Trusted by Leaders Across Industries.", testimonialsText: "Explore how teams use Treffix solutions to support their day-to-day operations.", testimonialsCta: "Ask About Customer Stories", testimonialsPortraitPlaceholder: "Portrait placeholder", testimonialsSampleTag: "Replaceable sample", testimonialsSampleRating: "Sample rating", testimonialsQuotePlaceholder: "An approved customer testimonial will appear here.", testimonialsReviewerPlaceholder: "Reviewer name placeholder", testimonialsRolePlaceholder: "Role placeholder", testimonialsFlipHint: "Activate to view the replaceable sample",
    ecosystemEyebrow: "THREE TREFFIX PRODUCTS", ecosystemTitle: "Fleet tracking, HRMS, and AI CCTV for operational teams.", ecosystemText: "FixTrack tracks fleets and vehicles. FixWork supports HRMS and workforce management. FixSight AI CCTV monitors cameras and workplace activity, including PPE use.", storySteps: [{ label: "AI-POWERED FLEET INTELLIGENCE", title: "GPS Shows You Where Your Fleet Is. FixTrack Helps You Understand What’s Happening.", body: "Turn fleet data into actionable insights. With fuel analytics, driver behavior monitoring, anomaly detection, and an AI Control Tower, FixTrack helps operations teams identify issues and prioritize action." }, { label: "02 · FIXSIGHT · AI CCTV", title: "AI CCTV for workplace activity and productivity", body: "Next, FixSight AI CCTV monitors workplace activity, employee productivity, and PPE use." }, { label: "03 · FIXWORK · HRMS", title: "HRMS for employee management", body: "For your team, manage attendance, recruitment, employee records, OCR onboarding, approvals, and payroll with FixWork." }], decisions: "Explore Treffix operational solutions",
    industriesEyebrow: "MADE FOR THE FIELD", industriesTitle: "Designed around the realities of your operation.", industriesText: "See how vehicle tracking applies across logistics, transportation, and mining operations.", logistics: "Logistics & distribution", logisticsText: "Track fleet vehicles across logistics and distribution operations.", mobility: "Transportation & mobility", mobilityText: "Track vehicle locations across transportation and mobility operations.", mining: "Mining & heavy equipment", miningText: "Track vehicles across mining and heavy-equipment sites.", needs: ["Fleet tracking", "Vehicle location tracking", "Vehicle movement visibility"],whyEyebrow: "THE TREFFIX PRODUCTS", whyTitle: "Tools for fleet, workforce, and camera monitoring.", whyText: "Each product addresses a different operational need.", why: ["FixTrack", "FixWork", "FixSight AI CCTV"], whyDesc: ["Fleet and vehicle tracking.", "HRMS and workforce management.", "Camera monitoring and PPE detection."],
    faqEyebrow: "FAQ",
    faqTitle: "Find Out Before You Begin.",
    faqText: "Get to know Treffix solutions, understand how they work, and find an approach that fits your business’s operational needs.",
    faq: [
      ["Which solutions are available from Treffix?", "Treffix offers FixTrack for fleet monitoring, FixWork for HR management, and FixSight for AI-powered workplace monitoring. The right solution depends on your business needs and implementation scope."],
      ["Are Treffix solutions right for my industry?", "Treffix solutions can be explored for logistics and distribution, transportation, mining, and other operations. Our team can help identify features relevant to your business processes."],
      ["Can Treffix connect with the systems we already use?", "Integration requirements are evaluated based on the systems in use, the data needed, and technical readiness. Discuss your needs with the Treffix team to learn which approaches may be possible."],
      ["Do I need to purchase new devices to use Treffix?", "Device requirements depend on the solution and features you plan to use. The Treffix team can help assess available devices and any additional needs based on your operating conditions."],
      ["What does the Treffix implementation process look like at a company?", "It starts with understanding operational needs, defining the solution and implementation scope, then discussing technical preparation and deployment stages with the relevant teams."],
      ["How can I get a demo and pricing proposal?", "Contact the Treffix team to discuss your company’s needs. Our team can guide you to a suitable solution, demonstration, and proposal based on the scope of your requirements."],
    ],
    blogEyebrow: "ARTICLES", blogTitle: "Insights to help shape the future of your industry.", blogText: "Explore practical guides to fleet tracking, operational monitoring with AI CCTV, and workforce management.", blogRead: "Read article", blogBack: "Back to articles", blogViewAll: "View all articles",
    clientLogosEyebrow: "OUR CLIENTS", clientLogosTitle: "Clients Who Trust Us", clientLogosDescription: "Treffix offers digital solutions in Indonesia for fleet intelligence and GPS tracking, HRIS and workforce management, and AI video analytics for business operations.",
    ctaEyebrow: "TALK TO THE TREFFIX TEAM", ctaTitle: "Optimize Business Operations with Treffix Digital Solutions", ctaText: "Discuss your needs for fleet tracking, workforce management, and AI-powered worksite monitoring with the Treffix team.", ctaButton: "Contact Us", contactNote: "Tell us about your operational needs.", fallbackCta: "Explore products", fallbackNote: "Compare fleet tracking, HRMS and workforce management, and AI CCTV camera monitoring with PPE detection.", footerText: "Products for fleet tracking, workforce management, and camera monitoring.", footerNav: "Explore", footerProducts: "Solutions", footerProductNames: { FixTrack: "Fleet Intelligence & GPS Tracking", FixWork: "HRIS & Workforce Management", FixSight: "AI Video Analytics & Safety Monitoring" }, footerCustomers: "Customers", footerByRole: "By Role", footerByIndustry: "By Industry", footerCompany: "Company", footerContact: "Contact Us", footerSocial: "Follow us", footerAddress: "Address", footerPhone: "Phone", footerEmail: "Email", footerBackToTop: "Back to top", contact: "Contact", rights: "© 2026 Treffix. All rights reserved.", language: "Bahasa Indonesia",
  },
  id: {
    nav: ["Solusi", "Pelanggan", "Perusahaan", "Artikel"],
    companyMenu: {
      about: "Tentang",
      aboutDescription: "Kenali Treffix dan cara kami mendukung operasional bisnis yang lebih terhubung.",
      stories: "Kisah Sukses Pelanggan",
      storiesDescription: "Lihat bagaimana bisnis menggunakan Treffix untuk mendukung tim dan operasional mereka.",
    },
    solutionMenuProducts: {
      FixTrack: {
        category: "Fleet Intelligence & GPS Tracking",
        description: "Pantau armada secara real-time, temukan aktivitas yang tidak efisien, dan ambil keputusan operasional berdasarkan data perjalanan.",
        link: "Kenali FixTrack",
      },
      FixWork: {
        category: "HRIS & Workforce Management",
        description: "Sederhanakan administrasi karyawan, integrasikan proses HR, dan tingkatkan visibilitas atas kehadiran serta produktivitas tenaga kerja.",
        link: "Kenali FixWork",
      },
      FixSight: {
        category: "AI Video Analytics & Safety Monitoring",
        description: "Ubah CCTV menjadi insight operasional untuk memantau kepatuhan keselamatan, mengidentifikasi potensi risiko, dan mengevaluasi aktivitas di lapangan.",
        link: "Kenali FixSight",
      },
    },
    talk: "Hubungi tim kami",
    eyebrow: "DIRANCANG UNTUK OPERASIONAL BISNIS YANG LEBIH BAIK",
    heroA: "Kelola operasional bisnis dengan", heroB: "lebih mudah dan terarah.",
    heroText: "Treffix membantu bisnis meningkatkan efisiensi operasional, menyelaraskan kerja tim, dan menyederhanakan proses harian melalui solusi digital cerdas yang dirancang untuk kebutuhan nyata.",
    explore: "Jelajahi produk", industriesExplore: "Jelajahi industri", headerConsultationCta: "Konsultasi dengan Kami", headerConsultationMessage: "Halo Treffix, saya ingin berkonsultasi tentang solusi digital untuk operasional bisnis.", network: "Jaringan terhubung", trust: "UNTUK OPERASIONAL YANG TERUS BERGERAK", openMenu: "Buka navigasi", closeMenu: "Tutup navigasi", primaryNav: "Navigasi utama", switchLanguage: "Pilih bahasa", homeLabel: "Halaman utama Treffix", skipToContent: "Langsung ke konten utama",
    aboutEyebrow: "TENTANG TREFFIX", aboutTitle: "Solusi digital untuk pelacakan armada, manajemen tenaga kerja, dan pemantauan operasional.", aboutText: "Treffix menghadirkan solusi digital untuk membantu bisnis mengelola operasional dengan lebih efisien dan terhubung.", partnersTitle: "Dipercaya oleh Berbagai Bisnis untuk Mendukung Operasionalnya", aboutPartnerPlaceholder: "Placeholder logo mitra. Ganti dengan wordmark resmi sebelum dipublikasikan.",
    solutionsEyebrow: "SOLUSI OPERASIONAL", solutionsTitle: "Solusi Digital untuk Operasional Bisnis yang Lebih Efisien dan Terhubung", solutionsText: "Kenali FixTrack, FixWork, dan FixSight untuk mendukung pelacakan armada, pengelolaan tenaga kerja, dan pemantauan area kerja berbasis AI.", fixTrackPrimaryCta: "Jelajahi AI Fleet Intelligence ↗", fixTrackSecondaryCta: "Konsultasikan Kebutuhan Armada", fixWorkPrimaryCta: "Jelajahi FixWork", fixWorkSecondaryCta: "Konsultasikan Kebutuhan Tenaga Kerja", fixSightPrimaryCta: "Jelajahi FixSight ↗", fixSightSecondaryCta: "Konsultasikan Kebutuhan Pemantauan", fixSightSectionEyebrow: "ANALITIK VIDEO AI", track: "Pelacakan armada dan kendaraan", work: "HRMS dan manajemen tenaga kerja", sight: "Pemantauan kamera CCTV AI dan deteksi APD", industriesLabel: "Dirancang untuk",
    approachTitle: "Pendekatan Kami", approachIntroTitle: "Langkah Jelas Menuju Operasional yang Lebih Baik", approachIntroText: "Kami memahami cara kerja, menemukan hal yang perlu dibenahi, dan menghubungkan solusi yang tepat untuk mendukung perbaikan berkelanjutan.", approachSteps: [{ title: "Pahami Operasional", description: "Kenali alur kerja, kebutuhan tim, dan tantangan operasional bisnis." }, { title: "Temukan Titik Masalah", description: "Identifikasi blind spot, proses yang tidak efisien, dan risiko di lapangan." }, { title: "Hubungkan Solusi yang Tepat", description: "Sesuaikan teknologi dan produk Treffix dengan kebutuhan operasional bisnis." }, { title: "Tingkatkan Berdasarkan Data", description: "Gunakan visibilitas dan insight operasional untuk mendukung keputusan dan perbaikan berkelanjutan." }],
    testimonialsEyebrow: "TESTIMONI", testimonialsTitle: "Dipercaya Pemimpin di Berbagai Industri.", testimonialsText: "Lihat bagaimana tim menggunakan solusi Treffix untuk mendukung aktivitas operasional sehari-hari.", testimonialsCta: "Tanyakan Kisah Pelanggan", testimonialsPortraitPlaceholder: "Placeholder foto", testimonialsSampleTag: "Contoh yang dapat diganti", testimonialsSampleRating: "Contoh rating", testimonialsQuotePlaceholder: "Testimoni pelanggan yang telah disetujui akan ditampilkan di sini.", testimonialsReviewerPlaceholder: "Placeholder nama pemberi ulasan", testimonialsRolePlaceholder: "Placeholder jabatan", testimonialsFlipHint: "Aktifkan untuk melihat contoh yang dapat diganti",
    ecosystemEyebrow: "SOLUSI DIGITAL UNTUK OPERASIONAL BISNIS", ecosystemTitle: "Tiga solusi digital untuk pelacakan armada, HRMS, dan CCTV AI.", ecosystemText: "Treffix menghadirkan FixTrack untuk pelacakan armada dan kendaraan, FixWork untuk HRMS dan manajemen tenaga kerja, serta FixSight AI CCTV untuk memantau kamera dan aktivitas kerja, termasuk penggunaan APD.", storySteps: [{ label: "AI-POWERED FLEET INTELLIGENCE", title: "GPS Menunjukkan Lokasi. FixTrack Membantu Anda Memahami Apa yang Terjadi.", body: "Ubah data armada menjadi insight yang dapat ditindaklanjuti. Dengan analitik BBM, pemantauan perilaku pengemudi, deteksi anomali, dan AI Control Tower, FixTrack membantu tim operasional mengidentifikasi masalah dan menentukan prioritas tindakan." }, { label: "02 · FIXSIGHT · CCTV AI", title: "CCTV AI untuk aktivitas dan produktivitas kerja", body: "Lanjutkan ke area kerja: FixSight AI CCTV memantau aktivitas, produktivitas karyawan, dan penggunaan APD." }, { label: "03 · FIXWORK · HRMS", title: "HRMS untuk pengelolaan karyawan", body: "Untuk tim Anda, kelola absensi, rekrutmen, data karyawan, onboarding OCR, persetujuan, dan payroll melalui FixWork." }], decisions: "Jelajahi solusi operasional Treffix",
    industriesEyebrow: "DIRANCANG UNTUK LAPANGAN", industriesTitle: "Memahami realitas operasional Anda.", industriesText: "Lihat penggunaan pelacakan kendaraan di operasional logistik, transportasi, dan pertambangan.", logistics: "Logistik & distribusi", logisticsText: "Lacak kendaraan armada dalam operasional logistik dan distribusi.", mobility: "Transportasi & mobilitas", mobilityText: "Lacak lokasi kendaraan dalam operasional transportasi dan mobilitas.", mining: "Pertambangan & alat berat", miningText: "Lacak kendaraan di lokasi pertambangan dan operasional alat berat.", needs: ["Pelacakan armada", "Pelacakan lokasi kendaraan", "Visibilitas pergerakan kendaraan"],whyEyebrow: "PRODUK TREFFIX", whyTitle: "Perangkat untuk armada, tenaga kerja, dan pemantauan kamera.", whyText: "Setiap produk menangani kebutuhan operasional yang berbeda.", why: ["FixTrack", "FixWork", "FixSight AI CCTV"], whyDesc: ["Pelacakan armada dan kendaraan.", "HRMS dan manajemen tenaga kerja.", "Pemantauan kamera dan deteksi APD."],
    faqEyebrow: "FAQ",
    faqTitle: "Cari Tahu Sebelum Memulai.",
    faqText: "Kenali solusi Treffix, pahami cara kerjanya, dan temukan pendekatan yang sesuai dengan kebutuhan operasional bisnis Anda.",
    faq: [
      ["Solusi apa saja yang tersedia di Treffix?", "Treffix menyediakan FixTrack untuk pemantauan armada, FixWork untuk pengelolaan SDM, dan FixSight untuk pemantauan area kerja berbasis AI. Solusi yang sesuai bergantung pada kebutuhan dan cakupan implementasi bisnis Anda."],
      ["Apakah solusi Treffix cocok untuk industri saya?", "Solusi Treffix dapat dieksplorasi untuk kebutuhan logistik dan distribusi, transportasi, pertambangan, serta operasional lainnya. Tim kami dapat membantu mengidentifikasi fitur yang relevan dengan proses bisnis Anda."],
      ["Apakah Treffix bisa terhubung dengan sistem yang sudah kami gunakan?", "Kebutuhan integrasi akan dievaluasi berdasarkan sistem yang digunakan, data yang dibutuhkan, dan kesiapan teknisnya. Diskusikan kebutuhan Anda dengan tim Treffix untuk mengetahui pendekatan yang memungkinkan."],
      ["Apakah saya perlu membeli perangkat baru untuk menggunakan Treffix?", "Kebutuhan perangkat bergantung pada solusi dan fitur yang ingin digunakan. Tim Treffix dapat membantu mengevaluasi perangkat yang tersedia dan kebutuhan tambahan berdasarkan kondisi operasional Anda."],
      ["Bagaimana proses implementasi Treffix di perusahaan?", "Prosesnya dimulai dengan memahami kebutuhan operasional, menentukan solusi dan cakupan implementasi, kemudian membahas persiapan teknis serta tahapan penerapan bersama tim terkait."],
      ["Bagaimana cara mendapatkan demo dan penawaran harga?", "Hubungi tim Treffix untuk mendiskusikan kebutuhan perusahaan Anda. Tim kami dapat membantu mengarahkan Anda ke solusi, demonstrasi, dan penawaran yang sesuai dengan cakupan kebutuhan."],
    ],
    blogEyebrow: "ARTIKEL", blogTitle: "Wawasan terbaru untuk membentuk masa depan industri Anda.", blogText: "Baca panduan tentang pelacakan armada, pemantauan operasional dengan CCTV AI, dan pengelolaan tenaga kerja.", blogRead: "Baca artikel", blogBack: "Kembali ke artikel", blogViewAll: "Lihat semua",
    clientLogosEyebrow: "CLIENT KAMI", clientLogosTitle: "Client yang Mempercayai Kami", clientLogosDescription: "Treffix menghadirkan solusi digital di Indonesia, mencakup intelijen armada dan pelacakan GPS, HRIS dan manajemen tenaga kerja, serta analitik video berbasis AI untuk mendukung operasional bisnis.",
    ctaEyebrow: "HUBUNGI TIM TREFFIX", ctaTitle: "Optimalkan Operasional Bisnis dengan Solusi Digital Treffix", ctaText: "Konsultasikan kebutuhan pelacakan armada, manajemen tenaga kerja, dan pemantauan area kerja berbasis AI bersama tim Treffix.", ctaButton: "Hubungi Kami", contactNote: "Ceritakan kebutuhan operasional Anda.", fallbackCta: "Jelajahi produk", fallbackNote: "Bandingkan pelacakan armada, HRMS dan manajemen tenaga kerja, serta CCTV AI untuk pemantauan kamera dan deteksi APD.", footerText: "Produk untuk pelacakan armada, manajemen tenaga kerja, dan pemantauan kamera.", footerNav: "Jelajahi", footerProducts: "Solusi", footerProductNames: { FixTrack: "Intelijen Armada & Pelacakan GPS", FixWork: "HRIS & Manajemen Tenaga Kerja", FixSight: "Analitik Video AI & Pemantauan Keselamatan" }, footerCustomers: "Pelanggan", footerByRole: "Berdasarkan Peran", footerByIndustry: "Berdasarkan Industri", footerCompany: "Perusahaan", footerContact: "Hubungi Kami", footerSocial: "Ikuti kami", footerAddress: "Alamat", footerPhone: "Telepon", footerEmail: "Email", footerBackToTop: "Kembali ke atas", contact: "Kontak", rights: "© 2026 Treffix. Hak cipta dilindungi.", language: "English",
  },
};

export const articlePageCopy = {
  en: {
    breadcrumb: "Article breadcrumbs",
    contents: "Table of contents",
    share: "Share this article",
    shareWhatsApp: "WhatsApp",
    shareX: "X",
    shareLinkedIn: "LinkedIn",
    datePending: "Publication date to be announced",
    related: "Other Articles",
  },
  id: {
    breadcrumb: "Jejak navigasi artikel",
    contents: "Daftar isi",
    share: "Bagikan artikel ini",
    shareWhatsApp: "WhatsApp",
    shareX: "X",
    shareLinkedIn: "LinkedIn",
    datePending: "Tanggal publikasi akan diumumkan",
    related: "Artikel lainnya",
  },
} as const;

export const products = [
  { id: "FixTrack", icon: Route, logo: "/fixtrack-icon-blue.svg", title: { en: { before: "", highlight: "GPS Shows You Where Your Fleet Is. FixTrack Helps You Understand What’s Happening.", after: "" }, id: { before: "", highlight: "GPS Menunjukkan Lokasi. FixTrack Membantu Anda Memahami Apa yang Terjadi.", after: "" } }, desc: { en: "Turn fleet data into actionable insights. With fuel analytics, driver behavior monitoring, anomaly detection, and an AI Control Tower, FixTrack helps operations teams identify issues and prioritize action.", id: "Ubah data armada menjadi insight yang dapat ditindaklanjuti. Dengan analitik BBM, pemantauan perilaku pengemudi, deteksi anomali, dan AI Control Tower, FixTrack membantu tim operasional mengidentifikasi masalah dan menentukan prioritas tindakan." }, points: { en: ["AI Control Tower", "1 Click Routing", "BBM Intelligent", "AI Copilot", "Driver Scoreboard", "Fleet Time Machine"], id: ["AI Control Tower", "1 Click Routing", "BBM Intelligent", "AI Copilot", "Driver Scoreboard", "Fleet Time Machine"] }, industry: { en: "Fleet operations", id: "Operasional armada" } },
  { id: "FixWork", icon: Users, logo: "/fixwork-blue.svg", title: { en: { before: "Simplify HR Processes. ", highlight: "Optimize Employee Management.", after: "" }, id: { before: "Sederhanakan Proses HR. ", highlight: "Optimalkan Pengelolaan Karyawan.", after: "" } }, desc: { en: "FixWork helps companies manage employee data, attendance, payroll, and other HR processes in one integrated platform.", id: "FixWork membantu perusahaan mengelola data karyawan, absensi, payroll, hingga berbagai proses HR dalam satu platform terintegrasi." }, points: { en: ["Anti-Fraud Attendance", "Flexible Recruitment Process", "OCR-Powered Onboarding", "Bottleneck-Free Approvals", "Ready to Process Payroll", "Organized Administration"], id: ["Absensi Anti-Kecurangan", "Proses Rekrutmen Fleksibel", "Onboarding dengan OCR", "Persetujuan Tanpa Hambatan", "Siap Memproses Payroll", "Administrasi yang Tertata"] }, industry: { en: "HR and workforce teams", id: "Tim HR dan tenaga kerja" } },
  { id: "FixSight", icon: Camera, logo: undefined, title: { en: { before: "", highlight: "Your CCTV. Now Smarter for Safer Workplaces.", after: "" }, id: { before: "", highlight: "CCTV Anda, Kini Lebih Cerdas untuk Tempat Kerja yang Lebih Aman.", after: "" } }, desc: { en: "Transform conventional CCTV into AI-powered monitoring that helps identify potential risks, monitor safety compliance, and gain better visibility into workplace activities.", id: "Ubah CCTV konvensional menjadi pemantauan berbasis AI yang membantu mengidentifikasi potensi risiko, memantau kepatuhan keselamatan, dan memberikan visibilitas lebih baik terhadap aktivitas di tempat kerja." }, points: { en: ["AI-Powered Visual Intelligence", "Searchable & Verifiable Event Intelligence", "Intelligent Safety & Security Monitoring", "Vision-Based Productivity Intelligence", "Edge-to-Cloud & System Integration", "Modular & Industry-Adaptive AI Vision"], id: ["Kecerdasan Visual Berbasis AI", "Informasi Peristiwa yang Mudah Ditelusuri dan Diverifikasi", "Pemantauan Keselamatan dan Keamanan Cerdas", "Insight Produktivitas Berbasis Visi", "Integrasi Edge-to-Cloud dan Sistem", "AI Vision Modular yang Adaptif untuk Berbagai Industri"] }, industry: { en: "Sites using AI CCTV", id: "Lokasi dengan CCTV AI" } },
] as const;
export type Copy = typeof copy[Lang];


