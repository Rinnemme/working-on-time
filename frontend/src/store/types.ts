export type Task = {
  id: Number;
  name: String;
  description: String;
  complete: Boolean;
  projectid: Number;
  userid: Number;
};

export type Project = {
  id: Number;
  name: String;
  userid: Number;
  priority: Number;
  description: String;
  totalTasks: String; // make number
  completedTasks: String; // make number
  tasks: Task[];
};

export type User = {
  id: Number | null;
  username: String | null;
  nickname: String | null;
};
