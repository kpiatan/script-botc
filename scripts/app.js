document.addEventListener('DOMContentLoaded', function () {
  // Carregar o arquivo JSON
  fetch('data/characters.json')
    .then(response => response.json()) // Converte para JSON
    .then(characters => {
      console.log('Personagens carregados:', characters);

      // Agrupar os personagens por "type"
      const groupedByType = characters.reduce((acc, character) => {
        // Verifica se já existe um grupo para o tipo
        if (!acc[character.type]) {
          acc[character.type] = [];
        }
        acc[character.type].push(character);
        return acc;
      }, {});

      // Renderizar os grupos de personagens
      const characterListDiv = document.getElementById('character-list');
      for (const type in groupedByType) {
        const section = document.createElement('section');
        const h3 = document.createElement('h3');
        h3.textContent = type; // Nome do tipo de personagem (ex: "Vilões", "Heróis")
        section.appendChild(h3);

        const ul = document.createElement('ul');
        groupedByType[type].forEach(character => {
          const li = document.createElement('li');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = character.name; // Nome do personagem
          checkbox.dataset.ability = character.ability; // Habilidade do personagem
          checkbox.dataset.type = character.type; // Tipo do personagem
          checkbox.id = `checkbox-${character.name}`;

          const label = document.createElement('label');
          label.htmlFor = checkbox.id;
          label.textContent = character.name;

          li.appendChild(checkbox);
          li.appendChild(label);
          ul.appendChild(li);
        });

        section.appendChild(ul);
        characterListDiv.appendChild(section);
      }

      // Evento de clique no botão "Selecionar personagens"
      document.getElementById('get-selected').addEventListener('click', function () {
        const selected = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
          selected.push({
            name: checkbox.value,
            ability: checkbox.dataset.ability, // Habilidade
            type: checkbox.dataset.type // Tipo
          });
        });

        // Exibir os personagens selecionados
        const selectedCharactersDiv = document.getElementById('selected-characters');
        selectedCharactersDiv.innerHTML = '<h2>Personagens Selecionados</h2>'; // Limpa o conteúdo anterior

        const ulSelected = document.createElement('ul');
        selected.forEach(character => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${character.name}</strong> (${character.type}): ${character.ability}`;
          ulSelected.appendChild(li);
        });

        selectedCharactersDiv.appendChild(ulSelected);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error);
    });
});
