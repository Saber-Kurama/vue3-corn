import { defineComponent, ref } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import { EVERY, OPTIONS_SELECT } from "../constant/filed";

export default defineComponent({
  name: "Hour",
  setup() {
    const inputNumberStyle = {
      width: "100px",
    };
    const cronEvery = ref(EVERY);
    return () => {
      return (
        <div default-active-key="2">
          <Row>
            <Radio value={EVERY}>
              <div class="d-cron-second-radio-item">
                <span>每一小时</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={1}>
              <div class="d-cron-second-radio-item">
                <span>从第</span>
                <InputNumber mode="button" style={inputNumberStyle} min={0} max={59}/>
                <span>分开始 每</span>
                <InputNumber mode="button" style={inputNumberStyle} min={0} max={59}/>
                <span>分</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={2}>
              <div class="d-cron-second-radio-item">
                <span>周期从</span>
                <InputNumber mode="button" style={inputNumberStyle} min={0} max={59}/> <span>到</span>
                <InputNumber mode="button" style={inputNumberStyle} min={0} max={59}/>
                <span>分</span>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={3}>
              <div class="d-cron-second-radio-item">
                <span>具体分钟数</span>
                <Select options={OPTIONS_SELECT} style={{width: '100px'}}>
                </Select>
              </div>
            </Radio>
          </Row>
        </div>
      );
    };
  },
});
