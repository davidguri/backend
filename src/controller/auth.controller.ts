import bcrypt from 'bcrypt';

export class AuthController {
  private static saltRounds = 10;

  static async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hash);
      return match
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}