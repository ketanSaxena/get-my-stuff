import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../types/http'

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send('No authentication token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY') as { id: string };
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).send('Invalid token.');
    }
};
