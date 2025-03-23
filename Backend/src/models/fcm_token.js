import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    fcm_token : String,
})

export default mongoose.model('Fcm_Token',schema);