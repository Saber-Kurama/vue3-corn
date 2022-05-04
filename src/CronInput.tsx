import { defineComponent, ref } from "vue";
import { Input, Popover, Button } from "@arco-design/web-vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import Cron from "./Cron";

export default defineComponent({
  name: "CronInput",
  props: {},
  setup(props) {
    const cron = ref("1-15 * 0-20 * * ? *");
    const inputSlots = {
      suffix: () => {
        return <IconCalendar style={{ cursor: "pointer" }} />;
      },
    };
    const popoverSlots = {
      content: () => {
        return (
          <>
            <Cron v-model={cron.value}/>
            <div class="bottom">
              <span>{cron.value}</span>
              <Button type="primary">保存</Button>
              <Button type="primary">取消</Button>
            </div>
          </>
        );
      },
    };
    return () => {
      return (
        <Popover trigger="click" v-slots={popoverSlots} position={'bottom'} content-style={{width: '600px'}}>
          <Input v-slots={inputSlots}></Input>
        </Popover>
      );
    };
  },
});
