const firebaseConfig = {
    apiKey: "AIzaSyCQEXz8OIzbb9dDxnz52tymNnYofGDEczQ",
    authDomain: "subscription-member-system.firebaseapp.com",
    databaseURL: "https://subscription-member-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "subscription-member-system",
    storageBucket: "subscription-member-system.firebasestorage.app",
    messagingSenderId: "970681171187",
    appId: "1:970681171187:web:f3f86b743e27667a994b86"
};

if (window.firebase && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

if (window.firebase && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            firebase.auth().signInAnonymously().catch((error) => {
                console.error('order 頁匿名登入失敗:', error);
            });
        }
    });
}

const database = window.firebase ? firebase.database() : null;
const ORDER_GENERATED_TTL_MS = 20 * 60 * 1000;

const rawOrderData = sessionStorage.getItem('pendingOrder');
const orderData = rawOrderData ? JSON.parse(rawOrderData) : null;

const orderTitle = document.getElementById('orderTitle');
const orderSubtitle = document.getElementById('orderSubtitle');
const orderTotal = document.getElementById('orderTotal');
const orderList = document.getElementById('orderList');
const orderNote = document.getElementById('orderNote');
const lineNameInput = document.getElementById('lineNameInput');
const lineNamePreview = document.getElementById('lineNamePreview');
const downloadBtn = document.getElementById('downloadBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

let currentOrderId = sessionStorage.getItem('currentOrderTrackingId') || '';
let currentOrderStatus = 'generated';
let isLeavingOrderPage = false;

function updateDownloadState() {
    const hasLineName = Boolean(lineNameInput.value.trim());
    downloadBtn.classList.toggle('is-disabled', !hasLineName);
}

async function waitForCaptureAssets(container) {
    if (!container) return;

    const images = Array.from(container.querySelectorAll('img'));
    if (!images.length) return;

    await Promise.all(images.map((image) => {
        if (image.complete && image.naturalWidth > 0) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const done = () => {
                image.removeEventListener('load', done);
                image.removeEventListener('error', done);
                resolve();
            };

            image.addEventListener('load', done, { once: true });
            image.addEventListener('error', done, { once: true });
        });
    }));
}

function getOrderValueClass(label, value) {
    const labelText = String(label || '');
    const valueText = String(value || '');

    if (labelText.includes('會員方案') || valueText.includes('會員')) {
        if (valueText.includes('傳說')) return 'order-value-tag order-value-member-legend';
        if (valueText.includes('鑽石')) return 'order-value-tag order-value-member-diamond';
        if (valueText.includes('黃金')) return 'order-value-tag order-value-member-gold';
    }

    if (valueText.includes('代打')) return 'order-value-service-boost';
    if (valueText.includes('護航')) return 'order-value-service-escort';

    return '';
}

function getOrCreateOrderId() {
    if (currentOrderId) return currentOrderId;
    const fromData = orderData && orderData.orderId ? String(orderData.orderId) : '';
    currentOrderId = fromData || `ORDTRACK-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
    sessionStorage.setItem('currentOrderTrackingId', currentOrderId);
    return currentOrderId;
}

function getOrCreateOrderDisplayMeta() {
    const orderNumEl = document.getElementById('orderNumber');
    const orderTimeEl = document.getElementById('orderTime');

    let displayNumber = sessionStorage.getItem('currentOrderDisplayNumber');
    let displayTime = sessionStorage.getItem('currentOrderDisplayTime');

    if (!displayNumber) {
        displayNumber = 'ORD-' + Date.now().toString(36).toUpperCase().slice(-8);
        sessionStorage.setItem('currentOrderDisplayNumber', displayNumber);
    }
    if (!displayTime) {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        displayTime = `${now.getFullYear()}/${pad(now.getMonth()+1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
        sessionStorage.setItem('currentOrderDisplayTime', displayTime);
    }

    if (orderNumEl) orderNumEl.textContent = displayNumber;
    if (orderTimeEl) orderTimeEl.textContent = displayTime;

    return { displayNumber, displayTime };
}

async function upsertGeneratedOrderRecord() {
    if (!database || !orderData) return;

    const { displayNumber, displayTime } = getOrCreateOrderDisplayMeta();
    const now = Date.now();
    const orderId = getOrCreateOrderId();

    const payload = {
        orderId,
        orderNumber: displayNumber,
        orderTimeText: displayTime,
        title: orderData.title || '訂單確認',
        subtitle: orderData.subtitle || '',
        total: orderData.total || 'NT$0',
        note: orderData.note || '',
        items: Array.isArray(orderData.items) ? orderData.items : [],
        orderType: orderData.orderType || '',
        status: 'generated',
        downloaded: false,
        createdAt: now,
        updatedAt: now,
        expiresAt: now + ORDER_GENERATED_TTL_MS,
        lineName: lineNameInput.value.trim() || ''
    };

    try {
        await database.ref(`orders/${orderId}`).update(payload);
    } catch (error) {
        console.error('建立訂單紀錄失敗:', error);
    }
}

async function markOrderAsPendingAfterDownload(fileName) {
    if (!database || !orderData) return;

    const orderId = getOrCreateOrderId();
    const now = Date.now();

    try {
        await database.ref(`orders/${orderId}`).update({
            status: 'pending',
            downloaded: true,
            downloadedAt: now,
            updatedAt: now,
            expiresAt: null,
            lineName: lineNameInput.value.trim(),
            downloadFileName: fileName
        });
        currentOrderStatus = 'pending';
    } catch (error) {
        console.error('更新訂單下載狀態失敗:', error);
    }
}

async function removeGeneratedOrderRecord() {
    if (!database || !currentOrderId || currentOrderStatus !== 'generated') return;
    try {
        await database.ref(`orders/${currentOrderId}`).remove();
    } catch (error) {
        console.error('刪除未完成訂單失敗:', error);
    }
}

async function leaveOrderPageWithConfirm() {
    const confirmed = confirm('返回主頁後，系統不會保留你的動作，確定要返回嗎？');
    if (!confirmed) return false;

    isLeavingOrderPage = true;
    await removeGeneratedOrderRecord();

    sessionStorage.removeItem('pendingOrder');
    sessionStorage.removeItem('currentOrderTrackingId');
    sessionStorage.removeItem('currentOrderDisplayNumber');
    sessionStorage.removeItem('currentOrderDisplayTime');
    window.location.href = 'index.html';
    return true;
}

async function renderOrder() {
    const { displayNumber, displayTime } = getOrCreateOrderDisplayMeta();

    if (!orderData) {
        orderTitle.textContent = '找不到訂單資料';
        orderSubtitle.textContent = '請從首頁重新建立訂單。';
        orderTotal.textContent = '--';
        orderNote.textContent = '目前沒有可顯示的訂單內容。';
        orderList.innerHTML = '<div class="order-row"><span>狀態</span><span>請返回首頁重新操作</span></div>';
        downloadBtn.disabled = true;
        downloadBtn.style.opacity = '0.5';
        downloadBtn.style.cursor = 'not-allowed';
        return;
    }

    orderTitle.textContent = orderData.title || '訂單確認';
    orderSubtitle.textContent = orderData.subtitle || '';
    orderTotal.textContent = orderData.total || 'NT$0';
    orderNote.textContent = orderData.note || '';

    orderList.innerHTML = '';
    (orderData.items || []).forEach((item) => {
        const row = document.createElement('div');
        row.className = 'order-row';
        const labelSpan = document.createElement('span');
        labelSpan.textContent = item.label;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = item.value;
        const valueClass = getOrderValueClass(item.label, item.value);
        if (valueClass) valueSpan.className = valueClass;

        row.appendChild(labelSpan);
        row.appendChild(valueSpan);
        orderList.appendChild(row);
    });

    // 使用剛渲染的編號時間寫入 generated 訂單
    if (displayNumber && displayTime) {
        await upsertGeneratedOrderRecord();
    }
}

lineNameInput.addEventListener('input', () => {
    const value = lineNameInput.value.trim();
    lineNamePreview.textContent = value || '未填寫';
    updateDownloadState();
});

backHomeBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await leaveOrderPageWithConfirm();
});

window.addEventListener('popstate', async () => {
    if (isLeavingOrderPage) return;
    const left = await leaveOrderPageWithConfirm();
    if (!left) {
        history.pushState({ orderGuard: true }, '', window.location.href);
    }
});

downloadBtn.addEventListener('click', async () => {
    if (!lineNameInput.value.trim()) {
        alert('LINE 名稱要填寫後，才能下載 JPG。');
        lineNameInput.focus();
        updateDownloadState();
        return;
    }

    const orderNumText = document.getElementById('orderNumber').textContent;
    const orderTimeText = document.getElementById('orderTime').textContent;
    const totalText = orderTotal.textContent;
    const lineText = lineNameInput.value.trim();

    const lines = [
        '═════ 請確認以下訂單資訊 ═════',
        `訂單編號：${orderNumText}`,
        `建單時間：${orderTimeText}`,
        '',
        `方案：${orderTitle.textContent}`,
    ];
    if (orderData && orderData.items) {
        orderData.items.forEach(item => lines.push(`${item.label}：${item.value}`));
    }
    lines.push('');
    lines.push(`應付金額：${totalText}`);
    lines.push(`LINE 名稱：${lineText}`);
    lines.push('');
    lines.push('確認後將下載訂單 JPG，請將圖片傳送至官方 LINE 完成付款。');

    const confirmed = confirm(lines.join('\n'));
    if (!confirmed) return;

    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '下載中...';
    downloadBtn.classList.add('is-disabled');
    downloadBtn.disabled = true;

    try {
        const captureArea = document.getElementById('captureArea');
        await waitForCaptureAssets(captureArea);

        const canvas = await html2canvas(captureArea, {
            backgroundColor: '#07101f',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            imageTimeout: 0
        });

        const pad = n => String(n).padStart(2, '0');
        const now = new Date();
        const datePart = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}`;
        const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}`;
        const fileName = `${orderNumText}_${datePart}-${timePart}.jpg`;

        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();

        await markOrderAsPendingAfterDownload(fileName);
    } catch (error) {
        console.error('下載訂單 JPG 失敗:', error);
        alert('下載失敗，請重新嘗試一次；如果還是不行，我已經先把圖片載入等待與錯誤處理補上。');
    } finally {
        downloadBtn.textContent = originalText;
        downloadBtn.classList.remove('is-disabled');
        downloadBtn.disabled = false;
        updateDownloadState();
    }
});

renderOrder();
updateDownloadState();
history.pushState({ orderGuard: true }, '', window.location.href);
