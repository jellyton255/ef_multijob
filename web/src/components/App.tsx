import { debugData } from "../utils/debugData";
import { VisibilityProvider } from "../providers/VisibilityProvider";
import DataHandler from "../DataHandler";
import Panel from "./Panel";

function App() {
  DataHandler();

  return (
    <VisibilityProvider>
      <div className="flex h-screen dark items-center justify-end">
        <Panel />
      </div>
    </VisibilityProvider>
  );
}

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

export default App;
