const { pool } = require("./pool");

exports.getAllUsernames = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

//READS

exports.getUserProjectsBulk = async (userId: String) => {
  const { rows } = await pool.query(
    'SELECT p.id, p.name, p.userid, p.priority, p.description, COUNT(t.id) as "total tasks", COUNT(CASE WHEN t.complete = true THEN t.id END) as "completed tasks" FROM projects as "p" LEFT JOIN tasks as "t" ON p.id = t.projectid WHERE p.userid = $1 GROUP BY p.id ORDER BY p.id',
    [userId]
  );
  return rows;
};

exports.getUserProject = async (projectId: Number) => {
  const { rows } = await pool.query(
    'SELECT projects.id, projects.name, projects.description, projects.userid, COUNT(tasks.id) as "total tasks", COUNT(CASE WHEN tasks.complete = true THEN tasks.id END) as "completed tasks" FROM projects LEFT JOIN tasks ON projects.id = tasks.projectid WHERE projects.id = $1 GROUP BY projects.id',
    [projectId]
  );
  return rows;
};

exports.getProjectTasks = async (projectId: Number) => {
  const { rows } = await pool.query(
    "SELECT * FROM tasks WHERE projectId = $1",
    [projectId]
  );
  return rows;
};

exports.verifyProjectOwnership = async (projectId: Number, userId: Number) => {
  const { rows } = await pool.query(
    "SELECT userid FROM projects WHERE id = $1",
    [projectId]
  );
  return rows[0].userid === userId;
};

exports.verifyTaskOwnership = async (taskId: Number, userId: Number) => {
  const { rows } = await pool.query("SELECT userid FROM tasks WHERE id = $1", [
    taskId,
  ]);
  return rows[0].userid === userId;
};

// CREATES

exports.addNewTask = async (
  name: String,
  description: String,
  complete: boolean,
  projectId: Number,
  userId: Number
) => {
  const { rows } = await pool.query(
    "INSERT INTO tasks (name, description, complete, projectId, userId) VALUES ($1, $2, $3, $4, $5)",
    [name, description, complete, projectId, userId]
  );
  return rows;
};

exports.addNewProject = async (
  name: String,
  userid: Number,
  priority: Number,
  description: String
) => {
  const { rows } = await pool.query(
    "INSERT INTO projects (name, userid, priority, description) VALUES ($1, $2, $3, $4)",
    [name, userid, priority, description]
  );
  return rows;
};

// UPDATES

exports.updateTask = async (name: String, description: String, id: Number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
  return rows;
};

exports.toggleTaskComplete = async (id: Number) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET complete = NOT complete WHERE id = $1",
    [id]
  );
  return rows;
};

exports.updateProject = async (
  name: String,
  priority: Number,
  description: String,
  id: Number
) => {
  const { rows } = await pool.query(
    "UPDATE projects SET name = $1, priority = $2, description = $3 WHERE id = $4",
    [name, priority, description, id]
  );
  return rows;
};

// DELETES:

exports.deleteProject = async (id: Number) => {
  const { rows } = await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  return rows;
};

exports.deleteTask = async (id: Number) => {
  const { rows } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return rows;
};
