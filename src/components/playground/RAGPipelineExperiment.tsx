import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronRight, ChevronLeft, FileText, Split, Binary, Database, Search, MessageSquareCode, CheckCircle2 } from "lucide-react";

interface PipelineStage {
  id: number;
  name: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  technicalDetails: string;
  dataPayload: string;
  latencyAvg: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 1,
    name: "Document Upload",
    shortLabel: "Upload",
    icon: FileText,
    description: "Raw textbook PDFs, syllabus files, or technical manuals uploaded through secure endpoints.",
    technicalDetails: "Ingests raw binary streams, validates MIME headers, and pushes files to temporary object staging.",
    dataPayload: "Input: application/pdf (e.g. Physics_Vol1.pdf, 48.2 MB)",
    latencyAvg: "~150ms",
  },
  {
    id: 2,
    name: "Text Extraction",
    shortLabel: "Extract",
    icon: FileText,
    description: "Parses structured text, headings, mathematical formulas, and tables from binary documents.",
    technicalDetails: "Utilizes PDFMiner / PyMuPDF to extract text streams while preserving paragraph structure and page indexes.",
    dataPayload: "Output: Raw UTF-8 string with document page metadata",
    latencyAvg: "~800ms / 50 pages",
  },
  {
    id: 3,
    name: "Chunking",
    shortLabel: "Chunk",
    icon: Split,
    description: "Partitions long continuous documents into discrete passages with semantic overlap to prevent loss of context across boundaries.",
    technicalDetails: "RecursiveCharacterTextSplitter with chunkSize: 800 tokens and chunkOverlap: 120 tokens.",
    dataPayload: "Output: 342 discrete DocumentChunks with parent page refs",
    latencyAvg: "~120ms",
  },
  {
    id: 4,
    name: "Embedding",
    shortLabel: "Embed",
    icon: Binary,
    description: "Translates textual chunks into dense, high-dimensional numerical vectors capturing semantic relationships.",
    technicalDetails: "Dense vector projection (e.g. 1536-dimensional float32 vectors) normalized for cosine similarity distance.",
    dataPayload: "Output: float32[1536] dense representation per chunk",
    latencyAvg: "~250ms / batch",
  },
  {
    id: 5,
    name: "Vector DB Indexing",
    shortLabel: "Index",
    icon: Database,
    description: "Persists embeddings into ChromaDB with HNSW (Hierarchical Navigable Small World) index graph for millisecond queries.",
    technicalDetails: "Collections partitioned by user and subject; metadata filters applied for syllabus topics.",
    dataPayload: "Storage: ChromaDB persistent vector collection",
    latencyAvg: "~45ms per insert",
  },
  {
    id: 6,
    name: "Query Retrieval",
    shortLabel: "Retrieve",
    icon: Search,
    description: "User question is embedded and searched against ChromaDB using cosine distance with Maximal Marginal Relevance (MMR) ranking.",
    technicalDetails: "Top-k (k=4) relevant passages retrieved, scored, and deduplicated before prompt assembly.",
    dataPayload: "Output: Top 4 candidate chunks (similarity score > 0.82)",
    latencyAvg: "~35ms vector search",
  },
  {
    id: 7,
    name: "LLM Generation",
    shortLabel: "Response",
    icon: MessageSquareCode,
    description: "Retrieved chunks are injected into a strict system prompt instructing the LLM to generate answers solely grounded in the source text.",
    technicalDetails: "Zero-hallucination prompt envelope; returns answers with explicit citations to source chapters and pages.",
    dataPayload: "Final: Synthesized MCQ / explanation citing Page 142",
    latencyAvg: "~1.2s streaming",
  },
];

export const RAGPipelineExperiment: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-advance through pipeline
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStageId((prev) => (prev % STAGES.length) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = STAGES[activeStageId - 1];

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStageId((prev) => (prev % STAGES.length) + 1);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStageId((prev) => (prev === 1 ? STAGES.length : prev - 1));
  };

  return (
    <div
      role="region"
      aria-label="Interactive Retrieval-Augmented Generation (RAG) Architecture Simulation"
      className="w-full bg-[#FFFFFF] border border-[#DAD4C9] rounded p-6 sm:p-8 space-y-8 select-none"
    >
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-[10px] text-[#77746C] tracking-widest uppercase block">
            EXP-04 // ARCHITECTURAL DATA FLOW
          </span>
          <h3 className="font-serif text-2xl text-[#20201D]">
            RAG Pipeline Simulation
          </h3>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 border border-[#DAD4C9] rounded hover:border-[#20201D] transition-colors"
            aria-label="Previous pipeline stage"
          >
            <ChevronLeft className="w-4 h-4 text-[#20201D]" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 border border-[#20201D] bg-[#20201D] text-[#F5F1E8] rounded flex items-center gap-1.5 hover:bg-[#E65336] hover:border-[#E65336] transition-colors"
            aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px] uppercase tracking-wider">{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 border border-[#DAD4C9] rounded hover:border-[#20201D] transition-colors"
            aria-label="Next pipeline stage"
          >
            <ChevronRight className="w-4 h-4 text-[#20201D]" />
          </button>
        </div>
      </div>

      {/* Pipeline Track Visualizer */}
      <div className="relative pt-4">
        {/* Progress track line */}
        <div className="absolute top-9 left-4 right-4 h-[2px] bg-[#DAD4C9] hidden md:block" />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 relative z-10">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            const isCompleted = stage.id < activeStageId;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStageId(stage.id);
                }}
                className={`p-3 text-center border rounded transition-all duration-200 flex flex-col items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336] ${
                  isActive
                    ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-sm scale-105"
                    : isCompleted
                    ? "bg-[#E9E3D8] text-[#20201D] border-[#DAD4C9]"
                    : "bg-[#FFFFFF] text-[#5E5B54] border-[#DAD4C9] hover:border-[#20201D]"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] ${
                    isActive
                      ? "bg-[#E65336] text-[#FFFFFF]"
                      : isCompleted
                      ? "bg-[#8A9367] text-[#FFFFFF]"
                      : "bg-[#E9E3D8] text-[#5E5B54]"
                  }`}
                >
                  {stage.id}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider truncate max-w-full">
                  {stage.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Inspector & Technical Deep Dive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-[#F5F1E8] border border-[#DAD4C9] p-6 rounded space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DAD4C9]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#20201D] text-[#F5F1E8] rounded">
                <activeStage.icon className="w-4 h-4 text-[#E65336]" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#77746C] uppercase">STAGE {activeStage.id} OF 7</span>
                <h4 className="font-serif text-2xl text-[#20201D]">{activeStage.name}</h4>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#5E5B54]">Est. Latency:</span>
              <span className="px-2 py-0.5 rounded bg-[#E9E3D8] text-[#20201D] border border-[#DAD4C9] font-medium">
                {activeStage.latencyAvg}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#20201D] font-sans leading-relaxed">
            {activeStage.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#77746C] block">
                Technical Specification
              </span>
              <p className="font-sans text-xs text-[#5E5B54] leading-relaxed">
                {activeStage.technicalDetails}
              </p>
            </div>

            <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-1 font-mono text-xs">
              <span className="text-[9px] uppercase tracking-wider text-[#77746C] block">
                Data Representation
              </span>
              <p className="text-[#20201D] font-mono text-[11px] truncate">
                {activeStage.dataPayload}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Screen-Reader Accessible Summary (WCAG Text Alternative) */}
      <div className="sr-only">
        <h4>Complete RAG Pipeline Overview</h4>
        <ol>
          {STAGES.map((s) => (
            <li key={s.id}>
              Stage {s.id}: {s.name}. {s.description} Technical detail: {s.technicalDetails}. Latency: {s.latencyAvg}.
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RAGPipelineExperiment;
