import { Task } from '../models/Task.js';
import { User } from '../models/User.js';
import '../models/UserTask.js';

/**
 * Összes feladat lekérdezése az adatbázisból.
 */
export async function findAll() {
  return await Task.findAll();
}

/**
 * Feladat keresése azonosító (ID) alapján.
 */
export async function findById(id) {
  return await Task.findByPk(id);
}

/**
 * Feladatok lekérdezése a hozzájuk rendelt felhasználókkal (N:M kapcsolat).
 */
export async function findAllWithUsers() {
  return await Task.findAll({
    attributes: ['id', 'title'],
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
        through: {
          attributes: [], // Ne tartalmazza a UserTasks kapcsolótábla mezőit
        },
      },
    ],
  });
}

export default {
  findAll,
  findById,
  findAllWithUsers,
};
