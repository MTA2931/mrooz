

const goalTitle = document.getElementById("goalTitle");
const stageInput = document.getElementById("stageInput");
const addStageBtn = document.getElementById("addStageBtn");
const stagesList = document.getElementById("stagesList");
const saveGoalBtn = document.getElementById("saveGoalBtn");

const goalsList = document.getElementById("goalsList");
const goalFlow = document.getElementById("goalFlow");
const goalSummary = document.getElementById("goalSummary");

const goalProgressText = document.getElementById("goalProgressText");
const goalProgressFill = document.getElementById("goalProgressFill");

const confirmModal = document.getElementById("goalDeleteConfirm");
const cancelDelete = document.getElementById("cancelGoalDelete");
const confirmDelete = document.getElementById("confirmGoalDelete");

let stages = [];
let goals = normalizeGoals(JSON.parse(localStorage.getItem("goals")) || []);
let deleteId = null;
let selectedGoalId = null;

function saveLocal() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function normalizeGoals(list) {
  return list.map(g => {
    // تبدیل مراحل قدیمی (string) به object
    const normalizedStages = (g.stages || []).map(s =>
      typeof s === "string" ? { text: s, done: false } : s
    );

    // اگه layout کم بود یا نبود، دوباره بساز
    const layout = (g.layout && g.layout.length === normalizedStages.length)
      ? g.layout
      : normalizedStages.map(() => ({
          y: (Math.random() * 16 - 8),
          r: (Math.random() * 6 - 3)
        }));

    return { ...g, stages: normalizedStages, layout };
  });
}

function isGoalComplete(g) {
  return g.stages.length > 0 && g.stages.every(s => s.done);
}

function renderStages() {
  stagesList.innerHTML = "";
  stages.forEach((s, idx) => {
    const li = document.createElement("li");
    li.textContent = s.text;

    const del = document.createElement("button");
    del.textContent = "×";
    del.onclick = () => {
      stages.splice(idx, 1);
      renderStages();
    };

    li.appendChild(del);
    stagesList.appendChild(li);
  });
}

addStageBtn.onclick = () => {
  const val = stageInput.value.trim();
  if (!val) return;
  stages.push({ text: val, done: false });
  stageInput.value = "";
  renderStages();
};

saveGoalBtn.onclick = () => {
  const title = goalTitle.value.trim();
  if (!title || stages.length === 0) return;

  const newGoal = {
    id: Date.now(),
    title,
    stages: [...stages],
    created: new Date().toLocaleDateString("fa-IR"),
    layout: stages.map(() => ({
      y: (Math.random() * 16 - 8),
      r: (Math.random() * 6 - 3)
    }))
  };

  goals.push(newGoal);
  saveLocal();

  stages = [];
  goalTitle.value = "";
  renderStages();
  renderGoalsList();
  showGoal(newGoal.id);
};

function renderGoalsList() {
  goalsList.innerHTML = "";

  goals.forEach(g => {
    const li = document.createElement("li");

    const titleWrap = document.createElement("span");
    titleWrap.className = "goal-title";
    titleWrap.textContent = g.title;

    if (isGoalComplete(g)) {
      const dot = document.createElement("span");
      dot.className = "goal-complete-dot";
      titleWrap.appendChild(dot);
    }

    const actions = document.createElement("div");
    actions.className = "goal-actions";

    const edit = document.createElement("button");
    edit.textContent = "ویرایش";
    edit.onclick = (e) => {
      e.stopPropagation();
      goalTitle.value = g.title;
      stages = g.stages.map(s => ({ text: s.text, done: s.done }));
      renderStages();

      goals = goals.filter(x => x.id !== g.id);
      saveLocal();
      renderGoalsList();
    };

    const del = document.createElement("button");
    del.textContent = "حذف";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteId = g.id;
      confirmModal.classList.remove("hidden");
    };

    actions.append(edit, del);
    li.appendChild(titleWrap);
    li.appendChild(actions);

    li.onclick = () => showGoal(g.id);

    goalsList.appendChild(li);
  });
}

function renderGoalProgress(g) {
  const doneCount = g.stages.filter(s => s.done).length;
  const total = g.stages.length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  goalProgressText.textContent = `پیشرفت: ${doneCount}/${total} (${percent}%)`;
  goalProgressFill.style.width = `${percent}%`;
}

function showGoal(id) {
  const g = goals.find(x => x.id === id);
  if (!g) return;
  selectedGoalId = id;

  // اگر مراحل تغییر کرده بودن، layout هماهنگ کن
  if (!g.layout || g.layout.length !== g.stages.length) {
    g.layout = g.stages.map(() => ({
      y: (Math.random() * 16 - 8),
      r: (Math.random() * 6 - 3)
    }));
  }

  goalFlow.innerHTML = "";
  g.stages.forEach((s, i) => {
    const node = document.createElement("div");
    node.className = "goal-node" + (s.done ? " done" : "");
    node.style.transform = `translateY(${g.layout[i].y}px) rotate(${g.layout[i].r}deg)`;

    const text = document.createElement("span");
    text.textContent = s.text;

    const dot = document.createElement("span");
    dot.className = "stage-dot";
    dot.onclick = (e) => {
      e.stopPropagation();
      s.done = !s.done;
      saveLocal();
      renderGoalsList();
      showGoal(g.id);
    };

    node.append(text, dot);
    goalFlow.appendChild(node);

    if (i < g.stages.length - 1) {
      const line = document.createElement("div");
      line.className = "goal-line";
      line.style.transform = `translateY(${g.layout[i].y / 2}px)`;
      goalFlow.appendChild(line);
    }
  });

  renderGoalProgress(g);

  goalSummary.innerHTML = `
    <p>عنوان: ${g.title}</p>
    <p>تعداد مراحل: ${g.stages.length}</p>
    <p>تاریخ ایجاد: ${g.created}</p>
  `;
}

// Delete Modal
cancelDelete.onclick = () => {
  confirmModal.classList.add("hidden");
  deleteId = null;
};

confirmDelete.onclick = () => {
  goals = goals.filter(g => g.id !== deleteId);
  saveLocal();
  renderGoalsList();

  if (selectedGoalId === deleteId) {
    goalFlow.innerHTML = "";
    goalSummary.innerHTML = `
      <p>عنوان: —</p>
      <p>تعداد مراحل: —</p>
      <p>تاریخ ایجاد: —</p>
    `;
    goalProgressText.textContent = "پیشرفت: —";
    goalProgressFill.style.width = "0%";
  }

  confirmModal.classList.add("hidden");
};

// init
renderStages();
renderGoalsList();
if (goals[0]) showGoal(goals[0].id);

