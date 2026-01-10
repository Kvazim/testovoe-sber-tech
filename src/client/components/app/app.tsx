import { Suspense, useEffect } from "react";
import style from "./app.module.css";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomButton } from "../custom-button/custom-button";
import { UiMessage } from "../ui-message/ui-message";
import { Loading } from "../loading/loading";
import { useGetSelectedOptionsQuery } from "../custom-select/selected-api";

function App() {
  const { data, isLoading } = useGetSelectedOptionsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  return (
      <div className={style.container}>
        <CustomSelect options={data} />
        <CustomButton />
        <UiMessage />
      </div>
  );
}

export default App;