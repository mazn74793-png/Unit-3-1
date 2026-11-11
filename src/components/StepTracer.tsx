import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { StepNumber, Language, StepInfo } from '../types';
import { SIMULATION_STEPS } from '../data/mockData';
import { TRANSLATIONS } from '../translations';

interface StepTracerProps {
  currentStep: StepNumber;
  language: Language;
  onSelectStep: (step: StepNumber) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  canNext: boolean;
  canPrev: boolean;
  isAutoPlaying: boolean;
}

export const StepTracer: React.FC<StepTracerProps> = ({
  currentStep,
  language,
  onSelectStep,
  onNextStep,
  onPrevStep,
  canNext,
  canPrev,
  isAutoPlaying,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const activeStepData: StepInfo | undefined = SIMULATION_STEPS.find(
    (s) => s.step === currentStep
  );

  return (
    <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Step Tracker Header & Nav */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600/10 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              6S
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {language === 'ar' ? 'متتبع خطوات التعاون بين الطبقات الست' : '6-Step Architecture Cooperation Tracer'}
            </h3>
            {isAutoPlaying && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 animate-spin" />
                {language === 'ar' ? 'تشغيل آلي نشط' : 'Auto Flow Active'}
              </span>
            )}
          </div>

          {/* Quick step buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-mono">
              {t.stepIndicator} {currentStep} {t.of} 6
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={onPrevStep}
                disabled={!canPrev}
                className={`p-1.5 rounded-md border border-slate-200 dark:border-slate-700 transition-colors ${
                  canPrev
                    ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed text-slate-400'
                }`}
                title={t.prevStep}
              >
                {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onNextStep}
                disabled={!canNext}
                className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center gap-1 ${
                  canNext
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>{t.nextStep}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 6 Step Interactive Nodes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {SIMULATION_STEPS.map((step) => {
            const isCurrent = step.step === currentStep;
            const isCompleted = currentStep > step.step;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => onSelectStep(step.step)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all relative overflow-hidden cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-500/50'
                    : isCompleted
                    ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Step indicator top row */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    0{step.step}
                  </span>
                  {isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                  ) : null}
                </div>

                {/* Step Short Title */}
                <div
                  className={`font-semibold text-[11px] leading-tight truncate ${
                    isCurrent
                      ? 'text-indigo-950 dark:text-indigo-200'
                      : isCompleted
                      ? 'text-slate-900 dark:text-slate-200'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {step.shortTitle[language]}
                </div>

                {/* Protocol badge */}
                <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                  {step.protocol}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Explanation Callout */}
        {activeStepData ? (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {activeStepData.title[language]}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {activeStepData.sourceTier.toUpperCase()} ➔ {activeStepData.targetTier.toUpperCase()}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed max-w-4xl">
                {activeStepData.description[language]}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Protocol:</span>
              <span className="text-indigo-600 dark:text-indigo-400">{activeStepData.protocol}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-center text-xs text-slate-500">
            {language === 'ar'
              ? 'المحاكي في وضع البداية (الخطوة 0). اضغط "بدء المحاكاة" أو اختر خطوة للبدء.'
              : 'Simulator is in initial state (Step 0). Click "Simulate Search" or select a step to begin.'}
          </div>
        )}
      </div>
    </div>
  );
};
