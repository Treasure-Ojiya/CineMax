import axios from "https://cdn.skypack.dev/axios"; // Import Axios
import { moviePage } from "./movies.js";

// Define routes with content
const routes = {
  home: `<header class='relative h-screen bg-cover bg-center flex items-center justify-center' style='background-image: url("https://source.unsplash.com/1600x900/?movie");'>
            <div class='bg-black bg-opacity-50 p-8 rounded-lg text-center'>
              <h1 class='text-4xl font-bold'>Welcome to CineMax</h1>
              <p class='mt-2 text-lg'>Your ultimate destination for movie info and updates</p>
              <a href='#movies' onclick='navigate(event, "movies")' class='mt-4 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg'>Explore Now</a>
            </div>
         </header>`,
  movies: moviePage,
  genres: `<section class='container mx-auto py-12'>
              <h2 class='text-3xl font-bold mb-6 text-center'>Genres</h2>
              <p class='text-lg text-center'>Explore movies by genre.</p>
           </section>`,
  contact: `<section class='container mx-auto py-12'>
              <h2 class='text-3xl font-bold mb-6 text-center'>Contact Us</h2>
              <p class='text-lg text-center'>Reach out for any inquiries.</p>
           </section>`,
};

// Function to change content dynamically
function navigate(event, route) {
  event.preventDefault(); // Prevent full-page reload
  window.history.pushState({}, "", route); // Update URL
  document.getElementById("content").innerHTML = routes[route]; // Load new content

  // If navigating to movies, fetch movie data
  if (route === "movies") {
    fetchMovies();
  }
}

// Fetch movies from API and update DOM
function fetchMovies() {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=018658938c2d57aeb0fedfb14c6c0eae&language=en-US&page=1"
    )
    .then((response) => {
      const movies = response.data.results;
      const movieList = document.getElementById("movie-list");

      movieList.innerHTML = movies
        .map(
          (movie) => `
        <div class="bg-gray-800 p-4 rounded-lg">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" class="w-full rounded-lg"/>
          <h3 class="text-xl font-semibold mt-4">${movie.title}</h3>
          <p class="text-gray-400 text-sm">${movie.release_date} | ${movie.vote_average}/10</p>
          <button class="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">Watch Now</button>
        </div>
      `
        )
        .join("");
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// Handle browser back/forward buttons
window.onpopstate = () => {
  const path = window.location.pathname.substring(1) || "home";
  document.getElementById("content").innerHTML = routes[path];
};

// Load home page initially
document.getElementById("content").innerHTML = routes.home;

// ✅ Make navigate function globally accessible
window.navigate = navigate;
