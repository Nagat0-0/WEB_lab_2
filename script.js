document.addEventListener("DOMContentLoaded", () => {
    // Об'єкт з масивом товарів
    const products = [
        { id: 1, name: "Navi", category: "Європа", img: "image/NAVI.webp", price: "4500", description: "Футболка Natus Vincere" },
        { id: 2, name: "G2", category: "Європа", img: "image/G2.webp", price: "4300", description: "Футболка G2" },
        { id: 3, name: "BIG", category: "Європа", img: "image/BIG.webp", price: "3600", description: "Футболка Berlin International Gaming" },
        { id: 4, name: "Furia", category: "Південна америка", img: "image/furia.jpg", price: "4100", description: "Футболка Furia" },
        { id: 5, name: "Liquid", category: "Північна америка", img: "image/Liquid.jpg", price: "3900", description: "Футболка Team Liquid" },
        { id: 6, name: "Tyloo", category: "Азія", img: "image/tyloo.jpg", price: "3300", description: "Футболка Tyloo" },
        { id: 7, name: "Vitality", category: "Європа", img: "image/Vitality.webp", price: "4500", description: "Футболка Vitality" },
        { id: 8, name: "TSpirit", category: "СНГ", img: "image/spirit.jpeg", price: "4300", description: "Футболка Team Spirit" },
        { id: 9, name: "VP", category: "СНГ", img: "image/VP.jpeg", price: "3800", description: "Футболка Virtus Pro" },
        { id: 10, name: "The Mongolz", category: "Азія", img: "image/Mongolz.jpg", price: "3500", description: "Футболка The Mongolz" },
    ];

    const gallery = document.getElementById("gallery");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const applyFilter = document.getElementById("applyFilter");
    const subscriptionModal = document.getElementById("subscriptionModal");
    const adModal = document.getElementById("adModal");
    const subscribeBtn = document.getElementById("subscribe");
    const declineBtn = document.getElementById("decline");
    const closeAdBtn = document.getElementById("closeAd");
    const countdownSpan = document.getElementById("countdown");
    // Налаштування карточок
    function renderGallery(items) {
        gallery.innerHTML = items.map(item => `
            <div class="card">
                <a href="product.html?id=${item.id}">
                    <img src="${item.img}" alt="${item.name}">
                </a>
                <h3>${item.name}</h3>
                <p class="price">Ціна: ${item.price} грн</p>
            </div>
        `).join("");
    }

    const categories = [...new Set(products.map(p => p.category))];
    categoryFilter.innerHTML = `<option value="">Всі</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join("");

    applyFilter.addEventListener("click", () => {
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseInt(priceFilter.value) || Infinity;
        const filtered = products.filter(p => (selectedCategory === "" || p.category === selectedCategory) && p.price <= maxPrice);
        renderGallery(filtered);
    });

    renderGallery(products);
});


// Модалка
window.addEventListener("load", () => {
    const subscribePopup = document.getElementById("subscribe-popup");
    const thanksModal = document.getElementById("thanks-modal");

    if (!localStorage.getItem("subscribed")) {
        setTimeout(() => {
            subscribePopup.classList.remove("hidden");
        }, 300);
    }

    document.getElementById("subscribe-accept").onclick = () => {
        localStorage.setItem("subscribed", "true");
        subscribePopup.classList.add("hidden");
        thanksModal.classList.remove("hidden");
    };

    document.getElementById("subscribe-decline").onclick = () => {
        subscribePopup.classList.add("hidden");
    };

    document.getElementById("thanks-close-btn").onclick = () => {
        thanksModal.classList.add("hidden");
    };
});

// Реклама
let adShown = false;

function showAdModal() {
    if (adShown) return;
    adShown = true;

    const modal = document.getElementById("ad-modal");
    const closeBtn = document.getElementById("ad-close-btn");
    const timerSpan = document.getElementById("ad-timer");
    let seconds = 5;

    modal.classList.remove("hidden");
    document.body.classList.add('scroll-none')

    const countdown = setInterval(() => {
        seconds--;
        timerSpan.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdown);
            closeBtn.disabled = false;
            closeBtn.classList.add("active");
            closeBtn.textContent = "Закрити";
        }
    }, 1000);

    closeBtn.onclick = () => {
        if (!closeBtn.disabled) {
            modal.classList.add("hidden");
            document.body.classList.remove('scroll-none')
        }
    };
}

setTimeout(showAdModal, 1500);

