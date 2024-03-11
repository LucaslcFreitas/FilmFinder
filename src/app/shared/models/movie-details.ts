import { Cast } from './cast';

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Language[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: {
        cast: Cast[];
        crew: Crew[];
    };
    videos: {
        results: Video[];
    };
    release_dates: {
        results: Release[];
    };
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface Release {
    iso_3166_1: string;
    release_dates: {
        certification: string;
        descriptors?: object[];
        iso_639_1: string;
        note: string;
        release_date: string;
        type: number;
    }[];
}
