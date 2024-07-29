import { useConfig, useIsDisabled, useValue } from './customElement/CustomElementContext';
import { serializeColor } from "./colors.ts";
import { sample, element } from "./integrationApp.module.css";
import tinyColor from 'tinycolor2';
import { RgbColorPicker, RgbaColorPicker } from 'react-colorful';
import { EditColorInput } from './components/EditColorInput.tsx';
import tinycolor from 'tinycolor2';

export const IntegrationApp = () => {
  const [elementValue, setElementValue] = useValue();
  const isDisabled = useIsDisabled();
  const config = useConfig();

  const parsedElementColor = tinyColor(elementValue?.color ?? "#FFFFFF");

  const onInputValueChange = (value: tinycolor.Instance) => {
    if (value.isValid()) {
      setElementValue({ color: serializeColor(value, config) });
    }
  };

  return (
    <div className={element}>
      <div style={{ display: "flex", gap: 20 }}>
        <section>
          <EditColorInput isDisabled={isDisabled} value={elementValue?.color ?? ""} onChange={onInputValueChange} />
        </section>
        <div className={sample} style={{ backgroundColor: parsedElementColor.toRgbString() }} />
      </div>
      {config?.useAlpha
        ? <RgbaColorPicker color={parsedElementColor.toRgb()} onChange={c => setElementValue({ color: serializeColor(tinyColor(c), config) })} />
        : <RgbColorPicker color={parsedElementColor.toRgb()} onChange={c => setElementValue({ color: serializeColor(tinyColor(c), config) })} />
      }
    </div>
  );
};

IntegrationApp.displayName = 'IntegrationApp';
