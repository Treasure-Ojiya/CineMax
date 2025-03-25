// import { getMovies } from "../data/catalogue.js";

export const moviePage = `<section class='container mx-auto py-12'>
            <h2 class='text-3xl font-bold mb-6 text-center'>Popular Movies</h2>
            <div id='movie-list' class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'></div>
          </section>`;
// Fetch movies from API and update DOM
// export function carouselConatiner() {
//   getMovies().then((movies) => {
//     const movieCarousel = document.createElement('div');
//     movieCarousel.classList.add('movie-carousel','grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap:6')

//     movieCarousel.innerHTML = movies
//       .map(
//         (movie) => `
//         <div class="bg-gray-800 p-4 rounded-lg">
//           <img src="${movie.img}" alt="${movie.title}" class="w-full rounded-lg"/>
//           <h3 class="text-xl font-semibold mt-4">${movie.title}</h3>
//           <p class="text-gray-400 text-sm">${movie.year} | ${movie.duration}</p>
//           <button class="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">Watch Now</button>
//         </div>
//       `
//       )
//       .join('');
//   });
// }
