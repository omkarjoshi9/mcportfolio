import { LoadingScreen } from "@/components/loading-screen";
import { MainMenu } from "@/components/main-menu";

export default function Home() {
  return (
    <>
      <MainMenu />
      <LoadingScreen />
    </>
  );
}
