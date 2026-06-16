

// ============================================================
// Language Switcher Module
// Supports: Persian (fa) [default], English (en), German (de)
// Includes circle button with ripple animation
// ============================================================

(function() {
  // ---------- Translation Dictionary ----------
  const translations = {
    fa: {
      // App / Sidebar / General
      "brand_title": "امروز",
      "brand_sub": "روز خودت رو مدیریت کن!",
      "tab_dashboard": "داشبورد",
      "tab_ai": "هوش مصنوعی",
      "tab_calendar": "تقویم",
      "tab_expenses": "هزینه‌ها",
      "tab_tasks": "تسک",
      "tab_goals": "اهداف",
      "tab_events": "مناسبت‌ها",
      "tab_diary": "دفترچه خاطرات",
      "tab_about": "درباره ما",
      
      // Dashboard
      "profile_title": "مشخصات",
      "profile_edit": "ویرایش",
      "profile_save": "ذخیره",
      "first_name": "نام",
      "last_name": "نام خانوادگی",
      "birth_date": "تاریخ تولد",
      "phone": "شماره تلفن",
      "username": "نام کاربری",
      "first_name_ph": "مثلا علی",
      "last_name_ph": "مثلا رضایی",
      "phone_ph": "09xxxxxxxxx",
      "username_ph": "username",
      "view_first_name": "نام:",
      "view_last_name": "نام خانوادگی:",
      "view_birth": "تاریخ تولد:",
      "view_phone": "شماره تلفن:",
      "view_email": "ایمیل:",
      "view_username": "نام کاربری:",
      "email_default": "—",
      
      "latest_expenses": "آخرین هزینه‌ها",
      "monthly_chart": "نمودار هزینه‌های ماه جاری",
      "today_events": "مناسبت‌های امروز",
      "no_events_today": "امروز مناسبت ثبت نشده است",
      
      // Calendar
      "calendar_persian": "تقویم شمسی",
      "calendar_gregorian": "تقویم میلادی",
      "calendar_hijri": "تقویم قمری",
      "coming_soon": "به زودی ...",
      
      // Expenses
      "new_expense": "هزینه جدید",
      "expense_name": "نام هزینه",
      "expense_amount": "مقدار هزینه (تومان)",
      "expense_date": "تاریخ",
      "expense_desc": "توضیحات بیشتر",
      "save_expense": "ثبت هزینه",
      "expense_list": "لیست هزینه‌ها",
      "expense_details": "جزئیات هزینه",
      "select_expense_hint": "یک هزینه از لیست انتخاب کنید.",
      "delete_confirm_title": "حذف هزینه",
      "delete_confirm_msg": "مطمئنی میخوای این هزینه حذف بشه؟",
      "cancel": "انصراف",
      "delete": "حذف",
      
      // Tasks
      "tasks_title": "تسک‌ها",
      "new_task": "تسک جدید",
      "task_name": "نام تسک",
      "task_created_date": "تاریخ ثبت",
      "task_due_date": "تاریخ انجام",
      "task_description": "توضیحات",
      "save_task": "ثبت",
      "task_list": "لیست تسک‌ها",
      "task_details": "جزئیات تسک",
      "no_task_selected": "انتخابی انجام نشده است.",
      "delete_task_title": "حذف تسک",
      "delete_task_msg": "مطمئنی میخوای این تسک حذف بشه؟",
      
      // AI
      "ai_title": "هوش مصنوعی",
      "clear_conversation": "پاک کردن گفتوگو",
      "ai_placeholder": "پیام رو بنویس...",
      "send": "ارسال",
      "clear_chat_title": "حذف گفتگو",
      "clear_chat_msg": "مطمئنی می‌خوای کل گفتگو پاک بشه؟",
      
      // Events
      "events_title": "مدیریت مناسبت‌ها",
      "new_event": "ثبت مناسبت جدید",
      "event_title": "عنوان مناسبت",
      "event_date": "تاریخ مناسبت",
      "event_type": "نوع مناسبت",
      "event_desc": "توضیحات بیشتر",
      "cancel_event": "انصراف",
      "save_event": "ثبت مناسبت",
      "events_list": "لیست مناسبت‌ها",
      "no_events": "مناسبتی ثبت نشده است",
      "event_details": "جزئیات مناسبت",
      "event_extra_details": "توضیحات بیشتر",
      "select_event_hint": "از لیست مناسبت‌ها یک مورد را انتخاب کنید.",
      "delete_event_title": "حذف مناسبت",
      "delete_event_msg": "مطمئنی می‌خوای این مناسبت حذف بشه؟",
      
      // Diary
      "diary_title": "دفترچه خاطرات",
      "new_diary_entry": "متن جدید",
      "diary_name": "نام متن",
      "diary_date": "تاریخ",
      "diary_text": "متن",
      "save_diary": "ذخیره",
      "diary_list": "لیست متن‌ها",
      "diary_details": "جزئیات",
      "no_diary_selected": "انتخابی انجام نشده است.",
      "delete_diary_title": "حذف یادداشت",
      "delete_diary_msg": "مطمئنی میخوای این یادداشت حذف بشه؟",
      
      // Goals
      "goals_title": "ایجاد هدف جدید",
      "goal_title_label": "عنوان هدف",
      "goal_stages": "مراحل هدف",
      "add_stage": "افزودن مرحله",
      "save_goal": "ذخیره هدف",
      "goals_list": "لیست اهداف",
      "display_stages": "نمایش مراحل هدف",
      "progress_text": "پیشرفت:",
      "goal_summary_title": "عنوان:",
      "goal_summary_stages": "تعداد مراحل:",
      "goal_summary_date": "تاریخ ایجاد:",
      "delete_goal_title": "حذف هدف",
      "delete_goal_msg": "مطمئنی می‌خوای این هدف حذف بشه؟",
      
      // About
      "about_title": "درباره امروز",
      "about_text": "«امروز» یک پلتفرم ساده و هوشمند برای مدیریت روزانه شماست؛ از هزینه‌ها تا تسک‌ها و خاطرات، همه‌چیز در یک جا. شما با استفاده از پلتفرم ما میتوانید در لحظه برنامه زندگی خودتون را آپدیت کنید. هزینه هزینه‌ها، تسک‌ها، خاطرات و ... را در «امروز» ثبت کنید تا به راحتی نظم زندکی خود را رعایت و برقرار کنید. سازنده این سایت امروز «شرکت ام تی ای» است تمام حقوق این سایت مطعلق به «امروز» و «شرکت ام تی ای» است.",
      "badge_simple": "ساده",
      "badge_fast": "سریع",
      "badge_low_data": "کمترین اینترنت",
      "our_goal": "هدف ما",
      "goal_desc": "کمک به شما برای نظم دادن به زندگی روزمره با رابط کاربری زیبا، سریع و قابل فهم. با کمترین مصرف اینترنت ما به شما برای زندگی و نظم کمک میکنیم",
      "features": "امکانات کلیدی",
      "feature_1": "مدیریت هزینه‌ها و نمودارها",
      "feature_2": "مدیریت تسک‌ها و پیگیری زمان",
      "feature_3": "ثبت مناسبت‌ها و یادآوری‌ها",
      "feature_4": "دفترچه خاطرات شخصی",
      "contact": "ارتباط با ما",
      "email": "ایمیل:",
      "telegram": "تلگرام:",
      "phone_contact": "تماس:",
      "support": "حمایت:",
      "help_title": "راهنما",
      "help_desc": "راهنمای سریع برای استفاده بهتر از امکانات سایت.",
      "help_1": "از منوی سمت چپ بین بخش‌ها جابه‌جا شوید.",
      "help_2": "در «تسک‌ها» کارهای روزانه را ثبت و تیک بزنید.",
      "help_3": "در «هزینه‌ها» خرج‌ها را ثبت کنید.",
      "help_4": "برای سوالات روزمره از هوش مصنوعی استفاده کنید.",
      "faq_title": "سوالات متداول",
      "faq_desc": "پاسخ سوال‌های رایج کاربران",
      "faq_q1": "اطلاعات من کجا ذخیره می‌شود؟",
      "faq_a1": "در حال حاضر اطلاعات داخل مرورگر ذخیره می‌شود.",
      "faq_q2": "یعنی چه کمترین مصرف اینترنت؟",
      "faq_a2": "بدلیل نداشتن دیتابیس و ذخیره سازی اطلاعات در مرورگر، شما فقط برای ورود به سایت به اینترنت نیازمند هستید.",
      "faq_q3": "می‌توانم از چند دستگاه استفاده کنم؟",
      "faq_a3": "خیر. این سایت را فقط در یک دستگاه میشه استفاده کرد. چون همه اطلاعات درون مرورگر ذخیره میشه.",
      "faq_q4": "امروز از چه هوش مصنوعی استفاده میکند؟",
      "faq_a4": "از هوش مصوعی \"گروک\". از آخرین نسخه Grok-4 در قسمت هوش مصنوعی استفاده میشود. این هوش مصنوعی توسط xAi ساخته شده است.",
      "copyright": "© Copyright | All rights reserved Mroooz"
    },
    en: {
      "brand_title": "Emrooz",
      "brand_sub": "Manage your day!",
      "tab_dashboard": "Dashboard",
      "tab_ai": "AI Assistant",
      "tab_calendar": "Calendar",
      "tab_expenses": "Expenses",
      "tab_tasks": "Tasks",
      "tab_goals": "Goals",
      "tab_events": "Events",
      "tab_diary": "Diary",
      "tab_about": "About",
      
      "profile_title": "Profile",
      "profile_edit": "Edit",
      "profile_save": "Save",
      "first_name": "First Name",
      "last_name": "Last Name",
      "birth_date": "Birth Date",
      "phone": "Phone Number",
      "username": "Username",
      "first_name_ph": "e.g. Ali",
      "last_name_ph": "e.g. Rezaei",
      "phone_ph": "09xxxxxxxxx",
      "username_ph": "username",
      "view_first_name": "Name:",
      "view_last_name": "Last Name:",
      "view_birth": "Birth Date:",
      "view_phone": "Phone:",
      "view_email": "Email:",
      "view_username": "Username:",
      "email_default": "—",
      
      "latest_expenses": "Latest Expenses",
      "monthly_chart": "Current Month Expenses Chart",
      "today_events": "Today's Events",
      "no_events_today": "No events registered for today",
      
      "calendar_persian": "Persian Calendar",
      "calendar_gregorian": "Gregorian Calendar",
      "calendar_hijri": "Hijri Calendar",
      "coming_soon": "Coming Soon...",
      
      "new_expense": "New Expense",
      "expense_name": "Expense Name",
      "expense_amount": "Amount (Toman)",
      "expense_date": "Date",
      "expense_desc": "Description",
      "save_expense": "Save Expense",
      "expense_list": "Expense List",
      "expense_details": "Expense Details",
      "select_expense_hint": "Select an expense from the list.",
      "delete_confirm_title": "Delete Expense",
      "delete_confirm_msg": "Are you sure you want to delete this expense?",
      "cancel": "Cancel",
      "delete": "Delete",
      
      "tasks_title": "Tasks",
      "new_task": "New Task",
      "task_name": "Task Name",
      "task_created_date": "Created Date",
      "task_due_date": "Due Date",
      "task_description": "Description",
      "save_task": "Save",
      "task_list": "Task List",
      "task_details": "Task Details",
      "no_task_selected": "No selection made.",
      "delete_task_title": "Delete Task",
      "delete_task_msg": "Are you sure you want to delete this task?",
      
      "ai_title": "AI Assistant",
      "clear_conversation": "Clear Conversation",
      "ai_placeholder": "Write your message...",
      "send": "Send",
      "clear_chat_title": "Clear Chat",
      "clear_chat_msg": "Are you sure you want to clear the entire conversation?",
      
      "events_title": "Event Manager",
      "new_event": "New Event",
      "event_title": "Event Title",
      "event_date": "Event Date",
      "event_type": "Event Type",
      "event_desc": "Description",
      "cancel_event": "Cancel",
      "save_event": "Save Event",
      "events_list": "Events List",
      "no_events": "No events registered",
      "event_details": "Event Details",
      "event_extra_details": "More Details",
      "select_event_hint": "Select an event from the list.",
      "delete_event_title": "Delete Event",
      "delete_event_msg": "Are you sure you want to delete this event?",
      
      "diary_title": "Diary",
      "new_diary_entry": "New Entry",
      "diary_name": "Entry Name",
      "diary_date": "Date",
      "diary_text": "Text",
      "save_diary": "Save",
      "diary_list": "Entries List",
      "diary_details": "Details",
      "no_diary_selected": "No selection made.",
      "delete_diary_title": "Delete Entry",
      "delete_diary_msg": "Are you sure you want to delete this entry?",
      
      "goals_title": "Create New Goal",
      "goal_title_label": "Goal Title",
      "goal_stages": "Goal Stages",
      "add_stage": "Add Stage",
      "save_goal": "Save Goal",
      "goals_list": "Goals List",
      "display_stages": "Goal Stages Display",
      "progress_text": "Progress:",
      "goal_summary_title": "Title:",
      "goal_summary_stages": "Number of Stages:",
      "goal_summary_date": "Creation Date:",
      "delete_goal_title": "Delete Goal",
      "delete_goal_msg": "Are you sure you want to delete this goal?",
      
      "about_title": "About Emrooz",
      "about_text": "Emrooz is a simple and smart platform for your daily management; from expenses to tasks and memories, everything in one place. With our platform, you can update your life plan in real time. Record your expenses, tasks, memories, etc. in Emrooz to easily organize your life. The creator of this site is MTA Company. All rights belong to Emrooz and MTA Company.",
      "badge_simple": "Simple",
      "badge_fast": "Fast",
      "badge_low_data": "Low Data Usage",
      "our_goal": "Our Goal",
      "goal_desc": "Help you organize your daily life with a beautiful, fast, and intuitive interface. With minimal internet usage, we help you live an organized life.",
      "features": "Key Features",
      "feature_1": "Expense Management & Charts",
      "feature_2": "Task Management & Time Tracking",
      "feature_3": "Event Registration & Reminders",
      "feature_4": "Personal Diary",
      "contact": "Contact Us",
      "email": "Email:",
      "telegram": "Telegram:",
      "phone_contact": "Phone:",
      "support": "Support:",
      "help_title": "Help",
      "help_desc": "Quick guide for better use of site features.",
      "help_1": "Navigate between sections using the left menu.",
      "help_2": "Register and check off daily tasks in 'Tasks'.",
      "help_3": "Record your expenses in 'Expenses'.",
      "help_4": "Use AI for everyday questions.",
      "faq_title": "FAQ",
      "faq_desc": "Answers to common user questions",
      "faq_q1": "Where is my data stored?",
      "faq_a1": "Currently, data is stored inside your browser.",
      "faq_q2": "What does 'lowest internet usage' mean?",
      "faq_a2": "Because there is no database and data is stored in the browser, you only need internet to access the site.",
      "faq_q3": "Can I use multiple devices?",
      "faq_a3": "No. This site can only be used on one device because all data is stored in the browser.",
      "faq_q4": "Which AI does Emrooz use?",
      "faq_a4": "Emrooz uses 'Grok' AI. The latest version, Grok-4, is used in the AI section. This AI is built by xAi.",
      "copyright": "© Copyright | All rights reserved Mroooz"
    },
    de: {
      "brand_title": "Emrooz",
      "brand_sub": "Verwalte deinen Tag!",
      "tab_dashboard": "Dashboard",
      "tab_ai": "KI-Assistent",
      "tab_calendar": "Kalender",
      "tab_expenses": "Ausgaben",
      "tab_tasks": "Aufgaben",
      "tab_goals": "Ziele",
      "tab_events": "Ereignisse",
      "tab_diary": "Tagebuch",
      "tab_about": "Über uns",
      
      "profile_title": "Profil",
      "profile_edit": "Bearbeiten",
      "profile_save": "Speichern",
      "first_name": "Vorname",
      "last_name": "Nachname",
      "birth_date": "Geburtsdatum",
      "phone": "Telefonnummer",
      "username": "Benutzername",
      "first_name_ph": "z.B. Ali",
      "last_name_ph": "z.B. Rezaei",
      "phone_ph": "09xxxxxxxxx",
      "username_ph": "benutzername",
      "view_first_name": "Name:",
      "view_last_name": "Nachname:",
      "view_birth": "Geburtsdatum:",
      "view_phone": "Telefon:",
      "view_email": "E-Mail:",
      "view_username": "Benutzername:",
      "email_default": "—",
      
      "latest_expenses": "Letzte Ausgaben",
      "monthly_chart": "Ausgaben des aktuellen Monats",
      "today_events": "Heutige Ereignisse",
      "no_events_today": "Keine Ereignisse für heute registriert",
      
      "calendar_persian": "Persischer Kalender",
      "calendar_gregorian": "Gregorianischer Kalender",
      "calendar_hijri": "Hijri-Kalender",
      "coming_soon": "Demnächst...",
      
      "new_expense": "Neue Ausgabe",
      "expense_name": "Ausgabenname",
      "expense_amount": "Betrag (Toman)",
      "expense_date": "Datum",
      "expense_desc": "Beschreibung",
      "save_expense": "Ausgabe speichern",
      "expense_list": "Ausgabenliste",
      "expense_details": "Ausgabendetails",
      "select_expense_hint": "Wählen Sie eine Ausgabe aus der Liste.",
      "delete_confirm_title": "Ausgabe löschen",
      "delete_confirm_msg": "Möchten Sie diese Ausgabe wirklich löschen?",
      "cancel": "Abbrechen",
      "delete": "Löschen",
      
      "tasks_title": "Aufgaben",
      "new_task": "Neue Aufgabe",
      "task_name": "Aufgabenname",
      "task_created_date": "Erstellungsdatum",
      "task_due_date": "Fälligkeitsdatum",
      "task_description": "Beschreibung",
      "save_task": "Speichern",
      "task_list": "Aufgabenliste",
      "task_details": "Aufgabendetails",
      "no_task_selected": "Keine Auswahl getroffen.",
      "delete_task_title": "Aufgabe löschen",
      "delete_task_msg": "Möchten Sie diese Aufgabe wirklich löschen?",
      
      "ai_title": "KI-Assistent",
      "clear_conversation": "Konversation löschen",
      "ai_placeholder": "Schreiben Sie Ihre Nachricht...",
      "send": "Senden",
      "clear_chat_title": "Chat löschen",
      "clear_chat_msg": "Möchten Sie die gesamte Konversation wirklich löschen?",
      
      "events_title": "Ereignisverwaltung",
      "new_event": "Neues Ereignis",
      "event_title": "Ereignistitel",
      "event_date": "Ereignisdatum",
      "event_type": "Ereignistyp",
      "event_desc": "Beschreibung",
      "cancel_event": "Abbrechen",
      "save_event": "Ereignis speichern",
      "events_list": "Ereignisliste",
      "no_events": "Keine Ereignisse registriert",
      "event_details": "Ereignisdetails",
      "event_extra_details": "Weitere Details",
      "select_event_hint": "Wählen Sie ein Ereignis aus der Liste.",
      "delete_event_title": "Ereignis löschen",
      "delete_event_msg": "Möchten Sie dieses Ereignis wirklich löschen?",
      
      "diary_title": "Tagebuch",
      "new_diary_entry": "Neuer Eintrag",
      "diary_name": "Eintragsname",
      "diary_date": "Datum",
      "diary_text": "Text",
      "save_diary": "Speichern",
      "diary_list": "Eintragsliste",
      "diary_details": "Details",
      "no_diary_selected": "Keine Auswahl getroffen.",
      "delete_diary_title": "Eintrag löschen",
      "delete_diary_msg": "Möchten Sie diesen Eintrag wirklich löschen?",
      
      "goals_title": "Neues Ziel erstellen",
      "goal_title_label": "Zielname",
      "goal_stages": "Zielschritte",
      "add_stage": "Schritt hinzufügen",
      "save_goal": "Ziel speichern",
      "goals_list": "Zielliste",
      "display_stages": "Zielschritte anzeigen",
      "progress_text": "Fortschritt:",
      "goal_summary_title": "Titel:",
      "goal_summary_stages": "Anzahl der Schritte:",
      "goal_summary_date": "Erstellungsdatum:",
      "delete_goal_title": "Ziel löschen",
      "delete_goal_msg": "Möchten Sie dieses Ziel wirklich löschen?",
      
      "about_title": "Über Emrooz",
      "about_text": "Emrooz ist eine einfache und intelligente Plattform für Ihr tägliches Management; von Ausgaben über Aufgaben bis hin zu Erinnerungen, alles an einem Ort. Mit unserer Plattform können Sie Ihren Lebensplan in Echtzeit aktualisieren. Erfassen Sie Ihre Ausgaben, Aufgaben, Erinnerungen usw. in Emrooz, um Ihr Leben leicht zu organisieren. Der Ersteller dieser Website ist die MTA Company. Alle Rechte gehören Emrooz und der MTA Company.",
      "badge_simple": "Einfach",
      "badge_fast": "Schnell",
      "badge_low_data": "Geringer Datenverbrauch",
      "our_goal": "Unser Ziel",
      "goal_desc": "Hilfe bei der Organisation Ihres täglichen Lebens mit einer schönen, schnellen und verständlichen Benutzeroberfläche. Mit minimaler Internetnutzung helfen wir Ihnen, ein organisiertes Leben zu führen.",
      "features": "Hauptfunktionen",
      "feature_1": "Ausgabenverwaltung & Diagramme",
      "feature_2": "Aufgabenverwaltung & Zeitverfolgung",
      "feature_3": "Ereigniserfassung & Erinnerungen",
      "feature_4": "Persönliches Tagebuch",
      "contact": "Kontakt",
      "email": "E-Mail:",
      "telegram": "Telegram:",
      "phone_contact": "Telefon:",
      "support": "Unterstützung:",
      "help_title": "Hilfe",
      "help_desc": "Kurzanleitung für eine bessere Nutzung der Website-Funktionen.",
      "help_1": "Navigieren Sie mit dem linken Menü zwischen den Abschnitten.",
      "help_2": "Erfassen und abhaken Sie tägliche Aufgaben unter 'Aufgaben'.",
      "help_3": "Erfassen Sie Ihre Ausgaben unter 'Ausgaben'.",
      "help_4": "Nutzen Sie KI für alltägliche Fragen.",
      "faq_title": "FAQ",
      "faq_desc": "Antworten auf häufig gestellte Fragen",
      "faq_q1": "Wo werden meine Daten gespeichert?",
      "faq_a1": "Derzeit werden die Daten in Ihrem Browser gespeichert.",
      "faq_q2": "Was bedeutet 'geringster Internetverbrauch'?",
      "faq_a2": "Da es keine Datenbank gibt und die Daten im Browser gespeichert werden, benötigen Sie nur zum Aufrufen der Website eine Internetverbindung.",
      "faq_q3": "Kann ich mehrere Geräte verwenden?",
      "faq_a3": "Nein. Diese Website kann nur auf einem Gerät verwendet werden, da alle Daten im Browser gespeichert werden.",
      "faq_q4": "Welche KI verwendet Emrooz?",
      "faq_a4": "Emrooz verwendet 'Grok' KI. Die neueste Version, Grok-4, wird im KI-Bereich verwendet. Diese KI wurde von xAi entwickelt.",
      "copyright": "© Copyright | Alle Rechte vorbehalten Mroooz"
    }
  };

  // ---------- Helper: Update all translatable elements ----------
  function updateLanguage(lang) {
    if (!translations[lang]) return;
    const t = translations[lang];
    
    // Update elements by data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
          el.placeholder = t[key];
        } else if (el.tagName === 'TEXTAREA' && el.placeholder !== undefined) {
          el.placeholder = t[key];
        } else {
          el.innerText = t[key];
        }
      }
    });
    
    // Sidebar tabs
    const tabButtons = document.querySelectorAll('.tabs .tab');
    const tabKeys = ['tab_dashboard', 'tab_ai', 'tab_calendar', 'tab_expenses', 'tab_tasks', 'tab_goals', 'tab_events', 'tab_diary', 'tab_about'];
    tabButtons.forEach((btn, idx) => {
      if (idx < tabKeys.length && t[tabKeys[idx]]) btn.innerText = t[tabKeys[idx]];
    });
    
    // Brand
    const brandSpan = document.querySelector('.brand span');
    if (brandSpan) brandSpan.innerText = t.brand_sub;
    const brandMain = document.querySelector('.brand');
    if (brandMain && brandMain.firstChild) brandMain.childNodes[0].nodeValue = t.brand_title + " ";
    
    // Profile card
    const profileCardHeader = document.querySelector('.profile-card .card-header h3');
    if (profileCardHeader) profileCardHeader.innerText = t.profile_title;
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) editBtn.innerText = t.profile_edit;
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) saveBtn.innerText = t.profile_save;
    
    // Profile form labels
    const firstNameLabel = document.querySelector('#profileForm .field:first-child label');
    if (firstNameLabel) firstNameLabel.innerText = t.first_name;
    const lastNameLabel = document.querySelector('#profileForm .field:nth-child(2) label');
    if (lastNameLabel) lastNameLabel.innerText = t.last_name;
    const birthLabel = document.querySelector('#profileForm .field:nth-child(3) label');
    if (birthLabel) birthLabel.innerText = t.birth_date;
    const phoneLabel = document.querySelector('#profileForm .field:nth-child(4) label');
    if (phoneLabel) phoneLabel.innerText = t.phone;
    const usernameLabel = document.querySelector('#profileForm .field:nth-child(5) label');
    if (usernameLabel) usernameLabel.innerText = t.username;
    
    // Profile inputs placeholders
    const firstNameInput = document.getElementById('firstName');
    if (firstNameInput) firstNameInput.placeholder = t.first_name_ph;
    const lastNameInput = document.getElementById('lastName');
    if (lastNameInput) lastNameInput.placeholder = t.last_name_ph;
    const phoneInput = document.getElementById('phone');
    if (phoneInput) phoneInput.placeholder = t.phone_ph;
    const usernameInput = document.getElementById('username');
    if (usernameInput) usernameInput.placeholder = t.username_ph;
    
    // Profile view labels
    const viewSpans = document.querySelectorAll('#profileView .row span');
    const viewLabels = [t.view_first_name, t.view_last_name, t.view_birth, t.view_phone, t.view_email, t.view_username];
    viewSpans.forEach((span, idx) => { if (viewLabels[idx]) span.innerText = viewLabels[idx]; });
    const vEmail = document.getElementById('vEmail');
    if (vEmail && vEmail.innerText === '—') vEmail.innerText = t.email_default;
    
    // Dashboard latest expenses
    const latestHeader = document.querySelector('.dashboard-grid .card:first-of-type .card-header h3');
    if (latestHeader) latestHeader.innerText = t.latest_expenses;
    
    // Chart box title
    const chartTitle = document.querySelector('.chart-box .box-title');
    if (chartTitle) chartTitle.innerText = t.monthly_chart;
    
    // Today events card
    const eventsCardHeader = document.querySelector('#todayEventsCard .card-header h3');
    if (eventsCardHeader) eventsCardHeader.innerText = t.today_events;
    const emptyTodayEventsLi = document.querySelector('#todayEventsList li.empty');
    if (emptyTodayEventsLi) emptyTodayEventsLi.innerText = t.no_events_today;
    
    // Calendar section
    const calHeaders = document.querySelectorAll('#calendar .card .card-header h3');
    if (calHeaders.length >= 3) {
      calHeaders[0].innerText = t.calendar_persian;
      calHeaders[1].innerText = t.calendar_gregorian;
      calHeaders[2].innerText = t.calendar_hijri;
    }
    const comingSoon = document.querySelector('#calendar .card:first-child h3:not(.card-header h3)');
    if (comingSoon) comingSoon.innerText = t.coming_soon;
    
    // Expenses tab
    const newExpenseHeader = document.querySelector('#expenses .expenses-grid .card:first-child .card-header h3');
    if (newExpenseHeader) newExpenseHeader.innerText = t.new_expense;
    const expenseNameLabel = document.querySelector('#expenseForm .field:first-child label');
    if (expenseNameLabel) expenseNameLabel.innerText = t.expense_name;
    const expenseAmountLabel = document.querySelector('#expenseForm .field:nth-child(2) label');
    if (expenseAmountLabel) expenseAmountLabel.innerText = t.expense_amount;
    const expenseDateLabel = document.querySelector('#expenseForm .field:nth-child(3) label');
    if (expenseDateLabel) expenseDateLabel.innerText = t.expense_date;
    const expenseDescLabel = document.querySelector('#expenseForm .field:nth-child(4) label');
    if (expenseDescLabel) expenseDescLabel.innerText = t.expense_desc;
    const expenseTitleInput = document.getElementById('expenseTitle');
    if (expenseTitleInput) expenseTitleInput.placeholder = t.expense_name;
    const expenseAmountInput = document.getElementById('expenseAmount');
    if (expenseAmountInput) expenseAmountInput.placeholder = t.expense_amount;
    const expenseDescTextarea = document.getElementById('expenseDesc');
    if (expenseDescTextarea) expenseDescTextarea.placeholder = t.expense_desc;
    const saveExpenseBtn = document.getElementById('saveExpenseBtn');
    if (saveExpenseBtn) saveExpenseBtn.innerText = t.save_expense;
    const expenseListHeader = document.querySelector('#expenses .expenses-grid .card:last-child .card-header h3');
    if (expenseListHeader) expenseListHeader.innerText = t.expense_list;
    const expenseDetailsHeader = document.querySelector('.expense-detail-card .card-header h3');
    if (expenseDetailsHeader) expenseDetailsHeader.innerText = t.expense_details;
    const emptyDetail = document.querySelector('.expense-detail.empty');
    if (emptyDetail) emptyDetail.innerText = t.select_expense_hint;
    const confirmDeleteTitle = document.querySelector('#expenseDeleteConfirm .confirm-content h4');
    if (confirmDeleteTitle) confirmDeleteTitle.innerText = t.delete_confirm_title;
    const confirmDeleteMsg = document.querySelector('#expenseDeleteConfirm .confirm-content p');
    if (confirmDeleteMsg) confirmDeleteMsg.innerText = t.delete_confirm_msg;
    const cancelDeleteBtn = document.getElementById('cancelExpenseDelete');
    if (cancelDeleteBtn) cancelDeleteBtn.innerText = t.cancel;
    const confirmDeleteBtn = document.getElementById('confirmExpenseDelete');
    if (confirmDeleteBtn) confirmDeleteBtn.innerText = t.delete;
    
    // Tasks tab
    const tasksTitle = document.querySelector('#tasks h2');
    if (tasksTitle) tasksTitle.innerText = t.tasks_title;
    const newTaskHeader = document.querySelector('#tasks .card-grid-2 .card:first-child h3');
    if (newTaskHeader) newTaskHeader.innerText = t.new_task;
    const taskNameLabel = document.querySelector('#tasks .form-row:first-child label');
    if (taskNameLabel) taskNameLabel.innerText = t.task_name;
    const taskCreatedLabel = document.querySelector('#tasks .form-row:nth-child(2) label');
    if (taskCreatedLabel) taskCreatedLabel.innerText = t.task_created_date;
    const taskDueLabel = document.querySelector('#tasks .form-row:nth-child(3) label');
    if (taskDueLabel) taskDueLabel.innerText = t.task_due_date;
    const taskDescLabel = document.querySelector('#tasks .form-row:nth-child(4) label');
    if (taskDescLabel) taskDescLabel.innerText = t.task_description;
    const taskTitleInput = document.getElementById('taskTitle');
    if (taskTitleInput) taskTitleInput.placeholder = t.task_name;
    const taskDescTextarea = document.getElementById('taskDesc');
    if (taskDescTextarea) taskDescTextarea.placeholder = t.task_description;
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    if (saveTaskBtn) saveTaskBtn.innerText = t.save_task;
    const taskListHeader = document.querySelector('#tasks .card-grid-2 .card:last-child h3');
    if (taskListHeader) taskListHeader.innerText = t.task_list;
    const taskDetailsHeader = document.querySelector('#taskDetails h3');
    if (taskDetailsHeader) taskDetailsHeader.innerText = t.task_details;
    const emptyTaskDetail = document.querySelector('#taskDetailsContent');
    if (emptyTaskDetail && emptyTaskDetail.innerText === 'انتخابی انجام نشده است.') emptyTaskDetail.innerText = t.no_task_selected;
    const deleteTaskTitle = document.querySelector('#deleteConfirm .confirm-content h4');
    if (deleteTaskTitle) deleteTaskTitle.innerText = t.delete_task_title;
    const deleteTaskMsg = document.querySelector('#deleteConfirm .confirm-content p');
    if (deleteTaskMsg) deleteTaskMsg.innerText = t.delete_task_msg;
    const cancelTaskDelete = document.getElementById('cancelDelete');
    if (cancelTaskDelete) cancelTaskDelete.innerText = t.cancel;
    const confirmTaskDelete = document.getElementById('confirmDelete');
    if (confirmTaskDelete) confirmTaskDelete.innerText = t.delete;
    
    // AI tab
    const aiHeader = document.querySelector('#ai .card-header h3');
    if (aiHeader) aiHeader.innerText = t.ai_title;
    const clearMemoryBtn = document.getElementById('clearMemoryBtn');
    if (clearMemoryBtn) clearMemoryBtn.innerText = t.clear_conversation;
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = t.ai_placeholder;
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.innerText = t.send;
    const clearChatTitle = document.querySelector('#clearChatConfirm .confirm-content h4');
    if (clearChatTitle) clearChatTitle.innerText = t.clear_chat_title;
    const clearChatMsg = document.querySelector('#clearChatConfirm .confirm-content p');
    if (clearChatMsg) clearChatMsg.innerText = t.clear_chat_msg;
    const cancelClearChat = document.getElementById('cancelClearChat');
    if (cancelClearChat) cancelClearChat.innerText = t.cancel;
    const confirmClearChat = document.getElementById('confirmClearChat');
    if (confirmClearChat) confirmClearChat.innerText = t.delete;
    
    // Events tab
    const eventsTitle = document.querySelector('#events .tab-title');
    if (eventsTitle) eventsTitle.innerText = t.events_title;
    const newEventHeader = document.querySelector('#events .form-card h3');
    if (newEventHeader) newEventHeader.innerText = t.new_event;
    const eventTitleLabel = document.querySelector('#eventsForm .form-group:first-child label');
    if (eventTitleLabel) eventTitleLabel.innerText = t.event_title;
    const eventDateLabel = document.querySelector('#eventsForm .form-group:nth-child(2) label');
    if (eventDateLabel) eventDateLabel.innerText = t.event_date;
    const eventTypeLabel = document.querySelector('#eventsForm .form-group:nth-child(3) label');
    if (eventTypeLabel) eventTypeLabel.innerText = t.event_type;
    const eventDescLabel = document.querySelector('#eventsForm .form-group:nth-child(4) label');
    if (eventDescLabel) eventDescLabel.innerText = t.event_desc;
    const eventTitleInput = document.getElementById('eventTitle');
    if (eventTitleInput) eventTitleInput.placeholder = t.event_title;
    const eventTypeInput = document.getElementById('eventType');
    if (eventTypeInput) eventTypeInput.placeholder = t.event_type;
    const eventDescTextarea = document.getElementById('eventDescription');
    if (eventDescTextarea) eventDescTextarea.placeholder = t.event_desc;
    const cancelEventBtn = document.getElementById('cancelEventBtn');
    if (cancelEventBtn) cancelEventBtn.innerText = t.cancel_event;
    const saveEventBtn = document.getElementById('saveEventBtn');
    if (saveEventBtn) saveEventBtn.innerText = t.save_event;
    const eventsListHeader = document.querySelector('#events .list-card .card-header h3');
    if (eventsListHeader) eventsListHeader.innerText = t.events_list;
    const emptyEventsListLi = document.querySelector('#eventsList li');
    if (emptyEventsListLi && emptyEventsListLi.innerText === 'مناسبتی ثبت نشده است') emptyEventsListLi.innerText = t.no_events;
    const eventDetailsHeader = document.querySelector('#eventMainDetails h3');
    if (eventDetailsHeader) eventDetailsHeader.innerText = t.event_details;
    const eventExtraHeader = document.querySelector('#eventExtraDetails h3');
    if (eventExtraHeader) eventExtraHeader.innerText = t.event_extra_details;
    const emptyEventDetail = document.querySelector('#eventMainDetails .detail-body.empty');
    if (emptyEventDetail) emptyEventDetail.innerText = t.select_event_hint;
    const deleteEventTitle = document.querySelector('#eventDeleteConfirm .confirm-content h4');
    if (deleteEventTitle) deleteEventTitle.innerText = t.delete_event_title;
    const deleteEventMsg = document.querySelector('#eventDeleteConfirm .confirm-content p');
    if (deleteEventMsg) deleteEventMsg.innerText = t.delete_event_msg;
    const cancelEventDelete = document.getElementById('cancelEventDelete');
    if (cancelEventDelete) cancelEventDelete.innerText = t.cancel;
    const confirmEventDelete = document.getElementById('confirmEventDelete');
    if (confirmEventDelete) confirmEventDelete.innerText = t.delete;
    
    // Diary tab
    const diaryTitle = document.getElementById('LABEL');
    if (diaryTitle) diaryTitle.innerText = t.diary_title;
    const newDiaryHeader = document.getElementById('BoxOLabel');
    if (newDiaryHeader) newDiaryHeader.innerText = t.new_diary_entry;
    const diaryNameLabel = document.getElementById('TextNameLabel');
    if (diaryNameLabel) diaryNameLabel.innerText = t.diary_name;
    const diaryTextLabel = document.getElementById('TextLabel');
    if (diaryTextLabel) diaryTextLabel.innerText = t.diary_text;
    const diaryTitleInput = document.getElementById('diaryTitle');
    if (diaryTitleInput) diaryTitleInput.placeholder = t.diary_name;
    const diaryTextarea = document.getElementById('diaryText');
    if (diaryTextarea) diaryTextarea.placeholder = t.diary_text;
    const saveDiaryBtn = document.getElementById('saveDiaryBtn');
    if (saveDiaryBtn) saveDiaryBtn.innerText = t.save_diary;
    const diaryListHeader = document.querySelector('#diary .card-grid-2 .card:last-child h3');
    if (diaryListHeader) diaryListHeader.innerText = t.diary_list;
    const diaryDetailsHeader = document.querySelector('#diaryDetails h3');
    if (diaryDetailsHeader) diaryDetailsHeader.innerText = t.diary_details;
    const emptyDiaryDetail = document.getElementById('diaryDetailsContent');
    if (emptyDiaryDetail && emptyDiaryDetail.innerText === 'انتخابی انجام نشده است.') emptyDiaryDetail.innerText = t.no_diary_selected;
    const deleteDiaryTitle = document.querySelector('#diaryDeleteConfirm .confirm-content h4');
    if (deleteDiaryTitle) deleteDiaryTitle.innerText = t.delete_diary_title;
    const deleteDiaryMsg = document.querySelector('#diaryDeleteConfirm .confirm-content p');
    if (deleteDiaryMsg) deleteDiaryMsg.innerText = t.delete_diary_msg;
    const cancelDiaryDelete = document.getElementById('cancelDiaryDelete');
    if (cancelDiaryDelete) cancelDiaryDelete.innerText = t.cancel;
    const confirmDiaryDelete = document.getElementById('confirmDiaryDelete');
    if (confirmDiaryDelete) confirmDiaryDelete.innerText = t.delete;
    
    // Goals tab
    const goalInputHeader = document.querySelector('#goals .goal-input-box h3');
    if (goalInputHeader) goalInputHeader.innerText = t.goals_title;
    const goalTitleLabel = document.querySelector('#goals .goal-input-box label:first-of-type');
    if (goalTitleLabel) goalTitleLabel.innerText = t.goal_title_label;
    const goalStagesLabel = document.querySelector('#goals .goal-input-box label:last-of-type');
    if (goalStagesLabel) goalStagesLabel.innerText = t.goal_stages;
    const addStageBtn = document.getElementById('addStageBtn');
    if (addStageBtn) addStageBtn.innerText = t.add_stage;
    const saveGoalBtn = document.getElementById('saveGoalBtn');
    if (saveGoalBtn) saveGoalBtn.innerText = t.save_goal;
    const goalsListHeader = document.querySelector('#goals .goals-list-box h3');
    if (goalsListHeader) goalsListHeader.innerText = t.goals_list;
    const displayStagesHeader = document.getElementById('GoalsBoxLabel');
    if (displayStagesHeader) displayStagesHeader.innerText = t.display_stages;
    const progressTextSpan = document.querySelector('#goalProgressText');
    if (progressTextSpan) progressTextSpan.innerHTML = t.progress_text + ' <span id="goalProgressPercent">0</span>%';
    const summaryTitleSpan = document.querySelector('#goalSummary p:first-child');
    if (summaryTitleSpan) summaryTitleSpan.innerHTML = t.goal_summary_title + ' <span id="goalSummaryTitle">—</span>';
    const summaryStagesSpan = document.querySelector('#goalSummary p:nth-child(2)');
    if (summaryStagesSpan) summaryStagesSpan.innerHTML = t.goal_summary_stages + ' <span id="goalSummaryStages">—</span>';
    const summaryDateSpan = document.querySelector('#goalSummary p:nth-child(3)');
    if (summaryDateSpan) summaryDateSpan.innerHTML = t.goal_summary_date + ' <span id="goalSummaryDate">—</span>';
    const deleteGoalTitle = document.querySelector('#goalDeleteConfirm .confirm-content h4');
    if (deleteGoalTitle) deleteGoalTitle.innerText = t.delete_goal_title;
    const deleteGoalMsg = document.querySelector('#goalDeleteConfirm .confirm-content p');
    if (deleteGoalMsg) deleteGoalMsg.innerText = t.delete_goal_msg;
    const cancelGoalDelete = document.getElementById('cancelGoalDelete');
    if (cancelGoalDelete) cancelGoalDelete.innerText = t.cancel;
    const confirmGoalDelete = document.getElementById('confirmGoalDelete');
    if (confirmGoalDelete) confirmGoalDelete.innerText = t.delete;
    
    // About tab
    const aboutTitle = document.querySelector('#about .about-text h2');
    if (aboutTitle) aboutTitle.innerText = t.about_title;
    const aboutText = document.querySelector('#about .about-text p');
    if (aboutText) aboutText.innerText = t.about_text;
    const badges = document.querySelectorAll('#about .about-badges span');
    if (badges.length >= 3) {
      badges[0].innerText = t.badge_simple;
      badges[1].innerText = t.badge_fast;
      badges[2].innerText = t.badge_low_data;
    }
    const goalCardTitle = document.querySelector('#about .about-card:first-child h3');
    if (goalCardTitle) goalCardTitle.innerText = t.our_goal;
    const goalCardText = document.querySelector('#about .about-card:first-child p');
    if (goalCardText) goalCardText.innerText = t.goal_desc;
    const featuresTitle = document.querySelector('#about .about-card:nth-child(2) h3');
    if (featuresTitle) featuresTitle.innerText = t.features;
    const featureItems = document.querySelectorAll('#about .ek-txt');
    if (featureItems.length >= 4) {
      featureItems[0].innerText = t.feature_1;
      featureItems[1].innerText = t.feature_2;
      featureItems[2].innerText = t.feature_3;
      featureItems[3].innerText = t.feature_4;
    }
    const contactTitle = document.querySelector('#about .about-card:nth-child(3) h3');
    if (contactTitle) contactTitle.innerText = t.contact;
    const contactSpans = document.querySelectorAll('#about .contact-list #ebm span');
    if (contactSpans.length >= 4) {
      contactSpans[0].innerText = t.email;
      contactSpans[1].innerText = t.telegram;
      contactSpans[2].innerText = t.phone_contact;
      contactSpans[3].innerText = t.support;
    }
    const helpTitle = document.querySelector('#about .rahnama .card h3');
    if (helpTitle) helpTitle.innerText = t.help_title;
    const helpDesc = document.querySelector('#about .rahnama .card .muted');
    if (helpDesc) helpDesc.innerText = t.help_desc;
    const helpItems = document.querySelectorAll('#about .help-list li');
    if (helpItems.length >= 4) {
      helpItems[0].innerText = t.help_1;
      helpItems[1].innerText = t.help_2;
      helpItems[2].innerText = t.help_3;
      helpItems[3].innerText = t.help_4;
    }
    const faqTitle = document.querySelector('#about .faq h3');
    if (faqTitle) faqTitle.innerText = t.faq_title;
    const faqDesc = document.querySelector('#about .faq .muted');
    if (faqDesc) faqDesc.innerText = t.faq_desc;
    const faqSummaries = document.querySelectorAll('#about .faq-item summary');
    const faqAnswers = document.querySelectorAll('#about .faq-item p');
    if (faqSummaries.length >= 4) {
      faqSummaries[0].innerText = t.faq_q1;
      faqSummaries[1].innerText = t.faq_q2;
      faqSummaries[2].innerText = t.faq_q3;
      faqSummaries[3].innerText = t.faq_q4;
    }
    if (faqAnswers.length >= 4) {
      faqAnswers[0].innerText = t.faq_a1;
      faqAnswers[1].innerText = t.faq_a2;
      faqAnswers[2].innerText = t.faq_a3;
      faqAnswers[3].innerText = t.faq_a4;
    }
    const copyright = document.querySelector('.copyright');
    if (copyright) copyright.innerText = t.copyright;
    
    // Update html lang and dir
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang === 'fa' ? 'fa' : (lang === 'en' ? 'en' : 'de'));
    htmlTag.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    
    // Save to localStorage
    localStorage.setItem('selectedLanguage', lang);
  }
  
  // ---------- Create Circle Language Switcher Button ----------
  function createLanguageSwitcher() {
    // Check if button already exists
    if (document.getElementById('langSwitcherBtn')) return;
    
    // Create container div for the button
    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'fixed';
    btnContainer.style.bottom = '24px';
    btnContainer.style.right = '24px';
    btnContainer.style.zIndex = '1000';
    
    // Create circle button
    const btn = document.createElement('button');
    btn.id = 'langSwitcherBtn';
    btn.innerHTML = '🌐';
    btn.setAttribute('aria-label', 'Change Language');
    
    // Circle button styles
    btn.style.width = '56px';
    btn.style.height = '56px';
    btn.style.borderRadius = '50%';
    btn.style.backgroundColor = 'var(--accent, #4f7cff)';
    btn.style.border = 'none';
    btn.style.color = 'white';
    btn.style.fontSize = '28px';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(79,124,255,0.7)';
    btn.style.transition = 'all 0.3s ease';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.backdropFilter = 'blur(4px)';
    btn.style.outline = 'none';
    
    // Hover effect
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.08)';
      btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    });
    
    // Ripple animation on click
    btn.addEventListener('click', function(e) {
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255,255,255,0.6)';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'rippleAnim 0.5s ease-out';
      
      const rect = btn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 500);
      
      // Cycle through languages: fa -> en -> de -> fa
      const currentLang = localStorage.getItem('selectedLanguage') || 'fa';
      let nextLang;
      if (currentLang === 'fa') nextLang = 'en';
      else if (currentLang === 'en') nextLang = 'de';
      else nextLang = 'fa';
      
      updateLanguage(nextLang);
      
      // Optional: Add a quick pulse animation on the button after language change
      btn.style.animation = 'pulseAnim 0.3s ease';
      setTimeout(() => { btn.style.animation = ''; }, 300);
    });
    
    // Add keyframe animations for ripple and pulse
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleAnim {
        0% { width: 0; height: 0; opacity: 0.6; }
        100% { width: 120px; height: 120px; opacity: 0; }
      }
      @keyframes pulseAnim {
        0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        50% { transform: scale(0.95); box-shadow: 0 2px 10px rgba(0,0,0,0.4), 0 0 0 6px rgba(79,124,255,0.4); }
        100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
      }
    `;
    document.head.appendChild(style);
    
    btnContainer.appendChild(btn);
    document.body.appendChild(btnContainer);
  }
  
  // ---------- Initialize ----------
  function initLanguageSwitcher() {
    // Load saved language or default to 'fa'
    const savedLang = localStorage.getItem('selectedLanguage') || 'fa';
    updateLanguage(savedLang);
    createLanguageSwitcher();
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }
})();

