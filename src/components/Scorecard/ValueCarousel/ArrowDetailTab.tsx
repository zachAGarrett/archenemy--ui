import { Col, Row, Space, Typography } from "antd";
import { ArrowData } from ".";
import { Target } from "../lib/types";
import radiansToDegrees from "../lib/radiansToDegrees";

const { Text } = Typography;

export interface ArrowDetailTabProps {
  arrow: ArrowData;
  target: Target;
}

export default function ArrowDetailTab({ arrow, target }: ArrowDetailTabProps) {
  const { value, distance, angle } = arrow;

  const cleanAngleValue = (angleInRadians: number) => {
    const possiblyNegativeDegreeValue = radiansToDegrees(angleInRadians) - 90;
    if (possiblyNegativeDegreeValue < 0) {
      return Math.round(360 + possiblyNegativeDegreeValue);
    } else {
      return Math.round(possiblyNegativeDegreeValue);
    }
  };
  return (
    <Space direction="vertical">
      <Space>
        <Text strong>Value</Text>
        <Text>{value}</Text>
      </Space>
      <Space>
        <Text strong>Distance</Text>
        {distance && (
          <Text>{Math.round(distance * 10 * target.radius)} mm</Text>
        )}
      </Space>
      <Space>
        <Text strong>Angle</Text>
        {angle && (
          <Text>
            {cleanAngleValue(angle)}
            &deg;
          </Text>
        )}
      </Space>
    </Space>
  );
}
