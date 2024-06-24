"use client";

import { Form, GlobalToken, Slider } from "antd";
import {
  initialTrainingSessionConfigState,
  trainingSessionFormLabelMap,
} from "../..";
import hexToRgb from "@/lib/hexToRGB";
import useToken from "antd/es/theme/useToken";

export default function OpponentDifficulty({
  value,
}: {
  value: number[] | undefined;
}) {
  const fieldKey = "opponentDifficulty";
  const { label, errorMessage } = trainingSessionFormLabelMap[fieldKey];
  const initialValue = initialTrainingSessionConfigState[fieldKey];

  const [_, token] = useToken();
  const start = value && value[0] / 100;
  const end = value && value[value.length - 1] / 100;

  const opponentLevelMarks = {
    0: "Novice",
    100: "World Record",
    ...(value
      ? {
          [Math.min(...value)]: <>&#9660;</>,
          [value.find(
            (v) => v !== Math.min(...value) && v !== Math.max(...value)
          )!]: "Avg",
          [Math.max(...value)]: <>&#9650;</>,
        }
      : {}),
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
          message: errorMessage,
        },
      ]}
    >
      <Slider
        marks={opponentLevelMarks}
        range
        styles={{
          track: {
            background: "transparent",
          },
          tracks: {
            background: `linear-gradient(to right, ${getGradientColor(
              start || 0,
              token
            )} 0%, ${getGradientColor(end || 0, token)} 100%)`,
          },
        }}
      />
    </Form.Item>
  );
}

function getGradientColor(percentage: number, token: GlobalToken) {
  const { colorSuccess, colorError } = token;
  const startColor = hexToRgb(colorSuccess);
  const endColor = hexToRgb(colorError);

  const midColor = startColor!.map((start, i) => {
    const end = endColor![i];
    const delta = end - start;
    return (start + delta * percentage).toFixed(0);
  });

  return `rgb(${midColor.join(",")})`;
}
