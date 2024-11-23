import express from 'express';
import Playlist from "../Model/PlaylistSchema.mjs";
import Song from "../Model/SongSchema.mjs";

const router = express.Router()

//create a new playlist
router.post('/', async (req, res) => {
    try {
        const newPlaylist = new Playlist(req.body);
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Server error" })
    }
});
// add song to the playlizt
router.post('/:playlistId/songs', async (req, res) => {
    const { songId } = req.body;
    const { playlistId } = req.params

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist){
            return res.status(404).json({ msg: "Playlist not found" })
        }
        const song = await Song.findById(songId);
        if(!song){
            return res.status(404).json({msg: "Song not found"})
        }
        playlist.songs.push(song._id);
        await playlist.save();

        res.status(201).json(playlist);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Server error" })
    }
});
// Read all playlists
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('songs');
        res.json(playlists);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Server error" })
    }
});

export default router;