export type Task = {
  id: number;
  name: string;
  description: string;
  complete: boolean;
  projectid: number;
  userid: number;
  position: number;
};

export type Project = {
  id: number;
  name: string;
  userid: number;
  priority: number;
  description: string;
  totalTasks: string; // make number
  completedTasks: string; // make number
  tasks: Task[];
  dateCreated: string;
  due: string;
};

export type User = {
  id: number | null;
  username: string | null;
  nickname: string | null;
};

export type WorkingSession = {
  projectid: number | null;
  timer: {
    workingDuration: number | null;
    restingDuration: number | null;
    currentRemainingTime: number | null;
  };
  working: boolean;
};

export type ToastState = {
  display: boolean;
  error: boolean;
  message: string | null;
};
