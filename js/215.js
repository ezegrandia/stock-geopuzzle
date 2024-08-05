document.addEventListener("DOMContentLoaded", function () {
    fetch("./json/215.json")
        .then((response) => response.json())
        .then((data) => renderPuzzles(data))
        .catch((error) => console.error("Error al cargar el archivo JSON:", error));
});

function renderPuzzles(puzzles) {
    const container = document.querySelector(".imgs-container");
    puzzles.forEach((puzzle) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-stock", puzzle.stock);

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

        const h3 = document.createElement("h3");
        h3.classList.add("card__h3");
        h3.textContent = puzzle.nombre;

        const pCode = document.createElement("p");
        pCode.classList.add("card__p");
        pCode.textContent = `Código: ${puzzle.codigo}`;

        const pStock = document.createElement("p");
        pStock.classList.add("card__p");
        pStock.textContent = `Stock: ${puzzle.stock}`;

        card.appendChild(img);
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
