// Import
import express from 'express';
import Song from '../Model/SongSchema.mjs'
const router = express.Router();

// // Test route
// router.get('/', (req, res) =>{
//     res.send('Testing!!')
// });

// Create (COMPLETE!!!!!)
router.post('/', async (req,res)=>{
    const { name, artist, album, playlistId } = req.body 
    try {
        const newSong = new Song ({ name, artist, album, playlistId });
        await newSong.save();
        res.status(201).json(newSong)
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
});

router.get('/allsongs', async (req,res)=>{
    try {
        const allSongs = await Song.find()
        res.json(allSongs)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "server error"})
    }
})

// Read (COMPLETE!!!!!)
router.get('/', async(req,res)=>{
    const playlistId  = req.query.playlistId
    try {
        const songs = await Song.find({playlistId})
        res.json(songs);
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
});

router.get('/:id', async(req,res)=>{
    try {
        const songs = await Song.findById(req.params.id)
        res.json(songs);
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
});

// Update (COMPLETE!!!!!)
router.put('/:id', async (req,res)=>{
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedSong){
            return res.status(404).json({msg: "Song not found"})
        }
        res.status(200).json(updatedSong);
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
        
    }
});

// Delete (COMPLETE!!!!!)
router.delete('/:id', async (req,res)=>{
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong){
            return res.status(404).json({msg: "Song not found"})
        }
        res.status(200).json(deletedSong)  
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
})

export default router;