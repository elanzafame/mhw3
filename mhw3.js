function onJsonMovie(json){
    console.log('Json regista/cast ricevuto');
    const library = document.querySelector('#movie-view');
    const catalog=document.querySelector('#music-view');
    library.classList.remove('hidden');
    catalog.classList.add('hidden');
    library.innerHTML='';
    const results= json.results;
    for(result of results){
        console.log(result);
        const image= result.image;
        const title=result.title;
        const movie = document.createElement('div');
        movie.classList.add('movie');
        const img = document.createElement('img');
        img.src = image;
        const caption= document.createElement('span');
        caption.textContent= title;
        movie.appendChild(img);
        movie.appendChild(caption);
        library.appendChild(movie);
    }
}


function onJsonCast(json){
    console.log('Json regista/cast ricevuto');
    const library = document.querySelector('#movie-view');
    const catalog=document.querySelector('#music-view');
    library.classList.remove('hidden');
    catalog.classList.add('hidden');
    library.innerHTML='';
    const results= json.results;
    for(result of results){    
        console.log(results + 'questo è un result');
        const image = result.image;
        const description = result.description;
        const cast = document.createElement('div');
        cast.classList.add('movie');
        const img = document.createElement('img');
        img.src = image;
        const caption= document.createElement('span');
        caption.textContent= description;
        cast.appendChild(img);
        cast.appendChild(caption);
        library.appendChild(cast);
        
    }
}
function onJsonSound(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const library = document.querySelector('#music-view');
  library.classList.remove('hidden');
  const catalog= document.querySelector('#movie-view');
  catalog.classList.add('hidden');
  catalog.innerHTML= '';
  library.innerHTML = '';
  const results = json.albums.items;
  for(result of results)
  {
    const album= result;
    const title = album.name;
    const artist = album.artists[0].name;
    const music = document.createElement('div');
    music.classList.add('music');
    const caption = document.createElement('span');
    const legend = document.createElement('span');
    caption.textContent = title;
    legend.textContent =artist;
    music.appendChild(caption);
    music.appendChild(legend);
    library.appendChild(music);
  }
}
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event){
    event.preventDefault();
    const content = document.querySelector('#content').value;
    const text= encodeURIComponent(content);
    console.log('ricerca' + text);
    const tipo = document.querySelector('#tipo').value;
    console.log('ricerco elementi di tipo' + tipo);
    if (tipo==='cast'){
        rest_url='https://imdb-api.com/en/API/SearchName/' + api_key +'/'+text;
        console.log(rest_url);
        fetch(rest_url).then(onResponse).then(onJsonCast);
    }else if(tipo==='movie'){
        rest_url='https://imdb-api.com/en/API/SearchMovie/'+ api_key +'/' +text;
        console.log(rest_url);
        fetch(rest_url).then(onResponse).then(onJsonMovie);
    }if(tipo=='sound'){
        fetch("https://api.spotify.com/v1/search?type=album&q=" + text,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonSound);
    }
    
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

const client_id = '3f794e1b4a92450aba004ee2166c39de';
const client_secret = '90d96f51261e434bb118160fbc003a69';
let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onResponse).then(onTokenJson);

const api_key= 'k_ontdklta';
const form = document.querySelector('form');
form.addEventListener('submit', search);