// Constantes y utilidades compartidas entre la página principal (app.js) y la de presupuesto (budget.js).

const STORAGE_KEY = "nerja-vacation-plan-v2";
const LEGACY_KEY = "nerja-vacation-plan-v1";

const CATEGORY_COLOR_VAR = {
  Actividades: "--cat-actividades",
  "Playas y lugares": "--cat-playas",
  "Comida y cena": "--cat-comida",
  "Salir de noche": "--cat-noche",
  Notas: "--cat-notas",
  Alojamiento: "--cat-alojamiento",
  Transporte: "--cat-transporte",
  Otros: "--cat-otros"
};

const TRIP_DAYS = [
  { num: 13, short: "Lun 13", long: "Lunes 13 de julio" },
  { num: 14, short: "Mar 14", long: "Martes 14 de julio" },
  { num: 15, short: "Mié 15", long: "Miércoles 15 de julio" },
  { num: 16, short: "Jue 16", long: "Jueves 16 de julio" },
  { num: 17, short: "Vie 17", long: "Viernes 17 de julio" }
];

const GENERAL_DAY = { num: null, short: "General", long: "General / sin día" };

function matchTripDay(dayText) {
  const nums = String(dayText || "").match(/\d+/g) || [];
  for (const raw of nums) {
    const num = Number(raw);
    if (num >= 13 && num <= 17) return num;
  }
  return null;
}

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);
}

function renderBarChart(container, items, emptyMessage) {
  container.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "chart-empty";
    empty.textContent = emptyMessage;
    container.append(empty);
    return;
  }

  const max = Math.max(...items.map((item) => item.value), 0.01);

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = item.label;
    row.append(label);

    const track = document.createElement("div");
    track.className = "bar-track";
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${Math.max((item.value / max) * 100, 4)}%`;
    fill.style.background = item.color;
    track.append(fill);
    row.append(track);

    const value = document.createElement("span");
    value.className = "bar-value";
    value.textContent = formatCurrency(item.value);
    row.append(value);

    container.append(row);
  });
}

function loadDarkMode() {
  const stored = localStorage.getItem("nerja-dark-mode");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}
