document.addEventListener("DOMContentLoaded", () => {
    const gameListElement = document.getElementById("game-list");

    async function fetchGames() {
        try {
            const response = await fetch("http://localhost:8080/games");
            if (!response.ok) {
                throw new Error("Erro ao buscar os jogos");
            }
            const games = await response.json();
            
            gameListElement.innerHTML = ""; // Limpa a lista antes de adicionar os jogos

            games.forEach((game, index) => {
                const li = document.createElement("li");
                li.classList.add("game-item");
                li.draggable = true; // Permite que o item seja arrastado
                li.dataset.index = index; // Armazena o índice do jogo

                // Criando a imagem do jogo
                const img = document.createElement("img");
                img.src = game.imgUrl;
                img.alt = game.title;
                img.classList.add("game-img");

                // Criando o título do jogo
                const title = document.createElement("h2");
                title.textContent = game.title;

                // Criando o ano de lançamento
                const year = document.createElement("p");
                year.textContent = `Ano: ${game.year}`;
                year.classList.add("game-year");

                // Criando a descrição curta
                const shortDescription = document.createElement("p");
                shortDescription.textContent = game.shortDescription;
                shortDescription.classList.add("short-description");

                // Criando o botão "Mais detalhes"
                const detailsButton = document.createElement("button");
                detailsButton.textContent = "Mais detalhes";
                detailsButton.classList.add("details-button");
                detailsButton.onclick = () => {
                    window.location.href = `game.html?id=${game.id}`;
                };

                // Adicionando os elementos ao item da lista
                li.appendChild(img);
                li.appendChild(title);
                li.appendChild(year);
                li.appendChild(shortDescription);
                li.appendChild(detailsButton);
                gameListElement.appendChild(li);
            });

            // Adicionando eventos de drag-and-drop
            setupDragAndDrop();
        } catch (error) {
            console.error("Erro ao carregar jogos:", error);
            gameListElement.innerHTML = "<p>Erro ao carregar os jogos.</p>";
        }
    }

    // Função para configurar o drag-and-drop
    function setupDragAndDrop() {
        let draggedItem = null;

        // Evento quando o item começa a ser arrastado
        document.querySelectorAll(".game-item").forEach(item => {
            item.addEventListener("dragstart", (e) => {
                draggedItem = item;
                e.dataTransfer.setData("text/plain", item.dataset.index);
            });
        });

        // Evento quando o item é arrastado sobre outro item
        document.querySelectorAll(".game-item").forEach(item => {
            item.addEventListener("dragover", (e) => {
                e.preventDefault(); // Permite soltar o item
                const boundingBox = item.getBoundingClientRect();
                const offset = boundingBox.y + (boundingBox.height / 2);
                if (e.clientY > offset) {
                    item.style.borderBottom = "2px solid #007BFF";
                    item.style.borderTop = "";
                } else {
                    item.style.borderTop = "2px solid #007BFF";
                    item.style.borderBottom = "";
                }
            });

            // Evento quando o item é solto
            item.addEventListener("drop", (e) => {
                e.preventDefault();
                const targetIndex = item.dataset.index;
                const sourceIndex = draggedItem.dataset.index;

                if (sourceIndex !== targetIndex) {
                    moveGame(1, sourceIndex, targetIndex); // Envia a nova ordem para o backend
                }

                // Remove os estilos de borda
                item.style.borderTop = "";
                item.style.borderBottom = "";
            });

            // Evento quando o item sai da área de outro item
            item.addEventListener("dragleave", () => {
                item.style.borderTop = "";
                item.style.borderBottom = "";
            });
        });
    }

    // Função para mover um jogo na lista
    async function moveGame(listId, sourceIndex, destinationIndex) {
        try {
            const response = await fetch(`http://localhost:8080/lists/${listId}/replacement`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sourceIndex: parseInt(sourceIndex),
                    destinationIndex: parseInt(destinationIndex),
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao mover o jogo");
            }

            console.log("Jogo movido com sucesso!");
            window.location.reload(); // Recarrega a página para atualizar a lista
        } catch (error) {
            console.error("Erro ao mover o jogo:", error);
        }
    }

    fetchGames();
});