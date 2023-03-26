export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_YEAR_START = 'UPDATE_YEAR_START';
export const UPDATE_YEAR_END = 'UPDATE_YEAR_END';
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export function updateQuery(query) {
  return { type: UPDATE_QUERY, payload: query };
}

export function updateYearStart(yearStart) {
  return { type: UPDATE_YEAR_START, payload: yearStart };
}

export function updateYearEnd(yearEnd) {
  return { type: UPDATE_YEAR_END, payload: yearEnd };
}

export function search() {
  return async (dispatch, getState) => {
    const { query, yearStart, yearEnd } = getState().search;

    // Dispatch a SEARCH_REQUEST action to indicate that we're starting a search
    dispatch({ type: SEARCH_REQUEST });

    try {
      // Fetch search results from the API
      const response = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image&year_start=${yearStart}&year_end=${yearEnd}`);
      const data = await response.json();

      // Extract the relevant data from the API response
      const results = data.collection.items.map(item => ({
        nasa_id: item.data[0].nasa_id,
        title: item.data[0].title,
        location: item.data[0].location,
        photographer: item.data[0].photographer,
        thumb: item.links[0].href,
        href: item.href,
      }));

      // Dispatch a SEARCH_SUCCESS action with the search results
      dispatch({ type: SEARCH_SUCCESS, payload: results });
    } catch (error) {
      // Dispatch a SEARCH_FAILURE action with the error message
      dispatch({ type: SEARCH_FAILURE, payload: error.message });
    }
  };
}
