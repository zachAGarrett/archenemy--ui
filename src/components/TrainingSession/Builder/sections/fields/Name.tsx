import { Form, Input } from "antd";
import { trainingSessionFormLabelMap } from "../..";

export default function Name() {
  const fieldKey = "name";
  const { label, errorMessage } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = new Date(Date.now()).toLocaleDateString();
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
