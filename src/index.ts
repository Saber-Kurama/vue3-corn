import { App, Plugin } from "vue";
import CronInput from "./CronInput";
const install = (app: App) => {
  app.component(CronInput.name, CronInput);
};

CronInput.install = install;
export default CronInput as unknown as Plugin;
