import { Request, Response, NextFunction } from 'express';
import Song from '../Models/song'; 
import { SanitizeArray } from '../Util';

/**
 * This function displays the song list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplaySongList(req: Request, res: Response, next: NextFunction): void {
    Song.find({})
        .then((data) => {
            res.status(200).json({ success: true, msg: "Song List Retrieved and Displayed", data: data, token: null });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error retrieving songs", data: null, token: null });
        });
}

/**
 * This function displays a single song by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplaySongById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a song", data: null, token: null });
    } else {
        Song.findById(id)
            .then((data) => {
                if (data) {
                    res.status(200).json({ success: true, msg: "One Song Retrieved and Displayed", data: data, token: null });
                } else {
                    res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Error retrieving song", data: null, token: null });
            });
    }
}

/**
 * This function adds a song to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddSong(req: Request, res: Response, next: NextFunction): void {
    let artists = (req.body.artist) ? SanitizeArray(req.body.artist as string) : SanitizeArray("");

    let song = new Song({
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

/**
 * This function updates a song in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateSong(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a song", data: null, token: null });
    } else {
        let artists = (req.body.artist) ? SanitizeArray(req.body.artist as string) : SanitizeArray("");

        Song.findByIdAndUpdate(id, {
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
                } else {
                    res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Error updating song", data: null, token: null });
            });
    }
}

/**
 * This function deletes a song from the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteSong(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a song", data: null, token: null });
    } else {
        Song.findByIdAndDelete(id)
            .then((deletedSong) => {
                if (deletedSong) {
                    res.status(200).json({ success: true, msg: "Song deleted", data: id, token: null });
                } else {
                    res.status(404).json({ success: false, msg: "Song not found", data: null, token: null });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Error deleting song", data: null, token: null });
            });
    }
}