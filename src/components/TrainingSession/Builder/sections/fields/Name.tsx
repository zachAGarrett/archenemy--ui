import { Form, Input } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function Name() {
  const fieldKey = "name";
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
      <Input />
    </Form.Item>
  );
}
