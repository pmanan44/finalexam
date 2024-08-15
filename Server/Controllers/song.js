"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSong = exports.UpdateSong = exports.AddSong = exports.DisplaySongById = exports.DisplaySongList = void 0;
const song_1 = __importDefault(require("../Models/song"));
const Util_1 = require("../Util");
function DisplaySongList(req, res, next) {
    song_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Song List Retrieved and Displayed", data: data, token: null });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error retrieving songs", data: null, token: null });
    });
}
exports.DisplaySongList = DisplaySongList;
function DisplaySongById(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a song", data: null, token: null });
    }
    else {
        song_1.default.findById(id)
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Song Retrieved and Displayed", data: data, token: null });
            }
            else {
                res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error retrieving song", data: null, token: null });
        });
    }
}
exports.DisplaySongById = DisplaySongById;
function AddSong(req, res, next) {
    let artists = (req.body.artist) ? (0, Util_1.SanitizeArray)(req.body.artist) : (0, Util_1.SanitizeArray)("");
    let song = new song_1.default({
        title: req.body.title,
        artist: artists,
        album: req.body.album,
        genres: req.body.genres,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        label: req.body.label,
        trackNumber: req.body.trackNumber,
        isExplicit: req.body.isExplicit,
        rating: req.body.rating,
        composer: req.body.composer,
        youtubeLink: req.body.youtubeLink
    });
    song.save()
        .then(() => {
        res.status(200).json({ success: true, msg: "Song added", data: song, token: null });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error adding song", data: null, token: null });
    });
}
exports.AddSong = AddSong;
function UpdateSong(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a song", data: null, token: null });
    }
    else {
        let artists = (req.body.artist) ? (0, Util_1.SanitizeArray)(req.body.artist) : (0, Util_1.SanitizeArray)("");
        song_1.default.findByIdAndUpdate(id, {
            title: req.body.title,
            artist: artists,
            album: req.body.album,
            genres: req.body.genres,
            duration: req.body.duration,
            releaseDate: req.body.releaseDate,
            label: req.body.label,
            trackNumber: req.body.trackNumber,
            isExplicit: req.body.isExplicit,
            rating: req.body.rating,
            composer: req.body.composer,
            youtubeLink: req.body.youtubeLink
        }, { new: true })
            .then((updatedSong) => {
            if (updatedSong) {
                res.status(200).json({ success: true, msg: "Song updated", data: updatedSong, token: null });
            }
            else {
                res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error updating song", data: null, token: null });
        });
    }
}
exports.UpdateSong = UpdateSong;
function DeleteSong(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a song", data: null, token: null });
    }
    else {
        song_1.default.findByIdAndDelete(id)
            .then((deletedSong) => {
            if (deletedSong) {
                res.status(200).json({ success: true, msg: "Song deleted", data: id, token: null });
            }
            else {
                res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error deleting song", data: null, token: null });
        });
    }
}
exports.DeleteSong = DeleteSong;
//# sourceMappingURL=song.js.map