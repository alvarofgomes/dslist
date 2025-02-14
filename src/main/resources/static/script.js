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

            games.forEach(game => {
                const li = document.createElement("li");
                li.classList.add("game-item");

                // Criando um container para o nome do jogo
                const gameContainer = document.createElement("div");
                gameContainer.classList.add("game-container");

                // Criando o nome do jogo
                const title = document.createElement("p");
                title.textContent = game.title;

                // Criando o tooltip com gênero e ano
                const tooltip = document.createElement("span");
                tooltip.classList.add("tooltip");
                tooltip.textContent = `${game.genre} - ${game.year}`;

                // Criando o botão de mais detalhes
                const detailsButton = document.createElement("button");
                detailsButton.textContent = "Mais detalhes";
                detailsButton.classList.add("details-button");
                detailsButton.onclick = () => {
                    window.location.href = `game.html?id=${game.id}`;
                };

                // Adicionando elementos na estrutura
                gameContainer.appendChild(title);
                gameContainer.appendChild(tooltip);
                gameContainer.appendChild(detailsButton);
                li.appendChild(gameContainer);
                gameListElement.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao carregar jogos:", error);
            gameListElement.innerHTML = "<p>Erro ao carregar os jogos.</p>";
        }
    }

    fetchGames();
});

