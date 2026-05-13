/* =============================================
   STARBUCKS CAFE — script.js
   Complete Interactive Logic
   ============================================= */

// =============================================
// PRODUCT DATA — All 25+ products
// =============================================
const PRODUCTS = [
  // Hot Coffee
  { id: 1,  name: "Espresso",              category: "Hot Coffee",   price: 120, icon: "☕", desc: "Rich, bold single shot of premium espresso." },
  { id: 2,  name: "Cappuccino",            category: "Hot Coffee",   price: 180, icon: "☕", desc: "Espresso topped with creamy steamed milk foam." },
  { id: 3,  name: "Latte",                 category: "Hot Coffee",   price: 200, icon: "☕", desc: "Smooth espresso with velvety steamed milk." },
  { id: 4,  name: "Americano",             category: "Hot Coffee",   price: 160, icon: "☕", desc: "Espresso diluted with hot water for a milder taste." },
  { id: 5,  name: "Mocha",                 category: "Hot Coffee",   price: 220, icon: "☕", desc: "Espresso blended with rich chocolate and milk." },

  // Cold Coffee
  { id: 6,  name: "Iced Latte",            category: "Cold Coffee",  price: 210, icon: "🧊", desc: "Chilled espresso poured over ice with milk." },
  { id: 7,  name: "Cold Brew",             category: "Cold Coffee",  price: 240, icon: "🧊", desc: "Slow-steeped coffee for a smooth, bold flavour." },
  { id: 8,  name: "Iced Americano",        category: "Cold Coffee",  price: 180, icon: "🧊", desc: "Espresso over ice — refreshing and strong." },
  { id: 9,  name: "Chocolate Cold Coffee", category: "Cold Coffee",  price: 230, icon: "🍫", desc: "Cold coffee swirled with dark chocolate syrup." },
  { id: 10, name: "Caramel Cold Coffee",   category: "Cold Coffee",  price: 250, icon: "🍮", desc: "Cold brew drizzled with silky caramel sauce." },

  // Tea
  { id: 11, name: "Masala Chai",           category: "Tea",          price: 80,  icon: "🍵", desc: "Classic Indian spiced tea with ginger & cardamom." },
  { id: 12, name: "Green Tea",             category: "Tea",          price: 100, icon: "🍵", desc: "Light, refreshing green tea full of antioxidants." },
  { id: 13, name: "Lemon Tea",             category: "Tea",          price: 90,  icon: "🍋", desc: "Zesty brewed tea with fresh lemon slices." },

  // Frappuccino
  { id: 14, name: "Java Chip Frappuccino", category: "Frappuccino",  price: 290, icon: "🥤", desc: "Blended coffee with chocolate chips & whipped cream." },
  { id: 15, name: "Caramel Frappuccino",   category: "Frappuccino",  price: 300, icon: "🥤", desc: "Sweet caramel blended with coffee and ice." },
  { id: 16, name: "Mocha Frappuccino",     category: "Frappuccino",  price: 310, icon: "🥤", desc: "Chocolate mocha blended frappuccino." },

  // Snacks
  { id: 17, name: "Veg Sandwich",          category: "Snacks",       price: 150, icon: "🥪", desc: "Fresh veggies in toasted brown bread." },
  { id: 18, name: "Cheese Sandwich",       category: "Snacks",       price: 180, icon: "🧀", desc: "Grilled cheese sandwich with herbs." },
  { id: 19, name: "Garlic Bread",          category: "Snacks",       price: 130, icon: "🥖", desc: "Crispy garlic bread with herb butter." },
  { id: 20, name: "French Fries",          category: "Snacks",       price: 140, icon: "🍟", desc: "Golden crispy fries with dipping sauce." },

  // Desserts
  { id: 21, name: "Chocolate Muffin",      category: "Desserts",     price: 120, icon: "🧁", desc: "Moist double chocolate chip muffin." },
  { id: 22, name: "Brownie",               category: "Desserts",     price: 150, icon: "🍫", desc: "Fudgy dark chocolate walnut brownie." },
  { id: 23, name: "Cheesecake",            category: "Desserts",     price: 220, icon: "🍰", desc: "New York-style creamy baked cheesecake." },
  { id: 24, name: "Donut",                 category: "Desserts",     price: 100, icon: "🍩", desc: "Glazed ring donut — soft, sweet & classic." },
  { id: 25, name: "Chocolate Cake",        category: "Desserts",     price: 250, icon: "🎂", desc: "Rich layered chocolate cake with ganache." },
];

// =============================================
// CART — Load from localStorage if available
// =============================================
let cart = JSON.parse(localStorage.getItem("sbCart")) || [];

// Active filter state
let activeFilter = "All";
let searchQuery  = "";

// =============================================
// INIT — Run on page load
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  updateCartBadge();
  initTheme();
  initNavbarScroll();
  initHamburger();
  initNavActiveLinks();
});

// =============================================
// THEME TOGGLE (Light / Dark)
// =============================================
function initTheme() {
  const saved = localStorage.getItem("sbTheme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateToggleIcon(saved);
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("sbTheme", next);
  updateToggleIcon(next);
});

function updateToggleIcon(theme) {
  document.getElementById("toggleIcon").textContent = theme === "dark" ? "☀️" : "🌙";
}

// =============================================
// NAVBAR — Sticky shadow + active links + hamburger
// =============================================
function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    const nb = document.getElementById("navbar");
    nb.style.boxShadow = window.scrollY > 10
      ? "0 4px 30px var(--shadow-lg)"
      : "0 2px 20px var(--shadow)";
  });
}

function initHamburger() {
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("navLinks");

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    menu.classList.toggle("open");
  });

  // Close on link click (mobile)
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      btn.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

function initNavActiveLinks() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(l => {
      l.classList.remove("active");
      if (l.getAttribute("href") === `#${current}`) l.classList.add("active");
    });
  });
}

// Cart button scroll
document.getElementById("cartBtn").addEventListener("click", () => {
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
});

// =============================================
// RENDER PRODUCTS
// =============================================
function renderProducts() {
  const grid    = document.getElementById("productsGrid");
  const noRes   = document.getElementById("noResults");
  const filtered = getFilteredProducts();

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noRes.style.display = "block";
    return;
  }
  noRes.style.display = "none";

  filtered.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${idx * 0.05}s`;
    card.innerHTML = `
      <div class="product-image-wrap">${p.icon}</div>
      <div class="product-body">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price}</span>
          <button class="add-to-cart" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// =============================================
// FILTERING
// =============================================
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCategory = activeFilter === "All" || p.category === activeFilter;
    const matchSearch   = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
}

// Called by filter buttons
function filterProducts(category, btn) {
  activeFilter = category;

  // Update active button
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderProducts();
}

// Called by category cards in the categories section
function filterByCategory(category) {
  activeFilter = category;
  searchQuery  = "";
  document.getElementById("searchInput").value = "";

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.remove("active");
    if (b.textContent.trim() === category) b.classList.add("active");
  });

  renderProducts();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// =============================================
// SEARCH
// =============================================
function searchProducts() {
  searchQuery = document.getElementById("searchInput").value;
  renderProducts();
}

// =============================================
// CART — Add / Update / Remove
// =============================================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
  updateCartBadge();
  showAddedFeedback(productId);
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    renderCart();
    updateCartBadge();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  renderCart();
  updateCartBadge();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateCartBadge();
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("sbCart", JSON.stringify(cart));
}

// =============================================
// RENDER CART UI
// =============================================
function renderCart() {
  const itemsEl   = document.getElementById("cartItems");
  const summaryEl = document.getElementById("cartSummary");

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="empty-cart">
        <p>☕</p>
        <p>Your cart is empty.</p>
        <p>Add items from the menu above!</p>
      </div>`;
    summaryEl.style.display = "none";
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-icon">${item.icon}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">🗑</button>
    </div>
  `).join("");

  // Calculate totals
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const gst      = Math.round(subtotal * 0.05);
  const total    = subtotal + gst;

  document.getElementById("subtotal").textContent = `₹${subtotal}`;
  document.getElementById("gstAmt").textContent   = `₹${gst}`;
  document.getElementById("totalAmt").textContent = `₹${total}`;
  summaryEl.style.display = "block";
}

// =============================================
// CART BADGE
// =============================================
function updateCartBadge() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById("cartCount").textContent    = count;
  document.getElementById("floatingCount").textContent = count;

  const floatingBtn = document.getElementById("floatingCart");
  if (count > 0) floatingBtn.classList.add("show");
  else            floatingBtn.classList.remove("show");

  // Pulse animation
  const badge = document.getElementById("cartCount");
  badge.classList.remove("pulse");
  void badge.offsetWidth; // reflow to restart animation
  badge.classList.add("pulse");
}

// Visual "added" feedback on button
function showAddedFeedback(productId) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const addBtn = card.querySelector(".add-to-cart");
    const nameEl = card.querySelector(".product-name");
    if (nameEl && addBtn) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (product && nameEl.textContent === product.name) {
        addBtn.textContent = "✓ Added!";
        addBtn.style.background = "linear-gradient(135deg, #c9963a, #a0742a)";
        setTimeout(() => {
          addBtn.textContent = "+ Add";
          addBtn.style.background = "";
        }, 1200);
      }
    }
  });
}

// =============================================
// PLACE ORDER
// =============================================
function placeOrder() {
  // Validate cart
  if (cart.length === 0) {
    alert("🛒 Your cart is empty! Please add items before placing an order.");
    return;
  }

  // Get form values
  const name    = document.getElementById("custName").value.trim();
  const phone   = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const type    = document.getElementById("orderType").value;
  const payment = document.getElementById("paymentMethod").value;

  // Basic validation
  if (!name)              { alert("Please enter your name."); return; }
  if (!/^\d{10}$/.test(phone)) { alert("Please enter a valid 10-digit mobile number."); return; }
  if (!address)           { alert("Please enter your address."); return; }

  // Calculate totals
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const gst      = Math.round(subtotal * 0.05);
  const total    = subtotal + gst;

  // Generate Order ID
  const orderId = "SBC" + Math.floor(100000 + Math.random() * 900000);

  // Estimated time
  const prepTime = 10 + Math.floor(Math.random() * 15);

  // Build modal details
  const itemsList = cart.map(c => `<p><span>${c.icon} ${c.name} × ${c.qty}</span><strong>₹${c.price * c.qty}</strong></p>`).join("");

  document.getElementById("modalDetails").innerHTML = `
    ${itemsList}
    <p style="border-top:1px solid var(--border);margin-top:10px;padding-top:10px"><span>Subtotal</span><strong>₹${subtotal}</strong></p>
    <p><span>GST (5%)</span><strong>₹${gst}</strong></p>
    <p><span><b>Total Paid</b></span><strong style="color:var(--accent)">₹${total}</strong></p>
    <p><span>Order ID</span><strong>${orderId}</strong></p>
    <p><span>Order Type</span><strong>${type}</strong></p>
    <p><span>Payment</span><strong>${payment}</strong></p>
    <p><span>Prep Time</span><strong>~${prepTime} minutes</strong></p>
    <p><span>Customer</span><strong>${name}</strong></p>
  `;

  // Show modal
  document.getElementById("orderModal").style.display = "flex";

  // Clear cart after successful order
  cart = [];
  saveCart();
  renderCart();
  updateCartBadge();

  // Clear form
  document.getElementById("custName").value    = "";
  document.getElementById("custPhone").value   = "";
  document.getElementById("custAddress").value = "";
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

// Close modal on overlay click
document.getElementById("orderModal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* =============================================
   END OF script.js
   ============================================= */
