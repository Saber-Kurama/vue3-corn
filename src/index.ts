import { App, Plugin } from "vue";
import TooltipButton from "./TooltipButton.vue";
const install = (app: App) => {
  app.component(TooltipButton.name, TooltipButton);
};

TooltipButton.install = install;
export default TooltipButton as unknown as Plugin;
