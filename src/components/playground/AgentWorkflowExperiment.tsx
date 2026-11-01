import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Wrench,
  Search,
  CheckCircle2,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Calendar,
  ShieldCheck,
} from "lucide-react";

interface AgentStep {
  stepNumber: number;
  phase: "Goal" | "Thought" | "Tool Call" | "Observation" | "Synthesis";
  title: string;
  detail: string;
  toolInvoked?: string;
  parameters?: Record<string, unknown>;
  observationOutput?: string;
  latencyMs: number;
  tokenCount: number;
}

interface AgentScenario {
  id: string;
  title: string;
  goal: string;
  steps: AgentStep[];
}

const SCENARIOS: AgentScenario[] = [
  {
    id: "tuitionmaster",
    title: "TuitionMaster Tutor Matching",
    goal: "Match verified Calculus tutor in Kathmandu with rating >= 4.8 and reserve a trial slot.",
    steps: [
      {
        stepNumber: 1,
        phase: "Goal",
        title: "Ingest User Request & Decompose Constraints",
        detail: "Extract search parameters: Subject = 'Calculus', Region = 'Kathmandu', MinRating = 4.8, Mode = 'Hybrid/Onsite'.",
        latencyMs: 120,
        tokenCount: 84,
      },
      {
        stepNumber: 2,
        phase: "Thought",
        title: "Formulate Tool Calling Strategy",
        detail: "Plan: (1) Query persistent tutor collection via Postgres/MongoDB filter, (2) Evaluate calendar slot availability.",
        latencyMs: 190,
        tokenCount: 112,
      },
      {
        stepNumber: 3,
        phase: "Tool Call",
        title: "Invoke database_query()",
        detail: "Executing parameterized search on verified educators index.",
        toolInvoked: "database_query",
        parameters: {
          collection: "tutors",
          filters: { subject: "Calculus", verified: true, minRating: 4.8, city: "Kathmandu" },
          limit: 3,
        },
        latencyMs: 45,
        tokenCount: 65,
      },
      {
        stepNumber: 4,
        phase: "Observation",
        title: "Parse DB Observation Stream",
        detail: "Received 3 candidate records. Top match: Er. Rajesh Shrestha (Rating: 4.92, 140+ sessions).",
        observationOutput: "Found: Tutor_ID 'TUT-884' (Matches all pedagogical & regional criteria).",
        latencyMs: 15,
        tokenCount: 140,
      },
      {
        stepNumber: 5,
        phase: "Tool Call",
        title: "Invoke calendar_check_availability()",
        detail: "Querying educator's real-time slot calendar for upcoming weekend.",
        toolInvoked: "calendar_check_availability",
        parameters: { tutorId: "TUT-884", dateRange: ["2026-11-06", "2026-11-07"] },
        latencyMs: 38,
        tokenCount: 52,
      },
      {
        stepNumber: 6,
        phase: "Synthesis",
        title: "Generate Final Coordinated Solution",
        detail: "Synthesizing schedule confirmation with complete educator credentials and direct booking link.",
        observationOutput: "Match Confirmed: Reserved trial session for Saturday at 16:00 NPT with Er. Rajesh Shrestha.",
        latencyMs: 420,
        tokenCount: 210,
      },
    ],
  },
  {
    id: "fintech_audit",
    title: "NavaNexa Ledger Reconciliation",
    goal: "Verify cryptographic SHA-256 transaction hash across payment gateway logs and double-entry ledger.",
    steps: [
      {
        stepNumber: 1,
        phase: "Goal",
        title: "Audit Objective Ingestion",
        detail: "Target Transaction: TXN_NAV_9924. Reconcile customer debit with merchant escrow credit.",
        latencyMs: 95,
        tokenCount: 72,
      },
      {
        stepNumber: 2,
        phase: "Tool Call",
        title: "Invoke gateway_webhook_lookup()",
        detail: "Querying CityPay/Fonepay gateway webhook archive for verified delivery receipt.",
        toolInvoked: "gateway_webhook_lookup",
        parameters: { transactionId: "TXN_NAV_9924", provider: "Fonepay" },
        latencyMs: 62,
        tokenCount: 48,
      },
      {
        stepNumber: 3,
        phase: "Observation",
        title: "Gateway Receipt Verified",
        detail: "Gateway response confirms status 200 OK with verified webhook HMAC signature.",
        observationOutput: "Gateway ACK: AuthCode 'FP-98214', Status 'SUCCESS', Amount 'NPR 4,500.00'.",
        latencyMs: 18,
        tokenCount: 96,
      },
      {
        stepNumber: 4,
        phase: "Tool Call",
        title: "Invoke ledger_verify_checksum()",
        detail: "Calculating cryptographic merkle proof across debit & credit entries.",
        toolInvoked: "ledger_verify_checksum",
        parameters: { ledgerBlockId: 10428, expectedHash: "0x7a2f...c891" },
        latencyMs: 44,
        tokenCount: 58,
      },
      {
        stepNumber: 5,
        phase: "Synthesis",
        title: "Audit Reconciliation Verified",
        detail: "All accounts balance. Merkle checksum matches. Zero discrepancy detected.",
        observationOutput: "Audit Passed: Transaction fully settled with zero variance across distributed nodes.",
        latencyMs: 380,
        tokenCount: 165,
      },
    ],
  },
];

export const AgentWorkflowExperiment: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("tuitionmaster");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const activeStep = scenario.steps[activeStepIndex] || scenario.steps[0];

  // Auto-play steps
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % scenario.steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying, scenario.steps.length]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStepIndex(0);
  };

  const totalTokens = scenario.steps.slice(0, activeStepIndex + 1).reduce((acc, s) => acc + s.tokenCount, 0);
  const totalLatency = scenario.steps.slice(0, activeStepIndex + 1).reduce((acc, s) => acc + s.latencyMs, 0);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#DAD4C9] rounded shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Top HUD Control Bar */}
      <div className="p-3 sm:p-4 border-b border-[#DAD4C9] bg-[#F5F1E8]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#8A9367] animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[#20201D] font-semibold uppercase tracking-wider">
              EXP-02 // AUTONOMOUS AGENT REASONING ENGINE
            </span>
            <span className="hidden sm:inline text-[#77746C]">|</span>
            <span className="text-[#77746C] text-[11px]">
              ARCHITECTURE: ReAct Loop (Thought ➔ Action ➔ Observation)
            </span>
          </div>
        </div>

        {/* Scenario Switchers */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#77746C] text-[10px] uppercase mr-1 hidden sm:inline">Scenario:</span>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleScenarioChange(s.id)}
              className={`px-2.5 py-1 text-[10px] sm:text-[11px] uppercase rounded border transition-all ${
                selectedScenarioId === s.id
                  ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] font-medium"
                  : "bg-[#FFFFFF] text-[#5E5B54] border-[#DAD4C9] hover:border-[#20201D]"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution DAG & Step Flow */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FAFAF7] to-[#F5F1E8]/50 space-y-6">
        {/* Goal Banner */}
        <div className="p-3 bg-[#FFFFFF] border border-[#DAD4C9] rounded flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block">
              Autonomous Agent Objective:
            </span>
            <p className="font-serif text-sm sm:text-base text-[#20201D] font-normal">
              "{scenario.goal}"
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#77746C]">
            <span>Elapsed: <strong className="text-[#20201D]">{totalLatency}ms</strong></span>
            <span>Tokens: <strong className="text-[#E65336]">{totalTokens}</strong></span>
          </div>
        </div>

        {/* Visual DAG Step Timeline Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {scenario.steps.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => {
                  setActiveStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded border text-left transition-all relative flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-sm scale-102"
                    : isCompleted
                    ? "bg-[#FFFFFF] text-[#20201D] border-[#8A9367]/60"
                    : "bg-[#FFFFFF]/70 text-[#77746C] border-[#DAD4C9]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? "bg-[#E65336] text-white"
                        : isCompleted
                        ? "bg-[#8A9367]/15 text-[#8A9367]"
                        : "bg-[#DAD4C9]/40 text-[#77746C]"
                    }`}
                  >
                    {step.phase}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9367]" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-[#E65336] animate-pulse" />}
                </div>

                <div className="font-mono text-[11px] font-semibold leading-tight line-clamp-2">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Panel for Active Step */}
        <div className="bg-[#FFFFFF] border border-[#DAD4C9] rounded p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DAD4C9] pb-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Brain className="w-4 h-4 text-[#E65336]" />
              <span className="font-semibold text-[#20201D]">
                Step 0{activeStep.stepNumber} // {activeStep.title}
              </span>
            </div>
            <div className="font-mono text-[10px] text-[#77746C] flex items-center gap-3">
              <span>Phase Latency: <strong className="text-[#20201D]">{activeStep.latencyMs}ms</strong></span>
              <span>Tokens: <strong className="text-[#20201D]">{activeStep.tokenCount}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5E5B54] font-sans leading-relaxed">
            {activeStep.detail}
          </p>

          {/* Conditional Tool Execution Preview */}
          {activeStep.toolInvoked && (
            <div className="bg-[#FAFAF7] border border-[#DAD4C9] rounded p-3 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-[#77746C] text-[10px]">
                <span className="flex items-center gap-1.5 text-[#20201D] font-semibold">
                  <Wrench className="w-3 h-3 text-[#E65336]" />
                  TOOL INVOCATION: {activeStep.toolInvoked}()
                </span>
                <span className="text-[#8A9367]">STATUS: EXECUTED</span>
              </div>
              <pre className="text-[10px] text-[#20201D] overflow-x-auto bg-[#FFFFFF] p-2 rounded border border-[#DAD4C9]/60">
                {JSON.stringify(activeStep.parameters, null, 2)}
              </pre>
            </div>
          )}

          {/* Conditional Observation / Synthesis Output */}
          {activeStep.observationOutput && (
            <div className="bg-[#8A9367]/10 border border-[#8A9367]/30 rounded p-3 space-y-1 font-mono text-[11px]">
              <div className="text-[10px] text-[#8A9367] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#8A9367]" />
                ENVIRONMENT OBSERVATION / SYNTHESIS:
              </div>
              <div className="text-xs text-[#20201D] font-sans">
                {activeStep.observationOutput}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Playback Bar */}
      <div className="p-3 sm:p-4 border-t border-[#DAD4C9] bg-[#F5F1E8]/80 flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="p-1.5 rounded border border-[#DAD4C9] bg-[#FFFFFF] text-[#20201D] hover:border-[#20201D] transition-colors disabled:opacity-40"
            aria-label="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-3 py-1.5 rounded border border-[#20201D] bg-[#20201D] text-[#F5F1E8] hover:bg-[#E65336] hover:border-[#E65336] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause" : "Auto-Run"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStepIndex((prev) => Math.min(scenario.steps.length - 1, prev + 1))}
            disabled={activeStepIndex === scenario.steps.length - 1}
            className="p-1.5 rounded border border-[#DAD4C9] bg-[#FFFFFF] text-[#20201D] hover:border-[#20201D] transition-colors disabled:opacity-40"
            aria-label="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[#77746C] text-[11px]">
          Step {activeStepIndex + 1} of {scenario.steps.length}
        </span>
      </div>
    </div>
  );
};

export default AgentWorkflowExperiment;
