

(() => {
  // ====== تنظیمات عناصر ======
  const titleInput = document.getElementById("expenseTitle");
  const amountInput = document.getElementById("expenseAmount");
  const dateInput = document.getElementById("expenseDate");
  const descInput = document.getElementById("expenseDesc");
  const saveBtn = document.getElementById("saveExpenseBtn");

  const listEl = document.getElementById("expenseList");
  const detailsEl = document.getElementById("expenseDetailsContent");

  // فریم تایید حذف
  const confirmBox = document.getElementById("expenseDeleteConfirm");
  const cancelDeleteBtn = document.getElementById("cancelExpenseDelete");
  const confirmDeleteBtn = document.getElementById("confirmExpenseDelete");

  const STORAGE_KEY = "expensesData";
  let expenses = [];
  let editId = null;
  let deleteId = null;

  // ====== ابزارها ======
  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    expenses = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }

  function sortByDateDesc() {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date)); // جدید به قدیم
  }

  function clearForm() {
    titleInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
    descInput.value = "";
    editId = null;
    saveBtn.textContent = "ثبت";
  }

  function showDetails(exp) {
    detailsEl.innerHTML = `
      <strong>نام:</strong> ${exp.title}<br>
      <strong>مقدار:</strong> ${exp.amount} تومان<br>
      <strong>تاریخ:</strong> ${exp.date}<br><br>
      <strong>توضیحات:</strong><br>${exp.desc || "—"}
    `;
  }

  // ====== رندر لیست ======
  function render() {
    listEl.innerHTML = "";

    if (expenses.length === 0) {
      listEl.innerHTML = `<div class="muted">هزینه‌ای ثبت نشده است.</div>`;
      return;
    }

    expenses.forEach(exp => {
      const item = document.createElement("div");
      item.className = "expense-item";

      item.innerHTML = `
        <div class="expense-info">
          <span class="expense-title">${exp.title}</span>
          <span class="expense-amount">${exp.amount} تومان</span>
        </div>
        <div class="expense-actions">
          <button class="btn-icon edit-exp">ویرایش</button>
          <button class="btn-icon del-exp">حذف</button>
        </div>
      `;

      item.querySelector(".expense-info").addEventListener("click", () => {
        showDetails(exp);
      });

      item.querySelector(".edit-exp").addEventListener("click", () => {
        titleInput.value = exp.title;
        amountInput.value = exp.amount;
        dateInput.value = exp.date;
        descInput.value = exp.desc;
        editId = exp.id;
        saveBtn.textContent = "ویرایش";
      });

      item.querySelector(".del-exp").addEventListener("click", () => {
        deleteId = exp.id;
        confirmBox.classList.remove("hidden");
      });

      listEl.appendChild(item);
    });
  }

  // ====== ثبت / ویرایش ======
  saveBtn?.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const amount = amountInput.value.trim();
    const date = dateInput.value;
    const desc = descInput.value.trim();

    if (!title || !amount || !date) {
      alert("نام، مبلغ و تاریخ الزامی است.");
      return;
    }

    if (editId) {
      const idx = expenses.findIndex(e => e.id === editId);
      if (idx !== -1) expenses[idx] = { ...expenses[idx], title, amount, date, desc };
      editId = null;
      saveBtn.textContent = "ثبت";
      document.dispatchEvent(new Event("expensesUpdated"));
    } else {
      expenses.push({
        id: Date.now(),
        title,
        amount,
        date,
        desc
      });
    }
    
    document.dispatchEvent(new Event("expensesUpdated"));

    sortByDateDesc();
    save();
    render();
    clearForm();
  });

  // ====== تایید حذف ======
  cancelDeleteBtn?.addEventListener("click", () => {
    deleteId = null;
    confirmBox.classList.add("hidden");
  });

  confirmDeleteBtn?.addEventListener("click", () => {
    if (deleteId) {
      expenses = expenses.filter(e => e.id !== deleteId);
      save();
      render();
      detailsEl.textContent = "انتخابی انجام نشده است.";
    }
    deleteId = null;
    confirmBox.classList.add("hidden");
  });

  // ====== بستن با ESC ======
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !confirmBox.classList.contains("hidden")) {
      confirmBox.classList.add("hidden");
      deleteId = null;
    }
  });

  // ====== Init ======
  load();
  sortByDateDesc();
  render();
})();

