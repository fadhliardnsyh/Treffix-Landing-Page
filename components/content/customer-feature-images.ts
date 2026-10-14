import type { Lang } from "@/components/content";

type CustomerFeatureImage = {
  src: string;
  alt: Record<Lang, string>;
};

export const customerFeatureImages: Record<string, CustomerFeatureImage> = {
  "FixTrack-0": {
    src: "/customer-feature-photos/control-tower.webp",
    alt: {
      en: "Warehouse supervisor reviewing operations on a tablet.",
      id: "Supervisor gudang meninjau operasional melalui tablet.",
    },
  },
  "FixTrack-1": {
    src: "/customer-feature-photos/routing-truck-road.webp",
    alt: {
      en: "Cargo truck traveling along an open highway.",
      id: "Truk kargo melaju di jalan raya yang terbuka.",
    },
  },
  "FixTrack-2": {
    src: "/customer-feature-photos/fuel-efficiency.webp",
    alt: {
      en: "Green delivery van traveling through a rural landscape.",
      id: "Mobil van pengiriman hijau melaju melewati kawasan pedesaan.",
    },
  },
  "FixTrack-3": {
    src: "/customer-feature-photos/operations-team.webp",
    alt: {
      en: "Operations colleagues collaborating around a laptop.",
      id: "Rekan kerja operasional berdiskusi bersama di depan laptop.",
    },
  },
  "FixTrack-4": {
    src: "/customer-feature-photos/driver-unloading.webp",
    alt: {
      en: "Truck driver unloading cargo at a distribution site.",
      id: "Pengemudi menurunkan muatan truk di area distribusi.",
    },
  },
  "FixTrack-5": {
    src: "/customer-feature-photos/fleet-highway-traffic.webp",
    alt: {
      en: "Freight trucks moving along a highway at dusk.",
      id: "Truk pengangkut barang melaju di jalan raya saat senja.",
    },
  },
  "FixWork-0": {
    src: "/customer-feature-photos/attendance-team.webp",
    alt: {
      en: "Business colleagues working together at computers in an office.",
      id: "Rekan kerja berkolaborasi menggunakan komputer di kantor.",
    },
  },
  "FixWork-1": {
    src: "/customer-feature-photos/recruitment-interview.webp",
    alt: {
      en: "Two professionals taking part in an online job interview.",
      id: "Dua profesional mengikuti wawancara kerja daring.",
    },
  },
  "FixWork-2": {
    src: "/customer-feature-photos/approval-documents.webp",
    alt: {
      en: "Colleagues reviewing and signing office documents.",
      id: "Rekan kerja meninjau dan menandatangani dokumen kantor.",
    },
  },
  "FixWork-3": {
    src: "/customer-feature-photos/team-discussion.webp",
    alt: {
      en: "Coworkers discussing work around a laptop.",
      id: "Rekan kerja berdiskusi sambil melihat laptop.",
    },
  },
  "FixWork-4": {
    src: "/customer-feature-photos/payroll-workstation.webp",
    alt: {
      en: "Professional reviewing financial papers at a desk.",
      id: "Profesional meninjau dokumen keuangan di meja kerja.",
    },
  },
  "FixWork-5": {
    src: "/customer-feature-photos/hr-records.webp",
    alt: {
      en: "Employee carefully reviewing paperwork in an office.",
      id: "Karyawan meninjau dokumen dengan saksama di kantor.",
    },
  },
  "FixSight-0": {
    src: "/customer-feature-photos/ai-cctv.webp",
    alt: {
      en: "A CCTV camera mounted on an exterior wall for site monitoring.",
      id: "Kamera CCTV terpasang di dinding luar untuk memantau area.",
    },
  },
  "FixSight-1": {
    src: "/customer-feature-photos/worker-tablet.webp",
    alt: {
      en: "Warehouse worker using a tablet among storage shelves.",
      id: "Pekerja gudang menggunakan tablet di antara rak penyimpanan.",
    },
  },
  "FixSight-2": {
    src: "/customer-feature-photos/factory-inspection.webp",
    alt: {
      en: "Factory worker in a safety helmet inspecting machinery.",
      id: "Pekerja pabrik berhelm keselamatan memeriksa mesin.",
    },
  },
  "FixSight-3": {
    src: "/customer-feature-photos/factory-workers.webp",
    alt: {
      en: "Industrial workers operating equipment on a production floor.",
      id: "Pekerja industri mengoperasikan peralatan di area produksi.",
    },
  },
  "FixSight-4": {
    src: "/customer-feature-photos/factory-engineer.webp",
    alt: {
      en: "Factory engineer in protective gear operating a CNC machine.",
      id: "Teknisi pabrik dengan perlengkapan pelindung mengoperasikan mesin CNC.",
    },
  },
  "FixSight-5": {
    src: "/customer-feature-photos/modular-factory-worker.webp",
    alt: {
      en: "Factory worker in protective gear beside industrial machinery.",
      id: "Pekerja pabrik dengan perlengkapan pelindung di dekat mesin industri.",
    },
  },
};
