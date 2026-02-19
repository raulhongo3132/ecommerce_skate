/**
 * Utility object to interact with localStorage handling JSON data
 */

export const Storage = {
  /**
   * Saves data to localStorage as JSON string
   * @param {string} key - Storage key
   * @param {Object} data - Data to be stored
   */
  setItem: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  /**
   * Retrieves and parses data from localStorage
   * @param {string} key - Storage key
   * @returns {Object|null} Parsed data or null if not found
   */
  getItem: (key) => {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  /**
   * Retrieves data from localStorage
   * @param {string} key - Storage key
   * @returns {void}
   */
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
};
