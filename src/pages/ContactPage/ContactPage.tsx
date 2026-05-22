import { Text, Group, ActionIcon, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { HoloPanel } from '../../components/HoloPanel/HoloPanel';
import classes from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={classes.pageWrapper}>
      <HoloPanel label="signal · v1" status="online" className={classes.businessCard}>
        <Stack gap="lg" align="center">
          <div className={classes.identity}>
            <div className={classes.handle}>// CALL SIGN</div>
            <Text className={classes.name}>MICHAEL PHELPS</Text>
            <Text className={classes.role}>Senior Software Engineer</Text>
          </div>

          <div className={classes.divider}>
            <span />
            <span className={classes.dividerLabel}>END_POINTS</span>
            <span />
          </div>

          <Group gap="md" justify="center">
            <ActionIcon size="xl" radius={2} variant="default" component="a" href="https://github.com/mpphelps" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IconBrandGithub size={22} />
            </ActionIcon>
            <ActionIcon
              size="xl"
              radius={2}
              variant="default"
              component="a"
              href="https://www.linkedin.com/in/michael-phelps-pe-880b2184/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={22} />
            </ActionIcon>
            <ActionIcon size="xl" radius={2} variant="default" component="a" href="mailto:mpphelps@gmail.com" aria-label="Email">
              <IconMail size={22} />
            </ActionIcon>
          </Group>

          <div className={classes.footer}>RESPONSE WINDOW · 24-48H</div>
        </Stack>
      </HoloPanel>
    </div>
  );
}
