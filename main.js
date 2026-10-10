const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const eur = (n) => `${n.toFixed(2).replace(".", ",")} €`;

/* Ilustraciones de producto: c = color principal, a = acento */
const art = {
  cap: (c, a) => `
    <path d="M38 118 Q36 52 100 48 Q164 52 162 118 Z" fill="${c}"/>
    <path d="M100 48 V118 M68 56 Q60 85 62 118 M132 56 Q140 85 138 118" stroke="rgba(0,0,0,.18)" stroke-width="2" fill="none"/>
    <circle cx="100" cy="48" r="5" fill="${c}" stroke="rgba(0,0,0,.25)"/>
    <path d="M30 118 Q100 104 170 118 Q186 124 176 136 Q100 120 24 136 Q14 124 30 118 Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    <text x="100" y="98" text-anchor="middle" font-family="Anton" font-size="30" fill="${a}">AJ89</text>`,
  tee: (c, a, txt = "IGHALO", num = "") => `
    <path d="M62 32 L86 22 Q100 38 114 22 L138 32 L180 62 L160 92 L144 82 L144 182 L56 182 L56 82 L40 92 L20 62 Z" fill="${c}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
    <path d="M86 22 Q100 38 114 22" stroke="${a}" stroke-width="5" fill="none"/>
    <text x="100" y="${num ? 98 : 118}" text-anchor="middle" font-family="Anton" font-size="${num ? 18 : 24}" fill="${a}" letter-spacing="2">${txt}</text>
    ${num ? `<text x="100" y="160" text-anchor="middle" font-family="Anton" font-size="58" fill="${a}">${num}</text>` : ""}`,
  hoodie: (c, a) => `
    <path d="M72 36 Q100 8 128 36 L152 42 L180 124 L158 132 L144 92 L144 184 L56 184 L56 92 L42 132 L20 124 L48 42 Z" fill="${c}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
    <path d="M78 40 Q100 62 122 40" fill="rgba(0,0,0,.25)"/>
    <path d="M92 56 V84 M108 56 V84" stroke="${a}" stroke-width="3"/>
    <rect x="72" y="138" width="56" height="30" rx="8" fill="rgba(0,0,0,.12)"/>
    <text x="100" y="122" text-anchor="middle" font-family="Anton" font-size="17" fill="${a}" letter-spacing="1">7 PAÍSES</text>`,
  bucket: (c, a) => `
    <path d="M58 112 Q62 56 100 54 Q138 56 142 112 Z" fill="${c}"/>
    <path d="M22 118 Q100 98 178 118 L188 138 Q100 118 12 138 Z" fill="${c}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>
    <rect x="58" y="100" width="84" height="12" fill="${a}"/>
    <text x="100" y="92" text-anchor="middle" font-family="Anton" font-size="20" fill="${a}">LYN '07</text>`,
  scarf: (c, a) => `
    <g transform="rotate(-24 100 100)">
      <rect x="10" y="78" width="180" height="44" fill="${c}"/>
      <rect x="10" y="78" width="22" height="44" fill="${a}"/><rect x="168" y="78" width="22" height="44" fill="${a}"/>
      <text x="100" y="111" text-anchor="middle" font-family="Anton" font-size="28" fill="${a}" letter-spacing="3">NAIJA</text>
      <path d="M12 122 v12 M18 122 v12 M24 122 v12 M30 122 v12 M170 122 v12 M176 122 v12 M182 122 v12 M188 122 v12" stroke="${c}" stroke-width="3"/>
    </g>`,
  socks: (c, a) => `
    <path d="M78 22 H128 V118 Q128 134 146 144 L168 156 Q190 172 168 186 H106 Q80 186 78 158 Z" fill="${c}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
    <rect x="78" y="22" width="50" height="14" fill="${a}"/><rect x="78" y="42" width="50" height="6" fill="${a}"/>
    <text x="103" y="100" text-anchor="middle" font-family="Anton" font-size="34" fill="${a}">24</text>`,
  print: (c, a) => `
    <rect x="40" y="18" width="120" height="164" fill="${c}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
    <path d="M62 160 C80 120 70 110 96 96 S120 70 108 56 S132 40 140 36" stroke="${a}" stroke-width="2.5" stroke-dasharray="5 5" fill="none"/>
    <circle cx="62" cy="160" r="5" fill="${a}"/><circle cx="96" cy="96" r="4" fill="${a}"/><circle cx="108" cy="56" r="4" fill="${a}"/><circle cx="140" cy="36" r="5" fill="${a}"/>
    <text x="100" y="178" text-anchor="middle" font-family="Anton" font-size="11" fill="${a}" letter-spacing="2">LA RUTA DEL GOL</text>`,
};

const products = [
  { id: "cap", cat: "gorras", name: "Gorra AJ89", price: 35, tag: "Nuevo", type: "Gorra · Ajegunle, 1989", art: "cap",
    colors: [["Negro", "#16181a", "#f0b92c"], ["Verde", "#00a35c", "#f2eee4"], ["Crema", "#efe7d2", "#00703f"]],
    sizes: ["Única"] },
  { id: "tee-gold", cat: "ropa", name: "Camiseta Bota de Oro", price: 45, tag: "AFCON 2019", type: "Camiseta · Copa África 2019", art: "tee", args: ["BOTA DE ORO", "5"],
    colors: [["Oro", "#f0b92c", "#16181a"], ["Negro", "#16181a", "#f0b92c"]],
    sizes: ["S", "M", "L", "XL"] },
  { id: "tee-eagle", cat: "ropa", name: "Camiseta Super Eagle", price: 49, type: "Camiseta · Selección de Nigeria", art: "tee", args: ["IGHALO", "16"],
    colors: [["Verde", "#00a35c", "#f2eee4"], ["Blanco", "#fbfaf6", "#00703f"]],
    sizes: ["S", "M", "L", "XL"] },
  { id: "hoodie", cat: "ropa", name: "Sudadera 7 Países", price: 69, tag: "Top ventas", type: "Sudadera · Los 7 países", art: "hoodie",
    colors: [["Negro", "#16181a", "#f2eee4"], ["Arena", "#d8ccb0", "#16181a"], ["Verde", "#00703f", "#f0b92c"]],
    sizes: ["S", "M", "L", "XL"] },
  { id: "bucket", cat: "gorras", name: "Bucket Lyn '07", price: 32, type: "Bucket · Su debut en Lyn", art: "bucket",
    colors: [["Crema", "#efe7d2", "#00703f"], ["Negro", "#16181a", "#00a35c"]],
    sizes: ["S/M", "L/XL"] },
  { id: "scarf", cat: "accesorios", name: "Bufanda Naija", price: 25, type: "Bufanda · Invierno en Watford", art: "scarf",
    colors: [["Verde", "#00a35c", "#f2eee4"], ["Negro", "#16181a", "#f0b92c"]],
    sizes: ["Única"] },
  { id: "socks", cat: "accesorios", name: "Calcetines 24", price: 15, type: "Calcetines · Pichichi en Arabia", art: "socks",
    colors: [["Blanco", "#fbfaf6", "#00a35c"], ["Oro", "#f0b92c", "#16181a"]],
    sizes: ["39-42", "43-46"] },
  { id: "print", cat: "accesorios", name: "Lámina La Ruta", price: 22, tag: "Edición limitada", type: "Lámina 50×70 · La ruta del gol", art: "print",
    colors: [["Crema", "#f6f1e4", "#00703f"], ["Noche", "#16181a", "#f0b92c"]],
    sizes: ["50×70"] },
];

const stops = [
  { year: "2005", place: "Lagos · Nigeria", club: "Julius Berger", goals: "5 goles en 10 partidos",
    text: "Crece en Ajegunle, uno de los barrios más humildes de Lagos. Tras pasar por Prime FC, sus goles en Julius Berger llaman la atención de un agente FIFA." },
  { year: "2007", place: "Oslo · Noruega", club: "Lyn", goals: "9 goles en 20 partidos",
    text: "Primer salto a Europa. Debuta en la liga noruega con 18 años y marca en su estreno." },
  { year: "2008", place: "Udine · Italia", club: "Udinese", goals: "Serie A",
    text: "Le ficha el Udinese. Apenas juega seis partidos en Serie A, pero el club le abre la puerta a España." },
  { year: "2009", place: "Granada · España", club: "Granada CF", goals: "32 goles en dos etapas",
    text: "Dos cesiones y un ascenso en 2010. En 2011 debuta en LaLiga contra el Betis." },
  { year: "2014", place: "Watford · Inglaterra", club: "Watford", goals: "20 + 15 goles",
    text: "Veinte goles para ascender a la Premier y quince más en su primera temporada en la élite. Jugador del Mes de la Premier en diciembre de 2015." },
  { year: "2017", place: "Changchun · China", club: "Changchun Yatai", goals: "36 goles en 55 partidos",
    text: "Se va a China en un traspaso de unos 20 millones de libras y termina segundo en la tabla de goleadores." },
  { year: "2019", place: "Egipto · Copa África", club: "Super Eagles", goals: "Bota de Oro · 5 goles", gold: true,
    text: "Máximo goleador del torneo, elegido en el once ideal y bronce con Nigeria. Después anuncia su retirada de la selección." },
  { year: "2020", place: "Manchester · Inglaterra", club: "Manchester United", goals: "5 goles · dorsal 25",
    text: "Llega cedido al club del que era aficionado de niño y se baja el sueldo para conseguirlo. Es el primer nigeriano de la historia del United." },
  { year: "2022", place: "Riad · Arabia Saudí", club: "Al Hilal", goals: "Pichichi · 24 goles",
    text: "Campeón de liga y máximo goleador. En 2023 marca cuatro goles en una semifinal de la Champions asiática." },
  { year: "2023", place: "La Meca · Arabia Saudí", club: "Al-Wehda", goals: "21 goles en 63 partidos",
    text: "Dos temporadas más de goles en Arabia Saudí. Su carrera suma 204 goles con clubes." },
  { year: "2026", place: "¿Próximo destino?", club: "Capítulo abierto", goals: "Agente libre", next: true,
    text: "Sin equipo desde agosto de 2025, sigue entrenando por su cuenta. La ruta todavía no ha terminado." },
];

/* Tienda */
const productsEl = $("[data-products]");
const svg = (p, col) => `<svg viewBox="0 0 200 200" aria-hidden="true">${art[p.art](col[1], col[2], ...(p.args || []))}</svg>`;

productsEl.innerHTML = products.map((p) => `
  <article class="product reveal" data-id="${p.id}" data-cat="${p.cat}" data-text="${`${p.name} ${p.type} ${p.cat}`.toLowerCase()}">
    <div class="product__stage">${svg(p, p.colors[0])}</div>
    <div class="product__body">
      ${p.tag ? `<p class="product__tag">${p.tag}</p>` : ""}
      <h3 class="product__name">${p.name}</h3>
      <p class="product__cat">${p.type}</p>
      <p class="product__colors">${p.colors.length} colores</p>
      <div class="swatches">${p.colors.map((c, i) => `<button class="swatch${i ? "" : " is-active"}" style="--sw:${c[1]}" data-color="${i}" aria-label="${c[0]}"></button>`).join("")}</div>
      <p class="product__price">${eur(p.price)}</p>
      <div class="product__buy">
        ${p.sizes.map((s, i) => `<button class="size${i ? "" : " is-active"}" data-size="${s}">${s}</button>`).join("")}
        <button class="pill pill--dark product__add">Añadir</button>
      </div>
    </div>
  </article>`).join("");

productsEl.addEventListener("click", (e) => {
  const card = e.target.closest(".product");
  if (!card) return;
  const p = products.find((x) => x.id === card.dataset.id);

  const sw = e.target.closest(".swatch");
  if (sw) {
    $$(".swatch", card).forEach((b) => b.classList.toggle("is-active", b === sw));
    const col = p.colors[sw.dataset.color];
    $(".product__stage svg", card).outerHTML = svg(p, col);
    return;
  }
  const sz = e.target.closest(".size");
  if (sz) {
    $$(".size", card).forEach((b) => b.classList.toggle("is-active", b === sz));
    return;
  }
  const add = e.target.closest(".product__add");
  if (add) {
    addToCart(p.id, +$(".swatch.is-active", card).dataset.color, $(".size.is-active", card).dataset.size);
    add.textContent = "Añadido ✓";
    add.classList.add("is-done");
    setTimeout(() => { add.textContent = "Añadir"; add.classList.remove("is-done"); }, 1400);
  }
});

const searchEl = $("[data-search]");
let filter = "all";

function applyFilter() {
  const q = searchEl.value.trim().toLowerCase();
  let shown = 0;
  $$(".product").forEach((card) => {
    const ok = (filter === "all" || card.dataset.cat === filter) && card.dataset.text.includes(q);
    card.classList.toggle("is-hidden", !ok);
    if (ok) { shown++; card.classList.add("is-in"); }
  });
  $("[data-shown]").textContent = `(${shown})`;
  $("[data-empty]").hidden = shown > 0;
}

function setFilter(value) {
  filter = value;
  $$("[data-filter]").forEach((c) => c.classList.toggle("is-active", c.dataset.filter === value));
  applyFilter();
}

$$("[data-filter]").forEach((chip) => chip.addEventListener("click", () => setFilter(chip.dataset.filter)));
$$("[data-jump]").forEach((a) => a.addEventListener("click", () => setFilter(a.dataset.jump)));
searchEl.addEventListener("input", () => {
  applyFilter();
  if (searchEl.value.trim()) $("#tienda").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});

/* Carrito */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("ighalo-cart")) || []; } catch {}
const save = () => { try { localStorage.setItem("ighalo-cart", JSON.stringify(cart)); } catch {} };

function addToCart(id, color, size) {
  const key = `${id}|${color}|${size}`;
  const line = cart.find((l) => l.key === key);
  line ? line.qty++ : cart.push({ key, id, color, size, qty: 1 });
  renderCart(true);
  toast("Añadido a la cesta");
}

function renderCart(bump = false) {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const countEl = $("[data-cart-count]");
  countEl.textContent = count;
  if (bump) { countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump"); }

  $("[data-cart-items]").innerHTML = cart.length ? cart.map((l) => {
    const p = products.find((x) => x.id === l.id);
    const col = p.colors[l.color];
    return `<li class="line" data-key="${l.key}">
      <div class="line__thumb">${svg(p, col)}</div>
      <div>
        <div class="line__name">${p.name}</div>
        <div class="line__meta">${col[0]} · ${l.size}</div>
        <div class="line__qty"><button data-q="-1" aria-label="Quitar uno">−</button>${l.qty}<button data-q="1" aria-label="Añadir uno">+</button></div>
      </div>
      <div class="line__price">${eur(p.price * l.qty)}</div>
    </li>`;
  }).join("") : `<li class="cart__empty">Tu cesta está vacía.<br>La ruta empieza con una gorra.</li>`;

  $("[data-cart-total]").textContent = eur(cart.reduce((s, l) => s + products.find((x) => x.id === l.id).price * l.qty, 0));
  save();
}

$("[data-cart-items]").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-q]");
  if (!btn) return;
  const line = cart.find((l) => l.key === btn.closest(".line").dataset.key);
  line.qty += +btn.dataset.q;
  if (line.qty <= 0) cart = cart.filter((l) => l !== line);
  renderCart();
});

$$("[data-open-cart]").forEach((b) => b.addEventListener("click", () => document.body.classList.add("cart-open")));
$$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => document.body.classList.remove("cart-open")));
addEventListener("keydown", (e) => e.key === "Escape" && document.body.classList.remove("cart-open"));
$("[data-checkout]").addEventListener("click", () => toast(cart.length ? "Demo: la pasarela de pago aún no está conectada" : "Añade algo primero"));

let toastTimer;
function toast(msg) {
  const t = $("[data-toast]");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
}

renderCart();

/* Ruta horizontal */
const route = $("#ruta");
const track = $("[data-route-track]");
const bar = $("[data-route-bar]");
track.innerHTML = stops.map((s) => `
  <article class="stop${s.gold ? " stop--gold" : ""}${s.next ? " stop--next" : ""}">
    <div class="stop__year">${s.year}</div>
    <div class="stop__place">${s.place}</div>
    <h3>${s.club}</h3>
    <p>${s.text}</p>
    <span class="stop__goals">${s.goals}</span>
  </article>`).join("");

const isWide = () => innerWidth > 860;
let travel = 0;

function sizeRoute() {
  if (!isWide()) { route.style.removeProperty("--route-h"); return; }
  travel = track.scrollWidth - innerWidth;
  route.style.setProperty("--route-h", `${travel + innerHeight}px`);
}

function onScroll() {
  if (!isWide()) return;
  const p = Math.min(1, Math.max(0, -route.getBoundingClientRect().top / (route.offsetHeight - innerHeight)));
  track.style.transform = `translateX(${-p * travel}px)`;
  bar.style.transform = `scaleX(${p})`;
  const mid = innerWidth / 2;
  $$(".stop", track).forEach((el) => {
    const r = el.getBoundingClientRect();
    el.classList.toggle("is-near", Math.abs(r.left + r.width / 2 - mid) < r.width * .6);
  });
}

addEventListener("resize", () => { sizeRoute(); onScroll(); });
addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
document.fonts.ready.then(() => { sizeRoute(); onScroll(); });
sizeRoute();

/* Reveal y contadores */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add("is-in");
  const n = en.target.querySelector("[data-count]");
  if (n) count(n);
  io.unobserve(en.target);
}), { threshold: .15 });
$$(".reveal").forEach((el) => io.observe(el));

function count(el) {
  const end = +el.dataset.count;
  if (reduced) { el.textContent = end; return; }
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / 1600);
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Avisos rotativos */
const msgs = $$(".promo__msg");
let msgIdx = 0;
if (!reduced) setInterval(() => {
  const cur = msgs[msgIdx];
  cur.classList.replace("is-on", "is-out");
  setTimeout(() => cur.classList.remove("is-out"), 500);
  msgIdx = (msgIdx + 1) % msgs.length;
  msgs[msgIdx].classList.add("is-on");
}, 4000);

/* El menú se esconde al bajar y vuelve al subir */
const nav = $(".nav");
let lastY = scrollY;
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("is-hidden", y > lastY && y > 300 && !document.body.classList.contains("cart-open"));
  lastY = y;
}, { passive: true });
