import { pbkdf2Sync, randomBytes } from "crypto";

// Hashing a password
export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha256')
    return hash.toString('hex');
}

// Comparing a password with a hashed password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = hashPassword(password) === hashedPassword
    return isMatch;
}