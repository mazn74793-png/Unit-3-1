import { Product, StepInfo } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 101,
    sku: 'TECH-LP-01',
    name: {
      en: 'UltraBook Pro 15',
      ar: 'ألترا بوك برو 15',
    },
    category: {
      en: 'Laptop',
      ar: 'حاسوب محمول',
    },
    price: 1299,
    stock: 14,
    rating: 4.8,
    imageIcon: 'laptop',
    specs: {
      en: 'M3 Chip · 16GB RAM · 512GB SSD',
      ar: 'شريحة M3 · ذاكرة 16GB · سعة 512GB',
    },
  },
  {
    id: 102,
    sku: 'TECH-LP-02',
    name: {
      en: 'Stealth Gaming Laptop X16',
      ar: 'حاسوب ألعاب ستيلث X16',
    },
    category: {
      en: 'Laptop',
      ar: 'حاسوب محمول',
    },
    price: 1850,
    stock: 8,
    rating: 4.9,
    imageIcon: 'laptop',
    specs: {
      en: 'RTX 4080 · 32GB RAM · 1TB NVMe',
      ar: 'بطاقة RTX 4080 · ذاكرة 32GB · سعة 1TB',
    },
  },
  {
    id: 103,
    sku: 'TECH-PH-01',
    name: {
      en: 'Nexus Phone 15 Titanium',
      ar: 'هاتف نيكسوس 15 تيتانيوم',
    },
    category: {
      en: 'Phone',
      ar: 'هاتف ذكي',
    },
    price: 899,
    stock: 22,
    rating: 4.7,
    imageIcon: 'smartphone',
    specs: {
      en: 'OLED 120Hz · 256GB · 48MP Camera',
      ar: 'شاشة OLED 120Hz · سعة 256GB · كاميرا 48MP',
    },
  },
  {
    id: 104,
    sku: 'TECH-AU-01',
    name: {
      en: 'Studio Pro Wireless Headphones',
      ar: 'سماعات ستوديو برو اللاسلكية',
    },
    category: {
      en: 'Headphones',
      ar: 'سماعات رأس',
    },
    price: 249,
    stock: 31,
    rating: 4.6,
    imageIcon: 'headphones',
    specs: {
      en: 'Active Noise Canceling · 40h Battery',
      ar: 'عزل ضوضاء نشط · بطارية 40 ساعة',
    },
  },
  {
    id: 105,
    sku: 'TECH-TB-01',
    name: {
      en: 'AirTab Slim 11" Tablet',
      ar: 'جهاز لوحي إير تاب سليم 11 بوصة',
    },
    category: {
      en: 'Tablet',
      ar: 'جهاز لوحي',
    },
    price: 649,
    stock: 17,
    rating: 4.5,
    imageIcon: 'tablet',
    specs: {
      en: 'Liquid Retina · Stylus Support · 128GB',
      ar: 'شاشة ريتينا · دعم القلم الذكي · سعة 128GB',
    },
  },
  {
    id: 106,
    sku: 'TECH-WT-01',
    name: {
      en: 'Horizon Smartwatch Ultra 2',
      ar: 'ساعة هورايزون سمارت ألترا 2',
    },
    category: {
      en: 'Watch',
      ar: 'ساعة ذكية',
    },
    price: 199,
    stock: 0,
    rating: 4.3,
    imageIcon: 'watch',
    specs: {
      en: 'Heart Sensor · ECG · GPS · Out of Stock',
      ar: 'مستشعر نبضات · تخطيط قلب · نفدت الكمية',
    },
  },
];

export const SIMULATION_STEPS: StepInfo[] = [
  {
    step: 1,
    shortTitle: {
      en: '1. Frontend Dispatches Request',
      ar: '1. المتصفح يرسل الطلب',
    },
    title: {
      en: 'Step 1: Frontend User Interaction & HTTP Request',
      ar: 'الخطوة 1: تفاعل المستخدم وإرسال طلب HTTP',
    },
    description: {
      en: 'User triggers search in the browser (Client). React serializes query parameter into HTTP GET /api/products?search=... and dispatches request across the network via fetch() API.',
      ar: 'يبدأ المستخدم البحث في المتصفح (الواجهة الأمامية). يقوم إطار العمل بإنشاء طلب HTTP GET عبر الشبكة حاملاً معيار البحث.',
    },
    tier: 'frontend',
    sourceTier: 'frontend',
    targetTier: 'backend',
    direction: 'fwd-1',
    protocol: 'HTTP/2 (REST)',
  },
  {
    step: 2,
    shortTitle: {
      en: '2. Backend Receives & Validates',
      ar: '2. الخادم يستقبل ويفحص',
    },
    title: {
      en: 'Step 2: Server Ingestion, Routing & Validation',
      ar: 'الخطوة 2: استلام الطلب في الخادم والتوجيه والتحقق',
    },
    description: {
      en: 'Express server receives incoming HTTP packet. Middleware runs CORS/Auth, sanitizes search parameters, and invokes ProductController.search() business logic.',
      ar: 'يستقبل الخادم الحزمة البرمجية. تقوم برمجيات الوسيط بفحص الأمان والتحقق من صحة النص ثم تحويله إلى وحدة المعالجة.',
    },
    tier: 'backend',
    sourceTier: 'frontend',
    targetTier: 'backend',
    direction: 'fwd-1',
    protocol: 'Express Router',
  },
  {
    step: 3,
    shortTitle: {
      en: '3. Backend Queries Database',
      ar: '3. الخادم يستعلم قاعدة البيانات',
    },
    title: {
      en: 'Step 3: Database Query Dispatch (SQL / TCP)',
      ar: 'الخطوة 3: إرسال استعلام SQL إلى قاعدة البيانات',
    },
    description: {
      en: 'Backend checks out connection from database pool, constructs parameterized SQL (preventing SQL injection), and sends binary query packet to Database via TCP port 5432.',
      ar: 'يقوم الخادم بتجهيز استعلام SQL آمن محمي ضد حقن التعليمات ويرسله لقاعدة البيانات عبر منفذ TCP المخصص.',
    },
    tier: 'network-2',
    sourceTier: 'backend',
    targetTier: 'database',
    direction: 'fwd-2',
    protocol: 'PostgreSQL TCP Wire',
  },
  {
    step: 4,
    shortTitle: {
      en: '4. Database Filters & Scans',
      ar: '4. قاعدة البيانات تبحث وتطابق',
    },
    title: {
      en: 'Step 4: Database Engine Execution & Record Scanning',
      ar: 'الخطوة 4: محرك قاعدة البيانات ينفذ البحث ويطابق السجلات',
    },
    description: {
      en: 'Database parses SQL AST, utilizes indexes to scan storage blocks, applies WHERE filter clause, and extracts matching rows from the products table.',
      ar: 'يفسر محرك قاعدة البيانات الاستعلام، ويفحص الفهارس والسجلات، ويستخرج المنتجات المطابقة لشروط البحث.',
    },
    tier: 'database',
    sourceTier: 'database',
    targetTier: 'database',
    direction: 'back-2',
    protocol: 'SQL Query Engine',
  },
  {
    step: 5,
    shortTitle: {
      en: '5. Backend Formats JSON Response',
      ar: '5. الخادم يحول البيانات إلى JSON',
    },
    title: {
      en: 'Step 5: Record Transformation & JSON Serialization',
      ar: 'الخطوة 5: الخادم ينسق النتائج ويرسل استجابة JSON',
    },
    description: {
      en: 'Backend receives raw database tuple results, transforms them into standardized DTO models, generates JSON response with HTTP 200 OK header, and sends it back to browser.',
      ar: 'يستلم الخادم البيانات الخام، وينسقها بصيغة JSON القياسية مع كود الحالة 200 OK ويرسلها كاستجابة للمتصفح.',
    },
    tier: 'backend',
    sourceTier: 'database',
    targetTier: 'backend',
    direction: 'back-2',
    protocol: 'JSON Serializer',
  },
  {
    step: 6,
    shortTitle: {
      en: '6. Frontend Renders Results',
      ar: '6. المتصفح يعرض النتائج للمستخدم',
    },
    title: {
      en: 'Step 6: Frontend Deserialization & DOM Rendering',
      ar: 'الخطوة 6: المتصفح يحلل الاستجابة ويعرض المنتجات',
    },
    description: {
      en: 'Client browser receives HTTP 200 response, parses JSON body into component state, and re-renders the React virtual DOM with the matched product catalog cards.',
      ar: 'يستقبل المتصفح استجابة 200 OK ويحلل محتوى JSON، ويقوم بتحديث شاشة العرض لتقديم كروت المنتجات المطابقة للمتسوق.',
    },
    tier: 'frontend',
    sourceTier: 'backend',
    targetTier: 'frontend',
    direction: 'back-1',
    protocol: 'React VDOM Paint',
  },
];
