import Image from "next/image";
import { Activity, Route, Users, Warehouse } from "lucide-react";
import type { Lang } from "@/components/content";

const orbitProducts = [
  { id: "FixTrack", icon: Route, step: 0, x: 23.33, y: 24.29, path: "M 225 171 H 174 V 102 H 140", turns: [[174, 171], [174, 102]] },
  { id: "FixWork", icon: Users, step: 1, x: 76.67, y: 24.29, path: "M 375 171 H 426 V 102 H 460", turns: [[426, 171], [426, 102]] },
  { id: "FixHub", icon: Warehouse, step: 1, x: 76.67, y: 75.71, path: "M 375 249 H 426 V 318 H 460", turns: [[426, 249], [426, 318]] },
  { id: "OCS", icon: Activity, step: 2, x: 23.33, y: 75.71, path: "M 225 249 H 174 V 318 H 140", turns: [[174, 249], [174, 318]] },
] as const;

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
      className="circuit-stage relative isolate mx-auto aspect-[10/7] min-h-0 w-full max-w-[600px] overflow-hidden sm:min-h-[420px]"
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
                aria-label={product.id}
                aria-pressed={active}
                data-active={active}
                onClick={() => onSelect(product.step)}
              >
                <span className="circuit-node__icon">
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
              </button>
            </div>
          );
        })}

        <div className="circuit-core" role="img" aria-label={language === "id" ? "Logo Treffix" : "Treffix logo"}>
          <Image src="/treffix-icon.svg" alt="" width={707} height={796} sizes="(max-width: 640px) 80px, 110px" className="h-[86px] w-auto object-contain sm:h-[118px]" />
        </div>
      </div>
    </div>
  );
}
