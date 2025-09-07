import {
  IconChevronDown,
  IconHome,
  IconArticle,
  IconBulb,
  IconFileCv,
  IconAddressBook,
  IconInfoCircle,
} from "@tabler/icons-react";
import {
  Burger,
  Center,
  Container,
  Group,
  Menu,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";

const links = [
  { link: "/home", label: "Home", icon: IconHome },
  { link: "/blog", label: "Blog", icon: IconArticle },
  { link: "/resume", label: "Resume", icon: IconFileCv },
  {
    link: "/projects",
    label: "Projects",
    icon: IconBulb,
    links: [
      { link: "/peanutEngine", label: "Peanut Engine" },
      { link: "/etchASketch", label: "Etch A Sketch" },
      { link: "/syringePump", label: "Syringe Pump" },
    ],
  },
  { link: "/contact", label: "Contact", icon: IconAddressBook },
  { link: "/about", label: "About", icon: IconInfoCircle },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                {link.icon && (
                  <link.icon size={20} style={{ marginRight: 5 }} />
                )}
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
        onClick={(event) => event.preventDefault()}
        style={{ display: "flex", alignItems: "center" }}
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

      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack>
          {links.map((link) => {
            if (link.links) {
              return (
                <Stack key={link.label} gap="xs">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {link.icon && (
                      <link.icon size={20} style={{ marginRight: 5 }} />
                    )}
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
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {link.icon && (
                  <link.icon size={20} style={{ marginRight: 5 }} />
                )}
                {link.label}
              </a>
            );
          })}
        </Stack>
      </Drawer>
    </header>
  );
}
