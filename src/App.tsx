import { useMantineColorScheme } from "@mantine/core";
import { HeaderMenu } from "./components/HeaderMenu/HeaderMenu";
import Login from "./components/Login/Login";

function App() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme("dark");

  return (
    <>
      <HeaderMenu />
      <div>Hello Michael</div>
      <Login />
    </>
  );
}

export default App;
