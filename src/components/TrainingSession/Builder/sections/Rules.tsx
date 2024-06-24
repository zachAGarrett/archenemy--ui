import { Form } from "antd";
import { FormSectionProps } from "../types";
import ArrowsPerEnd from "./fields/ArrowsPerEnd";
import Timer from "./fields/Timer";

export default function Rules({ form }: FormSectionProps) {
  const currentTimerValue = Form.useWatch("timer", form) as number;
  return (
    <Form form={form}>
      <ArrowsPerEnd />
      <Timer value={currentTimerValue} />
    </Form>
  );
}
