// types.ts
import { ITrip } from '@server/models/Trip';
import { Request } from 'express';

export interface UserRequest extends Request {
    userId?: string;
    trip?: ITrip
}
