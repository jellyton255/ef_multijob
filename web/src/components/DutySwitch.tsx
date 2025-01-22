import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export default function DutySwitch({ onduty, onChange }: { onduty?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Switch
          checked={onduty}
          className={cn("border-red-600 bg-red-600", onduty && "border-teal-600 bg-teal-600")}
          onCheckedChange={onChange}
        />
      </TooltipTrigger>
      <TooltipContent>Duty Status</TooltipContent>
    </Tooltip>
  );
}
