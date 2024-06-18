import { create } from "zustand";

type JobsState = {
  CurrentJob: Job;
  Jobs: Job[];
  setCurrentJob: (job: Job) => void;
  addJob: (job: Job) => void;
  updateJob: (name: string, data: Job) => void;
  removeJob: (name: string) => void;
  setJobs: (jobs: Job[]) => void;
};

export const useStoreJobs = create<JobsState>((set) => ({
  CurrentJob: null,
  Jobs: [],

  setCurrentJob: (job: Job) => {
    if (job) {
      set(() => ({
        CurrentJob: job,
      }));
    }
  },

  addJob: (job: Job) => {
    set((state) => ({
      Jobs: [...state.Jobs, job],
    }));
  },

  updateJob: (name: string, data: Job) => {
    set((state) => ({
      Jobs: state.Jobs.map((job) => (job.name === name ? { ...data } : job)),
    }));
  },

  removeJob: (name: string) => {
    set((state) => ({
      Jobs: state.Jobs.filter((job) => job.name !== name),
    }));
  },

  setJobs: (jobs: Job[]) => {
    if (jobs) {
      set(() => ({
        Jobs: [...jobs],
      }));
    }
  },
}));
