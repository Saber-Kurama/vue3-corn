import { computed, defineComponent, ref, watch } from "vue";
import { Tabs, TabPane } from "@arco-design/web-vue";
import Second from "./time/Second";
import Minute from "./time/Minute";
import Hour from "./time/Hour";
import Day from "./time/Day";
import Month from "./time/Month";
import Year from "./time/Year";
import { getCronByText } from "./utils";

const getCornText = ({ second, minute, hour, day, month, week, year }: any) => {
  return `${second} ${minute} ${hour} ${day} ${month} ${week} ${year}`;
};

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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const second = ref("*");
    const minute = ref("*");
    const hour = ref("*");
    const day = ref("*");
    const week = ref("?");
    const month = ref("*");
    const year = ref("*");
    watch([second, minute, hour, day, week, month, year], () => {
      emit(
        "update:modelValue",
        getCornText({
          second: second.value,
          minute: minute.value,
          hour: hour.value,
          day: day.value,
          week: week.value,
          month: month.value,
          year: year.value
        })
      );
    });
    watch(() => props.modelValue, () => {
      const d = getCronByText(props.modelValue || '');
      second.value = d.second;
      minute.value = d.minute;
      hour.value = d.hour;
      day.value = d.day;
      week.value = d.week;
      month.value = d.month;
      year.value = d.year;
    }, {
      immediate: true,
    })
    return () => {
      return (
        <Tabs default-active-key="1">
          <TabPane key="1" title="秒">
            <Second v-model={second.value} />
          </TabPane>
          <TabPane key="2" title="分">
            <Minute v-model={minute.value} />
          </TabPane>
          <TabPane key="3" title="时">
            <Hour v-model={hour.value} />
          </TabPane>
          <TabPane key="4" title="日">
            <Day
              v-models={[
                [day.value, "day"],
                [week.value, "week"],
              ]}
            />
          </TabPane>
          <TabPane key="5" title="月">
            <Month v-model={month.value} />
          </TabPane>
          {/* <TabPane key="6" title="周">
            Content of Tab Panel 2
          </TabPane> */}
          <TabPane key="7" title="年">
            <Year v-model={year.value} />
          </TabPane>
          {/* <TabPane key="8" title="帮助">
            Content of Tab Panel 2
          </TabPane> */}
        </Tabs>
      );
    };
  },
});
