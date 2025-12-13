import { Flex } from '@mantine/core';
import ContactPage from '../ContactPage/ContactPage';
import classes from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={classes.homePage}>
      <p>Hi! I'm Michael Phelps, a passionate software engineer with focus on software and technology for industrial and engineering applications. Welcome to my Website!</p>
      <p>Feel free to explore my projects and blogs. Contact me if you have any questions or opportunities!</p>

      <Flex justify="center">
        <ContactPage />
      </Flex>
    </div>
  );
}
