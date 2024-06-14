import { Card, Space, Typography } from "antd";
import { Arrow, Target } from "../lib/types";
import radiansToDegrees from "../lib/radiansToDegrees";

const { Text } = Typography;

export interface ArrowDetailTabProps {
  arrow: Arrow;
  target: Target;
}

export default function ArrowDetailTab({ arrow, target }: ArrowDetailTabProps) {
  const { value, vector, id } = arrow;

  const cleanAngleValue = (angleInRadians: number) => {
    const possiblyNegativeDegreeValue = radiansToDegrees(angleInRadians) - 90;
    if (possiblyNegativeDegreeValue < 0) {
      return Math.round(360 + possiblyNegativeDegreeValue);
    } else {
      return Math.round(possiblyNegativeDegreeValue);
    }
  };
  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Text strong>Value</Text>
          <Text>{value}</Text>
        </Space>
        <Space>
          <Text strong>Distance</Text>
          {vector.distance && (
            <Text>{Math.round(vector.distance * 10 * target.radius)} mm</Text>
          )}
        </Space>
        <Space>
          <Text strong>Angle</Text>
          {vector.angle && (
            <Text>
              {cleanAngleValue(vector.angle)}
              &deg;
            </Text>
          )}
        </Space>
      </Space>
    </Card>
  );
}
