// ==========================================
// ▼▼▼ 1. 翻譯與設定 ▼▼▼
// ==========================================

const translations = {
    'zh': {
        'page_title': '管理後台 - 廖嘉泰の會員管理系統',
        'admin_title': '⚙️ 管理後台',
        'app_subtitle': '📢 廖嘉泰の會員管理系統',
        'back_to_home': '🏠 返回前台',
        'login': '登入',
        'logout': '登出',
        'username': '使用者名稱',
        'username_placeholder': '請輸入使用者名稱',
        'password': '密碼',
        'password_placeholder': '請輸入密碼',
        'login_title_admin': '管理員登入',
        'session_control_title': '遊戲場次控制',
        'session_name_label': '場次名稱',
        'session_name_placeholder': 'CODM 會員場',
        'session_start_label': '預計開始時間',
        'session_start_note': '(留空則為立即)',
        'session_slots_label': '名額',
        'session_desc_label': '描述',
        'optional': '(選填)',
        'session_desc_placeholder': '地圖:...',
        'session_create_button': '開啟/預約場次',
        'session_close_button': '關閉場次',
        'session_status_open': '(開放中)',
        'session_status_none': '目前沒有遊戲場次',
        'session_status_prompt': '請填寫下方表單以開啟新場次',
        'queue_list_title': '目前排隊名單',
        'queue_clear_button': '清空名單',
        'queue_total_prefix': '總數: ',
        'queue_total_suffix': ' 人',
        'queue_empty': '目前沒有人排隊',
        'queue_remove_button': '移除',
        'code_admin_title': '兌換碼管理',
        'code_tab_generate': '產生新碼',
        'code_tab_unused': '未使用',
        'code_tab_used': '已使用',
        'code_level_label': '會員等級',
        'level_gold': '💛 黃金會員',
        'level_diamond': '💎 鑽石會員',
        'level_legend': '🔥 傳說會員',
        'code_days_label': '天數',
        'code_amount_label': '數量',
        'code_generate_button': '產生兌換碼',
        'code_no_unused': '沒有未使用的兌換碼',
        'code_no_used': '沒有已使用的兌換碼',
        'code_duration': '時長:',
        'code_created_date': '建立日期:',
        'code_delete_button': '刪除',
        'code_used_by': '使用者:',
        'code_used_date': '使用日期:',
        'member_admin_title': '會員管理',
        'member_tab_active': '生效中',
        'member_tab_expired': '已到期',
        'member_no_active': '沒有生效中的會員',
        'member_no_expired': '沒有已到期的會員',
        'member_edit_button': '編輯',
        'member_delete_button': '刪除',
        'member_uid_label': 'UID:',
        'member_platform_label': '平台:',
        'member_remaining_label': '剩餘時間:',
        'member_join_date_label': '加入日期:',
        'member_admin': '管理員',
        'backup_title': '系統備份',
        'backup_button': '立即導出 Excel 備份',
        'backup_last_time': '上次備份時間:',
        'backup_none': '尚未備份過',
        'change_password_title': '更改密碼',
        'current_password': '目前密碼',
        'current_password_placeholder': '請輸入目前密碼',
        'new_password': '新密碼',
        'password_reg_placeholder': '請輸入新密碼（至少6個字元）',
        'confirm_new_password': '確認新密碼',
        'confirm_password_placeholder': '請再次輸入新密碼',
        'confirm_change': '確認更改',
        'edit_member_title': '編輯會員',
        'edit_editing': '正在編輯:',
        'edit_remaining_time': '剩餘時間:',
        'edit_adjust_time': '手動調整時間',
        'edit_time_year': '年',
        'edit_time_month': '月',
        'edit_time_day': '天',
        'edit_time_hour': '時',
        'edit_add_time': '增加時間',
        'edit_reduce_time': '減少時間',
        'edit_modify_info': '修改會員資料',
        'edit_nickname': '暱稱',
        'edit_game_uid': 'CODM UID',
        'edit_level': '會員等級',
        'edit_platform': '平台',
        'edit_priority_quota': '插隊權限 (次數)',
        'edit_admin_perm': '管理員權限',
        'edit_set_admin': '設為管理員',
        'edit_save': '儲存變更',
        'level_legend_simple': '傳說',
        'level_diamond_simple': '鑽石',
        'level_gold_simple': '黃金',
        'time_year': '年',
        'time_month': '月',
        'time_day': '天',
        'time_hour': '時',
        'time_minute': '分',
        'time_second': '秒',
        'copy_ok': '✓ 已複製',
        'copy_fail': '複製失敗',
        'alert_login_prompt': '請輸入使用者名稱和密碼',
        'alert_login_wrong': '使用者名稱或密碼錯誤',
        'alert_login_no_perm': '權限不足。此頁面僅限管理員登入。',
        'alert_login_success': '管理員登入成功！',
        'alert_login_fail': '登入失敗，請稍後再試',
        'alert_logout': '已登出',
        'alert_op_fail': '操作失敗，請稍後再試',
        'alert_no_backup_data': '目前沒有會員資料可導出',
        'alert_backup_fail': '備份失敗，請稍後再試',
        'alert_session_confirm': '確定要開啟/預約場次嗎？',
        'alert_session_name': '名稱:',
        'alert_session_time': '時間:',
        'alert_session_open_success': '遊戲場次已開啟/預約！',
        'alert_session_open_fail': '開啟場次失敗',
        'alert_session_close_confirm': '確定要關閉目前的遊戲場次嗎？\n(這不會清空排隊名單)',
        'alert_session_close_success': '遊戲場次已關閉',
        'alert_session_close_fail': '關閉場次失敗',
        'alert_queue_remove_confirm': '確定要將 {username} 移出排隊嗎？',
        'alert_queue_remove_success': '{username} 已被移出排隊',
        'alert_queue_remove_fail': '移除失敗',
        'alert_queue_clear_confirm': '！警告！\n確定要清空所有排隊名單嗎？此操作無法復原。',
        'alert_queue_clear_success': '排隊名單已清空',
        'alert_queue_clear_fail': '清空失敗',
        'alert_code_invalid_days': '請輸入有效的天數',
        'alert_code_gen_confirm': '你確定要一次產生 {amount} 組兌換碼嗎？',
        'alert_code_gen_success': '成功產生 {amount} 組兌換碼！',
        'alert_code_gen_fail': '產生失敗',
        'alert_code_gen_list_title': '產生的新碼 (共 {amount} 組):',
        'alert_code_delete_confirm': '確定要刪除兌換碼 {code} 嗎？此操作無法復原。',
        'alert_code_delete_success': '兌換碼 {code} 已刪除',
        'alert_code_delete_fail': '刪除失敗',
        'alert_member_not_found': '找不到會員',
        'alert_time_invalid': '請輸入有效的時間',
        'alert_time_adjust_confirm': '確定要為 {username} {action} {timeText} 嗎？',
        'alert_time_add': '增加',
        'alert_time_reduce': '減少',
        'alert_time_adjust_success': '已{action}時間！',
        'alert_time_adjust_fail': '調整時間失敗',
        'alert_member_save_success': '會員資料已儲存',
        'alert_member_save_fail': '儲存會員失敗',
        'alert_member_empty_fields': '暱稱和 UID 不可為空',
        'alert_member_delete_admin': '不可刪除主要管理員帳號',
        'alert_member_delete_confirm': '！警告！\n確定要永久刪除會員 {username} 嗎？\n此操作無法復原。',
        'alert_member_delete_success': '會員 {username} 已被永久刪除',
        'alert_member_delete_fail': '刪除會員失敗',
        'alert_fill_all': '請填寫完整資訊',
        'alert_password_short': '新密碼至少需要6個字元',
        'alert_password_mismatch': '兩次輸入的新密碼不一致',
        'alert_current_password_wrong': '目前密碼錯誤',
        'alert_password_change_success': '密碼更改成功！',
        'alert_password_change_fail': '更改密碼失敗，請稍後再試'
    }
};

// ==========================================
// ▼▼▼ 2. Firebase 初始化 ▼▼▼
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyCQEXz8OIzbb9dDxnz52tymNnYofGDEczQ",
    authDomain: "subscription-member-system.firebaseapp.com",
    databaseURL: "https://subscription-member-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "subscription-member-system",
    storageBucket: "subscription-member-system.firebasestorage.app",
    messagingSenderId: "970681171187",
    appId: "1:970681171187:web:f3f86b743e27667a994b86"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 全域變數
let isAuthReady = false;
let isDomReady = false;
let currentUser = null;
let editingMember = null;
let countdownInterval = null;
let dailyBackupInterval = null;
let autoRefreshInterval = null;
const REFRESH_INTERVAL = 5000;
const ORDER_GENERATED_TTL_MS = 20 * 60 * 1000;

// 上分管理預設值
const DEFAULT_CONFIG = {
    seasonStartDate: "2025-12-01",
    basePrices: {
        boost: { master: 42, grandmaster: 62, legend: 88, mythical: 100 },
        carry: { master: 105, grandmaster: 155, legend: 220, mythical: 250 }
    },
    weights: { boost: {}, carry: {} }
};

let currentCodeSubTab = 'generate';
let currentMemberSubTab = 'active';
let currentOrdersCache = [];
let currentDmzProductsCache = [];
let pendingDmzProductImageData = '';
let pendingDmzProductOriginalData = '';
let isDmzUploadProcessing = false;
let isDmzUploadSubmitting = false;
let cancelDmzUploadRequested = false;
let dmzCreatePreviewTaskToken = 0;
let dmzSaveTaskToken = 0;
let editingDmzProductId = null;
let pendingEditImageData = '';
let pendingEditOriginalData = '';
let currentEditProductOriginalData = '';
let currentDmzMissionsCache = [];
let pendingMissionImageData = '';
let pendingMissionOriginalData = '';
let isMissionUploadProcessing = false;
let isMissionUploadSubmitting = false;
let cancelMissionUploadRequested = false;
let missionCreatePreviewTaskToken = 0;
let missionSaveTaskToken = 0;
let editingMissionId = null;
let pendingEditMissionImageData = '';
let pendingEditMissionOriginalData = '';
let currentEditMissionOriginalData = '';

// ===== 新的三層結構相關變量 =====
let currentWeeksCache = [];
let currentTaskTitlesCache = [];
let currentTaskContentsCache = [];
let pendingWeekImageData = '';
let pendingWeekOriginalData = '';
let pendingTaskTitleImageData = '';
let pendingTaskTitleOriginalData = '';
let pendingTaskContentImageData = '';
let pendingTaskContentOriginalData = '';
let selectedWeekForTaskTitle = null;
let selectedTaskTitleForContent = null;

// 監聽 Auth
firebase.auth().onAuthStateChanged((user) => {
    isAuthReady = true;
    if (!user) firebase.auth().signInAnonymously().catch(console.error);
    tryInitialize();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        isDomReady = true;
        tryInitialize();
    });
} else {
    isDomReady = true;
    tryInitialize();
}

function tryInitialize() {
    if (isDomReady && isAuthReady) {
        if (!window.appInitialized) {
            window.appInitialized = true;
            initializeAdminPage(); 
        }
        updateUserSection();
    }
}

// ==========================================
// ▼▼▼ 3. 輔助函式 ▼▼▼
// ==========================================

function showLoading() { document.getElementById('loadingOverlay').classList.add('active'); }
function hideLoading() { document.getElementById('loadingOverlay').classList.remove('active'); }

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function secondsToTime(seconds) {
    if (seconds <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const years = Math.floor(seconds / 31536000); seconds %= 31536000;
    const months = Math.floor(seconds / 2592000); seconds %= 2592000;
    const days = Math.floor(seconds / 86400); seconds %= 86400;
    const hours = Math.floor(seconds / 3600); seconds %= 3600;
    const minutes = Math.floor(seconds / 60); seconds %= 60;
    return { years, months, days, hours, minutes, seconds };
}

function timeToSeconds(years, months, days, hours, minutes, seconds) {
    return (years * 31536000) + (months * 2592000) + (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
}

function formatTimeDisplay(timeObj) {
    const trans = translations.zh;
    const parts = [];
    if (timeObj.years > 0) parts.push(`${timeObj.years}${trans.time_year}`);
    if (timeObj.months > 0) parts.push(`${timeObj.months}${trans.time_month}`);
    if (timeObj.days > 0) parts.push(`${timeObj.days}${trans.time_day}`);
    if (timeObj.hours > 0) parts.push(`${timeObj.hours}${trans.time_hour}`);
    if (timeObj.minutes > 0) parts.push(`${timeObj.minutes}${trans.time_minute}`);
    if (timeObj.seconds > 0) parts.push(`${timeObj.seconds}${trans.time_second}`);
    return parts.join(' ') || `0${trans.time_second}`;
}

function getTimeColorClass(seconds) {
    if (seconds <= 0) return 'danger';
    if (seconds <= 259200) return 'danger';
    if (seconds <= 604800) return 'warning';
    return '';
}

function generateActivationCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

function copyToClipboard(text, button) {
    const trans = translations.zh;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = trans.copy_ok;
        button.style.background = '#28a745';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = ''; 
        }, 2000);
    }).catch(() => {
        alert(trans.copy_fail);
    });
}

// ==========================================
// ▼▼▼ 4. 資料讀取與儲存 ▼▼▼
// ==========================================

async function loadData() {
    try {
        const [membersSnapshot, codesSnapshot, queueSnapshot, sessionSnapshot, backupSnapshot, configSnapshot, ordersSnapshot, dmzProductsSnapshot, weeksSnapshot, taskTitlesSnapshot, taskContentsSnapshot] = await Promise.all([
            database.ref('members').once('value'),
            database.ref('activationCodes').once('value'),
            database.ref('queue').once('value'),
            database.ref('gameSession').once('value'),
            database.ref('lastBackupTime').once('value'),
            database.ref('calculatorConfig').once('value'),
            database.ref('orders').once('value'),
            database.ref('dmzProducts').once('value'),
            database.ref('dmzMissionWeeks').once('value'),
            database.ref('dmzMissionTaskTitles').once('value'),
            database.ref('dmzMissionTaskContents').once('value')
        ]);

        const membersData = membersSnapshot.val() || {};
        const members = Object.keys(membersData).map(key => ({ ...membersData[key], username: key }));
        const codesData = codesSnapshot.val() || {};
        const activationCodes = Object.values(codesData);
        const queueData = queueSnapshot.val() || {};
        const queue = Object.values(queueData);
        const ordersData = ordersSnapshot.val() || {};
        const orders = Object.keys(ordersData).map(key => ({ id: key, ...ordersData[key] }));
        const dmzProductsData = dmzProductsSnapshot.val() || {};
        const dmzProducts = Object.keys(dmzProductsData).map(key => ({ id: key, ...dmzProductsData[key] }));
        
        // 新的三層任務結構
        const weeksData = weeksSnapshot.val() || {};
        const weeks = Object.keys(weeksData).map(key => ({ id: key, ...weeksData[key] }));
        const taskTitlesData = taskTitlesSnapshot.val() || {};
        const taskTitles = Object.keys(taskTitlesData).map(key => ({ id: key, ...taskTitlesData[key] }));
        const taskContentsData = taskContentsSnapshot.val() || {};
        const taskContents = Object.keys(taskContentsData).map(key => ({ id: key, ...taskContentsData[key] }));
        
        // 排隊排序
        queue.sort((a, b) => {
            const adminA = a.adminOrder || 9999;
            const adminB = b.adminOrder || 9999;
            if (adminA !== adminB) return adminA - adminB;
            
            const priorityA = a.priorityLevel || 0;
            const priorityB = b.priorityLevel || 0;
            if (priorityA !== priorityB) return priorityB - priorityA;
            
            return new Date(a.joinTime) - new Date(b.joinTime);
        });

        orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        dmzProducts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        return {
            members,
            activationCodes,
            queue,
            orders,
            dmzProducts,
            weeks,
            taskTitles,
            taskContents,
            gameSession: sessionSnapshot.val(),
            lastBackupTime: backupSnapshot.val(),
            calculatorConfig: configSnapshot.val() || DEFAULT_CONFIG
        };
    } catch (error) {
        console.error('載入資料失敗:', error);
        return { members: [], activationCodes: [], queue: [], orders: [], dmzProducts: [], weeks: [], taskTitles: [], taskContents: [], gameSession: null, lastBackupTime: null, calculatorConfig: DEFAULT_CONFIG };
    }
}

async function saveData(members, activationCodes, queue, gameSession) {
    try {
        const membersObj = {}; members.forEach(m => { membersObj[m.username] = m; });
        const codesObj = {}; activationCodes.forEach(c => { codesObj[c.code] = c; });
        const queueObj = {}; queue.forEach(q => { queueObj[q.username] = q; });

        await Promise.all([
            database.ref('members').set(membersObj),
            database.ref('activationCodes').set(codesObj),
            database.ref('queue').set(queueObj),
            database.ref('gameSession').set(gameSession)
        ]);
    } catch (error) { console.error('儲存資料失敗:', error); alert('資料儲存失敗'); }
}

// ==========================================
// ▼▼▼ 5. 核心初始化邏輯 ▼▼▼
// ==========================================

async function initializeAdminPage() {
    showLoading();
    try {
        const loggedInUsername = sessionStorage.getItem('currentUser');
        
        // 1. 如果沒登入：隱藏後台，顯示登入框
        if (!loggedInUsername) {
            document.querySelector('.admin-wrapper').style.display = 'none'; // ★ 隱藏後台
            updateUserSection();
            openLoginModal();
            hideLoading();
            return;
        }

        const data = await loadData();
        const member = data.members.find(m => m.username === loggedInUsername);

        // 2. 如果權限不對：隱藏後台，顯示登入框
        if (!member || !member.isAdmin) {
            sessionStorage.removeItem('currentUser');
            document.querySelector('.admin-wrapper').style.display = 'none'; // ★ 隱藏後台
            updateUserSection();
            openLoginModal();
            hideLoading();
            return;
        }

        // 3. 驗證成功：顯示後台
        currentUser = member;
        document.querySelector('.admin-wrapper').style.display = 'flex'; // ★ 顯示後台 (flex佈局)
        
        await initializeAdminDashboard();
        updateUserSection();

        // 綁定鍵盤事件
        const bindEnter = (id, func) => {
            const el = document.getElementById(id);
            if(el) el.addEventListener('keyup', (e) => { if(e.key === 'Enter') { e.preventDefault(); func(); }});
        };
        bindEnter('loginUsername', login);
        bindEnter('loginPassword', login);
        bindEnter('changeConfirmPassword', changePassword);
        
    } catch (error) {
        console.error('管理頁面初始化失敗:', error);
        alert('頁面載入失敗，請重試');
    } finally {
        hideLoading();
    }
}

async function initializeAdminDashboard() {
    // 不需要操作 adminDashboard，因為 admin-wrapper 已經控制顯示了
    await refreshAdminDashboard(); 
    
    startGlobalCountdown();
    startAutoRefresh();
    initDailyBackup();
}
async function refreshAdminDashboard() {
    try {
        const data = await loadData();
        const cleanedOrders = await cleanupGeneratedOrders(data.orders || []);

        renderGameSession(data.gameSession);
        renderQueueList(data.queue);
        renderCodeLists(data.activationCodes);
        renderMemberLists(data.members);
        renderOrderManagement(cleanedOrders);
        renderProductManagement(data.dmzProducts || []);
        renderWeekManagement(data.weeks || []);
        renderTaskTitleManagement(data.taskTitles || []);
        renderTaskContentManagement(data.taskContents || []);
        renderBackupInfo(data.lastBackupTime);
        renderCalculatorConfig(data.calculatorConfig);

    } catch (error) { console.error("儀表板刷新失敗:", error); }
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.querySelector(`.nav-btn[onclick="switchTab('${tabName}')"]`);
    if(targetBtn) targetBtn.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    if (tabName === 'audience' || tabName === 'orders' || tabName === 'products' || tabName === 'missions' || tabName === 'boosting') {
        refreshAdminDashboard();
    }
}

// ==========================================
// ▼▼▼ 6. 上分管理功能 (Rank Boosting) - 8欄位精細版 ▼▼▼
// ==========================================

let globalCalcConfig = null; 

// 計算週數工具
function calculateWeeksBetween(startDateStr, endDateStr) {
    if (!startDateStr || !endDateStr) return 9; 
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    if (start > end) return 9; 
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let weeks = Math.ceil((diffDays + 1) / 7); 
    return weeks > 0 ? weeks : 1;
}

// [修改] 動態生成表格 (8個欄位：代打4個 + 護航4個)
// [修改] 動態生成表格 (8個欄位：代打4個 + 護航4個)
function generateWeightRows(startDate, endDate) {
    const tbody = document.getElementById('weightsTableBody');
    // 修改 header 以適應 8 個欄位
    const table = tbody ? tbody.closest('table') : null;
    const thead = table ? table.querySelector('thead') : null;
    
    if (!tbody || !thead) return;

    // 重繪表頭 (強制覆蓋成 8 欄位的表頭)
    thead.innerHTML = `
            <tr>
            <th rowspan="2" style="width:50px; vertical-align: middle;">週次</th>
            <th colspan="4" style="color: #00f3ff; border-bottom: 2px solid rgba(0, 243, 255, 0.3); text-align: center;">⚡ 代打 (Boost)</th>
            <th colspan="4" style="color: #bd00ff; border-bottom: 2px solid rgba(189, 0, 255, 0.3); text-align: center;">🛡️ 護航 (Carry)</th>
        </tr>
        <tr>
            <th style="font-size:0.8em; color:#88ffff; text-align: center;">大師</th>
            <th style="font-size:0.8em; color:#88ffff; text-align: center;">宗師</th>
            <th style="font-size:0.8em; color:#88ffff; text-align: center;">傳奇(10000-)</th>
            <th style="font-size:0.8em; color:#88ffff; text-align: center;">萬分(10000+)</th>
            <th style="font-size:0.8em; color:#eebbff; text-align: center;">大師</th>
            <th style="font-size:0.8em; color:#eebbff; text-align: center;">宗師</th>
            <th style="font-size:0.8em; color:#eebbff; text-align: center;">傳奇(10000-)</th>
            <th style="font-size:0.8em; color:#eebbff; text-align: center;">萬分(10000+)</th>
        </tr>
        `;
    

    // 1. 計算週數
    let sDate = startDate || document.getElementById('seasonStartDate').value;
    let eDate = endDate || document.getElementById('seasonEndDate').value;
    const totalWeeks = calculateWeeksBetween(sDate, eDate);
    
    // 2. 取得資料
    const currentWeights = globalCalcConfig ? globalCalcConfig.weights : { boost: {}, carry: {} };

    // 3. 取得基礎價格 (用於計算時薪)
    const getBase = (id) => Number(document.getElementById(id).value) || 0;
    const bases = {
        boost: {
            master: getBase('base_boost_master'),
            grandmaster: getBase('base_boost_grandmaster'),
            legend: getBase('base_boost_legend'),
            mythical: getBase('base_boost_mythical')
        },
        carry: {
            master: getBase('base_carry_master'),
            grandmaster: getBase('base_carry_grandmaster'),
            legend: getBase('base_carry_legend'),
            mythical: getBase('base_carry_mythical')
        }
    };

    let html = '';
    
    // 定義 8 個欄位 (代打和護航現在都統一用這 4 個 rank)
    const ranks = ['master', 'grandmaster', 'legend', 'mythical'];
    const services = ['boost', 'carry'];

    for (let i = 1; i <= totalWeeks; i++) {
        html += `<tr><td style="font-weight:bold; color:#FFD700; vertical-align:middle;">W${i}</td>`;

        services.forEach(service => {
            ranks.forEach(rank => {
                // 讀取資料
                let data = (currentWeights[service] && currentWeights[service][i] && currentWeights[service][i][rank]) 
                           ? currentWeights[service][i][rank] 
                           : { w: 0, e: (service === 'boost' ? 500 : 300) };

                // 舊資料相容 (如果代打是 normal，對應到 master/gm/legend)
                if (service === 'boost' && !currentWeights[service]?.[i]?.[rank]) {
                    if (rank !== 'mythical' && currentWeights[service]?.[i]?.normal) {
                        // 繼承舊的 normal 設定
                        let oldData = currentWeights[service][i].normal;
                        data = (typeof oldData === 'object') ? oldData : { w: oldData, e: 500 };
                    }
                }

                // 計算時薪
                const basePrice = bases[service][rank];
                const wage = Math.round((basePrice * (data.w || 0)) * ((data.e || 0) / 100));

                html += `
                <td style="padding: 2px;">
                    <div class="cell-wrapper">
                        <div class="input-row-mini">
                            <span class="input-label-mini">W</span>
                            <input type="number" step="0.05" class="cell-input" 
                                   id="w_${service}_${i}_${rank}" 
                                   value="${data.w || 0}"
                                   onkeyup="calcCellWage(this, '${service}', ${i}, '${rank}', ${basePrice})">
                        </div>
                        <div class="input-row-mini">
                            <span class="input-label-mini">E</span>
                            <input type="number" class="cell-input input-efficiency" 
                                   id="e_${service}_${i}_${rank}" 
                                   value="${data.e || 0}"
                                   onkeyup="calcCellWage(this, '${service}', ${i}, '${rank}', ${basePrice})">
                        </div>
                        <div id="wage_${service}_${i}_${rank}" class="wage-display">
                             $${wage}
                        </div>
                    </div>
                </td>`;
            });
        });

        html += `</tr>`;
    }
    tbody.innerHTML = html;
}

// [新增] 單一格子時薪計算
function calcCellWage(input, service, week, rank, basePrice) {
    const wInput = document.getElementById(`w_${service}_${week}_${rank}`);
    const eInput = document.getElementById(`e_${service}_${week}_${rank}`);
    const display = document.getElementById(`wage_${service}_${week}_${rank}`);

    if (!wInput || !eInput || !display) return;

    const weight = Number(wInput.value) || 0;
    const efficiency = Number(eInput.value) || 0;

    // 2. ★★★ 關鍵：即時更新全域變數，防止被自動刷新覆蓋 ★★★
    if (globalCalcConfig && globalCalcConfig.weights) {
        if (!globalCalcConfig.weights[service]) globalCalcConfig.weights[service] = {};
        if (!globalCalcConfig.weights[service][week]) globalCalcConfig.weights[service][week] = {};
        if (!globalCalcConfig.weights[service][week][rank]) globalCalcConfig.weights[service][week][rank] = {};

        globalCalcConfig.weights[service][week][rank] = {
            w: weight,
            e: efficiency
        };
    }

    const wage = Math.round((basePrice * weight) * (efficiency / 100));
    display.textContent = `$${wage}`;
}

// [修改] 讀取設定
function renderCalculatorConfig(config) {
    if (!config) return;
    globalCalcConfig = config;

    if(config.seasonStartDate) document.getElementById('seasonStartDate').value = config.seasonStartDate;
    if(config.seasonEndDate) document.getElementById('seasonEndDate').value = config.seasonEndDate;

    // 填入基礎價格
    const bp = config.basePrices || DEFAULT_CONFIG.basePrices;
    const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.value = val; };
    
    setVal('base_boost_master', bp.boost.master);
    setVal('base_boost_grandmaster', bp.boost.grandmaster);
    setVal('base_boost_legend', bp.boost.legend);
    setVal('base_boost_mythical', bp.boost.mythical);
    
    setVal('base_carry_master', bp.carry.master);
    setVal('base_carry_grandmaster', bp.carry.grandmaster);
    setVal('base_carry_legend', bp.carry.legend);
    setVal('base_carry_mythical', bp.carry.mythical);

    // 觸發顯示
    updateSeasonStatusDisplay();
}

// [修改] 更新狀態顯示
function updateSeasonStatusDisplay() {
    const startInput = document.getElementById('seasonStartDate').value;
    const endInput = document.getElementById('seasonEndDate').value;
    const displayBox = document.getElementById('seasonStatusDisplay');
    const textEl = document.getElementById('currentWeekText');
    const rangeEl = document.getElementById('seasonDateRangeText');

    if (!displayBox) return; // 避免未載入 HTML 時報錯

    if (!startInput || !endInput) {
        displayBox.style.display = 'none';
        return;
    }

    displayBox.style.display = 'block';
    rangeEl.textContent = `${startInput} ~ ${endInput}`;

    const start = new Date(startInput);
    const end = new Date(endInput);
    const today = new Date();
    today.setHours(0,0,0,0); start.setHours(0,0,0,0); end.setHours(0,0,0,0);

    if (today < start) {
        textEl.textContent = "⏳ 尚未開始";
        textEl.style.color = "#FFD700";
    } else if (today > end) {
        textEl.textContent = "🏁 賽季已結束";
        textEl.style.color = "#ff4757";
    } else {
        const diffTime = today - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const currentWeek = Math.floor(diffDays / 7) + 1;
        textEl.textContent = `Week ${currentWeek}`;
        textEl.style.color = "#39ff14";
    }

    generateWeightRows(startInput, endInput);
}

// [修改] 儲存設定
async function saveSeasonConfig() {
    const startDate = document.getElementById('seasonStartDate').value;
    const endDate = document.getElementById('seasonEndDate').value;
    if(!startDate || !endDate) return alert('請完整選擇日期');
    if (new Date(startDate) > new Date(endDate)) return alert('日期錯誤');

    try {
        await database.ref('calculatorConfig/seasonStartDate').set(startDate);
        await database.ref('calculatorConfig/seasonEndDate').set(endDate);
        updateSeasonStatusDisplay();
        alert('✅ 賽季日期已更新');
    } catch (e) { console.error(e); alert('儲存失敗'); }
}

async function saveBasePrices() {
    const prices = {
        boost: {
            master: Number(document.getElementById('base_boost_master').value),
            grandmaster: Number(document.getElementById('base_boost_grandmaster').value),
            legend: Number(document.getElementById('base_boost_legend').value),
            mythical: Number(document.getElementById('base_boost_mythical').value)
        },
        carry: {
            master: Number(document.getElementById('base_carry_master').value),
            grandmaster: Number(document.getElementById('base_carry_grandmaster').value),
            legend: Number(document.getElementById('base_carry_legend').value),
            mythical: Number(document.getElementById('base_carry_mythical').value)
        }
    };
    try {
        await database.ref('calculatorConfig/basePrices').set(prices);
        if(globalCalcConfig) globalCalcConfig.basePrices = prices;
        updateSeasonStatusDisplay();
        alert('✅ 基礎價格已更新');
    } catch(e) { console.error(e); alert('儲存失敗'); }
}

// [修改] 儲存權重與效率 (確保兩者都存入資料庫)
async function saveWeights() {
    const startDate = document.getElementById('seasonStartDate').value;
    const endDate = document.getElementById('seasonEndDate').value;
    const totalWeeks = calculateWeeksBetween(startDate, endDate);

    let weights = { boost: {}, carry: {} };
    const ranks = ['master', 'grandmaster', 'legend', 'mythical'];
    const services = ['boost', 'carry'];

    for (let i = 1; i <= totalWeeks; i++) {
        // 初始化該週物件
        if(!weights.boost[i]) weights.boost[i] = {};
        if(!weights.carry[i]) weights.carry[i] = {};

        services.forEach(service => {
            ranks.forEach(rank => {
                // 抓取權重與效率的輸入框
                const wEl = document.getElementById(`w_${service}_${i}_${rank}`);
                const eEl = document.getElementById(`e_${service}_${i}_${rank}`);
                
                // 讀取數值，如果欄位不存在或為空，預設為 0
                const wVal = wEl ? (Number(wEl.value) || 0) : 0;
                const eVal = eEl ? (Number(eEl.value) || 0) : 0;

                // 構建物件 { w: 權重, e: 效率 }
                weights[service][i][rank] = {
                    w: wVal,
                    e: eVal
                };
            });
        });
    }
    
    // 更新全域變數，防止畫面刷新後資料消失
    if (globalCalcConfig) {
        globalCalcConfig.weights = weights;
    }

    try {
        // 寫入 Firebase
        await database.ref('calculatorConfig/weights').set(weights);
        alert(`✅ 資料儲存成功！\n(共 ${totalWeeks} 週的權重與效率已更新)`);
    } catch (e) {
        console.error(e);
        alert('❌ 儲存失敗，請檢查網路連線');
    }
}

// ==========================================
// ▼▼▼ 7. 觀眾與會員管理 (渲染邏輯) ▼▼▼
// ==========================================

function renderGameSession(gameSession) {
    const container = document.getElementById('currentGameSession');
    if (!container) return;
    const trans = translations.zh;

    if (gameSession) {
        const startTimeLocale = new Date(gameSession.startTime).toLocaleString('zh-TW');
        container.innerHTML = `
        <div class="game-session-card">
            <h2>🎮 ${gameSession.gameName} <small>${trans.session_status_open}</small></h2>
            <div class="game-session-info">${trans.session_slots_label}: ${gameSession.slots}</div>
            <div class="game-session-info">${trans.session_start_label}: ${startTimeLocale}</div>
            ${gameSession.description ? `<div style="margin-top: 10px; font-size: 0.9em;">${gameSession.description}</div>` : ''}
        </div>`;
    } else {
        container.innerHTML = `<div class="empty-state"><h3>${trans.session_status_none}</h3><p>${trans.session_status_prompt}</p></div>`;
    }
}

function renderQueueList(queue) {
    const container = document.getElementById('adminQueueList');
    if (!container) return;
    const trans = translations.zh;
    document.getElementById('queueCount').textContent = `${trans.queue_total_prefix}${queue.length}${trans.queue_total_suffix}`;

    if (queue.length === 0) {
        container.innerHTML = `<div class="empty-state">${trans.queue_empty}</div>`;
        return;
    }

    container.innerHTML = queue.map((q, index) => {
        const levelText = q.level === 'legend' ? trans.level_legend_simple : (q.level === 'diamond' ? trans.level_diamond_simple : trans.level_gold_simple);
        const badgeClass = q.level === 'legend' ? 'badge-legend' : (q.level === 'diamond' ? 'badge-diamond' : 'badge-gold');
        const priorityIcon = q.priorityLevel === 2 ? '🔥' : (q.priorityLevel === 1 ? '💎' : '');
        
        const upButton = (index === 0) ? '' : `<button class="btn btn-small" style="padding: 5px 10px;" onclick="moveQueueItem('${q.username}', 'up')">⬆️</button>`;
        const downButton = (index === queue.length - 1) ? '' : `<button class="btn btn-small" style="padding: 5px 10px;" onclick="moveQueueItem('${q.username}', 'down')">⬇️</button>`;

        return `
        <div class="queue-item">
            <div>
                <strong>${priorityIcon} #${index + 1} ${q.nickname}</strong>
                <span class="badge ${badgeClass}">${levelText}</span>
                <div style="font-size: 12px; color: #aaa;">UID: ${q.gameUID}</div>
            </div>
            <div class="admin-actions">
                ${upButton} ${downButton}
                <button class="btn btn-danger btn-small" onclick="removeFromQueue('${q.username}')">${trans.queue_remove_button}</button>
            </div>
        </div>`;
    }).join('');
}

function renderCodeLists(activationCodes) {
    const unused = activationCodes.filter(c => !c.used);
    const used = activationCodes.filter(c => c.used);
    
    // ★ 安全檢查
    const unusedCountEl = document.getElementById('unusedCodeCount');
    if (unusedCountEl) unusedCountEl.textContent = unused.length;
    
    const usedCountEl = document.getElementById('usedCodeCount');
    if (usedCountEl) usedCountEl.textContent = used.length;

    if (currentCodeSubTab === 'unused') renderCodeItems('unusedCodeList', unused, false);
    if (currentCodeSubTab === 'used') renderCodeItems('usedCodeList', used, true);
}

function renderCodeItems(containerId, list, isUsed) {
    const container = document.getElementById(containerId);
    if (!container) return; // ★ 關鍵：防止報錯
    const trans = translations.zh;

    if (list.length === 0) {
        container.innerHTML = `<div class="empty-state">${isUsed ? trans.code_no_used : trans.code_no_unused}</div>`;
        return;
    }
    
    container.innerHTML = list.map(c => {
         const levelText = c.level === 'legend' ? trans.level_legend_simple : (c.level === 'diamond' ? trans.level_diamond_simple : trans.level_gold_simple);
         const badgeClass = c.level === 'legend' ? 'badge-legend' : (c.level === 'diamond' ? 'badge-diamond' : 'badge-gold');
         return `
            <div class="code-item ${isUsed ? 'used' : ''}">
                <div>
                    <strong style="font-family: monospace;">${c.code}</strong> 
                    <span class="badge ${badgeClass}">${levelText}</span>
                </div>
                ${!isUsed ? 
                    `<div class="admin-actions">
                        <button class="btn-copy" onclick="copyToClipboard('${c.code}', this)">📋</button> 
                        <button class="btn btn-danger btn-small" onclick="deleteCode('${c.code}')">${trans.code_delete_button}</button>
                    </div>` : 
                    `<div>${trans.code_used_by} ${c.usedBy || 'Unknown'}</div>`
                }
            </div>`;
    }).join('');
}

function renderMemberLists(members) {
    const allMembers = members.filter(m => m.username !== 'admin');
    const active = allMembers.filter(m => m.remainingSeconds > 0);
    const expired = allMembers.filter(m => m.remainingSeconds <= 0);
    
    const activeCountEl = document.getElementById('activeMemberCount');
    if(activeCountEl) activeCountEl.innerText = active.length;

    const expiredCountEl = document.getElementById('expiredMemberCount');
    if(expiredCountEl) expiredCountEl.innerText = expired.length;

    if (currentMemberSubTab === 'active') renderMemberItems('activeMemberList', active);
    if (currentMemberSubTab === 'expired') renderMemberItems('expiredMemberList', expired);
}

function renderMemberItems(containerId, list) {
    const container = document.getElementById(containerId);
    if (!container) return; // ★ 關鍵：防止報錯
    const trans = translations.zh;

    if(list.length === 0) { 
        container.innerHTML = `<div class="empty-state">No Data</div>`; 
        return; 
    }
    
    container.innerHTML = list.map(m => {
        const levelText = m.level === 'legend' ? trans.level_legend_simple : (m.level === 'diamond' ? trans.level_diamond_simple : trans.level_gold_simple);
        const badgeClass = m.level === 'legend' ? 'badge-legend' : (m.level === 'diamond' ? 'badge-diamond' : 'badge-gold');
        const timeObj = secondsToTime(m.remainingSeconds);
        return `
        <div class="member-item">
            <div class="member-header">
                <div>
                    <strong>${m.nickname}</strong> <small>(@${m.username})</small> 
                    <span class="badge ${badgeClass}">${levelText}</span>
                </div>
                <div class="admin-actions">
                    <button class="btn btn-small" onclick="openEditMember('${m.username}')">${trans.member_edit_button}</button>
                    <button class="btn btn-danger btn-small" onclick="deleteMember('${m.username}')">${trans.member_delete_button}</button>
                </div>
            </div>
            <div style="margin-top:5px; color:#aaa;">
                ${trans.member_remaining_label} <span class="countdown-time" data-username="${m.username}">${formatTimeDisplay(timeObj)}</span>
            </div>
        </div>`;
    }).join('');
}

function renderBackupInfo(lastBackupTime) {
    const container = document.getElementById('backupInfo');
    if (!container) return;
    const trans = translations.zh;
    container.innerHTML = lastBackupTime ? `<strong>${trans.backup_last_time}</strong> ${new Date(lastBackupTime).toLocaleString()}` : `<strong>${trans.backup_none}</strong>`;
}

async function cleanupGeneratedOrders(orders) {
    if (!orders || orders.length === 0) return [];

    const now = Date.now();
    const expiredGenerated = orders.filter((o) => {
        if (o.status !== 'generated') return false;
        const createdAt = Number(o.createdAt) || 0;
        const expiresAt = Number(o.expiresAt) || (createdAt + ORDER_GENERATED_TTL_MS);
        return now >= expiresAt;
    });

    if (expiredGenerated.length === 0) return orders;

    try {
        const updates = {};
        expiredGenerated.forEach((o) => {
            updates[`orders/${o.id}`] = null;
        });
        await database.ref().update(updates);
    } catch (error) {
        console.error('清理未下載訂單失敗:', error);
    }

    const expiredIds = new Set(expiredGenerated.map((o) => o.id));
    return orders.filter((o) => !expiredIds.has(o.id));
}

function formatOrderDateTime(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(Number(timestamp));
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString('zh-TW');
}

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatCurrency(amount) {
    return `NT$${Number(amount || 0).toLocaleString('zh-TW')}`;
}

function buildDmzProductCode(products) {
    const maxNumber = (products || []).reduce((max, product) => {
        const match = String(product.code || '').match(/DMZ-(\d+)/i);
        const number = match ? Number(match[1]) : 0;
        return Math.max(max, number);
    }, 0);
    return `DMZ-${String(maxNumber + 1).padStart(3, '0')}`;
}

function compressImageFile(file, maxWidth = 1920, maxHeight = 1920, quality = 0.9) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('未選擇圖片'));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.onload = () => {
                const widthScale = maxWidth / image.width;
                const heightScale = maxHeight / image.height;
                const baseScale = Math.min(1, widthScale, heightScale);
                // Keep source detail by avoiding extra downscale beyond fit bounds.
                const scale = baseScale;
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(image.width * scale));
                canvas.height = Math.max(1, Math.round(image.height * scale));
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('圖片處理失敗'));
                    return;
                }
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                resolve(canvas.toDataURL(mimeType, quality));
            };
            image.onerror = () => reject(new Error('圖片讀取失敗'));
            image.src = reader.result;
        };
        reader.onerror = () => reject(new Error('檔案讀取失敗'));
        reader.readAsDataURL(file);
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('未選擇檔案'));
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('檔案讀取失敗'));
        reader.readAsDataURL(file);
    });
}

function updateDmzUploadActionState() {
    const submitBtn = document.getElementById('dmzUploadSubmitBtn');
    const cancelBtn = document.getElementById('dmzUploadCancelBtn');
    const isBusy = isDmzUploadProcessing || isDmzUploadSubmitting;

    if (submitBtn) {
        submitBtn.disabled = isBusy;
        submitBtn.textContent = isDmzUploadProcessing ? '圖片處理中...' : (isDmzUploadSubmitting ? '上架中...' : '📦 上架商品');
    }

    if (cancelBtn) {
        cancelBtn.style.display = isBusy ? 'inline-flex' : 'none';
        cancelBtn.disabled = !isBusy;
        cancelBtn.textContent = cancelDmzUploadRequested ? '取消中...' : '取消上傳';
    }
}

function cancelDmzProductUpload() {
    if (!isDmzUploadProcessing && !isDmzUploadSubmitting) return;
    cancelDmzUploadRequested = true;
    updateDmzUploadActionState();
}

function openDmzUploadPreviewModal(mode = 'create') {
    const modal = document.getElementById('dmzUploadPreviewModal');
    const modalImage = document.getElementById('dmzUploadPreviewModalImage');
    if (!modal || !modalImage) return;

    const source = mode === 'edit'
        ? (pendingEditOriginalData || currentEditProductOriginalData || '')
        : (pendingDmzProductOriginalData || '');

    if (!source) {
        alert('目前沒有可檢視的原圖。');
        return;
    }

    modalImage.src = source;
    modal.style.display = 'flex';
}

function closeDmzUploadPreviewModal(event) {
    const modal = document.getElementById('dmzUploadPreviewModal');
    const modalImage = document.getElementById('dmzUploadPreviewModalImage');
    if (!modal || !modalImage) return;
    if (event && event.target !== modal) return;
    modal.style.display = 'none';
    modalImage.src = '';
}

function parseOptionalNonNegativeInt(value) {
    const trimmed = String(value ?? '').trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed < 0) return NaN;
    return Math.floor(parsed);
}

async function previewDmzProductImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('dmzProductPreview');
    if (!preview) return;

    const taskToken = ++dmzCreatePreviewTaskToken;

    if (!file) {
        pendingDmzProductImageData = '';
        pendingDmzProductOriginalData = '';
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '尚未選擇圖片';
        isDmzUploadProcessing = false;
        cancelDmzUploadRequested = false;
        updateDmzUploadActionState();
        return;
    }

    isDmzUploadProcessing = true;
    cancelDmzUploadRequested = false;
    updateDmzUploadActionState();

    try {
        const [originalData, thumbData] = await Promise.all([
            readFileAsDataURL(file),
            compressImageFile(file)
        ]);

        if (taskToken !== dmzCreatePreviewTaskToken || cancelDmzUploadRequested) {
            pendingDmzProductImageData = '';
            pendingDmzProductOriginalData = '';
            preview.className = 'dmz-product-preview empty-state';
            preview.innerHTML = '已取消圖片處理';
            return;
        }

        pendingDmzProductOriginalData = originalData;
        pendingDmzProductImageData = thumbData;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingDmzProductImageData}" alt="DMZ 商品預覽"><span>圖片已準備上架（雙擊可看原圖）</span>`;
    } catch (error) {
        console.error('DMZ 圖片預覽失敗:', error);
        pendingDmzProductImageData = '';
        pendingDmzProductOriginalData = '';
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '圖片處理失敗，請重新選擇';
        alert('圖片處理失敗，請重新選擇一張圖片。');
    } finally {
        isDmzUploadProcessing = false;
        cancelDmzUploadRequested = false;
        updateDmzUploadActionState();
    }
}

function resetDmzProductForm() {
    const imageInput = document.getElementById('dmzProductImage');
    const nameInput = document.getElementById('dmzProductName');
    const termBlueInput = document.getElementById('dmzTermBlue');
    const termRed1Input = document.getElementById('dmzTermRed1');
    const termRed2Input = document.getElementById('dmzTermRed2');
    const accessoryOwnedInput = document.getElementById('dmzAccessoryOwned');
    const accessoryMaxInput = document.getElementById('dmzAccessoryMax');
    const descInput = document.getElementById('dmzProductDescription');
    const priceInput = document.getElementById('dmzProductPrice');
    const preview = document.getElementById('dmzProductPreview');

    pendingDmzProductImageData = '';
    pendingDmzProductOriginalData = '';
    isDmzUploadProcessing = false;
    isDmzUploadSubmitting = false;
    cancelDmzUploadRequested = false;
    dmzCreatePreviewTaskToken += 1;
    dmzSaveTaskToken += 1;
    if (imageInput) imageInput.value = '';
    if (nameInput) nameInput.value = '';
    if (termBlueInput) termBlueInput.value = '';
    if (termRed1Input) termRed1Input.value = '';
    if (termRed2Input) termRed2Input.value = '';
    if (accessoryOwnedInput) accessoryOwnedInput.value = '';
    if (accessoryMaxInput) accessoryMaxInput.value = '';
    if (descInput) descInput.value = '';
    if (priceInput) priceInput.value = '';
    if (preview) {
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '尚未選擇圖片';
    }
    updateDmzUploadActionState();
}

async function saveDmzProduct() {
    if (isDmzUploadProcessing || isDmzUploadSubmitting) return;

    const name = document.getElementById('dmzProductName')?.value.trim() || '';
    const termBlue = document.getElementById('dmzTermBlue')?.value.trim() || '';
    const termRed1 = document.getElementById('dmzTermRed1')?.value.trim() || '';
    const termRed2 = document.getElementById('dmzTermRed2')?.value.trim() || '';
    const accessoryOwned = parseOptionalNonNegativeInt(document.getElementById('dmzAccessoryOwned')?.value);
    const accessoryMax = parseOptionalNonNegativeInt(document.getElementById('dmzAccessoryMax')?.value);
    const description = document.getElementById('dmzProductDescription')?.value.trim() || '';
    const price = Number(document.getElementById('dmzProductPrice')?.value || 0);

    if (!pendingDmzProductImageData) {
        alert('請先選擇商品圖片。');
        return;
    }
    if (!name) {
        alert('請輸入產品名稱。');
        return;
    }
    if (!price || price < 0) {
        alert('請輸入有效的商品定價。');
        return;
    }
    if (Number.isNaN(accessoryOwned) || Number.isNaN(accessoryMax)) {
        alert('配件數量請輸入 0 以上整數。');
        return;
    }
    if (accessoryOwned !== null && accessoryMax !== null && accessoryOwned > accessoryMax) {
        alert('目前配件數不可大於最多可裝數。');
        return;
    }

    const taskToken = ++dmzSaveTaskToken;
    cancelDmzUploadRequested = false;
    isDmzUploadSubmitting = true;
    updateDmzUploadActionState();

    try {
        const code = buildDmzProductCode(currentDmzProductsCache);
        const newRef = database.ref('dmzProducts').push();

        await newRef.set({
            code,
            name,
            termBlue,
            termRed1,
            termRed2,
            accessoryOwned,
            accessoryMax,
            description,
            price,
            imageData: pendingDmzProductImageData,
            originalImageData: pendingDmzProductOriginalData || pendingDmzProductImageData,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        if (taskToken !== dmzSaveTaskToken || cancelDmzUploadRequested) {
            await newRef.remove();
            alert('已取消上架。');
            return;
        }

        resetDmzProductForm();
        await refreshAdminDashboard();
    } catch (error) {
        if (cancelDmzUploadRequested) {
            alert('已取消上架。');
            return;
        }
        console.error('上架 DMZ 商品失敗:', error);
        alert('上架商品失敗，請稍後再試。');
    } finally {
        isDmzUploadSubmitting = false;
        cancelDmzUploadRequested = false;
        updateDmzUploadActionState();
    }
}

function editDmzProduct(productId) {
    const product = currentDmzProductsCache.find((p) => p.id === productId);
    if (!product) return;

    editingDmzProductId = productId;
    pendingEditImageData = '';
    pendingEditOriginalData = '';
    currentEditProductOriginalData = product.originalImageData || product.imageData || '';

    document.getElementById('dmzEditProductName').value = product.name || '';
    document.getElementById('dmzEditTermBlue').value = product.termBlue || '';
    document.getElementById('dmzEditTermRed1').value = product.termRed1 || '';
    document.getElementById('dmzEditTermRed2').value = product.termRed2 || '';
    document.getElementById('dmzEditAccessoryOwned').value = Number.isFinite(Number(product.accessoryOwned)) ? Number(product.accessoryOwned) : '';
    document.getElementById('dmzEditAccessoryMax').value = Number.isFinite(Number(product.accessoryMax)) ? Number(product.accessoryMax) : '';
    document.getElementById('dmzEditProductDescription').value = product.description || '';
    document.getElementById('dmzEditProductPrice').value = product.price || '';

    const imageInput = document.getElementById('dmzEditProductImage');
    if (imageInput) imageInput.value = '';

    const preview = document.getElementById('dmzEditProductPreview');
    if (preview) {
        if (product.imageData) {
            preview.className = 'dmz-product-preview';
            preview.innerHTML = `<img src="${product.imageData}" alt="DMZ 商品預覽"><span>目前圖片（可重新選擇）</span>`;
        } else {
            preview.className = 'dmz-product-preview empty-state';
            preview.innerHTML = '無圖片';
        }
    }

    document.getElementById('dmzEditModal').style.display = 'flex';
}

function cancelEditDmzProduct() {
    document.getElementById('dmzEditModal').style.display = 'none';
    editingDmzProductId = null;
    pendingEditImageData = '';
    pendingEditOriginalData = '';
    currentEditProductOriginalData = '';
}

async function previewDmzEditImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('dmzEditProductPreview');
    if (!preview) return;
    if (!file) {
        pendingEditImageData = '';
        pendingEditOriginalData = '';
        return;
    }
    try {
        const [originalData, thumbData] = await Promise.all([
            readFileAsDataURL(file),
            compressImageFile(file)
        ]);
        pendingEditOriginalData = originalData;
        pendingEditImageData = thumbData;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingEditImageData}" alt="DMZ 商品預覽"><span>圖片已準備更新</span>`;
    } catch (error) {
        console.error('DMZ 圖片預覽失敗:', error);
        pendingEditImageData = '';
        pendingEditOriginalData = '';
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '圖片處理失敗，請重新選擇';
        alert('圖片處理失敗，請重新選擇一張圖片。');
    }
}

async function saveEditDmzProduct() {
    if (!editingDmzProductId) return;
    const name = document.getElementById('dmzEditProductName')?.value.trim() || '';
    const termBlue = document.getElementById('dmzEditTermBlue')?.value.trim() || '';
    const termRed1 = document.getElementById('dmzEditTermRed1')?.value.trim() || '';
    const termRed2 = document.getElementById('dmzEditTermRed2')?.value.trim() || '';
    const accessoryOwned = parseOptionalNonNegativeInt(document.getElementById('dmzEditAccessoryOwned')?.value);
    const accessoryMax = parseOptionalNonNegativeInt(document.getElementById('dmzEditAccessoryMax')?.value);
    const description = document.getElementById('dmzEditProductDescription')?.value.trim() || '';
    const price = Number(document.getElementById('dmzEditProductPrice')?.value || 0);

    if (!name) { alert('請輸入產品名稱。'); return; }
    if (!price || price < 0) { alert('請輸入有效的商品定價。'); return; }
    if (Number.isNaN(accessoryOwned) || Number.isNaN(accessoryMax)) { alert('配件數量請輸入 0 以上整數。'); return; }
    if (accessoryOwned !== null && accessoryMax !== null && accessoryOwned > accessoryMax) { alert('目前配件數不可大於最多可裝數。'); return; }

    showLoading();
    try {
        const updateData = {
            name,
            termBlue,
            termRed1,
            termRed2,
            accessoryOwned,
            accessoryMax,
            description,
            price,
            updatedAt: Date.now()
        };
        if (pendingEditImageData) {
            updateData.imageData = pendingEditImageData;
            updateData.originalImageData = pendingEditOriginalData || pendingEditImageData;
        }
        await database.ref(`dmzProducts/${editingDmzProductId}`).update(updateData);
        cancelEditDmzProduct();
        await refreshAdminDashboard();
    } catch (error) {
        console.error('編輯 DMZ 商品失敗:', error);
        alert('儲存商品失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

async function deleteDmzProduct(productId) {
    const product = currentDmzProductsCache.find((item) => item.id === productId);
    const confirmed = confirm(`確定要刪除商品 ${product?.code || productId} 嗎？\n此操作無法復原。`);
    if (!confirmed) return;

    showLoading();
    try {
        await database.ref(`dmzProducts/${productId}`).remove();
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除 DMZ 商品失敗:', error);
        alert('刪除商品失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

function renderProductManagement(products) {
    currentDmzProductsCache = Array.isArray(products) ? products : [];

    const listEl = document.getElementById('dmzProductList');
    const countEl = document.getElementById('dmzProductCount');
    if (!listEl || !countEl) return;

    countEl.textContent = `${currentDmzProductsCache.length} 件`;

    if (!currentDmzProductsCache.length) {
        listEl.innerHTML = '<div class="empty-state">目前尚未上架任何 DMZ 商品</div>';
        return;
    }

    listEl.innerHTML = currentDmzProductsCache.map((product) => `
        <div class="dmz-admin-item">
            <img src="${product.imageData}" alt="${escapeHtml(product.code)}" class="dmz-admin-item-image">
            <div class="dmz-admin-item-body">
                <h4 class="dmz-admin-item-name">${escapeHtml(product.name || product.code || '未命名商品')}</h4>
                <div class="dmz-admin-item-top">
                    <strong>${escapeHtml(product.code || 'DMZ-000')}</strong>
                    <span>${formatCurrency(product.price)}</span>
                </div>
                <p style="margin:0 0 8px; color:#9db3c8; font-size:0.92rem;">
                    ${escapeHtml(product.termBlue || '-')} / ${escapeHtml(product.termRed1 || '-')} / ${escapeHtml(product.termRed2 || '-')}
                    ${Number.isFinite(Number(product.accessoryOwned)) || Number.isFinite(Number(product.accessoryMax))
                        ? ` | ${Number.isFinite(Number(product.accessoryOwned)) ? Number(product.accessoryOwned) : 0}/${Number.isFinite(Number(product.accessoryMax)) ? Number(product.accessoryMax) : 0}配件`
                        : ''}
                </p>
                <p>${escapeHtml(product.description || '').replace(/\n/g, '<br>')}</p>
                <div class="dmz-admin-item-actions">
                    <span>建立時間：${formatOrderDateTime(product.createdAt)}</span>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-secondary btn-small" onclick="editDmzProduct('${product.id}')">✏️ 編輯</button>
                        <button class="btn btn-danger btn-small" onclick="deleteDmzProduct('${product.id}')">刪除</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function buildOrderItemHtml(order, withActions) {
    const safeOrderId = String(order.id || '').replace(/'/g, "\\'");
    const orderNo = escapeHtml(order.orderNumber || order.orderId || order.id || '未知編號');
    const title = escapeHtml(order.title || '訂單');
    const total = escapeHtml(order.total || 'NT$0');
    const lineName = escapeHtml(order.lineName || '未填寫');
    const createdText = formatOrderDateTime(order.createdAt);
    const downloadedText = order.downloadedAt ? formatOrderDateTime(order.downloadedAt) : '-';

    return `
    <div class="order-record-item" onclick="playOrderItemClick(this)" ondblclick="openOrderDetail('${safeOrderId}', this)">
        <div class="order-record-top">
            <strong>${orderNo}</strong>
            <span>${title}</span>
        </div>
        <div class="order-record-meta">
            <div>金額：${total}</div>
            <div>LINE：${lineName}</div>
            <div>建立：${createdText}</div>
            <div>下載：${downloadedText}</div>
        </div>
        ${withActions ? `
            <div class="order-record-actions">
                <button class="btn btn-success btn-small" onclick="event.stopPropagation(); markOrderCompleted('${safeOrderId}')">已完成</button>
                <button class="btn btn-danger btn-small" onclick="event.stopPropagation(); deleteOrderRecord('${safeOrderId}')">刪除</button>
            </div>
        ` : `
            <div class="order-record-actions">
                <button class="btn btn-small" onclick="event.stopPropagation(); returnOrderToPending('${safeOrderId}')">返回</button>
            </div>
        `}
    </div>`;
}

function renderOrderManagement(orders) {
    const pendingListEl = document.getElementById('pendingOrdersList');
    const completedListEl = document.getElementById('completedOrdersList');
    const pendingCountEl = document.getElementById('pendingOrderCount');
    const completedCountEl = document.getElementById('completedOrderCount');

    if (!pendingListEl || !completedListEl) return;

    currentOrdersCache = Array.isArray(orders) ? orders : [];

    const pending = currentOrdersCache.filter((o) => o.status === 'pending');
    const completed = currentOrdersCache.filter((o) => o.status === 'completed');

    if (pendingCountEl) pendingCountEl.textContent = pending.length;
    if (completedCountEl) completedCountEl.textContent = completed.length;

    pendingListEl.innerHTML = pending.length
        ? pending.map((o) => buildOrderItemHtml(o, true)).join('')
        : '<div class="empty-state">目前沒有待處理訂單</div>';

    completedListEl.innerHTML = completed.length
        ? completed.map((o) => buildOrderItemHtml(o, false)).join('')
        : '<div class="empty-state">目前沒有已完成紀錄</div>';
}

async function markOrderCompleted(orderId) {
    showLoading();
    try {
        await database.ref(`orders/${orderId}`).update({
            status: 'completed',
            completedAt: Date.now(),
            updatedAt: Date.now()
        });
        await refreshAdminDashboard();
    } catch (error) {
        console.error('更新訂單完成狀態失敗:', error);
        alert('更新失敗，請稍後再試');
    } finally {
        hideLoading();
    }
}

async function returnOrderToPending(orderId) {
    showLoading();
    try {
        await database.ref(`orders/${orderId}`).update({
            status: 'pending',
            completedAt: null,
            updatedAt: Date.now()
        });
        await refreshAdminDashboard();
    } catch (error) {
        console.error('返回待處理失敗:', error);
        alert('返回失敗，請稍後再試');
    } finally {
        hideLoading();
    }
}

function playOrderItemClick(element) {
    if (!element) return;
    element.classList.remove('is-clicked');
    void element.offsetWidth;
    element.classList.add('is-clicked');
    setTimeout(() => element.classList.remove('is-clicked'), 240);
}

function closeOrderDetailModal() {
    const modal = document.getElementById('orderDetailModal');
    if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('orderDetailModal');
    if (modal && event.target === modal) {
        closeOrderDetailModal();
    }
});

function openOrderDetail(orderId, element) {
    playOrderItemClick(element);

    const order = currentOrdersCache.find((item) => item.id === orderId);
    if (!order) return;

    const container = document.getElementById('orderDetailContent');
    const modal = document.getElementById('orderDetailModal');
    if (!container || !modal) return;

    const statusMap = {
        pending: '待處理',
        completed: '已完成',
        generated: '已生成'
    };

    const itemRows = (order.items || []).map((item) => `
        <div class="order-detail-row">
            <span>${escapeHtml(item.label)}</span>
            <span>${escapeHtml(item.value)}</span>
        </div>
    `).join('') || '<div class="empty-state">沒有可顯示的明細</div>';

    container.innerHTML = `
        <div class="order-detail-block">
            <h3>${escapeHtml(order.orderNumber || order.id)}</h3>
            <div class="order-detail-row"><span>狀態</span><span>${statusMap[order.status] || order.status || '-'}</span></div>
            <div class="order-detail-row"><span>標題</span><span>${escapeHtml(order.title || '訂單')}</span></div>
            <div class="order-detail-row"><span>副標</span><span>${escapeHtml(order.subtitle || '-')}</span></div>
            <div class="order-detail-row"><span>應付金額</span><span>${escapeHtml(order.total || 'NT$0')}</span></div>
            <div class="order-detail-row"><span>LINE 名稱</span><span>${escapeHtml(order.lineName || '未填寫')}</span></div>
            <div class="order-detail-row"><span>建立時間</span><span>${formatOrderDateTime(order.createdAt)}</span></div>
            <div class="order-detail-row"><span>下載時間</span><span>${formatOrderDateTime(order.downloadedAt)}</span></div>
            <div class="order-detail-row"><span>完成時間</span><span>${formatOrderDateTime(order.completedAt)}</span></div>
        </div>
        <div class="order-detail-block">
            <h3>訂單項目</h3>
            ${itemRows}
        </div>
        <div class="order-detail-block">
            <h3>備註</h3>
            <p>${escapeHtml(order.note || '無')}</p>
        </div>
    `;

    modal.classList.add('active');
}

async function deleteOrderRecord(orderId) {
    const orderNoText = orderId;
    const confirmed = confirm(`確定要刪除訂單 ${orderNoText} 嗎？\n此操作無法復原。`);
    if (!confirmed) return;

    showLoading();
    try {
        await database.ref(`orders/${orderId}`).remove();
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除訂單失敗:', error);
        alert('刪除失敗，請稍後再試');
    } finally {
        hideLoading();
    }
}

// ==========================================
// ▼▼▼ 8. 動作函式 (Action Functions) - 補齊所有功能 ▼▼▼
// ==========================================

async function createGameSession() {
    const gameName = document.getElementById('sessionGameName').value.trim() || 'CODM 會員場';
    const slots = parseInt(document.getElementById('sessionSlots').value.trim()) || 10;
    const description = document.getElementById('sessionDescription').value.trim();
    const startTimeInput = document.getElementById('sessionStartTime').value;
    const startTime = startTimeInput ? new Date(startTimeInput).toISOString() : new Date().toISOString();
    const trans = translations.zh;

    const newSession = { gameName, slots, description, startTime };
    if (!confirm(trans.alert_session_confirm)) return;

    showLoading();
    try {
        await database.ref('gameSession').set(newSession);
        alert(trans.alert_session_open_success);
        await refreshAdminDashboard();
    } catch (error) { console.error("開啟場次失敗:", error); alert(trans.alert_session_open_fail); } 
    finally { hideLoading(); }
}

async function closeGameSession() {
    const trans = translations.zh;
    if (!confirm(trans.alert_session_close_confirm)) return;
    showLoading();
    try {
        await database.ref('gameSession').set(null);
        alert(trans.alert_session_close_success);
        await refreshAdminDashboard();
    } catch (error) { console.error("關閉場次失敗:", error); alert(trans.alert_session_close_fail); } 
    finally { hideLoading(); }
}

async function removeFromQueue(username) {
    const trans = translations.zh;
    if (!confirm(trans.alert_queue_remove_confirm.replace('{username}', username))) return;
    showLoading();
    try {
        await database.ref(`queue/${username}`).remove();
        alert(trans.alert_queue_remove_success.replace('{username}', username));
        await refreshAdminDashboard();
    } catch (error) { console.error("移除失敗:", error); alert(trans.alert_queue_remove_fail); } 
    finally { hideLoading(); }
}

async function clearQueue() {
    const trans = translations.zh;
    if (!confirm(trans.alert_queue_clear_confirm)) return;
    showLoading();
    try {
        await database.ref('queue').set(null);
        alert(trans.alert_queue_clear_success);
        await refreshAdminDashboard();
    } catch (error) { console.error("清空失敗:", error); alert(trans.alert_queue_clear_fail); } 
    finally { hideLoading(); }
}

async function moveQueueItem(username, direction) {
    const trans = translations.zh;
    showLoading();
    try {
        const data = await loadData();
        let queue = data.queue;
        const currentIndex = queue.findIndex(q => q.username === username);
        if (currentIndex === -1) throw new Error("User not found");

        const targetIndex = (direction === 'up') ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= queue.length) { hideLoading(); return; }

        const [itemToMove] = queue.splice(currentIndex, 1);
        queue.splice(targetIndex, 0, itemToMove);
        
        const updates = {};
        queue.forEach((item, index) => { updates[`/queue/${item.username}/adminOrder`] = index + 1; });
        
        await database.ref().update(updates);
        await refreshAdminDashboard();
    } catch (error) { console.error("移動失敗:", error); alert(trans.alert_op_fail); } 
    finally { hideLoading(); }
}

async function generateCode() {
    const level = document.getElementById('codeLevel').value;
    const days = parseInt(document.getElementById('codeDays').value) || 0;
    const amount = parseInt(document.getElementById('codeAmount').value) || 1;
    const trans = translations.zh;

    if (days <= 0) return alert(trans.alert_code_invalid_days);
    if (amount > 100 && !confirm(trans.alert_code_gen_confirm.replace('{amount}', amount))) return;
    
    showLoading();
    try {
        const data = await loadData();
        const seconds = days * 86400;
        const updates = {};
        const newCodes = [];

        for (let i = 0; i < amount; i++) {
            let newCode;
            do { newCode = generateActivationCode(); } while (data.activationCodes.find(c => c.code === newCode));
            const codeData = {
                code: newCode, level: level, seconds: seconds,
                createdDate: new Date().toISOString(), used: false
            };
            updates['activationCodes/' + newCode] = codeData;
            newCodes.push(newCode);
        }
        await database.ref().update(updates);
        
        document.getElementById('generatedCodesList').innerHTML = `
            <h3>${trans.alert_code_gen_list_title.replace('{amount}', amount)}</h3>
            <div style="max-height:200px; overflow-y:auto; background:#222; padding:10px;">${newCodes.join('<br>')}</div>
        `;
        alert(trans.alert_code_gen_success.replace('{amount}', amount));
        await refreshAdminDashboard();
    } catch (error) { console.error("產生失敗:", error); alert(trans.alert_code_gen_fail); } 
    finally { hideLoading(); }
}

async function deleteCode(code) {
    const trans = translations.zh;
    if (!confirm(trans.alert_code_delete_confirm.replace('{code}', code))) return;
    showLoading();
    try {
        await database.ref(`activationCodes/${code}`).remove();
        alert(trans.alert_code_delete_success.replace('{code}', code));
        await refreshAdminDashboard();
    } catch (error) { console.error("刪除失敗:", error); alert(trans.alert_code_delete_fail); } 
    finally { hideLoading(); }
}

// 編輯會員
function openEditMemberModal() { document.getElementById('editMemberModal').classList.add('active'); }
function closeEditMemberModal() { document.getElementById('editMemberModal').classList.remove('active'); editingMember = null; }

async function openEditMember(username) {
    showLoading();
    const trans = translations.zh;
    try {
        const data = await loadData();
        const member = data.members.find(m => m.username === username);
        if (!member) { alert(trans.alert_member_not_found); hideLoading(); return; }
        
        editingMember = member;
        const timeObj = secondsToTime(member.remainingSeconds);
        const timeClass = getTimeColorClass(member.remainingSeconds);
        
        const content = document.getElementById('editMemberContent');
        content.innerHTML = `
        <h3>${trans.edit_editing} ${member.nickname}</h3>
        <p>${trans.edit_remaining_time} <span id="editMemberCountdown" class="countdown-time ${timeClass}">${formatTimeDisplay(timeObj)}</span></p>
        <hr style="margin: 20px 0;">
        <h4>${trans.edit_adjust_time}</h4>
        <div class="input-row">
            <input type="number" id="editYears" placeholder="${trans.edit_time_year}">
            <input type="number" id="editMonths" placeholder="${trans.edit_time_month}">
            <input type="number" id="editDays" placeholder="${trans.edit_time_day}">
            <input type="number" id="editHours" placeholder="${trans.edit_time_hour}">
        </div>
        <div style="margin: 10px 0; display: flex; gap: 10px;">
            <button class="btn btn-success btn-small" onclick="adjustTime(true)">${trans.edit_add_time}</button>
            <button class="btn btn-danger btn-small" onclick="adjustTime(false)">${trans.edit_reduce_time}</button>
        </div>
        <hr style="margin: 20px 0;">
        <div class="input-group"><label>${trans.edit_nickname}</label><input type="text" id="editNickname" value="${member.nickname}"></div>
        <div class="input-group"><label>${trans.edit_game_uid}</label><input type="text" id="editGameUID" value="${member.gameUID}"></div>
        <div class="input-group"><label>${trans.edit_level}</label>
            <select id="editLevel">
                <option value="gold" ${member.level==='gold'?'selected':''}>${trans.level_gold}</option>
                <option value="diamond" ${member.level==='diamond'?'selected':''}>${trans.level_diamond}</option>
                <option value="legend" ${member.level==='legend'?'selected':''}>${trans.level_legend}</option>
            </select>
        </div>
        <div class="input-group"><label>${trans.edit_priority_quota}</label><input type="number" id="editPriorityQuota" value="${member.priorityQuota||0}"></div>
        <div class="input-group"><label><input type="checkbox" id="editIsAdmin" ${member.isAdmin?'checked':''}> ${trans.edit_set_admin}</label></div>
        <button class="btn" onclick="saveMemberEdit()" style="width: 100%;">${trans.edit_save}</button>
        `;
        openEditMemberModal();
    } catch (e) { console.error(e); } finally { hideLoading(); }
}

async function adjustTime(isAdding) {
    const years = parseInt(document.getElementById('editYears').value) || 0;
    const months = parseInt(document.getElementById('editMonths').value) || 0;
    const days = parseInt(document.getElementById('editDays').value) || 0;
    const hours = parseInt(document.getElementById('editHours').value) || 0;
    const secondsToAdd = timeToSeconds(years, months, days, hours, 0, 0);
    const trans = translations.zh;

    if (secondsToAdd <= 0) return alert(trans.alert_time_invalid);
    
    showLoading();
    try {
        const snap = await database.ref('members/' + editingMember.username).once('value');
        const m = snap.val();
        let newSec = isAdding ? (m.remainingSeconds||0) + secondsToAdd : Math.max(0, (m.remainingSeconds||0) - secondsToAdd);
        
        await database.ref('members/' + editingMember.username).update({
            remainingSeconds: newSec, lastUpdateTime: Math.floor(Date.now()/1000)
        });
        
        const timeObj = secondsToTime(newSec);
        const timeClass = getTimeColorClass(newSec);
        document.getElementById('editMemberCountdown').textContent = formatTimeDisplay(timeObj);
        document.getElementById('editMemberCountdown').className = 'countdown-time ' + timeClass;
        alert(trans.alert_time_adjust_success.replace('{action}', isAdding ? trans.alert_time_add : trans.alert_time_reduce));
        await refreshAdminDashboard();
    } catch(e) { console.error(e); alert(trans.alert_op_fail); } finally { hideLoading(); }
}

async function saveMemberEdit() {
    if (!editingMember) return;
    const trans = translations.zh;
    const newNickname = document.getElementById('editNickname').value.trim();
    const newGameUID = document.getElementById('editGameUID').value.trim();
    
    if (!newNickname || !newGameUID) return alert(trans.alert_member_empty_fields);
    
    showLoading();
    try {
        await database.ref('members/' + editingMember.username).update({
            nickname: newNickname,
            gameUID: newGameUID,
            level: document.getElementById('editLevel').value,
            priorityQuota: parseInt(document.getElementById('editPriorityQuota').value) || 0,
            isAdmin: document.getElementById('editIsAdmin').checked
        });
        alert(trans.alert_member_save_success);
        closeEditMemberModal();
        await refreshAdminDashboard();
    } catch(e) { console.error(e); alert(trans.alert_member_save_fail); } finally { hideLoading(); }
}

async function deleteMember(username) {
    const trans = translations.zh;
    if(username === 'admin') return alert(trans.alert_member_delete_admin);
    if(!confirm(trans.alert_member_delete_confirm.replace('{username}', username))) return;
    
    showLoading();
    try {
        await database.ref('members/' + username).remove();
        await database.ref('queue/' + username).remove();
        alert(trans.alert_member_delete_success.replace('{username}', username));
        await refreshAdminDashboard();
    } catch(e) { console.error(e); alert(trans.alert_member_delete_fail); } finally { hideLoading(); }
}

// 密碼與 Tab
function openLoginModal() { document.getElementById('loginModal').classList.add('active'); }
function closeLoginModal() { document.getElementById('loginModal').classList.remove('active'); }
function openChangePasswordModal() { document.getElementById('changePasswordModal').classList.add('active'); }
function closeChangePasswordModal() { document.getElementById('changePasswordModal').classList.remove('active'); }

async function changePassword() {
    const newPass = document.getElementById('changeNewPassword').value.trim();
    const confirmPass = document.getElementById('changeConfirmPassword').value.trim();
    const trans = translations.zh;

    if (newPass.length < 6) return alert(trans.alert_password_short);
    if (newPass !== confirmPass) return alert(trans.alert_password_mismatch);

    showLoading();
    try {
        const newHash = await hashPassword(newPass);
        await database.ref('members/' + currentUser.username).update({ passwordHash: newHash });
        alert(trans.alert_password_change_success);
        closeChangePasswordModal();
    } catch(e) { console.error(e); alert(trans.alert_password_change_fail); } finally { hideLoading(); }
}

function showCodeSubTab(tabName) {
    currentCodeSubTab = tabName;
    const card = document.querySelector('#generate').closest('.card');
    card.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    card.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    card.querySelector(`.sub-tabs button[onclick="showCodeSubTab('${tabName}')"]`).classList.add('active');
    refreshAdminDashboard();
}

function showMemberSubTab(tabName) {
    currentMemberSubTab = tabName;
    const card = document.querySelector('#activeMembers').closest('.card');
    card.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    card.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName === 'active' ? 'activeMembers' : 'expiredMembers').classList.add('active');
    card.querySelector(`.sub-tabs button[onclick="showMemberSubTab('${tabName}')"]`).classList.add('active');
    refreshAdminDashboard();
}

// ==========================================
// ▼▼▼ 9. 登入/登出與雜項 ▼▼▼
// ==========================================

async function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const trans = translations.zh;

    if (!username || !password) return alert(trans.alert_login_prompt);
    showLoading();
    try {
        const data = await loadData();
        const passwordHash = await hashPassword(password);
        const member = data.members.find(m => m.username === username && m.passwordHash === passwordHash);

        if (!member) { alert(trans.alert_login_wrong); return; }
        if (!member.isAdmin) { alert(trans.alert_login_no_perm); return; }

        currentUser = member;
        sessionStorage.setItem('currentUser', member.username);
        
        closeLoginModal();
        
        // ★ 關鍵：顯示後台介面
        const wrapper = document.querySelector('.admin-wrapper');
        if(wrapper) wrapper.style.display = 'flex';
        
        await initializeAdminDashboard();
        
        updateUserSection();
        alert("成功登入管理員");

    } catch (e) { console.error(e); alert(trans.alert_login_fail); } finally { hideLoading(); }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUser = null;
    
    // ★ 關鍵：隱藏後台
    const wrapper = document.querySelector('.admin-wrapper');
    if(wrapper) wrapper.style.display = 'none';
    
    // 重置分頁狀態
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const firstBtn = document.querySelector('.nav-btn[onclick*="audience"]');
    if(firstBtn) firstBtn.classList.add('active');
    
    updateUserSection();
    stopAutoRefresh();
    
    openLoginModal();
}

function updateUserSection() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return;
    const trans = translations.zh;

    if (currentUser && currentUser.isAdmin) {
        userSection.innerHTML = `
            <button class="user-info-btn" id="userInfoBtn" onclick="openChangePasswordModal()">
                <span class="user-name">${currentUser.nickname}</span>
                <span class="user-role">${trans.member_admin}</span>
            </button>
        `;
    } else {
        userSection.innerHTML = `<button class="btn btn-small" onclick="openLoginModal()">${trans.login}</button>`;
    }
}

function startGlobalCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(async () => { await updateAllCountdowns(); }, 1000);
}

async function updateAllCountdowns() {
    // 這裡僅作視覺更新，不需重新 loadData
}

function stopCountdown() { if(countdownInterval) clearInterval(countdownInterval); }

function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(async () => {
        // 1. 檢查是否有彈出視窗
        const hasModal = document.querySelector('.modal.active');
        
        // 2. ★ 新增：檢查是否有輸入框正在被編輯 (避免打字被打斷)
        const activeElement = document.activeElement;
        const isTyping = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

        // 如果有視窗開啟或是正在打字，就暫停刷新
        if (!hasModal && !isTyping) {
            await refreshAdminDashboard();
        }
    }, REFRESH_INTERVAL);
}

function stopAutoRefresh() { if(autoRefreshInterval) clearInterval(autoRefreshInterval); }

function initDailyBackup() { console.log("每日備份排程已啟動"); }

async function exportToExcel(isAuto = false) {
    const trans = translations.zh;
    if (!isAuto) showLoading();
    try {
        const data = await loadData();
        if (data.members.length === 0) { if(!isAuto) alert(trans.alert_no_backup_data); return; }
        
        const memberData = data.members.map(m => ({
            'Username': m.username, 'Nickname': m.nickname, 'Level': m.level, 
            'Seconds': m.remainingSeconds, 'Code': m.activationCode, 
            'PriorityQuota': m.priorityQuota
        }));
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(memberData), "Members");
        
        const fileName = `Backup_${new Date().toISOString().slice(0,10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
        await database.ref('lastBackupTime').set(new Date().toISOString());
        renderBackupInfo(new Date().toISOString());
        if(!isAuto) alert('Excel Exported!');
    } catch(e) { console.error(e); if(!isAuto) alert(trans.alert_backup_fail); }
    finally { if(!isAuto) hideLoading(); }
}

// ==========================================
// ▼▼▼ DMZ 任務管理功能 ▼▼▼
// ==========================================

async function previewMissionImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('missionImagePreview');
    if (!preview) return;

    const taskToken = ++missionCreatePreviewTaskToken;

    if (!file) {
        pendingMissionImageData = '';
        pendingMissionOriginalData = '';
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '尚未選擇圖片';
        isMissionUploadProcessing = false;
        cancelMissionUploadRequested = false;
        updateMissionUploadActionState();
        return;
    }

    isMissionUploadProcessing = true;
    cancelMissionUploadRequested = false;
    updateMissionUploadActionState();

    try {
        const [originalData, thumbData] = await Promise.all([
            readFileAsDataURL(file),
            compressImageFile(file)
        ]);

        if (taskToken !== missionCreatePreviewTaskToken || cancelMissionUploadRequested) {
            pendingMissionImageData = '';
            pendingMissionOriginalData = '';
            preview.className = 'dmz-product-preview empty-state';
            preview.innerHTML = '已取消圖片處理';
            return;
        }

        pendingMissionOriginalData = originalData;
        pendingMissionImageData = thumbData;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingMissionImageData}" alt="DMZ 任務預覽"><span>圖片已準備上架（雙擊可看原圖）</span>`;
    } catch (error) {
        console.error('任務圖片預覽失敗:', error);
        pendingMissionImageData = '';
        pendingMissionOriginalData = '';
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '圖片處理失敗，請重新選擇';
        alert('圖片處理失敗，請重新選擇一張圖片。');
    } finally {
        isMissionUploadProcessing = false;
        cancelMissionUploadRequested = false;
        updateMissionUploadActionState();
    }
}

function updateMissionUploadActionState() {
    const submitBtn = document.getElementById('missionUploadSubmitBtn');
    const cancelBtn = document.getElementById('missionUploadCancelBtn');
    if (submitBtn) submitBtn.disabled = isMissionUploadProcessing || isMissionUploadSubmitting;
    if (cancelBtn) {
        cancelBtn.style.display = (isMissionUploadProcessing || isMissionUploadSubmitting) ? 'inline-block' : 'none';
    }
}

function resetMissionForm() {
    const imageInput = document.getElementById('missionImage');
    const weekInput = document.getElementById('missionWeek');
    const titleInput = document.getElementById('missionTitle');
    const descInput = document.getElementById('missionDescription');
    const singlePriceInput = document.getElementById('missionSinglePrice');
    const addonPriceInput = document.getElementById('missionAddonPrice');
    const preview = document.getElementById('missionImagePreview');

    pendingMissionImageData = '';
    pendingMissionOriginalData = '';
    isMissionUploadProcessing = false;
    isMissionUploadSubmitting = false;
    cancelMissionUploadRequested = false;
    missionCreatePreviewTaskToken += 1;
    missionSaveTaskToken += 1;
    editingMissionId = null;

    if (imageInput) imageInput.value = '';
    if (weekInput) weekInput.value = '';
    if (titleInput) titleInput.value = '';
    if (descInput) descInput.value = '';
    if (singlePriceInput) singlePriceInput.value = '';
    if (addonPriceInput) addonPriceInput.value = '';
    if (preview) {
        preview.className = 'dmz-product-preview empty-state';
        preview.innerHTML = '尚未選擇圖片';
    }
    updateMissionUploadActionState();

    const submitBtn = document.getElementById('missionUploadSubmitBtn');
    if (submitBtn) submitBtn.textContent = '📋 上架任務';
}

function cancelMissionUpload() {
    cancelMissionUploadRequested = true;
    resetMissionForm();
}

async function saveMission() {
    if (isMissionUploadProcessing || isMissionUploadSubmitting) return;

    const week = Number(document.getElementById('missionWeek')?.value || 0);
    const title = document.getElementById('missionTitle')?.value.trim() || '';
    const description = document.getElementById('missionDescription')?.value.trim() || '';
    const singlePrice = Number(document.getElementById('missionSinglePrice')?.value || 0);
    const addonPrice = Number(document.getElementById('missionAddonPrice')?.value || 0);

    if (!pendingMissionImageData) {
        alert('請先選擇任務圖片。');
        return;
    }
    if (!title) {
        alert('請輸入任務標題。');
        return;
    }
    if (week < 1 || week > 52) {
        alert('週次請輸入 1-52 之間的數字。');
        return;
    }
    if (singlePrice < 0 || addonPrice < 0) {
        alert('價格不能為負數。');
        return;
    }
    if (singlePrice <= 0 && addonPrice <= 0) {
        alert('單點價和加購價至少須輸入一個。');
        return;
    }

    const taskToken = ++missionSaveTaskToken;
    cancelMissionUploadRequested = false;
    isMissionUploadSubmitting = true;
    updateMissionUploadActionState();

    try {
        const isEdit = !!editingMissionId;
        const missionRef = isEdit 
            ? database.ref('dmzMissions/' + editingMissionId)
            : database.ref('dmzMissions').push();

        const missionData = {
            week,
            title,
            description,
            singlePrice,
            addonPrice,
            imageData: pendingMissionImageData,
            originalImageData: pendingMissionOriginalData || pendingMissionImageData,
            updatedAt: Date.now()
        };

        if (!isEdit) {
            missionData.createdAt = Date.now();
        }

        await missionRef.set(missionData);

        if (taskToken !== missionSaveTaskToken || cancelMissionUploadRequested) {
            if (!isEdit) await missionRef.remove();
            alert('已取消上架。');
            return;
        }

        alert(isEdit ? '任務已更新！' : '任務已上架！');
        resetMissionForm();
        await refreshAdminDashboard();
    } catch (error) {
        if (cancelMissionUploadRequested) {
            alert('已取消上架。');
            return;
        }
        console.error('保存 DMZ 任務失敗:', error);
        alert('保存任務失敗，請稍後再試。');
    } finally {
        isMissionUploadSubmitting = false;
        cancelMissionUploadRequested = false;
        updateMissionUploadActionState();
    }
}

function editMission(missionId) {
    const mission = currentDmzMissionsCache.find((m) => m.id === missionId);
    if (!mission) return;

    editingMissionId = missionId;
    pendingEditMissionImageData = '';
    pendingEditMissionOriginalData = '';
    currentEditMissionOriginalData = mission.originalImageData || mission.imageData || '';

    document.getElementById('missionWeek').value = mission.week || '';
    document.getElementById('missionTitle').value = mission.title || '';
    document.getElementById('missionDescription').value = mission.description || '';
    document.getElementById('missionSinglePrice').value = mission.singlePrice || '';
    document.getElementById('missionAddonPrice').value = mission.addonPrice || '';

    const imageInput = document.getElementById('missionImage');
    if (imageInput) imageInput.value = '';

    const preview = document.getElementById('missionImagePreview');
    if (preview) {
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${mission.imageData}" alt="DMZ 任務"><span>已上架（雙擊看原圖，更新圖片請重新選擇）</span>`;
    }

    const submitBtn = document.getElementById('missionUploadSubmitBtn');
    if (submitBtn) submitBtn.textContent = '📋 更新任務';

    document.getElementById('missionWeek').scrollIntoView({ behavior: 'smooth' });
}

async function deleteMission(missionId) {
    if (!confirm('確定要刪除此任務嗎？此操作無法復原。')) return;

    try {
        showLoading();
        await database.ref('dmzMissions/' + missionId).remove();
        alert('任務已刪除！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除任務失敗:', error);
        alert('刪除任務失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}


// ===== 新的三層任務管理函數 =====

// 【第1層】週次管理
async function previewWeekImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('weekImagePreview');
    if (!file || !preview) return;

    try {
        const [original, thumb] = await Promise.all([readFileAsDataURL(file), compressImageFile(file)]);
        pendingWeekOriginalData = original;
        pendingWeekImageData = thumb;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingWeekImageData}" alt="週次圖片"><span>已準備上架</span>`;
    } catch (error) {
        console.error('圖片預覽失敗:', error);
        alert('圖片處理失敗，請重新選擇。');
    }
}

async function saveWeekImage() {
    const weekRaw = String(document.getElementById('weekNumber')?.value || '').trim();
    if (!pendingWeekImageData) { alert('請先選擇週次圖片。'); return; }

    let weekValue = null;
    let weekLabel = '';
    if (weekRaw === 'special') {
        weekValue = 'special';
        weekLabel = '特別試煉';
    } else {
        const weekNum = Number(weekRaw || 0);
        if (weekNum < 1 || weekNum > 52) { alert('請選擇 1-52 週，或「特別試煉」。'); return; }
        weekValue = weekNum;
        weekLabel = `第 ${weekNum} 週`;
    }

    try {
        const newRef = database.ref('dmzMissionWeeks').push();
        await newRef.set({
            week: weekValue,
            weekLabel,
            imageData: pendingWeekImageData,
            originalImageData: pendingWeekOriginalData || pendingWeekImageData,
            createdAt: Date.now()
        });
        alert('週次已上架！');
        pendingWeekImageData = '';
        pendingWeekOriginalData = '';
        document.getElementById('weekNumber').value = '';
        document.getElementById('weekImageFile').value = '';
        document.getElementById('weekImagePreview').className = 'dmz-product-preview empty-state';
        document.getElementById('weekImagePreview').innerHTML = '尚未選擇圖片';
        await refreshAdminDashboard();
    } catch (error) {
        console.error('上架週次失敗:', error);
        alert('上架失敗，請稍後再試。');
    }
}

function renderWeekManagement(weeks) {
    currentWeeksCache = weeks || [];
    const listEl = document.getElementById('weekList');
    const countEl = document.getElementById('weekCount');
    const selectEl = document.getElementById('taskTitleWeekSelect');
    const getWeekLabel = (weekObj) => {
        if (!weekObj) return '未知週次';
        if (weekObj.week === 'special') return '特別試煉';
        const n = Number(weekObj.week);
        return Number.isFinite(n) && n > 0 ? `第 ${n} 週` : (weekObj.weekLabel || '未知週次');
    };
    const sortWeeks = (list) => [...list].sort((a, b) => {
        const av = a?.week === 'special' ? 9999 : Number(a?.week) || 9998;
        const bv = b?.week === 'special' ? 9999 : Number(b?.week) || 9998;
        return av - bv;
    });

    if (listEl && countEl) {
        countEl.textContent = `${weeks.length} 個`;
        if (weeks.length === 0) {
            listEl.innerHTML = '<div class="empty-state">還沒有上架週次</div>';
        } else {
            listEl.innerHTML = sortWeeks(weeks)
                .map((week) => `
                    <div style="padding: 8px; background: #1a1a1a; border-radius: 4px; margin-bottom: 6px; display: flex; gap: 8px; align-items: center;">
                        <img src="${week.originalImageData || week.imageData || ''}" alt="週次" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" ondblclick="openImagePreview('${week.originalImageData || week.imageData || ''}')" title="雙擊檢視原圖">
                        <div style="flex: 1;">
                            <strong style="color: #00d4ff;">${getWeekLabel(week)}</strong>
                        </div>
                        <button class="btn btn-small" onclick="replaceStructureImage('week', '${week.id}')" style="padding: 4px 8px;">更換圖片</button>
                        <button class="btn btn-danger btn-small" onclick="deleteWeek('${week.id}')" style="padding: 4px 8px;">刪除</button>
                    </div>
                `).join('');
        }
    }

    if (selectEl) {
        const currentValue = selectEl.value;
        selectEl.innerHTML = '<option value="">-- 選擇週次 --</option>';
        sortWeeks(weeks)
            .forEach((week) => {
                const opt = document.createElement('option');
                opt.value = week.id;
                opt.textContent = getWeekLabel(week);
                selectEl.appendChild(opt);
            });
        selectEl.value = currentValue;
    }
}

async function deleteWeek(weekId) {
    if (!confirm('確定要刪除此週次嗎？')) return;
    try {
        showLoading();
        await database.ref('dmzMissionWeeks/' + weekId).remove();
        alert('週次已刪除！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除失敗:', error);
        alert('刪除失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

// 【第2層】任務標題管理
function onTaskTitleWeekSelected() {
    const select = document.getElementById('taskTitleWeekSelect');
    selectedWeekForTaskTitle = select.value || null;
    const imageInput = document.getElementById('taskTitleImageFile');
    const nameInput = document.getElementById('taskTitleName');
    if (imageInput) imageInput.disabled = !selectedWeekForTaskTitle;
    if (nameInput) nameInput.disabled = !selectedWeekForTaskTitle;
    if (!selectedWeekForTaskTitle) {
        document.getElementById('taskTitleImagePreview').className = 'dmz-product-preview empty-state';
        document.getElementById('taskTitleImagePreview').innerHTML = '請先選擇週次';
        if (nameInput) nameInput.value = '';
    }
    refreshTaskTitleList();
}

async function previewTaskTitleImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('taskTitleImagePreview');
    if (!file || !preview) return;

    try {
        const [original, thumb] = await Promise.all([readFileAsDataURL(file), compressImageFile(file)]);
        pendingTaskTitleOriginalData = original;
        pendingTaskTitleImageData = thumb;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingTaskTitleImageData}" alt="任務標題"><span>已準備上架</span>`;
    } catch (error) {
        console.error('圖片預覽失敗:', error);
        alert('圖片處理失敗，請重新選擇。');
    }
}

async function saveTaskTitleImage() {
    if (!selectedWeekForTaskTitle) { alert('請先選擇週次。'); return; }
    const taskTitleName = String(document.getElementById('taskTitleName')?.value || '').trim();
    if (!taskTitleName) { alert('請輸入任務標題名稱。'); return; }
    if (!pendingTaskTitleImageData) { alert('請先選擇任務標題圖片。'); return; }

    try {
        const newRef = database.ref('dmzMissionTaskTitles').push();
        await newRef.set({
            weekId: selectedWeekForTaskTitle,
            titleName: taskTitleName,
            imageData: pendingTaskTitleImageData,
            originalImageData: pendingTaskTitleOriginalData || pendingTaskTitleImageData,
            createdAt: Date.now()
        });
        alert('任務標題已上架！');
        pendingTaskTitleImageData = '';
        pendingTaskTitleOriginalData = '';
        document.getElementById('taskTitleImageFile').value = '';
        document.getElementById('taskTitleName').value = '';
        document.getElementById('taskTitleImagePreview').className = 'dmz-product-preview empty-state';
        document.getElementById('taskTitleImagePreview').innerHTML = '尚未選擇圖片';
        await refreshAdminDashboard();
    } catch (error) {
        console.error('上架任務標題失敗:', error);
        alert('上架失敗，請稍後再試。');
    }
}

function renderTaskTitleManagement(taskTitles) {
    currentTaskTitlesCache = taskTitles || [];
    refreshTaskTitleList();
    refreshTaskContentTaskSelect();
}

function refreshTaskTitleList() {
    const listEl = document.getElementById('taskTitleList');
    const countEl = document.getElementById('taskTitleCount');
    if (!listEl || !countEl) return;

    const getWeekLabel = (weekObj) => {
        if (!weekObj) return '未知週次';
        if (weekObj.week === 'special') return '特別試煉';
        const n = Number(weekObj.week);
        return Number.isFinite(n) && n > 0 ? `第 ${n} 週` : '未知週次';
    };

    const filtered = currentTaskTitlesCache.filter(t => !selectedWeekForTaskTitle || t.weekId === selectedWeekForTaskTitle);
    countEl.textContent = `${filtered.length} 個`;

    if (filtered.length === 0) {
        listEl.innerHTML = '<div class="empty-state">無任務標題</div>';
    } else {
        listEl.innerHTML = filtered.map((title) => `
            <div style="padding: 12px; background: #171717; border: 1px solid #333; border-radius: 8px; margin-bottom: 10px; display: grid; grid-template-columns: 120px 1fr; gap: 12px; align-items: center;">
                <div>
                    <img src="${title.originalImageData || title.imageData || ''}" alt="標題" style="width: 120px; height: 80px; object-fit: cover; border-radius: 6px; cursor: zoom-in; border: 1px solid #444; display: block;" ondblclick="openImagePreview('${title.originalImageData || title.imageData || ''}')" title="雙擊檢視原圖">
                </div>
                <div style="min-width: 0;">
                    <div style="color:#fff; font-weight:700; font-size: 1.05em; margin-bottom:6px; word-break: break-word;">${title.titleName || '未命名標題'}</div>
                    <small style="color: #9aa4b2; display:block; margin-bottom: 10px;">週次: ${getWeekLabel(currentWeeksCache.find(w => w.id === title.weekId))}</small>
                    <div style="display:flex; flex-wrap: wrap; gap:8px;">
                        <button class="btn btn-small" onclick="editTaskTitleMeta('${title.id}')" style="padding: 4px 10px;">編輯標題</button>
                        <button class="btn btn-small" onclick="replaceStructureImage('taskTitle', '${title.id}')" style="padding: 4px 10px;">更換圖片</button>
                        <button class="btn btn-danger btn-small" onclick="deleteTaskTitle('${title.id}')" style="padding: 4px 10px;">刪除</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

async function editTaskTitleMeta(titleId) {
    const target = currentTaskTitlesCache.find((t) => t.id === titleId);
    if (!target) {
        alert('找不到此任務標題。');
        return;
    }

    const sortWeeks = (list) => [...list].sort((a, b) => {
        const av = a?.week === 'special' ? 9999 : Number(a?.week) || 9998;
        const bv = b?.week === 'special' ? 9999 : Number(b?.week) || 9998;
        return av - bv;
    });

    const weekOptions = sortWeeks(currentWeeksCache || []);
    if (weekOptions.length === 0) {
        alert('目前沒有可選週次，請先上架週次。');
        return;
    }

    const currentName = target.titleName || '';
    const nameInput = prompt('請輸入新的任務標題名稱：', currentName);
    if (nameInput === null) return;

    const nextName = String(nameInput).trim();
    if (!nextName) {
        alert('任務標題名稱不可為空。');
        return;
    }

    const currentWeek = weekOptions.find((w) => w.id === target.weekId);
    const defaultValue = currentWeek?.week === 'special' ? 'special' : String(currentWeek?.week || '');
    const helpText = weekOptions
        .map((w) => (w.week === 'special' ? 'special=特別試煉' : String(w.week)))
        .join(', ');

    const input = prompt(`請輸入新的週次（1-52 或 special）\n可用：${helpText}`, defaultValue);
    if (input === null) return;

    const raw = String(input).trim().toLowerCase();
    let nextWeek = null;
    if (raw === 'special' || raw.includes('特別')) {
        nextWeek = weekOptions.find((w) => w.week === 'special') || null;
    } else {
        const num = Number(raw.replace(/[^0-9]/g, ''));
        if (Number.isFinite(num) && num >= 1 && num <= 52) {
            nextWeek = weekOptions.find((w) => Number(w.week) === num) || null;
        }
    }

    if (!nextWeek) {
        alert('找不到對應週次，請確認該週次已上架。');
        return;
    }

    try {
        showLoading();
        await database.ref('dmzMissionTaskTitles/' + titleId).update({
            titleName: nextName,
            weekId: nextWeek.id,
            updatedAt: Date.now()
        });
        alert('任務標題已更新！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('更新任務標題失敗:', error);
        alert('更新失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

async function deleteTaskTitle(titleId) {
    if (!confirm('確定要刪除此任務標題嗎？')) return;
    try {
        showLoading();
        await database.ref('dmzMissionTaskTitles/' + titleId).remove();
        alert('任務標題已刪除！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除失敗:', error);
        alert('刪除失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

// 【第3層】任務內容管理
function onTaskContentTaskSelected() {
    const select = document.getElementById('taskContentTaskSelect');
    selectedTaskTitleForContent = select.value || null;
    const imageInput = document.getElementById('taskContentImageFile');
    const priceInputs = document.querySelectorAll('#taskContentSinglePrice, #taskContentAddonPrice');
    const isEnabled = !!selectedTaskTitleForContent;
    
    if (imageInput) imageInput.disabled = !isEnabled;
    priceInputs.forEach(inp => inp.disabled = !isEnabled);
    
    if (!selectedTaskTitleForContent) {
        document.getElementById('taskContentImagePreview').className = 'dmz-product-preview empty-state';
        document.getElementById('taskContentImagePreview').innerHTML = '請先選擇任務標題';
    }
    refreshTaskContentList();
}

async function previewTaskContentImage(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('taskContentImagePreview');
    if (!file || !preview) return;

    try {
        const [original, thumb] = await Promise.all([readFileAsDataURL(file), compressImageFile(file)]);
        pendingTaskContentOriginalData = original;
        pendingTaskContentImageData = thumb;
        preview.className = 'dmz-product-preview';
        preview.innerHTML = `<img src="${pendingTaskContentImageData}" alt="任務內容"><span>已準備上架</span>`;
    } catch (error) {
        console.error('圖片預覽失敗:', error);
        alert('圖片處理失敗，請重新選擇。');
    }
}

async function saveTaskContent() {
    if (!selectedTaskTitleForContent) { alert('請先選擇任務標題。'); return; }
    if (!pendingTaskContentImageData) { alert('請先選擇任務內容圖片。'); return; }
    
    const singlePrice = Number(document.getElementById('taskContentSinglePrice')?.value || 0);
    const addonPrice = Number(document.getElementById('taskContentAddonPrice')?.value || 0);
    if (singlePrice <= 0 && addonPrice <= 0) { alert('單點價或加購價至少須輸入一個。'); return; }

    try {
        const newRef = database.ref('dmzMissionTaskContents').push();
        await newRef.set({
            taskTitleId: selectedTaskTitleForContent,
            imageData: pendingTaskContentImageData,
            originalImageData: pendingTaskContentOriginalData || pendingTaskContentImageData,
            singlePrice,
            addonPrice,
            createdAt: Date.now()
        });
        alert('任務內容已上架！');
        pendingTaskContentImageData = '';
        pendingTaskContentOriginalData = '';
        document.getElementById('taskContentImageFile').value = '';
        document.getElementById('taskContentSinglePrice').value = '';
        document.getElementById('taskContentAddonPrice').value = '';
        document.getElementById('taskContentImagePreview').className = 'dmz-product-preview empty-state';
        document.getElementById('taskContentImagePreview').innerHTML = '尚未選擇圖片';
        await refreshAdminDashboard();
    } catch (error) {
        console.error('上架任務內容失敗:', error);
        alert('上架失敗，請稍後再試。');
    }
}

function renderTaskContentManagement(taskContents) {
    currentTaskContentsCache = taskContents || [];
    refreshTaskContentTaskSelect();
    refreshTaskContentList();
}

function refreshTaskContentTaskSelect() {
    const select = document.getElementById('taskContentTaskSelect');
    if (!select) return;

    const getWeekLabel = (weekObj) => {
        if (!weekObj) return '未知週次';
        if (weekObj.week === 'special') return '特別試煉';
        const n = Number(weekObj.week);
        return Number.isFinite(n) && n > 0 ? `第 ${n} 週` : '未知週次';
    };
    
    const currentValue = select.value;
    select.innerHTML = '<option value="">-- 選擇任務標題 --</option>';
    
    currentTaskTitlesCache.forEach((title) => {
        const opt = document.createElement('option');
        opt.value = title.id;
        const week = currentWeeksCache.find(w => w.id === title.weekId);
        const weekLabel = getWeekLabel(week);
        const titleLabel = title.titleName || '未命名標題';
        opt.textContent = `${weekLabel} - ${titleLabel}`;
        select.appendChild(opt);
    });
    
    select.value = currentValue;
}

function refreshTaskContentList() {
    const listEl = document.getElementById('taskContentList');
    const countEl = document.getElementById('taskContentCount');
    if (!listEl || !countEl) return;

    const getTitleName = (taskTitleId) => {
        const title = currentTaskTitlesCache.find(t => t.id === taskTitleId);
        return title?.titleName || '未命名標題';
    };

    const filtered = currentTaskContentsCache.filter(c => !selectedTaskTitleForContent || c.taskTitleId === selectedTaskTitleForContent);
    countEl.textContent = `${filtered.length} 個`;

    if (filtered.length === 0) {
        listEl.innerHTML = '<div class="empty-state">無任務內容</div>';
    } else {
        listEl.innerHTML = filtered.map((content) => `
            <div style="padding: 12px; background: #171717; border: 1px solid #333; border-radius: 8px; margin-bottom: 10px; display: grid; grid-template-columns: 120px 1fr; gap: 12px; align-items: center;">
                <div>
                    <img src="${content.originalImageData || content.imageData || ''}" alt="內容" style="width: 120px; height: 80px; object-fit: cover; border-radius: 6px; cursor: zoom-in; border: 1px solid #444; display: block;" ondblclick="openImagePreview('${content.originalImageData || content.imageData || ''}')" title="雙擊檢視原圖">
                </div>
                <div style="min-width: 0;">
                    <div style="margin-bottom: 6px; color: #00d4ff; font-weight: 700; word-break: break-word;">標題：${getTitleName(content.taskTitleId)}</div>
                    <div style="margin-bottom: 10px; display:flex; gap:12px; flex-wrap: wrap;">
                        <span style="color: #aaa; font-size: 0.92em;">單點: <strong style="color: #ffd700;">NT$${content.singlePrice}</strong></span>
                        <span style="color: #aaa; font-size: 0.92em;">加購: <strong style="color: #ffd700;">NT$${content.addonPrice}</strong></span>
                    </div>
                    <div style="display:flex; flex-wrap: wrap; gap:8px;">
                        <button class="btn btn-small" onclick="editTaskContentPrices('${content.id}')" style="padding: 4px 10px;">編輯金額</button>
                        <button class="btn btn-small" onclick="replaceStructureImage('taskContent', '${content.id}')" style="padding: 4px 10px;">更換圖片</button>
                        <button class="btn btn-danger btn-small" onclick="deleteTaskContent('${content.id}')" style="padding: 4px 10px;">刪除</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

async function editTaskContentPrices(contentId) {
    const target = currentTaskContentsCache.find((c) => c.id === contentId);
    if (!target) {
        alert('找不到此任務內容。');
        return;
    }

    const singleInput = prompt('請輸入新的單點價（可為 0）：', String(Number(target.singlePrice || 0)));
    if (singleInput === null) return;
    const addonInput = prompt('請輸入新的加購價（可為 0）：', String(Number(target.addonPrice || 0)));
    if (addonInput === null) return;

    const singlePrice = Number(singleInput);
    const addonPrice = Number(addonInput);
    if (!Number.isFinite(singlePrice) || !Number.isFinite(addonPrice) || singlePrice < 0 || addonPrice < 0) {
        alert('金額必須是大於或等於 0 的數字。');
        return;
    }
    if (singlePrice <= 0 && addonPrice <= 0) {
        alert('單點價或加購價至少須大於 0。');
        return;
    }

    try {
        showLoading();
        await database.ref('dmzMissionTaskContents/' + contentId).update({
            singlePrice,
            addonPrice,
            updatedAt: Date.now()
        });
        alert('任務內容金額已更新！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('更新任務內容金額失敗:', error);
        alert('更新失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

async function replaceStructureImage(type, recordId) {
    const refMap = {
        week: 'dmzMissionWeeks',
        taskTitle: 'dmzMissionTaskTitles',
        taskContent: 'dmzMissionTaskContents'
    };

    const refPath = refMap[type];
    if (!refPath || !recordId) {
        alert('無法判斷要編輯的圖片。');
        return;
    }

    const picker = document.createElement('input');
    picker.type = 'file';
    picker.accept = 'image/*';

    picker.onchange = async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        try {
            showLoading();
            const [original, thumb] = await Promise.all([
                readFileAsDataURL(file),
                compressImageFile(file)
            ]);

            await database.ref(`${refPath}/${recordId}`).update({
                imageData: thumb,
                originalImageData: original,
                updatedAt: Date.now()
            });

            alert('圖片已更新！');
            await refreshAdminDashboard();
        } catch (error) {
            console.error('更新圖片失敗:', error);
            alert('更新圖片失敗，請稍後再試。');
        } finally {
            hideLoading();
        }
    };

    picker.click();
}

function openImagePreview(imageSrc) {
    if (!imageSrc) {
        alert('找不到圖片來源。');
        return;
    }
    let modal = document.getElementById('structureImagePreviewModal');
    let image = document.getElementById('structureImagePreviewImage');

    if (!modal || !image) {
        modal = document.createElement('div');
        modal.id = 'structureImagePreviewModal';
        modal.style.cssText = [
            'position: fixed',
            'inset: 0',
            'background: rgba(0,0,0,0.78)',
            'display: none',
            'align-items: center',
            'justify-content: center',
            'z-index: 9999',
            'padding: 24px'
        ].join(';');

        const panel = document.createElement('div');
        panel.style.cssText = [
            'position: relative',
            'max-width: min(96vw, 1100px)',
            'max-height: 90vh',
            'background: #0f1115',
            'border: 1px solid #334',
            'border-radius: 10px',
            'padding: 10px'
        ].join(';');

        image = document.createElement('img');
        image.id = 'structureImagePreviewImage';
        image.alt = '圖片預覽';
        image.style.cssText = 'display:block; max-width: 100%; max-height: calc(90vh - 20px); object-fit: contain; border-radius: 8px;';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.textContent = '×';
        closeBtn.style.cssText = [
            'position: absolute',
            'top: 12px',
            'right: 12px',
            'background: none',
            'border: none',
            'color: #888',
            'font-size: 32px',
            'cursor: pointer',
            'padding: 0',
            'width: 40px',
            'height: 40px',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'transition: color 0.2s'
        ].join(';');
        closeBtn.onmouseover = () => closeBtn.style.color = '#ccc';
        closeBtn.onmouseout = () => closeBtn.style.color = '#888';
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            image.src = '';
        };

        panel.appendChild(image);
        panel.appendChild(closeBtn);
        modal.appendChild(panel);
        modal.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                image.src = '';
            }
        };
        document.body.appendChild(modal);
    }

    image.src = imageSrc;
    modal.style.display = 'flex';
}

async function deleteTaskContent(contentId) {
    if (!confirm('確定要刪除此任務內容嗎？')) return;
    try {
        showLoading();
        await database.ref('dmzMissionTaskContents/' + contentId).remove();
        alert('任務內容已刪除！');
        await refreshAdminDashboard();
    } catch (error) {
        console.error('刪除失敗:', error);
        alert('刪除失敗，請稍後再試。');
    } finally {
        hideLoading();
    }
}

// 【舊函數保留以兼容性】
function renderMissionManagement(missions) {
    currentDmzMissionsCache = missions || [];
    const listEl = document.getElementById('missionList');
    const countEl = document.getElementById('missionCount');

    if (!listEl || !countEl) return;

    countEl.textContent = `${missions.length} 個`;

    if (missions.length === 0) {
        listEl.innerHTML = '<div class="empty-state">還沒有上架任務</div>';
        return;
    }

    listEl.innerHTML = missions
        .sort((a, b) => (Number(a.week) || 0) - (Number(b.week) || 0))
        .map((mission) => `
            <div class="admin-item" style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; padding: 12px; background: #1a1a1a; border-radius: 6px; border: 1px solid #333; margin-bottom: 8px;">
                <div style="text-align: center;">
                    <img src="${mission.imageData || ''}" alt="任務圖片" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" ondblclick="openImagePreview('${mission.imageData || ''}')" title="雙擊檢視原圖">
                </div>
                <div style="flex: 1;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #00d4ff; font-size: 1.1em;">第${mission.week}週 - ${mission.title}</strong>
                        <span style="margin-left: 12px; color: #aaa; font-size: 0.9em;">${mission.description || '無描述'}</span>
                    </div>
                    <div style="display: flex; gap: 12px; font-size: 0.9em; color: #aaa;">
                        <span>單點價: <strong style="color: #ffd700;">NT$${mission.singlePrice}</strong></span>
                        <span>加購價: <strong style="color: #ffd700;">NT$${mission.addonPrice}</strong></span>
                    </div>
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <button class="btn btn-small" onclick="editMission('${mission.id}')" style="padding: 4px 12px;">編輯</button>
                        <button class="btn btn-danger btn-small" onclick="deleteMission('${mission.id}')" style="padding: 4px 12px;">刪除</button>
                    </div>
                </div>
            </div>
        `)
        .join('');
}
