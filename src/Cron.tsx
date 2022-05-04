import { computed, defineComponent, ref, watch } from "vue";
import { Tabs, TabPane } from "@arco-design/web-vue";
import Second from "./time/Second";
import Minute from "./time/Minute";
import Hour from "./time/Hour";

const getCornText = ({second}: any) => {
  return `${second} `
}
export default defineComponent({
  name: "Corn",
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: String,
  },
  emits: [
    'update:modelValue',
  ],
  setup(props, {emit}) {
    const second = ref('*');
    watch([second], () => {
      emit('update:modelValue', getCornText({second: second.value}))
    })
    return () => {
      return (
        <Tabs default-active-key="1">
          <TabPane key="1" title="秒">
            <Second v-model={second.value} />
          </TabPane>
          <TabPane key="2" title="分">
            <Minute />
          </TabPane>
          <TabPane key="3" title="时">
            <Hour />
          </TabPane>
          <TabPane key="4" title="日">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="5" title="月">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="6" title="周">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="7" title="年">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="8" title="帮助">
            Content of Tab Panel 2
          </TabPane>
        </Tabs>
      );
    };
  },
});
