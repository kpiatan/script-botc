document.getElementById('get-selected').addEventListener('click', function () {
  const selected = [];
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    selected.push({
      id: checkbox.value,
      name: checkbox.getAttribute('data-name'),
      ability: checkbox.getAttribute('data-ability')
    });
  });

  if (selected.length === 0) {
    alert('Nenhum personagem selecionado!');
    return;
  }

  // Limpa o conteúdo anterior da seção de pré-visualização
  const scriptOutput = document.getElementById('script-output');
  scriptOutput.innerHTML = ''; // Remove conteúdo antigo

  // Adiciona o título da seção (opcional)
  const title = document.createElement('h3');
  title.textContent = 'Personagens Selecionados';
  scriptOutput.appendChild(title);

  // Para cada personagem, cria um card na folha A4
  selected.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.style.border = '1px solid #ccc';
    characterDiv.style.margin = '10px 0';
    characterDiv.style.padding = '10px';
    characterDiv.style.backgroundColor = '#fdfdfd';

    const characterName = document.createElement('h4');
    characterName.textContent = character.name;

    const characterAbility = document.createElement('p');
    characterAbility.textContent = character.ability;

    const characterImage = document.createElement('img');
    characterImage.src = `images/Icon_${character.id}.png`;
    characterImage.alt = character.name;
    characterImage.style.width = '100px'; // Ajuste o tamanho da imagem
    characterImage.style.display = 'block';
    characterImage.style.marginBottom = '10px';

    // Adiciona os elementos ao div do personagem
    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterAbility);

    // Adiciona o div do personagem ao script-output
    scriptOutput.appendChild(characterDiv);
  });
});
