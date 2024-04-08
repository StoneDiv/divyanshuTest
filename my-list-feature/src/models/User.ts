import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './CommonTypes';

export interface IUser extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String, enum: Object.values(Genre) }],
    dislikedGenres: [{ type: String, enum: Object.values(Genre) }],
  },
  watchHistory: [{
    contentId: { type: Schema.Types.ObjectId, required: true },
    watchedOn: { type: Date, default: Date.now },
    rating: { type: Number },
  }],
});

export default mongoose.model<IUser>('User', userSchema);
