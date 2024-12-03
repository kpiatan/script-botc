document.addEventListener("DOMContentLoaded", () => {
  const characterList = document.getElementById("character-list");

  // Carregar personagens do JSON
  fetch("data/characters.json")
    .then(response => response.json())
    .then(data => {
      data.characters.forEach(character => {
        const div = document.createElement("div");
        div.textContent = `${character.name} (${character.type})`;
        characterList.appendChild(div);
      });
    })
    .catch(error => console.error("Erro ao carregar personagens:", error));
});
