import { Form, Select } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function TargetDistance() {
  const fieldKey = "targetDistance";
  const { label, errorMessage } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = initialTrainingSessionConfigState[fieldKey];
  return (
    <Form.Item
      initialValue={initialValue}
      name={fieldKey}
      label={label}
      validateTrigger={["onChange", "onBlur"]}
      rules={[{ required: true, message: errorMessage }]}
    >
      <Select
        options={[
          { value: "70", label: <span>70m</span> },
          { value: "60", label: <span>60m</span> },
          { value: "50", label: <span>50m</span> },
          { value: "40", label: <span>40m</span> },
          { value: "30", label: <span>30m</span> },
          { value: "18", label: <span>18m</span> },
        ]}
      />
    </Form.Item>
  );
}
