import { IconChevronDown, IconHome, IconArticle, IconBulb, IconFileCv, IconAddressBook, IconLogin } from '@tabler/icons-react';
import { Burger, Center, Container, Drawer, Group, Menu, Stack } from '@mantine/core';
import classes from './HeaderMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

const links = [
  { link: '/home', label: 'Home', icon: IconHome },
  {
    label: 'Projects',
    icon: IconBulb,
    links: [
      { link: 'https://github.com/mpphelps/PeanutGameEngine', label: 'Peanut Game Engine' },
      { link: 'https://mpphelps.github.io/Etch-a-Sketch/', label: 'Etch A Sketch' },
      { link: 'https://github.com/mpphelps/ArduinoSnakeGame', label: 'Arduino Snake Game' },
      { link: `${window.location.origin}/matrix`, label: 'Matrix Rain' },
    ],
  },
  { link: '/blog', label: 'Blog', icon: IconArticle },
  { link: '/resume', label: 'Resume', icon: IconFileCv },
  { link: '/contact', label: 'Contact', icon: IconAddressBook },
  { link: '/login', label: 'Login', icon: IconLogin, hover: 'meow' },
];

export function HeaderMenu() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => window.open(item.link)}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={() => {
                if (link.link) navigate(link.link);
              }}
            >
              <Center>
                {link.icon && <link.icon size={14} stroke={1.6} style={{ marginRight: 6, color: 'var(--sf-accent)' }} />}
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.6} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(e) => {
          e.preventDefault();
          if (link.link) navigate(link.link);
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {link.icon && <link.icon size={14} stroke={1.6} style={{ marginRight: 6, color: 'var(--sf-accent)' }} />}
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.brand} onClick={() => navigate('/home')} role="link" tabIndex={0}>
            <span className={classes.brandMark}>M</span>
            <span className={classes.brandName}>MICHAEL PHELPS</span>
          </div>
          {/* Header icons visible when page is larger than sm*/}
          <Group gap={2} visibleFrom="sm" className={classes.navGroup}>
            {items}
          </Group>
          {/* Header icons hidden, show burger menu when page is smaller than sm*/}
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>

      <Drawer opened={opened} onClose={toggle} size="100%" padding={0} title="// NAVIGATION" hiddenFrom="sm" zIndex={1000}>
        <Stack gap={0}>
          {links.map((link) => {
            if (link.links) {
              return (
                <div key={link.label} className={classes.drawerGroup}>
                  <div className={classes.drawerGroupLabel}>
                    {link.icon && <link.icon size={14} stroke={1.6} style={{ color: 'var(--sf-accent)' }} />}
                    <span>{link.label}</span>
                  </div>
                  <div className={classes.drawerSubList}>
                    {link.links.map((subLink) => (
                      <a
                        key={subLink.link}
                        href={subLink.link}
                        className={classes.drawerSubLink}
                        onClick={(event) => {
                          event.preventDefault();
                          toggle();
                          window.open(subLink.link);
                        }}
                      >
                        <span className={classes.drawerSubArrow}>›</span>
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={link.link}
                className={classes.drawerLink}
                onClick={(event) => {
                  event.preventDefault();
                  toggle();
                  navigate(link.link);
                }}
              >
                {link.icon && <link.icon size={16} stroke={1.6} style={{ color: 'var(--sf-accent)' }} />}
                <span>{link.label}</span>
              </a>
            );
          })}
        </Stack>
      </Drawer>
    </header>
  );
}
