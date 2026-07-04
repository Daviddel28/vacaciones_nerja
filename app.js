// STORAGE_KEY, LEGACY_KEY, CATEGORY_COLOR_VAR, TRIP_DAYS, GENERAL_DAY,
// matchTripDay, createId, formatCurrency, renderBarChart y loadDarkMode
// viven ahora en shared.js (cargado antes que este archivo).

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
    notes: "Comprar entrada online 48h antes; gratis a las 9:30. Visita guiada, en verano hay conciertos.",
    done: false,
    favorite: true
  },
  {
    id: "p10",
    title: "Playa de piedras gordas por identificar",
    category: "Playas y lugares",
    day: "",
    notes: "Buscar el nombre exacto cuando la veamos.",
    done: false,
    favorite: false
  },
  {
    id: "p11",
    title: "Balcón de Europa",
    category: "Playas y lugares",
    day: "",
    notes: "Ir al atardecer para fotos y paseo.",
    done: false,
    favorite: true
  },
  {
    id: "p12",
    title: "Cala El Cañuelo",
    category: "Playas y lugares",
    day: "",
    notes: "Mirar acceso y aparcamiento.",
    done: false,
    favorite: false
  },
  {
    id: "p13",
    title: "Cala Torre del Pino",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p14",
    title: "Playa Peñón del Cuervo",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p15",
    title: "Playa El Playazo",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p16",
    title: "Playa La Torrecilla",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p17",
    title: "Playa Güilche",
    category: "Playas y lugares",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "p18",
    title: "Río Chíllar",
    category: "Playas y lugares",
    day: "",
    notes: "Llevar calzado de agua.",
    done: false,
    favorite: false
  },
  {
    id: "p19",
    title: "Frigiliana",
    category: "Playas y lugares",
    day: "",
    notes: "Excursión de un día. Definir traslados Nerja ↔ Frigiliana.",
    done: false,
    favorite: false
  },
  {
    id: "a3",
    title: "Vía ferrata en los acantilados",
    category: "Actividades",
    day: "",
    notes: "Ir con guía.",
    done: false,
    favorite: false
  },
  {
    id: "a4",
    title: "Paseo de compras por el centro y mercados artesanales",
    category: "Actividades",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "a5",
    title: "Snorkel en la Playa del Molino de Papel",
    category: "Actividades",
    day: "",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "c1",
    title: "La Marina Marisquería",
    category: "Comida y cena",
    day: "",
    notes: "Buen precio y producto fresco.",
    done: false,
    favorite: false
  },
  {
    id: "c2",
    title: "Restaurante Ayo",
    category: "Comida y cena",
    day: "",
    notes: "Paellas a leña en Playa de Burriana.",
    done: false,
    favorite: false
  },
  {
    id: "c3",
    title: "Restaurante El Pulguilla",
    category: "Comida y cena",
    day: "",
    notes: "Tapas de marisco y frituras.",
    done: false,
    favorite: false
  },
  {
    id: "c4",
    title: "Oliva",
    category: "Comida y cena",
    day: "",
    notes: "Cocina creativa en calle tranquila.",
    done: false,
    favorite: false
  },
  {
    id: "c5",
    title: "Bakus",
    category: "Comida y cena",
    day: "",
    notes: "Terraza con vistas, ideal para cena.",
    done: false,
    favorite: false
  },
  {
    id: "c6",
    title: "La Puntilla",
    category: "Comida y cena",
    day: "",
    notes: "Escondido, comida casera top.",
    done: false,
    favorite: false
  },
  {
    id: "c7",
    title: "Los Barriles",
    category: "Comida y cena",
    day: "",
    notes: "Pinchos y ambiente local.",
    done: false,
    favorite: false
  },
  {
    id: "c8",
    title: "Desayunos (rotación)",
    category: "Comida y cena",
    day: "",
    notes: "Pan tostado con mantequilla y jamón cocido / cereales, barritas o tortitas de trigo / batidos o zumos / fruta.",
    done: false,
    favorite: false
  },
  {
    id: "c9",
    title: "Comida (air fryer): hamburguesas con garbanzos o pollo desmenuzado",
    category: "Comida y cena",
    day: "Lun 13",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "c10",
    title: "Comida (air fryer): filetes de pollo con patatas",
    category: "Comida y cena",
    day: "Mar 14",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "c11",
    title: "Comida (air fryer): tortilla de patata con ensalada",
    category: "Comida y cena",
    day: "Mié 15",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "c12",
    title: "Comida (air fryer): bocadillos con lomo",
    category: "Comida y cena",
    day: "Jue 16",
    notes: "",
    done: false,
    favorite: false
  },
  {
    id: "s1",
    title: "Cochran's Pub",
    category: "Salir de noche",
    day: "",
    notes: "Vistas brutales.",
    done: false,
    favorite: false
  },
  {
    id: "s2",
    title: "La Guarida",
    category: "Salir de noche",
    day: "",
    notes: "Música en vivo.",
    done: false,
    favorite: false
  },
  {
    id: "s3",
    title: "La Dama",
    category: "Salir de noche",
    day: "",
    notes: "Coctelería íntima.",
    done: false,
    favorite: false
  },
  {
    id: "s4",
    title: "The Garden",
    category: "Salir de noche",
    day: "",
    notes: "Terraza secreta.",
    done: false,
    favorite: false
  },
  {
    id: "s5",
    title: "Bar Redondo",
    category: "Salir de noche",
    day: "",
    notes: "Tapas + copas.",
    done: false,
    favorite: false
  },
  {
    id: "x1",
    title: "Alojamiento: Abril Hotel",
    category: "Notas",
    day: "4 noches",
    notes: "Pintada, 124, 29780 Nerja. Precio total aprox. 450€. Reserva: https://www.booking.com/Share-6RU77M",
    done: true,
    favorite: true
  },
  {
    id: "x2",
    title: "Ruta Córdoba → Nerja",
    category: "Notas",
    day: "",
    notes: "Pendiente definir hora de salida, distancia y tiempo estimado.",
    done: false,
    favorite: false
  },
  {
    id: "x3",
    title: "Plan diario día a día",
    category: "Notas",
    day: "",
    notes: "Definir actividades concretas para cada uno de los 7 días del viaje.",
    done: false,
    favorite: false
  },
  {
    id: "x4",
    title: "Presupuesto comidas y actividades",
    category: "Notas",
    day: "",
    notes: "Pendiente calcular presupuesto total estimado.",
    done: false,
    favorite: false
  }
];

const initialExpenses = [
  {
    id: "e1",
    concept: "Alojamiento (Abril Hotel, 4 noches)",
    category: "Alojamiento",
    day: "",
    amount: 450
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
  trips.trips[currentTripId] = { name: "Nerja", activities: initialActivities, expenses: initialExpenses, budgetLimit: 0 };
  saveTrips();
}

Object.values(trips.trips).forEach((trip) => {
  if (!Array.isArray(trip.expenses)) trip.expenses = [];
  if (typeof trip.budgetLimit !== "number") trip.budgetLimit = 0;
});

const state = {
  activities: trips.trips[currentTripId].activities,
  expenses: trips.trips[currentTripId].expenses,
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
  activityPrice: document.querySelector("#activityPrice"),
  activityNotes: document.querySelector("#activityNotes"),
  editDialog: document.querySelector("#editDialog"),
  editForm: document.querySelector("#editForm"),
  editTitle: document.querySelector("#editTitle"),
  editCategory: document.querySelector("#editCategory"),
  editDay: document.querySelector("#editDay"),
  editPrice: document.querySelector("#editPrice"),
  editNotes: document.querySelector("#editNotes"),
  closeDialog: document.querySelector("#closeDialog"),
  deleteButton: document.querySelector("#deleteButton"),
  tripSelector: document.querySelector("#tripSelector"),
  newTripButton: document.querySelector("#newTripButton"),
  deleteTripButton: document.querySelector("#deleteTripButton"),
  exportButton: document.querySelector("#exportButton"),
  importButton: document.querySelector("#importButton"),
  importInput: document.querySelector("#importInput"),
  confirmedList: document.querySelector("#confirmedList"),
  confirmedCount: document.querySelector("#confirmedCount"),
  confirmedEmpty: document.querySelector("#confirmedEmpty"),
  favoritesByDay: document.querySelector("#favoritesByDay"),
  favoritesCount: document.querySelector("#favoritesCount"),
  favoritesEmpty: document.querySelector("#favoritesEmpty")
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
          trips: { [tripId]: { name: "Nerja", activities: parsed, expenses: [], budgetLimit: 0 } },
          currentTripId: tripId
        };
      }
    } catch {}
  }

  const defaultTripId = "default";
  return {
    trips: { [defaultTripId]: { name: "Nerja", activities: initialActivities, expenses: initialExpenses, budgetLimit: 0 } },
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

function saveExpenses() {
  trips.trips[currentTripId].expenses = state.expenses;
  trips.currentTripId = currentTripId;
  saveTrips();
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
    const group = document.createElement("details");
    group.className = "category-group";
    group.open = true;

    const summary = document.createElement("summary");
    summary.className = "category-title";
    summary.dataset.category = category;

    const label = document.createElement("span");
    label.className = "category-title-label";
    label.textContent = category;
    summary.append(label);

    const count = document.createElement("span");
    count.className = "category-title-count";
    count.textContent = activities.length;
    summary.append(count);

    group.append(summary);

    const cards = document.createElement("div");
    cards.className = "category-cards";
    activities.forEach((activity) => cards.append(createActivityCard(activity)));
    group.append(cards);

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
  meta.innerHTML = `<span class="pill pill-category" data-category="${activity.category}">${activity.category}</span>`;
  if (activity.day) {
    const day = document.createElement("span");
    day.className = "pill";
    day.textContent = activity.day;
    meta.append(day);
  }
  if (activity.price > 0) {
    const price = document.createElement("span");
    price.className = "pill pill-price";
    price.textContent = formatCurrency(activity.price);
    meta.append(price);
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
    <button class="favorite-button${activity.favorite ? " is-favorite" : ""}" type="button" data-action="toggle-favorite" data-id="${activity.id}" aria-label="${activity.favorite ? "Quitar de confirmadas" : "Confirmar para el viaje"}" title="${activity.favorite ? "Quitar de confirmadas" : "Confirmar para el viaje"}">
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
    duplicate: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="1"/><path d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
  };
  return icons[name];
}

function render() {
  renderCounts();
  renderActivities();
  renderConfirmedPanel();
  renderFavoritesByDay();
}

function createFavoriteRow(activity) {
  const row = document.createElement("article");
  row.className = "fav-item";

  const main = document.createElement("div");
  main.className = "fav-item-main";

  const title = document.createElement("span");
  title.className = "fav-item-title";
  title.textContent = activity.title;
  main.append(title);

  const meta = document.createElement("div");
  meta.className = "fav-item-meta";
  meta.innerHTML = `<span class="pill pill-category" data-category="${activity.category}">${activity.category}</span>`;
  if (activity.price > 0) {
    const price = document.createElement("span");
    price.className = "pill pill-price";
    price.textContent = formatCurrency(activity.price);
    meta.append(price);
  }
  main.append(meta);

  if (activity.notes) {
    const notes = document.createElement("p");
    notes.className = "fav-item-notes";
    notes.textContent = activity.notes;
    main.append(notes);
  }

  const actions = document.createElement("div");
  actions.className = "fav-item-actions";

  const select = document.createElement("select");
  select.className = "fav-day-select";
  select.dataset.action = "set-fav-day";
  select.dataset.id = activity.id;
  select.setAttribute("aria-label", "Asignar día");
  const current = matchTripDay(activity.day);
  [GENERAL_DAY, ...TRIP_DAYS].forEach((day) => {
    const option = document.createElement("option");
    option.value = day.num === null ? "" : day.short;
    option.textContent = day.short;
    if (day.num === current) option.selected = true;
    select.append(option);
  });
  actions.append(select);

  const editButton = document.createElement("button");
  editButton.className = "icon-button small";
  editButton.type = "button";
  editButton.dataset.action = "edit-fav";
  editButton.dataset.id = activity.id;
  editButton.title = "Editar detalles";
  editButton.setAttribute("aria-label", "Editar detalles");
  editButton.innerHTML = icon("edit");
  actions.append(editButton);

  row.append(main, actions);
  return row;
}

function renderFavoritesByDay() {
  const favorites = state.activities.filter((activity) => activity.favorite);

  els.favoritesCount.textContent = favorites.length;
  els.favoritesEmpty.hidden = favorites.length > 0;
  els.favoritesByDay.innerHTML = "";

  if (favorites.length === 0) return;

  [...TRIP_DAYS, GENERAL_DAY].forEach((day) => {
    const dayFavs = favorites.filter((activity) => matchTripDay(activity.day) === day.num);
    if (day.num === null && dayFavs.length === 0) return;

    const card = document.createElement("section");
    card.className = "day-card";

    const header = document.createElement("div");
    header.className = "day-card-header";
    const heading = document.createElement("h3");
    heading.textContent = day.long;
    const count = document.createElement("span");
    count.className = "day-card-total";
    count.textContent = `${dayFavs.length} ${dayFavs.length === 1 ? "plan" : "planes"}`;
    header.append(heading, count);
    card.append(header);

    if (dayFavs.length === 0) {
      const empty = document.createElement("p");
      empty.className = "day-card-empty";
      empty.textContent = "Sin favoritas asignadas a este día.";
      card.append(empty);
    } else {
      const list = document.createElement("div");
      list.className = "day-items";
      dayFavs.forEach((activity) => list.append(createFavoriteRow(activity)));
      card.append(list);
    }

    els.favoritesByDay.append(card);
  });
}

function renderConfirmedPanel() {
  const confirmed = state.activities.filter((activity) => activity.favorite);

  els.confirmedCount.textContent = confirmed.length;
  els.confirmedEmpty.hidden = confirmed.length > 0;
  els.confirmedList.innerHTML = "";

  confirmed.forEach((activity) => {
    const chip = document.createElement("span");
    chip.className = "confirmed-chip";

    const label = document.createElement("span");
    label.textContent = activity.title;
    chip.append(label);

    const unpinButton = document.createElement("button");
    unpinButton.type = "button";
    unpinButton.dataset.action = "unpin-confirmed";
    unpinButton.dataset.id = activity.id;
    unpinButton.title = "Quitar de confirmadas";
    unpinButton.setAttribute("aria-label", "Quitar de confirmadas");
    unpinButton.innerHTML = icon("close");
    chip.append(unpinButton);

    els.confirmedList.append(chip);
  });
}

function addActivity(activity) {
  state.activities.unshift({
    id: createId(),
    title: activity.title.trim(),
    category: activity.category,
    day: activity.day.trim(),
    price: Number(activity.price) || 0,
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
  els.editPrice.value = activity.price > 0 ? activity.price : "";
  els.editNotes.value = activity.notes;
  els.editDialog.showModal();
}

function duplicateActivity(id) {
  const activity = state.activities.find((item) => item.id === id);
  if (!activity) return;

  addActivity({
    title: activity.title,
    category: activity.category,
    day: activity.day,
    price: activity.price || 0,
    notes: activity.notes
  });
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
    activities: state.activities,
    expenses: state.expenses,
    budgetLimit: trips.trips[currentTripId].budgetLimit
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
      const expenses = Array.isArray(imported.expenses) ? imported.expenses : [];

      state.activities = activities.map((a) => ({
        ...a,
        id: a.id || createId()
      }));
      state.expenses = expenses.map((exp) => ({
        ...exp,
        id: exp.id || createId()
      }));
      trips.trips[currentTripId].budgetLimit = typeof imported.budgetLimit === "number" ? imported.budgetLimit : 0;
      saveActivities();
      saveExpenses();
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
  trips.trips[tripId] = { name, activities: [], expenses: [], budgetLimit: 0 };
  currentTripId = tripId;
  trips.currentTripId = tripId;
  state.activities = [];
  state.expenses = [];
  saveTrips();
  renderTripsSelector();
  render();
}

function switchTrip(tripId) {
  currentTripId = tripId;
  state.activities = trips.trips[tripId].activities;
  state.expenses = trips.trips[tripId].expenses;
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
  state.expenses = trips.trips[currentTripId].expenses;
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
      price: els.activityPrice.value,
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
      price: Number(els.editPrice.value) || 0,
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
    state.expenses = initialExpenses;
    saveActivities();
    saveExpenses();
    render();
  });

  els.confirmedList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='unpin-confirmed']");
    if (!button) return;
    updateActivity(button.dataset.id, { favorite: false });
  });

  els.favoritesByDay.addEventListener("change", (event) => {
    const select = event.target.closest("[data-action='set-fav-day']");
    if (!select) return;
    updateActivity(select.dataset.id, { day: select.value });
  });

  els.favoritesByDay.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='edit-fav']");
    if (!button) return;
    openEditor(button.dataset.id);
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
}

const sharedData = decodeShareUrl();
if (sharedData) {
  state.activities = sharedData;
} else if (window.location.hash) {
  window.history.replaceState(null, "", window.location.pathname);
}

applyTheme(state.darkMode);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

renderQuickIdeas();
renderTripsSelector();
bindEvents();
render();
