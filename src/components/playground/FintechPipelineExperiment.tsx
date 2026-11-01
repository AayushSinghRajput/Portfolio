import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

type ScenarioType = "happy_path" | "duplicate_protection" | "network_retry" | "rollback";

interface LedgerEntry {
  account: string;
  type: "DEBIT" | "CREDIT";
  amount: string;
  currency: string;
  status: "PENDING" | "COMMITTED" | "ROLLED_BACK";
}

export const FintechPipelineExperiment: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("happy_path");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(4);
  const [duplicateAttempts, setDuplicateAttempts] = useState<number>(0);

  const STATES = [
    { code: "INITIATED", label: "Client Ingestion", latency: "12ms" },
    { code: "IDEMPOTENCY_CHECK", label: "Idempotency Lock", latency: "8ms" },
    { code: "GATEWAY_DISPATCH", label: "Gateway Handshake", latency: "110ms" },
    { code: "LEDGER_DOUBLE_ENTRY", label: "ACID Ledger Journal", latency: "24ms" },
    { code: "SETTLED", label: "Audit & Finalized", latency: "14ms" },
  ];

  const runScenario = (type: ScenarioType) => {
    setActiveScenario(type);
    setIsProcessing(true);
    setCurrentStepIndex(0);

    if (type === "duplicate_protection") {
      setDuplicateAttempts((prev) => prev + 1);
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= STATES.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return STATES.length - 1;
        }
        return prev + 1;
      });
    }, 450);
  };

  const getLedgerEntries = (): LedgerEntry[] => {
    if (activeScenario === "rollback") {
      return [
        { account: "Customer Balance (Acc #4401)", type: "DEBIT", amount: "NPR 3,200.00", currency: "NPR", status: "ROLLED_BACK" },
        { account: "Merchant Escrow (Acc #9912)", type: "CREDIT", amount: "NPR 3,200.00", currency: "NPR", status: "ROLLED_BACK" },
        { account: "Compensation Ledger", type: "CREDIT", amount: "NPR 3,200.00", currency: "NPR", status: "COMMITTED" },
      ];
    }
    return [
      { account: "Customer Wallet (Acc #4401)", type: "DEBIT", amount: "NPR 3,200.00", currency: "NPR", status: "COMMITTED" },
      { account: "Merchant Escrow (Acc #9912)", type: "CREDIT", amount: "NPR 3,200.00", currency: "NPR", status: "COMMITTED" },
    ];
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#DAD4C9] rounded shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Top HUD Protocol Header */}
      <div className="p-3 sm:p-4 border-b border-[#DAD4C9] bg-[#F5F1E8]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E65336] animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[#20201D] font-semibold uppercase tracking-wider">
              EXP-03 // FINTECH IDEMPOTENCY & TRANSACTION FSM
            </span>
            <span className="hidden sm:inline text-[#77746C]">|</span>
            <span className="text-[#77746C] text-[11px]">
              ARCHITECTURE: Double-Entry Ledger • ACID • Distributed Locks
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8A9367] bg-[#8A9367]/15 border border-[#8A9367]/30 px-2 py-0.5 rounded font-mono">
            {isProcessing ? "PROCESSING ATOMIC TXN..." : "LEDGER BALANCED // ACID SAFE"}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FAFAF7] to-[#F5F1E8]/50 space-y-6">
        {/* Scenario Selectors */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block">
            Trigger Distributed Transaction Scenario:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { id: "happy_path", title: "Clean Payment (Happy Path)", desc: "Standard 200 OK with instant ledger debit & credit" },
              { id: "duplicate_protection", title: "Double-Click Protection", desc: "Duplicate idempotency key detected; zero double-debit" },
              { id: "network_retry", title: "Webhook Retry Backoff", desc: "Simulates network timeout followed by exponential retry" },
              { id: "rollback", title: "Atomic Reversal Rollback", desc: "Gateway error triggers compensating ledger reversal" },
            ].map((scen) => (
              <button
                key={scen.id}
                type="button"
                onClick={() => runScenario(scen.id as ScenarioType)}
                disabled={isProcessing}
                className={`p-3 text-left rounded border transition-all flex flex-col justify-between ${
                  activeScenario === scen.id
                    ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-xs"
                    : "bg-[#FFFFFF] text-[#20201D] border-[#DAD4C9] hover:border-[#20201D]"
                }`}
              >
                <div className="font-mono text-[11px] font-semibold mb-1">
                  {scen.title}
                </div>
                <div className="text-[10px] text-[#77746C] line-clamp-2 font-sans">
                  {scen.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* State Machine Transition Progress Bar */}
        <div className="bg-[#FFFFFF] border border-[#DAD4C9] rounded p-4 space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#77746C] border-b border-[#DAD4C9] pb-2">
            <span className="text-[#20201D] font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#E65336]" />
              FSM STATE PIPELINE
            </span>
            <span>
              Idempotency-Key: <strong className="text-[#20201D]">idem_ktm_8829_094a</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STATES.map((state, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;

              return (
                <div
                  key={state.code}
                  className={`p-2.5 rounded border text-left transition-all ${
                    isCurrent
                      ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-xs"
                      : isPassed
                      ? "bg-[#8A9367]/10 text-[#20201D] border-[#8A9367]/40"
                      : "bg-[#FAFAF7] text-[#77746C] border-[#DAD4C9]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[9px] font-mono">
                    <span className="opacity-80">STEP 0{idx + 1}</span>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-[#8A9367]" />}
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#E65336] animate-pulse" />}
                  </div>
                  <div className="font-mono text-[10px] font-semibold truncate">{state.label}</div>
                  <div className="font-mono text-[9px] text-[#77746C] mt-0.5">{state.latency}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Double-Entry Ledger Journal Table */}
        <div className="bg-[#FFFFFF] border border-[#DAD4C9] rounded p-4 space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#77746C] border-b border-[#DAD4C9] pb-2">
            <span className="text-[#20201D] font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#8A9367]" />
              DOUBLE-ENTRY AUDIT LEDGER JOURNAL
            </span>
            <span className="text-[10px]">
              Txn Hash: <strong className="text-[#20201D]">0x8c7e...31ba (SHA-256)</strong>
            </span>
          </div>

          {activeScenario === "duplicate_protection" && duplicateAttempts > 0 && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 font-mono text-[10px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>IDEMPOTENCY LOCK ACTIVE:</strong> Duplicate request attempt #{duplicateAttempts} intercepted.
                Cached response returned directly from Redis lock with zero additional ledger debit.
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="text-[#77746C] border-b border-[#DAD4C9]/60 text-[10px]">
                  <th className="py-1 pr-3">LEDGER ACCOUNT</th>
                  <th className="py-1 pr-3">TYPE</th>
                  <th className="py-1 pr-3">AMOUNT</th>
                  <th className="py-1 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DAD4C9]/40 text-[#20201D]">
                {getLedgerEntries().map((entry, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-1.5 pr-3 text-[#20201D] font-medium">{entry.account}</td>
                    <td className="py-1.5 pr-3">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                        entry.type === "DEBIT" ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {entry.type}
                      </span>
                    </td>
                    <td className="py-1.5 pr-3 font-semibold text-[#20201D]">{entry.amount}</td>
                    <td className="py-1.5 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                        entry.status === "COMMITTED"
                          ? "bg-[#8A9367]/15 text-[#8A9367]"
                          : entry.status === "ROLLED_BACK"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FintechPipelineExperiment;
