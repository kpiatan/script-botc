document.addEventListener('DOMContentLoaded', function () {
  // Carrega o arquivo JSON contendo os personagens
  fetch('data/characters.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then(characters => {
      console.log('Personagens carregados:', characters);

      // Agrupar personagens por tipo
      const groupedByType = characters.reduce((groups, character) => {
        if (!groups[character.type]) {
          groups[character.type] = [];
        }
        groups[character.type].push(character);
        return groups;
      }, {});

      // Acessa o elemento onde a lista de personagens será exibida
      const characterListDiv = document.getElementById('character-list');
      characterListDiv.innerHTML = ''; // Limpa o conteúdo antigo

      // Para cada tipo de personagem, cria uma seção
      Object.keys(groupedByType).forEach(type => {
        const typeSection = document.createElement('div');
        typeSection.className = 'type-section';

        // Botão para colapsar/descolapsar
        const toggleButton = document.createElement('button');
        toggleButton.textContent = type;
        toggleButton.className = 'toggle-button';
        toggleButton.addEventListener('click', function () {
          const list = typeSection.querySelector('ul');
          list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });

        // Lista de personagens do tipo
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none'; // Remove os marcadores padrão
        ul.style.padding = '0';

        groupedByType[type].forEach(character => {
          const li = document.createElement('li');
          li.style.cursor = 'pointer'; // Estilo de botão
          li.style.padding = '10px';
          li.style.marginBottom = '5px';
          li.style.border = '1px solid #ddd';
          li.style.borderRadius = '4px';
          li.style.backgroundColor = '#fff';
          li.textContent = character.name;

          // Adiciona um evento de clique para alternar seleção
          li.addEventListener('click', function () {
            li.classList.toggle('selected'); // Alterna a classe 'selected'
            li.dataset.selected = li.dataset.selected === 'true' ? 'false' : 'true';
          });

          // Atributos para controle
          li.dataset.id = character.id;
          li.dataset.name = character.name;
          li.dataset.ability = character.ability;
          li.dataset.selected = 'false'; // Define como não selecionado inicialmente

          ul.appendChild(li);
        });

        // Adiciona o botão e a lista à seção
        typeSection.appendChild(toggleButton);
        typeSection.appendChild(ul);
        characterListDiv.appendChild(typeSection);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar a lista de personagens:', error);
    });
});

// Evento para capturar os personagens selecionados
document.getElementById('get-selected').addEventListener('click', function () {
  const selectedCharacters = [];
  document.querySelectorAll('#character-list li.selected').forEach(li => {
    selectedCharacters.push({
      id: li.dataset.id,
      name: li.dataset.name,
      ability: li.dataset.ability
    });
  });

  if (selectedCharacters.length === 0) {
    alert('Nenhum personagem selecionado!');
    return;
  }

  // Limpa o conteúdo anterior da seção de pré-visualização
  const scriptOutput = document.getElementById('script-output');
  scriptOutput.innerHTML = ''; // Remove conteúdo antigo

  // Adiciona os personagens selecionados à pré-visualização
  selectedCharacters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.style.border = '1px solid #ccc';
    characterDiv.style.margin = '10px 0';
    characterDiv.style.padding = '10px';

    const characterName = document.createElement('h4');
    characterName.textContent = character.name;

    const characterAbility = document.createElement('p');
    characterAbility.textContent = character.ability;

    const characterImage = document.createElement('img');
    characterImage.src = `images/Icon_${character.id}.png`;
    characterImage.alt = character.name;
    characterImage.style.width = '100px';
    characterImage.style.marginBottom = '10px';

    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterAbility);

    scriptOutput.appendChild(characterDiv);
  });
});
