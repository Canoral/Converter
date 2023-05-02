import Toggler from '../Toggler';

import './style.scss';

interface HeaderProps {
  baseAmount: number;
  isOpen: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ baseAmount, isOpen, toggle, setAmount }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">Converter</h1>

      <p className="header-amount">
        <input
          type="number"
          className="header-amount__input"
          min={1}
          value={baseAmount.toString()}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        euro
      </p>

      <Toggler isOpen={isOpen} toggle={toggle} />
    </header>
  );
}

export default Header;
