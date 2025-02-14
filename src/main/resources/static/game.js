document.addEventListener("DOMContentLoaded", () => {
    const gameDetailsElement = document.getElementById("game-details");

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
        gameDetailsElement.innerHTML = "<p>Jogo não encontrado.</p>";
        return;
    }

    async function fetchGameDetails() {
        try {
            const response = await fetch(`http://localhost:8080/games/${gameId}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar os detalhes do jogo");
            }
            const game = await response.json();
            
            gameDetailsElement.innerHTML = `
                <h2>${game.title}</h2>
                <p><strong>Gênero:</strong> ${game.genre}</p>
                <p><strong>Plataforma:</strong> ${game.platform}</p>
                <p><strong>Descrição:</strong> ${game.description}</p>
            `;
        } catch (error) {
            console.error("Erro ao carregar detalhes do jogo:", error);
            gameDetailsElement.innerHTML = "<p>Erro ao carregar os detalhes do jogo.</p>";
        }
    }

    fetchGameDetails();
});