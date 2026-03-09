import { createContext, useContext, useEffect, useState } from "react";

const CountriesContext = createContext();

export function CountriesProvider({ children }) {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
const [region, setRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,borders,population,region,subregion,tld,currencies,languages,capital"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        // sort alphabetically
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        
        setCountries(sorted);
      } catch (err) {
        setError("Error loading countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
     <CountriesContext.Provider value={{ countries, loading, error, search, setSearch, region, setRegion }}>
      {children}
    </CountriesContext.Provider>
  );
}

export const useCountries = () => useContext(CountriesContext);
