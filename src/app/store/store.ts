import { createStore } from 'redux';
import {Movie} from "@/app/api/popularMovies";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export interface SearchState {
    filters: {
        genre: string;
        year: string;
        country: string;
    }
    movies: Movie[]
    loading: boolean
    error: string
}

const defaultState: SearchState = {
    filters: {
        genre: '',
        year: '',
        country: ''
    },
    movies: [],
    loading: false,
    error: ''
}

type Action = {
    type: string
    payload?: any
}

const reducer = (state: SearchState = defaultState, action: Action): SearchState => {
    switch (action.type) {
        case 'SET_OPTIONS':
            return { ...state, movies: action.payload }
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;