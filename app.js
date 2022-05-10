const input = document.querySelector("#inputUrl");
const button = document.querySelector("#submit");
const movie = document.querySelector(".movie-container");

const poster = document.querySelector(".poster");
const img = document.createElement("img");
poster.appendChild(img);

const error = document.querySelector(".error");

// window.addEventListener("load", function () {
//   input.focus();
// });

input.addEventListener("keyup", getData);
button.addEventListener("click", getMovie);
//will get data from API url

function getData(e) {
  if (e.key === "enter") {
    // means I pressed enter
    getMovie(e);
  }
}

async function getMovie(e) {
  try {
    error.style.display = "none";
    e.preventDefault();
    let movieArr = input.value.split(" ");
    let movieStr = movieArr.join("+");
    const response = await fetch(`https://www.omdbapi.com/?apikey=766cab62&t=${movieStr}`);
    // console.log(response);

    const data = await response.json();
    console.log(response);
    console.log(input.value.toLowerCase());
    if (!data.Title || input.value.toLowerCase() !== data.Title.toLowerCase()) {
      throw Error("There isn't such a movie. Please enter a full valid movie name.");
    }
    createCard(data);
  } catch (err) {
    input.value = "";
    error.style.display = "block";
    error.textContent = `${err}
    `;
  }
}

function createCard(data) {
  movie.style.visibility = "visible";
  //add poster
  img.src = data.Poster;
  img.style.height = "250px";
  //add title + year
  const title = document.querySelector(".title");
  title.classList.add("title");
  title.textContent = ` ${data.Title} (${data.Year})`;
  //add genre
  const genre = document.querySelector(".genre");
  genre.classList.add("genre");
  genre.textContent = data.Genre;
  //add description (plot)
  const plot = document.querySelector(".plot");
  plot.classList.add("plot");
  plot.textContent = data.Plot;
  //add director
  const director = document.querySelector(".director");
  director.classList.add("director");
  director.textContent = `Directed by: ${data.Director}`;
  //add actors
  const actors = document.querySelector(".actors");
  actors.classList.add("actors");
  actors.textContent = `Played by: ${data.Actors}`;
  //add ratings
  const ratings = document.querySelector(".ratings");
  ratings.classList.add("ratings");
  ratings.textContent = "Ratings:";
  const ratingsObj = data.Ratings;
  ratingsObj.forEach((obj) => {
    const pRate = document.createElement("div");
    ratings.appendChild(pRate);
    pRate.textContent = `${obj.Source}: ${obj.Value}`;
  });
  input.value = "";
  input.focus();
}
