import type { ChangeEvent } from "react";

type ToolbarInputProps = {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ToolbarInput = ({ name, value, onChange }: ToolbarInputProps) => {
  let type = "text";
  if (name === "color" || name === "textColor") type = "color";
  if (name === "width" || name === "height") type = "number";

  return (
    <label>
      <p className="capitalize">{name}</p>
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  );
};
