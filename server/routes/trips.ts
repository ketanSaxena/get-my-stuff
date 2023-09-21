import { Router, Request, Response } from 'express';
import Trip from '../models/Trip';
import { authMiddleware } from '@server/middlewares/authMiddleware';
import { getTripAndCheckPermission } from '@server/middlewares/checkTripPermission';
import { UserRequest } from '@server/types/http';

const router = Router();

// List All Trips
router.get('/listAll', async (req: Request, res: Response) => {
    try {
        const { sourceCity, destinationCity, date } = req.query;
        
        const filters: any = {};
        
        if (sourceCity) filters.sourceCity = sourceCity;
        if (destinationCity) filters.destinationCity = destinationCity;
        if (date) filters.date = new Date(date as string);

        const resultsPerPage = 10; // For pagination
        const page = parseInt(req.query.page as string) || 1;

        const trips = await Trip.find(filters)
            .skip((page - 1) * resultsPerPage)
            .limit(resultsPerPage);

        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch trips.' });
    }
});

// Get Trip Details
router.get('/getTripDetails/:tripId', async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found.' });
        }

        res.json(trip);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch trip details.' });
    }
});

// Create Trip API
router.post('/trip', authMiddleware, async (req: UserRequest, res: Response) => {
    try {
        const { sourceCity, destinationCity, date, time, weightLimit, availableWeight, preferredItemCategories, isCoTraveler } = req.body;
        const trip = new Trip({
            userId: req.userId,
            sourceCity,
            destinationCity,
            date,
            time,
            weightLimit,
            availableWeight,
            preferredItemCategories,
            isCoTraveler
        });

        await trip.save();
        res.status(201).send(trip);
    } catch (error: any) {
        res.status(500).send('Failed to create trip. ' + error.message);
    }
});

// Edit Trip API
router.put('/trip/:id', authMiddleware, getTripAndCheckPermission, async (req: UserRequest, res: Response) => {
    try {
        const { sourceCity, destinationCity, date, time, weightLimit, availableWeight, preferredItemCategories, isCoTraveler } = req.body;
        const tripToUpdate = req.trip!;  // Note: We're asserting that trip exists here using TypeScript's non-null assertion.

        // Update fields if provided
        if (sourceCity) tripToUpdate.sourceCity = sourceCity;
        if (destinationCity) tripToUpdate.destinationCity = destinationCity;
        if (date) tripToUpdate.date = date;
        if (time) tripToUpdate.time = time;
        if (weightLimit) tripToUpdate.weightLimit = weightLimit;
        if (availableWeight) tripToUpdate.availableWeight = availableWeight;
        if (preferredItemCategories) tripToUpdate.preferredItemCategories = preferredItemCategories;
        if (isCoTraveler !== undefined) tripToUpdate.isCoTraveler = isCoTraveler;

        await tripToUpdate.save();
        res.status(200).send(tripToUpdate);
    } catch (error: any) {
        res.status(500).send('Failed to edit trip. ' + error.message);
    }
});

// Delete Trip API
router.delete('/trip/:id', authMiddleware, getTripAndCheckPermission, async (req: UserRequest, res: Response) => {
    try {
        const tripToDelete = req.trip!;
        await Trip.deleteOne({ _id: tripToDelete._id })
        res.status(200).send({ message: 'Trip deleted successfully.' });
    } catch (error: any) {
        res.status(500).send('Failed to delete trip. ' + error.message);
    }
});


export default router;
