document.addEventListener('DOMContentLoaded', function () {
  // Carregar o arquivo JSON
  fetch('data/characters.json')
    .then(response => response.json()) // Converte para JSON
    .then(characters => {
      console.log('Personagens carregados:', characters);

      // Renderizar a lista de personagens com checkboxes
      const characterListDiv = document.getElementById('character-list');
      const ul = document.createElement('ul');

      characters.forEach(character => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = character.name; // Usa o nome como valor
        checkbox.dataset.ability = character.ability; // Armazena a habilidade no dataset
        checkbox.id = `checkbox-${character.name}`;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = character.name;

        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
      });

      characterListDiv.appendChild(ul);

      // Evento de clique no botão "Selecionar personagens"
      document.getElementById('get-selected').addEventListener('click', function () {
        const selected = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
          selected.push({
            name: checkbox.value,
            ability: checkbox.dataset.ability // Coleta a habilidade do dataset
          });
        });

        // Exibir os personagens selecionados
        const selectedCharactersDiv = document.getElementById('selected-characters');
        selectedCharactersDiv.innerHTML = '<h2>Personagens Selecionados</h2>'; // Limpa o conteúdo anterior

        const ulSelected = document.createElement('ul');
        selected.forEach(character => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${character.name}</strong>: ${character.ability}`;
          ulSelected.appendChild(li);
        });

        selectedCharactersDiv.appendChild(ulSelected);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error);
    });
});
