import styled from "styled-components";
import SymbolSelector from "./SymbolSelector";
import ColorSelector from "./ColorSelector";

interface SymbolColorSettingProps {
  symbols: string[];
  selectedSymbol: string | undefined;
  disableSymbol: string | undefined;
  onSymbolChange: (symbol: string) => void;
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const SymbolColorSetting = ({
  symbols,
  selectedSymbol,
  disableSymbol,
  onSymbolChange,
  colors,
  selectedColor,
  onColorChange,
}: SymbolColorSettingProps) => {
  return (
    <Wrap>
      <SettingWrap>
        <Des>마크</Des>
        <ItemWrap>
          <SymbolSelector
            symbols={symbols}
            selectedSymbol={selectedSymbol}
            disableSymbol={disableSymbol}
            onSymbolChange={onSymbolChange}
          />
        </ItemWrap>
      </SettingWrap>
      <SettingWrap>
        <Des>색상</Des>
        <ItemWrap>
          <ColorSelector
            colors={colors}
            selectedColor={selectedColor}
            onColorChange={onColorChange}
          />
        </ItemWrap>
      </SettingWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 5px;
`;

const Des = styled.p`
  padding-right: 15px;
  font-size: 17px;
  color: black;
  text-align: left;
`;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default SymbolColorSetting;
