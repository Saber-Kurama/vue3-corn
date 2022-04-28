import { defineComponent } from "vue";
import { InputNumber, Radio, Row, Select } from "@arco-design/web-vue";
import { EVERY } from "../constant/filed";

export default defineComponent({
  name: "Corn",
  setup() {
    const inputNumberStyle = {
      width: "100px",
    };
    return () => {
      return (
        <div default-active-key="2">
          <Row>
            <Radio value={EVERY}>
              <div class="d-cron-second-radio-item">
                <sapn>每一秒钟</sapn>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={1}>
              <div class="d-cron-second-radio-item">
                <sapn>从第</sapn>
                <InputNumber mode="button" style={inputNumberStyle} />{" "}
                <sapn>秒开始每</sapn>
                <InputNumber mode="button" style={inputNumberStyle} />
                <sapn>秒</sapn>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={2}>
              <div class="d-cron-second-radio-item">
                <sapn>周期从</sapn>
                <InputNumber mode="button" /> <sapn>到</sapn>
                <InputNumber mode="button" />
                <sapn>秒</sapn>
              </div>
            </Radio>
          </Row>
          <Row>
            <Radio value={3}>
              <div class="d-cron-second-radio-item">
                <sapn>具体秒数</sapn>
                <Select>
                  <Select.Option>Beijing</Select.Option>
                  <Select.Option>Shanghai</Select.Option>
                  <Select.Option>Guangzhou</Select.Option>
                </Select>
              </div>
            </Radio>
          </Row>
        </div>
      );
    };
  },
});
