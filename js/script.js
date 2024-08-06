document.addEventListener("DOMContentLoaded", function () {
    const jsonPath = window.location.pathname.includes("215.html") ? "./json/215.json" : "./json/90.json";
    const barClass = window.location.pathname.includes("215.html") ? "diagonal-bar-215" : "diagonal-bar-90";

    fetch(jsonPath)
        .then((response) => response.json())
        .then((data) => {
            setupSortOptions(data, barClass);
            document.getElementById("available").checked = true;
            filterPuzzles("available", data, barClass); // Show available puzzles by default
        })
        .catch((error) => console.error("Error al cargar el archivo JSON:", error));
});

function renderPuzzles(puzzles, barClass) {
    const container = document.querySelector(".imgs-container");
    container.innerHTML = ""; // Clear previous content
    puzzles.forEach((puzzle) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-stock", puzzle.stock);

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("puzzle-img-wrapper");

        const img = document.createElement("img");
        img.src = puzzle.img;
        img.alt = `Imagen de ${puzzle.nombre}`;
        img.classList.add("puzzle-img");
        img.dataset.fullImg = puzzle.imgFull;

        if (puzzle.stock === 0) {
            img.classList.add("grayscale");
        } else {
            img.addEventListener("click", openFullscreen);
        }

        const diagonalBar = document.createElement("div");
        diagonalBar.classList.add(barClass);

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(diagonalBar);
        card.appendChild(imgWrapper);

        const h3 = document.createElement("h3");
        h3.classList.add("card__h3");
        h3.textContent = puzzle.nombre;

        const pCode = document.createElement("p");
        pCode.classList.add("card__p");
        pCode.textContent = `Código: ${puzzle.codigo}`;

        const pStock = document.createElement("p");
        pStock.classList.add("card__p");
        pStock.textContent = `Stock: ${puzzle.stock}`;

        card.appendChild(h3);
        card.appendChild(pCode);
        card.appendChild(pStock);

        container.appendChild(card);
    });
}

function openFullscreen(event) {
    const imgSrc = event.target.dataset.fullImg;
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const fullscreenImg = fullscreenOverlay.querySelector(".fullscreen-img");
    fullscreenImg.src = imgSrc;
    fullscreenOverlay.style.display = "flex";
}

function closeFullscreen() {
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    fullscreenOverlay.style.display = "none";
}

document.querySelector(".close-btn").addEventListener("click", closeFullscreen);

function setupSortOptions(originalPuzzles, barClass) {
    document.querySelectorAll('input[name="sort"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            filterPuzzles(this.value, originalPuzzles, barClass);
        });
    });
}

function filterPuzzles(filter, puzzles, barClass) {
    let sortedPuzzles;
    if (filter === "all") {
        sortedPuzzles = puzzles.slice(); // Make a copy to avoid modifying the original
    } else if (filter === "available") {
        sortedPuzzles = puzzles.filter((puzzle) => puzzle.stock > 0).concat(puzzles.filter((puzzle) => puzzle.stock === 0));
    } else if (filter === "out-of-stock") {
        sortedPuzzles = puzzles.filter((puzzle) => puzzle.stock === 0).concat(puzzles.filter((puzzle) => puzzle.stock > 0));
    }
    renderPuzzles(sortedPuzzles, barClass);
}
