document.addEventListener('DOMContentLoaded', function () {
  // Função para carregar o arquivo JSON
  fetch('data/characters.json')
    .then(response => response.json()) // Converte a resposta em formato JSON
    .then(characters => {
      console.log('Personagens carregados:', characters); // Exibe os dados no console

      // Acessa o elemento onde a lista de personagens será exibida
      const characterListDiv = document.getElementById('character-list');
      const ul = document.createElement('ul');

      // Para cada personagem no JSON, cria um item na lista com checkbox
      characters.forEach(character => {
        console.log('Adicionando personagem:', character.name); // Exibe o nome do personagem no console

        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = character.name; // Armazena o nome do personagem
        checkbox.id = `checkbox-${character.name}`;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = character.name; // Exibe o nome do personagem

        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
      });

      characterListDiv.appendChild(ul); // Adiciona a lista ao HTML
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error); // Caso ocorra algum erro
    });
});
