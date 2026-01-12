import { OptionDataWithId, ServerError } from "@client/types/option-data";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomButton } from "../custom-button/custom-button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import style from "./style.module.css";
import { BUTTON_TYPES } from "@lib/const/const";
import { useAddSelectedOptionMutation } from "@lib/api/add-selected-api";

type OptionsFormProps = {
  options: OptionDataWithId;
  onErrorMessage: Dispatch<SetStateAction<string>>;
  onSuccesMessage: Dispatch<SetStateAction<string>>;
}

function OptionsForm({ options, onErrorMessage, onSuccesMessage }: OptionsFormProps) {
  const [selectedValue, setSelectedValue] = useState('');

  const [addSelectedOption, { isLoading, isSuccess, isError } ] = useAddSelectedOptionMutation();

  const handleSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const { message } = await addSelectedOption({
        value: selectedValue,
      }).unwrap();

      onErrorMessage('')
      onSuccesMessage(message);
      console.log("Ответ сервера:", message);

    } catch (err) {
      const {data: {message}} = err as ServerError;

      onSuccesMessage('');
      onErrorMessage(message);
    }
    
  };

  return (
    <form className={style.form} onSubmit={handleSubmitForm}>
      <CustomSelect options={options} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <CustomButton type={BUTTON_TYPES.SUBMIT} style={{marginTop: '5px'}}>Отправить</CustomButton>
    </form>
  );
}

export { OptionsForm };
