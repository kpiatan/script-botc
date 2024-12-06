document.addEventListener('DOMContentLoaded', function () {
  // Carrega os personagens do arquivo JSON
  fetch('data/characters.json')
    .then(response => response.json())
    .then(characters => {
      const characterList = document.getElementById('character-list');

      // Agrupa os personagens por tipo
      const types = {};
      characters.forEach(character => {
        if (!types[character.type]) {
          types[character.type] = [];
        }
        types[character.type].push(character);
      });

      // Renderiza os personagens agrupados por tipo
      Object.keys(types).forEach(type => {
        const typeSection = document.createElement('div');
        typeSection.classList.add('type-section');

        // Botão para colapsar/descolapsar
        const toggleButton = document.createElement('button');
        toggleButton.textContent = type;
        toggleButton.classList.add('toggle-button');
        toggleButton.addEventListener('click', () => {
          const list = typeSection.querySelector('ul');
          list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });

        typeSection.appendChild(toggleButton);

        const ul = document.createElement('ul');
        ul.style.display = 'block';

        types[type].forEach(character => {
          const li = document.createElement('li');
          li.textContent = character.name;

          // Adiciona a imagem do personagem
          const img = document.createElement('img');
          img.src = `images/Icon_${character.id}.png`;
          img.alt = character.name;
          img.style.width = '30px';
          img.style.marginRight = '10px';

          li.prepend(img);

          // Evento de seleção
          li.addEventListener('click', function () {
            li.classList.toggle('selected');
            updateSelectedCharacters();
          });

          ul.appendChild(li);
        });

        typeSection.appendChild(ul);
        characterList.appendChild(typeSection);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os personagens:', error);
    });

  // Atualiza os personagens selecionados na folha A4
  function updateSelectedCharacters() {
    const selectedCharacters = document.querySelectorAll('#character-list li.selected');
    const selectedContainer = document.getElementById('script-output');

    // Limpa os personagens da folha A4 antes de adicionar os novos
    selectedContainer.innerHTML = '';

    selectedCharacters.forEach(character => {
      const characterName = character.textContent.trim();
      const characterImg = character.querySelector('img').src;
      const characterId = character.textContent.trim(); // Aqui vai o nome para buscar no JSON

      // Encontra o personagem correspondente
      const characterData = characters.find(char => char.name === characterId);

      const characterDiv = document.createElement('div');
      characterDiv.classList.add('selected-character');

      const img = document.createElement('img');
      img.src = characterImg;

      const name = document.createElement('p');
      name.textContent = characterName;

      const ability = document.createElement('p');
      ability.textContent = `Habilidade: ${characterData.ability}`;

      characterDiv.appendChild(img);
      characterDiv.appendChild(name);
      characterDiv.appendChild(ability);

      selectedContainer.appendChild(characterDiv);
    });
  }

  // Adiciona o evento de clique para impressão
  document.getElementById('print-button').addEventListener('click', function () {
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');

    if (leftColumn) {
      leftColumn.style.display = 'none'; // Esconde a coluna da esquerda temporariamente
      window.print(); // Aciona a impressão
      leftColumn.style.display = 'block'; // Restaura a coluna da esquerda após a impressão
    }
  });
});
