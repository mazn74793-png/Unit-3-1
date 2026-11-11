export type Language = 'en' | 'ar';

export type SimulationMode = 'auto' | 'step';

export type LayoutWidth = 'compact' | 'balanced' | 'expanded';

export type ActiveView = 'all' | 'frontend' | 'backend' | 'database';

export type TierType = 'frontend' | 'backend' | 'database';

export interface Product {
  id: number;
  sku: string;
  name: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  price: number;
  stock: number;
  rating: number;
  imageIcon: string;
  specs: {
    en: string;
    ar: string;
  };
}

export type StepNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface StepInfo {
  step: StepNumber;
  title: {
    en: string;
    ar: string;
  };
  shortTitle: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  tier: TierType | 'network-1' | 'network-2';
  sourceTier: TierType;
  targetTier: TierType;
  direction: 'fwd-1' | 'fwd-2' | 'back-2' | 'back-1' | 'idle';
  protocol: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'query' | 'warn';
  messageEn: string;
  messageAr: string;
  detail?: string;
}

export interface PacketState {
  active: boolean;
  type: 'request' | 'query' | 'result' | 'response';
  source: TierType;
  target: TierType;
  label: string;
  payload: string;
}
