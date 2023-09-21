import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  userId: typeof Schema.Types.ObjectId;
  sourceCity: string;
  destinationCity: string;
  date: Date;
  time: string;
  weightLimit: number;
  availableWeight: number;
  preferredItemCategories: string[];
  isCoTraveler: boolean;
}

const tripSchema = new Schema<ITrip>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sourceCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: String,
  weightLimit: {
    type: Number,
    required: true,
  },
  availableWeight: {
    type: Number,
    required: true,
  },
  preferredItemCategories: [String],
  isCoTraveler: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ITrip>('Trip', tripSchema);
