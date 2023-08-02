async function logMovies() {
    const responses = await Promise.all(["https://rickandmortyapi.com/api/episode", "https://rickandmortyapi.com/api/episode?page=2", "https://rickandmortyapi.com/api/episode?page=3"].map(url => fetch(url).then(r => r.json())));
    const episodes = responses.map(r=> r.results).flat();
    const listContainer = document.getElementById('video-list');
    episodes.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.episode} - ${item.name}`;
        listItem.addEventListener('click', clickList);
        listContainer.appendChild(listItem);
        if (index == 0) {
          const player = document.getElementById('player');
          const source = document.getElementById('player-source');
          source.setAttribute('src', `../data/${item.episode}.mkv`);
          source.setAttribute('type', 'video/mp4');
          player.load();
          listItem.classList.add('active');
          loadCharacters(item.episode)
        }
    })
}

function clickList(e) {
    const list = document.querySelectorAll('li');
    for (let index = 0; index < list.length; index++) {
        list[index].classList.remove('active');
    }
    e.target.classList.add('active');
    const player = document.getElementById('player');
    const source = document.getElementById('player-source');
    source.setAttribute('src', `../data/${e.target.innerText.split('-')[0].trim()}.mkv`);
    source.setAttribute('type', 'video/mp4');
    player.load();
    loadCharacters(e.target.innerText.split('-')[0].trim());
}

async function loadCharacters(episode) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/?episode=${episode}`);
    const episodeData = await response.json();
    const characters = await Promise.all(episodeData.results[0].characters.map(url => fetch(url).then(r => r.json())));
    instertCards(characters);
}

async function instertCards(data) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
     var flipContainer = document.createElement('div');
     flipContainer.classList.add('flip-card');
     flipContainer.innerHTML = `
      <div class="flip-card-inner">
       <div class="flip-card-front">
         <img src="${data[i].image}" alt="Avatar" class="card-image">
         <p class="card-title">${data[i].name}</p>
       </div>
       <div class="flip-card-back">
         <h2 class="back-card-title">${data[i].name}</h2>
         <form action="#" method="post">
           <label for="status">Status: </label>
           <input id="status" type="text" readonly value="${data[i].status}"/>
           <label for="specie">Specie: </label>
           <input id="specie" type="text" readonly value="${data[i].species}"/>
           <label for="gender">Gender: </label>
           <input id="gender" type="text" readonly value="${data[i].gender}"/>
         </form>
       </div>
     </div>
     `
     container.appendChild(flipContainer);
  }
}

logMovies()