const STORAGE_KEY = "nerja-vacation-plan-v2";
const LEGACY_KEY = "nerja-vacation-plan-v1";

const initialActivities = [
  {
    id: "a1",
    title: "Kayak desde playa Burriana o playa de Maro para ver la cascada",
    category: "Actividades",
    day: "",
    notes: "Comparar salida desde Burriana y desde Maro.",
    done: false,
    favorite: true
  },
  {
    id: "a2",
    title: "Motos de agua",
    category: "Actividades",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p1",
    title: "Playa del Carabeillo",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p2",
    title: "Playa Burriana",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: true
  },
  {
    id: "p3",
    title: "Playa Calahonda",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p4",
    title: "Playa de Maro",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: true
  },
  {
    id: "p5",
    title: "Playa del Carabeo",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p6",
    title: "Playa El Salón",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p7",
    title: "Mirador de Chanquete",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p8",
    title: "Mirador del Bendito",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p9",
    title: "Cuevas de Nerja",
    category: "Playas y lugares",
    day: "",
    notes: "Mirar horario y entrada antes de ir.",
    done: false,
    favorite: false
  },
  {
    id: "p10",
    title: "Playa de piedras gordas por identificar",
    category: "Playas y lugares",
    day: "",
    notes: "Buscar el nombre exacto cuando la veamos.",
    done: false,
    favorite: false
  }
];

const quickIdeas = [
  { title: "Balcón de Europa al atardecer", category: "Playas y lugares", notes: "Buen momento para fotos y paseo." },
  { title: "Cenar pescaíto en Burriana", category: "Comida y cena", notes: "" },
  { title: "Excursión a Frigiliana", category: "Playas y lugares", notes: "Plan de medio día." },
  { title: "Ruta por el río Chíllar", category: "Actividades", notes: "Llevar calzado de agua." },
  { title: "Cala El Cañuelo", category: "Playas y lugares", notes: "Mirar acceso y aparcamiento." },
  { title: "Helado después de cenar", category: "Comida y cena", notes: "" }
];

let trips = loadTrips();
let currentTripId = trips.currentTripId || Object.keys(trips.trips)[0] || "default";
if (!trips.trips[currentTripId]) {
  trips.trips[currentTripId] = { name: "Nerja", activities: initialActivities };
  saveTrips();
}

const state = {
  activities: trips.trips[currentTripId].activities,
  status: "all",
  category: "all",
  search: "",
  editingId: null,
  darkMode: loadDarkMode()
};

const els = {
  totalCount: document.querySelector("#totalCount"),
  pendingCount: document.querySelector("#pendingCount"),
  doneCount: document.querySelector("#doneCount"),
  shareButton: document.querySelector("#shareButton"),
  resetButton: document.querySelector("#resetButton"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  activityList: document.querySelector("#activityList"),
  emptyState: document.querySelector("#emptyState"),
  quickIdeas: document.querySelector("#quickIdeas"),
  activityForm: document.querySelector("#activityForm"),
  activityTitle: document.querySelector("#activityTitle"),
  activityCategory: document.querySelector("#activityCategory"),
  activityDay: document.querySelector("#activityDay"),
  activityNotes: document.querySelector("#activityNotes"),
  editDialog: document.querySelector("#editDialog"),
  editForm: document.querySelector("#editForm"),
  editTitle: document.querySelector("#editTitle"),
  editCategory: document.querySelector("#editCategory"),
  editDay: document.querySelector("#editDay"),
  editNotes: document.querySelector("#editNotes"),
  closeDialog: document.querySelector("#closeDialog"),
  deleteButton: document.querySelector("#deleteButton"),
  darkModeToggle: document.querySelector("#darkModeToggle"),
  tripSelector: document.querySelector("#tripSelector"),
  newTripButton: document.querySelector("#newTripButton"),
  deleteTripButton: document.querySelector("#deleteTripButton"),
  exportButton: document.querySelector("#exportButton"),
  importButton: document.querySelector("#importButton"),
  importInput: document.querySelector("#importInput"),
  shareUrlButton: document.querySelector("#shareUrlButton")
};

function loadTrips() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.trips && typeof parsed.trips === "object") {
        return parsed;
      }
    } catch {}
  }

  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        const tripId = createId();
        return {
          trips: { [tripId]: { name: "Nerja", activities: parsed } },
          currentTripId: tripId
        };
      }
    } catch {}
  }

  const defaultTripId = "default";
  return {
    trips: { [defaultTripId]: { name: "Nerja", activities: initialActivities } },
    currentTripId: defaultTripId
  };
}

function saveTrips() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function saveActivities() {
  trips.trips[currentTripId].activities = state.activities;
  trips.currentTripId = currentTripId;
  saveTrips();
}

function loadDarkMode() {
  const stored = localStorage.getItem("nerja-dark-mode");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function saveDarkMode(dark) {
  localStorage.setItem("nerja-dark-mode", dark);
  state.darkMode = dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalize(value) {
  return value.trim().toLocaleLowerCase("es");
}

function getFilteredActivities() {
  const query = normalize(state.search);

  return state.activities.filter((activity) => {
    const matchesStatus =
      state.status === "all" ||
      (state.status === "pending" && !activity.done) ||
      (state.status === "done" && activity.done) ||
      (state.status === "favorite" && activity.favorite);
    const matchesCategory = state.category === "all" || activity.category === state.category;
    const haystack = normalize(`${activity.title} ${activity.category} ${activity.day} ${activity.notes}`);
    return matchesStatus && matchesCategory && haystack.includes(query);
  });
}

function groupByCategory(activities) {
  return activities.reduce((groups, activity) => {
    if (!groups.has(activity.category)) groups.set(activity.category, []);
    groups.get(activity.category).push(activity);
    return groups;
  }, new Map());
}

function renderCounts() {
  els.totalCount.textContent = state.activities.length;
  els.doneCount.textContent = state.activities.filter((activity) => activity.done).length;
  els.pendingCount.textContent = state.activities.filter((activity) => !activity.done).length;
}

function renderQuickIdeas() {
  els.quickIdeas.innerHTML = quickIdeas
    .map((idea, index) => `<button class="quick-chip" type="button" data-quick-index="${index}">${idea.title}</button>`)
    .join("");
}

function renderActivities() {
  const filtered = getFilteredActivities();
  const groups = groupByCategory(filtered);

  els.emptyState.hidden = filtered.length > 0;
  els.activityList.innerHTML = "";

  groups.forEach((activities, category) => {
    const group = document.createElement("div");
    group.className = "category-group";

    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = category;
    group.append(title);

    activities.forEach((activity) => group.append(createActivityCard(activity)));
    els.activityList.append(group);
  });
}

function createActivityCard(activity) {
  const card = document.createElement("article");
  card.className = `activity-card${activity.done ? " is-done" : ""}`;

  const checkButton = document.createElement("button");
  checkButton.className = `check-button${activity.done ? " is-done" : ""}`;
  checkButton.type = "button";
  checkButton.dataset.action = "toggle-done";
  checkButton.dataset.id = activity.id;
  checkButton.title = activity.done ? "Marcar pendiente" : "Marcar hecho";
  checkButton.setAttribute("aria-label", checkButton.title);
  checkButton.innerHTML = activity.done ? icon("check") : icon("circle");

  const main = document.createElement("div");
  main.className = "activity-main";

  const title = document.createElement("h3");
  title.className = "activity-title";
  title.textContent = activity.title;
  main.append(title);

  const meta = document.createElement("div");
  meta.className = "activity-meta";
  meta.innerHTML = `<span class="pill">${activity.category}</span>`;
  if (activity.day) {
    const day = document.createElement("span");
    day.className = "pill";
    day.textContent = activity.day;
    meta.append(day);
  }
  main.append(meta);

  if (activity.notes) {
    const notes = document.createElement("p");
    notes.className = "activity-notes";
    notes.textContent = activity.notes;
    main.append(notes);
  }

  const actions = document.createElement("div");
  actions.className = "activity-actions";
  actions.innerHTML = `
    <button class="favorite-button${activity.favorite ? " is-favorite" : ""}" type="button" data-action="toggle-favorite" data-id="${activity.id}" aria-label="${activity.favorite ? "Quitar favorita" : "Marcar favorita"}" title="${activity.favorite ? "Quitar favorita" : "Marcar favorita"}">
      ${icon("star")}
    </button>
    <button class="duplicate-button" type="button" data-action="duplicate" data-id="${activity.id}" aria-label="Duplicar" title="Duplicar">
      ${icon("duplicate")}
    </button>
    <button class="edit-button" type="button" data-action="edit" data-id="${activity.id}" aria-label="Editar" title="Editar">
      ${icon("edit")}
    </button>
  `;

  card.append(checkButton, main, actions);
  return card;
}

function icon(name) {
  const icons = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>',
    circle: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z"></path></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    duplicate: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="1"/><path d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4"/></svg>'
  };
  return icons[name];
}

function render() {
  renderCounts();
  renderActivities();
}

function addActivity(activity) {
  state.activities.unshift({
    id: createId(),
    title: activity.title.trim(),
    category: activity.category,
    day: activity.day.trim(),
    notes: activity.notes.trim(),
    done: false,
    favorite: false
  });
  saveActivities();
  render();
}

function updateActivity(id, patch) {
  state.activities = state.activities.map((activity) => (activity.id === id ? { ...activity, ...patch } : activity));
  saveActivities();
  render();
}

function deleteActivity(id) {
  state.activities = state.activities.filter((activity) => activity.id !== id);
  saveActivities();
  render();
}

function openEditor(id) {
  const activity = state.activities.find((item) => item.id === id);
  if (!activity) return;

  state.editingId = id;
  els.editTitle.value = activity.title;
  els.editCategory.value = activity.category;
  els.editDay.value = activity.day;
  els.editNotes.value = activity.notes;
  els.editDialog.showModal();
}

function getShareText() {
  const pending = state.activities.filter((activity) => !activity.done);
  const done = state.activities.filter((activity) => activity.done);
  const lines = ["Nerja actividades", "", "Pendientes:"];

  pending.forEach((activity) => {
    lines.push(`- ${activity.title}${activity.day ? ` (${activity.day})` : ""}`);
  });

  if (done.length) {
    lines.push("", "Hechas:");
    done.forEach((activity) => lines.push(`- ${activity.title}`));
  }

  return lines.join("\n");
}

async function sharePlan() {
  const text = getShareText();

  if (navigator.share) {
    await navigator.share({ title: "Nerja actividades", text });
    return;
  }

  await navigator.clipboard.writeText(text);
  els.shareButton.title = "Plan copiado";
  setTimeout(() => {
    els.shareButton.title = "Compartir plan";
  }, 1600);
}

function duplicateActivity(id) {
  const activity = state.activities.find((item) => item.id === id);
  if (!activity) return;

  addActivity({
    title: activity.title,
    category: activity.category,
    day: activity.day,
    notes: activity.notes
  });
}

function encodeShareUrl() {
  const data = JSON.stringify(state.activities);
  const encoded = btoa(unescape(encodeURIComponent(data)));
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
}

async function shareUrl() {
  const url = encodeShareUrl();
  if (navigator.share) {
    await navigator.share({ title: "Nerja actividades", url });
    return;
  }
  await navigator.clipboard.writeText(url);
  els.shareUrlButton.title = "Link copiado";
  setTimeout(() => {
    els.shareUrlButton.title = "Compartir link";
  }, 1600);
}

function decodeShareUrl() {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  try {
    const decoded = decodeURIComponent(escape(atob(hash)));
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function exportPlan() {
  const data = {
    name: trips.trips[currentTripId].name,
    exported: new Date().toISOString(),
    activities: state.activities
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nerja-plan-${trips.trips[currentTripId].name.replace(/\s+/g, "-").toLowerCase()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importPlan() {
  els.importInput.click();
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      const activities = Array.isArray(imported) ? imported : imported.activities;
      if (!Array.isArray(activities)) throw new Error("Invalid format");

      state.activities = activities.map((a) => ({
        ...a,
        id: a.id || createId()
      }));
      saveActivities();
      render();
      alert("Plan importado exitosamente");
    } catch (err) {
      alert("Error importando el archivo: " + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function createTrip() {
  const name = prompt("Nombre del viaje (ej: Barcelona 2026):");
  if (!name) return;

  const tripId = createId();
  trips.trips[tripId] = { name, activities: [] };
  currentTripId = tripId;
  trips.currentTripId = tripId;
  state.activities = [];
  saveTrips();
  renderTripsSelector();
  render();
}

function switchTrip(tripId) {
  currentTripId = tripId;
  state.activities = trips.trips[tripId].activities;
  trips.currentTripId = tripId;
  saveTrips();
  render();
}

function deleteTrip(tripId) {
  if (Object.keys(trips.trips).length <= 1) {
    alert("No puedes eliminar el último viaje");
    return;
  }

  if (!confirm(`Eliminar viaje "${trips.trips[tripId].name}"?`)) return;

  delete trips.trips[tripId];
  const remaining = Object.keys(trips.trips);
  currentTripId = remaining[0];
  state.activities = trips.trips[currentTripId].activities;
  trips.currentTripId = currentTripId;
  saveTrips();
  renderTripsSelector();
  render();
}

function renderTripsSelector() {
  els.tripSelector.innerHTML = Object.entries(trips.trips)
    .map(([id, trip]) => `<option value="${id}" ${id === currentTripId ? "selected" : ""}>${trip.name}</option>`)
    .join("");
}

function bindEvents() {
  els.activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addActivity({
      title: els.activityTitle.value,
      category: els.activityCategory.value,
      day: els.activityDay.value,
      notes: els.activityNotes.value
    });
    els.activityForm.reset();
    els.activityTitle.focus();
  });

  document.querySelectorAll("[data-filter-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.status = button.dataset.filterStatus;
      document.querySelectorAll("[data-filter-status]").forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderActivities();
  });

  els.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderActivities();
  });

  els.quickIdeas.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick-index]");
    if (!button) return;
    const idea = quickIdeas[Number(button.dataset.quickIndex)];
    addActivity({ ...idea, day: "" });
  });

  els.activityList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const activity = state.activities.find((item) => item.id === button.dataset.id);
    if (!activity) return;

    if (button.dataset.action === "toggle-done") {
      updateActivity(activity.id, { done: !activity.done });
    }

    if (button.dataset.action === "toggle-favorite") {
      updateActivity(activity.id, { favorite: !activity.favorite });
    }

    if (button.dataset.action === "duplicate") {
      duplicateActivity(activity.id);
    }

    if (button.dataset.action === "edit") {
      openEditor(activity.id);
    }
  });

  els.editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateActivity(state.editingId, {
      title: els.editTitle.value.trim(),
      category: els.editCategory.value,
      day: els.editDay.value.trim(),
      notes: els.editNotes.value.trim()
    });
    els.editDialog.close();
  });

  els.closeDialog.addEventListener("click", () => els.editDialog.close());

  els.deleteButton.addEventListener("click", () => {
    deleteActivity(state.editingId);
    els.editDialog.close();
  });

  els.resetButton.addEventListener("click", () => {
    state.activities = initialActivities;
    saveActivities();
    render();
  });

  els.shareButton.addEventListener("click", () => {
    sharePlan().catch(() => {});
  });

  els.darkModeToggle.addEventListener("click", () => {
    saveDarkMode(!state.darkMode);
  });

  els.tripSelector.addEventListener("change", (event) => {
    switchTrip(event.target.value);
  });

  els.newTripButton.addEventListener("click", () => {
    createTrip();
  });

  els.deleteTripButton.addEventListener("click", () => {
    deleteTrip(currentTripId);
  });

  els.exportButton.addEventListener("click", () => {
    exportPlan();
  });

  els.importButton.addEventListener("click", () => {
    importPlan();
  });

  els.importInput.addEventListener("change", handleImportFile);

  els.shareUrlButton.addEventListener("click", () => {
    shareUrl().catch(() => {});
  });
}

const sharedData = decodeShareUrl();
if (sharedData) {
  state.activities = sharedData;
} else if (window.location.hash) {
  window.history.replaceState(null, "", window.location.pathname);
}

document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
els.darkModeToggle.setAttribute("aria-pressed", state.darkMode ? "true" : "false");

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

renderQuickIdeas();
renderTripsSelector();
bindEvents();
render();
