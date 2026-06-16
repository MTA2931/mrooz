

(() => {
  const titleEl = document.getElementById("taskTitle");
  const createdEl = document.getElementById("taskCreated");
  const dueEl = document.getElementById("taskDue");
  const descEl = document.getElementById("taskDesc");
  const saveBtn = document.getElementById("saveTaskBtn");

  const listEl = document.getElementById("taskList");
  const detailsEl = document.getElementById("taskDetailsContent");

  const confirmBox = document.getElementById("deleteConfirm");
  const cancelDeleteBtn = document.getElementById("cancelDelete");
  const confirmDeleteBtn = document.getElementById("confirmDelete");

  const STORAGE_KEY = "tasksData";
  let tasks = [];
  let editId = null;
  let deleteId = null;

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function sortByDue() {
    tasks.sort((a,b) => new Date(a.due) - new Date(b.due)); // از قدیم به جدید
  }

  function clearForm() {
    titleEl.value = "";
    createdEl.value = "";
    dueEl.value = "";
    descEl.value = "";
    editId = null;
    saveBtn.textContent = "ثبت";
  }

  function renderList() {
    listEl.innerHTML = "";
    if (tasks.length === 0) {
      listEl.innerHTML = `<div class="muted">تسکی ثبت نشده است.</div>`;
      return;
    }

    tasks.forEach(task => {
      const div = document.createElement("div");
      div.className = "task-item";

      div.innerHTML = `
        <div class="task-info">
          <span class="task-title">${task.title}</span>
          <span class="task-date">تاریخ انجام: ${task.due}</span>
        </div>
        <div class="task-actions">
          <button class="btn-icon edit-btn">ویرایش</button>
          <button class="btn-icon delete-btn">حذف</button>
        </div>
      `;

      div.querySelector(".task-info").addEventListener("click", () => {
        detailsEl.innerHTML = `
          <strong>نام تسک:</strong> ${task.title}<br>
          <strong>تاریخ ثبت:</strong> ${task.created}<br>
          <strong>تاریخ انجام:</strong> ${task.due}<br><br>
          <strong>توضیحات:</strong><br>${task.desc || "—"}
        `;
      });

      div.querySelector(".edit-btn").addEventListener("click", () => {
        titleEl.value = task.title;
        createdEl.value = task.created;
        dueEl.value = task.due;
        descEl.value = task.desc;
        editId = task.id;
        saveBtn.textContent = "ویرایش";
      });

      div.querySelector(".delete-btn").addEventListener("click", () => {
        deleteId = task.id;
        confirmBox.classList.remove("hidden");
      });

      listEl.appendChild(div);
    });
  }

  saveBtn?.addEventListener("click", () => {
    const title = titleEl.value.trim();
    const created = createdEl.value;
    const due = dueEl.value;
    const desc = descEl.value.trim();

    if (!title || !created || !due) return alert("همه فیلدهای ضروری را پر کنید.");

    if (editId) {
      const idx = tasks.findIndex(t => t.id === editId);
      if (idx !== -1) tasks[idx] = { ...tasks[idx], title, created, due, desc };
    } else {
      tasks.push({ id: Date.now(), title, created, due, desc });
    }

    sortByDue();
    save();
    renderList();
    clearForm();
  });

  cancelDeleteBtn?.addEventListener("click", () => {
    deleteId = null;
    confirmBox.classList.add("hidden");
  });

  confirmDeleteBtn?.addEventListener("click", () => {
    if (deleteId) {
      tasks = tasks.filter(t => t.id !== deleteId);
      save();
      renderList();
      detailsEl.textContent = "انتخابی انجام نشده است.";
    }
    deleteId = null;
    confirmBox.classList.add("hidden");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !confirmBox.classList.contains("hidden")) {
      confirmBox.classList.add("hidden");
      deleteId = null;
    }
  });

  // init
  load();
  sortByDue();
  renderList();
})();

