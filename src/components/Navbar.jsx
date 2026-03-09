import React from "react";
import { useCountries } from "../context/CountriesContext";
import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import {useTheme} from '../context/ThemeContext'

export default function Navbar() {
    const { search, setSearch, region, setRegion } = useCountries();
    
      const { theme, toggleTheme } = useTheme();

    return (
       <div className=" navbar bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

      {/* Left: Title */}
      <Link to="/" className="text-2xl font-bold">
        Countries of the World
      </Link>

      {/* Center: Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries..."
        className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 flex-1 md:max-w-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />

      {/* Right: Region Selector & Theme Toggle */}
      <div className="flex items-center gap-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="dropdown border p-2 rounded shadow"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

         <button
      onClick={toggleTheme}
      className="border px-3 py-1 rounded"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
      </div>
    </div>
    );
}