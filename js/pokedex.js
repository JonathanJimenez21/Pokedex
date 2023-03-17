const listapokemon = document.getElementById("contenedor-pokemon");
const botones = document.getElementById("botones");
let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnSiguiente;
let btnAnterior;
let contenidoHtml;
const colortipo = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const obtenerPokemons = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    DataPokemons(results.results);

    btnSiguiente = results.next
      ? `<button class="btn" data-url=${results.next}>Siguiente</button>`
      : "";
    btnAnterior = results.previous
      ? `<button class="btn" data-url=${results.previous}>Anterior</button>`
      : "";
    botones.innerHTML = btnAnterior + " " + btnSiguiente;
  } catch (error) {
    console.log(error);
  }
};
obtenerPokemons(urlPokemon);

const DataPokemons = async (data) => {
  listapokemon.innerHTML = "";
  try {
    for (let index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      let ct = colortipo[resul.types[0].type.name];
      console.log(resul);
      console.log(ct);
      contenidoHtml = `
          <div class="pokemonimg">
          <img src=${resul.sprites.other.dream_world.front_default} alt=${
        resul.name
      }/>
          <p class="nombrepokemon">${resul.name.toUpperCase()}</p>
          <p style="color:${ct};font-family: sans-serif">${resul.types[0].type.name.toUpperCase()}</p>  
          <p style="color:${ct};font-family: sans-serif">No: ${resul.id}</p>
          <div>
          <p class="stat">${resul.stats[0].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[0].base_stat}</p>
          <p class="stat">${resul.stats[1].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[1].base_stat}</p>
          <p class="stat">${resul.stats[2].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[2].base_stat}</p>
          <p class="stat">${resul.stats[3].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[3].base_stat}</p>
          <p class="stat">${resul.stats[4].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[4].base_stat}</p>
          <p class="stat">${resul.stats[5].stat.name.toUpperCase()} ${
        "" + "  /  " + ""
      } ${resul.stats[5].base_stat}</p>
          </div>
          </div>
          `;
      listapokemon.innerHTML += contenidoHtml;
    }
  } catch (error) {
    console.log(error);
  }
};

botones.addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    let value = e.target.dataset.url;
    console.log(value);
    obtenerPokemons(value);
  }
});
