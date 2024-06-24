'use client';
import { ReactNode } from 'react';

export interface ShowProps {
  when: boolean;
  children: ReactNode;
  otherwise?: ReactNode;
}
const Show = ({ when, children, otherwise }: ShowProps) => {
  if (when) {
    return <>{children}</>;
  } else {
    return otherwise || null;
  }
};
export default Show;
