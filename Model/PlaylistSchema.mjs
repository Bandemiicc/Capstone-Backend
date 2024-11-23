import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'  // Links each song in the playlist
        }
    ]
});

export default mongoose.model('Playlist', playlistSchema);
