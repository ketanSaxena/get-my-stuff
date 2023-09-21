// middleware/getTripAndCheckPermission.ts
import { Response, NextFunction } from 'express';
import Trip from '../models/Trip';
import { UserRequest } from '@server/types/http';

export const getTripAndCheckPermission = async (req: UserRequest, res: Response, next: NextFunction) => {
    const tripId = req.params.id;

    const trip = await Trip.findById(tripId);
    if (!trip) {
        return res.status(404).send('Trip not found.');
    }

    if (trip.userId.toString() !== req.userId) {
        return res.status(403).send('You do not have permission to edit this trip.');
    }

    req.trip = trip;
    next();
};
