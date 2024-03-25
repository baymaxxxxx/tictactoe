import { CirclePicker } from "react-color";

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) => {
  return (
    <CirclePicker
      colors={colors}
      circleSpacing={16}
      color={selectedColor}
      onChange={(color) => onColorChange(color.hex)}
    />
  );
};

export default ColorSelector;
