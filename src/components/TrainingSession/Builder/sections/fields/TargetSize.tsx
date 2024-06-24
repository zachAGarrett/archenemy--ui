import { Form, Select } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function TargetSize() {
  const fieldKey = "targetSize";
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
          { value: "122", label: <span>122cm</span> },
          { value: "80", label: <span>80cm</span> },
          { value: "60", label: <span>60cm</span> },
          { value: "40", label: <span>40cm</span> },
        ]}
      />
    </Form.Item>
  );
}
