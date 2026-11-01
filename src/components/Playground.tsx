import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Activity, Network, Cpu, Layers } from "lucide-react";

import CanvasErrorBoundary from "@/components/canvas/CanvasErrorBoundary";
import PlaygroundFallback from "./playground/PlaygroundFallback";

const WebSocketMeshExperiment = lazy(() => import("./playground/WebSocketMeshExperiment"));
const AgentWorkflowExperiment = lazy(() => import("./playground/AgentWorkflowExperiment"));
const FintechPipelineExperiment = lazy(() => import("./playground/FintechPipelineExperiment"));
const RAGPipelineExperiment = lazy(() => import("./playground/RAGPipelineExperiment"));

interface TabItem {
  id: string;
  number: string;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: "websocket", number: "01", label: "Real-Time WebSocket Mesh", icon: Activity },
  { id: "agent", number: "02", label: "Autonomous Agent DAG", icon: Network },
  { id: "fintech", number: "03", label: "Fintech Idempotency FSM", icon: Cpu },
  { id: "rag", number: "04", label: "RAG Retrieval Pipeline", icon: Layers },
];

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("websocket");
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only mount interactive experiments when playground section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="playground"
      ref={sectionRef}
      aria-label="Creative Technology Playground"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-14 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            04 // CREATIVE TECHNOLOGY LAB
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Beyond interfaces. Into engineering reality.
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-[#5E5B54] font-sans">
          Four functional software prototypes exploring real-time WebSockets, autonomous AI agent loops, transactional fintech idempotency, and RAG architectures.
        </p>
      </div>

      {/* Experiment Tabs Navigation */}
      <div
        role="tablist"
        aria-label="Playground Experiments"
        className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 border text-left transition-all duration-200 flex flex-col justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336] ${
                isActive
                  ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-sm"
                  : "bg-[#FFFFFF] text-[#20201D] border-[#DAD4C9] hover:border-[#20201D]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`font-mono text-[10px] ${isActive ? "text-[#E65336]" : "text-[#77746C]"}`}>
                  EXP // {tab.number}
                </span>
                <tab.icon className={`w-4 h-4 ${isActive ? "text-[#E65336]" : "text-[#77746C]"}`} />
              </div>
              <span className="font-serif text-lg sm:text-xl font-normal leading-snug">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Experiment Stage (Lazy-mounted only when visible) */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center"
      >
        {isInView ? (
          <CanvasErrorBoundary
            fallback={
              <PlaygroundFallback type="particles" />
            }
          >
            <Suspense
              fallback={
                <div className="w-full h-[380px] sm:h-[460px] bg-[#FFFFFF] border border-[#DAD4C9] rounded flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-8 h-8 border-2 border-[#20201D] border-t-transparent rounded-full animate-spin mb-3" />
                  <span className="font-mono text-xs text-[#5E5B54] uppercase tracking-wider">
                    Loading Functional Simulation...
                  </span>
                </div>
              }
            >
              {activeTab === "websocket" && <WebSocketMeshExperiment />}
              {activeTab === "agent" && <AgentWorkflowExperiment />}
              {activeTab === "fintech" && <FintechPipelineExperiment />}
              {activeTab === "rag" && <RAGPipelineExperiment />}
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <div className="w-full h-[380px] sm:h-[460px] bg-[#E9E3D8]/50 border border-[#DAD4C9] rounded flex items-center justify-center font-mono text-xs text-[#77746C] uppercase tracking-wider">
            [SCENE PAUSED // SCROLL INTO VIEW TO ACTIVATE]
          </div>
        )}
      </div>
    </section>
  );
};

export default Playground;
