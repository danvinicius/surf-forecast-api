import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from '@src/models/user';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, config.get('App.auth.key') || 'test', {
      expiresIn: config.get('App.auth.tokenExpiresIn')
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get('App.auth.key') || 'test') as DecodedUser;
  }
}
