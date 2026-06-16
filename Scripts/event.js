

(() => {
  "use strict";

  // ========= Elements =========
  const els = {
    title: document.getElementById("eventTitle"),
    date: document.getElementById("eventDate"),
    type: document.getElementById("eventType"),
    description: document.getElementById("eventDescription"),

    saveBtn: document.getElementById("saveEventBtn"),
    resetBtn: document.getElementById("resetEventBtn"),

    list: document.getElementById("eventsList"),
    count: document.getElementById("eventsCount"),

    mainDetails: document.getElementById("eventMainDetails"),
    extraDetails: document.getElementById("eventExtraDetails"),

    deleteConfirm: document.getElementById("eventDeleteConfirm"),
    confirmDeleteBtn: document.getElementById("confirmEventDelete"),
    cancelDeleteBtn: document.getElementById("cancelEventDelete"),
  };

  // ========= State =========
  const STORAGE_KEY = "events.v1";
  let events = [];
  let editingId = null;
  let selectedId = null;
  let pendingDeleteId = null;

  // ========= Helpers =========
  const hasCryptoUUID =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";

  const createId = () =>
    hasCryptoUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

  const escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  function toTime(dateStr) {
    if (!dateStr) return 0;
    const t = new Date(dateStr).getTime();
    return Number.isNaN(t) ? 0 : t;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      events = Array.isArray(parsed) ? parsed : [];
    } catch {
      events = [];
    }
  }

  function sortEvents(list) {
    return [...list].sort((a, b) => {
      const diff = toTime(b.date) - toTime(a.date); // newest first
      if (diff !== 0) return diff;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  // ========= Details =========
  function setDefaultDetails() {
    if (els.mainDetails) {
      els.mainDetails.innerHTML = `
        <div class="detail-body">از لیست مناسبت‌ها یک مورد را انتخاب کنید.</div>
      `;
    }
    if (els.extraDetails) {
      els.extraDetails.innerHTML = `
        <div class="detail-body">توضیحات تکمیلی پس از انتخاب نمایش داده می‌شود.</div>
      `;
    }
  }

  function renderDetailsById(id) {
    const item = events.find((e) => e.id === id);
    if (!item) {
      setDefaultDetails();
      return;
    }

    if (els.mainDetails) {
      els.mainDetails.innerHTML = `
        <div class="detail-body">
          <div><strong>عنوان:</strong> ${escapeHtml(item.title || "—")}</div>
          <div><strong>تاریخ:</strong> ${escapeHtml(formatDate(item.date))}</div>
          <div><strong>نوع:</strong> ${escapeHtml(item.type || "—")}</div>
        </div>
      `;
    }

    if (els.extraDetails) {
      els.extraDetails.innerHTML = `
        <div class="detail-body">${escapeHtml(item.description || "توضیحی ثبت نشده است.")}</div>
      `;
    }
  }

  // ========= Form =========
  function resetForm() {
    editingId = null;
    els.title && (els.title.value = "");
    els.date && (els.date.value = "");
    els.type && (els.type.value = "");
    els.description && (els.description.value = "");

    if (els.saveBtn) {
      els.saveBtn.textContent = "ثبت مناسبت";
      els.saveBtn.dataset.mode = "create";
    }
  }

  function fillForm(item) {
    if (!item) return;
    editingId = item.id;

    if (els.title) els.title.value = item.title || "";
    if (els.date) els.date.value = item.date || "";
    if (els.type) els.type.value = item.type || "";
    if (els.description) els.description.value = item.description || "";

    if (els.saveBtn) {
      els.saveBtn.textContent = "ذخیره تغییرات";
      els.saveBtn.dataset.mode = "edit";
    }
  }

  function validateForm() {
    const title = els.title?.value.trim() || "";
    const date = els.date?.value || "";
    if (!title) {
      alert("لطفاً عنوان مناسبت را وارد کنید.");
      els.title?.focus();
      return null;
    }
    if (!date) {
      alert("لطفاً تاریخ مناسبت را وارد کنید.");
      els.date?.focus();
      return null;
    }
    return {
      title,
      date,
      type: els.type?.value.trim() || "",
      description: els.description?.value.trim() || "",
    };
  }

  function handleSave() {
    const data = validateForm();
    if (!data) return;

    if (editingId) {
      const idx = events.findIndex((e) => e.id === editingId);
      if (idx !== -1) {
        events[idx] = {
          ...events[idx],
          ...data,
          updatedAt: Date.now(),
        };
        selectedId = events[idx].id;
      }
    } else {
      const item = {
        id: createId(),
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      events.push(item);
      selectedId = item.id;
    }

    saveToStorage();
    renderList();
    renderDetailsById(selectedId);
    resetForm();
  }

  // ========= Delete Confirm =========
  function openDeleteConfirm(id) {
    pendingDeleteId = id;
    els.deleteConfirm?.classList.remove("hidden");
  }

  function closeDeleteConfirm() {
    pendingDeleteId = null;
    els.deleteConfirm?.classList.add("hidden");
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;

    events = events.filter((e) => e.id !== pendingDeleteId);

    if (selectedId === pendingDeleteId) {
      selectedId = null;
      setDefaultDetails();
    }
    if (editingId === pendingDeleteId) {
      resetForm();
    }

    saveToStorage();
    renderList();
    closeDeleteConfirm();
  }

  // ========= List =========
  function renderList() {
    if (!els.list) return;

    const sorted = sortEvents(events);

    if (els.count) els.count.textContent = String(events.length);

    if (!sorted.length) {
      els.list.innerHTML = `<li class="empty">مناسبتی ثبت نشده است.</li>`;
      return;
    }

    els.list.innerHTML = sorted
      .map((item) => {
        const isActive = selectedId === item.id ? "active" : "";
        return `
          <li class="${isActive}" data-id="${item.id}">
            <div class="event-info">
              <div class="event-title">${escapeHtml(item.title)}</div>
              <div class="event-sub">${escapeHtml(formatDate(item.date))}</div>
            </div>
            <div class="event-actions">
              <button type="button" class="btn ghost btn-edit" data-action="edit" data-id="${item.id}">ویرایش</button>
              <button type="button" class="btn primary btn-delete" data-action="delete" data-id="${item.id}">حذف</button>
            </div>
          </li>
        `;
      })
      .join("");
  }

  // ========= Events =========
  function onListClick(e) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const actionBtn = target.closest("button[data-action]");
    if (actionBtn) {
      const id = actionBtn.getAttribute("data-id");
      const action = actionBtn.getAttribute("data-action");
      if (!id) return;

      if (action === "edit") {
        const item = events.find((x) => x.id === id);
        if (!item) return;
        fillForm(item);
        selectedId = id;
        renderList();
        renderDetailsById(id);
      } else if (action === "delete") {
        openDeleteConfirm(id);
      }
      return;
    }

    const li = target.closest("li[data-id]");
    if (!li) return;
    const id = li.getAttribute("data-id");
    if (!id) return;

    selectedId = id;
    renderList();
    renderDetailsById(id);
  }

  function bindEvents() {
    els.saveBtn?.addEventListener("click", handleSave);
    els.resetBtn?.addEventListener("click", resetForm);

    els.list?.addEventListener("click", onListClick);

    els.cancelDeleteBtn?.addEventListener("click", closeDeleteConfirm);
    els.confirmDeleteBtn?.addEventListener("click", confirmDelete);

    // بستن مودال با کلیک بیرون محتوا
    els.deleteConfirm?.addEventListener("click", (e) => {
      if (e.target === els.deleteConfirm) closeDeleteConfirm();
    });

    // ESC برای بستن تایید حذف
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.deleteConfirm && !els.deleteConfirm.classList.contains("hidden")) {
        closeDeleteConfirm();
      }
    });
  }

  // ========= Init =========
  function init() {
    loadFromStorage();
    bindEvents();
    renderList();
    setDefaultDetails();

    // انتخاب اولین آیتم اگر وجود دارد
    const sorted = sortEvents(events);
    if (sorted.length) {
      selectedId = sorted[0].id;
      renderList();
      renderDetailsById(selectedId);
    }
  }

  init();
})();

