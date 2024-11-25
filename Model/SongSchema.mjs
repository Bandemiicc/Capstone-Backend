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
        type: String,
        required: true
    },
});
SongSchema.index({name: 1})
export default mongoose.model('Song', SongSchema);