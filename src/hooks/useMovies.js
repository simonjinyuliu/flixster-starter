import { useState, useCallback } from 'react';
import { movieApi } from '../services/movieApi';
import { SORT_OPTIONS } from '../config';

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    const fetchNowPlaying = useCallback(async (pageNum) => {
        try {
            const data = await movieApi.fetchNowPlaying(pageNum);
            setMovies(prevMovies => [...prevMovies, ...data.results]);
        } catch (error) {
            console.error("Error fetching now playing movies:", error);
        }
    }, []);

    const searchMovies = useCallback(async (input) => {
        if (!input) return;

        setIsSearching(true);
        setSearchTerm(input);
        setPage(1);

        try {
            const data = await movieApi.searchMovies(input);
            setMovies(data.results);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setIsSearching(false);
        setSearchTerm("");
        setPage(1);
        setMovies([]);
        fetchNowPlaying(1);
    }, [fetchNowPlaying]);

    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNowPlaying(nextPage);
    }, [page, fetchNowPlaying]);

    const toggleFavorite = useCallback((movie) => {
        setFavoriteMovies(prev => {
            const alreadyFavorited = prev.some(fav => fav.id === movie.id);
            if (alreadyFavorited) {
                return prev.filter(fav => fav.id !== movie.id);
            }
            return [...prev, movie];
        });
    }, []);

    const toggleWatched = useCallback((movie) => {
        setWatchedMovies(prev => {
            const alreadyWatched = prev.some(seen => seen.id === movie.id);
            if (alreadyWatched) {
                return prev.filter(seen => seen.id !== movie.id);
            }
            return [...prev, movie];
        });
    }, []);

    const sortMovies = useCallback((movies, sortOption) => {
        const sortedMovies = [...movies];
        switch (sortOption) {
            case SORT_OPTIONS.TITLE:
                return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            case SORT_OPTIONS.RELEASE_DATE:
                return sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            case SORT_OPTIONS.VOTE_AVERAGE:
                return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
            default:
                return sortedMovies;
        }
    }, []);

    return {
        movies,
        setMovies,
        isSearching,
        searchTerm,
        page,
        favoriteMovies,
        watchedMovies,
        fetchNowPlaying,
        searchMovies,
        clearSearch,
        loadMore,
        toggleFavorite,
        toggleWatched,
        sortMovies
    };
};