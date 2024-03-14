import { CSSProperties, ReactNode } from 'react';

const style = {
  padding: '40px',
  margin: '0 auto',
  maxWidth: '960px',
} satisfies CSSProperties;

export function Layout({ children }: { children?: ReactNode }) {
  return <div style={style}>{children}</div>;
}
