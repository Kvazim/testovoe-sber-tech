import style from "./app.module.css";

import { UiMessage } from "../ui-message/ui-message";
import { Loading } from "../loading/loading";
import { useGetSelectedOptionsQuery } from "../../../lib/api/get-selected-data-api";
import { useAppSelector } from "@lib/redux/redux";
import { selectAdaptData } from "@lib/api/select-adapt-data";
import { OptionsForm } from "../options-form/options-form";
import { useState } from "react";

function App() {
  const [succesMesage, setSuccesMesage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading } = useGetSelectedOptionsQuery(undefined);
  const selected = useAppSelector(selectAdaptData);

  if (isLoading) {
    return <Loading />;
  }

  if (selected.length === 0) {
    return (
      <div className={style.container}>Нет данных для отображения</div>
    )
  }

  return (
    <div className={style.container}>
      <OptionsForm options={selected} onErrorMessage={setErrorMessage} onSuccesMessage={setSuccesMesage} />
      <UiMessage style={{ marginTop: '15px' }}>{errorMessage || succesMesage}</UiMessage>
    </div>
  );
}

export default App;