
const Home = require('../models/homepage');
const About = require('../models/about');
const Service = require('../models/services');
const Booking = require('../models/booking');
const Faq = require('../models/faq');
const Review = require('../models/review');
const Gallery = require('../models/gallery');
const Image = require('../models/category');
const Title = require('../models/title');



//this helps render the website's index page and pass in values from the databse to it
module.exports.renderHomepage = async (req, res) => {
    const data = await Home.findById("60e054b715f9d15ca8559d96")
    const about = await About.findById("60e09f7ba09d5a5c40d81585")
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    const services = await Service.find({});
    const galleries = await Gallery.find({});
    const faqs = await Faq.find({});
    const reviews = await Review.find({});
    res.render('home/index', { data, services, title, faqs, reviews, galleries, about });
}

//this helps render the about page and passes in the neccessary data from the about model's database
module.exports.renderAboutpage = async (req, res) => {
    const data = await Home.findById("60e054b715f9d15ca8559d96")
    const about = await About.findById("60e09f7ba09d5a5c40d81585")
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('home/about', { about, title, data });
}

//this passes in the required data for the gallery section  from the database
module.exports.renderGallery = async (req, res) => {
    const { id } = req.params;
    const data = await Home.findById("60e054b715f9d15ca8559d96")
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    const gallery = await Gallery.findById(id).populate('images');
    res.render('home/gallery', { title, gallery, data });
}

//this passes in the required data for the gallery description(includes each gallery's images)+*6 from the database conating the di
module.exports.renderGalleryDesc = async (req, res) => {
    const { imageId, id } = req.params
    const gallery = await Gallery.findById(id)
    const image = await Image.findById(imageId)
    const data = await Home.findById("60e054b715f9d15ca8559d96")
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('home/galleryDesc', { title, image, gallery, data });
}

//this passes the homepage data into the boilerplate to enable one manipluae the wesite's title
module.exports.Boilerplate = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('layouts/boilerplate', { title });
}

//this helps save the bokking request tot the database
module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body.booking);
    await booking.save();
    req.flash('success', 'Your booking was made successfully') //setting up a flash to be cretaed after we make a new campground
    res.redirect('/')

}


