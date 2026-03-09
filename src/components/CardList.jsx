import { Link } from "react-router-dom";
import { useCountries } from "../context/CountriesContext";

export default function CountriesList() {
    const { countries, loading, error, search, region } = useCountries();

     const filteredCountries = countries
        .filter((c) =>
            c.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .filter((c) => (region ? c.region === region : true));

    if (loading) return <h2 className="text-center mt-10 dark:text-gray-200 dark:text-gray-200">Loading countries...</h2>;
    if (error) return <h2 className="text-center text-red-500">{error}</h2>;
    return (
       <div className=" grid gap-5 grid-cols-4 ">
            {filteredCountries.map((country) => (
                <Link
                    key={country.name.common}
                    to={`/country/${country.name.common}`}
                    className="country-card bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow hover:shadow-lg text-center transition-transform hover:scale-105"
                >
                    <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="font-semibold">{country.name.common}</p>
                </Link>
            ))}
        </div>
    );
}