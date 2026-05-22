import { Text, Group, List, ActionIcon, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMapPin } from '@tabler/icons-react';
import { HoloPanel } from '../../components/HoloPanel/HoloPanel';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import classes from './ResumePage.module.css';

interface RoleProps {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  last?: boolean;
}

const Role = ({ company, title, location, dates, bullets, last }: RoleProps) => (
  <div className={`${classes.role} ${last ? classes.roleLast : ''}`}>
    <div className={classes.roleHead}>
      <div>
        <div className={classes.roleCompany}>{company}</div>
        <div className={classes.roleTitle}>{title}</div>
      </div>
      <div className={classes.roleMeta}>
        <div className={classes.roleLocation}>
          <IconMapPin size={11} stroke={1.6} /> {location}
        </div>
        <div className={classes.roleDates}>{dates}</div>
      </div>
    </div>
    <List spacing="xs" className={classes.bullets}>
      {bullets.map((b, i) => (
        <List.Item key={i}>{b}</List.Item>
      ))}
    </List>
  </div>
);

const Skill = ({ label, items }: { label: string; items: string }) => (
  <div className={classes.skillRow}>
    <div className={classes.skillLabel}>{label}</div>
    <div className={classes.skillItems}>{items}</div>
  </div>
);

export default function ResumePage() {
  return (
    <div className={classes.resumeContainer}>
      {/* Identity card */}
      <HoloPanel label="profile · pe / cs" status="online" className={classes.identity}>
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <Stack gap={4}>
            <Text className={classes.identityName}>MICHAEL PORTER PHELPS, PE</Text>
            <Text className={classes.identityRole}>Senior Software Engineer · 13+ years</Text>
          </Stack>
          <Group gap="xs">
            <ActionIcon size="lg" variant="default" radius={2} component="a" href="https://github.com/mpphelps" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IconBrandGithub size={18} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              variant="default"
              radius={2}
              component="a"
              href="https://www.linkedin.com/in/michael-phelps-pe-880b2184/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={18} />
            </ActionIcon>
          </Group>
        </Group>
        <Text className={classes.summary} mt="md">
          Professional engineer with 13+ years of experience. Skilled in accelerating delivery of scalable cloud-native solutions, modernizing legacy platforms, and leveraging AI technologies to
          solve complex, high-value business problems. Proven record of leading projects and delivering measurable results in innovation, efficiency, and revenue growth. Began a career in industrial
          automation before fully transitioning into software.
        </Text>
      </HoloPanel>

      {/* Skills */}
      <section className={classes.section}>
        <SectionHeading index="// 001" label="systems" title="Technical Skills" />
        <HoloPanel variant="subtle">
          <Stack gap={10}>
            <Skill label="LANGUAGES" items="TypeScript, JavaScript, C#, Python, Java, C++, C, HTML, CSS, MQTT" />
            <Skill
              label="TECHNOLOGIES"
              items="React, Remix, Node.js, Turbo Monorepo, Temporal, .NET Core, ASP.NET, Entity Framework, Azure, Kubernetes, RESTful APIs, GraphQL, gRPC, SignalR, Web Sockets, OpenAI API, LangChain, Hugging Face, JWT/OAuth, NUnit, xUnit, Cucumber, Jest, Vitest, Swagger, Postman, Vite, Tailwind CSS"
            />
            <Skill label="DEVOPS" items="Docker, Kubernetes, CI/CD pipelines, GitHub Actions, Octopus, SonarQube, Coverity, JFrog" />
            <Skill label="DATABASES" items="PostgreSQL, Redis, MS SQL Server, MySQL, NoSQL databases" />
            <Skill label="TOOLS" items="Git, GitHub, BitBucket, Jira, AI Co-pilot, Agile development" />
          </Stack>
        </HoloPanel>
      </section>

      {/* Experience */}
      <section className={classes.section}>
        <SectionHeading index="// 002" label="mission log" title="Experience" />
        <HoloPanel noPadding>
          <Role
            company="Anduril"
            title="Software Engineer"
            location="Costa Mesa, CA"
            dates="Mar 2026 to Present"
            bullets={[
              "Developing in-house MES system, Forge, for Anduril's Arsenal OS. Built the parts repository page and smart tools data workflow utilizing TypeScript, Turbo monorepo, Node.js, Remix, and MQTT.",
            ]}
          />
          <Role
            company="Honeywell"
            title="Senior Software Engineer"
            location="Atlanta, GA"
            dates="May 2022 to Feb 2026"
            bullets={[
              'Led development of cloud training platform for industrial applications, projected to generate $120M annually utilizing Kubernetes, React, Azure, .NET, PostgreSQL, and Redis.',
              'Built cloud app automating updates to chemical process models, reducing engineering effort 40%, utilizing React, Azure Storage Accounts, .NET, LangChain, Python, and OpenAI API.',
              'Modernized $80M/yr legacy desktop app for control systems simulation by developing adapters to DCS public APIs such Honeywell Experion PKS utilizing C#, C++, gRPC, DCOM, and sockets.',
              'Containerized applications with Docker, improving DevOps workflows and accelerating deployments.',
              'Mentored interns and led agile teams as Scrum Master, ensuring project delivery and team growth.',
            ]}
          />
          <Role
            company="Honeywell"
            title="Lead Control Software Engineer"
            location="Houston, TX"
            dates="Jan 2015 to May 2022"
            bullets={[
              'Designed engineering automation tools for control database migrations and AutoCAD drawing updates reducing project team effort by 20–25% utilizing .NET, WinForms, Visual Basic.',
              'Developed DCS control apps and HMI graphics using JavaScript tools and Honeywell Experion platforms.',
              'Directed high-stakes plant turnaround projects, delivering upgrades on time and within risk constraints.',
            ]}
          />
          <Role
            company="Bechtel"
            title="Electrical Engineer"
            location="Richland, WA & Gladstone, AUS"
            dates="May 2012 to Dec 2015"
            bullets={[
              'Developed software tools to automate construction progress reporting and manage 1.7M meters of cabling, saving 30+ hours/week, utilizing .NET, WPF, MS SQL Server.',
              'Led construction and commissioning of electrical and control systems for gas flares, water treatment plant, and loading jetty, for a $21 billion liquefied natural gas plant.',
            ]}
          />
          <Role
            company="LANL & Bechtel"
            title="Physics Internship"
            location="Los Alamos, NM & Chile"
            dates="Jun 2006 to Aug 2010"
            last
            bullets={[
              'Inspected the construction of electrical and control systems for design and safety compliance at the Chemical, Nuclear, and Metallurgical Research facility, and for a $2.8 billion copper concentrator mine.',
              "Assembled and developed the test procedure of the gas ionizing tubes for the Muon Tomography project, listed in Popular Science magazine's 100 best inventions of 2010.",
            ]}
          />
        </HoloPanel>
      </section>

      {/* Education & Certs */}
      <section className={classes.section}>
        <SectionHeading index="// 003" label="credentials" title="Education & Certifications" />
        <div className={classes.dualGrid}>
          <HoloPanel label="education">
            <Text className={classes.credentialPrimary}>Georgia Institute of Technology</Text>
            <Text className={classes.credentialSecondary}>B.S. Electrical Engineering · Spanish Minor · 2012</Text>
          </HoloPanel>
          <HoloPanel label="certifications">
            <List spacing={4} className={classes.bullets}>
              <List.Item>Licensed Professional Engineer in Control Systems, Texas 2018, PE# 129576</List.Item>
              <List.Item>Lean Six Sigma Green Belt, September 2015</List.Item>
            </List>
          </HoloPanel>
        </div>
      </section>
    </div>
  );
}
