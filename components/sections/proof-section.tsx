import { Activity } from "lucide-react";
import type { Copy } from "@/components/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProofSection({ content }: { content: Copy }) {
  return (
    <section className="bg-[#f4f8ff] py-24 sm:py-32">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={content.proofEyebrow} title={content.proofTitle} description={content.proofText} />
          <p className="mt-8 flex items-center gap-3 text-[11px] font-semibold text-[#0a1c37]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white"><Activity size={14} aria-hidden="true" /></span>
            {content.operational}
          </p>
        </Reveal>
        <Reveal delay={0.12}><OperationsDashboard content={content} /></Reveal>
      </div>
    </section>
  );
}

function OperationsDashboard({ content }: { content: Copy }) {
  return (
    <div className="rounded-[23px] border border-blue-100 bg-white p-4 shadow-[0_24px_75px_rgba(12,36,72,.1)] sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-semibold text-[#10213d]">Treffix Operations</p>
          <p className="mt-1 text-[10px] text-slate-500">{content.mapLabel}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5 text-[9px] font-semibold text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />{content.previewTag}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1.25fr_.75fr]">
        <FleetMap label={content.mapLabel} monitor={content.monitor} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          <MetricCard label={content.activeVehicles} value={<>5,000<span className="text-sm text-slate-500">+</span></>} status={content.onRoute} statusClass="text-emerald-600" />
          <MetricCard label={content.attention} value="12" status={content.fleetStatus} statusClass="text-amber-600" />
          <div className="col-span-2 rounded-xl bg-[#f4f8ff] p-3 sm:col-span-1">
            <p className="text-[9px] text-slate-500">{content.activityTitle}</p>
            <div className="mt-2 flex h-7 items-end gap-1">
              {[35, 54, 44, 68, 51, 82, 64, 93, 70, 100, 76, 87].map((height, index) => (
                <span key={index} className="flex-1 rounded-t-sm bg-blue-500/75" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[10px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" />{content.operational}</span>
        <span className="text-[9px] text-slate-500">{content.updated}</span>
      </div>
    </div>
  );
}

function FleetMap({ label, monitor }: { label: string; monitor: string }) {
  return (
    <div className="map-grid relative min-h-[230px] overflow-hidden rounded-xl">
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
        <path d="M-10 203C62 178 72 106 139 128C208 151 208 80 269 89C330 98 322 41 410 28" fill="none" stroke="#235b91" strokeWidth="15" opacity=".35" />
        <path d="M-10 203C62 178 72 106 139 128C208 151 208 80 269 89C330 98 322 41 410 28" fill="none" stroke="#62b7ff" strokeWidth="2" strokeDasharray="6 8" className="route" />
        {[[139, 128], [269, 89], [330, 60], [72, 170]].map(([x, y], index) => (
          <g key={index}><circle cx={x} cy={y} r="9" fill="#2392ff" opacity=".2" /><circle cx={x} cy={y} r="3.5" fill="#64bdff" /></g>
        ))}
      </svg>
      <span className="absolute bottom-3 left-3 rounded-md bg-[#071a35]/80 px-2.5 py-1.5 text-[9px] text-white">{monitor}</span>
    </div>
  );
}

function MetricCard({ label, value, status, statusClass }: { label: string; value: React.ReactNode; status: string; statusClass: string }) {
  return (
    <div className="rounded-xl bg-[#f4f8ff] p-3">
      <p className="text-[9px] text-slate-500">{label}</p>
      <p className="mt-1.5 text-xl font-semibold tracking-[-.04em] text-[#10213d]">{value}</p>
      <p className={`mt-1 text-[9px] ${statusClass}`}>{status}</p>
    </div>
  );
}
