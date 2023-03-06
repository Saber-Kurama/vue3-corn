import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import {
  cronContextSymbol,
  EVERY,
  OPTIONS_DAY_SELECT,
  OPTIONS_SELECT,
  OPTIONS_WEEK_EN_SELECT,
  OPTIONS_WEEK_SELECT,
} from "../constant/filed";
import { NumberCatch } from "../utils";

const getDayCronEveryText = (cronEvery: any, dayData: any, weekData: any) => {
  if (cronEvery === "*") {
    return {
      day: "*",
      week: "?",
    };
  }
  if (cronEvery === "1") {
    return {
      day: "?",
      week: `${weekData.incrementStart}/${weekData.incrementIncrement}`,
    };
  }
  if (cronEvery === "2") {
    return {
      week: "?",
      day: `${dayData.incrementStart}/${dayData.incrementIncrement}`,
    };
  }
  if (cronEvery === "3") {
    return {
      day: "?",
      week: weekData.specificSpecific?.join(","),
    };
  }
  if (cronEvery === "4") {
    return {
      week: "?",
      day: dayData.specificSpecific?.join(","),
    };
  }
  if (cronEvery === "5") {
    return {
      day: "L",
      week: "?",
    };
  }
  if (cronEvery === "6") {
    return {
      day: "LW",
      week: "?",
    };
  }
  if (cronEvery === "7") {
    return {
      day: `${dayData.cronLastSpecificDomDay}L`,
      week: "?",
    };
  }
  if (cronEvery === "8") {
    return {
      day: `L-${dayData.cronDaysBeforeEomMinus}`,
      week: "?",
    };
  }
  if (cronEvery === "9") {
    return {
      day: `${dayData.cronDaysNearestWeekday}W`,
      week: "?",
    };
  }
  if (cronEvery === "10") {
    return {
      week: `${weekData.cronNthDayDay}#${weekData.cronNthDayNth}`,
      day: "?",
    };
  }
  return {
    day: "*",
    week: "?",
  };
};

export default defineComponent({
  name: "Day",
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    day: String,
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    week: String,
  },
  emits: ["update:day", "update:week"],
  setup(props, { emit }) {
    const inputNumberStyle = {
      width: "120px",
    };
    const cronContext = inject(cronContextSymbol, ref());
    const isEdit = computed(() => {
      return cronContext.value.activeKey === "4";
    });
    const isCronEveryChange = ref(false);
    const cronEvery = ref(EVERY);
    const dayData = reactive({
      incrementStart: 1,
      incrementIncrement: 1,
      rangeStart: 1,
      rangeEnd: 1,
      specificSpecific: [] as any[],
      cronLastSpecificDomDay: 1,
      cronDaysBeforeEomMinus: 1,
      cronDaysNearestWeekday: 1,
    });
    const weekData = reactive({
      incrementStart: 1,
      incrementIncrement: 1,
      specificSpecific: [] as any[],
      cronNthDayDay: "1",
      cronNthDayNth: 1,
    });
    watch(
      [() => props.day, () => props.week],
      ([dayv, weekv]) => {
        if (isEdit.value && isCronEveryChange.value === true) {
          return;
        }
        if (dayv === "*" && weekv === "?") {
          cronEvery.value = EVERY;
          return;
        }
        if (dayv === "?" && weekv?.includes("/")) {
          cronEvery.value = "1";
          const v = weekv.split("/");
          weekData.incrementStart = NumberCatch(v[0]);
          weekData.incrementIncrement = NumberCatch(v[1]);
          return;
        }
        if (weekv === "?" && dayv?.includes("/")) {
          cronEvery.value = "2";
          const v = dayv.split("/");
          dayData.incrementStart = NumberCatch(v[0]);
          dayData.incrementIncrement = NumberCatch(v[1]);
          return;
        }
        if (dayv === "L" && weekv === "?") {
          cronEvery.value = "5";
          return;
        }
        if (dayv === "LW" && weekv === "?") {
          cronEvery.value = "6";
          return;
        }
        if (dayv?.endsWith("L-") && weekv === "?") {
          cronEvery.value = "7";
          dayData.cronLastSpecificDomDay = parseInt(dayv);
          return;
        }
        if (dayv?.startsWith("L") && weekv === "?") {
          cronEvery.value = "8";
          dayData.cronDaysBeforeEomMinus = parseInt(dayv.slice(2));
          return;
        }
        if (dayv?.endsWith("W") && weekv === "?") {
          cronEvery.value = "9";
          dayData.cronDaysNearestWeekday = parseInt(dayv);
          return;
        }
        if (dayv === "?" && weekv?.includes("#")) {
          cronEvery.value = "10";
          const v = weekv.split("#");
          weekData.cronNthDayDay = v[0] as any;
          weekData.cronNthDayNth = NumberCatch(v[1]);
          return;
        }
        if (dayv === "?" && weekv) {
          cronEvery.value = "3";
          const v = weekv.split(",");
          weekData.specificSpecific = v as any[];
          return;
        }
        if (weekv === "?" && dayv) {
          cronEvery.value = "4";
          const v = dayv.split(",");
          dayData.specificSpecific = v as any[];
          return;
        }
      },
      {
        immediate: true,
      }
    );
    watch(cronEvery, () => {
      isCronEveryChange.value = true;
      const text = getDayCronEveryText(cronEvery.value, dayData, weekData);
      emit("update:day", text?.day);
      emit("update:week", text?.week);
    });
    watch([dayData, weekData], () => {
      isCronEveryChange.value = false;
      const text = getDayCronEveryText(cronEvery.value, dayData, weekData);
      emit("update:day", text?.day);
      emit("update:week", text?.week);
    });
    return () => {
      return (
        <div class="d-cron-row-wrap">
          <Row>
            <Radio value={EVERY} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>每一天</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"1"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从</span>
                <Select
                  class="d-corn-text"
                  options={OPTIONS_WEEK_SELECT}
                  style={inputNumberStyle}
                  v-model={weekData.incrementStart}
                />
                <span class="d-corn-text">开始 每隔</span>
                <InputNumber
                  class="d-corn-text"
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={7}
                  v-model={weekData.incrementIncrement}
                />
                <span class="d-corn-text">周执行</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"2"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从</span>
                <InputNumber
                  mode="button"
                  class="d-corn-text"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                  v-model={dayData.incrementStart}
                />
                <span class="d-corn-text">天开始 每隔</span>
                <InputNumber
                  class="d-corn-text"
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                  v-model={dayData.incrementIncrement}
                />
                <span class="d-corn-text">天执行</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"3"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体星期几</span>
                <Select
                  class="d-corn-text"
                  options={OPTIONS_WEEK_SELECT}
                  max-tag-count={2}
                  style={{ width: "252px" }}
                  allow-clear
                  multiple
                  v-model={weekData.specificSpecific}
                ></Select>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"4"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体天数</span>
                <Select
                  class="d-corn-text"
                  options={OPTIONS_DAY_SELECT}
                  max-tag-count={3}
                  style={{ width: "252px" }}
                  allow-clear
                  multiple
                  v-model={dayData.specificSpecific}
                ></Select>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"5"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">在这个月的最后一天</div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"6"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                在这个月的最后一个工作日
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"7"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>在这个月的最后一个</span>
                <Select
                  class="d-corn-text"
                  options={OPTIONS_WEEK_SELECT}
                  style={inputNumberStyle}
                  v-model={dayData.cronLastSpecificDomDay}
                />
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"8"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                  v-model={dayData.cronDaysBeforeEomMinus}
                />
                <span class="d-corn-text">在本月底前</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"9"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>最近的工作日（周一至周五）至本月</span>
                <InputNumber
                  class="d-corn-text"
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                  v-model={dayData.cronDaysNearestWeekday}
                />
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"10"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>在这个月的第</span>
                <InputNumber
                  class="d-corn-text"
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={5}
                  v-model={weekData.cronNthDayNth}
                />
                <Select
                  class="d-corn-text"
                  options={OPTIONS_WEEK_SELECT}
                  style={inputNumberStyle}
                  v-model={weekData.cronNthDayDay}
                ></Select>
              </div>
            </Radio>
          </Row>
        </div>
      );
    };
  },
});
