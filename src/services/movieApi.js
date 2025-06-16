import { API_KEY } from '../config';

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
    },
};

export const movieApi = {
    fetchNowPlaying: async (page) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
                options
            );
            return await response.json();
        } catch (error) {
            console.error("Now playing movies fetch failed: ", error);
            throw error;
        }
    },

    searchMovies: async (query) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${query}`,
                options
            );
            return await response.json();
        } catch (error) {
            console.error("Searching error: ", error);
            throw error;
        }
    },

    fetchMovieDetails: async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}`,
                options
            );
            return await response.json();
        } catch (error) {
            console.error("Movie details fetch failed: ", error);
            throw error;
        }
    },

    fetchMovieVideos: async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos`,
                options
            );
            return await response.json();
        } catch (error) {
            console.error("Movie videos fetch failed: ", error);
            throw error;
        }
    }
};