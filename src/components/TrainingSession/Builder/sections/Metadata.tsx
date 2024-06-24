import { Form } from "antd";
import { FormSectionProps } from "../types";
import Name from "./fields/Name";

export default function Metadata({ form }: FormSectionProps) {
  return (
    <Form form={form}>
      <Name />
    </Form>
  );
}
