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
      console.log('Personagens carregados:', characters); // Verifica no console os personagens carregados

      // Acessa o elemento onde a lista de personagens será exibida
      const characterListDiv = document.getElementById('character-list');
      characterListDiv.innerHTML = ''; // Limpa o conteúdo antigo (se houver)

      const ul = document.createElement('ul');

      // Para cada personagem no JSON, cria um item na lista
      characters.forEach(character => {
        const li = document.createElement('li');
        
        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.marginBottom = '10px';

        // Cria o checkbox para selecionar o personagem
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = character.id; // ID do personagem
        checkbox.setAttribute('data-name', character.name); // Nome do personagem
        checkbox.setAttribute('data-ability', character.ability); // Habilidade do personagem

        // Exibe a imagem do personagem ao lado do checkbox
        const img = document.createElement('img');
        img.src = `images/Icon_${character.id}.png`;
        img.alt = character.name;
        img.style.width = '50px';
        img.style.marginRight = '10px';

        // Nome do personagem
        const span = document.createElement('span');
        span.textContent = character.name;

        // Adiciona os elementos ao rótulo
        label.appendChild(checkbox);
        label.appendChild(img);
        label.appendChild(span);

        // Adiciona o rótulo ao item da lista
        li.appendChild(label);
        ul.appendChild(li);
      });

      // Adiciona a lista ao div
      characterListDiv.appendChild(ul);
    })
    .catch(error => {
      console.error('Erro ao carregar a lista de personagens:', error);
    });
});
