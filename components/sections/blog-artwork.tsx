type BlogArtworkProps = {
  variant: string;
};

export function BlogArtwork({ variant }: BlogArtworkProps) {
  const id = `blog-art-${variant}`;
  const isMap = variant === "pelacakan-armada-dan-perjalanan-kendaraan";

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#071a35]">
      <svg viewBox="0 0 360 480" preserveAspectRatio="xMidYMid slice" className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
        <defs>
          <linearGradient id={`${id}-background`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0c2c50" />
            <stop offset=".56" stopColor="#0a1b35" />
            <stop offset="1" stopColor="#030b17" />
          </linearGradient>
          <radialGradient id={`${id}-light`} cx=".72" cy=".25" r=".7">
            <stop stopColor="#1678dc" stopOpacity=".62" />
            <stop offset="1" stopColor="#1678dc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#72c7ff" stopOpacity=".9" />
            <stop offset="1" stopColor="#1462bb" stopOpacity=".36" />
          </linearGradient>
          <pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#82baff" strokeOpacity=".12" strokeWidth=".7" />
          </pattern>
        </defs>

        <rect width="360" height="480" fill={`url(#${id}-background)`} />
        <rect width="360" height="480" fill={`url(#${id}-light)`} />
        {isMap ? (
          <image href="/fixtrack-dark-map.svg" x="0" y="0" width="360" height="480" preserveAspectRatio="xMidYMid slice" opacity=".82" />
        ) : (
          <rect width="360" height="480" fill={`url(#${id}-grid)`} />
        )}

        {variant === "cctv-ai-untuk-pemantauan-operasional" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M62 174h74l22-35h68l23 35h44v117H62z" fill="#0b2443" stroke="#69b9ff" strokeOpacity=".62" strokeWidth="2" />
            <circle cx="193" cy="232" r="54" fill="#071a35" stroke="#8bcaff" strokeOpacity=".8" strokeWidth="3" />
            <circle cx="193" cy="232" r="30" fill="#123d6d" stroke={`url(#${id}-glass)`} strokeWidth="5" />
            <circle cx="193" cy="232" r="11" fill="#72c7ff" fillOpacity=".6" />
            <path d="M102 203v-19h27m126 0h25v25m-178 71v-25h25m154 25v-25" stroke="#b2ddff" strokeWidth="3" />
            <path d="M78 320h202" stroke="#6cbaff" strokeOpacity=".25" />
          </g>
        )}

        {variant === "hrms-absensi-rekrutmen-payroll" && (
          <g>
            <circle cx="273" cy="146" r="64" fill="#1781e8" fillOpacity=".12" />
            <rect x="76" y="112" width="208" height="240" rx="18" fill="#0b2443" stroke="#7bc5ff" strokeOpacity=".58" strokeWidth="2" />
            <rect x="96" y="136" width="168" height="63" rx="12" fill="#12365d" />
            <circle cx="126" cy="166" r="17" fill={`url(#${id}-glass)`} />
            <path d="M105 188c2-13 9-19 21-19s19 6 21 19" fill="#4d9ce8" />
            <path d="M157 154h87m-87 20h66" stroke="#bddfff" strokeOpacity=".72" strokeWidth="5" strokeLinecap="round" />
            <rect x="97" y="216" width="166" height="47" rx="9" fill="#102f52" stroke="#5da7e8" strokeOpacity=".34" />
            <circle cx="118" cy="239" r="10" fill="#1f71c9" />
            <path d="m113 239 4 4 7-9" fill="none" stroke="#dff2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M140 232h105m-105 13h78" stroke="#a6c9ea" strokeOpacity=".62" strokeWidth="4" strokeLinecap="round" />
            <rect x="97" y="278" width="166" height="48" rx="9" fill="#102f52" stroke="#5da7e8" strokeOpacity=".34" />
            <path d="M115 297h20m-20 12h80m-80 8h51" stroke="#94bfe5" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="238" cy="305" r="12" fill="#135aa5" />
          </g>
        )}

        {variant === "notifikasi-real-time-dan-pemutaran-ulang-armada" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="54" y="133" width="252" height="204" rx="18" fill="#0b2443" stroke="#7bc5ff" strokeOpacity=".54" strokeWidth="2" />
            <path d="M82 296h196M82 178h196M82 218h196M82 258h196" stroke="#8dc8ff" strokeOpacity=".13" />
            <path d="M83 280c28-9 34-48 67-43s36 15 60-8 35-8 68-46" stroke="#2368b7" strokeOpacity=".45" strokeWidth="18" />
            <path d="M83 280c28-9 34-48 67-43s36 15 60-8 35-8 68-46" stroke="#79c5ff" strokeWidth="3" strokeDasharray="10 12" />
            <circle cx="151" cy="237" r="9" fill="#96d5ff" stroke="#d9f1ff" strokeWidth="3" />
            <circle cx="278" cy="183" r="9" fill="#96d5ff" stroke="#d9f1ff" strokeWidth="3" />
            <rect x="194" y="100" width="111" height="40" rx="20" fill="#11467a" stroke="#78c4ff" strokeOpacity=".7" />
            <circle cx="216" cy="120" r="6" fill="#67bbff" />
            <path d="M231 120h55" stroke="#d8edff" strokeOpacity=".78" strokeWidth="4" />
          </g>
        )}

        {variant === "absensi-karyawan-dan-area-absensi" && (
          <g>
            <circle cx="182" cy="222" r="112" fill="#0b2443" stroke="#4f9be2" strokeOpacity=".48" strokeWidth="2" />
            <circle cx="182" cy="222" r="83" fill="#0d2d50" stroke="#74bdff" strokeOpacity=".62" strokeWidth="2" />
            <rect x="126" y="151" width="112" height="142" rx="16" fill="#12345a" stroke="#a6d8ff" strokeOpacity=".78" strokeWidth="2" />
            <path d="M154 143v26m56-26v26" stroke="#c7e7ff" strokeWidth="6" strokeLinecap="round" />
            <path d="M127 187h110" stroke="#66baff" strokeWidth="15" />
            <circle cx="182" cy="222" r="24" fill={`url(#${id}-glass)`} />
            <path d="M147 269c3-23 15-35 35-35s32 12 35 35" fill="#327fc3" stroke="#9cd4ff" strokeOpacity=".8" strokeWidth="2" />
            <path d="M99 222h-28m222 0h-28M182 109V81m0 282v-28" stroke="#80c6ff" strokeOpacity=".44" strokeWidth="2" />
          </g>
        )}

        <rect width="360" height="480" fill={`url(#${id}-background)`} opacity={isMap ? ".12" : ".06"} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[#06152a]/5 via-[#06152a]/10 to-[#030a14]/70" />
    </div>
  );
}
