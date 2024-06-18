import { faCheck, faUserXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SegmentedControl, Switch, Tooltip } from "@mantine/core";
import JobCard from "./JobCard";
import { useMemo, useState } from "react";
import { useStoreJobs } from "../stores/JobsStore";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

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
    <div className="w-[27vw] h-[70vh] mr-6 p-3 bg-zinc-900 transition-all duration-200 ease-in-out rounded-lg">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between flex-nowrap w-full items-center gap-2">
          <div className="text-3xl font-extrabold tracking-tight text-gray-100">Jobs</div>
          <SegmentedControl
            size="sm"
            radius="xl"
            data={[
              {
                value: "salary",
                label: (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text">Salary</p>
                    <p className="px-2 py-1 text-xs text-gray-100 bg-zinc-800 rounded-full">{salaryCount}</p>
                  </div>
                ),
              },
              {
                value: "contract",
                label: (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text">Contract</p>
                    <p className="px-2 py-1 text-xs text-gray-100 bg-zinc-800 rounded-full">{contractCount}</p>
                  </div>
                ),
              },
            ]}
            value={selectedJobType}
            onChange={setJobType}
            className="grow"
          />
          <Tooltip label="Duty Status" refProp="rootRef" color="dark">
            <Switch
              checked={CurrentJob?.onduty}
              onChange={(event) => {
                if (!isEnvBrowser()) {
                  fetchNui("setJobDuty", event.currentTarget.checked);
                } else setCurrentJob({ ...CurrentJob, onduty: !CurrentJob.onduty });
              }}
              size="md"
              classNames={{
                track: `${CurrentJob?.onduty ? "bg-teal-600" : "bg-red-600/90"} ${CurrentJob?.onduty ? "border-teal-600" : "border-red-600/90"}`,
              }}
              thumbIcon={CurrentJob?.onduty ? <FontAwesomeIcon icon={faCheck} className="text-teal-600 size-3" /> : <FontAwesomeIcon icon={faUserXmark} className="text-red-600/90 size-3" />}
            />
          </Tooltip>
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer size-6 hover:bg-zinc-800 p-2 rounded-md"
            onClick={() => {
              if (!isEnvBrowser()) fetchNui("hideFrame");
            }}
          />
        </div>
        <div className="h-0 grow w-full flex flex-col gap-2">
          <JobCard job={CurrentJob} current />
          <div className="grow p-2 h-0 rounded-lg flex flex-col gap-3 overflow-y-auto">
            {Jobs?.filter((job) => job.workType === selectedJobType).map((job) => (
              <JobCard key={job.name} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
