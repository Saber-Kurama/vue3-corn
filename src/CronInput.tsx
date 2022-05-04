import { defineComponent, ref, watch } from "vue";
import { Input, Popover, Button } from "@arco-design/web-vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import Cron from "./Cron";

export default defineComponent({
  name: "CronInput",
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const cron = ref(props.modelValue);
    const inputCron = ref(props.modelValue);
    const popupVisible = ref(false);
    const handlePopupVisibleChange = (visible: boolean) => {
      // _popupVisible.value = visible;
      // console.log('visiblevisible', visible);
    };
    const onOK = () => {
      inputCron.value = cron.value;
      popupVisible.value = false; 
    }
    const onCancle = () => {
      popupVisible.value = false;
    }
    watch(inputCron, () => {
      emit('update:modelValue', inputCron) 
    })
    const inputSlots = {
      suffix: () => {
        return <IconCalendar style={{ cursor: "pointer" }} />;
      },
    };
    const popoverSlots = {
      content: () => {
        return (
          <>
            <Cron v-model={cron.value} />
            <div class="d-corn-bottom">
              <div class="d-corn-bottom-text">{cron.value}</div>
              <Button type="primary" class="d-corn-bottom-button" onClick={onOK}>
                保存
              </Button>
              <Button type="primary" class="d-corn-bottom-button" onClick={onCancle}>
                取消
              </Button>
            </div>
          </>
        );
      },
    };
    return () => {
      return (
        <Popover
          trigger="click"
          v-slots={popoverSlots}
          v-model={[popupVisible.value, "popupVisible"]}
          onPopupVisibleChange={handlePopupVisibleChange}
          position={"bottom"}
          content-style={{ width: "600px" }}
        >
          <Input v-slots={inputSlots} v-model={inputCron.value} ></Input>
        </Popover>
      );
    };
  },
});
