const products = [
    {
        id: 1,
        name: "Процессор AMD Ryzen™ 7 9800X3D",
        price: 15000,
        image: "images/cpu.avif",
        description: "Мощный процессор для игровых и рабочих систем."
    },
    {
        id: 2,
        name: "Видеокарта NVIDIA RTX 5090",
        price: 40000,
        image: "images/gpu.png",
        description: "Современная видеокарта с отличной производительностью."
    },
    {
        id: 3,
        name: "Оперативная память 32GB DDR5",
        price: 7000,
        image: "images/ram.jpg",
        description: "Высокоскоростная оперативная память для стабильной работы."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Цена: ${product.price.toLocaleString('ru-RU')} руб.</p>
            <button data-id="${product.id}" class="add-to-cart">В корзину</button>
        `;

        productList.appendChild(card);
    });

    productList.addEventListener("click", e => {
        if(e.target.classList.contains("add-to-cart")){
            const id = +e.target.getAttribute("data-id");
            addToCart(id);
        }
    });
});
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Товар "${product.name}" добавлен в корзину.`);
}
const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

