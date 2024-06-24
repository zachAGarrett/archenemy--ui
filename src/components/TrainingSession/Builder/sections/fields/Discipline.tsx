import { Form, Select } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";

export default function Discipline() {
  const fieldKey = "discipline";
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
          { value: "recurve", label: <span>Recurve</span> },
          { value: "compound", label: <span>Compound</span> },
          { value: "barebow", label: <span>Barebow</span> },
        ]}
      />
    </Form.Item>
  );
}
