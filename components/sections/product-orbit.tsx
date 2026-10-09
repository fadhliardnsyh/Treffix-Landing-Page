import Image from "next/image";
import { Camera } from "lucide-react";
import type { Lang } from "@/components/content";

type OrbitProduct = {
  id: "FixTrack" | "FixWork" | "FixSight";
  icon: typeof Camera | null;
  logo: string | undefined;
  step: 0 | 1 | 2;
  x: number;
  y: number;
  path: string;
  turns: readonly (readonly [number, number])[];
};

const orbitProducts: readonly OrbitProduct[] = [
  { id: "FixTrack", icon: null, logo: "/fixtrack-icon-blue.svg", step: 0, x: 18.33, y: 25, path: "M 110 105 C 165 105 166 142 226 146", turns: [] },
  { id: "FixWork", icon: null, logo: "/fixwork-blue.svg", step: 2, x: 81.67, y: 25, path: "M 490 105 C 435 105 434 142 374 146", turns: [] },
  { id: "FixSight", icon: Camera, logo: undefined, step: 1, x: 50, y: 84, path: "M 300 353 C 300 332 300 314 300 293", turns: [] },
];

export function ProductOrbit({
  activeStep,
  language,
  onSelect,
}: {
  activeStep: number;
  language: Lang;
  onSelect: (step: number) => void;
}) {
  return (
    <div
      className="circuit-stage relative isolate mx-auto aspect-[10/7] min-h-[320px] w-full max-w-[600px] overflow-hidden sm:min-h-[420px]"
      role="group"
      aria-label={language === "id" ? "Ekosistem produk Treffix" : "Treffix product ecosystem"}
    >
      <div className="circuit-art absolute inset-0">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 600 420"
          preserveAspectRatio="none"
          fill="none"
        >
          {orbitProducts.map((product, index) => {
            const active = activeStep === product.step;
            return (
              <g key={product.id} className="circuit-branch" data-active={active}>
                <path className="circuit-trace" d={product.path} />
                <path className="circuit-trace-pulse" pathLength="100" d={product.path} style={{ animationDelay: `${index * -0.8}s` }} />
                {product.turns.map(([cx, cy], turnIndex) => (
                  <circle key={`${product.id}-${turnIndex}`} className="circuit-junction" cx={cx} cy={cy} r="3.5" />
                ))}
              </g>
            );
          })}
        </svg>

        {orbitProducts.map((product) => {
          const Icon = product.icon;
          const active = activeStep === product.step;
          return (
            <div
              key={product.id}
              className="circuit-node-position absolute z-[1]"
              style={{ left: `${product.x}%`, top: `${product.y}%` }}
            >
              <button
                type="button"
                className="circuit-node"
                aria-label={product.id === "FixSight" ? "FixSight AI CCTV" : product.id}
                aria-pressed={active}
                data-active={active}
                onClick={() => onSelect(product.step)}
              >
                {product.logo ? (
                  <Image
                    src={product.logo}
                    alt=""
                    aria-hidden="true"
                    width={64}
                    height={64}
                    sizes="36px"
                    className={`circuit-node__logo circuit-node__logo--${product.id}`}
                  />
                ) : Icon ? (
                  <span className="circuit-node__icon" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                ) : null}
              </button>
              <span className="circuit-node__label" aria-hidden="true">
                {product.id}
              </span>
            </div>
          );
        })}

        <div className="circuit-core" role="img" aria-label={language === "id" ? "Logo Treffix" : "Treffix logo"}>
          <Image src="/treffix-icon.svg" alt="" width={707} height={796} sizes="(max-width: 640px) 80px, 110px" className="h-[82px] w-auto object-contain sm:h-[108px]" />
        </div>
      </div>
    </div>
  );
}
