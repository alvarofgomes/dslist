document.addEventListener("DOMContentLoaded", () => {
    const gameListElement = document.getElementById("game-list");

    async function fetchGames() {
        try {
            const response = await fetch("http://localhost:8080/games"); // API do backend
            if (!response.ok) {
                throw new Error("Erro ao buscar os jogos");
            }
            const games = await response.json();
            
            gameListElement.innerHTML = ""; // Limpa a lista antes de adicionar os jogos

            games.forEach(game => {
                const li = document.createElement("li");
                li.classList.add("game-item");

                // Criando a imagem do jogo
                const img = document.createElement("img");
                img.src = game.imgUrl;
                img.alt = game.title;
                img.classList.add("game-img");

                // Criando o título do jogo
                const title = document.createElement("h2");
                title.textContent = game.title;

                // Criando a descrição curta
                const shortDescription = document.createElement("p");
                shortDescription.textContent = game.shortDescription;
                shortDescription.classList.add("short-description");

                // Criando o botão de mais detalhes
                const detailsButton = document.createElement("button");
                detailsButton.textContent = "Mais detalhes";
                detailsButton.classList.add("details-button");
                detailsButton.onclick = () => {
                    window.location.href = `game.html?id=${game.id}`;
                };

                // Adicionando os elementos ao item da lista
                li.appendChild(img);
                li.appendChild(title);
                li.appendChild(shortDescription);
                li.appendChild(detailsButton);
                gameListElement.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao carregar jogos:", error);
            gameListElement.innerHTML = "<p>Erro ao carregar os jogos.</p>";
        }
    }

    fetchGames();
});