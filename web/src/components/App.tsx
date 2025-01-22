import { debugData } from "../utils/debugData";
import { VisibilityProvider } from "../providers/VisibilityProvider";
import DataHandler from "../DataHandler";
import Panel from "./Panel";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  DataHandler();

  return (
    <VisibilityProvider>
      <TooltipProvider delayDuration={0}>
        <div className="dark flex h-screen items-center justify-end">
          <Panel />
        </div>
      </TooltipProvider>
    </VisibilityProvider>
  );
}

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);
