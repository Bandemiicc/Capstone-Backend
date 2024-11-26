import express from 'express';
import Playlist from "../Model/PlaylistSchema.mjs";
import Song from "../Model/SongSchema.mjs";

const router = express.Router()

//create a new playlist (TESTED!)
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
    const { playlistId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId)
        if (!playlist){
            return res.status(404).json({ msg: "Playlist not found" })
        }
        const song = await Song.findById(songId);
        if(!song){
            return res.status(404).json({msg: "Song not found"})
        }
        // playlist.songs.push(song);
        // await playlist.save();

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
        console.log(playlists)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Server error" })
    }
});

/// CREATE A UPDATE PLAYLIST ROUTE!

router.put('/:id', async (req, res) => {
    try {
        const updatedSong = await Playlist.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedSong){
            return res.status(404).json({msg: "Song not found"})
        }
        res.status(200).json(updatedSong);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "playlist did not update"})
    }
})

export default router;