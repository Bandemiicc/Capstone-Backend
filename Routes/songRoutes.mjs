// Import
import express from 'express';
import Song from '../Model/SongSchema.mjs'
const router = express.Router();

// // Test route
// router.get('/', (req, res) =>{
//     res.send('Testing!!')
// });

// Create
router.post('/', async (req,res)=>{
    try {
        const newSong = new Song (req.body);
        await newSong.save();
       return res.status(201).json(newSong)
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
});

// Read
router.get('/', async(req,res)=>{
    try {
        const songs = await Song.find()
        res.json(songs);
    } catch (err) {
        console.error(err)
        res.status(500).json({msg: "server error"})
    }
});

// Update
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

// Delete
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