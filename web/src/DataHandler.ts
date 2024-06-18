import { useNuiEvent } from "./hooks/useNuiEvent";
import { useStoreJobs } from "./stores/JobsStore";
import { debugData } from "./utils/debugData";

export default function DataHander() {
  const { setCurrentJob, setJobs } = useStoreJobs();

  useNuiEvent("setCurrentJob", (data: Job) => {
    if (data) {
      setCurrentJob(data);
    }
  });

  useNuiEvent("setJobs", (data: Job[]) => {
    if (data) {
      setJobs(data);
    }
  });
}

debugData([
  {
    action: "setCurrentJob",
    data: {
      name: "taxi",
      label: "Taxi Driver",
      payment: 500,
      onduty: true,
      isboss: false,
      grade: {
        name: "Grade 1",
        level: 1,
      },
      workType: "contract",
    },
  },
]);

debugData([
  {
    action: "setJobs",
    data: [
      {
        name: "job1",
        label: "Police",
        payment: 100,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade1",
          level: 1,
        },
        workType: "salary",
      },
      {
        name: "job2",
        label: "Ambulance",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "salary",
      },
      {
        name: "job3",
        label: "Mechanic",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "contract",
      },
      {
        name: "job4",
        label: "Fire Department",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "salary",
      },
      {
        name: "job5",
        label: "Real Estate",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "salary",
      },
      {
        name: "job6",
        label: "Cat Cafe",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "salary",
      },
      {
        name: "job7",
        label: "Judge",
        payment: 200,
        onduty: true,
        isboss: false,
        grade: {
          name: "grade2",
          level: 2,
        },
        workType: "salary",
      },
    ] as Job[],
  },
]);
