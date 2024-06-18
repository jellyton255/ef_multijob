import { faCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useStoreJobs } from "../stores/JobsStore";
import { fetchNui } from "../utils/fetchNui";

export default function JobCard(props: { job: Job; current?: boolean }) {
  const { job, current } = props;
  const { CurrentJob } = useStoreJobs();

  if (!job) return <div className="p-3 bg-neutral-800 rounded-md">Something went wrong...</div>;

  const isSelected = job?.name == CurrentJob?.name;

  return (
    <div className="flex-nowrap flex items-center">
      {!current && (
        <Tooltip label="Select Job" color="dark">
          <ActionIcon
            h="100%"
            size="xl"
            variant="light"
            radius="md"
            disabled={isSelected}
            style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
            onClick={() => {
              fetchNui("selectJob", job.name);
            }}
          >
            <FontAwesomeIcon icon={faCheck} size="xl" />
          </ActionIcon>
        </Tooltip>
      )}
      <div className={`bg-zinc-800 p-4 grow w-full justify-between flex-nowrap flex items-center ${current ? "rounded-lg" : "rounded-none"}`}>
        <h1 className="text-xl font-bold text-gray-200">{job.label}</h1>

        <div className="flex flex-col gap-1 items-end">
          <p className="bg-sky-800/20 px-3 py-1 text-sm text-sky-400 rounded-md uppercase font-bold">{job.grade.name}</p>

          {job.payment > 0 && <p className="bg-green-800/20 px-3 py-1 text-sm text-green-400 rounded-md uppercase font-bold">${job.payment}</p>}
        </div>
      </div>
      {!current && (
        <Tooltip label="Quit Job" color="red">
          <ActionIcon
            h="100%"
            color="red"
            size="lg"
            variant="light"
            radius="md"
            px={20}
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
            }}
            onClick={() => {
              fetchNui("removeJob", job.name);
            }}
          >
            <FontAwesomeIcon icon={faUserXmark} size="lg" />
          </ActionIcon>
        </Tooltip>
      )}
    </div>
  );
}
