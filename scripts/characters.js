let filter = [];
async function logMovies() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const movies = await response.json();
  console.log(movies);
  const pages = movies.info.pages;
  const pagination = document.getElementById('pagination');

  for (let index = 0; index < pages; index++) {
    const page = document.createElement('a');
    page.innerText = `${index + 1}`;
    pagination.appendChild(page);
    if (index == 0) {
        page.classList.add('active')
    }
    page.addEventListener('click', changePage)
  }
  const search = document.getElementById('search');
  search.addEventListener('click', searchData);
  instertCards(movies.results)
}

async function changePage(e) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${e.target.innerText}${filter.length > 0 ? `&${filter.join('&')}` : ''}`);
    const movies = await response.json();
    console.log(movies);
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    const pages = document.querySelectorAll('#pagination a');
    for (let index = 0; index < pages.length; index++) {
        pages[index].classList.remove('active');
    }
    e.target.classList.add('active');
    instertCards(movies.results)
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

async function searchData() {
  const nameContainer = document.getElementById('name');
  const statusContainer = document.getElementById('status');
  const speciesContainer = document.getElementById('species');
  const genderContainer = document.getElementById('gender');
  filter = [];
  if (nameContainer.value.length !== 0) {
    filter.push(`name=${nameContainer.value}`); 
  }
  if (statusContainer.value.length !== 0) {
    filter.push(`status=${statusContainer.value}`); 
  }
  if (speciesContainer.value.length !== 0) {
    filter.push(`species=${speciesContainer.value}`); 
  }
  if (genderContainer.value.length !== 0) {
    filter.push(`gender=${genderContainer.value}`); 
  }
  let response;
  if (filter.length > 0) {
    response = await fetch(`https://rickandmortyapi.com/api/character/?${filter.join('&')}`);
  } else {
    response = await fetch("https://rickandmortyapi.com/api/character");
  }
  const movies = await response.json();
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const container = document.getElementById('cards-container');
  container.innerHTML = '';
  if (!movies.error) {
    const pages = movies.info.pages;
    for (let index = 0; index < pages; index++) {
      const page = document.createElement('a');
      page.innerText = `${index + 1}`;
      pagination.appendChild(page);
      if (index == 0) {
          page.classList.add('active')
      }
      page.addEventListener('click', changePage)
    }
    const search = document.getElementById('search');
    search.addEventListener('click', searchData);
    instertCards(movies.results)
  }
}

logMovies()