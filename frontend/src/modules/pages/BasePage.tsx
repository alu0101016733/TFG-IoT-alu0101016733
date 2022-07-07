import SplitScreen from "../../components/splitScreen/SplitScreen";
import SensorCharts from "./SensorCharts";

export const BasePage = () => {
  return <SplitScreen defaultPage={<SensorCharts />} />;
};

export default BasePage;
