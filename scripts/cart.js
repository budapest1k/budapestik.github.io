document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const clearCartBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Группируем одинаковые товары
  const groupedCart = {};
  cart.forEach(item => {
    const key = item.id;
    if (groupedCart[key]) {
      groupedCart[key].quantity += 1;
    } else {
      groupedCart[key] = { ...item, quantity: 1 };
    }
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    const items = Object.values(groupedCart);
    if (items.length === 0) {
      cartItemsContainer.innerHTML = "<p>Ваша корзина пуста.</p>";
      totalPriceElement.textContent = "Общая сумма: 0 руб.";
      checkoutBtn.disabled = true;
      return;
    }

    let total = 0;

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-item";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h3>${item.name} ${item.quantity > 1 ? `×${item.quantity}` : ""}</h3>
          <p>${item.description || ""}</p>
          <p>Цена за 1 шт: ${item.price.toLocaleString('ru-RU')} руб.</p>
          <p>Итого: ${(item.price * item.quantity).toLocaleString('ru-RU')} руб.</p>
          <button class="remove-item" data-id="${item.id}">Удалить</button>
        </div>
      `;

      cartItemsContainer.appendChild(card);
      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Общая сумма: ${total.toLocaleString('ru-RU')} руб.`;
  }

  // Удаление одного типа товара
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const id = e.target.getAttribute("data-id");
      delete groupedCart[id];

      // Обновить локальное хранилище
      cart = cart.filter(item => item.id !== parseInt(id));
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }

  renderCart();
});
