import express from 'express';
const router = express.Router();
import passport from 'passport';

import { DisplaySongList, DisplaySongById, AddSong, UpdateSong, DeleteSong } from '../Controllers/song';

/* List of Song Routes (endpoints) */

/* GET Song List - fallback in case /list is not used */
router.get('/', (req, res, next) => { DisplaySongList(req, res, next); });

/* GET Song List. */
router.get('/list', (req, res, next) => { DisplaySongList(req, res, next); });

/* GET Song by ID. */
router.get('/find/:id', (req, res, next) => { DisplaySongById(req, res, next); });

/* Add Song */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => { AddSong(req, res, next); });

/* Update Song */
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => { UpdateSong(req, res, next); });

/* Delete Song */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => { DeleteSong(req, res, next); });

export default router;