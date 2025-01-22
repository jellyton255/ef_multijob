import { faCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreJobs } from "../stores/JobsStore";
import { fetchNui } from "../utils/fetchNui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";

export default function JobCard({ job, current }: { job: Job; current?: boolean }) {
  const { CurrentJob } = useStoreJobs();

  if (!job) {
    console.error("Something went wrong when attempting to render a job card.");
    return null;
  }

  const isSelected = job?.name == CurrentJob?.name;

  return (
    <div className="flex flex-nowrap items-center">
      {!current && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-full rounded-br-none rounded-tr-none px-4"
              disabled={isSelected}
              onClick={() => {
                fetchNui("selectJob", job.name);
              }}
            >
              <FontAwesomeIcon icon={faCheck} size="xl" />
            </Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>Select Job</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )}
      <div
        className={`flex w-full grow flex-nowrap items-center justify-between bg-zinc-800 px-4 py-2 ${current ? "rounded-lg" : "rounded-none"}`}
      >
        <h1 className="text-xl font-bold text-gray-200">{job.label}</h1>
        <div className="flex flex-col items-end gap-1">
          <p className="rounded-md bg-sky-800/20 px-3 py-1 text-sm font-bold uppercase text-sky-400">
            {job.grade.name}
          </p>
          {job.payment > 0 && (
            <p className="rounded-md bg-green-800/20 px-3 py-1 text-sm font-bold uppercase text-green-400">
              ${job.payment}
            </p>
          )}
        </div>
      </div>
      {!current && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-full rounded-bl-none rounded-tl-none bg-red-700/30 px-2 text-red-300 hover:bg-red-800/30"
              onClick={() => {
                fetchNui("removeJob", job.name);
              }}
            >
              <FontAwesomeIcon icon={faUserXmark} size="lg" />
            </Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent className="border-2 border-red-900 bg-red-700 text-primary-foreground">
              Quit Job
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )}
    </div>
  );
}
