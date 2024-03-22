import { Tabs, Tab } from '@sima-land/ui-nucleons/tabs';

const items = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Posts',
    href: '/posts',
  },
  {
    name: 'Authors',
    href: '/authors',
  },
];

export function Nav() {
  return (
    <Tabs>
      {items.map((item, index) => (
        <Tab key={index}>
          <a href={item.href} style={{ font: 'inherit', textDecoration: 'none', color: 'inherit' }}>
            {item.name}
          </a>
        </Tab>
      ))}
    </Tabs>
  );
}
