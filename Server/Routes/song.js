"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const song_1 = require("../Controllers/song");
router.get('/', (req, res, next) => { (0, song_1.DisplaySongList)(req, res, next); });
router.get('/list', (req, res, next) => { (0, song_1.DisplaySongList)(req, res, next); });
router.get('/find/:id', (req, res, next) => { (0, song_1.DisplaySongById)(req, res, next); });
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, song_1.AddSong)(req, res, next); });
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, song_1.UpdateSong)(req, res, next); });
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, song_1.DeleteSong)(req, res, next); });
exports.default = router;
//# sourceMappingURL=song.js.map