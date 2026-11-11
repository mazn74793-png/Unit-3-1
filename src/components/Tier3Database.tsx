import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  Code2, 
  CheckCircle2, 
  HardDrive,
  Filter
} from 'lucide-react';
import { Product, StepNumber, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface Tier3DatabaseProps {
  language: Language;
  currentStep: StepNumber;
  products: Product[];
  matchedProductIds: number[];
  searchQuery: string;
}

export const Tier3Database: React.FC<Tier3DatabaseProps> = ({
  language,
  currentStep,
  products,
  matchedProductIds,
  searchQuery,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'table' | 'schema'>('table');

  // Tier 3 is active during step 3, 4, 5
  const isQuerying = currentStep === 3;
  const isExecuting = currentStep === 4;
  const isReturning = currentStep === 5;
  const isActiveTier = isQuerying || isExecuting || isReturning;

  // Active SQL query representation
  const cleanTerm = (searchQuery || 'all').toLowerCase();
  const sqlQuery = cleanTerm === 'all' || cleanTerm === ''
    ? `SELECT id, sku, name, category, price, stock \nFROM products \nORDER BY id ASC;`
    : `SELECT id, sku, name, category, price, stock \nFROM products \nWHERE LOWER(name) LIKE '%${cleanTerm}%' \n   OR LOWER(category) LIKE '%${cleanTerm}%';`;

  return (
    <div
      className={`flex flex-col h-full rounded-xl border transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden shadow-xs ${
        isActiveTier
          ? 'ring-2 ring-amber-500/70 border-amber-500 dark:border-amber-500 shadow-md'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Database Storage Header */}
      <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className={`w-4 h-4 ${isActiveTier ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
          <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
            PostgreSQL 16.2
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            :5432
          </span>
        </div>

        {/* Engine status */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              isExecuting
                ? 'bg-amber-400 animate-ping'
                : isActiveTier
                ? 'bg-amber-500'
                : 'bg-slate-400'
            }`}
          />
          <span className="text-[11px] text-slate-600 dark:text-slate-300">
            {isExecuting ? 'INDEX_SCAN' : isQuerying ? 'PARSING_SQL' : isReturning ? 'SENDING_ROWS' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Tier Identification Banner */}
      <div className="px-4 py-2 bg-amber-50/60 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-amber-950 dark:text-amber-300">
              {t.tier3Title}
            </span>
            {isActiveTier && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-amber-600 text-white rounded">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.tier3Subtitle}
          </p>
        </div>

        {/* Switch tab */}
        <div className="flex items-center p-0.5 bg-slate-200/70 dark:bg-slate-800 rounded-md text-[11px]">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
              activeTab === 'table'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Table className="w-3 h-3" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
              activeTab === 'schema'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>DDL Schema</span>
          </button>
        </div>
      </div>

      {/* SQL Query Box */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 text-slate-200">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
          <div className="flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            <span>{t.sqlExecuted}</span>
          </div>
          {isActiveTier && (
            <span className="text-amber-400 font-bold animate-pulse">
              {matchedProductIds.length} rows matched
            </span>
          )}
        </div>
        <pre className="font-mono text-[11px] text-amber-300/90 leading-tight bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto">
          <code>{sqlQuery}</code>
        </pre>
      </div>

      {/* Main Table View */}
      {activeTab === 'table' ? (
        <div className="flex-1 p-3 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {t.databaseTable}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {t.matchingRecords}
            </span>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">{language === 'ar' ? 'المنتج والفئة' : 'Product & Cat'}</th>
                  <th className="py-2 px-2 text-right">{language === 'ar' ? 'السعر' : 'Price'}</th>
                  <th className="py-2 px-2 text-right">{language === 'ar' ? 'المخزون' : 'Stock'}</th>
                  <th className="py-2 px-1.5 text-center">{language === 'ar' ? 'المطابقة' : 'Match'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((item) => {
                  const isMatch = matchedProductIds.includes(item.id);
                  const highlightRow = isActiveTier && isMatch;
                  const dimRow = isActiveTier && !isMatch;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-all duration-300 font-mono text-[11px] ${
                        highlightRow
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-inset ring-emerald-500/50'
                          : dimRow
                          ? 'opacity-35 dark:opacity-25 bg-slate-50/50 dark:bg-slate-900/50'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <td className="py-2 px-2 tabular-nums font-bold text-slate-500 dark:text-slate-400">
                        #{item.id}
                      </td>
                      <td className="py-2 px-2">
                        <div className="font-sans font-medium text-slate-900 dark:text-slate-100 leading-tight truncate max-w-[140px]">
                          {item.name[language]}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {item.category[language]} · {item.sku}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums font-bold">
                        ${item.price}
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums">
                        {item.stock}
                      </td>
                      <td className="py-2 px-1.5 text-center">
                        {highlightRow ? (
                          <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold shadow-2xs animate-fadeIn">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            HIT
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300 dark:text-slate-700">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Database Footer Metrics */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.tableStats}</span>
            </div>
            <span>Cost: 0.00..8.25 rows=2</span>
          </div>
        </div>
      ) : (
        /* DDL Schema View */
        <div className="flex-1 p-3 bg-slate-950 font-mono text-[11px] overflow-y-auto text-slate-200">
          <div className="text-slate-400 pb-2 mb-2 border-b border-slate-800">
            PostgreSQL Table Schema (Data Definition)
          </div>
          <pre className="text-amber-300/90 text-[10px] leading-relaxed bg-slate-900/80 p-2.5 rounded border border-slate-800">
{`CREATE TABLE products (
  id INT PRIMARY KEY,
  sku VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  rating NUMERIC(2, 1) DEFAULT 4.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- B-Tree Index for rapid query execution
CREATE INDEX idx_products_name_cat 
ON products (LOWER(name), LOWER(category));`}
          </pre>
        </div>
      )}
    </div>
  );
};
