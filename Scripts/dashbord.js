

// ----------------------
// Tabs (Global Navigation)
// ----------------------
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add("active");
  });
});

// ======================
// Profile (LocalStorage)
// ======================
const PROFILE_KEY = "profileData";

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();

  const saveBtn = document.getElementById("saveProfileBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveProfile);
});

function loadProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  const data = raw ? JSON.parse(raw) : {};

  // پر کردن فرم
  const fields = ["firstName", "lastName", "birthDate", "phone", "username"];
  fields.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = data[id] || "";
  });

  // پر کردن نمایش
  const viewMap = {
    vFirstName: "firstName",
    vLastName: "lastName",
    vBirthDate: "birthDate",
    vPhone: "phone",
    vUsername: "username",
  };

  Object.entries(viewMap).forEach(([viewId, key]) => {
    const el = document.getElementById(viewId);
    if (el) el.textContent = data[key] || "—";
  });

  console.log("Profile loaded from localStorage:", data);
}

function saveProfile() {
  const profileData = {
    firstName: document.getElementById("firstName")?.value || "",
    lastName: document.getElementById("lastName")?.value || "",
    birthDate: document.getElementById("birthDate")?.value || "",
    phone: document.getElementById("phone")?.value || "",
    username: document.getElementById("username")?.value || "",
  };

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));

  alert("پروفایل با موفقیت ذخیره شد");
  loadProfile();
}








// ----------------------
// Latest Expenses in Dashboard (read-only)
// ----------------------
const latestExpensesListEl = document.getElementById("latestExpensesList");
const expensesStorageKey = "expensesData";

function formatAmountFa(value){
  return Number(value || 0).toLocaleString("fa-IR") + " تومان";
}
function esc(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderLatestExpensesBox(){
  if(!latestExpensesListEl) return;

  const raw = JSON.parse(localStorage.getItem(expensesStorageKey));
  const expenses = Array.isArray(raw) ? raw : [];

  expenses.sort((a,b) => new Date(b.date) - new Date(a.date)); // جدیدترین بالا
  const latest = expenses.slice(0, 4);

  if(latest.length === 0){
    latestExpensesListEl.innerHTML = `<p style="color:var(--muted)">هنوز هزینه‌ای ثبت نشده.</p>`;
    return;
  }

  latestExpensesListEl.innerHTML = latest.map(item => `
    <div class="latest-expenses-item">
      <span class="name">${esc(item.name)}</span>
      <span class="amount">${formatAmountFa(item.amount)}</span>
    </div>
  `).join("");
}

// بار اول
renderLatestExpensesBox();

// وقتی تب هزینه‌ها چیزی ذخیره کرد و به داشبورد برگشتی:
window.addEventListener("focus", renderLatestExpensesBox);

// برای تغییرات بین تب/پنجره‌های مرورگر:
window.addEventListener("storage", (e) => {
  if(e.key === expensesStorageKey) renderLatestExpensesBox();
});














const todayEventsList = document.getElementById("todayEventsList");
const todayEventsCount = document.getElementById("todayEventsCount");

function isToday(dateStr){
  if(!dateStr) return false;
  const d = new Date(dateStr);
  const t = new Date();
  return d.getFullYear() === t.getFullYear() &&
         d.getMonth() === t.getMonth() &&
         d.getDate() === t.getDate();
}

function renderTodayEvents(){
  if(!todayEventsList) return;

  const todayItems = events.filter(e => isToday(e.date));
  if (todayEventsCount) todayEventsCount.textContent = String(todayItems.length);

  if(!todayItems.length){
    todayEventsList.innerHTML = `<li class="empty">امروز مناسبت ثبت نشده است.</li>`;
    return;
  }

  todayEventsList.innerHTML = todayItems.map(item => `
    <li>
      <strong>${escapeHtml(item.title)}</strong>
      <span style="opacity:.7;font-size:12px;">${escapeHtml(formatDate(item.date))}</span>
    </li>
  `).join("");
}













// ----------------- Chart Utils -----------------
function getCurrentMonthBuckets(expenses){
  const now = new Date();
  const m = now.getMonth(); // 0-11
  const y = now.getFullYear();

  const buckets = [0,0,0,0,0,0,0]; // 1-5,6-10,11-15,16-20,21-25,26-30,31
  expenses.forEach(e=>{
    if(!e.date || !e.amount) return;
    const d = new Date(e.date);
    if(d.getMonth()===m && d.getFullYear()===y){
      const day = d.getDate();
      const idx = Math.min(Math.floor((day-1)/5), 6);
      buckets[idx] += Number(e.amount||0);
    }
  });
  return buckets;
}

function drawExpenseChart(){
  const canvas = document.getElementById("expenseChart");
  if(!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 600;
  const cssH = canvas.clientHeight || 240;
  canvas.width  = cssW * dpr;
  canvas.height = cssH * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  ctx.clearRect(0,0,cssW,cssH);

  const expenses = JSON.parse(localStorage.getItem("expensesData")||"[]");

  const data = getCurrentMonthBuckets(expenses);
  const labels = ["1-5","6-10","11-15","16-20","21-25","26-30","31"];

  const w = cssW;
  const h = cssH;
  const padding = 35;

  const maxVal = Math.max(...data, 25000);
  const step = 25000;
  const yMax = Math.ceil(maxVal/step)*step;

  // محور Y
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.fillStyle = "#aab4d6";
  ctx.font = "12px Vazirmatn, sans-serif";
  for(let v=0; v<=yMax; v+=step){
    const y = h - padding - (v/yMax)*(h-2*padding);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(w-padding, y);
    ctx.stroke();
    ctx.fillText(v.toLocaleString("fa-IR"), 2, y+4);
  }

  const gap = (w - 2*padding) / (data.length-1);
  const points = data.map((val,i)=>{
    const x = padding + i*gap;
    const y = h - padding - (val/yMax)*(h-2*padding);
    return {x,y,val};
  });

  const grad = ctx.createLinearGradient(0,0,w,0);
  grad.addColorStop(0, "#4f9cff");
  grad.addColorStop(0.5, "#8b5cf6");
  grad.addColorStop(1, "#22c55e");

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = grad;
  ctx.shadowColor = "rgba(79,156,255,0.35)";
  ctx.shadowBlur = 10;
  points.forEach((p,i)=>{
    if(i===0) ctx.moveTo(p.x,p.y);
    else ctx.lineTo(p.x,p.y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;

  points.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,4,0,Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.fillStyle = "#cbd5ff";
  labels.forEach((lab,i)=>{
    const x = padding + i*gap - 6;
    ctx.fillText(lab, x, h-10);
  });
}


drawExpenseChart();
document.addEventListener("expensesUpdated", drawExpenseChart);

