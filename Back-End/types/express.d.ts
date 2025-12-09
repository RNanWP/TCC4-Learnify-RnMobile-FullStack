import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      sub: string;
      role?: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
