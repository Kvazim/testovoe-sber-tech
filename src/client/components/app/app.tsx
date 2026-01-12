import style from "./app.module.css";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomButton } from "../custom-button/custom-button";
import { UiMessage } from "../ui-message/ui-message";
import { Loading } from "../loading/loading";
import { useGetSelectedOptionsQuery } from "../../../lib/api/selected-api";
import { useAppSelector } from "@lib/redux/redux";
import { selectAdaptData } from "@lib/api/select-adapt-data";

function App() {
  const { isLoading } = useGetSelectedOptionsQuery(undefined);
  const selected = useAppSelector(selectAdaptData);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className={style.container}>
      <CustomSelect options={selected} />
      <CustomButton />
      <UiMessage />
    </div>
  );
}

export default App;