import { defineComponent } from "vue";
import { Input, Popover } from "@arco-design/web-vue";
import { IconCalendar } from '@arco-design/web-vue/es/icon'
import Cron from "./Cron";

export default defineComponent({
  name: "CronInput",
  props: {},
  setup(props) {
    const inputSlots = {
      suffix: () => {
        return <IconCalendar style={{cursor: 'pointer'}}/>
      } 
    }
    const popoverSlots = {
      content: () => {
        return (
          <Cron />
        )
      }
    }
    return () => {
      return (
        <Popover trigger="click" v-slots={popoverSlots}>
          <Input  v-slots={inputSlots}>
          </Input>
        </Popover>
      );
    };
  },
});
