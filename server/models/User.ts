import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  hashedPassword: string;
  profileImage?: string;
  socialProfiles: {
    type: string;
    link: string;
  }[];
  ratings: {
    raterId: typeof Schema.Types.ObjectId,
    comments: string,
    date: Date,
  }[];
  badgeLevel: number | string;
  contacts: {
    phone?: string;
  };
  tripHistory: typeof Schema.Types.ObjectId[];
  reports: {
    details: string,
    date: Date,
  }[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  profileImage: String,
  socialProfiles: [{
    link: String,
    type: String
  }],
  ratings: [{
    raterId: Schema.Types.ObjectId,
    comments: String,
    date: Date,
  }],
  badgeLevel: Schema.Types.Mixed, // Either Number or String
  contacts: {
    phone: String,
  },
  tripHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip',
  }],
  reports: [{
    details: String,
    date: Date,
  }],
});

export default mongoose.model<IUser>('User', userSchema);
