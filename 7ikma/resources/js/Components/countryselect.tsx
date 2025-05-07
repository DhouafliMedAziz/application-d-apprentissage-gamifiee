import { useState, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

export default function CountryChooser() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const countryData = [
      { code: 'DZ', name: 'Algeria', region: 'Arabic' },
      { code: 'BH', name: 'Bahrain', region: 'Arabic' },
      { code: 'KM', name: 'Comoros', region: 'Arabic' },
      { code: 'DJ', name: 'Djibouti', region: 'Arabic' },
      { code: 'EG', name: 'Egypt', region: 'Arabic' },
      { code: 'IQ', name: 'Iraq', region: 'Arabic' },
      { code: 'JO', name: 'Jordan', region: 'Arabic' },
      { code: 'KW', name: 'Kuwait', region: 'Arabic' },
      { code: 'LB', name: 'Lebanon', region: 'Arabic' },
      { code: 'LY', name: 'Libya', region: 'Arabic' },
      { code: 'MR', name: 'Mauritania', region: 'Arabic' },
      { code: 'MA', name: 'Morocco', region: 'Arabic' },
      { code: 'OM', name: 'Oman', region: 'Arabic' },
      { code: 'PS', name: 'Palestine', region: 'Arabic' },
      { code: 'QA', name: 'Qatar', region: 'Arabic' },
      { code: 'SA', name: 'Saudi Arabia', region: 'Arabic' },
      { code: 'SO', name: 'Somalia', region: 'Arabic' },
      { code: 'SD', name: 'Sudan', region: 'Arabic' },
      { code: 'SY', name: 'Syria', region: 'Arabic' },
      { code: 'TN', name: 'Tunisia', region: 'Arabic' },
      { code: 'AE', name: 'United Arab Emirates', region: 'Arabic' },
      { code: 'YE', name: 'Yemen', region: 'Arabic' },

      { code: 'AL', name: 'Albania', region: 'Europe' },
      { code: 'AD', name: 'Andorra', region: 'Europe' },
      { code: 'AT', name: 'Austria', region: 'Europe' },
      { code: 'BY', name: 'Belarus', region: 'Europe' },
      { code: 'BE', name: 'Belgium', region: 'Europe' },
      { code: 'BA', name: 'Bosnia and Herzegovina', region: 'Europe' },
      { code: 'BG', name: 'Bulgaria', region: 'Europe' },
      { code: 'HR', name: 'Croatia', region: 'Europe' },
      { code: 'CY', name: 'Cyprus', region: 'Europe' },
      { code: 'CZ', name: 'Czech Republic', region: 'Europe' },
      { code: 'DK', name: 'Denmark', region: 'Europe' },
      { code: 'EE', name: 'Estonia', region: 'Europe' },
      { code: 'FI', name: 'Finland', region: 'Europe' },
      { code: 'FR', name: 'France', region: 'Europe' },
      { code: 'DE', name: 'Germany', region: 'Europe' },
      { code: 'GR', name: 'Greece', region: 'Europe' },
      { code: 'HU', name: 'Hungary', region: 'Europe' },
      { code: 'IS', name: 'Iceland', region: 'Europe' },
      { code: 'IE', name: 'Ireland', region: 'Europe' },
      { code: 'IT', name: 'Italy', region: 'Europe' },
      { code: 'LV', name: 'Latvia', region: 'Europe' },
      { code: 'LI', name: 'Liechtenstein', region: 'Europe' },
      { code: 'LT', name: 'Lithuania', region: 'Europe' },
      { code: 'LU', name: 'Luxembourg', region: 'Europe' },
      { code: 'MT', name: 'Malta', region: 'Europe' },
      { code: 'MD', name: 'Moldova', region: 'Europe' },
      { code: 'MC', name: 'Monaco', region: 'Europe' },
      { code: 'ME', name: 'Montenegro', region: 'Europe' },
      { code: 'NL', name: 'Netherlands', region: 'Europe' },
      { code: 'MK', name: 'North Macedonia', region: 'Europe' },
      { code: 'NO', name: 'Norway', region: 'Europe' },
      { code: 'PL', name: 'Poland', region: 'Europe' },
      { code: 'PT', name: 'Portugal', region: 'Europe' },
      { code: 'RO', name: 'Romania', region: 'Europe' },
      { code: 'RU', name: 'Russia', region: 'Europe' },
      { code: 'SM', name: 'San Marino', region: 'Europe' },
      { code: 'RS', name: 'Serbia', region: 'Europe' },
      { code: 'SK', name: 'Slovakia', region: 'Europe' },
      { code: 'SI', name: 'Slovenia', region: 'Europe' },
      { code: 'ES', name: 'Spain', region: 'Europe' },
      { code: 'SE', name: 'Sweden', region: 'Europe' },
      { code: 'CH', name: 'Switzerland', region: 'Europe' },
      { code: 'UA', name: 'Ukraine', region: 'Europe' },
      { code: 'GB', name: 'United Kingdom', region: 'Europe' },
      { code: 'VA', name: 'Vatican City', region: 'Europe' }
    ];

    setCountries(countryData);
    setFilteredCountries(countryData);
  }, []);

  // Handle filter changes
  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [filterText, countries]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilterText('');
      setFilteredCountries(countries);
    }
  };

  // Select a country
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  // Component for rendering each country in the list
  const CountryOption = ({ country }) => {
    const isSelected = selectedCountry && selectedCountry.code === country.code;

    return (
      <div
        className={`flex items-center p-2 cursor-pointer z-[100] hover:bg-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
        onClick={() => handleSelectCountry(country)}

      >
        <div className="w-8 mr-2">
          <img
            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
            alt={`${country.name} flag`}
            className="w-6 h-4 object-cover"
          />
        </div>
        <span className="flex-grow">{country.name}</span>
        {isSelected && <Check size={16} className="text-blue-500" />}
      </div>
    );
  };

  // Group countries by region
  const arabicCountries = filteredCountries.filter(country => country.region === 'Arabic');
  const europeanCountries = filteredCountries.filter(country => country.region === 'Europe');

  return (
    <div className=" relative "  >
      <div className="text-sm font-medium mb-1 text-gray-700">Select Country</div>

      {/* Dropdown toggle button */}
      <button
      style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {selectedCountry ? (
          <div className="flex items-center">
            <div className="w-8 mr-2">
              <img
                src={`https://flagpedia.net/data/flags/w580/${selectedCountry.code.toLowerCase()}.webp?v=un`}
                alt={`${selectedCountry.name} flag`}
                className="w-6 h-4 object-cover"
              />
            </div>
            <span>{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select a country</span>
        )}
        <ChevronDown size={16} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
          {/* Search input */}
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="p-3 text-center text-gray-500">No countries found</div>
          ) : (
            <div>
              {/* Arabic countries section */}
              {arabicCountries.length > 0 && (
                <div>
                  <div className="bg-gray-100 p-2 font-medium text-sm">Arabic Countries</div>
                  {arabicCountries.map(country => (
                    <CountryOption key={country.code} country={country} />
                  ))}
                </div>
              )}

              {/* European countries section */}
              {europeanCountries.length > 0 && (
                <div>
                  <div className="bg-gray-100 p-2 font-medium text-sm">European Countries</div>
                  {europeanCountries.map(country => (
                    <CountryOption key={country.code} country={country} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
