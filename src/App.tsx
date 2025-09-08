import { useMantineColorScheme } from '@mantine/core';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import Login from './components/Login/Login';
import { SessionProvider } from './context/SessionContext/SessionContext';

function App() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme('dark');

  return (
    <>
      <SessionProvider>
        <HeaderMenu />
        <div>Hello Michael</div>
        <Login />
      </SessionProvider>
    </>
  );
}

export default App;
