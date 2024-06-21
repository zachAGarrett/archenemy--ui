import { Form, Input } from "antd";
import { FormSectionProps } from "./types";

export default function TrainingSessionName({ form }: FormSectionProps) {
  return (
    <Form form={form}>
      <Form.Item
        name="name"
        label="Session name"
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ required: true, message: "Give your session a name" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
