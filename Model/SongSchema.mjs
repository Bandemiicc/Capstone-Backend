import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    artist: {
        type: String,
        required: true,
        index: true,
    },
    Date: {
        type: Date,
        default: Date.now
    },
    album: {
        type: String,
        default: null
    },
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist', // Reference to Playlist model
        required: [true, 'Playlist ID is required'], 
    },
});
SongSchema.index({name: 1})
export default mongoose.model('Song', SongSchema);