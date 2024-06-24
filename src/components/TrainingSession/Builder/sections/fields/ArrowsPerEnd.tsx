import { Form, InputNumber } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function ArrowsPerEnd() {
  const fieldKey = "arrowsPerEnd";
  const { label, errorMessage } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = initialTrainingSessionConfigState[fieldKey];
  return (
    <Form.Item
      initialValue={initialValue}
      name={fieldKey}
      label={label}
      validateTrigger={["onChange", "onBlur"]}
      rules={[
        {
          required: true,
          message: errorMessage,
        },
      ]}
    >
      <InputNumber min={1} max={12} />
    </Form.Item>
  );
}
