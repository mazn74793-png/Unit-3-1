import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Layers, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  Database,
  Monitor
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];
  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              3T
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t.why3Tier}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'المفاهيم الهندسية والمعايير القياسية لتطوير البرمجيات' : 'Engineering concepts and industry architectural standards'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          {/* Overview */}
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              {t.architectureExplanation}
            </p>
          </div>

          {/* 3 Pillars of 3-Tier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {t.benefitSecurityTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.benefitSecurityDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {t.benefitScalabilityTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.benefitScalabilityDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {t.benefitMaintainabilityTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.benefitMaintainabilityDesc}
              </p>
            </div>
          </div>

          {/* Comparison: Why NOT 2-Tier? */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2.5 font-bold text-xs text-slate-800 dark:text-slate-200">
              {isAr ? 'مقارنة هندسية: لماذا لا نصل المتصفح بقاعدة البيانات مباشرة؟' : 'Architectural Comparison: Why Can’t Browsers Query Databases Directly?'}
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isAr ? 'المعمارية ثنائية الطبقات (خطرة)' : '2-Tier Model (Anti-Pattern on Web)'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'إذا اتصل المتصفح بقاعدة البيانات، يجب حفظ كلمة مرور قاعدة البيانات في شفرة جافاسكربت المعروضة للمستخدم! كما يمكن للمخترق تعديل استعلامات SQL وحذف كل الجداول.' 
                    : 'If client browsers connected directly, database credentials would be exposed in the frontend JS bundle. Any user could execute malicious SQL queries (e.g. DROP TABLE) directly.'}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'المعمارية ثلاثية الطبقات (النموذج الآمن)' : '3-Tier Model (Secure Production Standard)'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isAr
                    ? 'الخادم هو البوابة الحصينة: يتحقق من هوية المستخدم، ويفحص المدخلات، ويستعلم قاعدة البيانات بأمان عبر شبكة داخلية معزولة تماماً عن الجمهور.'
                    : 'The backend server acts as a trusted gatekeeper: it verifies session tokens, enforces business rules, uses parameterized queries, and hides the database inside an isolated private VPC.'}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Stack Reference */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isAr ? 'أمثلة لتقنيات كل طبقة في الواقع العملي' : 'Real-World Production Technologies by Tier'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <Monitor className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Frontend Tier</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    React, Vue, Svelte, iOS (Swift), Android (Kotlin)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <Server className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Backend Tier</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Node.js Express, Go Fiber, Python FastAPI, Java Spring
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <Database className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Database Tier</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    PostgreSQL, MySQL, CockroachDB, DynamoDB, MongoDB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
