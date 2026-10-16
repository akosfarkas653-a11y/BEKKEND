import crypto from 'crypto';
import * as userRepository from '../repository/userRepository.js';

// In-memory tokentároló az aktív bejelentkezésekhez
const activeTokens = new Map();

/**
 * Összes felhasználó lekérdezése (üzleti logika).
 */
export async function getAllUsers() {
  return await userRepository.findAll();
}

/**
 * Felhasználó keresése azonosító alapján.
 */
export async function getUserById(id) {
  return await userRepository.findById(id);
}

/**
 * Bejelentkezés és token kiállítás.
 * Validálja a megadott adatokat, ellenőrzi a felhasználót a repository-n keresztül,
 * majd sikeres egyezés esetén tokent generál és tárol.
 */
export async function login(email, password) {
  if (!email || !password) {
    const error = new Error('Az email és jelszó megadása kötelező.');
    error.statusCode = 400;
    throw error;
  }

  const user = await userRepository.findByCredentials(email, password);
  if (!user) {
    const error = new Error('Hibás email cím vagy jelszó.');
    error.statusCode = 401;
    throw error;
  }

  const token = crypto.randomUUID();
  activeTokens.set(token, { id: user.id, email: user.email });

  return {
    message: 'Sikeres bejelentkezés!',
    token,
  };
}

/**
 * Token érvényességének ellenőrzése.
 * Visszaadja a bejelentkezett felhasználó adatait, vagy null-t, ha a token érvénytelen.
 */
export function verifyToken(token) {
  if (!token || !activeTokens.has(token)) {
    return null;
  }
  return activeTokens.get(token);
}

export default {
  getAllUsers,
  getUserById,
  login,
  verifyToken,
};
