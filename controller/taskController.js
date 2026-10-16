import * as taskService from '../service/taskService.js';

/**
 * Összes feladat lekérdezése HTTP kérésre.
 */
export async function getTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Nem sikerült lekérni a feladatokat.' });
  }
}

/**
 * Feladatok és a hozzájuk rendelt felhasználók lekérdezése.
 * Kinyeri a tokent a fejlécből vagy query-ből, és a taskService-re bízza
 * az autentikációt és az adatok lekérését.
 */
export async function getTaskUsers(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader || req.query.token;

    const tasksWithUsers = await taskService.getTasksWithUsers(token);
    res.json(tasksWithUsers);
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Nem sikerült lekérni a feladatokhoz rendelt felhasználókat.';
    res.status(status).json({ error: message });
  }
}

export default {
  getTasks,
  getTaskUsers,
};
