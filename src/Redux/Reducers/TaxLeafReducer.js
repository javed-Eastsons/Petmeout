import {
  LOGIN_DATA,
  MY_INFO,
  MANAGER_INFO,
  CLIENT_LIST,
  CLIENT_DETAIL,
  REQUEST_INFO,
  REQUEST_INFO_BY_ID,
  FOLDER_LIST,
  DOCUMENT_INFO_FOLDER,
  FILE_UPLOAD_TOKEN,
  FILE_INFO,
  EDITOR_TEXT
} from '../Actions/types';

const initialstate = {
  LOGIN_DATA: {},
  MY_INFO: {},
  MANAGER_INFO: {},
  CLIENT_LIST: {},
  CLIENT_DETAIL: {},
  REQUEST_INFO: {},
  REQUEST_INFO_BY_ID: {},
  FOLDER_LIST: {},
  DOCUMENT_INFO_FOLDER:{},
  FILE_UPLOAD_TOKEN:{},
  FILE_INFO:{},
  EDITOR_TEXT:{}
};

const TaxLeafReducer = (state = initialstate, action) => {
  console.log(
    'action.payloadaction.payloadaction.payloadaction.payload',
    action.payload,
  );
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, LOGIN_DATA: action.payload };
    case MY_INFO:
      return { ...state, MY_INFO: action.payload };
    case MANAGER_INFO:
      return { ...state, MANAGER_INFO: action.payload };
    case CLIENT_LIST:
      return { ...state, CLIENT_LIST: action.payload };
    case CLIENT_DETAIL:
      return { ...state, CLIENT_DETAIL: action.payload };
    case REQUEST_INFO:

      return { ...state, REQUEST_INFO: action.payload };
    case REQUEST_INFO_BY_ID:

      return { ...state, REQUEST_INFO_BY_ID: action.payload };
    case FOLDER_LIST:
     
      return { ...state, FOLDER_LIST: action.payload };
      case DOCUMENT_INFO_FOLDER:
        
        return { ...state, DOCUMENT_INFO_FOLDER: action.payload };
        case FILE_UPLOAD_TOKEN:
        
        return { ...state, FILE_UPLOAD_TOKEN: action.payload };
        case FILE_INFO:

        return { ...state, FILE_INFO: action.payload };
        case EDITOR_TEXT:
          console.log(
            'himmmm',
            action.payload,
          );
        return { ...state, EDITOR_TEXT: action.payload };
  }

  return state;
};

export default TaxLeafReducer;
