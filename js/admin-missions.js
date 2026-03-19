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

    // 更新按鈕文字
    const submitBtn = document.getElementById('missionUploadSubmitBtn');
    if (submitBtn) submitBtn.textContent = '📋 更新任務';

    // 滾動到表單
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
                    <img src="${mission.imageData || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}" alt="任務圖片" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; cursor: pointer;" ondblclick="openMissionUploadPreviewModal('view', '${mission.imageData}')">
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

function openMissionUploadPreviewModal(mode, imageData) {
    // 可選：實現一個模態窗口來查看完整圖片
    // 目前簡化實現，直接在新標籤頁打開圖片
    if (imageData) {
        const img = new Image();
        img.src = imageData;
        const w = window.open();
        w.document.write(img.outerHTML);
    }
}
