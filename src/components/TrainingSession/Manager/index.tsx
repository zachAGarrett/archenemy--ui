import { Button, Card, Divider, Flex } from "antd";
import Link from "next/link";

export default function TrainingSessionManager() {
  return (
    <Flex vertical align="center" justify="center" style={{ height: "100%" }}>
      <Card>
        <Flex vertical align="center">
          <Link href="session/new">
            <Button type="primary" size="large">
              Start a new session
            </Button>
          </Link>
          <Divider />
          <Link href="/">
            <Button type="link">Previous sessions</Button>
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
