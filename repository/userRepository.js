import { User } from '../models/User.js';

/**
 * Összes felhasználó lekérdezése az adatbázisból.
 */
export async function findAll() {
  return await User.findAll();
}

/**
 * Felhasználó keresése azonosító (ID) alapján.
 */
export async function findById(id) {
  return await User.findByPk(id);
}

/**
 * Felhasználó keresése email cím alapján.
 */
export async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

/**
 * Felhasználó keresése email és jelszó alapján (bejelentkezéshez).
 */
export async function findByCredentials(email, password) {
  return await User.findOne({ where: { email, password } });
}

/**
 * Új felhasználó létrehozása az adatbázisban.
 */
export async function create(userData) {
  return await User.create(userData);
}

export default {
  findAll,
  findById,
  findByEmail,
  findByCredentials,
  create,
};
