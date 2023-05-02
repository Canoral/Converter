import './style.scss';

interface TogglerProps {
  isOpen: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggler({ isOpen, toggle }: TogglerProps) {
  const handleClick = () => {
    toggle(!isOpen);
  };

  return (
    <div className="toggler">
      <button
        type="button"
        className={isOpen ? 'toggler-btn toggler-btn--open' : 'toggler-btn'}
        onClick={handleClick}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export default Toggler;
