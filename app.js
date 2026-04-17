// ============================================
// FITPRO STATION — CALCULADORA DE COSTOS Y PRECIOS
// Aplicación completa con persistencia en localStorage
// ============================================

// ---- CATEGORY MAPS ----
const INGREDIENT_CATS = {
  proteinas: { label: 'Proteínas', icon: '💪' },
  frutas: { label: 'Frutas/Verduras', icon: '🍓' },
  toppings: { label: 'Toppings', icon: '🍯' },
  bases: { label: 'Bases/Líquidos', icon: '🥛' },
  empaques: { label: 'Empaques', icon: '📦' },
  otros: { label: 'Otros', icon: '📎' }
};

const PRODUCT_CATS = {
  batidos: { label: 'Batidos', icon: '🥤' },
  waffles: { label: 'Waffles', icon: '🧇' },
  parfaits: { label: 'Parfaits', icon: '🥣' },
  bowls: { label: 'Bowls', icon: '🥗' },
  alimentos: { label: 'Alimentos', icon: '🍽️' },
  proteinas_tienda: { label: 'Proteínas (Tienda)', icon: '💪' },
  suplementacion: { label: 'Suplementación', icon: '💊' },
  snacks: { label: 'Snacks y Bebidas', icon: '🍫' },
  ropa: { label: 'Ropa', icon: '👕' },
  accesorios: { label: 'Accesorios', icon: '🎒' },
  insumos: { label: 'Insumos/Desechables', icon: '📋' },
  bebidas: { label: 'Bebidas', icon: '💧' },
  otros: { label: 'Otros', icon: '📎' }
};

const COST_CATS = {
  operativo: { label: 'Operativo', icon: '🏢' },
  servicios: { label: 'Servicios', icon: '⚡' },
  personal: { label: 'Personal', icon: '👥' },
  financiero: { label: 'Financiero', icon: '🏦' },
  marketing: { label: 'Marketing', icon: '📢' },
  otros: { label: 'Otros', icon: '📎' }
};

// ---- DEFAULT DATA ----
const DEFAULTS = {
  ingredients: [
    { id: 'ing_001', name: 'Proteína Whey', category: 'proteinas', unit: 'g', purchaseQty: 1000, purchasePrice: 100000, costPerUnit: 100 },
    { id: 'ing_002', name: 'Creatina', category: 'proteinas', unit: 'g', purchaseQty: 300, purchasePrice: 48000, costPerUnit: 160 },
    { id: 'ing_003', name: 'Avena en Hojuelas', category: 'bases', unit: 'g', purchaseQty: 1000, purchasePrice: 10000, costPerUnit: 10 },
    { id: 'ing_004', name: 'Leche Entera', category: 'bases', unit: 'ml', purchaseQty: 1100, purchasePrice: 4400, costPerUnit: 4 },
    { id: 'ing_005', name: 'Leche de Almendras', category: 'bases', unit: 'ml', purchaseQty: 1000, purchasePrice: 12000, costPerUnit: 12 },
    { id: 'ing_006', name: 'Arándanos', category: 'frutas', unit: 'g', purchaseQty: 500, purchasePrice: 12500, costPerUnit: 25 },
    { id: 'ing_007', name: 'Banano', category: 'frutas', unit: 'g', purchaseQty: 1000, purchasePrice: 4000, costPerUnit: 4 },
    { id: 'ing_008', name: 'Fresa', category: 'frutas', unit: 'g', purchaseQty: 500, purchasePrice: 5000, costPerUnit: 10 },
    { id: 'ing_009', name: 'Miel de Abejas', category: 'toppings', unit: 'ml', purchaseQty: 500, purchasePrice: 10000, costPerUnit: 20 },
    { id: 'ing_010', name: 'Granola', category: 'toppings', unit: 'g', purchaseQty: 500, purchasePrice: 7500, costPerUnit: 15 },
    { id: 'ing_011', name: 'Mantequilla de Maní', category: 'toppings', unit: 'g', purchaseQty: 500, purchasePrice: 12500, costPerUnit: 25 },
    { id: 'ing_012', name: 'Cacao en Polvo', category: 'toppings', unit: 'g', purchaseQty: 250, purchasePrice: 7500, costPerUnit: 30 },
    { id: 'ing_013', name: 'Vaso 16oz', category: 'empaques', unit: 'unidad', purchaseQty: 50, purchasePrice: 20000, costPerUnit: 400 },
    { id: 'ing_014', name: 'Tapa Domo', category: 'empaques', unit: 'unidad', purchaseQty: 50, purchasePrice: 7500, costPerUnit: 150 },
    { id: 'ing_015', name: 'Pitillo', category: 'empaques', unit: 'unidad', purchaseQty: 100, purchasePrice: 8000, costPerUnit: 80 },
    { id: 'ing_016', name: 'Agua', category: 'bases', unit: 'ml', purchaseQty: 5000, purchasePrice: 5000, costPerUnit: 1 },
    { id: 'ing_017', name: 'Hielo', category: 'bases', unit: 'g', purchaseQty: 5000, purchasePrice: 10000, costPerUnit: 2 },
    { id: 'ing_018', name: 'Espinaca Baby', category: 'frutas', unit: 'g', purchaseQty: 250, purchasePrice: 3750, costPerUnit: 15 },
    { id: 'ing_019', name: 'Yogurt Griego', category: 'bases', unit: 'g', purchaseQty: 1000, purchasePrice: 12000, costPerUnit: 12 },
    { id: 'ing_020', name: 'Semillas de Chía', category: 'toppings', unit: 'g', purchaseQty: 250, purchasePrice: 8750, costPerUnit: 35 },
  ],
  products: [
    {
      id: 'prod_001', name: 'Mega Bulk', subtitle: 'Aumentar', type: 'composite', category: 'batidos',
      ingredients: [
        { ingredientId: 'ing_001', quantity: 50 },
        { ingredientId: 'ing_002', quantity: 5 },
        { ingredientId: 'ing_003', quantity: 50 },
        { ingredientId: 'ing_004', quantity: 300 },
        { ingredientId: 'ing_007', quantity: 120 },
        { ingredientId: 'ing_011', quantity: 20 },
        { ingredientId: 'ing_017', quantity: 100 },
        { ingredientId: 'ing_013', quantity: 1 },
        { ingredientId: 'ing_014', quantity: 1 },
        { ingredientId: 'ing_015', quantity: 1 },
      ],
      directCost: 0, targetMargin: 40, sellingPrice: 15000, priceMode: 'manual'
    },
    {
      id: 'prod_002', name: 'Super Core', subtitle: 'Equivalente', type: 'composite', category: 'batidos',
      ingredients: [
        { ingredientId: 'ing_001', quantity: 35 },
        { ingredientId: 'ing_008', quantity: 80 },
        { ingredientId: 'ing_007', quantity: 80 },
        { ingredientId: 'ing_005', quantity: 250 },
        { ingredientId: 'ing_018', quantity: 30 },
        { ingredientId: 'ing_017', quantity: 100 },
        { ingredientId: 'ing_013', quantity: 1 },
        { ingredientId: 'ing_014', quantity: 1 },
        { ingredientId: 'ing_015', quantity: 1 },
      ],
      directCost: 0, targetMargin: 40, sellingPrice: 14000, priceMode: 'manual'
    },
    {
      id: 'prod_003', name: 'Extreme Cut', subtitle: 'Reducir', type: 'composite', category: 'batidos',
      ingredients: [
        { ingredientId: 'ing_001', quantity: 40 },
        { ingredientId: 'ing_006', quantity: 50 },
        { ingredientId: 'ing_018', quantity: 40 },
        { ingredientId: 'ing_016', quantity: 300 },
        { ingredientId: 'ing_020', quantity: 10 },
        { ingredientId: 'ing_017', quantity: 100 },
        { ingredientId: 'ing_013', quantity: 1 },
        { ingredientId: 'ing_014', quantity: 1 },
        { ingredientId: 'ing_015', quantity: 1 },
      ],
      directCost: 0, targetMargin: 45, sellingPrice: 13000, priceMode: 'manual'
    },
    { id: 'prod_004', name: 'Aromática', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_005', name: 'Batido Bi Pro Cookies', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_006', name: 'Batido Bi Pro Vainilla', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_007', name: 'Batido Fresia', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_008', name: 'Batido Mañanero', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_009', name: 'Batido Nitro', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_010', name: 'Batido Pasión', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_011', name: 'Batido Rojo', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_012', name: 'Batido Smart', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_013', name: 'Batido Verde', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_014', name: 'Batido Vitanas', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_015', name: 'Bocadillo Beleño', subtitle: '', type: 'simple', category: 'alimentos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_016', name: 'Bowl Crema de Arroz', subtitle: '', type: 'simple', category: 'bowls', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_017', name: 'Energizante XS', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_018', name: 'Galleta con Yogurt Griego', subtitle: '', type: 'simple', category: 'alimentos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_019', name: 'Omega 3 Ronnie Coleman', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_020', name: 'Parfait', subtitle: '', type: 'simple', category: 'parfaits', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_021', name: 'Protein Coffee', subtitle: '', type: 'simple', category: 'batidos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_022', name: 'Sandwich', subtitle: '', type: 'simple', category: 'alimentos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_023', name: 'Tinto', subtitle: '', type: 'simple', category: 'bebidas', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_024', name: 'Waffle', subtitle: '', type: 'simple', category: 'waffles', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_025', name: 'Waffle Salado', subtitle: '', type: 'simple', category: 'waffles', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_026', name: 'Basic Mass 15 Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_027', name: 'Basic Whey 2Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_028', name: 'Basic Whey 5Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_029', name: 'Bi Pro 2Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_030', name: 'Creatina DK Sin Sabor 60Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_031', name: 'Creatina DK Sabor 60Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_032', name: 'Creatina Nutrex 200 Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_033', name: 'Creatina Nutrex 60Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_034', name: 'Creatina Platinum 80Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_035', name: 'Hyper DK 11Lb', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_036', name: 'Hyper DK 3Lb', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_037', name: 'ISO 100 5Lb Dymatize', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_038', name: 'Mass Tech 4Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_039', name: 'Nitro Tech Whey 2Lb', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_040', name: 'Nitro Tech Whey 5Lb', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_041', name: 'Pre-Entreno DK 30Serv', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_042', name: 'Proteína Vegetal', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_043', name: 'Whey DK Labs 2Lbs', subtitle: '', type: 'simple', category: 'proteinas_tienda', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_044', name: 'Amino Build Muscletech', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_045', name: 'Aminos EEAS Finaflex', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_046', name: 'Aminos EEAS Macro', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_047', name: 'Aminos EEAS Nutrex', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_048', name: 'Ashwagandha', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_049', name: 'C Plus Nutrilite 60Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_050', name: 'Cal Mag D Nutrilite 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_051', name: 'Carbs Connect', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_052', name: 'Complex B Nutrilite 60Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_053', name: 'Creatina Vitanas 50 Serv', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_054', name: 'Crema Arroz Instarice', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_055', name: 'D-Tox', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_056', name: 'Daily Kids', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_057', name: 'Daily Nutrilite 30Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_058', name: 'Daily Nutrilite 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_059', name: 'Fibra Polvo Nutrilite 30', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_060', name: 'Herbal Mix', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_061', name: 'Herbals Ajo Nutrilite 120Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_062', name: 'HSN Colágeno Nutrilite 60Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_063', name: 'Lecitina E Nutrilite 60Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_064', name: 'Monster Test', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_065', name: 'Multi Vitamínico Muscletech 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_066', name: 'Omega Nutrilite 30Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_067', name: 'Omega Nutrilite 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_068', name: 'Omega Transparente', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_069', name: 'Prana', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_070', name: 'Pre-Entreno Electrón', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_071', name: 'Probiotic Nutrilite 30', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_072', name: 'Protein Pancake Amarillo', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_073', name: 'Psychotic 30Serv', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_074', name: 'Reduction Advanced 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_075', name: 'Slimmetry Advanced', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_076', name: 'Testo X 90Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_077', name: 'Yohimbine 90 Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_078', name: 'Yohimbine Pharma 120Caps', subtitle: '', type: 'simple', category: 'suplementacion', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_079', name: 'Agua Frescampo 1L', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_080', name: 'Alfajor Proteína', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_081', name: 'Amper', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_082', name: 'Arequipe', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_083', name: 'Bebida de Proteína', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_084', name: 'C4 Lata', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_085', name: 'Cacao en Polvo', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_086', name: 'Café Molido', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_087', name: 'Crema de Maní', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_088', name: 'Crokan Fresa y Uva', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_089', name: 'Crokan Yogurt Griego', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_090', name: 'Electrolic', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_091', name: 'Fit Bar Proteína', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_092', name: 'Galleta Avena', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_093', name: 'Galleta Chocolate', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_094', name: 'Galletas Tosh Miel', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_095', name: 'Gatorade', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_096', name: 'Hersheys Caramelo', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_097', name: 'Hersheys Chocolate', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_098', name: 'Its Boom Lata', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_099', name: 'Miel Natural', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_100', name: 'Monster', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_101', name: 'Myth Legendary Lata', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_102', name: 'Queso Relleno', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_103', name: 'Serv Bucked Up', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_104', name: 'Serv Bum', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_105', name: 'Serv C4', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_106', name: 'Serv Creatina DK Sabor', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_107', name: 'Serv Creatina DK Sin Sabor', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_108', name: 'Serv Creatina Nutrex', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_109', name: 'Serv Electrón', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_110', name: 'Serv Energy Up', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_111', name: 'Serv Intenze', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_112', name: 'Serv Psychotic', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_113', name: 'Serv Pre DK', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_114', name: 'Torta Banano', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_115', name: 'Torta Zanahoria', subtitle: '', type: 'simple', category: 'snacks', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_116', name: 'Cami Buso Licrado Importado', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_117', name: 'Chaquetas Importadas Licradas', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_118', name: 'Chaquetas Nacionales', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_119', name: 'Conjunto Chaqueta y Leggins', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_120', name: 'Conjunto Leggins y Top Alo', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_121', name: 'Conjunto Short y Camisa', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_122', name: 'Conjunto Short y Top Alo', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_123', name: 'Conjunto Short y Top Verde', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_124', name: 'Conjunto Falda Camisa Importado', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_125', name: 'Conjunto Leggins y Top Sin Push Up', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_126', name: 'Conjunto Sudadera', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_127', name: 'Enterizo Completo', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_128', name: 'Enterizo de Tiras Cruzadas', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_129', name: 'Enterizo Short con Cuello', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_130', name: 'Enterizo Short Copa Cruzado', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_131', name: 'Enterizo Short de Tiras', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_132', name: 'Enterizo Short Manga Corta', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_133', name: 'Enterizo Short Manga Larga', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_134', name: 'Esqueleto Importado Capota/Sin', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_135', name: 'Esqueleto Nacional', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_136', name: 'Falda y Top Nacionales', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_137', name: 'Leggins', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_138', name: 'Pantaloneta Dama', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_139', name: 'Pantaloneta Licra', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_140', name: 'Pantaloneta Sin Licra', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_141', name: 'Shakers', subtitle: '', type: 'simple', category: 'accesorios', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_142', name: 'Short', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_143', name: 'Short Nacional', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_144', name: 'Sudadera Jogger', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_145', name: 'Tops', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_146', name: 'Vestido Manga/Siza', subtitle: '', type: 'simple', category: 'ropa', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_147', name: 'Bowl 750 ml', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_148', name: 'Caja Sandwich', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_149', name: 'Cajas Wafles', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_150', name: 'Cuchara Darnel', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_151', name: 'Granola', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_152', name: 'Huevo', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_153', name: 'Ingre Galleta Avena', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_154', name: 'Ingre Galleta Chocolate', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_155', name: 'Ingre Masa Protein Pancake', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_156', name: 'Mora', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_157', name: 'Pan Gourmet', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_158', name: 'Pitillo Grande', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_159', name: 'Serv Bi Pro Cookies', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_160', name: 'Serv Bi Pro Vainilla', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_161', name: 'Serv Nitro', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_162', name: 'Serv Smart', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_163', name: 'Serv Vitanas', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_164', name: 'Tajada Pernil', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_165', name: 'Tajada Queso', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_166', name: 'Vaso 12 Onz', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_167', name: 'Vaso 16 Onz', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_168', name: 'Vaso 9 Onz', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_169', name: 'Vaso Tinto', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_170', name: 'Vaso Veneciano 12 Onz', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
    { id: 'prod_171', name: 'Yogurt Griego', subtitle: '', type: 'simple', category: 'insumos', ingredients: [], directCost: 0, targetMargin: 40, sellingPrice: 0, priceMode: 'manual' },
  ],
  fixedCosts: [
    { id: 'fc_001', name: 'Renta del Local', amount: 2000000, category: 'operativo' },
    { id: 'fc_002', name: 'Energía Eléctrica', amount: 350000, category: 'servicios' },
    { id: 'fc_003', name: 'Agua', amount: 120000, category: 'servicios' },
    { id: 'fc_004', name: 'Internet', amount: 80000, category: 'servicios' },
    { id: 'fc_005', name: 'Nómina / Salarios', amount: 1800000, category: 'personal' },
    { id: 'fc_006', name: 'Cuota Crédito (7M)', amount: 500000, category: 'financiero' },
    { id: 'fc_007', name: 'Publicidad y Marketing', amount: 300000, category: 'marketing' },
    { id: 'fc_008', name: 'Seguros', amount: 100000, category: 'operativo' },
  ],
  settings: {
    defaultMargin: 40,
    estimatedMonthlySales: 600,
    storeName: 'FitPro Station',
    salesProfile: { preparaciones: 40, suplementos: 40, snacks: 15, ropa: 5 }
  }
};

// ---- STATE MANAGEMENT (SUPABASE) ----
const State = {
  data: null,
  async load() {
    try {
      this.data = await Cloud.loadAll();
    } catch (e) {
      console.error('Cloud load failed, using defaults:', e);
      this.data = JSON.parse(JSON.stringify(DEFAULTS));
    }
  },
  save() { /* No-op: individual saves handled by Cloud */ },
  async reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULTS));
    Toast.show('Reset local — recarga la página para ver datos de la nube', 'info');
  }
};

// ---- UTILITIES ----
const U = {
  fmt(n) { return '$' + Math.round(n).toLocaleString('es-CO'); },
  pct(n) { return n.toFixed(1) + '%'; },
  id(prefix) { return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4); },
  getIng(id) { return State.data.ingredients.find(i => i.id === id); },

  prodVarCost(product, ingOverrides) {
    if (product.type === 'simple') return product.directCost;
    return (product.ingredients || []).reduce((t, item) => {
      const ing = this.getIng(item.ingredientId);
      if (!ing) return t;
      const cost = ingOverrides ? (ingOverrides[ing.id] || ing.costPerUnit) : ing.costPerUnit;
      return t + cost * item.quantity;
    }, 0);
  },

  totalFixed(overrides) {
    return State.data.fixedCosts.reduce((s, fc) => {
      const amt = overrides ? (overrides[fc.id] || fc.amount) : fc.amount;
      return s + amt;
    }, 0);
  },

  priceFromMargin(varCost, margin) { return varCost / (1 - margin / 100); },
  marginFromPrice(varCost, price) { return price > 0 ? ((price - varCost) / price) * 100 : 0; },

  getProductPrice(p) {
    const vc = this.prodVarCost(p);
    if (p.priceMode === 'margin') return this.priceFromMargin(vc, p.targetMargin);
    return p.sellingPrice || this.priceFromMargin(vc, p.targetMargin);
  },

  breakEven(fixedOverrides, ingOverrides) {
    const totalF = this.totalFixed(fixedOverrides);
    const prods = State.data.products.filter(p => this.getProductPrice(p) > 0);
    if (prods.length === 0) return Infinity;
    
    const profile = State.data.settings.salesProfile || { preparaciones: 40, suplementos: 40, snacks: 15, ropa: 5 };
    const wMargin = this.weightedMargin(profile) / 100;
    return wMargin > 0 ? Math.ceil(totalF / wMargin) : Infinity;
  },

  weightedMargin(profile) {
    const prods = State.data.products.filter(p => this.getProductPrice(p) > 0);
    if (prods.length === 0) return 0;

    const groupMap = {
      preparaciones: ['batidos', 'waffles', 'parfaits', 'bowls', 'alimentos'],
      suplementos: ['proteinas_tienda', 'suplementacion'],
      ropa: ['ropa', 'accesorios'],
      snacks: ['snacks', 'bebidas', 'otros', 'insumos']
    };

    let totalWeight = 0;
    let weightedSum = 0;

    Object.keys(profile).forEach(groupKey => {
      const weight = profile[groupKey];
      if (!weight) return;
      totalWeight += weight;

      const groupProds = prods.filter(p => groupMap[groupKey] && groupMap[groupKey].includes(p.category));
      let groupMarginSum = 0;
      groupProds.forEach(p => {
        const vc = this.prodVarCost(p);
        const price = this.getProductPrice(p);
        groupMarginSum += this.marginFromPrice(vc, price);
      });
      const groupAvgMargin = groupProds.length > 0 ? (groupMarginSum / groupProds.length) : 0;
      weightedSum += (groupAvgMargin * weight);
    });

    return totalWeight > 0 ? (weightedSum / totalWeight) : 0;
  },

  avgMargin() {
    const prods = State.data.products.filter(p => this.getProductPrice(p) > 0);
    if (prods.length === 0) return 0;
    let totalM = 0;
    prods.forEach(p => {
      const vc = this.prodVarCost(p);
      const price = this.getProductPrice(p);
      totalM += this.marginFromPrice(vc, price);
    });
    return totalM / prods.length;
  },

  marginClass(m) { return m >= 35 ? 'margin-good' : m >= 20 ? 'margin-ok' : 'margin-bad'; },
  marginValClass(m) { return m >= 35 ? 'accent' : m >= 20 ? 'warning' : 'danger'; },
};

// ---- NAVIGATION ----
const Nav = {
  init() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });
  },
  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === 'tab-' + tabId));
    const renderers = { dashboard: Dashboard, ingredients: Ingredients, products: Products, costs: FixedCosts, simulator: Simulator };
    if (renderers[tabId]) renderers[tabId].render();
  }
};

// ---- MODAL ----
const Modal = {
  _onSave: null,
  show(title, bodyHTML, onSave) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHTML;
    this._onSave = onSave;
    document.getElementById('modal-overlay').classList.add('active');
  },
  hide() {
    document.getElementById('modal-overlay').classList.remove('active');
    this._onSave = null;
  },
  init() {
    document.getElementById('modal-close').addEventListener('click', () => this.hide());
    document.getElementById('modal-cancel').addEventListener('click', () => this.hide());
    document.getElementById('modal-save').addEventListener('click', () => { if (this._onSave) this._onSave(); });
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') this.hide();
    });
  }
};

// ---- TOAST ----
const Toast = {
  show(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
  }
};

// ---- CONFIRM ----
const Confirm = {
  show(msg, onYes) {
    const el = document.getElementById('confirm-overlay');
    document.getElementById('confirm-msg').textContent = msg;
    el.classList.add('active');
    document.getElementById('confirm-yes').onclick = () => { el.classList.remove('active'); onYes(); };
    document.getElementById('confirm-no').onclick = () => { el.classList.remove('active'); };
  }
};

// ============================================
// INGREDIENTS MODULE
// ============================================
const Ingredients = {
  filter: { search: '', category: '' },

  render() {
    const container = document.getElementById('tab-ingredients');
    const ings = State.data.ingredients.filter(i => {
      const matchSearch = !this.filter.search || i.name.toLowerCase().includes(this.filter.search.toLowerCase());
      const matchCat = !this.filter.category || i.category === this.filter.category;
      return matchSearch && matchCat;
    });

    const catOptions = Object.entries(INGREDIENT_CATS).map(([k, v]) => `<option value="${k}"${this.filter.category === k ? ' selected' : ''}>${v.icon} ${v.label}</option>`).join('');

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">🧂 <span>Ingredientes</span></h2>
        <button class="btn btn-primary" onclick="Ingredients.showForm()">+ Agregar</button>
      </div>
      <div class="toolbar" style="margin-bottom:16px">
        <div class="search-wrapper">
          <input class="search-input" type="text" placeholder="Buscar ingrediente..." value="${this.filter.search}" oninput="Ingredients.filter.search=this.value;Ingredients.render()">
        </div>
        <select class="filter-select" onchange="Ingredients.filter.category=this.value;Ingredients.render()">
          <option value="">Todas las categorías</option>
          ${catOptions}
        </select>
      </div>
      ${ings.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">🧂</div><p class="empty-state-text">No hay ingredientes</p></div>' : `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr>
            <th>Ingrediente</th><th>Categoría</th><th class="align-right">Compra</th><th class="align-right">Precio Compra</th><th class="align-right" style="color:var(--accent)">Costo/${'Unidad'}</th><th class="align-right">Acciones</th>
          </tr></thead>
          <tbody>
            ${ings.map(i => {
              const cat = INGREDIENT_CATS[i.category] || INGREDIENT_CATS.otros;
              return `<tr>
                <td><strong>${i.name}</strong></td>
                <td><span class="badge">${cat.icon} ${cat.label}</span></td>
                <td class="align-right text-mono">${(i.purchaseQty || 0).toLocaleString('es-CO')} ${i.unit}</td>
                <td class="align-right text-mono">${U.fmt(i.purchasePrice || 0)}</td>
                <td class="align-right text-mono" style="color:var(--accent);font-weight:600">${U.fmt(i.costPerUnit)}/${i.unit}</td>
                <td class="align-right">
                  <button class="btn btn-ghost btn-sm" onclick="Ingredients.showForm('${i.id}')">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="Ingredients.del('${i.id}')">🗑️</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`}
      <div class="summary-footer">
        <span class="summary-total-label">Total ingredientes registrados</span>
        <span class="summary-total-value">${State.data.ingredients.length}</span>
      </div>
    `;
  },

  showForm(id) {
    const ing = id ? State.data.ingredients.find(i => i.id === id) : null;
    const isEdit = !!ing;
    const catOptions = Object.entries(INGREDIENT_CATS).map(([k, v]) =>
      `<option value="${k}"${ing && ing.category === k ? ' selected' : ''}>${v.icon} ${v.label}</option>`).join('');

    const html = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nombre</label>
          <input class="form-input" id="ing-name" value="${ing ? ing.name : ''}" placeholder="Ej: Proteína Whey">
        </div>
        <div class="form-group">
          <label class="form-label">Categoría</label>
          <select class="form-input" id="ing-category">${catOptions}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Unidad de Medida</label>
          <select class="form-input" id="ing-unit" onchange="Ingredients.updateCostPreview()">
            <option value="g"${ing && ing.unit === 'g' ? ' selected' : ''}>Gramos (g)</option>
            <option value="ml"${ing && ing.unit === 'ml' ? ' selected' : ''}>Mililitros (ml)</option>
            <option value="unidad"${ing && ing.unit === 'unidad' ? ' selected' : ''}>Unidad</option>
          </select>
        </div>
      </div>
      <hr style="border-color:var(--border);margin:12px 0">
      <label class="form-label" style="margin-bottom:8px">📦 Datos de Compra</label>
      <div class="form-row" style="grid-template-columns:1fr 1fr">
        <div class="form-group">
          <label class="form-label" style="font-size:0.68rem">¿Cuánto compraste?</label>
          <input class="form-input" id="ing-purchase-qty" type="number" min="0" step="1" value="${ing ? (ing.purchaseQty || '') : ''}" placeholder="Ej: 1000" oninput="Ingredients.updateCostPreview()">
          <p class="form-hint">Cantidad en la unidad seleccionada</p>
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:0.68rem">¿Cuánto te costó? (COP)</label>
          <input class="form-input" id="ing-purchase-price" type="number" min="0" step="1" value="${ing ? (ing.purchasePrice || '') : ''}" placeholder="Ej: 100000" oninput="Ingredients.updateCostPreview()">
          <p class="form-hint">Precio total de esa compra</p>
        </div>
      </div>
      <div id="ing-cost-preview" class="card" style="padding:14px;background:var(--bg-primary);margin-top:4px"></div>
    `;

    Modal.show(isEdit ? 'Editar Ingrediente' : 'Nuevo Ingrediente', html, () => {
      const name = document.getElementById('ing-name').value.trim();
      const category = document.getElementById('ing-category').value;
      const unit = document.getElementById('ing-unit').value;
      const purchaseQty = parseFloat(document.getElementById('ing-purchase-qty').value) || 0;
      const purchasePrice = parseFloat(document.getElementById('ing-purchase-price').value) || 0;
      if (!name) { Toast.show('El nombre es obligatorio', 'error'); return; }
      if (purchaseQty <= 0) { Toast.show('Ingresa la cantidad comprada', 'error'); return; }
      if (purchasePrice <= 0) { Toast.show('Ingresa el precio de compra', 'error'); return; }
      const costPerUnit = purchasePrice / purchaseQty;

      if (isEdit) {
        Object.assign(ing, { name, category, unit, purchaseQty, purchasePrice, costPerUnit });
        Cloud.saveIngredient(ing, false);
        Toast.show('Ingrediente actualizado');
      } else {
        const newIng = { id: U.id('ing'), name, category, unit, purchaseQty, purchasePrice, costPerUnit };
        State.data.ingredients.push(newIng);
        Cloud.saveIngredient(newIng, true);
        Toast.show('Ingrediente agregado');
      }
      Modal.hide();
      this.render();
    });
    this.updateCostPreview();
  },

  updateCostPreview() {
    const preview = document.getElementById('ing-cost-preview');
    if (!preview) return;
    const qty = parseFloat(document.getElementById('ing-purchase-qty').value) || 0;
    const price = parseFloat(document.getElementById('ing-purchase-price').value) || 0;
    const unit = document.getElementById('ing-unit').value;
    if (qty > 0 && price > 0) {
      const cpu = price / qty;
      preview.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div><div style="font-size:0.68rem;color:var(--text-muted)">COMPRASTE</div><div style="font-size:1rem;font-weight:600">${qty.toLocaleString('es-CO')} ${unit}</div></div>
          <div><div style="font-size:0.68rem;color:var(--text-muted)">POR</div><div style="font-size:1rem;font-weight:600">${U.fmt(price)}</div></div>
          <div style="text-align:right"><div style="font-size:0.68rem;color:var(--text-muted)">COSTO POR ${unit.toUpperCase()}</div><div style="font-size:1.3rem;font-weight:800;color:var(--accent)">${U.fmt(cpu)} / ${unit}</div></div>
        </div>`;
    } else {
      preview.innerHTML = '<p style="color:var(--text-muted);font-size:0.8rem;text-align:center">Ingresa la cantidad y precio de compra para calcular el costo por unidad automáticamente</p>';
    }
  },

  del(id) {
    Confirm.show('¿Eliminar este ingrediente?', () => {
      State.data.ingredients = State.data.ingredients.filter(i => i.id !== id);
      Cloud.deleteIngredient(id);
      this.render();
      Toast.show('Ingrediente eliminado');
    });
  }
};

// ============================================
// PRODUCTS MODULE
// ============================================
const Products = {
  filter: '',
  tempIngs: [],

  render() {
    const container = document.getElementById('tab-products');
    const prods = State.data.products.filter(p => !this.filter || p.category === this.filter);

    const catTabs = Object.entries(PRODUCT_CATS).map(([k, v]) =>
      `<button class="toggle-option${this.filter === k ? ' active' : ''}" onclick="Products.filter='${k}';Products.render()">${v.icon} ${v.label}</button>`).join('');

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">📦 <span>Productos</span></h2>
        <button class="btn btn-primary" onclick="Products.showForm()">+ Nuevo Producto</button>
      </div>
      <div class="toggle-group" style="margin-bottom:20px;flex-wrap:wrap">
        <button class="toggle-option${!this.filter ? ' active' : ''}" onclick="Products.filter='';Products.render()">Todos</button>
        ${catTabs}
      </div>
      ${prods.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📦</div><p class="empty-state-text">No hay productos en esta categoría</p></div>' : `
      <div class="products-grid">
        ${prods.map(p => this.renderCard(p)).join('')}
      </div>`}
    `;
  },

  renderCard(p) {
    const vc = U.prodVarCost(p);
    const price = U.getProductPrice(p);
    const margin = U.marginFromPrice(vc, price);
    const profit = price - vc;
    const cat = PRODUCT_CATS[p.category] || PRODUCT_CATS.otros;

    return `
      <div class="product-card" onclick="Products.showForm('${p.id}')">
        <div class="product-actions">
          <button class="btn btn-danger-ghost btn-icon btn-sm" onclick="event.stopPropagation();Products.del('${p.id}')">🗑️</button>
        </div>
        <div class="product-card-header">
          <div>
            <div class="product-name">${p.name}</div>
            ${p.subtitle ? `<div class="product-subtitle">${p.subtitle}</div>` : ''}
          </div>
          <span class="badge">${cat.icon} ${cat.label}</span>
        </div>
        <div class="product-cost-row">
          <span class="product-cost-label">Costo Variable</span>
          <span class="product-cost-value">${U.fmt(vc)}</span>
        </div>
        <div class="product-cost-row">
          <span class="product-cost-label">Tipo</span>
          <span class="product-cost-value">${p.type === 'composite' ? 'Compuesto' : 'Simple'}</span>
        </div>
        <div class="product-cost-row">
          <span class="product-cost-label">Ganancia/unidad</span>
          <span class="product-cost-value" style="color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'}">${U.fmt(profit)}</span>
        </div>
        <div class="product-price-block">
          <span class="product-price">${U.fmt(price)}</span>
          <span class="product-margin ${U.marginClass(margin)}">${U.pct(margin)} margen</span>
        </div>
      </div>
    `;
  },

  showForm(id) {
    const p = id ? State.data.products.find(x => x.id === id) : null;
    const isEdit = !!p;
    this.tempIngs = p ? JSON.parse(JSON.stringify(p.ingredients || [])) : [];

    const catOptions = Object.entries(PRODUCT_CATS).map(([k, v]) =>
      `<option value="${k}"${p && p.category === k ? ' selected' : ''}>${v.icon} ${v.label}</option>`).join('');

    const html = `
      <div class="form-row">
        <div class="form-group"><label class="form-label">Nombre</label>
          <input class="form-input" id="prod-name" value="${p ? p.name : ''}" placeholder="Mega Bulk">
        </div>
        <div class="form-group"><label class="form-label">Subtítulo</label>
          <input class="form-input" id="prod-subtitle" value="${p ? (p.subtitle || '') : ''}" placeholder="Aumentar">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Categoría</label>
          <select class="form-input" id="prod-category">${catOptions}</select>
        </div>
        <div class="form-group"><label class="form-label">Tipo</label>
          <select class="form-input" id="prod-type" onchange="Products.toggleType()">
            <option value="composite"${!p || p.type === 'composite' ? ' selected' : ''}>Compuesto (ingredientes)</option>
            <option value="simple"${p && p.type === 'simple' ? ' selected' : ''}>Simple (costo directo)</option>
          </select>
        </div>
      </div>
      <div id="prod-composite-section"${p && p.type === 'simple' ? ' style="display:none"' : ''}>
        <label class="form-label" style="margin-top:8px">Ingredientes del Producto</label>
        <div id="prod-ing-list"></div>
        <div class="add-ingredient-row" style="margin-top:8px">
          <select id="prod-add-ing-select"><option value="">+ Seleccionar ingrediente...</option>
            ${State.data.ingredients.map(i => `<option value="${i.id}">${i.name} (${U.fmt(i.costPerUnit)}/${i.unit})</option>`).join('')}
          </select>
          <button class="btn btn-ghost btn-sm" onclick="Products.addTempIng()">Agregar</button>
        </div>
      </div>
      <div id="prod-simple-section"${!p || p.type !== 'simple' ? ' style="display:none"' : ''}>
        <div class="form-group"><label class="form-label">Costo Directo (COP)</label>
          <input class="form-input" id="prod-direct-cost" type="number" min="0" value="${p ? p.directCost : 0}">
        </div>
      </div>
      <hr style="border-color:var(--border);margin:16px 0">
      <label class="form-label">Precio de Venta</label>
      <div class="form-row">
        <div class="form-group"><label class="form-label" style="font-size:0.68rem">Modo</label>
          <select class="form-input" id="prod-price-mode" onchange="Products.updatePricePreview()">
            <option value="manual"${!p || p.priceMode === 'manual' ? ' selected' : ''}>Definir precio manual</option>
            <option value="margin"${p && p.priceMode === 'margin' ? ' selected' : ''}>Calcular desde margen</option>
          </select>
        </div>
        <div class="form-group" id="prod-margin-group"><label class="form-label" style="font-size:0.68rem">Margen deseado (%)</label>
          <input class="form-input" id="prod-margin" type="number" min="1" max="99" value="${p ? p.targetMargin : 40}" onchange="Products.updatePricePreview()">
        </div>
        <div class="form-group" id="prod-price-group"><label class="form-label" style="font-size:0.68rem">Precio (COP)</label>
          <input class="form-input" id="prod-price" type="number" min="0" value="${p ? p.sellingPrice : 0}" onchange="Products.updatePricePreview()">
        </div>
      </div>
      <div id="prod-price-preview" class="card" style="padding:12px;margin-top:8px;background:var(--bg-primary)"></div>
    `;

    Modal.show(isEdit ? 'Editar Producto' : 'Nuevo Producto', html, () => {
      const name = document.getElementById('prod-name').value.trim();
      if (!name) { Toast.show('El nombre es obligatorio', 'error'); return; }

      const obj = {
        id: p ? p.id : U.id('prod'),
        name,
        subtitle: document.getElementById('prod-subtitle').value.trim(),
        category: document.getElementById('prod-category').value,
        type: document.getElementById('prod-type').value,
        ingredients: this.tempIngs,
        directCost: parseFloat(document.getElementById('prod-direct-cost').value) || 0,
        targetMargin: parseFloat(document.getElementById('prod-margin').value) || 40,
        sellingPrice: parseFloat(document.getElementById('prod-price').value) || 0,
        priceMode: document.getElementById('prod-price-mode').value,
      };

      if (isEdit) {
        const idx = State.data.products.findIndex(x => x.id === id);
        State.data.products[idx] = obj;
        Cloud.saveProduct(obj, false);
        Toast.show('Producto actualizado');
      } else {
        State.data.products.push(obj);
        Cloud.saveProduct(obj, true);
        Toast.show('Producto agregado');
      }
      Modal.hide();
      this.render();
    });

    this.renderTempIngs();
    this.updatePricePreview();
  },

  toggleType() {
    const type = document.getElementById('prod-type').value;
    document.getElementById('prod-composite-section').style.display = type === 'composite' ? '' : 'none';
    document.getElementById('prod-simple-section').style.display = type === 'simple' ? '' : 'none';
    this.updatePricePreview();
  },

  renderTempIngs() {
    const el = document.getElementById('prod-ing-list');
    if (!el) return;
    if (this.tempIngs.length === 0) {
      el.innerHTML = '<p style="color:var(--text-muted);font-size:0.8rem;padding:8px">Sin ingredientes agregados</p>';
      return;
    }
    let total = 0;
    const rows = this.tempIngs.map((item, idx) => {
      const ing = U.getIng(item.ingredientId);
      if (!ing) return '';
      const sub = ing.costPerUnit * item.quantity;
      total += sub;
      return `<div class="ingredient-list-row">
        <span>${ing.name}</span>
        <input type="number" min="0" value="${item.quantity}" onchange="Products.updateTempIngQty(${idx},this.value)">
        <span style="color:var(--text-muted)">${ing.unit}</span>
        <span style="color:var(--text-muted)">${U.fmt(ing.costPerUnit)}</span>
        <span style="font-weight:600">${U.fmt(sub)}</span>
        <button class="btn btn-danger-ghost btn-icon btn-sm" onclick="Products.removeTempIng(${idx})" style="width:24px;height:24px;font-size:0.7rem">✕</button>
      </div>`;
    }).join('');

    el.innerHTML = `
      <div class="ingredient-list">
        <div class="ingredient-list-header"><span>Ingrediente</span><span>Cant.</span><span>Ud.</span><span>$/Ud</span><span>Subtotal</span><span></span></div>
        ${rows}
        <div class="ingredient-list-total"><span>Costo Variable Total</span><span style="color:var(--accent)">${U.fmt(total)}</span></div>
      </div>`;
    this.updatePricePreview();
  },

  addTempIng() {
    const sel = document.getElementById('prod-add-ing-select');
    const ingId = sel.value;
    if (!ingId) return;
    if (this.tempIngs.find(x => x.ingredientId === ingId)) { Toast.show('Ya está agregado', 'info'); return; }
    this.tempIngs.push({ ingredientId: ingId, quantity: 1 });
    sel.value = '';
    this.renderTempIngs();
  },

  updateTempIngQty(idx, val) {
    this.tempIngs[idx].quantity = parseFloat(val) || 0;
    this.renderTempIngs();
  },

  removeTempIng(idx) {
    this.tempIngs.splice(idx, 1);
    this.renderTempIngs();
  },

  updatePricePreview() {
    const preview = document.getElementById('prod-price-preview');
    if (!preview) return;
    const type = document.getElementById('prod-type').value;
    let vc = 0;
    if (type === 'composite') {
      vc = this.tempIngs.reduce((t, item) => { const i = U.getIng(item.ingredientId); return t + (i ? i.costPerUnit * item.quantity : 0); }, 0);
    } else {
      vc = parseFloat(document.getElementById('prod-direct-cost').value) || 0;
    }
    const mode = document.getElementById('prod-price-mode').value;
    let price, margin;
    if (mode === 'margin') {
      margin = parseFloat(document.getElementById('prod-margin').value) || 40;
      price = U.priceFromMargin(vc, margin);
      document.getElementById('prod-price').value = Math.round(price);
    } else {
      price = parseFloat(document.getElementById('prod-price').value) || 0;
      margin = U.marginFromPrice(vc, price);
    }
    const profit = price - vc;
    preview.innerHTML = `
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div><div style="font-size:0.68rem;color:var(--text-muted)">COSTO VARIABLE</div><div style="font-size:1.1rem;font-weight:700">${U.fmt(vc)}</div></div>
        <div><div style="font-size:0.68rem;color:var(--text-muted)">PRECIO VENTA</div><div style="font-size:1.1rem;font-weight:700;color:var(--accent)">${U.fmt(price)}</div></div>
        <div><div style="font-size:0.68rem;color:var(--text-muted)">MARGEN</div><div style="font-size:1.1rem;font-weight:700;color:var(--${margin >= 35 ? 'accent' : margin >= 20 ? 'warning' : 'danger'})">${U.pct(margin)}</div></div>
        <div><div style="font-size:0.68rem;color:var(--text-muted)">GANANCIA/UD</div><div style="font-size:1.1rem;font-weight:700;color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'}">${U.fmt(profit)}</div></div>
      </div>`;
  },

  del(id) {
    Confirm.show('¿Eliminar este producto?', () => {
      State.data.products = State.data.products.filter(p => p.id !== id);
      Cloud.deleteProduct(id);
      this.render();
      Toast.show('Producto eliminado');
    });
  }
};

// ============================================
// FIXED COSTS MODULE
// ============================================
const FixedCosts = {
  render() {
    const container = document.getElementById('tab-costs');
    const fcs = State.data.fixedCosts;
    const total = U.totalFixed();
    const catOptions = Object.entries(COST_CATS).map(([k, v]) => `<option value="${k}">${v.icon} ${v.label}</option>`).join('');

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">🏢 <span>Costos Fijos Mensuales</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn-primary" onclick="FixedCosts.showForm()">+ Agregar</button>
        </div>
      </div>
      ${fcs.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">🏢</div><p class="empty-state-text">No hay costos fijos registrados</p></div>' : `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr>
            <th>Rubro</th><th>Categoría</th><th class="align-right">Monto Mensual</th><th class="align-right">% del Total</th><th class="align-right">Acciones</th>
          </tr></thead>
          <tbody>
            ${fcs.map(fc => {
              const cat = COST_CATS[fc.category] || COST_CATS.otros;
              const pct = total > 0 ? (fc.amount / total) * 100 : 0;
              return `<tr>
                <td><strong>${fc.name}</strong></td>
                <td><span class="badge ${fc.category === 'financiero' ? 'warning' : ''}">${cat.icon} ${cat.label}</span></td>
                <td class="align-right text-mono">${U.fmt(fc.amount)}</td>
                <td class="align-right text-mono" style="color:var(--text-muted)">${U.pct(pct)}</td>
                <td class="align-right">
                  <button class="btn btn-ghost btn-sm" onclick="FixedCosts.showForm('${fc.id}')">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="FixedCosts.del('${fc.id}')">🗑️</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`}
      <div class="summary-footer">
        <div>
          <span class="summary-total-label">Total Costos Fijos Mensuales</span>
        </div>
        <span class="summary-total-value">${U.fmt(total)}</span>
      </div>
    `;
  },

  showForm(id) {
    const fc = id ? State.data.fixedCosts.find(x => x.id === id) : null;
    const isEdit = !!fc;
    const catOptions = Object.entries(COST_CATS).map(([k, v]) =>
      `<option value="${k}"${fc && fc.category === k ? ' selected' : ''}>${v.icon} ${v.label}</option>`).join('');

    const html = `
      <div class="form-group"><label class="form-label">Nombre del Rubro</label>
        <input class="form-input" id="fc-name" value="${fc ? fc.name : ''}" placeholder="Ej: Renta del Local">
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Categoría</label>
          <select class="form-input" id="fc-category">${catOptions}</select>
        </div>
        <div class="form-group"><label class="form-label">Monto Mensual (COP)</label>
          <input class="form-input" id="fc-amount" type="number" min="0" value="${fc ? fc.amount : ''}" placeholder="Ej: 2000000">
        </div>
      </div>
    `;

    Modal.show(isEdit ? 'Editar Costo Fijo' : 'Nuevo Costo Fijo', html, () => {
      const name = document.getElementById('fc-name').value.trim();
      const category = document.getElementById('fc-category').value;
      const amount = parseFloat(document.getElementById('fc-amount').value) || 0;
      if (!name) { Toast.show('El nombre es obligatorio', 'error'); return; }
      if (amount <= 0) { Toast.show('El monto debe ser mayor a 0', 'error'); return; }

      if (isEdit) {
        Object.assign(fc, { name, category, amount });
        Cloud.saveFixedCost(fc, false);
        Toast.show('Costo fijo actualizado');
      } else {
        const newFc = { id: U.id('fc'), name, category, amount };
        State.data.fixedCosts.push(newFc);
        Cloud.saveFixedCost(newFc, true);
        Toast.show('Costo fijo agregado');
      }
      Modal.hide(); this.render();
    });
  },

  del(id) {
    Confirm.show('¿Eliminar este costo fijo?', () => {
      State.data.fixedCosts = State.data.fixedCosts.filter(x => x.id !== id);
      Cloud.deleteFixedCost(id);
      this.render(); Toast.show('Costo fijo eliminado');
    });
  }
};

// ============================================
// DASHBOARD MODULE
// ============================================
const Dashboard = {
  render() {
    const container = document.getElementById('tab-dashboard');
    const totalFixed = U.totalFixed();
    const prods = State.data.products;
    const prodsWithPrice = prods.filter(p => U.getProductPrice(p) > 0);
    const breakEven = U.breakEven();
    const avgMargin = U.avgMargin();

    const sortedProds = [...prodsWithPrice].map(p => {
      const vc = U.prodVarCost(p);
      const price = U.getProductPrice(p);
      return { p, margin: U.marginFromPrice(vc, price) };
    }).sort((a,b) => b.margin - a.margin);

    const top5 = sortedProds.slice(0, 5);
    const bottom5 = [...sortedProds].sort((a,b) => a.margin - b.margin).slice(0, 5);

    const profile = State.data.settings.salesProfile || { preparaciones: 40, suplementos: 40, snacks: 15, ropa: 5 };
    const totalProfile = Object.values(profile).reduce((a,b)=>a+b,0);
    const sumValid = Math.abs(totalProfile - 100) < 0.1;

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">📊 <span>Dashboard Estratégico</span></h2>
        <div style="font-size:0.78rem;color:var(--text-muted)">Visualizando ${prodsWithPrice.length} de ${prods.length} productos del catálogo</div>
      </div>

      <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 20px;">
        <div class="metric-card" style="grid-column: 1 / -1; background: var(--bg-primary); border: 1px solid var(--border); padding-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <div>
              <div class="metric-label" style="color:var(--text-primary); font-weight:700; font-size:1rem;">🎯 Perfil de Ventas Histórico</div>
              <div class="metric-detail" style="margin-top:4px">Peso de ingresos para cálculo de Margen Ponderado (Debe sumar 100%)</div>
            </div>
            ${!sumValid ? `<span style="color:var(--danger);font-size:0.8rem;background:rgba(255,82,82,0.1);padding:4px 8px;border-radius:4px">⚠️ Suma: ${totalProfile}%</span>` : `<span style="color:var(--success);font-size:0.8rem;background:rgba(0,230,118,0.1);padding:4px 8px;border-radius:4px">✅ 100% Validado</span>`}
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${Object.entries({
              preparaciones: { label: '🥤 Preparaciones', val: profile.preparaciones },
              suplementos: { label: '💊 Suplementos', val: profile.suplementos },
              snacks: { label: '🍫 Snacks/Beb.', val: profile.snacks },
              ropa: { label: '👕 Ropa/Otros', val: profile.ropa }
            }).map(([k, v]) => `
              <div style="flex:1; min-width: 140px; background: rgba(255,255,255,0.02); padding: 10px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px; font-weight:500;">${v.label}</div>
                <div style="display:flex; align-items:center; gap: 6px;">
                  <input type="number" min="0" max="100" value="${v.val}" 
                    onchange="if(!State.data.settings.salesProfile) State.data.settings.salesProfile={preparaciones:40,suplementos:40,snacks:15,ropa:5}; State.data.settings.salesProfile['${k}'] = parseFloat(this.value)||0; Cloud.saveSettings(State.data.settings); Dashboard.render();"
                    style="flex: 1; padding: 6px; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: #fff; border-radius: 4px; text-align: center; font-size:1rem; font-weight:600;">
                  <span style="color:var(--text-muted);font-size:0.85rem">%</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">🏢</div>
          <div class="metric-label">Costos Fijos / Mes</div>
          <div class="metric-value">${U.fmt(totalFixed)}</div>
          <div class="metric-detail">${State.data.fixedCosts.length} rubros actuales</div>
        </div>
        <div class="metric-card info">
          <div class="metric-icon">📦</div>
          <div class="metric-label">Productos Listos</div>
          <div class="metric-value">${prodsWithPrice.length} <span style="font-size:1.2rem;opacity:0.6">/ ${prods.length}</span></div>
          <div class="metric-detail">Con precio definido</div>
        </div>
        <div class="metric-card ${breakEven !== Infinity ? '' : 'danger'}">
          <div class="metric-icon">🎯</div>
          <div class="metric-label">Meta de Equilibrio (Ventas)</div>
          <div class="metric-value accent">${breakEven === Infinity ? '∞' : U.fmt(breakEven)}</div>
          <div class="metric-detail">Ingreso mensual para no perder</div>
        </div>
        <div class="metric-card ${avgMargin >= 35 ? '' : avgMargin >= 20 ? 'warning' : 'danger'}">
          <div class="metric-icon">📈</div>
          <div class="metric-label">Margen Promedio Real</div>
          <div class="metric-value ${U.marginValClass(avgMargin)}">${U.pct(avgMargin)}</div>
          <div class="metric-detail">${avgMargin >= 35 ? 'Saludable' : avgMargin >= 20 ? 'Ajustado' : 'Crítico'}</div>
        </div>
      </div>

      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
        <div class="metric-card">
          <div class="metric-icon">⭐</div>
          <div class="metric-label" style="margin-bottom:12px;color:var(--text-primary)">Top 5 Más Rentables</div>
          <div class="metric-value" style="font-size:0.9rem;font-weight:600;display:flex;flex-direction:column;gap:8px">
            ${top5.length ? top5.map(x => `<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.05)"><span class="ellipsis" style="max-width:75%;font-weight:500;color:var(--text-secondary)">${x.p.name}</span> <span style="color:var(--success)">${U.pct(x.margin)}</span></div>`).join('') : '<span style="color:var(--text-muted)">Sin datos</span>'}
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⚠️</div>
          <div class="metric-label" style="margin-bottom:12px;color:var(--text-primary)">Top 5 Críticos (A Vigilar)</div>
          <div class="metric-value" style="font-size:0.9rem;font-weight:600;display:flex;flex-direction:column;gap:8px">
            ${bottom5.length ? bottom5.map(x => `<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.05)"><span class="ellipsis" style="max-width:75%;font-weight:500;color:var(--text-secondary)">${x.p.name}</span> <span style="color:${x.margin < 20 ? 'var(--danger)' : 'var(--warning)'}">${U.pct(x.margin)}</span></div>`).join('') : '<span style="color:var(--text-muted)">Sin datos</span>'}
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-title">💹 Margen por Producto <span style="font-weight:400;color:var(--text-muted);font-size:0.72rem">(${prodsWithPrice.length} con precio)</span></div>
        ${prodsWithPrice.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem">Agrega precios a tus productos para ver el gráfico</p>' : `
        <div class="hbar-chart-scroll">
          ${[...prodsWithPrice].sort((a,b) => {
            const mA = U.marginFromPrice(U.prodVarCost(a), U.getProductPrice(a));
            const mB = U.marginFromPrice(U.prodVarCost(b), U.getProductPrice(b));
            return mB - mA;
          }).map(p => {
            const vc = U.prodVarCost(p);
            const price = U.getProductPrice(p);
            const margin = U.marginFromPrice(vc, price);
            const w = Math.max(3, Math.min(100, margin * 1.5));
            const cls = margin >= 35 ? 'good' : margin >= 20 ? 'ok' : 'low';
            return `<div class="hbar-row">
              <div class="hbar-name" title="${p.name}">${p.name}</div>
              <div class="hbar-track">
                <div class="hbar-fill hbar-${cls}" style="width:${w}%"></div>
              </div>
              <div class="hbar-value hbar-${cls}-text">${U.pct(margin)}</div>
            </div>`;
          }).join('')}
        </div>`}
      </div>

      <div class="chart-card" style="margin-top:0">
        <div class="chart-title">📋 Resumen de Precios por Producto <span style="font-weight:400;color:var(--text-muted);font-size:0.72rem">(${prodsWithPrice.length} de ${prods.length} con precio)</span></div>
        ${prodsWithPrice.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem">Agrega precios a tus productos para ver el resumen</p>' : `
        <div class="data-table-wrapper" style="border:none;max-height:420px;overflow-y:auto">
          <table class="data-table">
            <thead><tr style="position:sticky;top:0;z-index:1">
              <th>Producto</th><th class="align-right">Costo Variable</th><th class="align-right">Precio Venta</th>
              <th class="align-right">Contribución</th><th class="align-right">Margen</th>
            </tr></thead>
            <tbody>
              ${prodsWithPrice.map(p => {
                const vc = U.prodVarCost(p);
                const price = U.getProductPrice(p);
                const cm = price - vc;
                const margin = U.marginFromPrice(vc, price);
                return `<tr>
                  <td><strong>${p.name}</strong> ${p.subtitle ? `<span style="color:var(--text-muted);font-size:0.75rem">${p.subtitle}</span>` : ''}</td>
                  <td class="align-right text-mono">${U.fmt(vc)}</td>
                  <td class="align-right text-mono" style="color:var(--accent);font-weight:600">${U.fmt(price)}</td>
                  <td class="align-right text-mono" style="color:${cm >= 0 ? 'var(--success)' : 'var(--danger)'}">${U.fmt(cm)}</td>
                  <td class="align-right"><span class="product-margin ${U.marginClass(margin)}">${U.pct(margin)}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`}
      </div>
    `;
  },

  renderDonut(fixed, variable) {
    const total = fixed + variable;
    if (total === 0) return '<p style="color:var(--text-muted)">Sin datos</p>';
    const fixedPct = (fixed / total * 100).toFixed(1);
    const varPct = (variable / total * 100).toFixed(1);
    return `
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;justify-content:center">
        <div class="donut-chart" style="background:conic-gradient(var(--accent) 0% ${fixedPct}%, var(--info) ${fixedPct}% 100%)">
          <div class="donut-center">
            <div class="donut-center-value">${U.fmt(total)}</div>
            <div class="donut-center-label">Total/mes</div>
          </div>
        </div>
        <div class="donut-legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>Fijos: ${U.fmt(fixed)} (${fixedPct}%)</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--info)"></div>Variables: ${U.fmt(variable)} (${varPct}%)</div>
        </div>
      </div>`;
  }
};

// ============================================
// SIMULATOR MODULE — 3 MODES
// ============================================
const SIM_GROUPS = {
  preparaciones: { label: 'Preparaciones', icon: '🥤', desc: 'Batidos, Bowls, Parfaits, Waffles, Alimentos', cats: ['batidos','bowls','parfaits','waffles','alimentos','bebidas'] },
  tienda: { label: 'Tienda / Suplementos', icon: '💊', desc: 'Proteínas, Suplementación, Creatinas', cats: ['proteinas_tienda','suplementacion'] },
  ropa: { label: 'Ropa y Accesorios', icon: '👕', desc: 'Ropa deportiva, Shakers, Accesorios', cats: ['ropa','accesorios'] },
  snacks: { label: 'Snacks y Otros', icon: '🍫', desc: 'Snacks, Bebidas, Insumos, Otros', cats: ['snacks','insumos','otros'] }
};

const Simulator = {
  mode: 'goal',       // 'goal' | 'crisis' | 'mix'
  crisisAdj: [],      // crisis mode adjustments
  mixRevenues: {},     // mix mode: { groupKey: amount }
  goalTarget: 0,       // goal mode target profit
  
  // --- Helpers ---
  _avgMarginForGroup(groupKey, ingOverrides) {
    const cats = SIM_GROUPS[groupKey].cats;
    const prods = State.data.products.filter(p => cats.includes(p.category) && U.getProductPrice(p) > 0);
    if (prods.length === 0) return 0;
    let totalM = 0;
    prods.forEach(p => {
      const vc = U.prodVarCost(p, ingOverrides);
      const price = U.getProductPrice(p);
      totalM += price > 0 ? (price - vc) / price : 0;
    });
    return totalM / prods.length;
  },

  _globalAvgMargin(ingOverrides) {
    const prods = State.data.products.filter(p => U.getProductPrice(p) > 0);
    if (prods.length === 0) return 0;
    let totalM = 0;
    prods.forEach(p => {
      const vc = U.prodVarCost(p, ingOverrides);
      const price = U.getProductPrice(p);
      totalM += price > 0 ? (price - vc) / price : 0;
    });
    return totalM / prods.length;
  },

  _countProdsInGroup(groupKey) {
    const cats = SIM_GROUPS[groupKey].cats;
    return State.data.products.filter(p => cats.includes(p.category) && U.getProductPrice(p) > 0).length;
  },

  // --- Render ---
  render() {
    const container = document.getElementById('tab-simulator');
    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">🔬 <span>Simulador de Escenarios</span></h2>
      </div>
      <div class="sim-mode-tabs">
        <button class="sim-mode-tab ${this.mode === 'goal' ? 'active' : ''}" onclick="Simulator.mode='goal';Simulator.render()">🎯 Buscar Objetivo</button>
        <button class="sim-mode-tab ${this.mode === 'crisis' ? 'active' : ''}" onclick="Simulator.mode='crisis';Simulator.render()">⚠️ Crisis / Ajuste</button>
        <button class="sim-mode-tab ${this.mode === 'mix' ? 'active' : ''}" onclick="Simulator.mode='mix';Simulator.render()">📊 Mix de Ventas</button>
      </div>
      <div class="sim-mode-content">
        ${this.mode === 'goal' ? this._renderGoal() : this.mode === 'crisis' ? this._renderCrisis() : this._renderMix()}
      </div>
    `;
  },

  // =============================================
  // MODE 1: GOAL SEEK
  // =============================================
  _renderGoal() {
    const totalFixed = U.totalFixed();
    const avgMargin = this._globalAvgMargin();
    const prodsWithPrice = State.data.products.filter(p => U.getProductPrice(p) > 0).length;
    const target = this.goalTarget || 0;

    const grossNeeded = totalFixed + target;
    const revenueNeeded = avgMargin > 0 ? Math.ceil(grossNeeded / avgMargin) : Infinity;
    const breakEvenRevenue = avgMargin > 0 ? Math.ceil(totalFixed / avgMargin) : Infinity;
    const dailyTarget = revenueNeeded !== Infinity ? Math.ceil(revenueNeeded / 30) : Infinity;

    return `
      <div class="sim-layout">
        <div class="sim-panel">
          <div class="sim-panel-title">🎯 ¿Cuánto quieres ganar al mes?</div>
          <p style="color:var(--text-muted);font-size:0.8rem;margin-bottom:16px">
            Ingresa tu ganancia mensual deseada y el sistema te dirá exactamente cuánto necesitas vender.
          </p>
          <div class="form-group">
            <label class="form-label">Ganancia Mensual Deseada (COP)</label>
            <input class="form-input" id="goal-target" type="number" min="0" 
              value="${target || ''}" placeholder="Ej: 5000000"
              oninput="Simulator.goalTarget=parseFloat(this.value)||0;Simulator.render()">
          </div>
          <div style="margin-top:16px;padding:16px;background:var(--bg-primary);border-radius:var(--radius-md);border:1px solid var(--border)">
            <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;font-weight:600;margin-bottom:6px">Datos Base del Negocio</div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.82rem">
              <span style="color:var(--text-secondary)">Costos Fijos / Mes</span>
              <span style="font-weight:600">${U.fmt(totalFixed)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.82rem">
              <span style="color:var(--text-secondary)">Margen Promedio</span>
              <span style="font-weight:600;color:${avgMargin * 100 >= 35 ? 'var(--accent)' : 'var(--warning)'}">${U.pct(avgMargin * 100)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.82rem">
              <span style="color:var(--text-secondary)">Productos con precio</span>
              <span style="font-weight:600">${prodsWithPrice} de ${State.data.products.length}</span>
            </div>
          </div>
        </div>
        <div class="sim-panel">
          <div class="sim-panel-title">📋 Resultado</div>
          ${avgMargin <= 0 || prodsWithPrice === 0 ? 
            '<div class="empty-state" style="padding:20px"><div class="empty-state-icon">⚠️</div><p class="empty-state-text">Agrega precios a tus productos para poder calcular</p></div>' : `
          <div class="goal-result-card">
            <div class="goal-result-label">Necesitas facturar al mes</div>
            <div class="goal-result-value accent">${revenueNeeded === Infinity ? '∞' : U.fmt(revenueNeeded)}</div>
            <div class="goal-result-detail">${dailyTarget === Infinity ? '' : U.fmt(dailyTarget) + ' diarios (30 días)'}</div>
          </div>
          <div style="margin-top:16px">
            <div class="comparison-row">
              <span class="comp-label">💰 Ganancia deseada</span>
              <span style="font-weight:700;color:var(--accent)">${U.fmt(target)}</span>
            </div>
            <div class="comparison-row">
              <span class="comp-label">🏢 Costos fijos a cubrir</span>
              <span style="font-weight:600">${U.fmt(totalFixed)}</span>
            </div>
            <div class="comparison-row">
              <span class="comp-label">📦 Margen bruto necesario</span>
              <span style="font-weight:600">${U.fmt(grossNeeded)}</span>
            </div>
            <div class="comparison-row">
              <span class="comp-label">📈 Con margen del ${U.pct(avgMargin * 100)}</span>
              <span style="font-weight:700;color:var(--accent)">${revenueNeeded === Infinity ? '∞' : U.fmt(revenueNeeded)}</span>
            </div>
            <div class="comparison-row" style="border-bottom:none">
              <span class="comp-label">⚖️ Punto de Equilibrio (solo cubrir gastos)</span>
              <span style="font-weight:600;color:var(--warning)">${breakEvenRevenue === Infinity ? '∞' : U.fmt(breakEvenRevenue)}</span>
            </div>
          </div>`}
        </div>
      </div>`;
  },

  // =============================================
  // MODE 2: CRISIS / ADJUSTMENT
  // =============================================
  _renderCrisis() {
    const ingOptions = State.data.ingredients.map(i => `<option value="ing:${i.id}">${i.name} (ingrediente)</option>`).join('');
    const simpleProds = State.data.products.filter(p => p.type === 'simple' && p.directCost > 0);
    const prodOptions = simpleProds.map(p => `<option value="prod:${p.id}">${p.name} (producto)</option>`).join('');
    const fcOptions = State.data.fixedCosts.map(fc => `<option value="fc:${fc.id}">${fc.name}</option>`).join('');
    const allCostOptions = (ingOptions || prodOptions) ? `<option value="">Seleccionar insumo...</option>${ingOptions}${prodOptions}` : '<option value="">Sin insumos</option>';
    const allFcOptions = fcOptions ? `<option value="">Seleccionar costo fijo...</option>${fcOptions}` : '<option value="">Sin costos fijos</option>';

    const results = this._calcCrisis();

    return `
      <div class="sim-layout">
        <div class="sim-panel">
          <div class="sim-panel-title">⚠️ Simular Aumentos de Costos</div>
          <p style="color:var(--text-muted);font-size:0.8rem;margin-bottom:16px">
            Simula qué pasa si un proveedor sube precios o si un gasto fijo aumenta. El sistema te dará 2 caminos de solución.
          </p>

          <div class="form-group">
            <label class="form-label">Ajustar Costo de Insumo / Producto</label>
            <div style="display:flex;gap:6px">
              <select class="form-input" id="crisis-cost-select" style="flex:2">${allCostOptions}</select>
              <input class="form-input" id="crisis-cost-pct" type="number" placeholder="% cambio" style="flex:1">
              <button class="btn btn-ghost btn-sm" onclick="Simulator.addCrisisAdj('cost')">+</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Ajustar Costo Fijo</label>
            <div style="display:flex;gap:6px">
              <select class="form-input" id="crisis-fc-select" style="flex:2">${allFcOptions}</select>
              <input class="form-input" id="crisis-fc-pct" type="number" placeholder="% cambio" style="flex:1">
              <button class="btn btn-ghost btn-sm" onclick="Simulator.addCrisisAdj('fc')">+</button>
            </div>
          </div>

          <div style="margin-top:12px">
            <label class="form-label">Ajustes Activos</label>
            <div style="display:flex;flex-wrap:wrap;gap:4px;min-height:30px">
              ${this.crisisAdj.length === 0 ? '<span style="color:var(--text-muted);font-size:0.78rem">Sin ajustes — agrega uno arriba</span>' :
                this.crisisAdj.map((a, i) => {
                  const isNeg = a.value < 0;
                  return `<div class="adjustment-tag ${isNeg ? 'negative' : ''}">
                    ${a.label} ${(a.value > 0 ? '+' : '') + a.value}%
                    <button onclick="Simulator.removeCrisisAdj(${i})">✕</button>
                  </div>`;
                }).join('')}
            </div>
          </div>
        </div>

        <div class="sim-panel">
          <div class="sim-panel-title">📋 Impacto y Soluciones</div>
          ${this.crisisAdj.length === 0 ? 
            '<div style="padding:20px;text-align:center;color:var(--text-muted)"><p style="font-size:0.85rem">Agrega ajustes a la izquierda para ver el impacto</p></div>' : `

          <div style="margin-bottom:16px;padding:14px;background:rgba(255,71,87,0.08);border:1px solid rgba(255,71,87,0.2);border-radius:var(--radius-md)">
            <div style="font-size:0.72rem;color:var(--danger);font-weight:700;text-transform:uppercase;margin-bottom:6px">💥 Impacto del Escenario</div>
            <div class="comparison-row" style="border:none;padding:4px 0">
              <span class="comp-label">Meta de Equilibrio</span>
              <div class="comp-values">
                <span class="comp-original">${results.cur.breakEven === Infinity ? '∞' : U.fmt(results.cur.breakEven)}</span>
                <span class="comp-arrow">→</span>
                <span class="comp-new up">${results.sim.breakEven === Infinity ? '∞' : U.fmt(results.sim.breakEven)}</span>
              </div>
            </div>
            <div class="comparison-row" style="border:none;padding:4px 0">
              <span class="comp-label">Costos Fijos / Mes</span>
              <div class="comp-values">
                <span class="comp-original">${U.fmt(results.cur.totalFixed)}</span>
                <span class="comp-arrow">→</span>
                <span class="comp-new ${results.sim.totalFixed > results.cur.totalFixed ? 'up' : ''}">${U.fmt(results.sim.totalFixed)}</span>
              </div>
            </div>
            <div class="comparison-row" style="border:none;padding:4px 0">
              <span class="comp-label">Margen Promedio</span>
              <div class="comp-values">
                <span class="comp-original">${U.pct(results.cur.avgMarginPct)}</span>
                <span class="comp-arrow">→</span>
                <span class="comp-new ${results.sim.avgMarginPct < results.cur.avgMarginPct ? 'up' : 'down'}">${U.pct(results.sim.avgMarginPct)}</span>
              </div>
            </div>
          </div>

          <div style="margin-bottom:12px;padding:14px;background:rgba(0,230,118,0.06);border:1px solid rgba(0,230,118,0.15);border-radius:var(--radius-md)">
            <div style="font-size:0.72rem;color:var(--success);font-weight:700;text-transform:uppercase;margin-bottom:8px">✅ Camino A — Esfuerzo Comercial</div>
            <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px">
              Para mantener la misma ganancia sin subir precios, necesitas facturar:
            </p>
            <div style="font-size:1.4rem;font-weight:800;color:var(--accent)">${results.pathA.revenueNeeded === Infinity ? '∞' : U.fmt(results.pathA.revenueNeeded)}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">
              Antes: ${results.cur.breakEven === Infinity ? '∞' : U.fmt(results.cur.breakEven)} → Ahora: +${results.pathA.extraRevenue === Infinity ? '∞' : U.fmt(results.pathA.extraRevenue)} más al mes
            </div>
          </div>

          <div style="padding:14px;background:rgba(255,176,32,0.06);border:1px solid rgba(255,176,32,0.15);border-radius:var(--radius-md)">
            <div style="font-size:0.72rem;color:var(--warning);font-weight:700;text-transform:uppercase;margin-bottom:8px">💡 Camino B — Ajuste de Precios</div>
            <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px">
              Para absorber el golpe sin vender más, sube tus precios un:
            </p>
            <div style="font-size:1.4rem;font-weight:800;color:var(--warning)">${results.pathB.priceIncreasePct === Infinity ? '∞' : '+' + results.pathB.priceIncreasePct.toFixed(1) + '%'}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">
              Este ajuste compensaría la pérdida de ${U.fmt(results.pathB.lostMargin)} en margen bruto mensual
            </div>
          </div>`}
        </div>
      </div>`;
  },

  addCrisisAdj(kind) {
    if (kind === 'cost') {
      const raw = document.getElementById('crisis-cost-select').value;
      const pct = parseFloat(document.getElementById('crisis-cost-pct').value);
      if (!raw || isNaN(pct)) { Toast.show('Selecciona un insumo y porcentaje', 'error'); return; }
      const [type, id] = raw.split(':');
      let label = '';
      if (type === 'ing') { const ing = U.getIng(id); label = ing ? ing.name : id; }
      else { const p = State.data.products.find(x => x.id === id); label = p ? p.name : id; }
      this.crisisAdj.push({ kind: type, targetId: id, value: pct, label });
    } else if (kind === 'fc') {
      const raw = document.getElementById('crisis-fc-select').value;
      const pct = parseFloat(document.getElementById('crisis-fc-pct').value);
      if (!raw || isNaN(pct)) { Toast.show('Selecciona un costo fijo y porcentaje', 'error'); return; }
      const id = raw.split(':')[1];
      const fc = State.data.fixedCosts.find(x => x.id === id);
      this.crisisAdj.push({ kind: 'fc', targetId: id, value: pct, label: fc ? fc.name : id });
    }
    this.render();
  },

  removeCrisisAdj(idx) { this.crisisAdj.splice(idx, 1); this.render(); },

  _calcCrisis() {
    const ingOverrides = {};
    const prodOverrides = {};
    const fcOverrides = {};

    this.crisisAdj.forEach(a => {
      if (a.kind === 'ing') {
        const ing = U.getIng(a.targetId);
        if (ing) ingOverrides[a.targetId] = ing.costPerUnit * (1 + a.value / 100);
      } else if (a.kind === 'prod') {
        const p = State.data.products.find(x => x.id === a.targetId);
        if (p) prodOverrides[a.targetId] = p.directCost * (1 + a.value / 100);
      } else if (a.kind === 'fc') {
        const fc = State.data.fixedCosts.find(x => x.id === a.targetId);
        if (fc) fcOverrides[a.targetId] = fc.amount * (1 + a.value / 100);
      }
    });

    const curFixed = U.totalFixed();
    const simFixed = U.totalFixed(fcOverrides);
    const curBE = U.breakEven();

    // Current avg margin
    const prodsWP = State.data.products.filter(p => U.getProductPrice(p) > 0);
    let curTotalMP = 0, simTotalMP = 0;
    prodsWP.forEach(p => {
      const vcCur = U.prodVarCost(p);
      const price = U.getProductPrice(p);
      curTotalMP += price > 0 ? (price - vcCur) / price : 0;
      // Simulated var cost
      let vcSim = U.prodVarCost(p, ingOverrides);
      if (p.type === 'simple' && prodOverrides[p.id] !== undefined) vcSim = prodOverrides[p.id];
      simTotalMP += price > 0 ? (price - vcSim) / price : 0;
    });
    const curAvgM = prodsWP.length > 0 ? curTotalMP / prodsWP.length : 0;
    const simAvgM = prodsWP.length > 0 ? simTotalMP / prodsWP.length : 0;

    const simBE = simAvgM > 0 ? Math.ceil(simFixed / simAvgM) : Infinity;

    // Path A: How much more revenue to maintain same profit level
    const extraRevenue = (simBE === Infinity || curBE === Infinity) ? Infinity : Math.max(0, simBE - curBE);
    
    // Path B: Price increase needed
    const curGrossMarginTotal = curAvgM;
    const simGrossMarginTotal = simAvgM;
    const marginDrop = curGrossMarginTotal - simGrossMarginTotal;
    const fixedDiff = simFixed - curFixed;
    // Lost margin per unit of revenue
    const lostMargin = marginDrop * (curBE === Infinity ? 0 : curBE) + fixedDiff;
    const priceIncrease = curAvgM > 0 && simAvgM > 0 ? ((curAvgM / simAvgM) - 1) * 100 : Infinity;

    return {
      ingOverrides, prodOverrides, fcOverrides,
      cur: { totalFixed: curFixed, breakEven: curBE, avgMarginPct: curAvgM * 100 },
      sim: { totalFixed: simFixed, breakEven: simBE, avgMarginPct: simAvgM * 100 },
      pathA: { revenueNeeded: simBE, extraRevenue },
      pathB: { priceIncreasePct: priceIncrease < 0 ? 0 : priceIncrease, lostMargin: Math.abs(lostMargin) }
    };
  },

  // =============================================
  // MODE 3: SALES MIX
  // =============================================
  _renderMix() {
    const totalFixed = U.totalFixed();
    let totalRevenue = 0;
    let totalGrossProfit = 0;

    const groupRows = Object.entries(SIM_GROUPS).map(([key, g]) => {
      const margin = this._avgMarginForGroup(key);
      const prodCount = this._countProdsInGroup(key);
      const rev = this.mixRevenues[key] || 0;
      const gross = rev * margin;
      totalRevenue += rev;
      totalGrossProfit += gross;

      return { key, g, margin, prodCount, rev, gross };
    });

    const netProfit = totalGrossProfit - totalFixed;
    const dailyRevenue = totalRevenue > 0 ? Math.ceil(totalRevenue / 30) : 0;

    return `
      <div class="sim-layout">
        <div class="sim-panel">
          <div class="sim-panel-title">📊 Proyección por Categoría</div>
          <p style="color:var(--text-muted);font-size:0.8rem;margin-bottom:16px">
            Ingresa cuánto esperas vender al mes (en pesos) por cada grupo. El sistema usará el margen real de cada categoría.
          </p>
          ${groupRows.map(r => `
            <div style="margin-bottom:14px;padding:14px;background:var(--bg-primary);border:1px solid var(--border);border-radius:var(--radius-md)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <div>
                  <span style="font-weight:700;font-size:0.9rem">${r.g.icon} ${r.g.label}</span>
                  <span style="font-size:0.7rem;color:var(--text-muted);margin-left:8px">${r.prodCount} productos</span>
                </div>
                <span class="badge" style="font-size:0.68rem">Margen: ${r.margin > 0 ? U.pct(r.margin * 100) : 'N/A'}</span>
              </div>
              <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px">${r.g.desc}</div>
              <div style="display:flex;gap:8px;align-items:center">
                <span style="font-size:0.78rem;color:var(--text-secondary);white-space:nowrap">Ventas (COP):</span>
                <input class="form-input" type="number" min="0" placeholder="Ej: 5000000" 
                  value="${r.rev || ''}"
                  oninput="Simulator.mixRevenues['${r.key}']=parseFloat(this.value)||0;Simulator.render()"
                  style="flex:1;padding:8px 10px">
              </div>
              ${r.rev > 0 ? `<div style="font-size:0.72rem;color:var(--accent);margin-top:6px;font-weight:600">
                Ganancia bruta estimada: ${U.fmt(r.gross)}</div>` : ''}
            </div>`).join('')}

          <button class="btn btn-ghost" style="width:100%;margin-top:8px" 
            onclick="Simulator.mixRevenues={};Simulator.render()">🗑️ Limpiar Todo</button>
        </div>

        <div class="sim-panel">
          <div class="sim-panel-title">📋 Resultado Financiero</div>
          ${totalRevenue === 0 ? 
            '<div style="padding:20px;text-align:center;color:var(--text-muted)"><p style="font-size:0.85rem">Ingresa ventas estimadas en alguna categoría</p></div>' : `

          <div class="goal-result-card ${netProfit >= 0 ? '' : 'negative'}">
            <div class="goal-result-label">${netProfit >= 0 ? 'Ganancia Neta Mensual' : 'Pérdida Mensual'}</div>
            <div class="goal-result-value ${netProfit >= 0 ? 'accent' : 'danger'}">${U.fmt(netProfit)}</div>
            <div class="goal-result-detail">${U.fmt(dailyRevenue)} de facturación diaria necesaria</div>
          </div>

          <div style="margin-top:16px">
            <div class="comparison-row">
              <span class="comp-label">💵 Ingreso Total</span>
              <span style="font-weight:700">${U.fmt(totalRevenue)}</span>
            </div>
            <div class="comparison-row">
              <span class="comp-label">📦 Ganancia Bruta (después de costos variables)</span>
              <span style="font-weight:600;color:var(--accent)">${U.fmt(totalGrossProfit)}</span>
            </div>
            <div class="comparison-row">
              <span class="comp-label">🏢 Costos Fijos</span>
              <span style="font-weight:600;color:var(--danger)">-${U.fmt(totalFixed)}</span>
            </div>
            <div class="comparison-row" style="border-top:2px solid var(--border);padding-top:12px;border-bottom:none">
              <span class="comp-label" style="font-weight:700;font-size:0.9rem">${netProfit >= 0 ? '✅' : '❌'} Ganancia Neta</span>
              <span style="font-weight:800;font-size:1.1rem;color:${netProfit >= 0 ? 'var(--accent)' : 'var(--danger)'}">${U.fmt(netProfit)}</span>
            </div>
          </div>

          <div style="margin-top:20px">
            <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;font-weight:600;margin-bottom:8px">Desglose por Categoría</div>
            ${groupRows.filter(r => r.rev > 0).map(r => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:0.8rem;border-bottom:1px solid rgba(26,39,68,0.3)">
                <span style="color:var(--text-secondary)">${r.g.icon} ${r.g.label}</span>
                <div style="display:flex;gap:12px;align-items:center">
                  <span style="color:var(--text-muted)">${U.fmt(r.rev)}</span>
                  <span style="font-weight:600;color:var(--accent)">${U.fmt(r.gross)}</span>
                </div>
              </div>`).join('')}
          </div>`}
        </div>
      </div>`;
  }
};

// ============================================
// EXPORT / RESET
// ============================================
function exportData() {
  const blob = new Blob([JSON.stringify(State.data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'fitpro_costos_' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  Toast.show('Datos exportados');
}

function resetData() {
  Confirm.show('¿Restaurar todos los datos a los valores por defecto? Se perderán todos los cambios.', () => {
    State.reset();
    Dashboard.render();
    Nav.switchTab('dashboard');
    Toast.show('Datos restaurados');
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await State.load();
  } catch (e) {
    console.error('Init error:', e);
  }
  // Hide loading overlay
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('active');
  Nav.init();
  Modal.init();
  Dashboard.render();
  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-reset').addEventListener('click', resetData);
});

