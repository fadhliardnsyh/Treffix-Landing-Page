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
            <stop offset="0" stopColor="var(--blue)" stopOpacity=".18" />
            <stop offset=".56" stopColor="var(--navy)" />
            <stop offset="1" stopColor="#030b17" />
          </linearGradient>
          <radialGradient id={`${id}-light`} cx=".72" cy=".25" r=".7">
            <stop stopColor="var(--blue)" stopOpacity=".62" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--blue)" stopOpacity=".9" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity=".36" />
          </linearGradient>
          <pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="var(--blue)" strokeOpacity=".12" strokeWidth=".7" />
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
            <path d="M62 174h74l22-35h68l23 35h44v117H62z" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".62" strokeWidth="2" />
            <circle cx="193" cy="232" r="54" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".8" strokeWidth="3" />
            <circle cx="193" cy="232" r="30" fill="var(--blue)" fillOpacity=".2" stroke={`url(#${id}-glass)`} strokeWidth="5" />
            <circle cx="193" cy="232" r="11" fill="var(--blue)" fillOpacity=".6" />
            <path d="M102 203v-19h27m126 0h25v25m-178 71v-25h25m154 25v-25" stroke="var(--blue)" strokeOpacity=".72" strokeWidth="3" />
            <path d="M78 320h202" stroke="var(--blue)" strokeOpacity=".25" />
          </g>
        )}

        {variant === "hrms-absensi-rekrutmen-payroll" && (
          <g>
            <circle cx="273" cy="146" r="64" fill="var(--blue)" fillOpacity=".12" />
            <rect x="76" y="112" width="208" height="240" rx="18" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".58" strokeWidth="2" />
            <rect x="96" y="136" width="168" height="63" rx="12" fill="var(--navy)" />
            <circle cx="126" cy="166" r="17" fill={`url(#${id}-glass)`} />
            <path d="M105 188c2-13 9-19 21-19s19 6 21 19" fill="var(--blue)" fillOpacity=".62" />
            <path d="M157 154h87m-87 20h66" stroke="var(--blue)" strokeOpacity=".72" strokeWidth="5" strokeLinecap="round" />
            <rect x="97" y="216" width="166" height="47" rx="9" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".34" />
            <circle cx="118" cy="239" r="10" fill="var(--blue)" />
            <path d="m113 239 4 4 7-9" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M140 232h105m-105 13h78" stroke="var(--blue)" strokeOpacity=".62" strokeWidth="4" strokeLinecap="round" />
            <rect x="97" y="278" width="166" height="48" rx="9" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".34" />
            <path d="M115 297h20m-20 12h80m-80 8h51" stroke="var(--blue)" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="238" cy="305" r="12" fill="var(--blue)" />
          </g>
        )}

        {variant === "notifikasi-real-time-dan-pemutaran-ulang-armada" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="54" y="133" width="252" height="204" rx="18" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".54" strokeWidth="2" />
            <path d="M82 296h196M82 178h196M82 218h196M82 258h196" stroke="var(--blue)" strokeOpacity=".13" />
            <path d="M83 280c28-9 34-48 67-43s36 15 60-8 35-8 68-46" stroke="var(--blue)" strokeOpacity=".45" strokeWidth="18" />
            <path d="M83 280c28-9 34-48 67-43s36 15 60-8 35-8 68-46" stroke="var(--blue)" strokeWidth="3" strokeDasharray="10 12" />
            <circle cx="151" cy="237" r="9" fill="var(--blue)" stroke="var(--blue)" strokeWidth="3" />
            <circle cx="278" cy="183" r="9" fill="var(--blue)" stroke="var(--blue)" strokeWidth="3" />
            <rect x="194" y="100" width="111" height="40" rx="20" fill="var(--blue)" fillOpacity=".24" stroke="var(--blue)" strokeOpacity=".7" />
            <circle cx="216" cy="120" r="6" fill="var(--blue)" />
            <path d="M231 120h55" stroke="var(--blue)" strokeOpacity=".78" strokeWidth="4" />
          </g>
        )}

        {variant === "absensi-karyawan-dan-area-absensi" && (
          <g>
            <circle cx="182" cy="222" r="112" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".48" strokeWidth="2" />
            <circle cx="182" cy="222" r="83" fill="var(--blue)" fillOpacity=".12" stroke="var(--blue)" strokeOpacity=".62" strokeWidth="2" />
            <rect x="126" y="151" width="112" height="142" rx="16" fill="var(--navy)" stroke="var(--blue)" strokeOpacity=".78" strokeWidth="2" />
            <path d="M154 143v26m56-26v26" stroke="var(--blue)" strokeOpacity=".72" strokeWidth="6" strokeLinecap="round" />
            <path d="M127 187h110" stroke="var(--blue)" strokeWidth="15" />
            <circle cx="182" cy="222" r="24" fill={`url(#${id}-glass)`} />
            <path d="M147 269c3-23 15-35 35-35s32 12 35 35" fill="var(--blue)" fillOpacity=".72" stroke="var(--blue)" strokeOpacity=".8" strokeWidth="2" />
            <path d="M99 222h-28m222 0h-28M182 109V81m0 282v-28" stroke="var(--blue)" strokeOpacity=".44" strokeWidth="2" />
          </g>
        )}

        <rect width="360" height="480" fill={`url(#${id}-background)`} opacity={isMap ? ".12" : ".06"} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[#06152a]/5 via-[#06152a]/10 to-[#030a14]/70" />
    </div>
  );
}
