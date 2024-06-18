import { Card, Space, Typography } from "antd";
import { Arrow, Target } from "../lib/types";
import cleanAngleValue from "../lib/cleanAngleValue";

const { Text } = Typography;

export interface ArrowDetailTabProps {
  arrow: Partial<Arrow>;
  target: Target;
}

export default function ArrowDetailTab({ arrow, target }: ArrowDetailTabProps) {
  const { value, vector } = arrow;

  const emptyArrow = !vector || value === undefined;

  if (emptyArrow) {
    return <Card>Tap to place an arrow.</Card>;
  } else {
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
}
