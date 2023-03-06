import { defineComponent, PropType, ref, watch } from "vue";
import { Input, Popover, Button } from "@arco-design/web-vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import type { TriggerPosition } from "@arco-design/web-vue/es/_utils/constant";
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
    position: {
      type: String as PropType<TriggerPosition>,
      default: "bottom",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    const cron = ref(props.modelValue);
    const inputCron = ref(props.modelValue);
    const popupVisible = ref(false);
    const handlePopupVisibleChange = (visible: boolean) => {
      // _popupVisible.value = visible;
      // console.log('visiblevisible', visible);
    };
    watch(
      () => props.modelValue,
      () => {
        cron.value = props.modelValue;
        inputCron.value = props.modelValue;
      }
    );
    const onOK = () => {
      inputCron.value = cron.value;
      popupVisible.value = false;
    };
    const onCancle = () => {
      popupVisible.value = false;
    };
    watch(inputCron, () => {
      emit("update:modelValue", inputCron);
    });
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
            <div class="d-cron-bottom">
              <div class="d-cron-bottom-text">{cron.value}</div>
              <Button class="d-cron-bottom-button" onClick={onCancle}>
                取消
              </Button>
              <Button
                type="primary"
                class="d-cron-bottom-button"
                onClick={onOK}
              >
                确定
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
          position={props.position}
          content-style={{ width: "600px" }}
          class="d-cron-popover"
          show-arrow={false}
          {...attrs}
        >
          <Input v-slots={inputSlots} v-model={inputCron.value}></Input>
        </Popover>
      );
    };
  },
});
