import { startTransition, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useStoreJobs } from "../stores/JobsStore";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import JobCard from "./JobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOptimistic } from "react";
import DutySwitch from "./DutySwitch";
import JobTabs from "./JobTabs";

export default function Panel() {
  const { CurrentJob, setCurrentJob, Jobs } = useStoreJobs();
  const [selectedJobType, setJobType] = useState("salary");

  const { salaryCount, contractCount } = useMemo(() => {
    const counts = { salaryCount: 0, contractCount: 0 };
    Jobs?.forEach((job) => {
      if (job.workType === "salary") {
        counts.salaryCount += 1;
      } else if (job.workType === "contract") {
        counts.contractCount += 1;
      }
    });
    return counts;
  }, [Jobs]);

  return (
    <div className="mr-6 h-[70vh] w-[27vw] rounded-lg bg-zinc-900 p-3 transition-all duration-200 ease-in-out">
      <div className="flex h-full flex-col gap-2">
        <div className="flex w-full flex-nowrap items-center justify-between gap-3">
          <div className="text-3xl font-extrabold tracking-tight text-gray-100">Jobs</div>
          <JobTabs selectedJobType={selectedJobType} setJobType={setJobType} />
          <FontAwesomeIcon
            icon={faXmark}
            className="size-6 cursor-pointer rounded-md p-2 hover:bg-zinc-800"
            onClick={() => !isEnvBrowser() && fetchNui("hideFrame")}
          />
        </div>

        <div className="flex h-0 w-full grow flex-col gap-2">
          {optimisticJob && <JobCard job={optimisticJob} current />}
          <div className="flex h-0 grow flex-col gap-3 overflow-y-auto rounded-lg p-2">
            {Jobs?.filter((job) => job.workType === selectedJobType).map((job) => <JobCard key={job.name} job={job} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
