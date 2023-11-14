import BandsPage from "./modules/bands/presentation/pages/BandsPage";
import { SocketProvider } from "./shared/infra/context/SocketContext";

function App() {
  return (
    <>
      <SocketProvider>
        <BandsPage />
      </SocketProvider>
    </>
  );
}

export default App;
