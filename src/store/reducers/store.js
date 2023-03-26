import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  UPDATE_QUERY,
  UPDATE_YEAR_START,
  UPDATE_YEAR_END,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from '../actions/searchActions';

const initialSearchState = {
  query: '',
  yearStart: '',
  yearEnd: '',
  results: null,
  isLoading: false,
  error: null,
};

function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, query: action.payload };
    case UPDATE_YEAR_START:
      return { ...state, yearStart: action.payload };
    case UPDATE_YEAR_END:
      return { ...state, yearEnd: action.payload };
    case SEARCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SEARCH_SUCCESS:
      return { ...state, results: action.payload, isLoading: false };
    case SEARCH_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  search: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
