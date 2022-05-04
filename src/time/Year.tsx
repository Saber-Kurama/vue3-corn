import { defineComponent, ref, watch } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import { EVERY, OPTIONS_HOUR_SELECT, OPTIONS_YEAR_SELECT } from "../constant/filed";
import { getCronEveryText } from "../utils";

export default defineComponent({
  name: "Year",
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
    const inputNumberStyle = {
      width: "130px",
    };
    const cronEvery = ref(EVERY);
    const incrementStart = ref(2022);
    const incrementIncrement = ref(5);
    const rangeStart = ref(2022);
    const rangeEnd = ref(2022);
    const specificSpecific = ref<any>([]);

    watch(
      () => props.modelValue,
      (val) => {
        if (val === "*") {
          cronEvery.value = EVERY;
        } else if (val?.includes("/")) {
          cronEvery.value = "1";
        } else if (val?.includes("-")) {
          cronEvery.value = "2";
        } else if (val) {
          cronEvery.value = "3";
        }
      },
      {
        immediate: true,
      }
    );
    watch(
      [
        cronEvery,
        incrementStart,
        incrementIncrement,
        rangeStart,
        rangeEnd,
        specificSpecific,
      ],
      () => {
        emit(
          "update:modelValue",
          getCronEveryText({
            cronEvery: cronEvery.value,
            incrementStart: incrementStart.value,
            incrementIncrement: incrementIncrement.value,
            rangeStart: rangeStart.value,
            rangeEnd: rangeEnd.value,
            specificSpecific: specificSpecific.value,
          })
        );
      }
    );
    return () => {
      return (
        <div class="d-cron-row-wrap">
          <Row>
            <Radio value={EVERY} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>每一年</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"1"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={2021}
                  max={2100}
                  v-model={incrementStart.value}
                />
                <span>年开始 每</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={99}
                  v-model={incrementIncrement.value}
                />
                <span>年执行</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"2"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={2021}
                  max={2100}
                  v-model={rangeStart.value}
                />{" "}
                <span>到</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={2021}
                  max={2100}
                  v-model={rangeEnd.value}
                />
                <span>年</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"3"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体年份</span>
                <Select
                  options={OPTIONS_YEAR_SELECT}
                  style={{ width: "200px" }}
                  multiple
                  v-model={specificSpecific.value}
                ></Select>
              </div>
            </Radio>
          </Row>
        </div>
      );
    };
  },
});
