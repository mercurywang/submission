import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          setCountry(response);
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.data) {
    return <div>not found...</div>;
  }

  const _country = country.data[0];

  return (
    <div>
      <h3>{_country.name.common} </h3>
      <div>capital {_country.capital[0]} </div>
      <div>population {_country.population}</div>
      <img
        src={_country.flags.png}
        height="100"
        alt={`flag of ${_country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
