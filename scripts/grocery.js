function renderGroceryItem(item) {
  const metaParts = [item.quantityDisplay, item.meals.join(", ")].filter(Boolean);
  const meta = metaParts.length ? `<span class="text-muted text-sm grocery-item-meta">${metaParts.join(" — ")}</span>` : "";

  return `
    <div class="card grocery-item${item.checked ? " grocery-item-checked" : ""}">
      <label class="grocery-item-label">
        <input type="checkbox" class="grocery-item-checkbox" data-id="${item.id}"${item.checked ? " checked" : ""}>
        <span class="grocery-item-text">
          <span class="grocery-item-name">${item.name}</span>
          ${meta}
        </span>
      </label>
      <button type="button" class="btn-icon-round grocery-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>
    </div>
  `;
}

function renderGroceryList() {
  const list = document.getElementById("grocery-list");
  const items = getGroceryList();

  list.innerHTML = items.length
    ? items.map(renderGroceryItem).join("")
    : `<p class="text-muted text-sm">Nothing needed — the week's plan is fully covered by the pantry.</p>`;

  list.querySelectorAll(".grocery-item-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      toggleGroceryItemChecked(event.target.dataset.id);
      renderGroceryList();
    });
  });

  list.querySelectorAll(".grocery-item-remove").forEach((button) => {
    button.addEventListener("click", (event) => {
      dismissGroceryItem(event.currentTarget.dataset.id);
      renderGroceryList();
    });
  });
}

function handleAddItemSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.elements.name.value.trim();
  if (!name) return;

  addCustomGroceryItem(name);
  form.reset();
  renderGroceryList();
}

document.getElementById("add-item-form").addEventListener("submit", handleAddItemSubmit);
renderGroceryList();
