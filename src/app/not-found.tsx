import { Space } from 'antd';
import Link from 'next/link';
import { FrownOutlined } from '@ant-design/icons';
import ContentHeader from './components/contentHeader';

export default function NotFound() {
  return (
    <Space
      direction='vertical'
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <ContentHeader
        title={
          <>
            Oops... <FrownOutlined />
          </>
        }
        subtitle='We misplaced this page.'
      />
      <Link href='/'>Go Home</Link>
    </Space>
  );
}
