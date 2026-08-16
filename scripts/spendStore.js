const SPEND_CUSTOM_KEY = "mealPlanner.spend.customEntries";

function loadCustomSpendEntries() {
  try {
    const raw = localStorage.getItem(SPEND_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveCustomSpendEntries(entries) {
  localStorage.setItem(SPEND_CUSTOM_KEY, JSON.stringify(entries));
}

function getSpendLog() {
  return SPEND_LOG.concat(loadCustomSpendEntries())
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function addSpendEntry({ type, amount, date }) {
  const entries = loadCustomSpendEntries();
  entries.push({ id: `${Date.now()}`, type, amount, date });
  saveCustomSpendEntries(entries);
}

function isSameMonth(dateString, reference) {
  const referenceKey = `${reference.getFullYear()}-${String(reference.getMonth() + 1).padStart(2, "0")}`;
  return dateString.slice(0, 7) === referenceKey;
}

function getMonthlyTotals() {
  const now = new Date();
  const totals = { grocery: 0, orderedOut: 0 };
  getSpendLog().forEach((entry) => {
    if (isSameMonth(entry.date, now)) {
      totals[entry.type] += entry.amount;
    }
  });
  return totals;
}
