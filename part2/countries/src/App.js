import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Hint = ({ hint }) => <div>{hint}</div>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const DetailedInfo = ({ name, capital, population, languages, flag }) => {
  const languageList = Object.getOwnPropertyNames(languages).map(
    (key) => languages[key]
  );

  return (
    <>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h3>Languages</h3>
      <ul>
        {languageList.map((language, idx) => (
          <li key={idx}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="flag" width="150" />
    </>
  );
};

const CountryList = ({ countries, onClick }) => (
  <div>
    {countries.map(({ name, id }, idx) => (
      <div key={id}>
        {name}
        <Button onClick={() => onClick(idx)} label="Show" />
      </div>
    ))}
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Loading data');
  const [hint, setHint] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [detailedInfo, setDetailedInfo] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
      setPlaceholder('Ready to search');
    });
  }, []);

  const extractDetailsToShow = (fullInfo) => ({
    id: fullInfo.cioc,
    name: fullInfo.name.common,
    capital: fullInfo.capital[0],
    population: fullInfo.population,
    languages: fullInfo.languages,
    flag: fullInfo.flags.svg,
  });

  const ifIncluded = (full, part) =>
    full.toLowerCase().search(part.toLowerCase()) >= 0;

  const handleSearch = (event) => {
    const val = event.target.value;
    setInputValue(val);
    setHint('');
    setCountriesToShow([]);
    setDetailedInfo(null);

    if (val) {
      const matched = countries.filter(({ name: { common } }) =>
        ifIncluded(common, val)
      );

      const len = matched.length;
      if (len > 10) {
        setCountriesToShow([]);
        setHint('Too many marches, please specify another filter.');
      } else if (len < 10 && len > 1) {
        const slimData = matched.map((country) =>
          extractDetailsToShow(country)
        );

        setCountriesToShow(slimData);
        setDetailedInfo(null);
      } else if (len === 1) {
        const details = extractDetailsToShow(matched[0]);

        setDetailedInfo(details);
        setCountriesToShow([]);
      }
    }
  };

  const handleToShow = (idx) => {
    const details = countriesToShow[idx];
    setDetailedInfo(details);
    setCountriesToShow([]);
  };

  return (
    <div>
      find countries
      <input
        value={inputValue}
        placeholder={placeholder}
        onChange={handleSearch}
      />
      {detailedInfo && <DetailedInfo {...detailedInfo} />}
      {countriesToShow.length > 1 && (
        <CountryList countries={countriesToShow} onClick={handleToShow} />
      )}
      <Hint hint={hint} />
    </div>
  );
};

export default App;
