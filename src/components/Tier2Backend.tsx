import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Terminal, 
  Cpu, 
  Activity, 
  Trash2, 
  FileJson,
  ShieldCheck,
  CheckCircle,
  Database
} from 'lucide-react';
import { TerminalLog, StepNumber, Language, Product } from '../types';
import { TRANSLATIONS } from '../translations';

interface Tier2BackendProps {
  language: Language;
  currentStep: StepNumber;
  logs: TerminalLog[];
  onClearLogs: () => void;
  searchQuery: string;
  matchedProducts: Product[];
}

export const Tier2Backend: React.FC<Tier2BackendProps> = ({
  language,
  currentStep,
  logs,
  onClearLogs,
  searchQuery,
  matchedProducts,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'terminal' | 'payload'>('terminal');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal on new logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Determine if Tier 2 is actively executing
  const isActiveTier = currentStep === 2 || currentStep === 3 || currentStep === 5;

  // Pipeline stage active states
  const isRouterActive = currentStep === 2;
  const isControllerActive = currentStep === 2 || currentStep === 3;
  const isDbPoolActive = currentStep === 3 || currentStep === 4 || currentStep === 5;
  const isSerializerActive = currentStep === 5;

  return (
    <div
      className={`flex flex-col h-full rounded-xl border transition-all duration-300 bg-slate-950 text-slate-100 overflow-hidden shadow-xs ${
        isActiveTier
          ? 'ring-2 ring-emerald-500/70 border-emerald-500 shadow-md'
          : 'border-slate-800'
      }`}
    >
      {/* Server Rack Header */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Server className={`w-4 h-4 ${isActiveTier ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="font-mono text-xs font-bold text-slate-200">
            Node.js / Express Server
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            :3000
          </span>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isActiveTier ? 'bg-emerald-400 animate-ping' : 'bg-emerald-600'
            }`}
          />
          <span className="text-[11px] font-mono text-slate-300">
            {isActiveTier ? 'PROCESSING' : 'LISTENING'}
          </span>
        </div>
      </div>

      {/* Tier Identification Banner */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-emerald-400">
              {t.tier2Title}
            </span>
            {isActiveTier && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-emerald-600 text-white rounded">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {t.tier2Subtitle}
          </p>
        </div>

        {/* Switch tab */}
        <div className="flex items-center p-0.5 bg-slate-800 rounded-md text-[11px]">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
              activeTab === 'terminal'
                ? 'bg-slate-700 text-emerald-300 shadow-2xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
              activeTab === 'payload'
                ? 'bg-slate-700 text-emerald-300 shadow-2xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-3 h-3" />
            <span>JSON DTO</span>
          </button>
        </div>
      </div>

      {/* Internal Architecture Pipeline Stages */}
      <div className="px-3 py-2 bg-slate-900/50 border-b border-slate-800/80">
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
          <div
            className={`p-1 rounded border transition-all ${
              isRouterActive
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-2xs'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Router</span>
            </div>
            <div className="text-[9px] text-slate-400">CORS & Auth</div>
          </div>

          <div
            className={`p-1 rounded border transition-all ${
              isControllerActive
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-2xs'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Cpu className="w-3 h-3" />
              <span>Controller</span>
            </div>
            <div className="text-[9px] text-slate-400">Validation</div>
          </div>

          <div
            className={`p-1 rounded border transition-all ${
              isDbPoolActive
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-2xs'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Database className="w-3 h-3" />
              <span>Pool</span>
            </div>
            <div className="text-[9px] text-slate-400">pg_pool (TCP)</div>
          </div>

          <div
            className={`p-1 rounded border transition-all ${
              isSerializerActive
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-2xs'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <FileJson className="w-3 h-3" />
              <span>Serializer</span>
            </div>
            <div className="text-[9px] text-slate-400">JSON DTO</div>
          </div>
        </div>
      </div>

      {/* Main Terminal View */}
      {activeTab === 'terminal' ? (
        <div className="flex-1 p-3 flex flex-col min-h-[220px] font-mono text-[11px] overflow-hidden">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800/80 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>{t.serverTerminal}</span>
            </div>
            <button
              onClick={onClearLogs}
              className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 hover:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer"
              title={t.terminalClear}
            >
              <Trash2 className="w-2.5 h-2.5" />
              <span>{t.terminalClear}</span>
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 select-text">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic py-6 text-center text-xs">
                {t.serverIdle}
              </div>
            ) : (
              logs.map((log) => {
                let badgeColor = 'text-blue-400';
                if (log.level === 'success') badgeColor = 'text-emerald-400';
                if (log.level === 'query') badgeColor = 'text-amber-400';
                if (log.level === 'warn') badgeColor = 'text-rose-400';

                return (
                  <div key={log.id} className="leading-relaxed hover:bg-slate-900/60 p-1 rounded transition-colors">
                    <div className="flex items-start gap-1.5">
                      <span className="text-slate-500 text-[10px] shrink-0 tabular-nums">
                        {log.timestamp}
                      </span>
                      <span className={`font-bold shrink-0 text-[10px] ${badgeColor}`}>
                        [{log.level.toUpperCase()}]
                      </span>
                      <span className="text-slate-200 flex-1 break-words">
                        {language === 'ar' ? log.messageAr : log.messageEn}
                      </span>
                    </div>
                    {log.detail && (
                      <div className="mt-0.5 ml-14 text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 overflow-x-auto">
                        {log.detail}
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar / Prompt */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-[11px] text-slate-400 truncate">
              {isActiveTier
                ? `executing handler for GET /api/products?search=${encodeURIComponent(searchQuery || 'all')}...`
                : 'node server.js --listening on :3000'}
            </span>
          </div>
        </div>
      ) : (
        /* JSON Payload Output Tab */
        <div className="flex-1 p-3 bg-slate-950 overflow-y-auto font-mono text-[11px]">
          <div className="text-slate-400 pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
            <span>HTTP Response Payload (application/json)</span>
            <span className="text-emerald-400 text-[10px] font-bold">200 OK</span>
          </div>
          <pre className="text-emerald-300/90 text-[10px] leading-tight overflow-x-auto bg-slate-900/80 p-2.5 rounded border border-slate-800">
{JSON.stringify(
  {
    status: 'success',
    code: 200,
    timestamp: new Date().toISOString(),
    query: searchQuery || 'all',
    count: matchedProducts.length,
    data: matchedProducts.map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name[language],
      category: p.category[language],
      price: p.price,
      stock: p.stock,
      rating: p.rating,
      inStock: p.stock > 0,
    })),
  },
  null,
  2
)}
          </pre>
        </div>
      )}
    </div>
  );
};
