import { Text, Group, List, Divider, ActionIcon } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import classes from './ResumePage.module.css';

export default function ResumePage() {
  return (
    <div className={classes.resumeContainer}>
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Text fz="1.5rem" fw={700}>
          Michael Porter Phelps, PE
        </Text>
        <Group gap="xs">
          <ActionIcon size="lg" variant="filled" color="dark" radius="md" component="a" href="https://github.com/mpphelps" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={20} />
          </ActionIcon>

          <ActionIcon size="lg" variant="filled" color="blue" radius="md" component="a" href="https://www.linkedin.com/in/michael-phelps-pe-880b2184/" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin size={20} />
          </ActionIcon>
        </Group>
      </Group>

      <Divider mb="lg" />

      {/* Summary */}
      <Text mb="xl">
        Professional engineer with 13+ years of experience. Skilled in accelerating delivery of scalable cloud-native solutions, modernizing legacy platforms, and leveraging AI technologies to solve
        complex, high-value business problems. Proven record of leading projects and delivering measurable results in innovation, efficiency, and revenue growth. Began a career in industrial
        automation before fully transitioning into software.
      </Text>

      {/* Technical Skills */}
      <Text size="lg" fw={700} mb="xs">
        TECHNICAL SKILLS
      </Text>
      <Divider mb="md" />

      <List mb="xl">
        <List.Item>
          <Text>
            <Text component="span" fw={600}>
              Languages:
            </Text>{' '}
            TypeScript, JavaScript, C#, Python, Java, C++, C, HTML, CSS
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            <Text component="span" fw={600}>
              Technologies:
            </Text>{' '}
            React, .NET Core, ASP.NET, Entity Framework, Azure, Kubernetes, RESTful APIs, GraphQL, gRPC, SignalR, Web Sockets, OpenAI API, LangChain, Hugging Face, JWT/OAuth, NUnit, xUnit, Cucumber,
            Jest, Vitest, Swagger, Postman, Vite, Tailwind CSS
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            <Text component="span" fw={600}>
              DevOps:
            </Text>{' '}
            Docker, Kubernetes, CI/CD pipelines, GitHub Actions, Octopus, SonarQube, Coverity, JFrog
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            <Text component="span" fw={600}>
              Databases:
            </Text>{' '}
            PostgreSQL, Redis, MS SQL Server, MySQL, NoSQL databases
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            <Text component="span" fw={600}>
              Tools:
            </Text>{' '}
            Git, GitHub, BitBucket, Jira, AI Co-pilot, Agile development
          </Text>
        </List.Item>
      </List>

      {/* Experience */}
      <Text size="lg" fw={700} mb="xs">
        EXPERIENCE
      </Text>
      <Divider mb="md" />

      {/* Honeywell - Senior Software Engineer */}
      <Group justify="space-between" mb="xs">
        <Text fw={700}>Honeywell - Senior Software Engineer</Text>
        <Text>Atlanta, GA May 2022 - Present</Text>
      </Group>
      <List mb="lg">
        <List.Item>
          Led development of cloud training platform for industrial applications, projected to generate $120M annually utilizing Kubernetes, React, Azure, .NET, PostgreSQL, and Redis.
        </List.Item>
        <List.Item>
          Built cloud app automating updates to chemical process models, reducing engineering effort 40%, utilizing React, Azure Storage Accounts, .NET, LangChain, Python, and OpenAI API.
        </List.Item>
        <List.Item>
          Modernized $80M/yr legacy desktop app for control systems simulation by developing adapters to DCS public APIs such Honeywell Experion PKS utilizing C#, C++, gRPC, DCOM, and sockets.
        </List.Item>
        <List.Item>Containerized applications with Docker, improving DevOps workflows and accelerating deployments.</List.Item>
        <List.Item>Mentored interns and led agile teams as Scrum Master, ensuring project delivery and team growth.</List.Item>
      </List>

      {/* Honeywell - Lead Control Software Engineer */}
      <Group justify="space-between" mb="xs">
        <Text fw={700}>Honeywell - Lead Control Software Engineer</Text>
        <Text>Houston, TX January 2015 - May 2022</Text>
      </Group>
      <List mb="lg">
        <List.Item>
          Designed engineering automation tools for control database migrations and AutoCAD drawing updates reducing project team effort by 20–25% utilizing .NET, WinForms, Visual Basic.
        </List.Item>
        <List.Item>Developed DCS control apps and HMI graphics using JavaScript tools and Honeywell Experion platforms.</List.Item>
        <List.Item>Directed high-stakes plant turnaround projects, delivering upgrades on time and within risk constraints.</List.Item>
      </List>

      {/* Bechtel - Electrical Engineer */}
      <Group justify="space-between" mb="xs">
        <Text fw={700}>Bechtel - Electrical Engineer</Text>
        <Text>Richland, WA & Gladstone Aus May 2012 - Dec 2015</Text>
      </Group>
      <List mb="lg">
        <List.Item>Developed software tools to automate construction progress reporting and manage 1.7M meters of cabling, saving 30+ hours/week, utilizing .NET, WPF, MS SQL Server.</List.Item>
        <List.Item>
          Led construction and commissioning of electrical and control systems for gas flares, water treatment plant, and loading jetty, for a $21 billion liquefied natural gas plant.
        </List.Item>
      </List>

      {/* LANL & Bechtel - Physics Internship */}
      <Group justify="space-between" mb="xs">
        <Text fw={700}>LANL & Bechtel - Physics Internship</Text>
        <Text>Los Alamos, NM & Chile June 2006 - Aug 2010</Text>
      </Group>
      <List mb="xl">
        <List.Item>
          Inspected the construction of electrical and control systems for design and safety compliance at the Chemical, Nuclear, and Metallurgical Research facility, and for a $2.8 billion copper
          concentrator mine.
        </List.Item>
        <List.Item>Assembled and developed the test procedure of the gas ionizing tubes for the Muon Tomography project, listed in Popular Science magazine's 100 best inventions of 2010.</List.Item>
      </List>

      {/* Education */}
      <Text size="lg" fw={700} mb="xs">
        EDUCATION
      </Text>
      <Divider mb="md" />
      <Text mb="xl">
        <Text component="span" fw={600}>
          Georgia Institute of Technology:
        </Text>{' '}
        Bachelor of Science Electrical Engineering with Spanish Minor 2012
      </Text>

      {/* Professional Certifications */}
      <Text size="lg" fw={700} mb="xs">
        PROFESSIONAL CERTIFICATIONS
      </Text>
      <Divider mb="md" />
      <List>
        <List.Item>Licensed Professional Engineer in Control Systems, Texas 2018 - PE# 129576</List.Item>
        <List.Item>Lean Six Sigma Green Belt - September 2015</List.Item>
      </List>
    </div>
  );
}
