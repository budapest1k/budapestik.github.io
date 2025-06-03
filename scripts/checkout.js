document.addEventListener("DOMContentLoaded", () => {
  const orderItems = document.getElementById("order-items");
  const totalDisplay = document.getElementById("order-total");
  const orderForm = document.getElementById("order-form");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    orderItems.innerHTML = "<li>Корзина пуста</li>";
    totalDisplay.textContent = "Общая сумма: 0 руб.";
    orderForm.querySelector("button").disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price.toLocaleString('ru-RU')} руб.`;
    orderItems.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Общая сумма: ${total.toLocaleString('ru-RU')} руб.`;

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(orderForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");

    if (!name || !email || !phone || !address) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    alert("Спасибо за заказ, " + name + "!\nМы свяжемся с вами в ближайшее время.");

    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
