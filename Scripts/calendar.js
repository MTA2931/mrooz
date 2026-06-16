

(() => {
  // ---------- Helpers for Intl-based calendars ----------
  const pad2 = (n) => String(n).padStart(2, "0");

  function formatParts(date, calendar, locale = "en") {
    const fmt = new Intl.DateTimeFormat(`${locale}-u-ca-${calendar}`, {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    const parts = fmt.formatToParts(date);
    const map = {};
    for (const p of parts) {
      if (p.type === "year" || p.type === "month" || p.type === "day") {
        map[p.type] = Number(p.value.replace(/[^\d]/g, ""));
      }
    }
    return { year: map.year, month: map.month, day: map.day };
  }

  function getMonthName(year, month, calendar, locale = "fa") {
    const probe = new Date(2020, 0, 15);
    let d = new Date(probe);
    for (let i = 0; i < 2000; i++) {
      const p = formatParts(d, calendar, locale);
      if (p.year === year && p.month === month) {
        return new Intl.DateTimeFormat(`${locale}-u-ca-${calendar}`, {
          month: "long"
        }).format(d);
      }
      d.setDate(d.getDate() + 1);
    }
    return `${month}`;
  }

  function weekdayLabels(type) {
    if (type === "fa") return ["ش","ی","د","س","چ","پ","ج"];
    return ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"];
  }

  function jsDayToSatFirstIndex(jsDay){ // Sun=0..Sat=6
    return (jsDay + 1) % 7; // Sat => 0
  }

  function sameYMD(a, b){
    return a.year === b.year && a.month === b.month && a.day === b.day;
  }

  // ---------- Generic renderer (Intl-based) ----------
  function renderCalendar({
    gridEl, titleEl, weekdaysEl, prevEl, nextEl,
    calendar, locale, labelsType
  }) {
    if (!gridEl || !titleEl || !weekdaysEl || !prevEl || !nextEl) return;

    const today = new Date();
    let cursor = new Date(today);

    weekdaysEl.innerHTML = weekdayLabels(labelsType).map(d => `<span>${d}</span>`).join("");

    function currentParts() {
      return formatParts(cursor, calendar, locale);
    }

    function moveMonth(delta) {
      const p = currentParts();
      let d = new Date(cursor);
      d.setDate(15);
      d.setDate(d.getDate() + (delta > 0 ? 32 : -32));

      for (let i = 0; i < 40; i++) {
        const np = formatParts(d, calendar, locale);
        if ((delta > 0 && (np.year > p.year || (np.year === p.year && np.month > p.month))) ||
            (delta < 0 && (np.year < p.year || (np.year === p.year && np.month < p.month)))) {
          cursor = d;
          return;
        }
        d.setDate(d.getDate() + (delta > 0 ? 1 : -1));
      }
      cursor = d;
    }

    function render() {
      const cp = currentParts();
      const monthName = getMonthName(cp.year, cp.month, calendar, locale);
      titleEl.textContent = `${monthName} ${cp.year}`;

      let first = new Date(cursor);
      for (let i = 0; i < 35; i++) {
        const p = formatParts(first, calendar, locale);
        if (p.day === 1) break;
        first.setDate(first.getDate() - 1);
      }

      const startIndex = jsDayToSatFirstIndex(first.getDay());

      let monthDays = 0;
      let probe = new Date(first);
      for (let i = 0; i < 35; i++) {
        const p = formatParts(probe, calendar, locale);
        if (i > 0 && p.day === 1) break;
        monthDays++;
        probe.setDate(probe.getDate() + 1);
      }

      const todayP = formatParts(today, calendar, locale);
      let html = "";

      for (let i = 0; i < startIndex; i++) html += `<div class="cal-day muted"></div>`;
      for (let d = 1; d <= monthDays; d++) {
        const isToday = sameYMD({year: cp.year, month: cp.month, day: d}, todayP);
        html += `<div class="cal-day ${isToday ? "today" : ""}">${d}</div>`;
      }

      gridEl.innerHTML = html;
    }

    prevEl.addEventListener("click", () => { moveMonth(-1); render(); });
    nextEl.addEventListener("click", () => { moveMonth(1); render(); });

    render();
  }

  // =========================
  // Jalali Calendar (Shamsi) - FIXED (NO Intl)
  // =========================
  const jPrev = document.getElementById("jalaliPrev");
  const jNext = document.getElementById("jalaliNext");
  const jTitle = document.getElementById("jalaliTitle");
  const jGrid  = document.getElementById("jalaliGrid");
  const jWeek  = document.getElementById("jalaliWeekdays");

  if (jWeek) {
    jWeek.innerHTML = ["ش","ی","د","س","چ","پ","ج"].map(d=>`<span>${d}</span>`).join("");
  }

  function div(a, b) {
    const q = a / b;
    return q < 0 ? Math.ceil(q) : Math.floor(q);
  }

  function g2d(gy, gm, gd){
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
          + div(153 * ((gm + 9) % 12) + 2, 5)
          + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }
  function d2g(jdn){
    let j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div((j % 1461), 4) * 5 + 308;
    const gd = div((i % 153), 5) + 1;
    const gm = (div(i, 153) % 12) + 1;
    const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy, gm, gd };
  }
  function j2d(jy, jm, jd){
    jy += 1595;
    return -355668 + 365 * jy + div(jy, 33) * 8 + div((jy % 33) + 3, 4)
      + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  }
  function d2j(jdn){
    let jy = 33 * div(jdn - 355668, 12053);
    jdn %= 12053;
    jy += 4 * div(jdn, 1461);
    jdn %= 1461;
    if (jdn > 365){
      jy += div(jdn - 1, 365);
      jdn = (jdn - 1) % 365;
    }
    const jm = jdn < 186 ? 1 + div(jdn, 31) : 7 + div(jdn - 186, 30);
    const jd = 1 + (jdn < 186 ? (jdn % 31) : ((jdn - 186) % 30));
    return { jy: jy + 979, jm, jd };
  }
  function toJalali(gy, gm, gd){ return d2j(g2d(gy, gm, gd)); }
  function toGregorian(jy, jm, jd){ return d2g(j2d(jy, jm, jd)); }

  function isLeapJalaliYear(jy){
    const g1 = toGregorian(jy, 1, 1);
    const g2 = toGregorian(jy + 1, 1, 1);
    const d1 = new Date(g1.gy, g1.gm - 1, g1.gd);
    const d2 = new Date(g2.gy, g2.gm - 1, g2.gd);
    return Math.round((d2 - d1) / 86400000) === 366;
  }
  function jalaliMonthLength(jy, jm){
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalaliYear(jy) ? 30 : 29;
  }

  const jMonths = [
    "فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور",
    "مهر","آبان","آذر","دی","بهمن","اسفند"
  ];

  const now = new Date();
  const jNow = toJalali(now.getFullYear(), now.getMonth()+1, now.getDate());
  let viewJY = jNow.jy;
  let viewJM = jNow.jm;

  function renderJalaliCalendar(jy, jm){
    if (!jGrid || !jTitle) return;

    // فقط نام ماه فارسی + سال (بدون شماره ماه)
    jTitle.textContent = `${jMonths[jm-1]} ${jy}`;

    const monthDays = jalaliMonthLength(jy, jm);

    const gFirst = toGregorian(jy, jm, 1);
    const firstDate = new Date(gFirst.gy, gFirst.gm - 1, gFirst.gd);

    const startIndex = (firstDate.getDay() + 1) % 7; // شنبه=0

    let html = "";
    for(let i=0; i<startIndex; i++){
      html += `<div class="cal-day muted"></div>`;
    }
    for(let d=1; d<=monthDays; d++){
      const isToday = (jy === jNow.jy && jm === jNow.jm && d === jNow.jd);
      html += `<div class="cal-day ${isToday ? "today" : ""}">${d}</div>`;
    }

    jGrid.innerHTML = html;
  }

  jPrev?.addEventListener("click", () => {
    viewJM--;
    if (viewJM < 1){ viewJM = 12; viewJY--; }
    renderJalaliCalendar(viewJY, viewJM);
  });
  jNext?.addEventListener("click", () => {
    viewJM++;
    if (viewJM > 12){ viewJM = 1; viewJY++; }
    renderJalaliCalendar(viewJY, viewJM);
  });

  renderJalaliCalendar(viewJY, viewJM);

  // ---------- Init Gregorian & Hijri (Intl-based) ----------
  renderCalendar({
    gridEl: document.getElementById("gregGrid"),
    titleEl: document.getElementById("gregTitle"),
    weekdaysEl: document.getElementById("gregWeekdays"),
    prevEl: document.getElementById("gregPrev"),
    nextEl: document.getElementById("gregNext"),
    calendar: "gregory",
    locale: "en",
    labelsType: "en"
  });

  renderCalendar({
    gridEl: document.getElementById("hijriGrid"),
    titleEl: document.getElementById("hijriTitle"),
    weekdaysEl: document.getElementById("hijriWeekdays"),
    prevEl: document.getElementById("hijriPrev"),
    nextEl: document.getElementById("hijriNext"),
    calendar: "islamic",
    locale: "ar",
    labelsType: "fa"
  });
})();

