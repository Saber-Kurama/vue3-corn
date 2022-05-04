import { defineComponent, ref, watch } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import { EVERY, OPTIONS_HOUR_SELECT } from "../constant/filed";
import { getCronEveryText } from "../utils";

export default defineComponent({
  name: "Hour",
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
      width: "120px",
    };
    const cronEvery = ref(EVERY);
    const incrementStart = ref(3);
    const incrementIncrement = ref(5);
    const rangeStart = ref(0);
    const rangeEnd = ref(0);
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
          {props.modelValue}
          <Row>
            <Radio value={EVERY} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>每一小时</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"1"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从第</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={0}
                  max={59}
                  v-model={incrementStart.value}
                />
                <span>小时开始 每</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={59}
                  v-model={incrementIncrement.value}
                />
                <span>小时</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"2"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>周期从</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={59}
                  v-model={rangeStart.value}
                />{" "}
                <span>到</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={59}
                  v-model={rangeEnd.value}
                />
                <span>小时</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"3"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体小时数</span>
                <Select
                  options={OPTIONS_HOUR_SELECT}
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
