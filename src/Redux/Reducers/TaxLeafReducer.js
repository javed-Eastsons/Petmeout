import {LOGIN_DATA, MY_INFO, MANAGER_INFO} from '../Actions/types';

const initialstate = {
  LOGIN_DATA: {},
  MY_INFO: {},
  MANAGER_INFO: {},
};

const TaxLeafReducer = (state = initialstate, action) => {
  // console.log(
  //   'action.payloadaction.payloadaction.payloadaction.payload',
  //   action.payload,
  // );
  switch (action.type) {
    case LOGIN_DATA:
      return {...state, LOGIN_DATA: action.payload};
    case MY_INFO:
      return {...state, MY_INFO: action.payload};
    case MANAGER_INFO:
      return {...state, MANAGER_INFO: action.payload};
  }

  return state;
};

export default TaxLeafReducer;
