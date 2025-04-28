document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.getElementById('searchBtn');
    const cardsContainer = document.getElementById('cardsContainer');
    const noResults = document.getElementById('noResults');

    loadCharacters();


    searchBtn.addEventListener('click', performSearch);
    searchBar.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    async function loadCharacters() {
      try {
        const response = await fetch('/api/characters');
        const characters = await response.json();
        displayCharacters(characters);
      } catch (error) {
        console.error('Ошибка загрузки персонажей:', error);
      }
    }

    async function performSearch() {
      const searchTerm = searchBar.value.trim();

      try {
        let url = '/api/characters';
        if (searchTerm !== '') {
          url = `/api/search?q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        const characters = await response.json();

        displayCharacters(characters);
      } catch (error) {
        console.error('Ошибка поиска:', error);
      }
    }
    function displayCharacters(characters) {
      cardsContainer.innerHTML = '';

      if (characters.length === 0) {
        noResults.style.display = 'block';
        return;
      }

      noResults.style.display = 'none';

      characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <a href="/characters/${character.name}" class="card-link">
            <img src="${character.imageurl}" alt="${character.fullname}" class="card-img">
            <div class="card-content">
            <h3 class="card-title">${character.fullname}</h3>
            <p class="card-desc">${character.history}</p>
            </div>
          </a>
          
        `;

        cardsContainer.appendChild(card);
      });
    }
  });