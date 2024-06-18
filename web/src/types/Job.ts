type Grade = {
  name: string;
  level: number;
};

type Job = {
  name: string;
  label: string;
  payment: number;
  isboss: boolean;
  onduty?: boolean;
  grade: Grade;
  workType: "salary" | "contract";
};
