import { useState } from "react";
import { root, label, inputSection, inputSectionButton } from "./labeledInput.module.css";
import tinycolor from "tinycolor2";

type Props = Readonly<{
  value: string;
  onChange: (value: tinycolor.Instance) => void;
  isDisabled: boolean;
}>

export const EditColorInput = (props: Props) => {
  const [input, setInput] = useState<null | string>(null);

  const onSubmit = () => {
    setInput(null);

    const parsedColor = tinycolor(input ?? undefined);

    if (input && parsedColor.isValid()) {
      props.onChange(parsedColor);
    }
  };

  const onEdit: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    return input === null ? setInput(props.value) : onSubmit();
  };

  return (
    <div className={root}>
      <label className={label} htmlFor="Color value">Color:</label>
      <form className={inputSection} onSubmit={input === null ? noop : onSubmit}>
        <input
          type="text"
          disabled={props.isDisabled || input === null}
          name="Color value"
          value={input ?? props.value}
          onChange={(e) => input !== null && setInput(e.target.value)} />
        <button type="submit" className={inputSectionButton} onClick={onEdit}>
          {input === null ? "Edit" : "Save"}
        </button>
      </form>
    </div>
  );
};

const noop = () => { };
