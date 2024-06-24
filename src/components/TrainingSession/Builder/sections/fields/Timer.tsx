import { Form, Slider } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function Timer({
  value: currentTimerValue,
}: {
  value: number | undefined;
}) {
  const fieldKey = "timer";
  const { label } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = initialTrainingSessionConfigState[fieldKey];

  const timerMarks = {
    0: <>&infin;</>,
    ...(currentTimerValue
      ? {
          [currentTimerValue]:
            currentTimerValue === 0 ? <>&infin;</> : currentTimerValue + "s",
        }
      : {}),
    60: "60s",
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
      <Slider marks={timerMarks} min={0} max={60} />
    </Form.Item>
  );
}
