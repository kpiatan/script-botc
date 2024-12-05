// Atualiza os personagens selecionados na folha A4
function updateSelectedCharacters() {
  const selectedCharacters = document.querySelectorAll('#character-list li.selected');
  const selectedContainer = document.getElementById('selected-characters');

  // Limpa os personagens da folha A4 antes de adicionar os novos
  selectedContainer.innerHTML = '';

  selectedCharacters.forEach(character => {
    const characterName = character.textContent;
    const characterImg = character.querySelector('img').src;

    const characterDiv = document.createElement('div');
    characterDiv.classList.add('selected-character');

    const img = document.createElement('img');
    img.src = characterImg;

    const name = document.createElement('p');
    name.textContent = characterName;

    characterDiv.appendChild(img);
    characterDiv.appendChild(name);

    selectedContainer.appendChild(characterDiv);
  });
}

// Adiciona o evento de clique para impressão
document.getElementById('print-button').addEventListener('click', function () {
  const rightColumn = document.querySelector('.right-column');
  
  // Remove temporariamente a coluna da esquerda
  document.querySelector('.left-column').style.display = 'none';
  
  // Aciona a impressão
  window.print();
  
  // Restaura a coluna da esquerda após a impressão
  document.querySelector('.left-column').style.display = 'block';
});
