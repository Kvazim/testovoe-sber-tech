import { OptionDataWithId } from "@client/types/option-data";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomButton } from "../custom-button/custom-button";
import { useState } from "react";

type OptionsFormProps = {
  options: OptionDataWithId;
}

function OptionsForm({ options }: OptionsFormProps) {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <form>
      <CustomSelect options={options} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <CustomButton />
    </form>
  );
}

export { OptionsForm };