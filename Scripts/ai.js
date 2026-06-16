

const API_KEY = "sk-uIkIdQAT0EXd1WZg42RTUxFmtvgPetp8LpPEav8Nhk9Me6fa";
const BASE_URL = "https://api.gapgpt.app/v1";
const MODEL = "grok-4";
const STORAGE_KEY = "mroooz_ai_history";

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearMemoryBtn = document.getElementById("clearMemoryBtn");

let history = loadHistory();

// ---------- Utils ----------
function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function appendMessage(role, text = "", options = {}) {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${role}`;
  msg.innerText = text;
  if (options.id) msg.dataset.id = options.id;
  if (options.typing) msg.classList.add("typing");
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function renderHistory() {
  chatMessages.innerHTML = "";
  const fragment = document.createDocumentFragment();
  history.forEach(m => {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${m.role}`;
    msg.innerText = m.content;
    fragment.appendChild(msg);
  });
  chatMessages.appendChild(fragment);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function typeText(el, text, speed = 18) {
  return new Promise(resolve => {
    el.classList.add("typing");
    el.innerText = "";
    let i = 0;
    const timer = setInterval(() => {
      el.innerText += text.charAt(i++);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        el.classList.remove("typing");
        resolve();
      }
    }, speed);
  });
}

function extractText(data) {
  return (
    data.output_text ||
    data.output?.[0]?.content?.[0]?.text ||
    data.choices?.[0]?.message?.content ||
    data.message ||
    ""
  );
}

// ---------- Init ----------
renderHistory();

// ---------- Actions ----------
async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  // UI
  appendMessage("user", text);
  chatInput.value = "";
  sendBtn.disabled = true;

  // Save user to history
  history.push({ role: "user", content: text });
  saveHistory();

  // Show loader placeholder
  const aiMsgEl = appendMessage("assistant", "", { typing: true });

  try {
    const res = await fetch(`${BASE_URL}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: history, // حافظه به صورت کامل ارسال شود
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const aiText = extractText(data) || "پاسخی دریافت نشد";

    await typeText(aiMsgEl, aiText, 15);

    history.push({ role: "assistant", content: aiText });
    saveHistory();

  } catch (err) {
    console.error(err);
    aiMsgEl.classList.remove("typing");
    aiMsgEl.innerText = "خطا در ارتباط با سرور. لطفاً دوباره تلاش کن.";
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});



const clearChatConfirm = document.getElementById("clearChatConfirm");
const cancelClearChat = document.getElementById("cancelClearChat");
const confirmClearChat = document.getElementById("confirmClearChat");

function clearChat() {
  const msgs = chatMessages.querySelectorAll(".chat-msg");
  msgs.forEach((el, i) => {
    el.classList.add("fade-out");
    el.style.animationDelay = `${i * 20}ms`;
  });
  setTimeout(() => {
    history = [];
    saveHistory();
    chatMessages.innerHTML = "";
  }, 320);
}

clearMemoryBtn.addEventListener("click", () => {
  clearChatConfirm.classList.remove("hidden");
});

cancelClearChat.addEventListener("click", () => {
  clearChatConfirm.classList.add("hidden");
});

confirmClearChat.addEventListener("click", () => {
  clearChatConfirm.classList.add("hidden");
  clearChat();
});

clearChatConfirm.addEventListener("click", (e) => {
  if (e.target === clearChatConfirm) {
    clearChatConfirm.classList.add("hidden");
  }
});



window.addEventListener('DOMContentLoaded', () => {
  (function arrangeButtons() {
    const cardHeader = document.querySelector("#ai .card-header");
    const clearMemoryBtn = document.getElementById("clearMemoryBtn");

    const modelBar = document.createElement("div");
    modelBar.classList.add("model-bar");
    modelBar.appendChild(clearMemoryBtn);

    const oldModelBtn = cardHeader.querySelector("#modelBtn");
    if(oldModelBtn){
      cardHeader.replaceChild(modelBar, oldModelBtn);
    } else {
      cardHeader.appendChild(modelBar);
    }

    clearMemoryBtn.style.background = "#121826";
    clearMemoryBtn.style.color = "#f4b4b4";
    clearMemoryBtn.style.border = "1px solid #2a1f2b";
    clearMemoryBtn.style.padding = "8px 12px";
    clearMemoryBtn.style.borderRadius = "10px";
    clearMemoryBtn.style.cursor = "pointer";
    clearMemoryBtn.style.transition = "background 0.2s ease, border 0.2s ease";
    clearMemoryBtn.style.fontSize = "14px";
    clearMemoryBtn.style.whiteSpace = "nowrap";

    clearMemoryBtn.addEventListener("mouseenter", () => {
      clearMemoryBtn.style.background = "#1a1f2e";
      clearMemoryBtn.style.borderColor = "#4a2a3a";
    });

    clearMemoryBtn.addEventListener("mouseleave", () => {
      clearMemoryBtn.style.background = "#121826";
      clearMemoryBtn.style.borderColor = "#2a1f2b";
    });
  })();
});

