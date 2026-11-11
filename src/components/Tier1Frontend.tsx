import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Tablet, 
  Watch, 
  ShoppingCart, 
  Star, 
  CheckCircle2, 
  Info,
  Layers,
  Code
} from 'lucide-react';
import { Product, StepNumber, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface Tier1FrontendProps {
  language: Language;
  currentStep: StepNumber;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onTriggerSearch: (queryToSearch?: string) => void;
  matchedProducts: Product[];
  isSearching: boolean;
}

export const Tier1Frontend: React.FC<Tier1FrontendProps> = ({
  language,
  currentStep,
  searchQuery,
  onSearchChange,
  onTriggerSearch,
  matchedProducts,
  isSearching,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'store' | 'inspector'>('store');
  const [cartCount, setCartCount] = useState<number>(0);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  const tags = [
    { label: 'Laptop', labelAr: 'حاسوب', query: 'Laptop' },
    { label: 'Phone', labelAr: 'هاتف', query: 'Phone' },
    { label: 'Headphones', labelAr: 'سماعات', query: 'Headphones' },
    { label: 'Tablet', labelAr: 'جهاز لوحي', query: 'Tablet' },
    { label: 'Watch', labelAr: 'ساعة', query: 'Watch' },
  ];

  const handleTagClick = (tagQuery: string) => {
    onSearchChange(tagQuery);
    onTriggerSearch(tagQuery);
  };

  const handleAddToCart = (name: string) => {
    setCartCount(prev => prev + 1);
    setLastAddedItem(name);
    setTimeout(() => setLastAddedItem(null), 2500);
  };

  // Product icon mapper
  const renderProductIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="w-5 h-5 text-indigo-500" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-blue-500" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-emerald-500" />;
      case 'tablet':
        return <Tablet className="w-5 h-5 text-cyan-500" />;
      case 'watch':
        return <Watch className="w-5 h-5 text-purple-500" />;
      default:
        return <Layers className="w-5 h-5 text-slate-500" />;
    }
  };

  const isActiveTier = currentStep === 1 || currentStep === 6;

  return (
    <div
      className={`flex flex-col h-full rounded-xl border transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden shadow-xs ${
        isActiveTier
          ? 'ring-2 ring-indigo-500/70 border-indigo-400 dark:border-indigo-600 shadow-md'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Browser Chrome Header */}
      <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
        {/* macOS style dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70 rounded-md px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-mono text-[11px] truncate text-slate-500 dark:text-slate-400">
            https://novamart.store/search?q={encodeURIComponent(searchQuery || 'all')}
          </span>
        </div>

        {/* Cart Counter */}
        <div className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-slate-700 dark:text-slate-300">
          <ShoppingCart className="w-4 h-4 text-slate-500" />
          <span className="font-mono tabular-nums bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.5 rounded text-[11px] font-bold">
            {cartCount}
          </span>
        </div>
      </div>

      {/* Tier Identification Banner */}
      <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
              {t.tier1Title}
            </span>
            {isActiveTier && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-indigo-600 text-white rounded">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.tier1Subtitle}
          </p>
        </div>

        {/* Tab switch: Storefront vs Client HTTP Inspector */}
        <div className="flex items-center p-0.5 bg-slate-200/70 dark:bg-slate-800 rounded-md text-[11px]">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              activeTab === 'store'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Store UI
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              activeTab === 'inspector'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            HTTP Inspector
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'store' ? (
        <div className="flex-1 p-4 flex flex-col overflow-y-auto space-y-4">
          {/* Search Bar & Button */}
          <div className="space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onTriggerSearch();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSearching ? t.searching : t.startSearch}
              </button>
            </form>

            {/* Quick-fill tags */}
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-[11px] font-medium text-slate-400">
                {t.quickFilters}:
              </span>
              {tags.map((tg) => (
                <button
                  key={tg.query}
                  type="button"
                  onClick={() => handleTagClick(tg.query)}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === tg.query.toLowerCase()
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {language === 'ar' ? tg.labelAr : tg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toast Notification when item added to cart */}
          {lastAddedItem && (
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {language === 'ar' ? `تمت إضافة "${lastAddedItem}" إلى سلة التسوق!` : `Added "${lastAddedItem}" to cart!`}
              </span>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t.searchResults}
              </span>
              {currentStep === 6 && (
                <span className="text-[11px] text-slate-500 font-mono">
                  {matchedProducts.length} {t.itemsFound}
                </span>
              )}
            </div>

            {/* State 1: Awaiting user action */}
            {currentStep === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                <Info className="w-7 h-7 text-indigo-400 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                  {t.initialCatalogPrompt}
                </p>
              </div>
            )}

            {/* State 2: Request in flight (Steps 1 to 5) */}
            {currentStep >= 1 && currentStep < 6 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mb-3" />
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {language === 'ar' ? 'الطلب قيد المعالجة عبر الطبقات...' : 'Request traveling across architecture...'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-xs font-mono">
                  fetch('/api/products?q={searchQuery}') ➔ [WAITING]
                </p>
              </div>
            )}

            {/* State 3: Response Arrived & Rendered (Step 6) */}
            {currentStep === 6 && (
              <div className="space-y-2.5">
                {matchedProducts.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                    {t.noResults}
                  </div>
                ) : (
                  matchedProducts.map((product) => {
                    const isOutOfStock = product.stock === 0;
                    return (
                      <div
                        key={product.id}
                        className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/90 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-start gap-3 shadow-2xs group"
                      >
                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0">
                          {renderProductIcon(product.imageIcon)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {product.name[language]}
                            </h4>
                            <span className="text-xs font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 shrink-0">
                              ${product.price.toLocaleString()}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {product.specs[language]}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {product.rating}
                              </span>
                              <span className="text-slate-300 dark:text-slate-600">·</span>
                              <span
                                className={`font-medium ${
                                  isOutOfStock
                                    ? 'text-rose-500'
                                    : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              >
                                {isOutOfStock ? t.outOfStock : `${product.stock} ${t.inStock}`}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.name[language])}
                              disabled={isOutOfStock}
                              className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                                isOutOfStock
                                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                  : 'bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-indigo-300'
                              }`}
                            >
                              {t.addToCart}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* HTTP Inspector Tab */
        <div className="flex-1 p-4 bg-slate-950 text-slate-200 font-mono text-[11px] overflow-y-auto space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 pb-2 border-b border-slate-800">
            <Code className="w-4 h-4" />
            <span className="font-semibold text-xs">Client HTTP & State Inspector</span>
          </div>

          <div>
            <span className="text-slate-500">// Client Dispatched Request:</span>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 mt-1">
              <div><span className="text-indigo-400">METHOD:</span> GET</div>
              <div><span className="text-indigo-400">URL:</span> /api/products?search={encodeURIComponent(searchQuery || 'all')}</div>
              <div><span className="text-indigo-400">HEADERS:</span> Accept: application/json</div>
              <div><span className="text-indigo-400">CACHE:</span> no-cache</div>
            </div>
          </div>

          <div>
            <span className="text-slate-500">// React Component State:</span>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 mt-1 text-[10px]">
              <pre className="text-slate-300 overflow-x-auto">
{JSON.stringify({
  query: searchQuery,
  status: currentStep === 6 ? 'SUCCESS_200' : currentStep > 0 ? 'PENDING' : 'IDLE',
  resultsCount: currentStep === 6 ? matchedProducts.length : 0,
  latency: currentStep === 6 ? '24ms' : '---'
}, null, 2)}
              </pre>
            </div>
          </div>

          <div>
            <span className="text-slate-500">// Virtual DOM Action:</span>
            <div className="text-[10px] text-slate-400 mt-1">
              {currentStep === 6 ? (
                <span className="text-emerald-400">✓ VDOM reconciliation complete. {matchedProducts.length} product nodes painted to real DOM.</span>
              ) : currentStep >= 1 ? (
                <span className="text-amber-400">... Suspense fallback / loading spinner mounted.</span>
              ) : (
                <span>Static initial state mounted.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
