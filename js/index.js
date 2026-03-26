// =========================================================
// ▼▼▼ 完整修復版 index.js (包含所有功能，無省略) ▼▼▼
// =========================================================

// Firebase 初始化
const firebaseConfig = {
    apiKey: "AIzaSyCQEXz8OIzbb9dDxnz52tymNnYofGDEczQ",
    authDomain: "subscription-member-system.firebaseapp.com",
    databaseURL: "https://subscription-member-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "subscription-member-system",
    storageBucket: "subscription-member-system.firebasestorage.app",
    messagingSenderId: "970681171187",
    appId: "1:970681171187:web:f3f86b743e27667a994b86"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// --- 全域變數 ---
let isAuthReady = false;
let currentUser = null;
let forgotPasswordUser = null;
let editingMember = null;
let autoRefreshInterval = null;
let countdownInterval = null;
let currentPage = 'landing';

// 計算機全域變數
let calcConfig = null; 
let currentServiceType = 'boost'; 
let selectedPurchaseTier = 'legend';
let selectedPurchaseDuration = 30;
let currentDmzGunsTab = 'products';
let currentDmzProductsCache = [];
let currentDmzCartItems = [];
let dmzProductsRealtimeBound = false;
let dmzPreviewTapState = { productId: null, time: 0 };
let currentDmzMissionsCache = [];
let currentDmzQuoteSelectedMissions = [];
let dmzMissionsRealtimeBound = false;

// ===== 新的三層任務結構 =====
let currentWeeksCache = [];
let currentTaskTitlesCache = [];
let currentTaskContentsCache = [];
let dmzTaskStructureRealtimeBound = false;
let selectedWeekForTaskTitle = null;
let selectedTaskTitleForContent = null;

const MEMBER_PURCHASE_OPTIONS = {
    legend: {
        label: '傳說會員',
        prices: { 30: 200, 90: 580, 150: 950 }
    },
    diamond: {
        label: '鑽石會員',
        prices: { 30: 100, 90: 280, 150: 450 }
    },
    gold: {
        label: '黃金會員',
        prices: { 30: 60, 90: 160, 150: 250 }
    }
};

const DMZ_BUNDLE_PRICE = 650;
const DMZ_ESCAPE_MISSION_STANDALONE_PRICE = 350;
const DMZ_ESCAPE_MISSION_ADDON_PRICE = 300;
const DMZ_ACCESSORY_OPTIONS = {
    a: { code: 'A', label: '556 極致彈匣', price: 280 },
    b: { code: 'B', label: 'Asval 極致彈匣', price: 350 },
    c: { code: 'C', label: 'DRH 極致槍管', price: 280 },
    d: { code: 'D', label: 'T19 熱成像鏡', price: 320 }
};
const DMZ_COMBO_PRICES = {
    'a+b+c': { label: 'A+B+C 套餐（撞一把）', price: 850 },
    'a+b+d': { label: 'A+B+D 套餐（撞一把）', price: 900 },
    'a+c+d': { label: 'A+C+D 套餐（撞一把）', price: 800 },
    'b+c+d': { label: 'B+C+D 套餐（撞一把）', price: 900 },
    'a+b+c+d': { label: 'A+B+C+D 全套餐（撞兩把）', price: 1100 }
};
const DMZ_ACCESSORY_CART_ITEM_ID = 'dmz-guns-accessory-package';

// 預設計算機設定 (備用)
const DEFAULT_CALC_CONFIG = {
    seasonStartDate: "2025-12-01",
    basePrices: {
        boost: { master: 42, grandmaster: 62, legend: 88, mythical: 100 },
        carry: { master: 105, grandmaster: 155, legend: 220, mythical: 250 }
    },
    weights: {
        boost: {
            1: { normal: 0, mythical: 0, desc: "⛔ 閉關衝分期" },
            2: { normal: 1.7, mythical: 0, desc: "🔥 賽季初高價" },
            3: { normal: 1.45, mythical: 0, desc: "💰 收益期" },
            4: { normal: 1.3, mythical: 2.0, desc: "🚀 萬分開放" },
            5: { normal: 1.15, mythical: 1.55, desc: "✅ 穩定接單" },
            6: { normal: 1.0, mythical: 1.3, desc: "🛡️ 價格回穩" },
            7: { normal: 1.0, mythical: 1.15, desc: "📉 萬分緩降" },
            8: { normal: 1.0, mythical: 1.0, desc: "✨ 常態價格" },
            9: { normal: 1.1, mythical: 1.1, desc: "🧨 季末保級" }
        },
        carry: {
            1: { master: 0, grandmaster: 0, legend: 0, mythical: 0, desc: "⛔ 避險期" },
            2: { master: 1.5, grandmaster: 0, legend: 0, mythical: 0, desc: "🚀 大師首發" },
            3: { master: 1.45, grandmaster: 1.45, legend: 0, mythical: 0, desc: "🚀 宗師首發" },
            4: { master: 1.3, grandmaster: 1.3, legend: 1.45, mythical: 0, desc: "🚀 傳奇首發" },
            5: { master: 1.2, grandmaster: 1.2, legend: 1.3, mythical: 1.5, desc: "💎 萬分首發" },
            6: { master: 1.1, grandmaster: 1.1, legend: 1.2, mythical: 1.3, desc: "📉 逐步降價" },
            7: { master: 1.0, grandmaster: 1.0, legend: 1.1, mythical: 1.2, desc: "🏷️ 季末促銷" },
            8: { master: 1.0, grandmaster: 1.0, legend: 1.0, mythical: 1.0, desc: "✨ 清倉大拍賣" },
            9: { master: 1.0, grandmaster: 1.0, legend: 1.0, mythical: 1.0, desc: "✨ 季末清倉" }
        }
    }
};

const REFRESH_INTERVAL = 3000;

// --- Firebase Auth 監聽 ---
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('✅ 用戶已登入:', user.uid);
        isAuthReady = true;
        if (!window.appInitialized) {
            window.appInitialized = true;
            initialize();
        }
    } else {
        console.log('⏳ 嘗試匿名登入...');
        firebase.auth().signInAnonymously().then(() => {
            console.log('✅ 匿名登入成功');
        }).catch((error) => {
            console.error('❌ 匿名登入失敗:', error);
            // 即使匿名登入失敗，仍然初始化應用
            console.log('⚠️ 继续初始化應用...');
            if (!window.appInitialized) {
                window.appInitialized = true;
                initialize();
            }
        });
    }
});

// 備用初始化：如果 3 秒後仍未初始化，強制初始化
setTimeout(() => {
    if (!window.appInitialized) {
        console.log('⚠️ 超時機制觸發，強制初始化應用');
        window.appInitialized = true;
        initialize();
    }
}, 3000);

// --- 輔助函式 ---
function showLoading() { document.getElementById('loadingOverlay').classList.add('active'); }
function hideLoading() { document.getElementById('loadingOverlay').classList.remove('active'); }

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function secondsToTime(seconds) {
    if (seconds <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= (365 * 24 * 60 * 60);
    const months = Math.floor(seconds / (30 * 24 * 60 * 60));
    seconds %= (30 * 24 * 60 * 60);
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return { years, months, days, hours, minutes, seconds };
}

function formatTimeDisplay(timeObj) {
    const parts = [];
    if (timeObj.years > 0) parts.push(`${timeObj.years}年`);
    if (timeObj.months > 0) parts.push(`${timeObj.months}月`);
    if (timeObj.days > 0) parts.push(`${timeObj.days}天`);
    if (timeObj.hours > 0) parts.push(`${timeObj.hours}時`);
    if (timeObj.minutes > 0) parts.push(`${timeObj.minutes}分`);
    if (timeObj.seconds > 0) parts.push(`${timeObj.seconds}秒`);
    return parts.join(' ') || '0秒';
}

function getTimeColorClass(seconds) {
    if (seconds <= 0) return 'danger';
    if (seconds <= 259200) return 'danger';
    if (seconds <= 604800) return 'warning';
    return '';
}

function copyToClipboard(text, button) {
    const trans = translations.zh;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = trans.copy_ok || '✓ Copied';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#667eea';
        }, 2000);
    }).catch(() => {
        alert(trans.copy_fail || 'Copy failed');
    });
}

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatPrice(amount) {
    return `NT$${Number(amount || 0).toLocaleString('zh-TW')}`;
}

function renderHomeMemberList(elementId, members) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (!members || members.length === 0) {
        container.innerHTML = "<span class='member-badge' style='opacity: 0.7;'>目前尚無會員</span>";
        return;
    }

    container.innerHTML = "";
    members.forEach((nickname) => {
        const badge = document.createElement('span');
        badge.className = 'member-badge';
        badge.textContent = nickname;
        container.appendChild(badge);
    });
}

async function loadHomeMemberLists() {
    const legendEl = document.getElementById('legend-members');
    const diamondEl = document.getElementById('diamond-members');
    const goldEl = document.getElementById('gold-members');
    if (!legendEl || !diamondEl || !goldEl) return;

    try {
        const membersSnapshot = await database.ref('members').once('value');
        const membersData = membersSnapshot.val() || {};
        const allMembers = Object.values(membersData);
        const now = Math.floor(Date.now() / 1000);

        const legendMembers = allMembers
            .filter(m => m.level === 'legend' && (m.remainingSeconds - (now - m.lastUpdateTime)) > 0 && !m.isAdmin)
            .map(m => m.nickname || m.username);

        const diamondMembers = allMembers
            .filter(m => m.level === 'diamond' && (m.remainingSeconds - (now - m.lastUpdateTime)) > 0 && !m.isAdmin)
            .map(m => m.nickname || m.username);

        const goldMembers = allMembers
            .filter(m => m.level === 'gold' && (m.remainingSeconds - (now - m.lastUpdateTime)) > 0 && !m.isAdmin)
            .map(m => m.nickname || m.username);

        renderHomeMemberList('legend-members', legendMembers);
        renderHomeMemberList('diamond-members', diamondMembers);
        renderHomeMemberList('gold-members', goldMembers);
    } catch (error) {
        console.error('載入首頁會員名單失敗:', error);
        if (legendEl) legendEl.innerHTML = "<p style='color:red;'>載入失敗</p>";
        if (diamondEl) diamondEl.innerHTML = "<p style='color:red;'>載入失敗</p>";
        if (goldEl) goldEl.innerHTML = "<p style='color:red;'>載入失敗</p>";
    }
}

function initHomeMemberTilt() {
    if (!window.VanillaTilt || window.innerWidth <= 768) return;

    const cards = document.querySelectorAll('.home-member-showcase .member-tier-card');
    cards.forEach((card) => {
        if (card.vanillaTilt) return;
        VanillaTilt.init(card, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.5
        });
    });
}

function updatePurchasePage() {
    const tierData = MEMBER_PURCHASE_OPTIONS[selectedPurchaseTier];
    if (!tierData) return;

    Object.keys(MEMBER_PURCHASE_OPTIONS).forEach((tier) => {
        const card = document.getElementById(`purchaseTier${tier.charAt(0).toUpperCase() + tier.slice(1)}`);
        if (card) card.classList.toggle('active', tier === selectedPurchaseTier);
    });

    [30, 90, 150].forEach((duration) => {
        const button = document.getElementById(`purchaseDuration${duration}`);
        const priceEl = document.getElementById(`purchasePrice${duration}`);
        if (button) button.classList.toggle('active', duration === selectedPurchaseDuration);
        if (priceEl) priceEl.textContent = `NT$${tierData.prices[duration]}`;
    });

    const durationText = selectedPurchaseDuration === 30
        ? '1個月 (30天)'
        : selectedPurchaseDuration === 90
            ? '3個月 (90天)'
            : '5個月 (150天)';

    const price = tierData.prices[selectedPurchaseDuration];

    const tierEl = document.getElementById('purchaseSummaryTier');
    const durationEl = document.getElementById('purchaseSummaryDuration');
    const priceEl = document.getElementById('purchaseSummaryPrice');

    if (tierEl) tierEl.textContent = tierData.label;
    if (durationEl) durationEl.textContent = durationText;
    if (priceEl) priceEl.textContent = `NT$${price}`;
}

function selectPurchaseTier(tier) {
    if (!MEMBER_PURCHASE_OPTIONS[tier]) return;
    selectedPurchaseTier = tier;
    updatePurchasePage();
}

function selectPurchaseDuration(duration) {
    if (![30, 90, 150].includes(duration)) return;
    selectedPurchaseDuration = duration;
    updatePurchasePage();
}

function getPurchaseOrderText() {
    const tierData = MEMBER_PURCHASE_OPTIONS[selectedPurchaseTier];
    const durationText = selectedPurchaseDuration === 30
        ? '1個月 (30天)'
        : selectedPurchaseDuration === 90
            ? '3個月 (90天)'
            : '5個月 (150天)';

    return [
        '【會員購買訂單】',
        `方案：${tierData.label}`,
        `時長：${durationText}`,
        `金額：NT$${tierData.prices[selectedPurchaseDuration]}`,
        '備註：請提供付款資訊與兌換碼'
    ].join('\n');
}

function savePendingOrder(orderData) {
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
}

function confirmAndOpenOrderPage(orderData) {
    const previewLines = orderData.items
        .map((item) => `${item.label}：${item.value}`)
        .join('\n');

    const confirmed = confirm(
        `${orderData.title}\n\n${previewLines}\n\n總金額：${orderData.total}\n\n確認後將前往訂單確認頁。`
    );

    if (!confirmed) return;

    savePendingOrder(orderData);
    window.location.href = 'order.html';
}

function buildMembershipOrderData() {
    const tierData = MEMBER_PURCHASE_OPTIONS[selectedPurchaseTier];
    const durationText = selectedPurchaseDuration === 30
        ? '1個月 (30天)'
        : selectedPurchaseDuration === 90
            ? '3個月 (90天)'
            : '5個月 (150天)';
    const price = `NT$${tierData.prices[selectedPurchaseDuration]}`;

    return {
        orderType: 'membership',
        title: '購買會員確認',
        subtitle: '會員方案下單明細',
        items: [
            { label: '會員方案', value: tierData.label },
            { label: '購買時長', value: durationText },
            { label: '應付金額', value: price }
        ],
        total: price,
        note: '確認付款後，工作室會提供對應會員兌換碼。'
    };
}

function getSelectedDmzAccessoryKeys() {
    return Array.from(document.querySelectorAll('#dmzGunsPanelAccessories .dmz-accessory-card input:checked'))
        .map((input) => input.value)
        .sort();
}

function getDmzAccessoryPricing(selectedKeys) {
    if (!selectedKeys.length) {
        return { price: 0, label: '未選擇', detail: [] };
    }

    const comboKey = selectedKeys.join('+');
    const combo = DMZ_COMBO_PRICES[comboKey];
    const detail = selectedKeys.map((key) => DMZ_ACCESSORY_OPTIONS[key]).filter(Boolean);

    if (combo) {
        return { price: combo.price, label: combo.label, detail };
    }

    const total = detail.reduce((sum, item) => sum + item.price, 0);
    const label = detail.length === 1 ? detail[0].label : `單點配件 ${detail.map((item) => item.code).join('+')}`;
    return { price: total, label, detail };
}

function updateDmzQuoteSummary() {
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    const maxAddonQuota = bundleCount * 3; // 每單3個加購機會
    
    // 計算任務費用
    let missionTotal = 0;
    let missionSummaryText = '';
    
    if (currentDmzQuoteSelectedMissions.length > 0) {
        const addonMissions = currentDmzQuoteSelectedMissions.filter(m => m.type === 'addon');
        const singleMissions = currentDmzQuoteSelectedMissions.filter(m => m.type === 'single');
        
        addonMissions.forEach(mission => {
            missionTotal += mission.addonPrice || 0;
        });
        singleMissions.forEach(mission => {
            missionTotal += mission.singlePrice || 0;
        });
        
        let missionDesc = [];
        if (addonMissions.length > 0) {
            missionDesc.push(`加購${addonMissions.length}個`);
        }
        if (singleMissions.length > 0) {
            missionDesc.push(`單點${singleMissions.length}個`);
        }
        missionSummaryText = missionDesc.join(' + ') + `（${formatPrice(missionTotal)}）`;
    } else {
        missionSummaryText = '無';
    }
    
    const bundleTotal = bundleCount * DMZ_BUNDLE_PRICE;
    const serviceTotal = bundleTotal + missionTotal;
    const total = serviceTotal;

    // 更新刷單統計顯示
    const bundleCountEl = document.getElementById('dmzBundleCountDisplay');
    const bundlePriceEl = document.getElementById('dmzBundlePriceDisplay');
    const addonQuotaEl = document.getElementById('dmzAddonQuotaDisplay');
    
    // 顯示格式改為：剩餘/總額度（例如選1個於3額度時顯示 2/3）
    const usedAddonCount = currentDmzQuoteSelectedMissions.filter(m => m.type === 'addon').length;
    const remainingAddonQuota = Math.max(0, maxAddonQuota - usedAddonCount);
    
    if (bundleCountEl) bundleCountEl.textContent = bundleCount;
    if (bundlePriceEl) bundlePriceEl.textContent = formatPrice(bundleTotal);
    if (addonQuotaEl) addonQuotaEl.textContent = `${remainingAddonQuota}/${maxAddonQuota}`;

    // 更新下單摘要
    const bundleEl = document.getElementById('dmzSummaryBundles');
    const missionEl = document.getElementById('dmzSummaryMissions');
    const serviceTotalEl = document.getElementById('dmzSummaryServiceTotal');
    const totalEl = document.getElementById('dmzSummaryTotal');

    if (bundleEl) bundleEl.textContent = bundleCount > 0 ? `${bundleCount} 單（${formatPrice(bundleTotal)}）` : '未選擇';
    if (missionEl) missionEl.textContent = missionSummaryText;
    if (serviceTotalEl) serviceTotalEl.textContent = formatPrice(serviceTotal);
    if (totalEl) totalEl.textContent = formatPrice(total);
    
    // 重新渲染任務標題，以反映加購配額變化
    renderDmzTaskTitleGrid();
}

function getDmzMissionPrice(bundleCount, hasMission) {
    if (!hasMission) return 0;
    return bundleCount > 0 ? DMZ_ESCAPE_MISSION_ADDON_PRICE : DMZ_ESCAPE_MISSION_STANDALONE_PRICE;
}

function updateDmzGunAccessorySummary() {
    const accessoryKeys = getSelectedDmzAccessoryKeys();
    const accessoryPricing = getDmzAccessoryPricing(accessoryKeys);
    const accessoryComboKey = accessoryKeys.join('+');
    const accessoryCartItem = currentDmzCartItems.find((item) => item.id === DMZ_ACCESSORY_CART_ITEM_ID);
    const selectedCountEl = document.getElementById('dmzGunAccessoryCount');
    const modeEl = document.getElementById('dmzGunAccessoryMode');
    const totalEl = document.getElementById('dmzGunAccessoryTotal');
    const summaryTotalEl = document.getElementById('dmzGunAccessorySummaryTotal');
    const tagsEl = document.getElementById('dmzGunSelectedAccessories');
    const addCartBtn = document.getElementById('dmzGunAccessoryAddCartBtn');

    if (selectedCountEl) selectedCountEl.textContent = `${accessoryPricing.detail.length} 項`;
    if (modeEl) modeEl.textContent = accessoryPricing.label;
    if (totalEl) totalEl.textContent = formatPrice(accessoryPricing.price);
    if (summaryTotalEl) summaryTotalEl.textContent = formatPrice(accessoryPricing.price);

    if (tagsEl) {
        tagsEl.innerHTML = accessoryPricing.detail.length
            ? accessoryPricing.detail.map((item) => `<span class="dmz-selection-tag">${item.code}. ${escapeHtml(item.label)}</span>`).join('')
            : '<span class="dmz-selection-tag is-empty">尚未選擇 DMZ槍枝配件</span>';
    }

    if (addCartBtn) {
        if (!accessoryPricing.detail.length) {
            addCartBtn.disabled = true;
            addCartBtn.textContent = '請先勾選配件';
            addCartBtn.classList.add('is-disabled');
        } else if (accessoryCartItem && accessoryCartItem.accessoryComboKey === accessoryComboKey) {
            addCartBtn.disabled = true;
            addCartBtn.textContent = '已加入購物車';
            addCartBtn.classList.add('is-disabled');
        } else if (accessoryCartItem) {
            addCartBtn.disabled = false;
            addCartBtn.textContent = '更新購物車配件';
            addCartBtn.classList.remove('is-disabled');
        } else {
            addCartBtn.disabled = false;
            addCartBtn.textContent = '加入購物車';
            addCartBtn.classList.remove('is-disabled');
        }
    }
}

function addDmzGunAccessoriesToCart() {
    const accessoryKeys = getSelectedDmzAccessoryKeys();
    const accessoryPricing = getDmzAccessoryPricing(accessoryKeys);

    if (accessoryPricing.price <= 0) {
        alert('請先選擇至少一項 DMZ槍枝配件，再加入購物車。');
        return;
    }

    const accessoryComboKey = accessoryKeys.join('+');
    const detailText = accessoryPricing.detail.map((item) => `${item.code}. ${item.label}`).join('、');
    const accessoryCartItem = {
        id: DMZ_ACCESSORY_CART_ITEM_ID,
        code: 'DMZ-ACC',
        name: 'DMZ槍枝配件',
        description: `${accessoryPricing.label}${detailText ? `｜${detailText}` : ''}`,
        price: Number(accessoryPricing.price || 0),
        imageData: 'image/logo.jpg',
        accessoryComboKey
    };

    const existingIndex = currentDmzCartItems.findIndex((item) => item.id === DMZ_ACCESSORY_CART_ITEM_ID);
    if (existingIndex >= 0) {
        currentDmzCartItems[existingIndex] = accessoryCartItem;
    } else {
        currentDmzCartItems.push(accessoryCartItem);
    }

    updateDmzCartSummary();
    renderDmzCartPage();
    updateDmzGunAccessorySummary();
}

function switchDmzGunsTab(tabName, buttonEl = null) {
    currentDmzGunsTab = tabName === 'accessories' ? 'accessories' : 'products';

    const productsPanel = document.getElementById('dmzGunsPanelProducts');
    const accessoriesPanel = document.getElementById('dmzGunsPanelAccessories');
    const productsBtn = document.getElementById('dmzGunsTabProducts');
    const accessoriesBtn = document.getElementById('dmzGunsTabAccessories');

    if (productsPanel) productsPanel.classList.toggle('active', currentDmzGunsTab === 'products');
    if (accessoriesPanel) accessoriesPanel.classList.toggle('active', currentDmzGunsTab === 'accessories');

    if (productsBtn) {
        productsBtn.classList.toggle('active', currentDmzGunsTab === 'products');
        productsBtn.setAttribute('aria-selected', currentDmzGunsTab === 'products' ? 'true' : 'false');
    }
    if (accessoriesBtn) {
        accessoriesBtn.classList.toggle('active', currentDmzGunsTab === 'accessories');
        accessoriesBtn.setAttribute('aria-selected', currentDmzGunsTab === 'accessories' ? 'true' : 'false');
    }

    // 保險同步：避免 class 與 aria 不一致導致小分頁亮暗顛倒
    if (productsBtn && accessoriesBtn) {
        const productsSelected = currentDmzGunsTab === 'products';
        productsBtn.setAttribute('aria-selected', productsSelected ? 'true' : 'false');
        accessoriesBtn.setAttribute('aria-selected', productsSelected ? 'false' : 'true');
    }

    if (buttonEl && typeof buttonEl.blur === 'function') buttonEl.blur();

    if (currentDmzGunsTab === 'products') {
        renderDmzProductGrid(currentDmzProductsCache);
        updateDmzCartSummary();
    } else {
        updateDmzGunAccessorySummary();
    }
}

function getDmzProductById(productId) {
    return currentDmzProductsCache.find((product) => product.id === productId);
}

function isDmzProductInCart(productId) {
    return currentDmzCartItems.some((item) => item.id === productId);
}

function getDmzCartTotals() {
    const totalCount = currentDmzCartItems.length;
    const totalPrice = currentDmzCartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    return { totalCount, totalPrice };
}

function openDmzImagePreview(productId) {
    const product = getDmzProductById(productId);
    const modal = document.getElementById('dmzImagePreviewModal');
    const image = document.getElementById('dmzImagePreviewImg');
    const title = document.getElementById('dmzImagePreviewTitle');
    if (!product || !modal || !image || !title) return;

    title.textContent = `${product.code || 'DMZ 商品'} 圖片預覽`;
    image.src = product.originalImageData || product.imageData || '';
    image.alt = product.code || 'DMZ 商品圖片';
    modal.classList.add('active');
}

function handleDmzImagePreviewTap(event, productId) {
    if (event) event.preventDefault();
    const now = Date.now();
    const isDoubleTap = dmzPreviewTapState.productId === productId && (now - dmzPreviewTapState.time) <= 380;

    dmzPreviewTapState = { productId, time: now };
    if (isDoubleTap) {
        dmzPreviewTapState = { productId: null, time: 0 };
        openDmzImagePreview(productId);
    }
}

function closeDmzImagePreview() {
    const modal = document.getElementById('dmzImagePreviewModal');
    if (modal) modal.classList.remove('active');
}

function updateDmzCartSummary() {
    const countEl = document.getElementById('dmzCartCount');
    const totalEl = document.getElementById('dmzCartTotal');
    const pageTotalEl = document.getElementById('dmzCartPageTotal');
    const modalTotalEl = document.getElementById('dmzModalCartTotal');
    const { totalCount, totalPrice } = getDmzCartTotals();

    if (countEl) countEl.textContent = `購物車 ${totalCount} 件`;
    if (totalEl) totalEl.textContent = formatPrice(totalPrice);
    if (pageTotalEl) pageTotalEl.textContent = formatPrice(totalPrice);
    if (modalTotalEl) modalTotalEl.textContent = formatPrice(totalPrice);
}

function addDmzProductToCart(productId) {
    const product = getDmzProductById(productId);
    if (!product) return;

    if (isDmzProductInCart(productId)) {
        return;
    }

    currentDmzCartItems.push({
        id: product.id,
        code: product.code || 'DMZ-000',
        name: product.name || product.code || 'DMZ 商品',
        termBlue: product.termBlue || '',
        termRed1: product.termRed1 || '',
        termRed2: product.termRed2 || '',
        accessoryOwned: Number.isFinite(Number(product.accessoryOwned)) ? Number(product.accessoryOwned) : null,
        accessoryMax: Number.isFinite(Number(product.accessoryMax)) ? Number(product.accessoryMax) : null,
        description: product.description || '',
        price: Number(product.price || 0),
        imageData: product.imageData || ''
    });

    updateDmzCartSummary();
    renderDmzProductGrid(currentDmzProductsCache);
    renderDmzCartPage();
}

function clearDmzCart() {
    currentDmzCartItems = [];
    updateDmzCartSummary();
    renderDmzProductGrid(currentDmzProductsCache);
    renderDmzCartPage();
    updateDmzGunAccessorySummary();
}

function removeDmzProductFromCart(productId) {
    if (!confirm('確認變更購買項目？')) return;
    currentDmzCartItems = currentDmzCartItems.filter((item) => item.id !== productId);
    updateDmzCartSummary();
    renderDmzProductGrid(currentDmzProductsCache);
    renderDmzCartPage();
    updateDmzGunAccessorySummary();
}

function buildDmzCartOrderData() {
    if (!currentDmzCartItems.length) {
        alert('購物車目前是空的，請先加入商品或配件。');
        return null;
    }

    const items = [];
    let total = 0;

    currentDmzCartItems.forEach((item) => {
        const lineTotal = Number(item.price || 0);
        total += lineTotal;
        items.push({
            label: `${item.name || item.code}`,
            value: `${item.description || 'DMZ 槍枝商品'}（${formatPrice(lineTotal)}）`
        });
    });

    return {
        orderType: 'dmz-guns-cart',
        title: 'DMZ 槍枝購物車確認',
        subtitle: 'DMZ 商品與配件下單明細',
        items,
        total: formatPrice(total),
        note: '請將此訂單傳送給工作室，確認貨況與交付流程。'
    };
}

function orderDmzCartNow() {
    const orderData = buildDmzCartOrderData();
    if (!orderData) return;
    confirmAndOpenOrderPage(orderData);
}

function renderDmzCartPage() {
    const list = document.getElementById('dmzModalCartList');
    if (!list) return;

    if (!currentDmzCartItems.length) {
        list.innerHTML = '<div class="empty-state">購物車目前是空的，先去 DMZ 槍枝挑選商品或配件吧。</div>';
        return;
    }

    list.innerHTML = currentDmzCartItems.map((item) => `
        <article class="dmz-cart-item-card">
            ${item.imageData ? `<img src="${item.imageData}" alt="${escapeHtml(item.code)}" class="dmz-cart-item-thumb">` : ''}
            <div class="dmz-cart-item-main">
                <strong class="dmz-cart-item-name">${escapeHtml(item.name || item.code || 'DMZ 商品')}</strong>
                <span class="dmz-product-code">${escapeHtml(item.code || 'DMZ-000')}</span>
                ${(Number.isFinite(Number(item.accessoryOwned)) || Number.isFinite(Number(item.accessoryMax)))
                    ? `<p class="dmz-product-attachment">配件: ${Number.isFinite(Number(item.accessoryOwned)) ? Number(item.accessoryOwned) : 0}/${Number.isFinite(Number(item.accessoryMax)) ? Number(item.accessoryMax) : 0}</p>`
                    : ''}
                ${item.description ? `<p>${escapeHtml(item.description).replace(/\n/g, '<br>')}</p>` : ''}
            </div>
            <div class="dmz-cart-item-side">
                <strong>${formatPrice(item.price)}</strong>
                <button class="btn btn-small" onclick="removeDmzProductFromCart('${item.id}')">移除</button>
            </div>
        </article>
    `).join('');
}

function openDmzCartModal() {
    renderDmzCartPage();
    document.getElementById('dmzCartModal').style.display = 'flex';
}

function closeDmzCartModal() {
    document.getElementById('dmzCartModal').style.display = 'none';
}

function closeDmzCartModalOverlay(event) {
    if (event.target === document.getElementById('dmzCartModal')) closeDmzCartModal();
}

function toggleDmzFloatingCartBar(pageId) {
    const floatingCartBar = document.getElementById('dmzFloatingCartBar');
    if (!floatingCartBar) return;
    floatingCartBar.style.display = pageId === 'dmz-guns' ? 'flex' : 'none';
}

function renderDmzProductGrid(products = []) {
    const grid = document.getElementById('dmzProductGrid');
    if (!grid) return;

    if (!products.length) {
        grid.innerHTML = '<div class="empty-state">目前尚未上架 DMZ 槍枝商品</div>';
        return;
    }

    grid.innerHTML = products.map((product) => {
        const selected = isDmzProductInCart(product.id);
        return `
        <article class="dmz-product-card ${selected ? 'selected' : ''}">
            <h3 class="dmz-product-name dmz-product-name-top">${escapeHtml(product.name || product.code || 'DMZ 商品')}</h3>
            <div class="dmz-product-image-wrap" onclick="handleDmzImagePreviewTap(event, '${product.id}')" title="雙擊圖片可放大檢視">
                <img src="${product.originalImageData || product.imageData || ''}" alt="${escapeHtml(product.code)}" class="dmz-product-image">
                ${selected ? '<span class="dmz-selected-badge">已加入購物車</span>' : ''}
            </div>
            <div class="dmz-product-body">
                <div class="dmz-product-meta">
                    <span class="dmz-product-code">${escapeHtml(product.code || 'DMZ-000')}</span>
                    <strong class="dmz-product-price">${formatPrice(product.price)}</strong>
                </div>
                <div class="dmz-product-terms">
                    ${product.termBlue ? `<span class="dmz-product-term dmz-product-term-blue">${escapeHtml(product.termBlue)}</span>` : ''}
                    ${product.termRed1 ? `<span class="dmz-product-term dmz-product-term-red">${escapeHtml(product.termRed1)}</span>` : ''}
                    ${product.termRed2 ? `<span class="dmz-product-term dmz-product-term-red">${escapeHtml(product.termRed2)}</span>` : ''}
                </div>
                <div class="dmz-product-bottom">
                    ${product.description ? `<p class="dmz-product-description">${escapeHtml(product.description).replace(/\n/g, '<br>')}</p>` : ''}
                    ${(Number.isFinite(Number(product.accessoryOwned)) || Number.isFinite(Number(product.accessoryMax)))
                        ? `<p class="dmz-product-attachment">配件: ${Number.isFinite(Number(product.accessoryOwned)) ? Number(product.accessoryOwned) : 0}/${Number.isFinite(Number(product.accessoryMax)) ? Number(product.accessoryMax) : 0}</p>`
                        : ''}
                    <button class="btn btn-small dmz-add-cart-btn ${selected ? 'is-disabled' : ''}" onclick="addDmzProductToCart('${product.id}')" ${selected ? 'disabled' : ''}>${selected ? '已加入購物車' : '加入購物車'}</button>
                </div>
            </div>
        </article>
    `;
    }).join('');
}

function bindDmzProductsRealtime() {
    if (dmzProductsRealtimeBound) return;

    dmzProductsRealtimeBound = true;
    database.ref('dmzProducts').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        currentDmzProductsCache = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        currentDmzCartItems = currentDmzCartItems.filter((cartItem) =>
            cartItem.id === DMZ_ACCESSORY_CART_ITEM_ID || currentDmzProductsCache.some((product) => product.id === cartItem.id)
        );

        renderDmzProductGrid(currentDmzProductsCache);
        renderDmzCartPage();
        updateDmzCartSummary();
        updateDmzGunAccessorySummary();
    }, (error) => {
        console.error('監聽 DMZ 商品失敗:', error);
        renderDmzProductGrid([]);
        renderDmzCartPage();
        updateDmzCartSummary();
        updateDmzGunAccessorySummary();
    });
}

// ===== DMZ 報價任務管理 =====

function bindDmzTaskStructureRealtime() {
    if (dmzTaskStructureRealtimeBound) return;

    dmzTaskStructureRealtimeBound = true;
    
    // 綁定週次
    database.ref('dmzMissionWeeks').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        currentWeeksCache = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .sort((a, b) => {
                const av = a?.week === 'special' ? 9999 : Number(a?.week) || 9998;
                const bv = b?.week === 'special' ? 9999 : Number(b?.week) || 9998;
                return av - bv;
            });
        renderDmzWeekGrid();
    }, (error) => {
        console.error('監聽週次失敗:', error);
        currentWeeksCache = [];
        renderDmzWeekGrid();
    });

    // 綁定任務標題
    database.ref('dmzMissionTaskTitles').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        currentTaskTitlesCache = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }));
        if (selectedWeekForTaskTitle) renderDmzTaskTitleGrid();
    }, (error) => {
        console.error('監聽任務標題失敗:', error);
        currentTaskTitlesCache = [];
    });

    // 綁定任務內容
    database.ref('dmzMissionTaskContents').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        currentTaskContentsCache = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }));
        if (selectedTaskTitleForContent) renderDmzTaskContentList();
    }, (error) => {
        console.error('監聽任務內容失敗:', error);
        currentTaskContentsCache = [];
    });
}

function formatDmzWeekLabel(weekObj) {
    if (!weekObj) return '未知週次';
    if (weekObj.week === 'special') return '特別試煉';
    const n = Number(weekObj.week);
    return Number.isFinite(n) && n > 0 ? `第${n}週` : (weekObj.weekLabel || '未知週次');
}

function resetToWeekSelection() {
    selectedWeekForTaskTitle = null;
    selectedTaskTitleForContent = null;
    document.getElementById('dmzTaskTitleLayer').style.display = 'none';
    document.getElementById('dmzTaskContentLayer').style.display = 'none';
}

function renderDmzWeekGrid() {
    const grid = document.getElementById('dmzWeekGrid');
    if (!grid) return;

    if (currentWeeksCache.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 30px; color: #aaa;">暫無週次</div>';
        return;
    }

    grid.innerHTML = currentWeeksCache.map((week) => {
        const isSelected = selectedWeekForTaskTitle === week.id;
        const baseBorder = isSelected ? '#00d4ff' : '#333';
        const baseShadow = isSelected ? '0 0 12px rgba(0,212,255,0.65)' : 'none';

        return `
        <div style="cursor: pointer; width: 100%; max-width: 150px; border: 2px solid ${baseBorder}; border-radius: 6px; overflow: hidden; transition: all 0.2s; box-shadow: ${baseShadow};" 
             onmouseenter="this.style.borderColor='#00d4ff'; this.style.boxShadow='0 0 10px rgba(0,212,255,0.5)'" 
             onmouseleave="this.style.borderColor='${baseBorder}'; this.style.boxShadow='${baseShadow}'"
             onclick="selectDmzWeek('${week.id}')">
            <img src="${week.originalImageData || week.imageData || ''}" alt="${formatDmzWeekLabel(week)}" style="width: 100%; aspect-ratio: 186 / 138; height: auto; object-fit: contain; background: #0d1117; display: block;">
            <div style="text-align: center; padding: 6px; background: #1a1a1a; color: #00d4ff; font-weight: bold;">${formatDmzWeekLabel(week)}</div>
        </div>
    `;
    }).join('');
}

function selectDmzWeek(weekId) {
    selectedWeekForTaskTitle = weekId;
    selectedTaskTitleForContent = null;
    document.getElementById('dmzTaskTitleLayer').style.display = 'block';
    document.getElementById('dmzTaskContentLayer').style.display = 'none';
    renderDmzWeekGrid();
    renderDmzTaskTitleGrid();
}

function renderDmzTaskTitleGrid() {
    const grid = document.getElementById('dmzTaskTitleGrid');
    if (!grid) return;

    const tasksInWeek = currentTaskTitlesCache.filter(t => t.weekId === selectedWeekForTaskTitle);
    
    if (tasksInWeek.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 30px; color: #aaa;">此週暫無任務標題</div>';
        return;
    }

    grid.innerHTML = tasksInWeek.map((title) => {
        const isSelected = selectedTaskTitleForContent === title.id;
        const baseBorder = isSelected ? '#ffcc00' : '#666';
        const baseShadow = isSelected ? '0 0 12px rgba(255,204,0,0.65)' : 'none';
        
        // 檢查此任務標題下是否有加購或單點的品項
        const hasAddonContent = currentDmzQuoteSelectedMissions.some(m => m.taskTitleId === title.id && m.type === 'addon');
        const hasSingleContent = currentDmzQuoteSelectedMissions.some(m => m.taskTitleId === title.id && m.type === 'single');
        
        // 決定遮罩顏色：加購用粉紅，單點用淺灰
        let overlayStyle = '';
        if (hasAddonContent) {
            overlayStyle = '<div style="position: absolute; inset: 0; background: rgba(240, 141, 255, 0.3); border-radius: 4px; pointer-events: none;"></div>';
        } else if (hasSingleContent) {
            overlayStyle = '<div style="position: absolute; inset: 0; background: rgba(180, 180, 180, 0.2); border-radius: 4px; pointer-events: none;"></div>';
        }

        return `
        <div style="cursor: pointer; width: 100%; max-width: 756px; margin: 0 auto; border: 2px solid ${baseBorder}; border-radius: 6px; overflow: hidden; transition: all 0.2s; box-shadow: ${baseShadow}; position: relative;" 
             onmouseenter="this.style.borderColor='#ffcc00'; this.style.boxShadow='0 0 10px rgba(255,204,0,0.5)'" 
             onmouseleave="this.style.borderColor='${baseBorder}'; this.style.boxShadow='${baseShadow}'"
             onclick="selectDmzTaskTitle('${title.id}')">
            <img src="${title.imageData || title.originalImageData || ''}" alt="任務標題" style="width: 100%; aspect-ratio: 756 / 127; height: auto; object-fit: contain; background: #0d1117; display: block;">
            ${overlayStyle}
        </div>
    `;
    }).join('');
}

function selectDmzTaskTitle(titleId) {
    selectedTaskTitleForContent = titleId;
    document.getElementById('dmzTaskContentLayer').style.display = 'block';
    renderDmzTaskTitleGrid();
    renderDmzTaskContentList();
}

function renderDmzTaskContentList() {
    const list = document.getElementById('dmzTaskContentList');
    if (!list) return;

    const contentsForTask = currentTaskContentsCache.filter(c => c.taskTitleId === selectedTaskTitleForContent);
    
    if (contentsForTask.length === 0) {
        list.innerHTML = '<div class="empty-state" style="text-align: center; padding: 30px; color: #aaa;">此任務標題暫無內容</div>';
        return;
    }

    list.innerHTML = contentsForTask.map((content, index) => {
        const isSelected = currentDmzQuoteSelectedMissions.some(m => m.id === content.id);
        const contentImageSrc = content.imageData || content.originalImageData || '';
        const previewImageSrc = content.originalImageData || content.imageData || '';
        return `
            <div style="display: grid; gap: 12px; padding: 14px; background: #1a1a1a; border: 2px solid ${isSelected ? '#00d4ff' : '#333'}; border-radius: 8px; transition: all 0.2s;">
                <img src="${contentImageSrc}" alt="任務內容" style="width: 100%; max-height: 360px; object-fit: contain; border-radius: 8px; cursor: zoom-in; background: #0d1117;" ondblclick="openDmzGenericImagePreview('任務內容預覽', '${previewImageSrc}', '任務內容')">
                <div style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
                    <span style="color: #aaa; font-size: 0.95em;">單點: <strong style="color: #ffd700;">NT$${content.singlePrice}</strong></span>
                    <span style="color: #aaa; font-size: 0.95em;">加購: <strong style="color: #ffd700;">NT$${content.addonPrice}</strong></span>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-left: auto;">
                        <input type="checkbox" id="dmzCheck_${content.id}" ${isSelected ? 'checked' : ''} onchange="toggleDmzTaskContentCheckbox('${content.id}', '${content.taskTitleId}', ${content.singlePrice}, ${content.addonPrice}, '${content.imageData || ''}', this.checked)">
                        <span style="color: ${isSelected ? '#ffd700' : '#aaa'};">${isSelected ? '已選（點擊變更方式）' : '勾選添加'}</span>
                    </label>
                </div>
                <div>
                    <div style="display: flex; gap: 8px;">
                        <label style="flex: 1; display: flex; align-items: center; gap: 6px; padding: 6px 8px; background: #0a0a0a; border-radius: 4px; border: 1px solid #444; cursor: pointer;">
                            <input type="radio" name="dmzTaskType_${content.id}" value="addon" ${isSelected ? (currentDmzQuoteSelectedMissions.find(m => m.id === content.id)?.type === 'addon' ? 'checked' : '') : ''} onchange="toggleDmzTaskContent('${content.id}', '${content.taskTitleId}', ${content.singlePrice}, ${content.addonPrice}, '${content.imageData || ''}', 'addon')">
                            <span style="font-size: 0.9em;">加購</span>
                        </label>
                        <label style="flex: 1; display: flex; align-items: center; gap: 6px; padding: 6px 8px; background: #0a0a0a; border-radius: 4px; border: 1px solid #444; cursor: pointer;">
                            <input type="radio" name="dmzTaskType_${content.id}" value="single" ${isSelected ? (currentDmzQuoteSelectedMissions.find(m => m.id === content.id)?.type === 'single' ? 'checked' : '') : ''} onchange="toggleDmzTaskContent('${content.id}', '${content.taskTitleId}', ${content.singlePrice}, ${content.addonPrice}, '${content.imageData || ''}', 'single')">
                            <span style="font-size: 0.9em;">單點</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openDmzGenericImagePreview(titleText, imageSrc, altText) {
    const modal = document.getElementById('dmzImagePreviewModal');
    const image = document.getElementById('dmzImagePreviewImg');
    const title = document.getElementById('dmzImagePreviewTitle');
    if (!modal || !image || !title || !imageSrc) return;

    title.textContent = titleText || '圖片預覽';
    image.src = imageSrc;
    image.alt = altText || '圖片預覽';
    modal.classList.add('active');
}

function toggleDmzTaskContentCheckbox(contentId, taskTitleId, singlePrice, addonPrice, imageData, isChecked) {
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    const maxAddonQuota = bundleCount * 3;
    
    const existingIndex = currentDmzQuoteSelectedMissions.findIndex(m => m.id === contentId);
    
    if (isChecked) {
        // 勾選：添加（默認為 addon）
        if (existingIndex < 0) {
            currentDmzQuoteSelectedMissions.push({
                id: contentId,
                taskTitleId,
                type: 'addon',
                singlePrice,
                addonPrice,
                imageData
            });
        }
    } else {
        // 取消勾選：移除
        if (existingIndex >= 0) {
            currentDmzQuoteSelectedMissions.splice(existingIndex, 1);
        }
    }

    // 檢查加購數量限制
    const addonCount = currentDmzQuoteSelectedMissions.filter(m => m.type === 'addon').length;
    if (addonCount > maxAddonQuota) {
        const remainingQuota = maxAddonQuota - (addonCount - 1);
        alert(`加購任務最多只能選 ${maxAddonQuota} 個。\n(目前已用 ${addonCount - 1} 個，剩餘 ${remainingQuota} 個)`);
        currentDmzQuoteSelectedMissions = currentDmzQuoteSelectedMissions.filter(m => !(m.id === contentId && m.type === 'addon'));
    }

    renderDmzTaskContentList();
    renderDmzQuoteSelectedMissions();
    updateDmzQuoteSummary();
}

function toggleDmzTaskContent(contentId, taskTitleId, singlePrice, addonPrice, imageData, type) {
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    const maxAddonQuota = bundleCount * 3;
    
    const existingIndex = currentDmzQuoteSelectedMissions.findIndex(m => m.id === contentId);
    
    if (existingIndex >= 0) {
        // 如果已選，則切換方式
        currentDmzQuoteSelectedMissions[existingIndex].type = type;
    } else {
        // 如果未選，則添加
        currentDmzQuoteSelectedMissions.push({
            id: contentId,
            taskTitleId,
            type,
            singlePrice,
            addonPrice,
            imageData
        });
    }

    // 檢查加購數量限制
    const addonCount = currentDmzQuoteSelectedMissions.filter(m => m.type === 'addon').length;
    if (addonCount > maxAddonQuota) {
        const remainingQuota = maxAddonQuota - (addonCount - 1);
        alert(`加購任務最多只能選 ${maxAddonQuota} 個。\n(目前已用 ${addonCount - 1} 個，剩餘 ${remainingQuota} 個)`);
        currentDmzQuoteSelectedMissions = currentDmzQuoteSelectedMissions.filter(m => !(m.id === contentId && m.type === 'addon'));
    }

    renderDmzTaskContentList();
    renderDmzQuoteSelectedMissions();
    updateDmzQuoteSummary();
}

function bindDmzMissionsRealtime() {
    if (dmzMissionsRealtimeBound) return;

    dmzMissionsRealtimeBound = true;
    database.ref('dmzMissions').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        currentDmzMissionsCache = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .sort((a, b) => (Number(a.week) || 0) - (Number(b.week) || 0));

        refreshDmzMissionSelect();
    }, (error) => {
        console.error('監聽 DMZ 任務失敗:', error);
        currentDmzMissionsCache = [];
        refreshDmzMissionSelect();
    });
}

function refreshDmzMissionSelect() {
    const select = document.getElementById('dmzMissionSelect');
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = '<option value="">-- 選擇任務 --</option>';

    currentDmzMissionsCache.forEach((mission) => {
        const option = document.createElement('option');
        option.value = mission.id;
        option.textContent = `第${mission.week}週 - ${mission.title}`;
        select.appendChild(option);
    });

    select.value = currentValue;
}

function addDmzMissionToQuote() {
    const missionId = document.getElementById('dmzMissionSelect')?.value || '';
    const missionType = document.getElementById('dmzMissionType')?.value || 'addon';

    if (!missionId) {
        alert('請選擇任務。');
        return;
    }

    const mission = currentDmzMissionsCache.find((m) => m.id === missionId);
    if (!mission) {
        alert('無法找到該任務，請重新選擇。');
        return;
    }

    // 檢查加購數量限制
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    const maxAddonQuota = bundleCount * 3;
    const addonCount = currentDmzQuoteSelectedMissions.filter((m) => m.type === 'addon').length;
    if (missionType === 'addon' && addonCount >= maxAddonQuota) {
        alert(`加購任務最多只能選 ${maxAddonQuota} 個。\n(目前已用 ${addonCount} 個)`);
        return;
    }

    // 檢查是否已經選過此任務相同的購買方式
    const exists = currentDmzQuoteSelectedMissions.some((m) => m.id === missionId && m.type === missionType);
    if (exists) {
        alert('此任務已在列表中。');
        return;
    }

    currentDmzQuoteSelectedMissions.push({
        id: missionId,
        title: mission.title,
        week: mission.week,
        type: missionType,
        singlePrice: mission.singlePrice || 0,
        addonPrice: mission.addonPrice || 0
    });

    renderDmzQuoteSelectedMissions();
    updateDmzQuoteSummary();
    document.getElementById('dmzMissionSelect').value = '';
}

function removeDmzMissionFromQuote(index) {
    currentDmzQuoteSelectedMissions.splice(index, 1);
    // 同步刷新上方任務內容，讓 checkbox/radio 立刻反映取消狀態
    if (selectedTaskTitleForContent) {
        renderDmzTaskContentList();
    }
    renderDmzQuoteSelectedMissions();
    updateDmzQuoteSummary();
}

function renderDmzQuoteSelectedMissions() {
    const container = document.getElementById('dmzMissionsSelectedList');
    const wrapper = document.getElementById('dmzMissionsSelected');

    if (!container) return;

    if (currentDmzQuoteSelectedMissions.length === 0) {
        wrapper.style.display = 'none';
        return;
    }

    wrapper.style.display = 'block';
    container.innerHTML = currentDmzQuoteSelectedMissions.map((mission, index) => {
        const price = mission.type === 'addon' ? mission.addonPrice : mission.singlePrice;
        const typeLabel = mission.type === 'addon' ? '加購' : '單點';
        
        // 查找任務標題資訊
        const taskTitle = currentTaskTitlesCache.find(t => t.id === mission.taskTitleId);
        const taskTitleName = (taskTitle?.titleName || taskTitle?.name || '').trim() || '未命名標題';
        const weekId = taskTitle?.weekId;
        const week = weekId ? currentWeeksCache.find(w => w.id === weekId) : null;
        const weekLabel = formatDmzWeekLabel(week);
        
        return `
            <div style="display: grid; grid-template-columns: 60px 1fr auto; gap: 12px; padding: 8px 12px; background: #1a1a1a; border-radius: 6px; border: 1px solid #333; align-items: center;">
                <img src="${mission.imageData || ''}" alt="任務" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div>
                    <span style="color: #aaa; font-size: 0.9em;">${weekLabel}</span>
                    <span style="margin-left: 8px; color: #00d4ff; font-size: 0.9em;">${typeLabel}</span>
                    <div style="margin-top: 4px; color: #e6f3ff; font-size: 0.92em;">${taskTitleName}</div>
                </div>
                <div style="text-align: right;">
                    <strong style="color: #ffd700; display: block;">NT$${price}</strong>
                    <button class="btn btn-danger btn-small" onclick="removeDmzMissionFromQuote(${index})" style="margin-top: 4px; padding: 4px 8px; font-size: 0.85em;">移除</button>
                </div>
            </div>
        `;
    }).join('');
}

function buildDmzQuoteOrderData() {
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    let items = [];

    // 刷單服務
    items.push({
        label: '刷單數量',
        value: bundleCount > 0 ? `${bundleCount} 單（${formatPrice(bundleCount * DMZ_BUNDLE_PRICE)}）` : '未選擇'
    });

    // 任務列表
    if (currentDmzQuoteSelectedMissions.length > 0) {
        currentDmzQuoteSelectedMissions.forEach((mission) => {
            const typeLabel = mission.type === 'addon' ? '加購' : '單點';
            const price = mission.type === 'addon' ? mission.addonPrice : mission.singlePrice;
            
            // 查找任務標題資訊
            const taskTitle = currentTaskTitlesCache.find(t => t.id === mission.taskTitleId);
            const taskTitleName = (taskTitle?.titleName || taskTitle?.name || '').trim() || '未命名標題';
            const weekId = taskTitle?.weekId;
            const week = weekId ? currentWeeksCache.find(w => w.id === weekId) : null;
            const weekLabel = formatDmzWeekLabel(week);
            
            items.push({
                label: `${typeLabel} - ${weekLabel} / ${taskTitleName}`,
                value: formatPrice(price)
            });
        });
    }

    // 計算總價
    let totalPrice = bundleCount * DMZ_BUNDLE_PRICE;
    currentDmzQuoteSelectedMissions.forEach((mission) => {
        totalPrice += mission.type === 'addon' ? mission.addonPrice : mission.singlePrice;
    });

    items.push({
        label: '應付總額',
        value: formatPrice(totalPrice)
    });

    return {
        orderType: 'dmzQuote',
        title: 'DMZ 報價下單確認',
        subtitle: 'DMZ 報價下單明細',
        items: items,
        total: formatPrice(totalPrice),
        note: 'DMZ 服務價格已依所選方案自動整理，請完成訂單後聯繫工作室 LINE 安排。'
    };
}

function orderDmzQuoteNow() {
    const bundleCount = Number(document.getElementById('dmzBundleCount')?.value || 0);
    
    if (bundleCount === 0 && currentDmzQuoteSelectedMissions.length === 0) {
        alert('請至少選擇 1 個服務項目（刷單或任務）。');
        return;
    }

    const orderData = buildDmzQuoteOrderData();
    if (!orderData) return;

    confirmAndOpenOrderPage(orderData);
}

function buildQuoteOrderData() {

    const finalPrice = document.getElementById('finalPrice')?.textContent?.trim();
    const resultContent = document.getElementById('resultContent');
    if (!resultContent || resultContent.style.display === 'none' || !finalPrice || finalPrice === '---') {
        alert('請先完成多人報價計算，再進行下單。');
        return null;
    }

    const serviceLabel = currentServiceType === 'boost' ? '急速上分' : '皇家護航';
    const currentScore = document.getElementById('currentScore')?.value || '-';
    const targetScore = document.getElementById('targetScore')?.value || '-';
    const scoreDiff = document.getElementById('scoreDiff')?.textContent?.trim() || '-';
    const estTime = document.getElementById('estTime')?.textContent?.trim() || '-';
    const rateTag = document.getElementById('rateTag')?.textContent?.trim() || '-';

    const breakdownItems = Array.from(document.querySelectorAll('#calcBreakdown .breakdown-row')).map((row) => {
        const spans = row.querySelectorAll('span');
        return {
            label: spans[0]?.textContent?.trim().replace(/:$/, '') || '明細',
            value: spans[1]?.textContent?.trim() || row.textContent.trim()
        };
    });

    return {
        orderType: 'quote',
        title: '多人報價確認',
        subtitle: '多人報價下單明細',
        items: [
            { label: '服務類型', value: serviceLabel },
            { label: '目前分數', value: currentScore },
            { label: '目標分數', value: targetScore },
            { label: '總分差', value: scoreDiff },
            { label: '預計耗時', value: estTime },
            { label: '費率週次', value: rateTag },
            ...breakdownItems
        ],
        total: `NT$${finalPrice}`,
        note: '請確認以上報價內容無誤後，再透過官方 LINE 與工作室完成後續流程。'
    };
}

function orderMembershipNow() {
    confirmAndOpenOrderPage(buildMembershipOrderData());
}

function orderQuoteNow() {
    const orderData = buildQuoteOrderData();
    if (!orderData) return;
    confirmAndOpenOrderPage(orderData);
}

function copyPurchaseOrder() {
    const orderText = getPurchaseOrderText();
    navigator.clipboard.writeText(orderText).then(() => {
        alert('已複製訂單資訊，請直接私訊主播下單。');
    }).catch(() => {
        alert(`請手動複製以下訂單資訊：\n\n${orderText}`);
    });
}

function openPurchaseRegisterFlow() {
    openRegisterModal();
    const note = document.getElementById('regActivationCode');
    if (note) note.focus();
    alert(`您選擇的是：\n\n${getPurchaseOrderText()}\n\n若已向主播取得兌換碼，請直接完成註冊。`);
}

// --- 資料讀取與驗證 ---
async function loadData() {
    try {
        const membersSnapshot = await database.ref('members').once('value');
        const codesSnapshot = await database.ref('activationCodes').once('value');
        const queueSnapshot = await database.ref('queue').once('value');
        const sessionSnapshot = await database.ref('gameSession').once('value');

        const membersData = membersSnapshot.val() || {};
        const members = Object.keys(membersData).map(key => ({ ...membersData[key], username: key }));

        const codesData = codesSnapshot.val() || {};
        const activationCodes = Object.values(codesData);

        const queueData = queueSnapshot.val() || {};
        const queue = Object.values(queueData);

        // 排隊排序邏輯
        queue.sort((a, b) => {
            const priorityA = a.priorityLevel || 0;
            const priorityB = b.priorityLevel || 0;
            if (priorityA !== priorityB) {
                return priorityB - priorityA;
            }
            return new Date(a.joinTime) - new Date(b.joinTime);
        });

        return {
            members,
            activationCodes,
            queue,
            gameSession: sessionSnapshot.val()
        };
    } catch (error) {
        console.error('載入資料失敗:', error);
        return { members: [], activationCodes: [], queue: [], gameSession: null };
    }
}

async function saveData(members, activationCodes, queue, gameSession) {
    try {
        const membersObj = {};
        members.forEach(m => { membersObj[m.username] = m; });
        const codesObj = {};
        activationCodes.forEach(c => { codesObj[c.code] = c; });
        const queueObj = {};
        queue.forEach(q => { queueObj[q.username] = q; });

        await database.ref('members').set(membersObj);
        await database.ref('activationCodes').set(codesObj);
        await database.ref('queue').set(queueObj);
        await database.ref('gameSession').set(gameSession);
    } catch (error) {
        console.error('儲存資料失敗:', error);
        alert('資料儲存失敗，請稍後再試');
    }
}

async function validateSessionUser(username, retries = 3, delay = 500) {
    if (!username) return null;
    for (let i = 0; i < retries; i++) {
        try {
            const snapshot = await database.ref('members/' + username).once('value');
            if (snapshot.exists()) {
                let member = snapshot.val();
                member.username = username;
                return member;
            }
            if (i === retries - 1) return null;
        } catch (error) { console.error(`[Session] 驗證時載入失敗:`, error); }
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
    return null;
}

// 檢查並重置插隊次數
async function checkAndResetQuota(member) {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    if (member.quotaLastReset !== currentMonth && !member.isAdmin) {
        console.log(`為 ${member.username} 重置插隊次數...`);
        let newQuota = 0;
        if (member.level === 'legend') newQuota = 5;
        else if (member.level === 'diamond') newQuota = 2;
        member.priorityQuota = newQuota;
        member.quotaLastReset = currentMonth;
        try {
            await database.ref('members/' + member.username).update({
                priorityQuota: newQuota,
                quotaLastReset: currentMonth
            });
        } catch (error) { console.error('重置次數失敗:', error); }
    }
    return member;
}

function isAdmin() {
    if (!currentUser) return false;
    return currentUser.isAdmin === true;
}

// --- 倒數計時與自動刷新 ---
function startGlobalCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(async () => { await updateAllCountdowns(); }, 1000);
}

async function updateAllCountdowns() {
    try {
        const data = await loadData();
        const now = Math.floor(Date.now() / 1000);
        let membersToUpdate = {};

        data.members.forEach(member => {
            const elapsed = now - member.lastUpdateTime;
            if (elapsed > 0 && member.remainingSeconds > 0) {
                const oldRemaining = member.remainingSeconds;
                member.remainingSeconds = Math.max(0, member.remainingSeconds - elapsed);
                member.lastUpdateTime = now;
                if (oldRemaining !== member.remainingSeconds) {
                    membersToUpdate[member.username] = {
                        remainingSeconds: member.remainingSeconds,
                        lastUpdateTime: member.lastUpdateTime
                    };
                }
            }
        });

        if (Object.keys(membersToUpdate).length > 0) {
            for (const username in membersToUpdate) {
                await database.ref('members/' + username).update(membersToUpdate[username]);
            }
        }

        document.querySelectorAll('.countdown-time').forEach(element => {
            const username = element.getAttribute('data-username');
            if (username) {
                const member = data.members.find(m => m.username === username);
                if (member) {
                    const timeObj = secondsToTime(member.remainingSeconds);
                    element.textContent = formatTimeDisplay(timeObj);
                    element.className = 'countdown-time ' + getTimeColorClass(member.remainingSeconds);
                }
            }
        });

        if (currentPage === 'member' && currentUser) {
            const member = data.members.find(m => m.username === currentUser.username);
            if (member) {
                currentUser = member;
                const timeDisplay = document.querySelector('.time-display');
                if (timeDisplay) {
                    const timeObj = secondsToTime(member.remainingSeconds);
                    timeDisplay.textContent = formatTimeDisplay(timeObj);
                    timeDisplay.className = 'time-display ' + getTimeColorClass(member.remainingSeconds);
                }
            }
        }
    } catch (error) {
        console.error('更新倒數失敗:', error);
    }
}

function stopCountdown() {
    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
}

function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(async () => {
        const hasOpenModal = document.querySelector('.modal.active');
        const isLoading = document.getElementById('loadingOverlay').classList.contains('active');
        if (hasOpenModal || isLoading) return;
        if (currentPage === 'queue') await refreshQueueOnly();
    }, REFRESH_INTERVAL);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) { clearInterval(autoRefreshInterval); autoRefreshInterval = null; }
}

// --- [核心功能] 顯示排隊頁面 (修復功能消失問題) ---
async function refreshQueueOnly() {
    try {
        const data = await loadData();
    const trans = translations.zh;

        if (!currentUser || !data.gameSession) return;

        const queueStatusElement = document.querySelector('.queue-status');
        if (queueStatusElement) {
            const myQueueIndex = data.queue.findIndex(q => q.username === currentUser.username);
            const myPosition = myQueueIndex + 1;
            const queueCardElement = document.querySelector('.queue-card');
            
            if (queueCardElement && !document.getElementById('prioritySwitch')) {
                if (myPosition > 0) {
                    queueCardElement.innerHTML = `
                        <h3>${trans.queue_your_position_title}</h3>
                        <div class="queue-position">#${myPosition}</div>
                        <div style="color: #666;">${trans.queue_position_prefix} ${myPosition - 1} ${trans.queue_position_suffix}</div>
                        <button class="btn btn-danger" onclick="leaveQueue()">${trans.queue_leave}</button>
                    `;
                }
            }

            queueStatusElement.innerHTML = `
                <h3 style="margin-bottom: 15px;">${trans.queue_status_title} (${data.queue.length}${trans.queue_status_people}</h3>
                ${data.queue.length === 0 ? `<div class="empty-state" style="padding: 20px;">${trans.queue_empty}</div>` :
                data.queue.slice(0, 10).map((q, index) => {
                    const levelText = q.level === 'legend' ? trans.level_legend_simple :
                        q.level === 'diamond' ? trans.level_diamond_simple : trans.level_gold_simple;
                    const badgeClass = q.level === 'legend' ? 'badge-legend' :
                        q.level === 'diamond' ? 'badge-diamond' : 'badge-gold';
                    const isCurrent = q.username === currentUser.username;
                    const priorityIcon = q.priorityLevel === 2 ? '🔥' : (q.priorityLevel === 1 ? '💎' : '');

                    return `
                    <div class="queue-item ${isCurrent ? 'current' : ''}">
                        <div>
                            <strong>${priorityIcon} #${index + 1} ${q.nickname}</strong>
                            <span class="badge ${badgeClass}" style="margin-left: 10px;">${levelText}</span>
                            <div style="font-size: 12px; color: #666; margin-top: 3px;">CODM UID: ${q.gameUID}</div>
                        </div>
                        <div style="font-size: 14px; color: #666;">
                            ${new Date(q.joinTime).toLocaleTimeString('zh-TW')}
                        </div>
                    </div>`;
                }).join('')}
                ${data.queue.length > 10 ? `<div style="text-align: center; color: #666; margin-top: 10px;">${trans.queue_more_people_prefix} ${data.queue.length - 10} ${trans.queue_more_people_suffix}</div>` : ''}
            `;
        }
    } catch (error) { console.error('刷新排隊失敗:', error); }
}

async function showQueuePage() {
    const content = document.getElementById('queueContent');
    const trans = translations.zh;

    if (!currentUser) {
        content.innerHTML = `<div class="empty-state"><h3>${trans.queue_login_prompt}</h3></div>`;
        return;
    }

    showLoading();
    try {
        const snapshot = await database.ref('members/' + currentUser.username).once('value');
        if (snapshot.exists()) {
             let updatedUser = snapshot.val();
             updatedUser.username = currentUser.username;
             currentUser = await checkAndResetQuota(updatedUser);
        }

        const data = await loadData(); 

        if (currentUser.remainingSeconds <= 0) {
            content.innerHTML = `<div class="empty-state"><h3>${trans.queue_expired_prompt}</h3></div>`;
            hideLoading();
            return;
        }

        if (!data.gameSession) {
            content.innerHTML = `<div class="empty-state"><h3>${trans.queue_no_session}</h3><p>${trans.queue_wait_for_streamer}</p></div>`;
            hideLoading();
            return;
        }

        const myQueueIndex = data.queue.findIndex(q => q.username === currentUser.username);
        const myPosition = myQueueIndex + 1;
        
        const levelSimpleKey = (level) => {
            if (level === 'legend') return 'level_legend_simple';
            if (level === 'diamond') return 'level_diamond_simple';
            return 'level_gold_simple';
        };

        const quotaText = (trans.queue_priority_quota || '本月剩餘 <span>{0}</span> 次權限').replace('{0}', currentUser.priorityQuota);
        const onSwitchChange = `togglePriorityGlow(this.checked, ${currentUser.priorityQuota})`;

        content.innerHTML = `
<div style="text-align: right; margin-bottom: 10px; color: #666; font-size: 14px;">
    <span class="auto-refresh-indicator"></span> ${trans.queue_refreshing}
</div>
<div class="game-session-card">
    <h2>🎮 ${data.gameSession.gameName}</h2>
    <div class="game-session-info">${trans.queue_session_start_time} ${new Date(data.gameSession.startTime).toLocaleString('zh-TW')}</div>
    <div class="game-session-info">${trans.queue_session_slots} ${data.gameSession.slots}${trans.queue_session_slots_unit}</div>
    ${data.gameSession.description ? `<div style="margin-top: 10px; font-size: 0.9em;">${data.gameSession.description}</div>` : ''}
</div>

${myPosition > 0 ? `
<div class="queue-card">
    <h3>${trans.queue_your_position_title}</h3>
    <div class="queue-position">#${myPosition}</div>
    <div style="color: #666;">${trans.queue_position_prefix} ${myPosition - 1} ${trans.queue_position_suffix}</div>
    <button class="btn btn-danger" onclick="leaveQueue()">${trans.queue_leave}</button>
</div>
` : `
${(currentUser.level === 'diamond' || currentUser.level === 'legend') ? `
<div class="priority-queue-controls">
    <div class="priority-quota-display">
        ${trans.queue_priority_switch || '優先排隊'}
        <br>
        <small style="font-weight: normal;">(${quotaText})</small>
    </div>
    <label class="switch">
        <input type="checkbox" id="prioritySwitch" onchange="${onSwitchChange}" ${currentUser.priorityQuota <= 0 ? 'disabled' : ''}>
        <span class="slider"></span>
    </label>
</div>
` : ''}
<div class="queue-card">
    <h3>${trans.queue_join_title}</h3>
    <button id="btnJoinQueue" class="btn" onclick="joinQueue()" style="margin-top: 20px; font-size: 1.2em; padding: 15px 40px;">
        ${trans.queue_join_button}
    </button>
</div>
`}

<div class="queue-status">
    <h3 style="margin-bottom: 15px;">${trans.queue_status_title} (${data.queue.length}${trans.queue_status_people}</h3>
    ${data.queue.length === 0 ? `<div class="empty-state" style="padding: 20px;">${trans.queue_empty}</div>` :
    data.queue.slice(0, 10).map((q, index) => {
        const levelText = trans[levelSimpleKey(q.level)];
        const badgeClass = q.level === 'legend' ? 'badge-legend' :
            q.level === 'diamond' ? 'badge-diamond' : 'badge-gold';
        const isCurrent = q.username === currentUser.username;
        const priorityIcon = q.priorityLevel === 2 ? '🔥' : (q.priorityLevel === 1 ? '💎' : '');

        return `
<div class="queue-item ${isCurrent ? 'current' : ''}">
    <div>
        <strong>${priorityIcon} #${index + 1} ${q.nickname}</strong>
        <span class="badge ${badgeClass}" style="margin-left: 10px;">${levelText}</span>
        <div style="font-size: 12px; color: #666; margin-top: 3px;">CODM UID: ${q.gameUID}</div>
    </div>
    <div style="font-size: 14px; color: #666;">
        ${new Date(q.joinTime).toLocaleTimeString('zh-TW')}
    </div>
</div>
`;
    }).join('')}
    ${data.queue.length > 10 ? `<div style="text-align: center; color: #666; margin-top: 10px;">${trans.queue_more_people_prefix} ${data.queue.length - 10} ${trans.queue_more_people_suffix}</div>` : ''}
</div>
`;
    } catch (error) {
        console.error('顯示排隊頁面失敗:', error);
        content.innerHTML = `<div class="empty-state"><h3>${trans.queue_load_fail}</h3></div>`;
    } finally {
        hideLoading();
    }
}

// --- [核心功能] 加入與離開排隊 ---
async function joinQueue() {
    showLoading();
    const trans = translations.zh;
    const switchElement = document.getElementById('prioritySwitch');
    const usePriority = switchElement ? switchElement.checked : false;
    let priorityLevel = 0; 

    if (usePriority) {
        if (currentUser.priorityQuota <= 0) {
            alert(trans.queue_priority_no_quota || '您的優先排隊權限已用完');
            switchElement.checked = false;
            togglePriorityGlow(false, 0);
            hideLoading();
            return;
        }
        if (!confirm(trans.alert_priority_confirm || '確定要使用 1 次優先排隊權限嗎？')) {
            hideLoading(); return;
        }
        priorityLevel = (currentUser.level === 'legend') ? 2 : 1;
    }

    try {
        const snapshot = await database.ref('queue/' + currentUser.username).once('value');
        if (snapshot.exists()) {
            alert(trans.alert_already_in_queue);
            hideLoading();
            return;
        }

        const queueItem = {
            username: currentUser.username,
            nickname: currentUser.nickname,
            gameUID: currentUser.gameUID,
            level: currentUser.level,
            joinTime: new Date().toISOString(),
            priorityLevel: priorityLevel
        };

        await database.ref('queue/' + currentUser.username).set(queueItem);

        if (usePriority) {
            currentUser.priorityQuota -= 1;
            await database.ref('members/' + currentUser.username + '/priorityQuota').set(currentUser.priorityQuota);
        }

        alert(trans.alert_join_queue_success);
        showQueuePage(); 
    } catch (error) {
        console.error('加入排隊失敗:', error);
        alert(trans.alert_join_queue_fail);
    } finally {
        hideLoading();
    }
}

async function leaveQueue() {
    const trans = translations.zh;
    if (!confirm(trans.alert_leave_queue_confirm || '確定要離開排隊嗎？')) return;

    showLoading();
    try {
        await database.ref('queue/' + currentUser.username).remove();
        alert(trans.alert_leave_queue_success || '已離開排隊');
        await showQueuePage();
    } catch (error) {
        console.error('離開排隊失敗:', error);
        alert(trans.alert_leave_queue_fail || '離開排隊失敗，請稍後再試');
    } finally {
        hideLoading();
    }
}

function togglePriorityGlow(isON, quota) {
    const btn = document.getElementById('btnJoinQueue');
    const trans = translations.zh;
    if (btn) {
        if (isON && quota > 0) {
            btn.classList.add('priority-glow');
        } else {
            btn.classList.remove('priority-glow');
            btn.innerHTML = `${trans.queue_join_button || '一鍵排隊'}`;
        }
    }
}

// --- [核心功能] 顯示會員資訊 (修復功能消失問題) ---
async function showMemberInfo() {
    const content = document.getElementById('memberContent');
    const trans = translations.zh;

    if (!currentUser) {
        content.innerHTML = `<div class="empty-state"><h3>${trans.member_login_prompt}</h3></div>`;
        return;
    }

    showLoading();
    try {
        const snapshot = await database.ref('members/' + currentUser.username).once('value');
        if (!snapshot.exists()) {
            alert('錯誤：找不到您的會員資料，請重新登入');
            logout();
            return;
        }
        
        let updatedUser = snapshot.val();
        updatedUser.username = currentUser.username;
        updatedUser = await checkAndResetQuota(updatedUser);
        
        const now = Math.floor(Date.now() / 1000);
        const elapsed = now - updatedUser.lastUpdateTime;
        if (elapsed > 0 && updatedUser.remainingSeconds > 0) {
            updatedUser.remainingSeconds = Math.max(0, updatedUser.remainingSeconds - elapsed);
            updatedUser.lastUpdateTime = now;
            await database.ref('members/' + updatedUser.username).update({
                remainingSeconds: updatedUser.remainingSeconds,
                lastUpdateTime: updatedUser.lastUpdateTime
            });
        }
        
        currentUser = updatedUser; 

        const levelKey = currentUser.level === 'legend' ? 'level_legend' :
            currentUser.level === 'diamond' ? 'level_diamond' : 'level_gold';
        const levelText = trans[levelKey];
        const badgeClass = currentUser.isAdmin ? 'badge-admin' : 
                          (currentUser.level === 'legend' ? 'badge-legend' : 
                          (currentUser.level === 'diamond' ? 'badge-diamond' : 'badge-gold'));
        const timeObj = secondsToTime(currentUser.remainingSeconds);
        const timeClass = getTimeColorClass(currentUser.remainingSeconds);

        const codeSnapshot = await database.ref('activationCodes/' + currentUser.activationCode).once('value');
        const codeData = codeSnapshot.val();
        const codeTimeObj = codeData ? secondsToTime(codeData.seconds) : null;
	const displayLevelName = currentUser.isAdmin ? '系統管理員' : trans['level_' + currentUser.level];

        content.innerHTML = `
<div class="member-info">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <h2>👤 ${currentUser.nickname}</h2>
        
        ${currentUser.isAdmin ? `
            <a href="admin.html" class="admin-gear-btn" title="進入管理後台">
                <span style="font-size: 24px;">⚙️</span>
            </a>
        ` : ''}
    </div>
    <div class="info-item">
        <span>${trans.member_platform}</span>
        <span>${currentUser.gameName || '-'}</span>
    </div>
    <div class="info-item">
        <span>${trans.member_phone}</span>
        <span>${currentUser.phoneNumber || '-'}</span>
    </div>
    <div class="info-item">
        <span>${trans.member_level}</span>
        <span class="badge ${badgeClass}">${levelText}</span>
    </div>
    <div class="info-item">
        <span>${trans.member_uid}</span>
        <div class="copy-area">
            <span>${currentUser.gameUID}</span>
            <button class="btn-copy" onclick="copyToClipboard('${currentUser.gameUID}', this)">📋 ${trans.copy}</button>
        </div>
    </div>
    <div class="info-item">
        <span>${trans.member_code}</span>
        <span style="font-family: 'Courier New', monospace; font-weight: bold;">${currentUser.activationCode}</span>
    </div>
    ${codeData ? `
    <div class="info-item">
        <span>${trans.member_code_duration}</span>
        <span>${formatTimeDisplay(codeTimeObj)}</span>
    </div>
    ` : ''}
    <div class="info-item">
        <span>${trans.member_join_date}</span>
        <span>${new Date(currentUser.joinDate).toLocaleDateString('zh-TW')}</span>
    </div>
    <div class="info-item">
        <span>${trans.member_remaining_sec}</span>
        <span class="countdown-time ${timeClass}" data-username="${currentUser.username}">${currentUser.remainingSeconds.toLocaleString()} 秒</span>
    </div>
    ${currentUser.isAdmin ? `
    <div class="info-item">
        <span>${trans.member_permission}</span>
        <span class="badge-admin">${trans.member_admin}</span>
    </div>
    ` : ''}
</div>
<div style="text-align: center; padding: 30px;">
    <h3 style="margin-bottom: 10px;">${trans.member_remaining_time}</h3>
    <div class="time-display ${timeClass}">${formatTimeDisplay(timeObj)}</div>
    ${currentUser.remainingSeconds <= 0 ? `<p style="color: #e74c3c; margin-top: 10px;">${trans.member_expired}</p>` : ''}
</div>

<div class="settings-section">
    <h4>⚙️ ${trans.member_account_settings}</h4>
    <button class="btn btn-small" onclick="openChangePasswordModal()">🔒 ${trans.member_change_password}</button>
</div>
`;
    } catch (error) {
        console.error('顯示會員資訊失敗:', error);
        content.innerHTML = `<div class="empty-state"><h3>${trans.member_load_fail}</h3></div>`;
    } finally {
        hideLoading();
    }
}
// --- [新增] 智慧報價計算機邏輯 ---
function initCalculator() {
    database.ref('calculatorConfig').on('value', (snapshot) => {
        calcConfig = snapshot.val() || DEFAULT_CALC_CONFIG;
        console.log('✅ 計算機參數已更新');
        renderQuoteWeekOptions();
        if (currentPage === 'calculator') {
            updateWeekDisplay();
            calculate();
            renderPricingTables();
        }
    });
}

function switchCalcTab(tabName, btn) {
    const buttons = btn.parentElement.querySelectorAll('.sub-tab');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('calc-sub-main').style.display = 'none';
    document.getElementById('calc-sub-algorithm').style.display = 'none';
    document.getElementById('calc-sub-manual').style.display = 'none';

    document.getElementById('calc-sub-' + tabName).style.display = 'block';
    if(tabName === 'algorithm') renderPricingTables();
}

function setServiceType(type) {
    currentServiceType = type;
    document.querySelectorAll('.service-option').forEach(el => el.classList.remove('active'));
    document.getElementById(type === 'boost' ? 'optBoost' : 'optCarry').classList.add('active');
    calculate();
}

// 1. [修改] 取得目前週次 (移除寫死的 9)
function getSeasonWeek() {
    if (!calcConfig) return 1;
    const start = new Date(calcConfig.seasonStartDate);
    const now = new Date();
    
    // 負數處理：還沒開始算 Week 1
    if (now < start) return 1;

    const diffTime = now - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let week = Math.ceil(diffDays / 7);
    
    if (week < 1) week = 1;
    
    // 檢查是否有結束日期，如果有，週次不應超過最大週數
    if (calcConfig.seasonEndDate) {
        const end = new Date(calcConfig.seasonEndDate);
        const totalDiff = end - start;
        const totalDays = Math.ceil(totalDiff / (1000 * 60 * 60 * 24));
        const maxWeeks = Math.ceil((totalDays + 1) / 7);
        if (week > maxWeeks) week = maxWeeks; // 超過時間就停留在最後一週
    } else {
        // 如果沒有設定結束日期，預設上限 9 (相容舊資料)
        if (week > 9) week = 9;
    }
    
    return week;
}

function getTotalSeasonWeeks() {
    if (!calcConfig) return 9;
    if (calcConfig.seasonStartDate && calcConfig.seasonEndDate) {
        const start = new Date(calcConfig.seasonStartDate);
        const end = new Date(calcConfig.seasonEndDate);
        const totalDiff = end - start;
        const totalDays = Math.ceil(totalDiff / (1000 * 60 * 60 * 24));
        const maxWeeks = Math.ceil((totalDays + 1) / 7);
        return maxWeeks < 1 ? 1 : maxWeeks;
    }
    return 9;
}

function renderQuoteWeekOptions() {
    const select = document.getElementById('quoteWeekSelect');
    if (!select) return;

    const currentWeek = getSeasonWeek();
    const totalWeeks = getTotalSeasonWeeks();
    const previousValue = select.value;

    let optionsHtml = `<option value="current">目前週次 (Week ${currentWeek})</option>`;
    for (let i = 1; i <= totalWeeks; i++) {
        optionsHtml += `<option value="${i}">Week ${i}</option>`;
    }
    select.innerHTML = optionsHtml;

    if (previousValue === 'current') {
        select.value = 'current';
    } else {
        const previousWeek = Number(previousValue);
        select.value = (previousWeek >= 1 && previousWeek <= totalWeeks) ? String(previousWeek) : 'current';
    }
}

function getSelectedQuoteWeek() {
    const select = document.getElementById('quoteWeekSelect');
    if (!select || select.value === 'current') return getSeasonWeek();

    const selectedWeek = Number(select.value);
    if (!Number.isFinite(selectedWeek) || selectedWeek < 1) return getSeasonWeek();

    const totalWeeks = getTotalSeasonWeeks();
    return Math.min(selectedWeek, totalWeeks);
}

function updateWeekDisplay() {
    const week = getSeasonWeek();
    const weekEl = document.getElementById('currentWeekDisplay');
    if(weekEl) weekEl.textContent = `Week ${week}`;
}

// ==========================================
// ▼▼▼ 修正 calculate 函式 (支援新舊資料結構) ▼▼▼
// ==========================================

function calculate() {
    // 1. 隱藏之前的結果
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('emptyState').style.display = 'none';

    if (!calcConfig) return;

    const currentInput = document.getElementById('currentScore').value;
    const targetInput = document.getElementById('targetScore').value;
    
    // 尚未輸入時不動作
    if (!currentInput || !targetInput) {
        document.getElementById('emptyState').style.display = 'block';
        return;
    }

    const current = parseInt(currentInput);
    const target = parseInt(targetInput);
    const week = getSelectedQuoteWeek();

    // 限制大師 (4501) 以下不接單
    if (current < 4501) {
        alert("⚠️ 抱歉，本系統目前僅受理「大師 (4501分)」以上的報價。\n\n4501分以下的上分需求，請直接私訊主播詢問！");
        return;
    }

    // 限制上限：上分最高 14000 分、護航最高 12000 分
    const maxAllowedScore = currentServiceType === 'boost' ? 14000 : 12000;
    const serviceLabel = currentServiceType === 'boost' ? '上分' : '護航';

    if (current > maxAllowedScore) {
        alert(`⚠️ 目前分數超過${serviceLabel}上限（${maxAllowedScore}分）。\n\n超過 ${maxAllowedScore} 分的${serviceLabel}需求，請直接私訊主播詢問！`);
        return;
    }

    if (target > maxAllowedScore) {
        alert(`⚠️ 目標分數超過${serviceLabel}上限（${maxAllowedScore}分）。\n\n請將目標分數調整至 ${maxAllowedScore} 分以下，或直接私訊主播詢問！`);
        return;
    }

    // 防呆機制
    if (target <= current) {
        alert("⚠️ 目標分數必須高於目前分數");
        return;
    }

    // 顯示結果區塊
    document.getElementById('resultContent').style.display = 'block';

    let totalPrice = 0;
    let scoreDiff = target - current;
    
    let breakdownHtml = `
        <div style="margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid #444; font-size: 0.9em; color: #aaa;">
            ℹ️ 公式：基礎價 × 權重 × 單位數(每100分) = 價格
        </div>
        <div style="margin-bottom:5px; color:#00f3ff; font-weight:bold;">
            📝 計算明細:
        </div>`;

    const TIERS = [
        { name: 'master', label: '大師', min: 4501, max: 6000 },
        { name: 'grandmaster', label: '宗師', min: 6001, max: 8000 },
        { name: 'legend', label: '傳奇(10000-)', min: 8001, max: 10000 }, // 修改 label
        { name: 'mythical', label: '萬分(10000+)', min: 10001, max: 99999 } // 修改 label
    ];

    let hasClosedTier = false;

    TIERS.forEach(tier => {
        let overlapStart = Math.max(current, tier.min);
        let overlapEnd = Math.min(target, tier.max);
        
        if (overlapEnd > overlapStart) {
            let pointsInTier = overlapEnd - overlapStart;
            let units = Math.ceil(pointsInTier / 100); 
            let weightData;

// 因為現在 boost 和 carry 結構一樣 (都有 4 個 rank)，邏輯可以統一
if (calcConfig.weights[currentServiceType] && calcConfig.weights[currentServiceType][week]) {
    // 直接根據 tier.name (master, grandmaster, legend, mythical) 去抓
    weightData = calcConfig.weights[currentServiceType][week][tier.name];
    
    // 如果找不到 (例如舊資料 boost 沒有 master)，嘗試抓舊的 normal
    if (!weightData && currentServiceType === 'boost' && tier.name !== 'mythical') {
        weightData = calcConfig.weights.boost[week].normal;
    }
}
            let base = calcConfig.basePrices[currentServiceType][tier.name];

            // 判斷 weightData 是物件 {w, e} 還是純數字
            let weight = (typeof weightData === 'object' && weightData !== null) ? weightData.w : weightData;
            weight = Number(weight) || 0;

            if (weight === 0) {
                hasClosedTier = true;
                breakdownHtml += `
                <div class="breakdown-row" style="color: #ff0055;">
                    <span class="breakdown-label">${tier.label}區間:</span>
                    <span class="breakdown-value">🚫 暫未開放</span>
                </div>`;
            } else {
                let tierPrice = base * weight * units;
                totalPrice += tierPrice;

                breakdownHtml += `
                <div class="breakdown-row" style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span style="color:#ccc;">${tier.label} (${pointsInTier}分):</span>
                    <span style="color:#fff; font-family:monospace;">
                        $${base} × ${weight} × ${units}單位 = <span style="color:#39ff14;">$${Math.round(tierPrice)}</span>
                    </span>
                </div>`;
            }
        }
    });

    // 處理結果顯示
    if (hasClosedTier) {
        document.getElementById('rateTag').textContent = "⛔ 包含未開放區間";
        document.getElementById('rateTag').className = "badge badge-legend"; 
        document.getElementById('finalPrice').textContent = "---";
        document.querySelector('.btn-success').disabled = true; 
        document.getElementById('calcBreakdown').innerHTML = breakdownHtml; 
    } else {
        document.getElementById('rateTag').textContent = `Week ${week} 費率`;
        document.getElementById('rateTag').className = "badge badge-gold";
        document.getElementById('finalPrice').textContent = Math.round(totalPrice).toLocaleString();
        document.querySelector('.btn-success').disabled = false;
        
        breakdownHtml += `
        <div class="breakdown-total" style="border-top:1px solid #444; margin-top:5px; padding-top:5px; text-align:right;">
            總計: <span style="color:#39ff14; font-size:1.2em;">$${Math.round(totalPrice).toLocaleString()}</span>
        </div>`;
        document.getElementById('calcBreakdown').innerHTML = breakdownHtml;
    }

    document.getElementById('scoreDiff').textContent = `${scoreDiff} 分`;
    
    // 預估時間計算 (從後台讀取真實效率數據)
    let totalHours = 0;
    TIERS.forEach(tier => {
        let overlapStart = Math.max(current, tier.min);
        let overlapEnd = Math.min(target, tier.max);
        
        if (overlapEnd > overlapStart) {
            let pointsInTier = overlapEnd - overlapStart;
            let weightData;
            
            if (calcConfig.weights[currentServiceType] && calcConfig.weights[currentServiceType][week]) {
                weightData = calcConfig.weights[currentServiceType][week][tier.name];
                if (!weightData && currentServiceType === 'boost' && tier.name !== 'mythical') {
                    weightData = calcConfig.weights.boost[week].normal;
                }
            }
            
            // 取得效率值 (E)，如果沒有則用預設值
            let efficiency = (typeof weightData === 'object' && weightData !== null) 
                ? (weightData.e || (currentServiceType === 'boost' ? 500 : 300))
                : (currentServiceType === 'boost' ? 500 : 300);
            
            totalHours += pointsInTier / efficiency;
        }
    });
    
    document.getElementById('estTime').textContent = `約 ${totalHours.toFixed(2)} 小時`;
    
    document.getElementById('compareBox').style.display = 'none';
}
// ==========================================
// ▼▼▼ 修正 renderPricingTables 函式 (顯示 8 欄位) ▼▼▼
// ==========================================

function renderPricingTables() {
    if (!calcConfig) return; 

    const currentWeek = getSeasonWeek();
    
    // 計算總週數
    const totalWeeks = getTotalSeasonWeeks();

    const bp = calcConfig.basePrices;

    // --- 1. 修正基礎價格表格 ---
    const tableBase = document.getElementById('tableBasePrices');
    if (tableBase) {
        tableBase.innerHTML = `
            <thead>
                <tr>
                    <th style="width: 20%;">服務項目</th>
                    <th style="width: 20%;">大師 (Master)</th>
                    <th style="width: 20%;">宗師 (GM)</th>
                    <th style="width: 20%;">傳奇 (10000-)</th>
                    <th style="width: 20%;">萬分 (10000+)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="color: #00f3ff; font-weight: bold;">⚡ 急速上分</td>
                    <td>$${bp.boost.master}</td>
                    <td>$${bp.boost.grandmaster}</td>
                    <td>$${bp.boost.legend}</td>
                    <td>$${bp.boost.mythical}</td>
                </tr>
                <tr>
                    <td style="color: #bd00ff; font-weight: bold;">🛡️ 皇家護航</td>
                    <td>$${bp.carry.master}</td>
                    <td>$${bp.carry.grandmaster}</td>
                    <td>$${bp.carry.legend}</td>
                    <td>$${bp.carry.mythical}</td>
                </tr>
            </tbody>
        `;
    }
    

    // --- 權重表格 (改為顯示 8 個欄位) ---
    const tableWeights = document.getElementById('tableWeights');
    if (tableWeights) {
        const formatWeightCell = (value) => {
            if (!value || value === 0) {
                return `<td class="closed-slot" title="本時段不開放"></td>`;
            }
            return `<td>${value}</td>`;
        };

        // 表頭結構：每週 8 欄 (上分4 + 護航4)
        let weightHtml = `
            <thead>
                <tr>
                    <th rowspan="2" style="vertical-align: middle; width: 8%;">週次</th>
                    <th colspan="4" style="color: #00f3ff; border-bottom: 2px solid rgba(0, 243, 255, 0.3);">⚡ 上分權重</th>
                    <th colspan="4" style="color: #bd00ff; border-bottom: 2px solid rgba(189, 0, 255, 0.3);">🛡️ 護航權重</th>
                </tr>
                <tr class="sub-header">
                    <th style="font-size: 0.8em; color: #88ffff;">大師</th>
                    <th style="font-size: 0.8em; color: #88ffff;">宗師</th>
                    <th style="font-size: 0.8em; color: #88ffff;">傳奇(10000-)</th> <th style="font-size: 0.8em; color: #88ffff;">萬分(10000+)</th> <th style="font-size: 0.8em; color: #eebbff;">大師</th>
                    <th style="font-size: 0.8em; color: #eebbff;">宗師</th>
                    <th style="font-size: 0.8em; color: #eebbff;">傳奇(10000-)</th> <th style="font-size: 0.8em; color: #eebbff;">萬分(10000+)</th> </tr>
            </thead>
            <tbody>
        `;

        const services = ['boost', 'carry'];
        const ranks = ['master', 'grandmaster', 'legend', 'mythical'];

        for (let i = 1; i <= totalWeeks; i++) {
            const isCurrent = (i === currentWeek);
            const rowStyle = isCurrent 
                ? 'background: rgba(255, 215, 0, 0.15); font-weight: bold; font-size: 1.1em; border-left: 6px solid #FFD700;' 
                : 'border-left: 6px solid transparent;';
            
            weightHtml += `<tr style="${rowStyle}"><td>Week ${i}</td>`;

            services.forEach(service => {
                ranks.forEach(rank => {
                    // 安全讀取資料
                    let data = (calcConfig.weights[service] && calcConfig.weights[service][i]) 
                               ? calcConfig.weights[service][i][rank] : 0;

                    // 相容舊資料 boost.normal
                    if (!data && service === 'boost' && rank !== 'mythical') {
                        data = (calcConfig.weights.boost && calcConfig.weights.boost[i]) 
                               ? calcConfig.weights.boost[i].normal : 0;
                    }

                    // 取權重值 (如果是物件 {w, e} 取 w，如果是數字取數字)
                    let val = (typeof data === 'object' && data !== null) ? data.w : data;
                    
                    weightHtml += formatWeightCell(val);
                });
            });

            weightHtml += `</tr>`;
        }
        weightHtml += `</tbody>`;
        tableWeights.innerHTML = weightHtml;
    }
}

// --- [更新右上角用戶資訊] ---
function updateUserSection() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return;

    // 1. 統一顯示名稱 (不包含重複圖示的邏輯)
    const levelMap = {
        'gold': '💛 黃金會員',
        'diamond': '💎 鑽石會員',
        'legend': '🔥 傳說會員',
        'admin': '⚙️ 系統管理員'
    };

    // 2. 這裡使用 "=" 而不是 "+="，確保每次執行都是從頭開始，不會疊加舊的內容
    let html = ``;

    if (currentUser) {
        const userLevelKey = currentUser.isAdmin ? 'admin' : (currentUser.level || 'free');
        const displayLevel = levelMap[userLevelKey] || '👤 一般用戶';
        
        // 3. 確保所有階級都有對應的 CSS Class
        let tierClass = "user-role";
        if (currentUser.isAdmin) {
            tierClass += " tier-admin";
        } else {
            // 這裡用 userLevelKey 直接比對，保證黃金、鑽石、傳說都會被正確標記
            if (userLevelKey === "gold") tierClass += " tier-gold";
            if (userLevelKey === "diamond") tierClass += " tier-diamond";
            if (userLevelKey === "legend") tierClass += " tier-legend";
        }

        // 4. 只拼接一次內容
        html += `
            <div class="user-info-btn" onclick="showPage('member')">
                <span class="user-name" style="color: #ffffff; font-weight: bold; font-size: 0.9em;">${currentUser.nickname || currentUser.username}</span>
                <span class="${tierClass}">${displayLevel}</span>
            </div>
            <button class="btn btn-small btn-danger" onclick="logout()" style="margin-left: 10px; border-color: #ff4757; color: #ff4757;">登出</button>
        `;
    } else {
        html += `
            <button class="btn btn-small" onclick="openLoginModal()">登入</button>
            <button class="btn btn-success btn-small" onclick="openRegisterModal()">註冊</button>
        `;
    }

    // 5. 寫入 DOM
    userSection.innerHTML = html;
}
// --- [核心頁面切換邏輯] ---
function showPage(pageId) {
    currentPage = pageId;
    toggleDmzFloatingCartBar(pageId);
    
    // 1. 切換分頁內容顯示
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.classList.remove('page-enter');
    });
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        // 強制回流，確保每次切換都會重播入場動畫
        void target.offsetWidth;
        target.classList.add('page-enter');
    } else {
        console.error("找不到 ID 為 " + pageId + " 的頁面區塊");
    }

    // 2. 更新右側導航按鈕高亮
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const action = btn.getAttribute('onclick') || "";
        if (action.includes(`'${pageId}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 3. 載入資料
    if (pageId === 'member') {
        if (typeof showMemberInfo === 'function') showMemberInfo();
        startAutoRefresh();
    } else if (pageId === 'queue') {
        if (typeof showQueuePage === 'function') showQueuePage();
        startAutoRefresh();
    } else if (pageId === 'calculator') {
        stopAutoRefresh();
        if(typeof renderPricingTables === 'function') renderPricingTables();
        if(typeof updateWeekDisplay === 'function') updateWeekDisplay();
    } else if (pageId === 'dmz-quote') {
        stopAutoRefresh();
        bindDmzTaskStructureRealtime();
        updateDmzQuoteSummary();
    } else if (pageId === 'dmz-guns') {
        stopAutoRefresh();
        updateDmzCartSummary();
        renderDmzProductGrid(currentDmzProductsCache);
        updateDmzGunAccessorySummary();
        switchDmzGunsTab(currentDmzGunsTab);
    } else if (pageId === 'dmz-cart') {
        stopAutoRefresh();
        updateDmzCartSummary();
        renderDmzCartPage();
    } else if (pageId === 'purchase') {
        stopAutoRefresh();
        updatePurchasePage();
    } else {
        stopAutoRefresh();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Modal 控制
function openLoginModal() { 
    closeRegisterModal(); // 開啟登入前先關閉註冊
    document.getElementById('loginModal').classList.add('active'); 
}
function closeLoginModal() { document.getElementById('loginModal').classList.remove('active'); document.getElementById('loginUsername').value = ''; document.getElementById('loginPassword').value = ''; }
function openRegisterModal() { 
    closeLoginModal();    // 開啟註冊前先關閉登入
    document.getElementById('registerModal').classList.add('active'); 
}
function closeRegisterModal() { 
    document.getElementById('registerModal').classList.remove('active'); 
    document.getElementById('regActivationCode').value = '';
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    document.getElementById('regGameName').value = '';
    document.getElementById('regPhoneNumber').value = '';
    document.getElementById('regGameUID').value = '';
    document.getElementById('regPrivacyAgree').checked = false;
}
function openChangePasswordModal() { document.getElementById('changePasswordModal').classList.add('active'); }
function closeChangePasswordModal() { 
    document.getElementById('changePasswordModal').classList.remove('active'); 
}
function openForgotPasswordModal() {
    closeLoginModal();
    document.getElementById('forgotPasswordModal').classList.add('active');
    document.getElementById('securityQuestionSection').style.display = 'none';
    document.getElementById('resetPasswordSection').style.display = 'none';
    document.getElementById('forgotUsername').value = '';
}
function closeForgotPasswordModal() { document.getElementById('forgotPasswordModal').classList.remove('active'); forgotPasswordUser = null; }
function closeEditMemberModal() { document.getElementById('editMemberModal').classList.remove('active'); editingMember = null; }

window.addEventListener('click', (event) => {
    const dmzModal = document.getElementById('dmzImagePreviewModal');
    if (dmzModal && event.target === dmzModal) {
        closeDmzImagePreview();
    }
});

// ==========================================
// ▼▼▼ 動作函式整合包 (登入/註冊/登出) ▼▼▼
// ==========================================

// 1. 登入功能
async function login() {
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!usernameInput || !passwordInput) return;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const trans = translations.zh;

    if (!username || !password) {
        alert(trans.alert_input_prompt || '請輸入帳號密碼');
        return;
    }

    showLoading();
    try {
        const snapshot = await database.ref('members/' + username).once('value');
        if (!snapshot.exists()) {
            alert(trans.alert_login_wrong || '帳號或密碼錯誤');
            hideLoading();
            return;
        }

        const memberData = snapshot.val();
        const inputHash = await hashPassword(password);

        // 相容舊密碼與雜湊密碼
        if (memberData.passwordHash === inputHash || memberData.password === inputHash) {
            sessionStorage.setItem('currentUser', username);
            alert(trans.alert_login_success || '登入成功');
            closeLoginModal();
            location.reload(); 
        } else {
            alert(trans.alert_login_wrong || '帳號或密碼錯誤');
        }
    } catch (error) {
        console.error('登入錯誤:', error);
        alert(trans.alert_op_fail || '系統錯誤');
    } finally {
        hideLoading();
    }
}

// 2. 登出功能
function logout() {
    const trans = translations.zh;
    if (confirm(trans.alert_logout || '確定要登出嗎？')) {
        sessionStorage.removeItem('currentUser');
        currentUser = null;
        location.reload();
    }
}

// 3. 註冊功能 (完整邏輯)
async function register() {
    const code = document.getElementById('regActivationCode').value.trim().toUpperCase();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
    const gameName = document.getElementById('regGameName').value.trim();
    const phoneNumber = document.getElementById('regPhoneNumber').value.trim();
    const gameUID = document.getElementById('regGameUID').value.trim();
    const secQ = document.getElementById('regSecurityQuestion').value;
    const secA = document.getElementById('regSecurityAnswer').value.trim();
    const privacyAgreed = document.getElementById('regPrivacyAgree').checked;
    const trans = translations.zh;

    if (!code || !username || !password || !confirmPassword || !gameName || !phoneNumber || !gameUID || !secQ || !secA) {
        alert(trans.alert_fill_all || '請填寫完整資訊');
        return;
    }
    if (!privacyAgreed) {
        alert('請先勾選同意隱私權政策');
        return;
    }
    if (password.length < 6) {
        alert(trans.alert_password_short || '密碼過短');
        return;
    }
    if (password !== confirmPassword) {
        alert(trans.alert_password_mismatch || '密碼不一致');
        return;
    }

    showLoading();
    try {
        const userSnap = await database.ref('members/' + username).once('value');
        if (userSnap.exists()) {
            alert(trans.alert_user_exist || '使用者名稱已存在');
            hideLoading(); return;
        }

        const codeSnap = await database.ref('activationCodes/' + code).once('value');
        const codeData = codeSnap.val();

        if (!codeSnap.exists()) {
            alert(trans.alert_code_not_exist || '兌換碼不存在');
            hideLoading(); return;
        }
        if (codeData.used) {
            alert(trans.alert_code_used || '此兌換碼已被使用');
            hideLoading(); return;
        }

        const passwordHash = await hashPassword(password);
        const newMember = {
            nickname: username,
            username: username,
            passwordHash: passwordHash,
            gameName: gameName,
            phoneNumber: phoneNumber,
            gameUID: gameUID,
            activationCode: code,
            level: codeData.level,
            remainingSeconds: codeData.seconds,
            joinDate: new Date().toISOString(),
            lastUpdateTime: Math.floor(Date.now() / 1000),
            priorityQuota: (codeData.level === 'legend' ? 5 : (codeData.level === 'diamond' ? 2 : 0)),
            quotaLastReset: new Date().toISOString().slice(0, 7),
            securityQuestion: secQ,
            securityAnswer: secA,
            privacyPolicyAgreedAt: new Date().toISOString(),
            isAdmin: false
        };

        const updates = {};
        updates['members/' + username] = newMember;
        updates['activationCodes/' + code + '/used'] = true;
        updates['activationCodes/' + code + '/usedBy'] = username;
        updates['activationCodes/' + code + '/usedDate'] = new Date().toISOString();

        await database.ref().update(updates);
        alert(trans.alert_register_success || '註冊成功！請登入');
        closeRegisterModal();

    } catch (error) {
        console.error('註冊失敗:', error);
        alert(trans.alert_op_fail || '註冊發生錯誤');
    } finally {
        hideLoading();
    }
}

// 4. 其他功能佔位符 (防止報錯)
async function checkSecurityQuestion() { alert("功能維護中"); }
async function verifySecurityAnswer() { console.log("驗證..."); }
async function resetPassword() { console.log("重設..."); }
async function changePassword() { alert("請聯繫管理員修改密碼"); }

// 初始化
async function initialize() {
    showLoading();
    try {
        initCalculator();

        const loggedInUsername = sessionStorage.getItem('currentUser');
        if (loggedInUsername) {
            let member = await validateSessionUser(loggedInUsername);
            if (member) {
                member = await checkAndResetQuota(member);
                currentUser = member;
                console.log(`Session 驗證成功: ${currentUser.username}`);
            } else {
                console.log('Session 驗證失敗，清除儲存的登入狀態');
                sessionStorage.removeItem('currentUser');
            }
        }

        updateUserSection();
        await loadHomeMemberLists();
        bindDmzProductsRealtime();
        initHomeMemberTilt();
        updatePurchasePage();
        updateDmzQuoteSummary();
        updateDmzGunAccessorySummary();
        updateDmzCartSummary();
        renderDmzCartPage();
        startGlobalCountdown();
        
        function setupEnterListener(inputId, callback) {
            const element = document.getElementById(inputId);
            if (element) {
                element.addEventListener('keyup', function(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        callback();
                    }
                });
            }
        }

        setupEnterListener('loginUsername', login);
        setupEnterListener('loginPassword', login);
        setupEnterListener('regSecurityAnswer', register);
        setupEnterListener('changeConfirmPassword', changePassword);
        setupEnterListener('forgotUsername', checkSecurityQuestion);
        setupEnterListener('securityAnswer', verifySecurityAnswer);
        setupEnterListener('confirmNewPassword', resetPassword);

    } catch (error) {
        console.error('系統初始化失敗:', error);
        alert('系統初始化失敗，請重新整理頁面');
    } finally {
        hideLoading();
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
}

console.log('⏳ 等待 Firebase 認證...');

// --- 翻譯邏輯 ---
const translations = {
    'zh': {
        'page_title': '廖嘉泰の管理系統',
        'app_title': '🎮 廖嘉泰の管理系統',
        'app_subtitle': '📢 GAME LIVE 主播專屬平台',
        'login': '登入',
        'register': '註冊',
        'tab_home': '首頁',
        'tab_queue': '排隊系統',
        'tab_member': '我的會員',
        'tab_calculator': '多人報價', 
        'home_welcome': '歡迎來到 廖嘉泰の會員系統',
        'home_plans_title': '會員方案',
        'home_plans_button': '查看完整方案 & 名單',
        'duration_1': '1個月 (30天)',
        'duration_2': '3個月 (90天)',
        'duration_3': '5個月 (150天)',
        'home_how_to_title': '📝 如何註冊',
        'home_step_1': '向主播購買會員方案，獲得 <strong>6位兌換碼</strong>',
        'home_step_2': '點擊右上角「註冊」按鈕',
        'home_step_3': '輸入兌換碼和您的資料',
        'home_step_4': '完成註冊,開始享受會員權益!',
        'login_title': '會員登入',
        'username': '使用者名稱',
        'username_placeholder': '請輸入使用者名稱',
        'password': '密碼',
        'password_placeholder': '請輸入密碼',
        'forgot_password': '忘記密碼？',
        'register_title': '註冊會員',
        'redeem_code': '兌換碼',
        'redeem_code_placeholder': '請輸入6位兌換碼',
        'redeem_code_note': '向主播購買會員後獲得的兌換碼',
        'username_reg_placeholder': '請輸入使用者名稱（用於登入）',
        'password_reg_placeholder': '請輸入密碼（至少6個字元）',
        'confirm_password': '確認密碼',
        'confirm_password_placeholder': '請再次輸入密碼',
        'platform_select': '平台選擇',
        'nickname': '暱稱',
        'optional': '(選填)',
        'nickname_placeholder': '請輸入你的TikTok或YouTube暱稱',
        'nickname_note': '如果不填寫，將使用使用者名稱作為暱稱',
        'game_uid_placeholder': '請輸入 Call of Duty Mobile UID',
        'game_uid_note': '可在遊戲內個人資料查看',
        'sec_q': '安全問題（用於找回密碼）',
        'sec_q_select': '請選擇安全問題',
        'sec_q_pet': '你的第一隻寵物叫什麼名字？',
        'sec_q_school': '你的小學校名是什麼？',
        'sec_q_city': '你出生的城市是哪裡？',
        'sec_q_food': '你最喜歡的食物是什麼？',
        'sec_q_game': '你最喜歡的CODM角色是什麼？',
        'sec_a': '安全答案',
        'sec_a_placeholder': '請輸入答案（請記住此答案）',
        'forgot_password_title': '找回密碼',
        'next_step': '下一步',
        'sec_q_display': '安全問題',
        'sec_a_verify_placeholder': '請輸入答案',
        'verify_answer': '驗證答案',
        'new_password': '新密碼',
        'confirm_new_password': '確認新密碼',
        'reset_password': '重設密碼',
        'change_password_title': '更改密碼',
        'current_password': '目前密碼',
        'current_password_placeholder': '請輸入目前密碼',
        'confirm_change': '確認更改',
        'edit_member_title': '編輯會員',
        'logout': '登出',
        'admin_panel': '⚙️ 管理後台',
        'member_platform': '遊戲名稱',
        'member_phone': '電話號碼',
        'member_level': '會員等級',
        'level_legend': '傳說會員',
        'level_diamond': '鑽石會員',
        'level_gold': '黃金會員',
        'member_uid': 'CODM UID',
        'member_code': '兌換碼',
        'copy': '複製',
        'copy_ok': '✓ 已複製',
        'copy_fail': '複製失敗，請手動複製',
        'member_code_duration': '兌換碼原始時長',
        'member_join_date': '加入時間',
        'member_remaining_sec': '剩餘秒數',
        'member_permission': '權限',
        'member_admin': '管理員',
        'member_remaining_time': '會員剩餘時間',
        'member_expired': '您的會員已過期',
        'member_account_settings': '帳號設定',
        'member_change_password': '更改密碼',
        'member_login_prompt': '請先登入',
        'member_load_fail': '載入失敗，請重試',
        'queue_login_prompt': '請先登入才能使用排隊功能',
        'queue_expired_prompt': '您的會員已過期，無法使用排隊功能',
        'queue_no_session': '目前沒有開放的遊戲場次',
        'queue_wait_for_streamer': '請等待主播開放排隊',
        'queue_refreshing': '自動刷新中',
        'queue_session_start_time': '開放時間:',
        'queue_session_slots': '名額:',
        'queue_session_slots_unit': '位',
        'queue_your_position_title': '你目前的排隊順位',
        'queue_position_prefix': '前面還有',
        'queue_position_suffix': '人',
        'queue_leave': '離開排隊',
        'queue_join_title': '立即加入排隊',
        'queue_join_button': '🚀 一鍵排隊',
        'queue_status_title': '目前排隊狀況',
        'queue_status_people': '人)',
        'queue_empty': '目前沒有人排隊',
        'level_legend_simple': '傳說',
        'level_diamond_simple': '鑽石',
        'level_gold_simple': '黃金',
        'queue_more_people_prefix': '還有',
        'queue_more_people_suffix': '人...',
        'queue_load_fail': '載入失敗，請重試',
        'alert_logout': '已登出',
        'alert_login_success': '登入成功！',
        'alert_admin_privilege': '您擁有管理員權限',
        'alert_login_fail': '登入失敗，請稍後再試',
        'alert_login_wrong': '使用者名稱或密碼錯誤',
        'alert_input_prompt': '請輸入使用者名稱和密碼',
        'alert_register_success': '註冊成功！請登入',
        'alert_register_fail': '註冊失敗，請稍後再試',
        'alert_code_used': '此兌換碼已被使用',
        'alert_code_not_exist': '兌換碼不存在，請確認是否輸入正確',
        'alert_user_exist': '使用者名稱已存在，請選擇其他名稱',
        'alert_password_mismatch': '兩次輸入的密碼不一致，請重新確認',
        'alert_password_short': '密碼至少需要6個字元',
        'alert_fill_form': '請填寫完整必填資訊（暱稱為選填）',
        'alert_verify_success': '驗證成功！請設定新密碼',
        'alert_verify_fail': '答案錯誤，請重新輸入',
        'alert_input_answer': '請輸入答案',
        'alert_input_username': '請輸入使用者名稱',
        'alert_user_not_found': '找不到此使用者',
        'alert_op_fail': '操作失敗，請稍後再試',
        'alert_fill_all': '請填寫完整資訊',
        'alert_password_reset_success': '密碼重設成功！請使用新密碼登入',
        'alert_password_reset_fail': '重設密碼失敗，請稍後再試',
        'alert_current_password_wrong': '目前密碼錯誤',
        'alert_password_change_success': '密碼更改成功！',
        'alert_password_change_fail': '更改密碼失敗，請稍後再試',
        'alert_already_in_queue': '你已經在排隊中了！',
        'alert_join_queue_success': '成功加入排隊！',
        'alert_join_queue_fail': '加入排隊失敗，請稍後再試',
        'alert_leave_queue_confirm': '確定要離開排隊嗎？',
        'alert_leave_queue_success': '已離開排隊',
        'alert_leave_queue_fail': '離開排隊失敗，請稍後再試',
        'queue_priority_switch': '優先排隊',
        'queue_priority_quota': '本月剩餘 <span>{0}</span> 次權限',
        'queue_priority_no_quota': '您的優先排隊權限已用完',
        'alert_priority_confirm': '確定要使用 1 次優先排隊權限嗎？'
    }
};





