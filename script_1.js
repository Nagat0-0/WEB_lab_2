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


function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

function displayProduct() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById("productTitle").innerText = product.name;
        document.getElementById("productImage").src = product.img;
        document.getElementById("productDescription").innerText = product.description;
        document.getElementById("productPrice").innerText = `Ціна: ${product.price} грн`;
    } else {
        document.querySelector("main").innerHTML = "<h2>Товар не знайдено</h2>";
    }
}

function goBack() {
    window.history.back();
}

displayProduct();

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
        }
    };
}

setTimeout(showAdModal, 1500);