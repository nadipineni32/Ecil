/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterResults from "./filterResults";

const Menu = () => {
  const [showingSearch, setShowingSearch] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [enteredValue, setEnteredValue] = useState();

  // acts like componentdidUpdate lifecycle method
  useEffect(() => {
    axios.get("http://localhost:3035/search").then(function (response) {
      console.log("Response from Axios");
      setRecords(response.data.body);
    });
  }, []);

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  const showSearchContainer = (e) => {
    e.preventDefault();
    setShowingSearch(!showingSearch);
    setFilteredSuggestions([]);
    setEnteredValue("");
  };

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  const onSearch = (e) => {
    const userInput = e.currentTarget.value;
    setEnteredValue(userInput);
    setFilteredSuggestions([]);
    // Checked the given site, they are filtering only if the digit length is more than 2
    if (userInput && userInput.length > 2) {
      const filteredResults = records.filter((record) =>
        record.tags.filter((tag) => tag.toLowerCase().includes(userInput.toLowerCase()))
      );
      setFilteredSuggestions(filteredResults);
    }
  };

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */

  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>ELC</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>

            <a href="#" onClick={(e) => showSearchContainer(e)}>
              <i className="material-icons search">search</i>
            </a>
          </nav>
        </div>
      </div>
      <div className={(showingSearch ? "showing " : "") + "search-container"}>
        <input type="text" value={enteredValue} onChange={(e) => onSearch(e)} />
        <a href="#" onClick={(e) => showSearchContainer(e)}>
          <i className="material-icons close">close</i>
        </a>
        {filteredSuggestions.length > 0 && (
          <FilterResults results={filteredSuggestions} />
        )}
      </div>
    </header>
  );
};

// Export out the React Component
export default Menu;
