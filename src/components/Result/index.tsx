import { ICurrency } from '../../interfaces';

import './style.scss';

interface ResultProps {
  currency: ICurrency | null;
  total: number;
}

function Result({ currency, total }: ResultProps) {
  return (
    <div className="result">
      <span className="result-value">{total ? total.toFixed(2) : '–'}</span>
      <span className="result-currency">
        {currency ? currency.description : '–'}
      </span>
    </div>
  );
}

export default Result;
