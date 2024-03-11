export interface ActorDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday?: string;
    gender: number;
    homepage?: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    movie_credits: {
        cast: CastDetail[];
        crew: CrewDetail[];
    };
}

export interface CastDetail {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface CrewDetail {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    department: string;
    job: string;
}
