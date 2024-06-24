import { Form } from "antd";
import { FormSectionProps } from "../types";
import OpponentCount from "./fields/OpponentCount";
import OpponentDifficulty from "./fields/OpponentDifficulty";
import Discipline from "./fields/Discipline";

export default function Opponents({ form }: FormSectionProps) {
  const skillValues = Form.useWatch("opponentDifficulty", form) as
    | number[]
    | undefined;

  return (
    <Form form={form}>
      <OpponentCount />
      <Discipline />
      <OpponentDifficulty value={skillValues} />
    </Form>
  );
}
