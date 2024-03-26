interface SymbolSelectorProps {
  symbols: string[];
  selectedSymbol: string | undefined;
  disableSymbol: string | undefined;
  onSymbolChange: (symbol: string) => void;
}

const SymbolSelector = ({
  symbols,
  selectedSymbol,
  disableSymbol,
  onSymbolChange,
}: SymbolSelectorProps) => {
  return (
    <div>
      {symbols.map((symbol, index) => (
        <label key={index}>
          <input
            type="radio"
            value={symbol}
            onChange={() => onSymbolChange(symbol)}
            checked={selectedSymbol === symbol}
            disabled={disableSymbol === symbol}
          />
          {symbol}
        </label>
      ))}
    </div>
  );
};

export default SymbolSelector;
