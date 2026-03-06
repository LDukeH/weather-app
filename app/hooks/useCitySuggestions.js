//this was made for practice

import { useState, useEffect } from "react";
import { autoSuggestCities } from "@/services/api";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useCitySuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        await delay(1000);
        const data = await autoSuggestCities(query);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching auto-suggest cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  return { suggestions, loading };
};
