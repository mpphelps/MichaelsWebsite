import { useMantineColorScheme } from "@mantine/core";
import { HeaderMenu } from "./components/HeaderMenu/HeaderMenu";

function App() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme("dark");

  return (
    <>
      <HeaderMenu />
      <div>Hello Michael</div>
    </>
  );
}

export default App;
