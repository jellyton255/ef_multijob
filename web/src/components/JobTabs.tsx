import { useStoreJobs } from "@/stores/JobsStore";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function JobTabs({
  selectedJobType,
  setJobType,
}: {
  selectedJobType: string;
  setJobType: (jobType: string) => void;
}) {
  const { Jobs } = useStoreJobs();

  const counts = { salaryCount: 0, contractCount: 0 };
  Jobs?.forEach((job) => {
    if (job.workType === "salary") {
      counts.salaryCount += 1;
    } else if (job.workType === "contract") {
      counts.contractCount += 1;
    }
  });
  const { salaryCount, contractCount } = counts;

  return (
    <Tabs defaultValue="salary" className="grow" value={selectedJobType} onValueChange={setJobType}>
      <TabsList className="w-full">
        <TabsTrigger value="salary" className="flex grow items-center justify-center gap-2">
          <p className="text">Salary</p>
          <p className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-gray-100">{salaryCount}</p>
        </TabsTrigger>
        <TabsTrigger value="contract" className="flex grow items-center justify-center gap-2">
          <p className="text">Contract</p>
          <p className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-gray-100">{contractCount}</p>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
