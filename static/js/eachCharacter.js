document.addEventListener('DOMContentLoaded', function() {
    const pathParts = window.location.pathname.split('/');
    const characterName = pathParts[pathParts.length - 1];
    
    fetchCharacterDetails(characterName);
    
    async function fetchCharacterDetails(name) {
      try {
        const response = await fetch(`/api/characters/${name}`);
        
        if (!response.ok) {
          document.getElementById('characterDetails').style.display = 'none';
          document.getElementById('characterNotFound').style.display = 'block';
          return;
        }
        
        const character = await response.json();
        
        document.getElementById('characterImage').src = character.imageurl;
        document.getElementById('characterImage').alt = character.fullname;
        document.getElementById('characterFullName').textContent = character.fullname;
        document.getElementById('characterRussianName').textContent = character.nameinrussian;
        document.getElementById('characterAge').textContent = `Возраст: ${character.age} лет`;
        document.getElementById('characterHistory').textContent = character.biography;
        

        document.title = `${character.fullname} - Assassin's Creed II`;
        
      } catch (error) {
        console.error('Ошибка при загрузке данных о персонаже:', error);
        document.getElementById('characterDetails').style.display = 'none';
        document.getElementById('characterNotFound').style.display = 'block';
      }
    }
  });