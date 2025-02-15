document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    const gameDetailsElement = document.getElementById("game-details");
    const gameTitleElement = document.getElementById("game-title");

    if (!gameId) {
        gameDetailsElement.innerHTML = "<p>Jogo não encontrado.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/games/${gameId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar detalhes do jogo");
        }
        const game = await response.json();

        gameTitleElement.textContent = game.title;
        gameDetailsElement.innerHTML = `
            <img src="${game.imgUrl}" alt="${game.title}" class="game-img">
            <p><strong>Plataformas:</strong> ${game.platforms}</p>
            <p><strong>Nota:</strong> ${game.score}</p>
            <p><strong>Descrição:</strong> ${game.longDescription}</p>
        `;
    } catch (error) {
        gameDetailsElement.innerHTML = "<p>Erro ao carregar detalhes.</p>";
    }
});

// Função para voltar à lista de jogos
function voltarParaLista() {
    window.location.href = "index.html";
}