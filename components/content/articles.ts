import { Camera, Route, Users } from "lucide-react";
import type { Lang } from "@/components/content";

export type Article = (typeof articles)[number];

export const articles = [
  {
    slug: "pelacakan-armada-dan-perjalanan-kendaraan",
    icon: Route,
    category: { id: "Pelacakan armada", en: "Fleet tracking" },
    title: {
      id: "Pelacakan Armada: Memantau Lokasi dan Meninjau Perjalanan Kendaraan",
      en: "Fleet Tracking: Monitor Vehicle Locations and Review Journeys",
    },
    excerpt: {
      id: "Kenali informasi yang dapat dipantau melalui sistem pelacakan armada, mulai dari lokasi dan status kendaraan hingga riwayat perjalanan.",
      en: "Explore the information available through fleet tracking, from vehicle locations and status to trip history.",
    },
    description: {
      id: "Panduan ringkas tentang pelacakan armada, pemantauan lokasi dan status kendaraan, serta tinjauan perjalanan dengan FixTrack.",
      en: "A practical guide to fleet tracking, vehicle location and status monitoring, and trip review with FixTrack.",
    },
    sections: {
      id: [
        {
          heading: "Apa yang dapat dipantau melalui pelacakan armada?",
          paragraphs: [
            "Pelacakan armada membantu tim melihat informasi kendaraan dalam satu sistem. Pada FixTrack, kemampuan yang tersedia mencakup pemantauan lokasi dan status kendaraan secara real-time.",
            "Informasi ini dapat menjadi titik awal untuk memahami posisi kendaraan dan aktivitas perjalanan dalam operasional sehari-hari.",
          ],
        },
        {
          heading: "Tinjau perjalanan dan aktivitas kendaraan",
          paragraphs: [
            "Riwayat perjalanan dapat ditinjau melalui fitur pemutaran ulang perjalanan. Tim juga dapat menggunakan pelacakan pesanan, notifikasi real-time, dan dashcam kendaraan sesuai kebutuhan pemantauan armada.",
            "Dengan mengetahui fitur yang tersedia, bisnis dapat menentukan informasi mana yang paling relevan untuk alur kerja dan kebutuhan operasional mereka.",
          ],
        },
        {
          heading: "Memilih informasi yang sesuai untuk tim",
          paragraphs: [
            "Kebutuhan setiap armada dapat berbeda. Mulailah dengan menentukan apakah tim perlu melihat lokasi kendaraan, status kendaraan, perjalanan sebelumnya, atau informasi pesanan. FixTrack menyediakan kemampuan pelacakan armada dan kendaraan untuk kebutuhan tersebut.",
          ],
        },
      ],
      en: [
        {
          heading: "What can fleet tracking monitor?",
          paragraphs: [
            "Fleet tracking helps teams view vehicle information in one system. FixTrack includes real-time monitoring of vehicle locations and status.",
            "This information can provide a starting point for understanding vehicle positions and journey activity during daily operations.",
          ],
        },
        {
          heading: "Review trips and vehicle activity",
          paragraphs: [
            "Trip history can be reviewed with trip playback. Teams can also use order tracking, real-time alerts, and in-vehicle dashcams for their fleet monitoring needs.",
            "Knowing which capabilities are available helps a business identify the information that is most relevant to its workflows and operations.",
          ],
        },
        {
          heading: "Choose information that fits the team",
          paragraphs: [
            "Fleet needs can vary. Start by deciding whether the team needs to see vehicle locations, vehicle status, previous trips, or order information. FixTrack provides fleet and vehicle tracking capabilities for these needs.",
          ],
        },
      ],
    },
  },
  {
    slug: "cctv-ai-untuk-pemantauan-operasional",
    icon: Camera,
    category: { id: "CCTV AI", en: "AI CCTV" },
    title: {
      id: "CCTV AI untuk Pemantauan Aktivitas dan Produktivitas Kerja",
      en: "AI CCTV for Monitoring Workplace Activity and Productivity",
    },
    excerpt: {
      id: "Pelajari cakupan pemantauan kamera AI, termasuk aktivitas kerja, produktivitas karyawan, dan penggunaan APD.",
      en: "Learn about AI camera monitoring for workplace activity, employee productivity, and PPE use.",
    },
    description: {
      id: "Pelajari peran FixSight AI CCTV dalam pemantauan kamera, aktivitas kerja, produktivitas karyawan, dan penggunaan APD.",
      en: "Learn how FixSight AI CCTV supports camera monitoring for workplace activity, employee productivity, and PPE use.",
    },
    sections: {
      id: [
        {
          heading: "Pemantauan operasional dengan CCTV AI",
          paragraphs: [
            "CCTV AI dapat digunakan untuk pemantauan kamera dan aktivitas di area kerja. FixSight AI CCTV mencakup pemantauan CCTV secara real-time, pemutaran ulang video, notifikasi real-time, serta dashboard insight real-time.",
            "Rangkaian kemampuan ini memberi tim beberapa cara untuk meninjau informasi kamera sesuai kebutuhan operasional.",
          ],
        },
        {
          heading: "Deteksi AI dan penggunaan APD",
          paragraphs: [
            "Deteksi AI merupakan salah satu kemampuan FixSight. Penggunaan APD termasuk dalam cakupan pemantauan yang dijelaskan untuk produk ini, bersama pemantauan aktivitas dan produktivitas karyawan.",
            "Dengan demikian, FixSight dapat dipahami sebagai solusi CCTV AI untuk pemantauan operasional yang mencakup lebih dari satu aspek pekerjaan.",
          ],
        },
        {
          heading: "Menentukan kebutuhan pemantauan",
          paragraphs: [
            "Sebelum memilih alur pemantauan, tentukan informasi yang perlu ditinjau oleh tim: rekaman kamera, aktivitas kerja, produktivitas karyawan, atau penggunaan APD. Kebutuhan tersebut membantu memperjelas penggunaan fitur CCTV AI dalam operasional.",
          ],
        },
      ],
      en: [
        {
          heading: "Operational monitoring with AI CCTV",
          paragraphs: [
            "AI CCTV can be used to monitor cameras and activity in the workplace. FixSight AI CCTV includes real-time CCTV monitoring, video playback, real-time alerts, and a real-time insights dashboard.",
            "These capabilities give teams several ways to review camera information according to their operational needs.",
          ],
        },
        {
          heading: "AI detection and PPE use",
          paragraphs: [
            "AI detection is one of FixSight’s capabilities. PPE use is included in the product’s described monitoring scope, alongside workplace activity and employee productivity monitoring.",
            "FixSight is therefore an AI CCTV solution for operational monitoring that covers more than one aspect of work.",
          ],
        },
        {
          heading: "Define monitoring needs",
          paragraphs: [
            "Before choosing a monitoring workflow, identify the information the team needs to review: camera footage, workplace activity, employee productivity, or PPE use. These needs help clarify how AI CCTV capabilities fit into operations.",
          ],
        },
      ],
    },
  },
  {
    slug: "hrms-absensi-rekrutmen-payroll",
    icon: Users,
    category: { id: "HRMS", en: "HRMS" },
    title: {
      id: "HRMS untuk Mengelola Absensi, Rekrutmen, hingga Payroll",
      en: "Using HRMS to Manage Attendance, Recruitment, and Payroll",
    },
    excerpt: {
      id: "Lihat bagaimana platform HRMS dapat menyatukan kebutuhan absensi, administrasi karyawan, persetujuan, dan payroll.",
      en: "See how an HRMS platform brings together attendance, employee administration, approvals, and payroll.",
    },
    description: {
      id: "Panduan mengenal fitur FixWork untuk absensi, rekrutmen, administrasi kepegawaian, onboarding OCR, persetujuan, dan payroll.",
      en: "An overview of FixWork features for attendance, recruitment, employee administration, OCR onboarding, approvals, and payroll.",
    },
    sections: {
      id: [
        {
          heading: "Apa peran HRMS dalam pengelolaan karyawan?",
          paragraphs: [
            "HRMS membantu mengelola proses sumber daya manusia melalui platform digital. FixWork mencakup pengenalan wajah dan area absensi, proses rekrutmen, serta administrasi kepegawaian.",
            "Dengan mengenali proses yang dikelola, tim dapat menyusun alur kerja sesuai kebutuhan karyawan dan organisasi.",
          ],
        },
        {
          heading: "Dari onboarding hingga persetujuan",
          paragraphs: [
            "FixWork juga mencakup onboarding dengan OCR dan persetujuan fleksibel. Fitur-fitur tersebut mendukung pengelolaan proses kepegawaian dalam tahapan yang berbeda.",
            "Setiap organisasi dapat meninjau alur internalnya untuk memahami bagaimana proses perekrutan, onboarding, dan persetujuan berjalan bersama.",
          ],
        },
        {
          heading: "Mengelola payroll dalam platform HRMS",
          paragraphs: [
            "Manajemen payroll termasuk dalam kapabilitas FixWork. Bersama absensi, rekrutmen, administrasi kepegawaian, onboarding, dan persetujuan, payroll menjadi bagian dari cakupan HRMS FixWork.",
          ],
        },
      ],
      en: [
        {
          heading: "What role does HRMS play in employee management?",
          paragraphs: [
            "HRMS supports human resource processes through a digital platform. FixWork includes face recognition and attendance zones, recruitment process management, and employee administration.",
            "Understanding the processes in scope helps teams shape workflows around the needs of employees and the organization.",
          ],
        },
        {
          heading: "From onboarding to approvals",
          paragraphs: [
            "FixWork also includes OCR-powered onboarding and flexible approvals. These features support employee administration at different stages.",
            "Organizations can review their internal workflows to understand how recruitment, onboarding, and approvals fit together.",
          ],
        },
        {
          heading: "Managing payroll with an HRMS platform",
          paragraphs: [
            "Payroll management is one of FixWork’s capabilities. Alongside attendance, recruitment, employee administration, onboarding, and approvals, payroll is part of the scope of the FixWork HRMS platform.",
          ],
        },
      ],
    },
  },
  {
    slug: "notifikasi-real-time-dan-pemutaran-ulang-armada",
    icon: Route,
    category: { id: "Pelacakan armada", en: "Fleet tracking" },
    title: {
      id: "Notifikasi Real-Time dan Pemutaran Ulang Perjalanan Armada",
      en: "Real-Time Alerts and Fleet Trip Playback",
    },
    excerpt: {
      id: "Pahami bagaimana notifikasi kendaraan dan riwayat perjalanan membantu tim meninjau aktivitas armada.",
      en: "Learn how vehicle alerts and trip history help teams review fleet activity.",
    },
    description: {
      id: "Kenali notifikasi real-time dan fitur pemutaran ulang perjalanan yang tersedia dalam sistem pelacakan armada FixTrack.",
      en: "Explore real-time alerts and trip playback available in the FixTrack fleet tracking system.",
    },
    sections: {
      id: [
        {
          heading: "Meninjau aktivitas armada dari informasi yang tersedia",
          paragraphs: [
            "Dalam operasional armada, tim dapat memerlukan informasi mengenai posisi dan status kendaraan serta perjalanan yang sudah berlangsung. FixTrack menyediakan pemantauan kendaraan secara real-time dan fitur pemutaran ulang perjalanan.",
            "Kedua jenis informasi tersebut membantu tim meninjau aktivitas kendaraan dari sudut pandang saat ini maupun riwayat perjalanan.",
          ],
        },
        {
          heading: "Peran notifikasi real-time",
          paragraphs: [
            "Notifikasi real-time merupakan salah satu kemampuan FixTrack. Tim dapat mempertimbangkan notifikasi bersama pemantauan lokasi dan status kendaraan sebagai bagian dari cara mereka mengikuti aktivitas armada.",
          ],
        },
        {
          heading: "Menyusun kebutuhan pemantauan kendaraan",
          paragraphs: [
            "Sebelum memilih sistem pelacakan armada, petakan informasi yang perlu ditinjau: lokasi saat ini, status kendaraan, notifikasi, atau riwayat perjalanan. Daftar kebutuhan ini memberi tim dasar yang jelas untuk menilai fitur FixTrack.",
          ],
        },
      ],
      en: [
        {
          heading: "Review fleet activity with available information",
          paragraphs: [
            "Fleet teams may need information about vehicle locations and status as well as journeys already completed. FixTrack provides real-time vehicle monitoring and trip playback.",
            "Together, these information types help teams review vehicle activity from both a current and historical perspective.",
          ],
        },
        {
          heading: "The role of real-time alerts",
          paragraphs: [
            "Real-time alerts are one of FixTrack’s capabilities. Teams can consider alerts alongside vehicle location and status monitoring as part of how they follow fleet activity.",
          ],
        },
        {
          heading: "Define vehicle monitoring needs",
          paragraphs: [
            "Before choosing a fleet tracking system, map the information that needs review: current location, vehicle status, alerts, or trip history. This list gives teams a clear basis for evaluating FixTrack features.",
          ],
        },
      ],
    },
  },
  {
    slug: "absensi-karyawan-dan-area-absensi",
    icon: Users,
    category: { id: "HRMS", en: "HRMS" },
    title: {
      id: "Absensi Karyawan dengan Pengenalan Wajah dan Area Absensi",
      en: "Employee Attendance with Face Recognition and Attendance Zones",
    },
    excerpt: {
      id: "Kenali fitur absensi FixWork dan kaitannya dengan proses administrasi karyawan dalam platform HRMS.",
      en: "Explore FixWork attendance features and how they relate to employee administration in an HRMS platform.",
    },
    description: {
      id: "Panduan mengenai pengenalan wajah dan area absensi sebagai bagian dari fitur FixWork untuk manajemen tenaga kerja.",
      en: "A guide to face recognition and attendance zones as part of FixWork workforce management features.",
    },
    sections: {
      id: [
        {
          heading: "Mengapa absensi menjadi bagian dari HRMS?",
          paragraphs: [
            "Absensi merupakan salah satu proses dalam pengelolaan tenaga kerja. FixWork mencakup pengenalan wajah dan area absensi sebagai fitur untuk mendukung pencatatan kehadiran.",
            "Kebutuhan pencatatan dapat berbeda antarorganisasi, sehingga penting untuk memahami proses dan aturan internal sebelum menerapkan alur absensi.",
          ],
        },
        {
          heading: "Pengenalan wajah dan area absensi di FixWork",
          paragraphs: [
            "Pengenalan wajah dan area absensi tercantum sebagai kapabilitas FixWork. Keduanya dapat dipertimbangkan saat tim menyusun kebutuhan pencatatan kehadiran karyawan.",
          ],
        },
        {
          heading: "Hubungkan absensi dengan administrasi karyawan",
          paragraphs: [
            "Selain absensi, cakupan FixWork meliputi proses rekrutmen, administrasi kepegawaian, onboarding dengan OCR, persetujuan fleksibel, dan manajemen payroll. Memetakan proses-proses ini membantu tim memahami ruang lingkup platform HRMS yang dibutuhkan.",
          ],
        },
      ],
      en: [
        {
          heading: "Why is attendance part of HRMS?",
          paragraphs: [
            "Attendance is one process in workforce management. FixWork includes face recognition and attendance zones as features for supporting attendance records.",
            "Record-keeping needs can vary between organizations, so it is useful to understand internal processes and rules before setting up an attendance workflow.",
          ],
        },
        {
          heading: "Face recognition and attendance zones in FixWork",
          paragraphs: [
            "Face recognition and attendance zones are listed as FixWork capabilities. Teams can consider them when defining employee attendance recording needs.",
          ],
        },
        {
          heading: "Connect attendance with employee administration",
          paragraphs: [
            "Alongside attendance, FixWork covers recruitment, employee administration, OCR-powered onboarding, flexible approvals, and payroll management. Mapping these processes helps teams understand the scope of the HRMS platform they need.",
          ],
        },
      ],
    },
  },
] as const;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleHref(language: Lang, slug: string) {
  return `/${language}/blog/${slug}`;
}
