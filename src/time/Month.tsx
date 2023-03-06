import { computed, defineComponent, inject, ref, watch } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import {
  cronContextSymbol,
  EVERY,
  OPTIONS_HOUR_SELECT,
  OPTIONS_MONTH_SELECT,
} from "../constant/filed";
import { getCronEveryText, NumberCatch } from "../utils";

export default defineComponent({
  name: "Month",
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
    const cronContext = inject(cronContextSymbol, ref());
    const cronEvery = ref(EVERY);
    const incrementStart = ref(3);
    const incrementIncrement = ref(5);
    const rangeStart = ref(0);
    const rangeEnd = ref(0);
    const specificSpecific = ref<any>([]);
    const isEdit = computed(() => {
      return cronContext.value.activeKey === "5";
    });
    const isCronEveryChange = ref(false);
    watch(
      () => props.modelValue,
      (val) => {
        if (isEdit.value && isCronEveryChange.value === true) {
          return;
        }
        if (val === "*") {
          cronEvery.value = EVERY;
        } else if (val?.includes("/")) {
          cronEvery.value = "1";
          const v = val.split("/");
          incrementStart.value = NumberCatch(v[0]);
          incrementIncrement.value = NumberCatch(v[1]);
        } else if (val?.includes("-")) {
          cronEvery.value = "2";
          const v = val.split("-");
          rangeStart.value = NumberCatch(v[0]);
          rangeEnd.value = NumberCatch(v[1]);
        } else if (val) {
          cronEvery.value = "3";
          const v = val.split(",");
          specificSpecific.value = v;
        }
      },
      {
        immediate: true,
      }
    );
    watch(cronEvery, () => {
      isCronEveryChange.value = true;
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
    });
    watch(
      [
        incrementStart,
        incrementIncrement,
        rangeStart,
        rangeEnd,
        specificSpecific,
      ],
      () => {
        isCronEveryChange.value = false;
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
                <span>每一月</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"1"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从第</span>
                <InputNumber
                  mode="button"
                  class="d-cron-text"
                  style={inputNumberStyle}
                  min={0}
                  max={12}
                  v-model={incrementStart.value}
                />
                <span class="d-cron-text">开始 每</span>
                <InputNumber
                  class="d-cron-text"
                  mode="button"
                  style={inputNumberStyle}
                  min={0}
                  max={12}
                  v-model={incrementIncrement.value}
                />
                <span class="d-cron-text">月执行</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"2"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>从</span>
                <InputNumber
                  mode="button"
                  class="d-cron-text"
                  style={inputNumberStyle}
                  min={0}
                  max={12}
                  v-model={rangeStart.value}
                />{" "}
                <span class="d-cron-text">到</span>
                <InputNumber
                  mode="button"
                  class="d-cron-text"
                  style={inputNumberStyle}
                  min={0}
                  max={12}
                  v-model={rangeEnd.value}
                />
                <span class="d-cron-text"></span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"3"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体月数</span>
                <Select
                  class="d-cron-text"
                  options={OPTIONS_MONTH_SELECT}
                  max-tag-count={3}
                  style={{ width: "252px" }}
                  allow-clear
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
