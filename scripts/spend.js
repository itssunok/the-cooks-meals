const SPEND_TYPE_LABELS = {
  grocery: "Grocery trip",
  orderedOut: "Ordered out",
};

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function renderSummary() {
  const totals = getMonthlyTotals();
  document.getElementById("summary-grocery").textContent = formatCurrency(totals.grocery);
  document.getElementById("summary-ordered-out").textContent = formatCurrency(totals.orderedOut);
}

function renderSpendEntry(entry) {
  const pillClass = entry.type === "grocery" ? "status-pill-success" : "status-pill-warning";
  return `
    <div class="card spend-entry">
      <div class="flex-row gap-12">
        <span class="status-pill ${pillClass}">${SPEND_TYPE_LABELS[entry.type]}</span>
        <span class="text-muted text-sm">${formatDate(entry.date)}</span>
      </div>
      <span class="spend-entry-amount">${formatCurrency(entry.amount)}</span>
    </div>
  `;
}

function renderSpendLog() {
  renderSummary();
  const list = document.getElementById("spend-list");
  const entries = getSpendLog();
  list.innerHTML = entries.length
    ? entries.map(renderSpendEntry).join("")
    : `<p class="text-muted text-sm">No spend logged yet.</p>`;
}

function handleAddSpendSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const amount = parseFloat(form.elements.amount.value);
  if (!amount || amount <= 0) return;

  addSpendEntry({
    type: form.elements.type.value,
    amount,
    date: form.elements.date.value || new Date().toISOString().slice(0, 10),
  });

  form.reset();
  form.elements.date.value = new Date().toISOString().slice(0, 10);
  renderSpendLog();
}

const addSpendForm = document.getElementById("add-spend-form");
addSpendForm.elements.date.value = new Date().toISOString().slice(0, 10);
addSpendForm.addEventListener("submit", handleAddSpendSubmit);

renderSpendLog();
