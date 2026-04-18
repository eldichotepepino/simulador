// ============================================
// SUPABASE CONNECTION & DATA LAYER
// ============================================
const SUPABASE_URL = 'https://clxsswpwgmetcqponhew.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNseHNzd3B3Z21ldGNxcG9uaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzI1MjMsImV4cCI6MjA5MTk0ODUyM30.LaHod6ArcYvx6bRJsgyEztPLGlp8H5fd-jwdDusu_rM';
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const SyncUI = {
  set(status) {
    const dot = document.querySelector('.sync-dot');
    const label = document.querySelector('.sync-label');
    if (!dot || !label) return;
    dot.className = 'sync-dot ' + status;
    label.textContent = status === 'synced' ? 'Sincronizado' : status === 'syncing' ? 'Guardando...' : 'Error';
  }
};

// Cloud data layer - wraps Supabase calls
window.Cloud = {
  async loadAll() {
    const [ings, prods, pis, fcs, settings] = await Promise.all([
      window.supabaseClient.from('ingredients').select('*').order('name'),
      window.supabaseClient.from('products').select('*').order('name'),
      window.supabaseClient.from('product_ingredients').select('*'),
      window.supabaseClient.from('fixed_costs').select('*').order('name'),
      window.supabaseClient.from('settings').select('*')
    ]);
    if (ings.error || prods.error || pis.error || fcs.error || settings.error) {
      throw new Error('Error loading data');
    }
    // Map product_ingredients into products
    const products = prods.data.map(p => {
      const ingredients = pis.data
        .filter(pi => pi.product_id === p.id)
        .map(pi => ({ ingredientId: pi.ingredient_id, quantity: Number(pi.quantity) }));
      return {
        id: p.id, name: p.name, subtitle: p.subtitle || '', type: p.type,
        category: p.category, directCost: Number(p.direct_cost),
        targetMargin: Number(p.target_margin), sellingPrice: Number(p.selling_price),
        priceMode: p.price_mode, ingredients
      };
    });
    const ingredientsList = ings.data.map(i => ({
      id: i.id, name: i.name, category: i.category, unit: i.unit,
      purchaseQty: Number(i.purchase_qty), purchasePrice: Number(i.purchase_price),
      costPerUnit: Number(i.cost_per_unit)
    }));
    const fixedCosts = fcs.data.map(fc => ({
      id: fc.id, name: fc.name, amount: Number(fc.amount), category: fc.category
    }));
    const settingsObj = {};
    (settings.data || []).forEach(s => { settingsObj[s.key] = s.value; });
    const generalSettings = settingsObj.general || {
      defaultMargin: 40, estimatedMonthlySales: 600, storeName: 'FitPro Station',
      salesProfile: { preparaciones: 40, suplementos: 40, snacks: 15, ropa: 5 }
    };
    return { ingredients: ingredientsList, products, fixedCosts, settings: generalSettings };
  },

  async saveIngredient(ing) {
    SyncUI.set('syncing');
    const row = {
      id: ing.id, name: ing.name, category: ing.category, unit: ing.unit,
      purchase_qty: ing.purchaseQty, purchase_price: ing.purchasePrice,
      cost_per_unit: ing.costPerUnit
    };
    const res = await window.supabaseClient.from('ingredients').upsert(row);
    SyncUI.set(res.error ? 'error' : 'synced');
    return !res.error;
  },

  async deleteIngredient(id) {
    SyncUI.set('syncing');
    const res = await window.supabaseClient.from('ingredients').delete().eq('id', id);
    SyncUI.set(res.error ? 'error' : 'synced');
  },

  async saveProduct(prod) {
    SyncUI.set('syncing');
    const row = {
      id: prod.id, name: prod.name, subtitle: prod.subtitle, type: prod.type,
      category: prod.category, direct_cost: prod.directCost,
      target_margin: prod.targetMargin, selling_price: prod.sellingPrice,
      price_mode: prod.priceMode
    };
    const res = await window.supabaseClient.from('products').upsert(row);
    if (res.error) { SyncUI.set('error'); return false; }
    // Sync product_ingredients
    await window.supabaseClient.from('product_ingredients').delete().eq('product_id', prod.id);
    if (prod.ingredients && prod.ingredients.length > 0) {
      const piRows = prod.ingredients.map(pi => ({
        product_id: prod.id, ingredient_id: pi.ingredientId, quantity: pi.quantity
      }));
      await window.supabaseClient.from('product_ingredients').insert(piRows);
    }
    SyncUI.set('synced');
    return true;
  },

  async deleteProduct(id) {
    SyncUI.set('syncing');
    await window.supabaseClient.from('products').delete().eq('id', id);
    SyncUI.set('synced');
  },

  async saveFixedCost(fc) {
    SyncUI.set('syncing');
    const row = { id: fc.id, name: fc.name, amount: fc.amount, category: fc.category };
    const res = await window.supabaseClient.from('fixed_costs').upsert(row);
    SyncUI.set(res.error ? 'error' : 'synced');
  },

  async deleteFixedCost(id) {
    SyncUI.set('syncing');
    await window.supabaseClient.from('fixed_costs').delete().eq('id', id);
    SyncUI.set('synced');
  },

  async saveSettings(settings) {
    SyncUI.set('syncing');
    await window.supabaseClient.from('settings').upsert({ key: 'general', value: settings });
    SyncUI.set('synced');
  },

  async loadPosSync() {
    const { data, error } = await window.supabaseClient
      .from('pos_sync')
      .select('*')
      .eq('id', 'current')
      .single();
    if (error || !data) return null;
    return data;
  },

  async triggerSync() {
    try {
      const res = await fetch(SUPABASE_URL + '/functions/v1/sync-pos-sales', { method: 'POST' });
      return await res.json();
    } catch (e) {
      console.error('Sync error:', e);
      return null;
    }
  }
};
