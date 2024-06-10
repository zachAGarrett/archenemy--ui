import { DotChartOutlined } from '@ant-design/icons';

export default function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '16px 16px',
      }}
    >
      <DotChartOutlined style={{ fontSize: 100, color: '#bfbfbf' }} />
    </div>
  );
}
