import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export function createHash(text: string, _salt: string | undefined): string[] {
    try {
        const salt = _salt || crypto.randomBytes(16).toString("hex")
        const hash = crypto.pbkdf2Sync(text, salt, 10, 32, "sha512").toString("hex")
        return [salt, hash]
    } catch (error) {
        throw new Error('Error while encrypting data')
    }
}

export async function createToken(payload: string | object | Buffer) {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        return token
    } catch (error) {
        throw new Error('Error while creating token')
    }
}

export async function verifyToken(token: string) {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        throw new Error('Error while verifying token')
    }
}