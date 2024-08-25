import { notFound } from "next/navigation";
import Link from "next/link";

interface Country {
  name: {
    common: string;
    nativeName: { [key: string]: { official: string } };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: { png: string };
  tld: string[];
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  borders: string[];
}

async function getCountry(countryId: string): Promise<Country | undefined> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find(
    (country) =>
      country.name.common.toLowerCase().replace(/ /g, "-") === countryId
  );
}

export default async function CountryDetail({
  params,
}: {
  params: { countryId: string };
}) {
  const country = await getCountry(params.countryId);

  if (!country) {
    notFound();
  }

  return (
    <div className="container pt-[104px] mx-auto min-h-screen p-4 bg-[#f0efef] dark:bg-[#202C36] px-20">
      <Link href="/countries">
        <button className="bg-white dark:bg-[#2B3844] text-gray-800 dark:text-white p-2 rounded-md shadow-md mb-8">
          &larr; Back
        </button>
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-between pb-[80px]">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full md:max-w-[560px] object-cover rounded-lg shadow-md"
        />
        <div className="mt-6 md:mt-0 md:ml-[144px]">
          <h2 className="text-3xl font-bold dark:text-white mb-[23px]">
            {country.name.common}
          </h2>
          <div className="flex flex-wrap gap-[50px]">
            <div className="flex flex-col gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {country.name.common}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Native Name:</strong>{" "}
                {Object.values(country.name.nativeName)?.[0]?.official}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-[68px]">
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Top Level Domain:</strong> {country.tld.join(", ")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Currencies:</strong>{" "}
                {Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            <strong>Border Countries:</strong>
          </p>
          <div className="flex flex-wrap gap-[16px] mt-2">
            {country.borders?.length > 0 ? (
              country.borders.map((border) => (
                <span
                  key={border}
                  className="bg-white dark:bg-[#2B3844] text-gray-800 dark:text-white p-2 rounded-md shadow-md"
                >
                  {border}
                </span>
              ))
            ) : (
              <span className="text-gray-700 dark:text-gray-300">
                No border countries
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
