import { useParams, Link } from "react-router-dom";
import { useCountries } from "../context/CountriesContext";


export default function CountryDetails() {

    const { name } = useParams();
    const { countries } = useCountries();


    if (!countries.length) {
        return <h2 className="text-center mt-10">Loading......</h2>;
    }

    const country = countries.find(
        (c) => c.name.common === name
    );

      if (!country) {
        return <h2 className="text-center mt-10">Country not found</h2>;
    }

    //native name
    const nativeName =
        country.name.nativeName
            ? Object.values(country.name.nativeName)[0].common
            : "None";

    //currencies
    const currencies = country.currencies
        ? Object.values(country.currencies).map((cur) => cur.name)
        : [];

    //languages
    const languages = country.languages
        ? Object.values(country.languages)
        : [];

    // bordering countries
    const borderCountries = country.borders
        ? countries.filter((c) => country.borders.includes(c.cca3))
        : [];


    return (


        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">

            {/* Flag */}
            <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-48 object-cover rounded mb-4"
            />

            <h1 className="text-3xl font-bold mb-6">
                {country.name.common}
            </h1>

            <ul className="space-y-2">

                <li>
                    <strong>Native Name:</strong> {nativeName}
                </li>

                <li>
                    <strong>Population:</strong>{" "}
                    {country.population?.toLocaleString()}
                </li>

                <li>
                    <strong>Region:</strong> {country.region || "None"}
                </li>

                <li>
                    <strong>Sub Region:</strong> {country.subregion || "None"}
                </li>

                <li>
                    <strong>Top Level Domain:</strong>{" "}
                    {country.tld?.length ? country.tld.join(", ") : "None"}
                </li>

                <li>
                    <strong>Currencies:</strong>{" "}
                    {currencies.length ? currencies.join(", ") : "None"}
                </li>

                <li>
                    <strong>Languages:</strong>{" "}
                    {languages.length ? languages.join(", ") : "None"}
                </li>

                <li>
                    <strong>Capital:</strong>{" "}
                    {country.capital ? country.capital.join(", ") : "None"}
                </li>

            </ul>

            {/* Border Countries */}
            <div className="mt-6">
                <strong>Border Countries:</strong>

                <div className="flex flex-wrap gap-2 mt-2">
                    {borderCountries.length > 0 ? (
                        borderCountries.map((border) => (
                            <Link
                                key={border.name.common}
                                to={`/country/${border.name.common}`}
                                className="px-3 py-1 border rounded shadow hover:bg-gray-200"
                            >
                                {border.name.common}
                            </Link>
                        ))
                    ) : (
                        <span className="ml-2">None</span>
                    )}
                </div>
            </div>

        </div>

    );
}