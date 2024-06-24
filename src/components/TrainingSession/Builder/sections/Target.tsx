import { Form } from "antd";
import { FormSectionProps } from "./../types";
import TargetSize from "./fields/TargetSize";
import TargetDistance from "./fields/TargetDistance";

export default function Target({ form }: FormSectionProps) {
  return (
    <Form form={form}>
      <TargetSize />
      <TargetDistance />
    </Form>
  );
}
