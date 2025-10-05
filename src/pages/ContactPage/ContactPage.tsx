import { Card, Text, Group, ActionIcon, Stack, Box } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import classes from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={classes.pageWrapper}>
      <Card shadow="xl" radius="lg" p={60} withBorder className={classes.businessCard}>
        <Stack gap="lg" align="center">
          <Box>
            <Text size="xl" fw={700} mb={4}>
              Michael Phelps
            </Text>
            <Text size="md" opacity={0.9}>
              Senior Software Engineer
            </Text>
          </Box>

          <Group gap="md" justify="center">
            <ActionIcon size="lg" variant="filled" color="dark" radius="md" component="a" href="https://github.com/mpphelps" target="_blank" rel="noopener noreferrer">
              <IconBrandGithub size={20} />
            </ActionIcon>

            <ActionIcon size="lg" variant="filled" color="blue" radius="md" component="a" href="https://www.linkedin.com/in/michael-phelps-pe-880b2184/" target="_blank" rel="noopener noreferrer">
              <IconBrandLinkedin size={20} />
            </ActionIcon>
          </Group>
        </Stack>
      </Card>
    </div>
  );
}
