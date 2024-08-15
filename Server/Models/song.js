"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
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
const songs = (0, mongoose_1.model)('Song', songSchema);
exports.default = songs;
//# sourceMappingURL=song.js.map