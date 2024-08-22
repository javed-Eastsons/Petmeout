import {
  LOGIN_DATA,
  PET_LIST,
  COUNTRY_LIST,
  STATE_LIST,
  CITY_LIST,
  CATEGORY_LIST,
  BREED_LIST,
  ALL_POSTS,
  ALLPETS_CATEGORY,
  USER_DATA,
  DISTANCE,
  POSTS_BY_PETID,
  POSTS_COMMENTS,
  LOGIN_PET,
  PET_DETAILS,
  MATING_LIST,
  VACCINATION_LIST,
} from '../Actions/types';

const initialstate = {
  LOGIN_DATA: {},
  PET_LIST: {},
  COUNTRY_LIST: {},
  STATE_LIST: [],
  CITY_LIST: [],
  CATEGORY_LIST: [],
  BREED_LIST: [],
  ALL_POSTS: [],
  ALLPETS_CATEGORY: [],
  USER_DATA: [],
  DISTANCE: "",
  POSTS_BY_PETID: [],
  POSTS_COMMENTS: [],
  LOGIN_PET: [],
  PET_DETAILS: [],
  MATING_LIST: [],
  VACCINATION_LIST: [],
};

const PetmeOutReducer = (state = initialstate, action) => {
  switch (action.type) {

    case LOGIN_DATA:
      return { ...state, LOGIN_DATA: action.payload };
    case PET_LIST:

      return { ...state, PET_LIST: action.payload };
    case COUNTRY_LIST:

      return { ...state, COUNTRY_LIST: action.payload };
    case STATE_LIST:

      return { ...state, STATE_LIST: action.payload };
    case CITY_LIST:

      return { ...state, CITY_LIST: action.payload };
    case CATEGORY_LIST:

      return { ...state, CATEGORY_LIST: action.payload };
    case BREED_LIST:

      return { ...state, BREED_LIST: action.payload };
    case ALL_POSTS:

      return { ...state, ALL_POSTS: action.payload };
    case ALLPETS_CATEGORY:

      return { ...state, ALLPETS_CATEGORY: action.payload };

    case USER_DATA:
      return { ...state, USER_DATA: action.payload };
    case DISTANCE:
      return { ...state, DISTANCE: action.payload };
    case POSTS_BY_PETID:
      return { ...state, POSTS_BY_PETID: action.payload };
    case POSTS_COMMENTS:
      return { ...state, POSTS_COMMENTS: action.payload };
    case LOGIN_PET:
      return { ...state, LOGIN_PET: action.payload };
    case PET_DETAILS:
      return { ...state, PET_DETAILS: action.payload };
    case MATING_LIST:
      return { ...state, MATING_LIST: action.payload };
    case VACCINATION_LIST:
      return { ...state, VACCINATION_LIST: action.payload };
   
  }

  return state;
};

export default PetmeOutReducer;
