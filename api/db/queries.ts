const { pool } = require("./pool");

exports.getAllUsernames = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

//READS

exports.getUserProjectsBulk = async (userid: string) => {
  const { rows } = await pool.query(
    'SELECT p.id, p.name, p.userid, p.priority, p.description, p.datecreated as "dateCreated", p.due, COUNT(t.id) as "totalTasks", COUNT(CASE WHEN t.complete = true THEN t.id END) as "completedTasks" FROM projects as "p" LEFT JOIN tasks as "t" ON p.id = t.projectid WHERE p.userid = $1 GROUP BY p.id ORDER BY p.id',
    [userid]
  );
  return rows;
};

exports.getUserProject = async (projectid: number) => {
  const { rows } = await pool.query(
    'SELECT p.id, p.name, p.description, p.datecreated as "dateCreated", p.due, p.userid, COUNT(t.id) as "totalTasks", COUNT(CASE WHEN t.complete = true THEN t.id END) as "completedTasks" FROM projects as "p" LEFT JOIN tasks as "t" ON p.id = t.projectid WHERE p.id = $1 GROUP BY p.id',
    [projectid]
  );
  return rows;
};

exports.getProjectTasks = async (projectid: number) => {
  const { rows } = await pool.query(
    "SELECT * FROM tasks WHERE projectid = $1 ORDER BY position",
    [projectid]
  );
  return rows;
};

exports.getTask = async (taskId: number) => {
  const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [
    taskId,
  ]);
  return rows[0];
};

exports.verifyProjectOwnership = async (projectid: number, userid: number) => {
  const { rows } = await pool.query(
    "SELECT userid FROM projects WHERE id = $1",
    [projectid]
  );
  return rows[0].userid === userid;
};

exports.verifyTaskOwnership = async (taskId: number, userid: number) => {
  const { rows } = await pool.query("SELECT userid FROM tasks WHERE id = $1", [
    taskId,
  ]);
  return rows[0].userid === userid;
};

exports.getAdditionPosition = async (projectid: number) => {
  const { rows } = await pool.query(
    "SELECT MAX(position) FROM tasks WHERE projectid = $1",
    [projectid]
  );
  return rows[0].max + 1;
};

// CREATES

exports.addNewTask = async (
  name: string,
  description: string,
  complete: boolean,
  projectid: number,
  userid: number,
  position: number
) => {
  const { rows } = await pool.query(
    "INSERT INTO tasks (name, description, complete, projectid, userid, position) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, description, complete, projectid, userid, position]
  );
  return rows;
};

exports.addNewProject = async (
  name: string,
  userid: number,
  priority: number,
  description: string,
  due: string,
  position: number
) => {
  const { rows } = await pool.query(
    "INSERT INTO projects (name, userid, priority, description, due, position) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, userid, priority, description, due, position]
  );
  return rows;
};

// UPDATES

exports.updateTask = async (name: string, description: string, id: number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
  return rows;
};

exports.repositionTask = async (position: number, id: number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET position = $1 WHERE id = $2",
    [position, id]
  );
  return rows;
};

exports.toggleTaskComplete = async (id: number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET complete = NOT complete WHERE id = $1",
    [id]
  );
  return rows;
};

exports.updateProject = async (
  name: string,
  priority: number,
  description: string,
  id: number
) => {
  const { rows } = await pool.query(
    "UPDATE projects SET name = $1, priority = $2, description = $3 WHERE id = $4",
    [name, priority, description, id]
  );
  return rows;
};

exports.accountForRemovedTask = async (position: number, projectid: number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET position = position-1 WHERE position > $1 AND projectid = $2",
    [position, projectid]
  );
  return rows;
};

exports.accountForReorderedTasks = async (
  oldPosition: number,
  newPosition: number,
  projectid: number
) => {
  if (oldPosition === newPosition) {
    return;
  }
  const { rows } =
    oldPosition < newPosition
      ? await pool.query(
          "UPDATE tasks SET position = position-1 WHERE position <= $1 AND position > $2 AND projectid = $3",
          [newPosition, oldPosition, projectid]
        )
      : await pool.query(
          "UPDATE tasks SET position = position+1 WHERE position >= $1 AND position < $2 AND projectid = $3",
          [newPosition, oldPosition, projectid]
        );
  return rows;
};

// DELETES:

exports.deleteProject = async (id: number) => {
  const { rows } = await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  return rows;
};

exports.deleteTask = async (id: number) => {
  const { rows } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return rows;
};
