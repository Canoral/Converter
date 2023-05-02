import { useEffect, useState } from 'react';

import Currencies from '../Currencies';
import Header from '../Header';
import Result from '../Result';

import { ICurrency } from '../../interfaces';

import './App.scss';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const [currencies, setCurrencies] = useState<ICurrency[] | null>(null);
  const [currency, setCurrency] = useState<ICurrency | null>(null);

  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.exchangerate.host/symbols');
        const json = await response.json();

        const symbols: ICurrency[] = Object.values(json.symbols);

        setCurrencies(symbols); //
        setCurrency(symbols[0]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO : gérer les erreurs
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchResult() {
      if (currency) {
        try {
          const response = await fetch(
            `https://api.exchangerate.host/convert?from=EUR&to=${currency.code}&amount=${amount}`
          );
          const json = await response.json();

          setTotal(json.result);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }

    fetchResult();
  }, [amount, currency]);

  return (
    <div className="converter">
      <Header
        baseAmount={amount}
        setAmount={setAmount}
        isOpen={isOpen}
        toggle={setIsOpen}
      />

      {isOpen && <Currencies list={currencies} setCurrency={setCurrency} />}

      <Result currency={currency} total={total} />
    </div>
  );
}

export default App;
