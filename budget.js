// Página de presupuesto. Comparte datos (localStorage) y helpers (shared.js) con la app principal.

function loadTrips() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.trips && typeof parsed.trips === "object") return parsed;
    } catch {}
  }
  return { trips: { default: { name: "Nerja", activities: [], expenses: [], budgetLimit: 0 } }, currentTripId: "default" };
}

let trips = loadTrips();
let currentTripId = trips.currentTripId || Object.keys(trips.trips)[0] || "default";
if (!trips.trips[currentTripId]) {
  currentTripId = Object.keys(trips.trips)[0];
}

const trip = trips.trips[currentTripId];
if (!Array.isArray(trip.activities)) trip.activities = [];
if (!Array.isArray(trip.expenses)) trip.expenses = [];
if (typeof trip.budgetLimit !== "number") trip.budgetLimit = 0;

const els = {
  tripName: document.querySelector("#tripName"),
  kpiSpent: document.querySelector("#kpiSpent"),
  kpiRemaining: document.querySelector("#kpiRemaining"),
  budgetLimitInput: document.querySelector("#budgetLimitInput"),
  budgetProgressFill: document.querySelector("#budgetProgressFill"),
  budgetRemaining: document.querySelector("#budgetRemaining"),
  categoryChart: document.querySelector("#categoryChart"),
  dayChart: document.querySelector("#dayChart"),
  dayBreakdown: document.querySelector("#dayBreakdown"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseConcept: document.querySelector("#expenseConcept"),
  expenseCategory: document.querySelector("#expenseCategory"),
  expenseDay: document.querySelector("#expenseDay"),
  expenseAmount: document.querySelector("#expenseAmount")
};

let darkMode = loadDarkMode();

function saveTrips() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function icon(name) {
  const icons = {
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
  };
  return icons[name];
}

function getBudgetItems() {
  const items = [];

  trip.expenses.forEach((expense) => {
    items.push({
      id: expense.id,
      kind: "expense",
      label: expense.concept,
      category: expense.category,
      dayNum: matchTripDay(expense.day),
      amount: Number(expense.amount) || 0
    });
  });

  trip.activities.forEach((activity) => {
    const price = Number(activity.price) || 0;
    if (price > 0) {
      items.push({
        id: activity.id,
        kind: "activity",
        label: activity.title,
        category: activity.category,
        dayNum: matchTripDay(activity.day),
        amount: price
      });
    }
  });

  return items;
}

function createBudgetItemRow(item) {
  const row = document.createElement("article");
  row.className = "budget-item";

  const info = document.createElement("div");
  info.className = "budget-item-info";

  const label = document.createElement("span");
  label.className = "budget-item-label";
  label.textContent = item.label;
  info.append(label);

  const category = document.createElement("span");
  category.className = "pill pill-category";
  category.dataset.category = item.category;
  category.textContent = item.category;
  info.append(category);

  if (item.kind === "activity") {
    const badge = document.createElement("span");
    badge.className = "pill pill-activity";
    badge.textContent = "Actividad";
    info.append(badge);
  }

  const actions = document.createElement("div");
  actions.className = "budget-item-actions";

  const amount = document.createElement("span");
  amount.className = "budget-item-amount";
  amount.textContent = formatCurrency(item.amount);
  actions.append(amount);

  if (item.kind === "expense") {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-button small danger";
    deleteBtn.type = "button";
    deleteBtn.dataset.action = "delete-expense";
    deleteBtn.dataset.id = item.id;
    deleteBtn.title = "Eliminar gasto";
    deleteBtn.setAttribute("aria-label", "Eliminar gasto");
    deleteBtn.innerHTML = icon("trash");
    actions.append(deleteBtn);
  }

  row.append(info, actions);
  return row;
}

function renderDayBreakdown(items) {
  els.dayBreakdown.innerHTML = "";

  [...TRIP_DAYS, GENERAL_DAY].forEach((day) => {
    const dayItems = items.filter((item) => item.dayNum === day.num);
    if (day.num === null && dayItems.length === 0) return;

    const total = dayItems.reduce((sum, item) => sum + item.amount, 0);

    const card = document.createElement("section");
    card.className = "day-card";

    const header = document.createElement("div");
    header.className = "day-card-header";
    const heading = document.createElement("h3");
    heading.textContent = day.long;
    const totalEl = document.createElement("span");
    totalEl.className = "day-card-total";
    totalEl.textContent = formatCurrency(total);
    header.append(heading, totalEl);
    card.append(header);

    if (dayItems.length === 0) {
      const empty = document.createElement("p");
      empty.className = "day-card-empty";
      empty.textContent = "Sin gastos asignados a este día.";
      card.append(empty);
    } else {
      const list = document.createElement("div");
      list.className = "day-items";
      dayItems.forEach((item) => list.append(createBudgetItemRow(item)));
      card.append(list);
    }

    els.dayBreakdown.append(card);
  });
}

function renderBudget() {
  const items = getBudgetItems();
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  els.kpiSpent.textContent = formatCurrency(total);

  const limit = trip.budgetLimit || 0;
  if (document.activeElement !== els.budgetLimitInput) {
    els.budgetLimitInput.value = limit || "";
  }

  if (limit > 0) {
    const remaining = limit - total;
    els.kpiRemaining.textContent = formatCurrency(remaining);
    els.kpiRemaining.classList.toggle("is-over", remaining < 0);
    els.budgetRemaining.textContent =
      remaining >= 0
        ? `Quedan ${formatCurrency(remaining)} de tu presupuesto de ${formatCurrency(limit)}.`
        : `Te pasas ${formatCurrency(Math.abs(remaining))} del presupuesto de ${formatCurrency(limit)}.`;
    els.budgetRemaining.classList.toggle("is-over", remaining < 0);
    els.budgetProgressFill.style.width = `${Math.min((total / limit) * 100, 100)}%`;
    els.budgetProgressFill.classList.toggle("is-over", total > limit);
  } else {
    els.kpiRemaining.textContent = "—";
    els.kpiRemaining.classList.remove("is-over");
    els.budgetRemaining.textContent = "Añade un presupuesto máximo para ver cuánto te queda.";
    els.budgetRemaining.classList.remove("is-over");
    els.budgetProgressFill.style.width = "0%";
    els.budgetProgressFill.classList.remove("is-over");
  }

  const byCategory = new Map();
  items.forEach((item) => {
    byCategory.set(item.category, (byCategory.get(item.category) || 0) + item.amount);
  });
  const categoryItems = Array.from(byCategory.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      label: category,
      value: amount,
      color: `var(${CATEGORY_COLOR_VAR[category] || "--cat-otros"})`
    }));
  renderBarChart(els.categoryChart, categoryItems, "Pon precio a actividades o añade gastos para ver el desglose.");

  const dayChartItems = [...TRIP_DAYS, GENERAL_DAY]
    .map((day) => ({
      day,
      amount: items.filter((item) => item.dayNum === day.num).reduce((sum, item) => sum + item.amount, 0)
    }))
    .filter((entry) => entry.day.num !== null || entry.amount > 0)
    .map((entry) => ({
      label: entry.day.short,
      value: entry.amount,
      color: entry.day.num === null ? "var(--muted)" : "var(--cat-alojamiento)"
    }));
  renderBarChart(els.dayChart, dayChartItems, "Asigna días a tus gastos y actividades.");

  renderDayBreakdown(items);
}

function addExpense(expense) {
  trip.expenses.unshift({
    id: createId(),
    concept: expense.concept.trim(),
    category: expense.category,
    day: expense.day.trim(),
    amount: Number(expense.amount) || 0
  });
  saveTrips();
  renderBudget();
}

function deleteExpense(id) {
  trip.expenses = trips.trips[currentTripId].expenses = trip.expenses.filter((expense) => expense.id !== id);
  saveTrips();
  renderBudget();
}

function bindEvents() {
  els.expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addExpense({
      concept: els.expenseConcept.value,
      category: els.expenseCategory.value,
      day: els.expenseDay.value,
      amount: els.expenseAmount.value
    });
    els.expenseForm.reset();
    els.expenseConcept.focus();
  });

  els.dayBreakdown.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='delete-expense']");
    if (!button) return;
    deleteExpense(button.dataset.id);
  });

  els.budgetLimitInput.addEventListener("input", (event) => {
    trip.budgetLimit = Number(event.target.value) || 0;
    saveTrips();
    renderBudget();
  });
}

els.tripName.textContent = `${trip.name} · 13–17 de julio`;
applyTheme(darkMode);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

bindEvents();
renderBudget();
