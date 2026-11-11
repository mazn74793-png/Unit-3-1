import { useState, useEffect, useRef, useTransition, useMemo } from 'react';
import { 
  Language, 
  SimulationMode, 
  StepNumber, 
  Product, 
  TerminalLog,
  LayoutWidth,
  ActiveView
} from './types';
import { SAMPLE_PRODUCTS } from './data/mockData';
import { TopBar } from './components/TopBar';
import { Tier1Frontend } from './components/Tier1Frontend';
import { Tier2Backend } from './components/Tier2Backend';
import { Tier3Database } from './components/Tier3Database';
import { DataFlowConnector } from './components/DataFlowConnectors';
import { StepTracer } from './components/StepTracer';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Monitor, Server, Database, Layers } from 'lucide-react';
import { TRANSLATIONS } from './translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<SimulationMode>('step');
  const [layoutWidth, setLayoutWidth] = useState<LayoutWidth>('compact');
  const [activeView, setActiveView] = useState<ActiveView>('all');
  const [currentStep, setCurrentStep] = useState<StepNumber>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('Laptop');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [, startTransition] = useTransition();

  const autoPlayTimerRef = useRef<number | null>(null);

  // Sync HTML attributes for language and text direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Determine matched products based on searchQuery
  const matchedProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q === 'all') {
      return SAMPLE_PRODUCTS;
    }
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.ar.toLowerCase().includes(q) ||
        p.category.en.toLowerCase().includes(q) ||
        p.category.ar.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const matchedProductIds = useMemo(() => {
    return matchedProducts.map((p) => p.id);
  }, [matchedProducts]);

  // Helper to add logs to Tier 2 terminal
  const addLog = (
    level: 'info' | 'success' | 'query' | 'warn',
    messageEn: string,
    messageAr: string,
    detail?: string
  ) => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp,
        level,
        messageEn,
        messageAr,
        detail,
      },
    ]);
  };

  // Generate logs on step transitions
  const executeStepActions = (targetStep: StepNumber, query: string = searchQuery) => {
    const q = query.trim() || 'all';

    if (targetStep === 1) {
      addLog(
        'info',
        `[CLIENT] HTTP GET /api/products?search=${encodeURIComponent(q)} initiated`,
        `[العميل] إرسال طلب HTTP GET /api/products?search=${encodeURIComponent(q)}`,
        'User triggered search in browser UI -> fetch() API'
      );
    } else if (targetStep === 2) {
      addLog(
        'info',
        `[ROUTER] Incoming GET request matched route /api/products`,
        `[الموجه] تم مطابقة المسار /api/products للطلب الوارد`,
        'Middleware: CORS passed · RateLimit OK'
      );
      addLog(
        'success',
        `[VALIDATE] Sanitized query param "${q}" -> no SQL injection detected`,
        `[التحقق] تم فحص وتطهير النص "${q}" والتأكد من خلوه من هجمات SQL Injection`
      );
    } else if (targetStep === 3) {
      addLog(
        'query',
        `[DB POOL] Checked out pg_client #3 from pool. Preparing SQL statement`,
        `[مجمع الاتصال] تم حجز العميل رقم 3 من مجمع الاتصالات وتجهيز استعلام SQL`,
        `SELECT id, sku, name, category, price, stock FROM products WHERE LOWER(name) LIKE '%${q.toLowerCase()}%' OR LOWER(category) LIKE '%${q.toLowerCase()}%';`
      );
    } else if (targetStep === 4) {
      addLog(
        'success',
        `[POSTGRES] Query executed via B-Tree Index: ${matchedProductIds.length} rows returned`,
        `[قاعدة البيانات] تم تنفيذ الاستعلام عبر الفهرس: تم استرجاع ${matchedProductIds.length} سجلات مطابقة`,
        'Execution Time: 3.2ms · Buffer Hit: 99.4%'
      );
    } else if (targetStep === 5) {
      addLog(
        'info',
        `[TRANSFORM] Controller serialized ${matchedProductIds.length} tuples to ProductDTO[]`,
        `[التحويل] قام الخادم بتنسيق ${matchedProductIds.length} سجلات وتحويلها إلى مصفوفة DTO`
      );
      addLog(
        'success',
        `[HTTP 200] Dispatched application/json response header to client`,
        `[استجابة 200] تم إرسال ترويسة استجابة JSON إلى المتصفح عبر الشبكة`,
        'HTTP/2 200 OK · Content-Type: application/json'
      );
    } else if (targetStep === 6) {
      addLog(
        'success',
        `[ROUNDTRIP] Full 3-tier request-response cycle finished successfully!`,
        `[اكتمال الدورة] اكتملت دورة العمل ثلاثية الطبقات بنجاح!`,
        'Client DOM painted · Ready for next interaction'
      );
    }
  };

  // Step navigation handlers
  const handleNextStep = () => {
    if (currentStep < 6) {
      const next = (currentStep + 1) as StepNumber;
      setCurrentStep(next);
      executeStepActions(next);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prev = (currentStep - 1) as StepNumber;
      setCurrentStep(prev);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    }
  };

  const handleSelectStep = (step: StepNumber) => {
    setCurrentStep(step);
    executeStepActions(step);
  };

  const handleReset = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setCurrentStep(0);
    setLogs([]);
  };

  // Trigger new search from Frontend
  const handleTriggerSearch = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : searchQuery;
    startTransition(() => {
      setSearchQuery(q);
      setCurrentStep(1);
    });

    // Clear previous logs on new search
    setLogs([]);
    executeStepActions(1, q);

    if (mode === 'auto') {
      setIsAutoPlaying(true);
    }
  };

  // Auto Mode interval runner
  useEffect(() => {
    if (mode !== 'auto' || !isAutoPlaying) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    const intervalMs = Math.max(400, Math.round(1300 / speed));

    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 6) {
          setIsAutoPlaying(false);
          return 6;
        }
        const next = (prev + 1) as StepNumber;
        executeStepActions(next);
        return next;
      });
    }, intervalMs);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [mode, isAutoPlaying, speed, searchQuery, matchedProductIds]);

  const handleToggleAutoPlay = () => {
    if (currentStep === 0) {
      handleTriggerSearch();
      return;
    }
    if (currentStep >= 6) {
      setCurrentStep(1);
      executeStepActions(1);
      setIsAutoPlaying(true);
      return;
    }
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Container width style mapping
  const containerWidthClass = {
    compact: 'max-w-[1020px]',
    balanced: 'max-w-[1160px]',
    expanded: 'max-w-[1340px]',
  }[layoutWidth];

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
      {/* Top Bar with Mode, Controls, Width Switcher, Language Switcher, Guide */}
      <TopBar
        language={language}
        onLanguageChange={setLanguage}
        mode={mode}
        onModeChange={(newMode) => {
          setMode(newMode);
          if (newMode === 'step') {
            setIsAutoPlaying(false);
          }
        }}
        currentStep={currentStep}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={handleToggleAutoPlay}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        onReset={handleReset}
        speed={speed}
        onSpeedChange={setSpeed}
        onOpenGuide={() => setIsGuideOpen(true)}
        canNext={currentStep < 6}
        canPrev={currentStep > 0}
        layoutWidth={layoutWidth}
        onLayoutWidthChange={setLayoutWidth}
      />

      {/* Main Sandbox Stage: Compact, Focused & Balanced Container */}
      <main className={`flex-1 ${containerWidthClass} w-full mx-auto px-3 sm:px-4 py-3 flex flex-col justify-center transition-all duration-300`}>
        {/* Sub-bar: View Selector (All Tiers vs Single Focus) */}
        <div className="flex items-center justify-between mb-2.5 px-1 text-xs">
          {/* Architecture breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className={currentStep === 1 || currentStep === 6 ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
              1. Browser
            </span>
            <span className="text-slate-300 dark:text-slate-700">➔</span>
            <span className={currentStep === 2 || currentStep === 3 || currentStep === 5 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
              2. Server
            </span>
            <span className="text-slate-300 dark:text-slate-700">➔</span>
            <span className={currentStep === 3 || currentStep === 4 || currentStep === 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
              3. Database
            </span>
          </div>

          {/* View Filter Buttons */}
          <div className="flex items-center p-0.5 bg-slate-200/70 dark:bg-slate-800/80 rounded-lg text-[11px] border border-slate-300/40 dark:border-slate-700/60">
            <button
              onClick={() => setActiveView('all')}
              className={`px-2.5 py-0.5 rounded font-medium transition-all flex items-center gap-1 cursor-pointer ${
                activeView === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{t.viewAll}</span>
            </button>
            <button
              onClick={() => setActiveView('frontend')}
              className={`px-2.5 py-0.5 rounded font-medium transition-all flex items-center gap-1 cursor-pointer ${
                activeView === 'frontend'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>{t.viewFrontend}</span>
            </button>
            <button
              onClick={() => setActiveView('backend')}
              className={`px-2.5 py-0.5 rounded font-medium transition-all flex items-center gap-1 cursor-pointer ${
                activeView === 'backend'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Server className="w-3 h-3" />
              <span>{t.viewBackend}</span>
            </button>
            <button
              onClick={() => setActiveView('database')}
              className={`px-2.5 py-0.5 rounded font-medium transition-all flex items-center gap-1 cursor-pointer ${
                activeView === 'database'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Database className="w-3 h-3" />
              <span>{t.viewDatabase}</span>
            </button>
          </div>
        </div>

        {/* 3 Columns Layout (All View) */}
        {activeView === 'all' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2.5 items-stretch h-[500px]">
            {/* Tier 1: Frontend (Browser) */}
            <div className="h-full flex flex-col min-w-0">
              <Tier1Frontend
                language={language}
                currentStep={currentStep}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onTriggerSearch={handleTriggerSearch}
                matchedProducts={matchedProducts}
                isSearching={currentStep >= 1 && currentStep < 6}
              />
            </div>

            {/* Animated Directional Arrows: Tier 1 <-> Tier 2 */}
            <DataFlowConnector
              segment="frontend-backend"
              currentStep={currentStep}
              language={language}
              searchQuery={searchQuery}
              matchedCount={matchedProducts.length}
            />

            {/* Tier 2: Backend (Server) */}
            <div className="h-full flex flex-col min-w-0">
              <Tier2Backend
                language={language}
                currentStep={currentStep}
                logs={logs}
                onClearLogs={() => setLogs([])}
                searchQuery={searchQuery}
                matchedProducts={matchedProducts}
              />
            </div>

            {/* Animated Directional Arrows: Tier 2 <-> Tier 3 */}
            <DataFlowConnector
              segment="backend-database"
              currentStep={currentStep}
              language={language}
              searchQuery={searchQuery}
              matchedCount={matchedProducts.length}
            />

            {/* Tier 3: Database (Storage) */}
            <div className="h-full flex flex-col min-w-0">
              <Tier3Database
                language={language}
                currentStep={currentStep}
                products={SAMPLE_PRODUCTS}
                matchedProductIds={matchedProductIds}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        ) : (
          /* Single Focused Tier View */
          <div className="h-[500px] flex flex-col">
            {activeView === 'frontend' && (
              <Tier1Frontend
                language={language}
                currentStep={currentStep}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onTriggerSearch={handleTriggerSearch}
                matchedProducts={matchedProducts}
                isSearching={currentStep >= 1 && currentStep < 6}
              />
            )}
            {activeView === 'backend' && (
              <Tier2Backend
                language={language}
                currentStep={currentStep}
                logs={logs}
                onClearLogs={() => setLogs([])}
                searchQuery={searchQuery}
                matchedProducts={matchedProducts}
              />
            )}
            {activeView === 'database' && (
              <Tier3Database
                language={language}
                currentStep={currentStep}
                products={SAMPLE_PRODUCTS}
                matchedProductIds={matchedProductIds}
                searchQuery={searchQuery}
              />
            )}
          </div>
        )}
      </main>

      {/* 6-Step Architecture Cooperation Tracer (Bottom Dock) */}
      <StepTracer
        currentStep={currentStep}
        language={language}
        onSelectStep={handleSelectStep}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        canNext={currentStep < 6}
        canPrev={currentStep > 0}
        isAutoPlaying={isAutoPlaying}
      />

      {/* Educational Deep Dive Architecture Modal */}
      <ArchitectureModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
      />
    </div>
  );
}
