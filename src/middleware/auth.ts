import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../persistence/entity/user';

dotenv.config()

export const SECRET_KEY = process.env.SECRET_KEY || 'somesecret';
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION


export interface UserToken extends jwt.JwtPayload {
    user: User;
  }
  
  export const  verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): any => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(
        token,
        process.env.TOKEN_SECRET || 'somesecret'
      ) ;
    //  process.env.TOKEN_SECRET || '0123456789010987654321@1200000022'

      console.log('$$$$: ', decodedToken)
      // const id = decodedToken.user;
      // const authorities = decodedToken.authorities
      // res.locals.token = {
        // id
      // };
  
      next();
      return;
      // return { id, authorities}
    } catch (err) {
      res.status(401).json({ message: `Invalid token!` });
    }
  };
  
  
  