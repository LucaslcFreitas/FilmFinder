import { Actor } from '../../models/actor';
import { Cast } from '../../models/cast';

export const mockActorCast: Cast = {
    adult: false,
    gender: 2,
    id: 3084,
    known_for_department: 'Acting',
    name: 'Marlon Brando',
    original_name: 'Marlon Brando',
    popularity: 21.017,
    profile_path: '/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg',
    cast_id: 146,
    character: 'Don Vito Corleone',
    credit_id: '6489aa85e2726001072483a9',
    order: 0,
};

export const mockActor: Actor = {
    adult: false,
    gender: 2,
    id: 3084,
    known_for_department: 'Acting',
    name: 'Marlon Brando',
    original_name: 'Marlon Brando',
    popularity: 21.017,
    profile_path: '/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg',
    known_for: [],
};
