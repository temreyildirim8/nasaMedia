import React, { useState } from "react";
import axios from "axios";
import { CURRENT_YEAR, MILLENNIUM, START_MIN } from "../../constants";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [startYear, setStartYear] = useState(MILLENNIUM);
  const [endYear, setEndYear] = useState(CURRENT_YEAR);
  const [searchResults, setSearchResults] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);

  const handleQueryChange = (event) => {
    setSearchStarted(false);
    setQuery(event.target.value);
  };

  const handleStartYearChange = (event) => {
    setSearchStarted(false);
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setSearchStarted(false);
    setEndYear(event.target.value);
  };

  const handleSearch = async () => {
    setSearchStarted(true);
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${query}&media_type=image&year_start=${startYear}&year_end=${endYear}`
      );

      setSearchResults(response.data.collection.items);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSearchResults = () => {
    return searchResults?.map((result) => {
      const data = result.data[0];
      const title = data.title;
      const location = data.location;
      const secondary_creator = data.secondary_creator;
      const thumbnail = result.links[0].href;
      const id = data.nasa_id;

      return (
        <div key={id} className="search-result">
          <img src={thumbnail} alt={title} />
          <div className="search-result-details">
            <p className="search-result-title">{title}</p>
            <p className="search-result-location">{location}</p>
            <p className="search-result-creator">Creator: {secondary_creator}</p>
            <a href={`/show/${id}`} target="_blank" rel="noreferrer" className="search-result-link">View Details</a>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="search-page">
      <h1 className="search-page-title">Search the NASA Media Library</h1>
      <div className="search-form">
        <div className="form-group">
          <label htmlFor="query" className="form-label">Search Query:</label>
          <input type="text" id="query" value={query} onChange={handleQueryChange} className="form-input" required/>
        </div>
        <div className="form-group">
          <label htmlFor="start-year" className="form-label">Start Year:</label>
          <input type="number" min={START_MIN} max={CURRENT_YEAR} id="start-year" value={startYear} onChange={handleStartYearChange} className="form-input"/>
        </div>
        <div className="form-group">
          <label htmlFor="end-year" className="form-label">End Year:</label>
          <input type="number" min={START_MIN} max={CURRENT_YEAR} id="end-year" value={endYear} onChange={handleEndYearChange} className="form-input"/>
        </div>
        <button onClick={handleSearch} disabled={!query || !startYear || !endYear} className="search-button">Search</button>
      </div>
      <div className="search-results">
        {query && searchStarted && searchResults.length > 0 ? (
            renderSearchResults()
          ) : (
            <p> {searchStarted && query && "No results found."}</p>
            // TODO: Handle the searchStarted confusion above
          )
        }
      </div>
    </div>
  );
};

export default SearchPage;