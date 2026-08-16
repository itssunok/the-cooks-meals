const EXPIRING_SOON_WINDOW_DAYS = 5;

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString + "T00:00:00");
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function getExpirationStatus(item) {
  if (!item.expirationDate) return null;
  const daysLeft = daysUntil(item.expirationDate);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= EXPIRING_SOON_WINDOW_DAYS) return "expiring";
  return null;
}

function isLowStock(item) {
  return item.quantity <= item.lowStockThreshold;
}

function getPantry() {
  return PANTRY_ITEMS;
}

const PANTRY_STATUS_ORDER = { expired: 0, expiring: 1, low: 2, ok: 3 };

function getPrimaryStatus(item) {
  const expirationStatus = getExpirationStatus(item);
  if (expirationStatus === "expired") return "expired";
  if (expirationStatus === "expiring") return "expiring";
  if (isLowStock(item)) return "low";
  return "ok";
}

function sortByUrgency(items) {
  return items.slice().sort((a, b) => PANTRY_STATUS_ORDER[getPrimaryStatus(a)] - PANTRY_STATUS_ORDER[getPrimaryStatus(b)]);
}
