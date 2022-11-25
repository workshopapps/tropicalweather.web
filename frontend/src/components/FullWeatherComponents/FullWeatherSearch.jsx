import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import { GEO_API_URL, geoApiOptions } from './api';

export default function FullWeatherSearchBar({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => fetch(`${GEO_API_URL}/adminDivisions?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => ({
            options: response.data.map((city) => ({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                })),
        }))
      .catch((err) => console.error(err));

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={700}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}
FullWeatherSearchBar.propTypes = {
  onSearchChange: PropTypes.func,
};
