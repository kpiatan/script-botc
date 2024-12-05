document.addEventListener('DOMContentLoaded', function () {
  // Carregar o arquivo JSON
  fetch('data/characters.json')
    .then(response => response.json())
    .then(characters => {
      const characterListDiv = document.getElementById('character-list');
      const scriptOutputDiv = document.getElementById('script-output');

      // Agrupar personagens por tipo
      const types = {};
      characters.forEach(character => {
        if (!types[character.type]) types[character.type] = [];
        types[character.type].push(character);
      });

      // Criar lista de personagens agrupada por tipo
      Object.keys(types).forEach(type => {
        const section = document.createElement('div');
        section.classList.add('type-section');
        
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.textContent = type;
        toggleButton.addEventListener('click', function () {
          const list = section.querySelector('ul');
          list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });

        const ul = document.createElement('ul');
        ul.style.display = 'none'; // Inicialmente escondido

        types[type].forEach(character => {
          const li = document.createElement('li');
          li.textContent = character.name;
          li.dataset.id = character.id; // ID único do personagem
          li.classList.add('character-item');

          // Adicionar evento de clique para adicionar/remover da folha A4
          li.addEventListener('click', function () {
            li.classList.toggle('selected'); // Alternar seleção
            if (li.classList.contains('selected')) {
              addCharacterToSheet(character);
            } else {
              removeCharacterFromSheet(character);
            }
          });

          ul.appendChild(li);
        });

        section.appendChild(toggleButton);
        section.appendChild(ul);
        characterListDiv.appendChild(section);
      });

      // Função para adicionar personagem à folha A4
      function addCharacterToSheet(character) {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('selected-character');
        characterDiv.dataset.id = character.id;
        characterDiv.innerHTML = `
          <h3>${character.name}</h3>
          <p>${character.ability}</p>
          <img src="images/Icon_${character.id}.png" alt="${character.name}" />
        `;
        scriptOutputDiv.appendChild(characterDiv);
      }

      // Função para remover personagem da folha A4
      function removeCharacterFromSheet(character) {
        const characterDiv = scriptOutputDiv.querySelector(`[data-id="${character.id}"]`);
        if (characterDiv) {
          scriptOutputDiv.removeChild(characterDiv);
        }
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error);
    });
});
