import { Space } from "antd";
import Link from "next/link";
import { FrownOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <Space
      direction="vertical"
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <>
        Oops... <FrownOutlined />
      </>
      <Link href="/">Go Home</Link>
    </Space>
  );
}
