import { IconChevronDown, IconHome, IconArticle, IconBulb, IconFileCv, IconAddressBook, IconLogin } from '@tabler/icons-react';
import { Burger, Center, Container, Drawer, Group, Menu, Stack } from '@mantine/core';
import classes from './HeaderMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

const links = [
  { link: '/home', label: 'Home', icon: IconHome },
  {
    link: '/projects',
    label: 'Projects',
    icon: IconBulb,
    links: [
      { link: 'https://github.com/mpphelps/PeanutGameEngine', label: 'Peanut Game Engine' },
      { link: 'https://mpphelps.github.io/Etch-a-Sketch/', label: 'Etch A Sketch' },
      { link: 'https://github.com/mpphelps/ArduinoSnakeGame', label: 'Arduino Snake Game' },
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
                navigate(link.link);
              }}
            >
              <Center>
                {link.icon && <link.icon size={20} style={{ marginRight: 5 }} />}
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
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
        onClick={() => {
          navigate(link.link);
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {link.icon && <link.icon size={20} style={{ marginRight: 5 }} />}
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>

      <Drawer opened={opened} onClose={toggle} size="100%" padding="md" title="Navigation" hiddenFrom="sm" zIndex={1000}>
        <Stack>
          {links.map((link) => {
            if (link.links) {
              return (
                <Stack key={link.label} gap="xs">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {link.icon && <link.icon size={20} style={{ marginRight: 5 }} />}
                    {link.label}
                  </div>
                  <Stack ml={20} gap="xs">
                    {link.links.map((subLink) => (
                      <a
                        key={subLink.link}
                        href={subLink.link}
                        className={classes.link}
                        onClick={(event) => {
                          event.preventDefault();
                          toggle();
                          window.open(subLink.link);
                        }}
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </Stack>
                </Stack>
              );
            }

            return (
              <a
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={(event) => {
                  event.preventDefault();
                  toggle();
                  navigate(link.link);
                }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {link.icon && <link.icon size={20} style={{ marginRight: 5 }} />}
                {link.label}
              </a>
            );
          })}
        </Stack>
      </Drawer>
    </header>
  );
}
