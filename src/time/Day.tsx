import { defineComponent, ref } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import {
  EVERY,
  OPTIONS_DAY_SELECT,
  OPTIONS_SELECT,
  OPTIONS_WEEK_EN_SELECT,
  OPTIONS_WEEK_SELECT,
} from "../constant/filed";

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
  setup() {
    const inputNumberStyle = {
      width: "120px",
    };
    const cronEvery = ref(EVERY);
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
                  options={OPTIONS_WEEK_SELECT}
                  style={inputNumberStyle}
                />
                <span>开始 每隔</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={7}
                />
                <span>周执行</span>
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
                  min={1}
                  max={31}
                />
                <span>天开始 每隔</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                />
                <span>天执行</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"3"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体星期几</span>
                <Select
                  options={OPTIONS_WEEK_EN_SELECT}
                  style={{ width: "200px" }}
                  multiple
                ></Select>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"4"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>具体天数</span>
                <Select
                  options={OPTIONS_DAY_SELECT}
                  style={{ width: "200px" }}
                  multiple
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
                  options={OPTIONS_WEEK_SELECT}
                  style={inputNumberStyle}
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
                />
                <span>在本月底前</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"9"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>最近的工作日（周一至周五）至本月</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                />
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={"10"} v-model={cronEvery.value}>
              <div class="d-cron-second-radio-item">
                <span>在这个月的第</span>
                <InputNumber
                  mode="button"
                  style={inputNumberStyle}
                  min={1}
                  max={31}
                />
              </div>
            </Radio>
          </Row>         
        </div>
      );
    };
  },
});
