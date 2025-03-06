import axios from "https://cdn.skypack.dev/axios";

// Define routes and their corresponding content
const routes = {
  home: `
    <header class='relative h-screen bg-cover bg-center flex items-center justify-center' style='background-image: url("https://source.unsplash.com/1600x900/?movie");'>
      <div class='bg-black bg-opacity-50 p-8 rounded-lg text-center'>
        <h1 class='text-4xl font-bold'>Welcome to CineMax</h1>
        <p class='mt-2 text-lg'>Your ultimate destination for movie info and updates</p>
        <a href="#" onclick="navigate(event, 'movies')" class='mt-4 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg'>Explore Now</a>
      </div>
    </header>
  `,
  movies: `<div id="movies-content"><h2 class='text-3xl font-bold mb-6 text-center'>Popular Movies</h2></div>`,
  genres: `<section class='container mx-auto py-12'><h2 class='text-3xl font-bold mb-6 text-center'>Genres</h2><p class='text-lg text-center'>Explore movies by genre.</p></section>`,
  contact: `<section class='container mx-auto py-12'><h2 class='text-3xl font-bold mb-6 text-center'>Contact Us</h2><p class='text-lg text-center'>Reach out for any inquiries.</p></section>`,
};

// Function to handle navigation
function navigate(event, route) {
  event.preventDefault();
  window.history.pushState({}, "", route);
  loadPage(route);
}

// Function to load the correct page
async function loadPage(route) {
  const content = document.getElementById("content");
  content.innerHTML =
    routes[route] ||
    "<h2 class='text-3xl font-bold text-center'>Page Not Found</h2>";

  if (route === "movies") {
    fetchMovies(); // Fetch movies when movies page is loaded
  }
}

// Function to fetch movies using Axios
async function fetchMovies() {
  const apiKey = "YOUR_TMDB_API_KEY"; // Replace with your TMDb API Key
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results;

    const moviesGrid = document.createElement("div");
    moviesGrid.className =
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

    movies.forEach((movie) => {
      const movieCard = `
        <div class="bg-gray-800 p-4 rounded-lg">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" class="w-full rounded-lg"/>
          <h3 class="text-xl font-semibold mt-4">${movie.title}</h3>
          <p class="text-gray-400 text-sm">${movie.release_date} | ${movie.vote_average}/10</p>
          <button class="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">Watch Now</button>
        </div>
      `;
      moviesGrid.innerHTML += movieCard;
    });

    document.getElementById("movies-content").appendChild(moviesGrid);
  } catch (error) {
    console.error("Error fetching movies:", error);
    document.getElementById("movies-content").innerHTML +=
      "<p class='text-red-500'>Failed to load movies. Please try again.</p>";
  }
}

// Handle back/forward navigation
window.onpopstate = () => {
  const path = window.location.pathname.substring(1) || "home";
  loadPage(path);
};

// Load initial page
loadPage("home");
