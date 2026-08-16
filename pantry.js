function renderStatusPills(item) {
  const pills = [];
  const expirationStatus = getExpirationStatus(item);

  if (expirationStatus === "expired") {
    pills.push('<span class="status-pill status-pill-danger">Expired</span>');
  } else if (expirationStatus === "expiring") {
    pills.push('<span class="status-pill status-pill-warning">Expiring soon</span>');
  }

  if (isLowStock(item)) {
    pills.push('<span class="status-pill status-pill-warning">Low stock</span>');
  }

  if (pills.length === 0) {
    pills.push('<span class="status-pill status-pill-success">In stock</span>');
  }

  return pills.join("");
}

function renderPantryItem(item) {
  const quantityLabel = item.unit ? `${item.quantity} ${item.unit}` : String(item.quantity);
  return `
    <div class="card pantry-item">
      <div class="flex-row-between">
        <h3 class="title-h3">${item.name}</h3>
        <span class="text-muted text-sm">${quantityLabel}</span>
      </div>
      <div class="pantry-item-status-row">${renderStatusPills(item)}</div>
    </div>
  `;
}

function renderPantry() {
  const list = document.getElementById("pantry-list");
  list.innerHTML = sortByUrgency(getPantry()).map(renderPantryItem).join("");
}

renderPantry();
