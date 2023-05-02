import { useState } from 'react';

import { ICurrency } from '../../interfaces';

import './style.scss';

interface CurrenciesProps {
  list: ICurrency[] | null;
  setCurrency: React.Dispatch<React.SetStateAction<ICurrency | null>>;
}

function Currencies({ list, setCurrency }: CurrenciesProps) {
  const [search, setSearch] = useState('');

  if (list === null) {
    return <p>Une erreur est survenue</p>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = (currency: ICurrency) => () => {
    setCurrency(currency);
  };

  const filteredList = list.filter((currency) => {
    if (!search.trim().length) {
      return true;
    }

    return currency.description
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  const listItems = filteredList.map((currency) => (
    <li key={currency.code} className="currency">
      <div
        onClick={handleClick(currency)}
        onKeyDown={handleClick(currency)}
        role="button"
        tabIndex={0}
      >
        {currency.description}
      </div>
    </li>
  ));

  return (
    <div className="currencies">
      <input
        type="search"
        className="currencies-search"
        placeholder="Search a currency…"
        aria-label="Search a currency…"
        value={search}
        onChange={handleChange}
      />
      <ul className="currencies-list">{listItems}</ul>
    </div>
  );
}

export default Currencies;
