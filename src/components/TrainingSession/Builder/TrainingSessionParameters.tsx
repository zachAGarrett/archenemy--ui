import { Form, Input } from "antd";
import { FormSectionProps } from "./types";

export default function TrainingSessionParameters({ form }: FormSectionProps) {
  return (
    <Form form={form}>
      <Form.Item
        name="target"
        label="Target"
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ required: true, message: "Select a target" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="distance"
        label="Distance"
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ required: true, message: "Choose a distance" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="timer"
        label="Timer"
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ required: true, message: "Choose a distance" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="arrowsPerEnd"
        label="Arrows per end"
        validateTrigger={["onChange", "onBlur"]}
        rules={[
          { required: true, message: "Select the number of arrows per end" },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
