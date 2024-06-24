import { Form, Slider } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function OpponentCount() {
  const fieldKey = "opponentCount";
  const { label } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = initialTrainingSessionConfigState[fieldKey];

  const opponentCountMarks = {
    0: 0,
    63: "63",
  };
  return (
    <Form.Item
      initialValue={initialValue}
      name={fieldKey}
      label={label}
      validateTrigger={["onChange", "onBlur"]}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Slider marks={opponentCountMarks} min={0} max={63} />
    </Form.Item>
  );
}
