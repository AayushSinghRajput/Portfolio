import React, { useState } from "react";
import { CaseStudyProject } from "@/data/portfolioData";
import { Monitor, Network } from "lucide-react";

interface Props {
  project: CaseStudyProject;
  defaultView?: "preview" | "schematic";
}

export const ProjectDiagrammaticPreview: React.FC<Props> = ({
  project,
  defaultView = "preview",
}) => {
  const [viewMode, setViewMode] = useState<"preview" | "schematic">(
    project.image ? defaultView : "schematic"
  );

  return (
    <div className="w-full h-full bg-[#FAF7F2] border border-[#DAD4C9] flex flex-col justify-between relative overflow-hidden select-none transition-colors">
      {/* Top Header Stamp */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#5E5B54] uppercase tracking-wider border-b border-[#DAD4C9] px-4 py-2.5 bg-[#FAF7F2]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E65336]" />
          <span>FIG // {project.slug.toUpperCase()}</span>
        </span>

        {/* View Mode Switcher Toggle */}
        {project.image ? (
          <div className="flex items-center gap-1 bg-[#EFEAE1] border border-[#DAD4C9] p-0.5 rounded text-[9px] font-mono">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode("preview");
              }}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-colors ${
                viewMode === "preview"
                  ? "bg-[#20201D] text-[#F5F1E8] font-semibold"
                  : "text-[#5E5B54] hover:text-[#20201D]"
              }`}
              aria-label="Show UI screenshot"
            >
              <Monitor className="w-2.5 h-2.5" />
              <span>UI PREVIEW</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode("schematic");
              }}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-colors ${
                viewMode === "schematic"
                  ? "bg-[#20201D] text-[#F5F1E8] font-semibold"
                  : "text-[#5E5B54] hover:text-[#20201D]"
              }`}
              aria-label="Show system schematic"
            >
              <Network className="w-2.5 h-2.5" />
              <span>SCHEMATIC</span>
            </button>
          </div>
        ) : (
          <span className="text-[#77746C]">
            {project.isPublicSafeSummary
              ? "ARCHITECTURE SCHEMATIC [PUBLIC-SAFE]"
              : "SYSTEM WORKFLOW SCHEMATIC"}
          </span>
        )}
      </div>

      {/* Main View Area */}
      {viewMode === "preview" && project.image ? (
        <div className="relative z-10 w-full aspect-[16/10] overflow-hidden bg-[#FAF7F2] flex items-center justify-center">
          <img
            src={project.image}
            alt={`${project.title} Interface Preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        /* Schematic Diagram View */
        <div className="relative z-10 flex-1 p-6 sm:p-8 flex flex-col justify-center bg-[#E9E3D8]/60 overflow-hidden min-h-[240px] sm:min-h-[300px]">
          {/* Background Architectural Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#20201D 1px, transparent 1px), linear-gradient(90deg, #20201D 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 py-4">
            {project.schematicType === "marketplace" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded shadow-xs">
                    <span className="text-[#77746C] block text-[9px]">INPUT</span>
                    <span className="font-semibold text-[#20201D]">Student Demand</span>
                  </div>
                  <div className="p-3 bg-[#20201D] text-[#F5F1E8] border border-[#20201D] rounded shadow-xs flex flex-col items-center justify-center">
                    <span className="text-[#E65336] block text-[9px]">ENGINE</span>
                    <span className="font-semibold">AI Match Matrix</span>
                  </div>
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded shadow-xs">
                    <span className="text-[#77746C] block text-[9px]">MATCH</span>
                    <span className="font-semibold text-[#8A9367]">Verified Tutor</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5E5B54]">
                  <span>Subject Matrix</span>
                  <span>→</span>
                  <span>Location Radius</span>
                  <span>→</span>
                  <span>Availability Queue</span>
                </div>
              </div>
            )}

            {project.schematicType === "rag-pipeline" && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[8px]">DOCS</span>
                    <span>Textbook PDFs</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[8px]">CHUNK</span>
                    <span>Semantic Overlap</span>
                  </div>
                  <div className="p-2.5 bg-[#20201D] text-[#F5F1E8] rounded border border-[#20201D]">
                    <span className="text-[#E65336] block text-[8px]">VECTOR</span>
                    <span>ChromaDB</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[8px]">LLM</span>
                    <span>Factual MCQ</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5E5B54]">
                  <span>Dense Embeddings</span>
                  <span>→</span>
                  <span>Cosine Similarity</span>
                  <span>→</span>
                  <span className="text-[#E65336]">Zero-Hallucination Prompt</span>
                </div>
              </div>
            )}

            {project.schematicType === "payment-flow" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[9px]">GATEWAY</span>
                    <span>CityPay / Fonepay</span>
                  </div>
                  <div className="p-3 bg-[#20201D] text-[#F5F1E8] border border-[#20201D] rounded">
                    <span className="text-[#E65336] block text-[9px]">SECURITY</span>
                    <span>HMAC Signature</span>
                  </div>
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[9px]">LEDGER</span>
                    <span>Atomic Post</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5E5B54]">
                  <span>Idempotent Webhooks</span>
                  <span>•</span>
                  <span>Reconciliation Audits</span>
                  <span>•</span>
                  <span>KYC Gateways</span>
                </div>
              </div>
            )}

            {project.schematicType === "ledger-accounting" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[9px]">JOURNAL</span>
                    <span className="text-[#E65336]">Debit Records</span>
                  </div>
                  <div className="p-3 bg-[#20201D] text-[#F5F1E8] border border-[#20201D] rounded">
                    <span className="text-[#E65336] block text-[9px]">INTEGRITY</span>
                    <span>Sum(Dr) = Sum(Cr)</span>
                  </div>
                  <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded">
                    <span className="text-[#77746C] block text-[9px]">JOURNAL</span>
                    <span className="text-[#8A9367]">Credit Records</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5E5B54]">
                  <span>PostgreSQL ACID Transactions</span>
                  <span>•</span>
                  <span>Append-Only Ledgers</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDiagrammaticPreview;
