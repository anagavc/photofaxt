// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//requiring category
const Category = require('./category');

const GallerySchema = new Schema({
    gallImage: {
        url: String,
        filename: String,

    },
    name: String,
    description: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]

});


GallerySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Category.deleteMany({ _id: { $in: doc.images } });
    }
})
module.exports = mongoose.model('Gallery', GallerySchema);

