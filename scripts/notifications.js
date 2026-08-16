const NOTIF_READ_KEY = "mealPlanner.notifications.read";

function loadReadNotificationIds() {
  try {
    const raw = localStorage.getItem(NOTIF_READ_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveReadNotificationIds(ids) {
  localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(ids));
}

function isNotificationRead(id) {
  return loadReadNotificationIds().includes(id);
}

function toggleNotificationRead(id) {
  const ids = loadReadNotificationIds();
  const index = ids.indexOf(id);
  if (index === -1) ids.push(id);
  else ids.splice(index, 1);
  saveReadNotificationIds(ids);
}

function getNotifications() {
  const notifications = [];
  const todayKey = getTodayKey();
  const plan = getWeeklyPlan();

  if (Object.values(plan).some((mealId) => !mealId)) {
    notifications.push({
      id: "weekly-plan-incomplete",
      tone: "warning",
      message: "This week's plan isn't finished — some days still need a meal.",
    });
  }

  if (CAT_FOOD_TASK.dueDayOfWeek === todayKey) {
    notifications.push({
      id: "cat-food-due",
      tone: "warning",
      message: `${CAT_FOOD_TASK.recipeName} is due for prep today.`,
    });
  }

  getPantry().forEach((item) => {
    const status = getPrimaryStatus(item);
    if (status === "expired") {
      notifications.push({ id: `pantry-expired-${item.id}`, tone: "danger", message: `${item.name} has expired.` });
    } else if (status === "expiring") {
      notifications.push({ id: `pantry-expiring-${item.id}`, tone: "warning", message: `${item.name} is expiring soon.` });
    } else if (status === "low") {
      notifications.push({ id: `pantry-low-${item.id}`, tone: "warning", message: `${item.name} is running low.` });
    }
  });

  return notifications
    .map((notification) => Object.assign({}, notification, { read: isNotificationRead(notification.id) }))
    .sort((a, b) => Number(a.read) - Number(b.read));
}

function renderNotificationCard(notification) {
  const readClass = notification.read ? " notif-card-read" : "";
  return `
    <div class="card notif-card${readClass}">
      <label class="notif-card-label">
        <span class="notif-dot notif-dot-${notification.tone}"></span>
        <span class="notif-card-message">${notification.message}</span>
      </label>
      <input
        type="checkbox"
        class="notif-card-checkbox"
        data-id="${notification.id}"
        aria-label="Mark as read"
        ${notification.read ? "checked" : ""}
      >
    </div>
  `;
}

function renderNotifications() {
  const notifications = getNotifications();
  const badge = document.getElementById("notif-bell-badge");
  const list = document.getElementById("notif-list");
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (unreadCount > 0) {
    badge.textContent = String(unreadCount);
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }

  list.innerHTML = notifications.length
    ? notifications.map(renderNotificationCard).join("")
    : `<p class="text-muted text-sm notif-empty">Nothing needs attention.</p>`;

  list.querySelectorAll(".notif-card-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      toggleNotificationRead(event.target.dataset.id);
      renderNotifications();
    });
  });
}

function initNotifications() {
  const btn = document.getElementById("notif-bell-btn");
  const closeBtn = document.getElementById("notif-close-btn");
  const panel = document.getElementById("notif-panel");
  const overlay = document.getElementById("notif-overlay");

  function openPanel() {
    panel.hidden = false;
    overlay.hidden = false;
  }

  function closePanel() {
    panel.hidden = true;
    overlay.hidden = true;
  }

  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (panel.hidden) openPanel();
    else closePanel();
  });

  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  renderNotifications();
}

initNotifications();
