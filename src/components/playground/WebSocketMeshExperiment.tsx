import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Send,
  RefreshCw,
  Wifi,
  WifiOff,
  Radio,
  CheckCircle2,
  Clock,
  ArrowRight,
  Terminal,
  ShieldAlert,
} from "lucide-react";

interface SocketPacket {
  id: string;
  timestamp: string;
  event: string;
  sender: "Client A" | "Client B" | "Broker";
  payload: Record<string, unknown>;
  latencyMs: number;
  status: "delivered" | "retransmitted" | "dropped";
}

interface QuickAction {
  label: string;
  event: string;
  payload: Record<string, unknown>;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Tutor Whiteboard Coordinate",
    event: "whiteboard:stroke:batch",
    payload: { points: 14, color: "#E65336", strokeId: "strk_9921", tool: "pen" },
  },
  {
    label: "Broadcast State Mutation",
    event: "session:state:update",
    payload: { activeLessonId: "lesson_calculus_4", timerRemaining: 2400, mode: "quiz" },
  },
  {
    label: "Ephemeral Presence Ping",
    event: "presence:heartbeat",
    payload: { userId: "user_aayush_88", clientVersion: "2.4.0", ping: 18 },
  },
];

export const WebSocketMeshExperiment: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "reconnecting" | "offline">("connected");
  const [simulateJitter, setSimulateJitter] = useState<boolean>(false);
  const [packets, setPackets] = useState<SocketPacket[]>([
    {
      id: "pkt_001",
      timestamp: "20:30:12.104",
      event: "channel:handshake:ack",
      sender: "Broker",
      payload: { sessionId: "sess_ktm_4921", brokerNode: "node_ktm_primary", protocol: "WSS/2.0" },
      latencyMs: 14,
      status: "delivered",
    },
    {
      id: "pkt_002",
      timestamp: "20:30:12.118",
      event: "presence:subscribe",
      sender: "Client A",
      payload: { channel: "rooms:tuition:42", role: "host" },
      latencyMs: 16,
      status: "delivered",
    },
  ]);

  const [activeFlyingPacket, setActiveFlyingPacket] = useState<string | null>(null);
  const [clientBState, setClientBState] = useState<{
    lastReceivedEvent: string;
    lastReceivedPayload: string;
    totalPackets: number;
    lastSyncTimestamp: string;
  }>({
    lastReceivedEvent: "channel:handshake:ack",
    lastReceivedPayload: '{"sessionId":"sess_ktm_4921","protocol":"WSS/2.0"}',
    totalPackets: 2,
    lastSyncTimestamp: "Just now",
  });

  const packetIdCounter = useRef(3);

  // Dispatch packet from Client A through Broker to Client B
  const dispatchPacket = (event: string, payload: Record<string, unknown>) => {
    if (connectionStatus !== "connected") return;

    const currentId = `pkt_00${packetIdCounter.current++}`;
    const baseLatency = simulateJitter ? Math.floor(Math.random() * 220) + 180 : Math.floor(Math.random() * 16) + 12;

    setActiveFlyingPacket(currentId);

    const timeStr = new Date().toTimeString().split(" ")[0] + "." + String(Date.now() % 1000).padStart(3, "0");

    const newPacket: SocketPacket = {
      id: currentId,
      timestamp: timeStr,
      event,
      sender: "Client A",
      payload,
      latencyMs: baseLatency,
      status: "delivered",
    };

    setPackets((prev) => [newPacket, ...prev.slice(0, 9)]);

    setTimeout(() => {
      setActiveFlyingPacket(null);
      setClientBState((prev) => ({
        lastReceivedEvent: event,
        lastReceivedPayload: JSON.stringify(payload),
        totalPackets: prev.totalPackets + 1,
        lastSyncTimestamp: timeStr,
      }));
    }, baseLatency * 3.5);
  };

  const simulateReconnect = () => {
    setConnectionStatus("offline");
    setTimeout(() => {
      setConnectionStatus("reconnecting");
      setTimeout(() => {
        setConnectionStatus("connected");
        const timeStr = new Date().toTimeString().split(" ")[0] + "." + String(Date.now() % 1000).padStart(3, "0");
        const reconnectPkt: SocketPacket = {
          id: `pkt_00${packetIdCounter.current++}`,
          timestamp: timeStr,
          event: "reconnect:resubscribe:success",
          sender: "Broker",
          payload: { resyncedEvents: 2, sessionToken: "reauth_valid" },
          latencyMs: 24,
          status: "delivered",
        };
        setPackets((prev) => [reconnectPkt, ...prev.slice(0, 9)]);
      }, 1200);
    }, 800);
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#DAD4C9] rounded shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Top Protocol Telemetry Bar */}
      <div className="p-3 sm:p-4 border-b border-[#DAD4C9] bg-[#F5F1E8]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-[#8A9367] animate-pulse"
                : connectionStatus === "reconnecting"
                ? "bg-[#E65336] animate-spin"
                : "bg-red-500"
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[#20201D] font-semibold uppercase tracking-wider">
              EXP-01 // EVENT-DRIVEN WEBSOCKET MESH
            </span>
            <span className="hidden sm:inline text-[#77746C]">|</span>
            <span className="text-[#77746C] text-[11px]">
              PROTOCOL: WSS 2.0 • PUB/SUB TOPIC: <span className="text-[#E65336]">rooms:tuition:42</span>
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Simulated Jitter Toggle */}
          <button
            type="button"
            onClick={() => setSimulateJitter((prev) => !prev)}
            className={`px-2 py-1 text-[10px] uppercase rounded border transition-colors flex items-center gap-1 ${
              simulateJitter
                ? "bg-[#E65336] text-white border-[#E65336]"
                : "bg-[#FFFFFF] text-[#5E5B54] border-[#DAD4C9] hover:border-[#20201D]"
            }`}
            title="Inject 200ms+ network jitter"
          >
            <Clock className="w-3 h-3" />
            <span>{simulateJitter ? "Jitter Active (~240ms)" : "Normal Latency (~15ms)"}</span>
          </button>

          {/* Reconnect Simulation */}
          <button
            type="button"
            onClick={simulateReconnect}
            disabled={connectionStatus !== "connected"}
            className="p-1.5 text-[10px] uppercase rounded border border-[#DAD4C9] bg-[#FFFFFF] text-[#5E5B54] hover:border-[#20201D] hover:text-[#20201D] transition-colors disabled:opacity-50"
            title="Simulate network disconnection & auto-reconnect backoff"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus === "reconnecting" ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: Client A -> Broker -> Client B */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FAFAF7] to-[#F5F1E8]/50 space-y-6">
        <div className="grid lg:grid-cols-12 gap-4 items-center">
          {/* Client A (Sender Node) */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#DAD4C9] p-4 rounded space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DAD4C9] pb-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#E65336]" />
                <span className="font-semibold text-[#20201D]">Client A (Tutor Session)</span>
              </div>
              <span className="text-[10px] text-[#8A9367] bg-[#8A9367]/10 px-1.5 py-0.5 rounded">
                PUBLISHER
              </span>
            </div>

            <p className="text-xs text-[#5E5B54] font-sans">
              Emits real-time state mutations, drawing coordinates, and presence packets.
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[10px] text-[#77746C] uppercase block">
                Dispatch Packet Event:
              </span>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => dispatchPacket(action.event, action.payload)}
                  disabled={connectionStatus !== "connected"}
                  className="w-full text-left p-2 rounded border border-[#DAD4C9] bg-[#FAFAF7] hover:border-[#20201D] hover:bg-[#FFFFFF] transition-all font-mono text-[11px] text-[#20201D] flex items-center justify-between group disabled:opacity-50"
                >
                  <span className="truncate">{action.label}</span>
                  <Send className="w-3 h-3 text-[#77746C] group-hover:text-[#E65336] transition-colors shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Central Broker & Network Transit Channel */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-3 sm:p-4 text-center space-y-2">
            <span className="font-mono text-[10px] text-[#77746C] tracking-widest uppercase">
              DISTRIBUTED EVENT BROKER
            </span>

            {/* Visual Stream Cable */}
            <div className="w-full h-8 relative flex items-center justify-center bg-[#F5F1E8] border border-[#DAD4C9] rounded px-3">
              <div className="absolute inset-0 border-t border-dashed border-[#DAD4C9] top-1/2 -translate-y-1/2" />
              
              <AnimatePresence>
                {activeFlyingPacket && (
                  <motion.div
                    key={activeFlyingPacket}
                    initial={{ x: -120, opacity: 0 }}
                    animate={{ x: 120, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: simulateJitter ? 0.7 : 0.35, ease: "easeInOut" }}
                    className="z-10 bg-[#E65336] text-white font-mono text-[9px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1"
                  >
                    <span>FRAME</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!activeFlyingPacket && (
                <span className="font-mono text-[10px] text-[#77746C] z-10 bg-[#F5F1E8] px-2">
                  TOPIC: rooms:tuition:42 // IDLE
                </span>
              )}
            </div>

            <div className="font-mono text-[10px] text-[#77746C] flex items-center gap-3">
              <span>Fanout: 2 Subs</span>
              <span>•</span>
              <span>Framing: Binary</span>
              <span>•</span>
              <span className={simulateJitter ? "text-[#E65336] font-semibold" : "text-[#8A9367]"}>
                RTT: {simulateJitter ? "~240ms (Jitter)" : "~15ms"}
              </span>
            </div>
          </div>

          {/* Client B (Receiver Node) */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#DAD4C9] p-4 rounded space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DAD4C9] pb-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-[#8A9367]" />
                <span className="font-semibold text-[#20201D]">Client B (Student Terminal)</span>
              </div>
              <span className="text-[10px] text-[#8A9367] bg-[#8A9367]/10 px-1.5 py-0.5 rounded">
                SUBSCRIBER
              </span>
            </div>

            <p className="text-xs text-[#5E5B54] font-sans">
              Reconciles remote state mutations with sub-20ms latency and zero reload.
            </p>

            <div className="p-2.5 bg-[#FAFAF7] border border-[#DAD4C9] rounded space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-[#77746C]">
                <span>LAST RECEIVED EVENT:</span>
                <span className="text-[#8A9367] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Synced
                </span>
              </div>
              <div className="text-[#20201D] font-semibold text-[11px] truncate">
                {clientBState.lastReceivedEvent}
              </div>
              <div className="text-[#5E5B54] truncate bg-white p-1 rounded border border-[#DAD4C9]/60 text-[9px]">
                {clientBState.lastReceivedPayload}
              </div>
              <div className="flex items-center justify-between text-[#77746C] text-[9px] pt-1 border-t border-[#DAD4C9]/50">
                <span>Total Received: {clientBState.totalPackets}</span>
                <span>Updated: {clientBState.lastSyncTimestamp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Packet Frame Inspector Table */}
        <div className="bg-[#FFFFFF] border border-[#DAD4C9] rounded p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#77746C] border-b border-[#DAD4C9] pb-2">
            <div className="flex items-center gap-2 text-[#20201D] font-medium">
              <Terminal className="w-3.5 h-3.5 text-[#E65336]" />
              <span>LIVE FRAME TELEMETRY STREAM</span>
            </div>
            <span className="text-[10px]">Buffered Frames: {packets.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="text-[#77746C] border-b border-[#DAD4C9]/60 text-[10px]">
                  <th className="py-1 pr-3">TIME</th>
                  <th className="py-1 pr-3">FRAME ID</th>
                  <th className="py-1 pr-3">EVENT TOPIC</th>
                  <th className="py-1 pr-3">SENDER</th>
                  <th className="py-1 pr-3">LATENCY</th>
                  <th className="py-1 text-right">PAYLOAD PREVIEW</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DAD4C9]/40 text-[#20201D]">
                {packets.slice(0, 5).map((pkt) => (
                  <tr key={pkt.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-1.5 pr-3 text-[#77746C] text-[10px]">{pkt.timestamp}</td>
                    <td className="py-1.5 pr-3 font-semibold text-[#20201D]">{pkt.id}</td>
                    <td className="py-1.5 pr-3 text-[#E65336]">{pkt.event}</td>
                    <td className="py-1.5 pr-3 text-[#5E5B54]">{pkt.sender}</td>
                    <td className="py-1.5 pr-3">
                      <span className={`px-1 py-0.5 rounded text-[9px] ${
                        pkt.latencyMs > 100 ? "bg-amber-100 text-amber-800" : "bg-[#8A9367]/15 text-[#8A9367]"
                      }`}>
                        {pkt.latencyMs}ms
                      </span>
                    </td>
                    <td className="py-1.5 text-right text-[10px] text-[#77746C] max-w-[180px] truncate">
                      {JSON.stringify(pkt.payload)}
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

export default WebSocketMeshExperiment;
