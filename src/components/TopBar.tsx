import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Gauge,
  SlidersHorizontal,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Language, SimulationMode, StepNumber, LayoutWidth } from '../types';
import { TRANSLATIONS } from '../translations';

interface TopBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: SimulationMode;
  onModeChange: (mode: SimulationMode) => void;
  currentStep: StepNumber;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onOpenGuide: () => void;
  canNext: boolean;
  canPrev: boolean;
  layoutWidth: LayoutWidth;
  onLayoutWidthChange: (w: LayoutWidth) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  language,
  onLanguageChange,
  mode,
  onModeChange,
  currentStep,
  isAutoPlaying,
  onToggleAutoPlay,
  onNextStep,
  onPrevStep,
  onReset,
  speed,
  onSpeedChange,
  onOpenGuide,
  canNext,
  canPrev,
  layoutWidth,
  onLayoutWidthChange,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs sticky top-0 z-40 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            3T
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none hidden sm:block">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Simulation Mode & Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs">
            <button
              onClick={() => onModeChange('auto')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                mode === 'auto'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.modeAuto}
            </button>
            <button
              onClick={() => onModeChange('step')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                mode === 'step'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.modeStep}
            </button>
          </div>

          {/* Mode Specific Controls */}
          {mode === 'auto' ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onToggleAutoPlay}
                disabled={currentStep === 0}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  currentStep === 0
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : isAutoPlaying
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                title={isAutoPlaying ? 'Pause' : 'Play'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoPlaying ? (language === 'ar' ? 'إيقاف' : 'Pause') : (language === 'ar' ? 'تشغيل' : 'Play')}</span>
              </button>

              {/* Speed dropdown */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={speed}
                  onChange={(e) => onSpeedChange(Number(e.target.value))}
                  aria-label={t.speed}
                  className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value={0.5} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">0.5x</option>
                  <option value={1} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">1x</option>
                  <option value={1.5} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">1.5x</option>
                  <option value={2} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">2x</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onPrevStep}
                disabled={!canPrev}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap ${
                  canPrev
                    ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{t.prevStep}</span>
              </button>

              <button
                onClick={onNextStep}
                disabled={!canNext}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  canNext
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>{t.nextStep}</span>
                {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Reset button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Zone: Width selector, Educational Guide & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Width Selector */}
          <div className="hidden md:flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60 text-[11px]" title={t.layoutSize}>
            <button
              onClick={() => onLayoutWidthChange('compact')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                layoutWidth === 'compact'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.layoutCompact}
            </button>
            <button
              onClick={() => onLayoutWidthChange('balanced')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                layoutWidth === 'balanced'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.layoutBalanced}
            </button>
            <button
              onClick={() => onLayoutWidthChange('expanded')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                layoutWidth === 'expanded'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.layoutExpanded}
            </button>
          </div>

          {/* Guide button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">{t.learnMore}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                language === 'ar'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
