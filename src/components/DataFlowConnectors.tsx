import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { StepNumber, Language } from '../types';

interface ConnectorProps {
  segment: 'frontend-backend' | 'backend-database';
  currentStep: StepNumber;
  language: Language;
  searchQuery: string;
  matchedCount: number;
}

export const DataFlowConnector: React.FC<ConnectorProps> = ({
  segment,
  currentStep,
  language,
  searchQuery,
  matchedCount,
}) => {
  const isRtl = language === 'ar';

  // Determine active traffic on this segment
  // Segment 1: Frontend <-> Backend
  // Step 1: Frontend -> Backend (Request)
  // Step 2: Backend processing request
  // Step 5: Backend processing response
  // Step 6: Backend -> Frontend (Response)
  const isFwd1Active = currentStep === 1;
  const isBack1Active = currentStep === 6;

  // Segment 2: Backend <-> Database
  // Step 3: Backend -> Database (SQL Query)
  // Step 4: Database processing query
  // Step 5: Database -> Backend (Result rows)
  const isFwd2Active = currentStep === 3;
  const isBack2Active = currentStep === 5;

  if (segment === 'frontend-backend') {
    return (
      <>
        {/* Desktop Layout: Slim Elegant Connector */}
        <div className="hidden lg:flex flex-col items-center justify-center w-8 shrink-0 relative py-4 select-none">
          {/* Top Pipe: Request (Tier 1 -> Tier 2) */}
          <div className="w-full flex flex-col items-center mb-4">
            <div className="text-[9px] font-mono tracking-tighter text-slate-400 dark:text-slate-500 mb-0.5 whitespace-nowrap">
              REQ
            </div>
            <div
              className={`w-full h-1.5 rounded-full relative overflow-hidden transition-all duration-300 ${
                isFwd1Active
                  ? 'bg-indigo-500/30 ring-1 ring-indigo-500'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            >
              {isFwd1Active && (
                <div 
                  className={`absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse ${
                    isRtl ? 'right-0' : 'left-0'
                  }`}
                />
              )}
            </div>
            <div className="flex items-center text-xs mt-0.5 text-slate-500">
              {isRtl ? (
                <ArrowLeft className={`w-3 h-3 transition-colors ${isFwd1Active ? 'text-indigo-600 dark:text-indigo-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
              ) : (
                <ArrowRight className={`w-3 h-3 transition-colors ${isFwd1Active ? 'text-indigo-600 dark:text-indigo-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
              )}
            </div>
            {isFwd1Active && (
              <div className="mt-0.5 px-1 py-0.2 bg-indigo-600 text-white text-[8px] font-mono rounded shadow-xs text-center max-w-[65px] truncate animate-bounce">
                GET
              </div>
            )}
          </div>

          {/* Bottom Pipe: Response (Tier 2 -> Tier 1) */}
          <div className="w-full flex flex-col items-center mt-4">
            <div className="flex items-center text-xs mb-0.5 text-slate-500">
              {isRtl ? (
                <ArrowRight className={`w-3 h-3 transition-colors ${isBack1Active ? 'text-emerald-600 dark:text-emerald-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
              ) : (
                <ArrowLeft className={`w-3 h-3 transition-colors ${isBack1Active ? 'text-emerald-600 dark:text-emerald-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
              )}
            </div>
            <div
              className={`w-full h-1.5 rounded-full relative overflow-hidden transition-all duration-300 ${
                isBack1Active
                  ? 'bg-emerald-500/30 ring-1 ring-emerald-500'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            >
              {isBack1Active && (
                <div 
                  className={`absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse ${
                    isRtl ? 'left-0' : 'right-0'
                  }`}
                />
              )}
            </div>
            <div className="text-[9px] font-mono tracking-tighter text-slate-400 dark:text-slate-500 mt-0.5 whitespace-nowrap">
              RES
            </div>
            {isBack1Active && (
              <div className="mt-0.5 px-1 py-0.2 bg-emerald-600 text-white text-[8px] font-mono rounded shadow-xs text-center whitespace-nowrap animate-bounce">
                200
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Layout: Horizontal Row Connector between stacked cards */}
        <div className="flex lg:hidden items-center justify-center gap-2 py-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">
          <span className={`px-2 py-0.5 rounded text-[10px] ${isFwd1Active ? 'bg-indigo-600 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-800'}`}>
            HTTP GET ➔
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] ${isBack1Active ? 'bg-emerald-600 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-800'}`}>
            ⬅ 200 OK JSON [{matchedCount}]
          </span>
        </div>
      </>
    );
  }

  // Segment 2: Backend <-> Database
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col items-center justify-center w-8 shrink-0 relative py-4 select-none">
        {/* Top Pipe: SQL Query (Tier 2 -> Tier 3) */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="text-[9px] font-mono tracking-tighter text-slate-400 dark:text-slate-500 mb-0.5 whitespace-nowrap">
            SQL
          </div>
          <div
            className={`w-full h-1.5 rounded-full relative overflow-hidden transition-all duration-300 ${
              isFwd2Active
                ? 'bg-amber-500/30 ring-1 ring-amber-500'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {isFwd2Active && (
              <div 
                className={`absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse ${
                  isRtl ? 'right-0' : 'left-0'
                }`}
              />
            )}
          </div>
          <div className="flex items-center text-xs mt-0.5 text-slate-500">
            {isRtl ? (
              <ArrowLeft className={`w-3 h-3 transition-colors ${isFwd2Active ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
            ) : (
              <ArrowRight className={`w-3 h-3 transition-colors ${isFwd2Active ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
            )}
          </div>
          {isFwd2Active && (
            <div className="mt-0.5 px-1 py-0.2 bg-amber-600 text-white text-[8px] font-mono rounded shadow-xs text-center whitespace-nowrap animate-bounce">
              QUERY
            </div>
          )}
        </div>

        {/* Bottom Pipe: Result Tuples (Tier 3 -> Tier 2) */}
        <div className="w-full flex flex-col items-center mt-4">
          <div className="flex items-center text-xs mb-0.5 text-slate-500">
            {isRtl ? (
              <ArrowRight className={`w-3 h-3 transition-colors ${isBack2Active ? 'text-cyan-600 dark:text-cyan-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
            ) : (
              <ArrowLeft className={`w-3 h-3 transition-colors ${isBack2Active ? 'text-cyan-600 dark:text-cyan-400 animate-pulse' : 'text-slate-300 dark:text-slate-700'}`} />
            )}
          </div>
          <div
            className={`w-full h-1.5 rounded-full relative overflow-hidden transition-all duration-300 ${
              isBack2Active
                ? 'bg-cyan-500/30 ring-1 ring-cyan-500'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {isBack2Active && (
              <div 
                className={`absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse ${
                  isRtl ? 'left-0' : 'right-0'
                }`}
              />
            )}
          </div>
          <div className="text-[9px] font-mono tracking-tighter text-slate-400 dark:text-slate-500 mt-0.5 whitespace-nowrap">
            ROWS
          </div>
          {isBack2Active && (
            <div className="mt-0.5 px-1 py-0.2 bg-cyan-600 text-white text-[8px] font-mono rounded shadow-xs text-center whitespace-nowrap animate-bounce">
              DATA
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="flex lg:hidden items-center justify-center gap-2 py-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">
        <span className={`px-2 py-0.5 rounded text-[10px] ${isFwd2Active ? 'bg-amber-600 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-800'}`}>
          SQL QUERY ➔
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] ${isBack2Active ? 'bg-cyan-600 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-800'}`}>
          ⬅ DB TUPLES [{matchedCount}]
        </span>
      </div>
    </>
  );
};
