

(() => {
  const titleEl = document.getElementById("diaryTitle");
  const dateEl  = document.getElementById("diaryDate");
  const textEl  = document.getElementById("diaryText");
  const saveBtn = document.getElementById("saveDiaryBtn");

  const listEl  = document.getElementById("diaryList");
  const detailsEl = document.getElementById("diaryDetailsContent");

  // --- Delete Confirm Elements ---
  const diaryDeleteConfirm = document.getElementById("diaryDeleteConfirm");
  const cancelDiaryDelete  = document.getElementById("cancelDiaryDelete");
  const confirmDiaryDelete = document.getElementById("confirmDiaryDelete");

  const STORAGE_KEY = "diaryData";
  let diaryItems = [];
  let editId = null;
  let pendingDeleteId = null; // <-- برای حذف با تایید

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    diaryItems = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diaryItems));
  }

  function sortByDateDesc() {
    diaryItems.sort((a,b) => new Date(b.date) - new Date(a.date));
  }

  function clearForm() {
    titleEl.value = "";
    dateEl.value = "";
    textEl.value = "";
    editId = null;
    saveBtn.textContent = "ذخیره";
  }

  // --- Confirm Handlers ---
  function openDiaryDeleteConfirm(id){
    pendingDeleteId = id;
    diaryDeleteConfirm?.classList.remove("hidden");
  }

  function closeDiaryDeleteConfirm(){
    pendingDeleteId = null;
    diaryDeleteConfirm?.classList.add("hidden");
  }

  function doDeleteConfirmed(){
    if(!pendingDeleteId) return;

    diaryItems = diaryItems.filter(d => d.id !== pendingDeleteId);
    save();
    renderList();
    detailsEl.textContent = "انتخابی انجام نشده است.";
    closeDiaryDeleteConfirm();
  }

  function renderList() {
    listEl.innerHTML = "";
    if (diaryItems.length === 0) {
      listEl.innerHTML = `<div class="muted">موردی ثبت نشده است.</div>`;
      return;
    }

    diaryItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "list-item";

      div.innerHTML = `
        <div class="list-info">
          <span class="list-title">${item.title}</span>
          <span class="list-sub">${item.date}</span>
        </div>
        <div class="list-actions">
          <button class="btn-icon edit-btn">ویرایش</button>
          <button class="btn-icon delete-btn">حذف</button>
        </div>
      `;

      div.querySelector(".list-info").addEventListener("click", () => {
        detailsEl.innerHTML = `
          <strong>نام:</strong> ${item.title}<br>
          <strong>تاریخ:</strong> ${item.date}<br><br>
          <strong>متن:</strong><br>${item.text}
        `;
      });

      div.querySelector(".edit-btn").addEventListener("click", () => {
        titleEl.value = item.title;
        dateEl.value = item.date;
        textEl.value = item.text;
        editId = item.id;
        saveBtn.textContent = "ویرایش";
      });

      div.querySelector(".delete-btn").addEventListener("click", () => {
        openDiaryDeleteConfirm(item.id);
      });

      listEl.appendChild(div);
    });
  }

  saveBtn?.addEventListener("click", () => {
    const title = titleEl.value.trim();
    const date  = dateEl.value;
    const text  = textEl.value.trim();

    if (!title || !date || !text) return alert("همه فیلدها را پر کنید.");

    if (editId) {
      const idx = diaryItems.findIndex(d => d.id === editId);
      if (idx !== -1) {
        diaryItems[idx] = { ...diaryItems[idx], title, date, text };
      }
    } else {
      diaryItems.push({
        id: Date.now(),
        title,
        date,
        text
      });
    }

    sortByDateDesc();
    save();
    renderList();
    clearForm();
  });

  confirmDiaryDelete?.addEventListener("click", doDeleteConfirmed);
  cancelDiaryDelete?.addEventListener("click", closeDiaryDeleteConfirm);

  diaryDeleteConfirm?.addEventListener("click", (e)=>{
    if(e.target === diaryDeleteConfirm) closeDiaryDeleteConfirm();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && diaryDeleteConfirm && !diaryDeleteConfirm.classList.contains("hidden")){
      closeDiaryDeleteConfirm();
    }
  });

  // init
  load();
  sortByDateDesc();
  renderList();
})();

