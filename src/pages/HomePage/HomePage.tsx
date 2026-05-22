import { Button, Flex, SimpleGrid, Stack } from '@mantine/core';
import { IconArrowRight, IconBolt, IconCloud, IconCpu } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ContactPage from '../ContactPage/ContactPage';
import { HoloPanel } from '../../components/HoloPanel/HoloPanel';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import classes from './HomePage.module.css';

const capabilities = [
  {
    icon: IconCloud,
    label: 'cloud / native',
    title: 'Cloud-Native Platforms',
    body: 'Scalable cloud platforms built on .NET, React, and Postgres. Delivered a training platform projected to generate $120M annually.',
  },
  {
    icon: IconBolt,
    label: 'defense / mfg',
    title: 'Industrial Systems',
    body: "Building Forge, Anduril's in-house MES for Arsenal OS. Parts repository and smart tools data workflows on TypeScript, Remix, Node.js, and MQTT.",
  },
  {
    icon: IconCpu,
    label: 'ai / integration',
    title: 'Practical AI',
    body: 'LangChain, OpenAI APIs, and Python wired into the products engineers actually use. Reduced manual engineering effort by 40%.',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={classes.home}>
      {/* HERO */}
      <section className={classes.hero}>
        <div className={classes.heroMeta}>
          <span className={classes.statusPill}>
            <span className={classes.statusDot} aria-hidden />
            AVAILABLE FOR PROJECTS
          </span>
          <span className={classes.coords}>LAT 33.641 // LON -117.918 · SNA</span>
        </div>

        <h1 className={classes.heroTitle}>
          <span className={classes.heroTitleLine}>MICHAEL</span>
          <span className={classes.heroTitleAccent}>
            PHELPS<span className={classes.cursor} aria-hidden />
          </span>
        </h1>

        <p className={classes.heroRole}>
          <span className={classes.heroRoleSlash}>//</span> SENIOR SOFTWARE ENGINEER · INDUSTRIAL &amp; CLOUD SYSTEMS
        </p>

        <p className={classes.heroLead}>
          Senior software engineer with 13+ years building cloud platforms, control systems, and AI-driven tooling for industrial and engineering applications. Currently developing Forge, Anduril's
          manufacturing execution system for Arsenal OS.
        </p>

        <div className={classes.ctaRow}>
          <Button size="md" variant="default" rightSection={<IconArrowRight size={16} />} onClick={() => navigate('/blog')}>
            Read the Log
          </Button>
          <Button size="md" variant="default" onClick={() => navigate('/resume')}>
            View Resume
          </Button>
        </div>

        {/* Telemetry strip */}
        <div className={classes.telemetry}>
          <div className={classes.telemetryItem}>
            <span className={classes.telemetryLabel}>YRS / EXP</span>
            <span className={classes.telemetryValue}>13+</span>
          </div>
          <div className={classes.telemetryItem}>
            <span className={classes.telemetryLabel}>STACK</span>
            <span className={classes.telemetryValue}>React · .NET · TypeScript</span>
          </div>
          <div className={classes.telemetryItem}>
            <span className={classes.telemetryLabel}>DISCIPLINE</span>
            <span className={classes.telemetryValue}>PE / CONTROL SYS</span>
          </div>
          <div className={classes.telemetryItem}>
            <span className={classes.telemetryLabel}>SIGNAL</span>
            <span className={`${classes.telemetryValue} ${classes.telemetryValueOk}`}>NOMINAL</span>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className={classes.section}>
        <SectionHeading index="// 001" label="capabilities" title="Where I Operate" />
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {capabilities.map((cap) => (
            <HoloPanel key={cap.label} label={cap.label}>
              <Stack gap={10}>
                <cap.icon size={22} stroke={1.5} color="var(--sf-accent)" />
                <div className={classes.capTitle}>{cap.title}</div>
                <div className={classes.capBody}>{cap.body}</div>
              </Stack>
            </HoloPanel>
          ))}
        </SimpleGrid>
      </section>

      {/* CONTACT */}
      <section className={classes.section}>
        <SectionHeading index="// 002" label="signal" title="Establish Contact" />
        <Flex justify="center">
          <ContactPage />
        </Flex>
      </section>
    </div>
  );
}
