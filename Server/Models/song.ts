import { Schema, model, Document } from 'mongoose';

// MusicTrack Interface - defines the structure of a music track document
export interface ISong extends Document {
    title: string;
    artist: string[];
    album: string;
    genres: string;
    duration: string;
    releaseDate: Date;
    label: string;
    trackNumber: number;
    isExplicit: boolean;
    rating: number;
    composer: string;
    youtubeLink: string;
}

// MusicTrack Schema - defines the structure of a music track document
const songSchema = new Schema<ISong>({
    title: { type: String, required: true },
    artist: { type: [String], required: true },
    album: { type: String, required: true },
    genres: { type: String, required: true },
    duration: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    label: { type: String, required: true },
    trackNumber: { type: Number, required: true },
    isExplicit: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    composer: { type: String, required: true },
    youtubeLink: { type: String, required: true },
});

// Create a model from the schema
const songs = model<ISong>('Song', songSchema);

export default songs;