const Admin = require('../models/admin');
const Home = require('../models/homepage');
const About = require('../models/about');
const Service = require('../models/services');
const Gallery = require('../models/gallery');
const Booking = require('../models/booking');
const FAQ = require('../models/faq');
const Review = require('../models/review');
const Image = require('../models/category');
const Title = require('../models/title');
//requiring cloudinary
const { cloudinary } = require('../cloudinary')

module.exports.renderRegister = (req, res) => {
    res.render('admin/register');
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = new Admin({ username });
        const registeredAdmin = await Admin.register(admin, password);
        req.login(registeredAdmin, err => {
            if (err) return next();
            req.flash('success', 'welcome');
            res.redirect('overview');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

//this helps us render the login form
module.exports.renderLogin = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/login', { title });
}
//this helps us login even though it is the passport.authenticate that is handling the login process, this flashes our successful login
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = 'overview'
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};


//this helps render the overview page
module.exports.renderOverview = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    const services = await Service.countDocuments();
    const gallery = await Gallery.countDocuments();
    const booking = await Booking.countDocuments();
    const faq = await FAQ.countDocuments();
    const review = await Review.countDocuments();
    res.render('admin/overview', { services, gallery, booking, faq, review, title });
}

//this helps render the add homepage form
module.exports.addHomepage = async (req, res) => {
    const home = new Home(req.body);
    home.heroImage.url = req.file.heroImage.path;
    home.heroImage.filename = req.file.heroImage.filename;
    await home.save();
    req.flash('success', 'Succesfully added the homepage details') //setting up a flash to be cretaed after we make a new campground
    res.redirect('overview')

}

//this helps  render the addHomepage
module.exports.renderAddHomepage = async (req, res) => {
    res.render('admin/addHomepage');
}
//this helps  render the update homepage form
module.exports.updateHomepage = async (req, res) => {
    const home = await Home.findByIdAndUpdate("60e054b715f9d15ca8559d96", { ...req.body });
    if (req.file) {
        await cloudinary.uploader.destroy(home.heroImage.filename)
        home.heroImage.url = req.file.heroImage.path;
        home.heroImage.filename = req.file.heroImage.filename;
    }
    await home.save();
    req.flash('success', 'Succesfully updated the homepage details') //setting up a flash to be cretaed after we make a new campground
    res.redirect('editHomepage')

}

//this helps render the edit homepage
module.exports.renderEditHomepage = async (req, res) => {
    const data = await Home.findOne()
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    if (!data) {
        req.flash('error', 'There is no information in the database yet');
        return res.redirect('overview')
    }
    res.render('admin/editHomepage', { data, title });

}



module.exports.addAbout = async (req, res) => {
    const about = new About(req.body);
    about.aboutUsImg.url = req.file.path;
    about.aboutUsImg.filename = req.file.filename;
    await about.save();
    req.flash('success', 'Succesfully added the about details') //setting up a flash to be cretaed after we make a new campground
    res.redirect('overview')

}

//this helps render the add About Page
module.exports.renderAddAbout = async (req, res) => {
    res.render('admin/addAbout');
}
//this helps save the information of the update abput page
module.exports.updateAbout = async (req, res) => {
    const about = await About.findByIdAndUpdate("60e09f7ba09d5a5c40d81585", { ...req.body });
    if (req.file) {
        await cloudinary.uploader.destroy(about.aboutUsImg.filename)
        about.aboutUsImg.url = req.file.path;
        about.aboutUsImg.filename = req.file.filename;
    }
    await about.save();
    req.flash('success', 'Succesfully updated the about details') //setting up a flash to be cretaed after we make a new campground
    res.redirect('editAbout')

}

//this helps  render the edit about page
module.exports.renderEditAbout = async (req, res) => {
    const about = await About.findOne()
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    if (!about) {
        req.flash('error', 'There is no information in the database yet');
        return res.redirect('overview')
    }
    res.render('admin/editAbout', { about, title });

}


module.exports.addTitle = async (req, res) => {
    const title = new Title(req.body);
    title.favicon.url = req.file.path;
    title.favicon.filename = req.file.filename;
    await title.save();
    req.flash('success', 'Succesfully added the title details')
    res.redirect('overview')

}

//this helps render the add Title page
module.exports.renderAddTitle = async (req, res) => {
    res.render('admin/addTitle');
}
//this helps save the information of the updated title information
module.exports.updateTitle = async (req, res) => {
    const title = await Title.findByIdAndUpdate("60e1b0bdd2ef5332442124d7", { ...req.body });
    if (req.file) {
        await cloudinary.uploader.destroy(title.favicon.filename)
        title.favicon.url = req.file.path;
        title.favicon.filename = req.file.filename;
    }
    await title.save();
    req.flash('success', 'Succesfully updated the title details')
    res.redirect('overview')

}

//this helps  render the edit title page
module.exports.renderEditTitle = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    if (!title) {
        req.flash('error', 'There is no information in the database yet');
        return res.redirect('overview')
    }
    res.render('admin/editTitle', { title });

}



//this helps render the add services Page
module.exports.renderAddServices = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/AddServices', { title });
}
//this helps save our newly created services
module.exports.createService = async (req, res) => {
    const services = new Service(req.body.services)
    await services.save()
    req.flash('success', 'Succesfully added a new service') //setting up a flash to be cretaed after we make a new campground
    res.redirect('services');
}

//this helps render the services page
module.exports.renderServices = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    const services = await Service.find({})
    res.render('admin/services', { services, title });
}

//this is for exporting the method for deleting services
module.exports.deleteService = async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    req.flash('success', 'You have successfully deleted this service') //setting up a flash to be cretaed after we delete a campground
    res.redirect('../services');
}
//this helps render the edit services page
module.exports.renderEditService = async (req, res) => {
    const { id } = req.params;
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    const services = await Service.findById(id);
    res.render('admin/editServices', { services, title })
}

//this helps save the information after we have updated a service
module.exports.updateService = async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndUpdate(id, { ...req.body.services });
    req.flash('success', 'Succesfully updated the service')
    res.redirect('../services')

}
//this helps  render the Gallery Page
module.exports.renderGallery = async (req, res) => {
    const galleries = await Gallery.find({})
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/gallery', { galleries, title });
}

//this helps  render the addGallery page
module.exports.addGallery = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/addGallery', { title });
}

//this helps save the information for a newly created gallery
module.exports.createGallery = async (req, res) => {
    const gallery = new Gallery(req.body.gallery);
    gallery.gallImage.url = req.file.path;
    gallery.gallImage.filename = req.file.filename;
    await gallery.save()
    req.flash('success', 'Succesfully created a new gallery')
    res.redirect('gallery');
}
//this helps render the edit gallery page
module.exports.renderEditGallery = async (req, res) => {
    const { id } = req.params;
    const galleries = await Gallery.findById(id);
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/editGallery', { galleries, title });
}
//this helps save the information after a gallery has been edited
module.exports.updateGallery = async (req, res) => {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndUpdate(id, { ...req.body.gallery });
    if (req.file) {
        await cloudinary.uploader.destroy(gallery.gallImage.filename)
        gallery.gallImage.url = req.file.path;
        gallery.gallImage.filename = req.file.filename;
    }
    await gallery.save();
    req.flash('success', 'Succesfully updated the gallery')
    res.redirect('../../../gallery')

}

//this is for exporting the method for deleting a gallery
module.exports.deleteGallery = async (req, res) => {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndDelete(id);
    await cloudinary.uploader.destroy(gallery.gallImage.filename)
    req.flash('success', 'You have successfully deleted this gallery')
}
//this helps render the images page
module.exports.renderGalleryImages = async (req, res) => {
    const { id } = req.params;
    const gallery = await Gallery.findById(id).populate('images');
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/images', { gallery, title });
}

//this helps render the addImage page
module.exports.addImage = async (req, res) => {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/addImage', { gallery, title });
}
//this helps us render the editImage page
module.exports.editImage = async (req, res) => {
    const { id, imageId } = req.params;
    const gallery = await Gallery.findById(id);
    const image = await Image.findById(imageId);
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/editImage', { image, gallery, title });
}

//this helps save a newly created image to it's specified gallery in the database
module.exports.createImage = async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    const image = new Image(req.body.category)
    image.gallery = gallery.name
    image.catImage.url = req.file.path;
    image.catImage.filename = req.file.filename;
    gallery.images.push(image);
    await image.save();
    await gallery.save();
    req.flash('success', 'Succesfully created a new image')
    res.redirect('../image');
}

//this helps save the information after an image has been updated
module.exports.updateImage = async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    const { imageId } = req.params;
    const image = await Image.findByIdAndUpdate(imageId, { ...req.body.category });
    if (req.file) {
        await cloudinary.uploader.destroy(image.catImage.filename)
        image.gallery = gallery.name
        image.catImage.url = req.file.path;
        image.catImage.filename = req.file.filename;
    }
    await image.save();
    req.flash('success', 'Succesfully updated the Image') //setting up a flash to be cretaed after we make a new campground
    res.redirect('../../image')
}

//this allows  for exporting the method for deleting a gallery's image
module.exports.deleteImage = async (req, res) => {
    const { imageId } = req.params;
    const image = await Image.findByIdAndDelete(imageId);
    await cloudinary.uploader.destroy(image.catImage.filename)
    req.flash('success', 'You have successfully deleted this image') //setting up a flash to be created after we delete an image
    res.redirect('../image');
}

//this helps render the Bookings page with the booking information from the database
module.exports.renderBookings = async (req, res) => {
    const bookings = await Booking.find({});
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/bookings', { bookings, title });
}

//this allows for exporting the method for deleting a booking
module.exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    req.flash('success', 'You have successfully deleted this booking')
    res.redirect('../bookings');
}


//this helps render the add faq page
module.exports.renderAddFAQ = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/addFAQ', { title });
}
//this helps save the information after a faq has been updated
module.exports.createFAQ = async (req, res) => {
    const faq = new FAQ(req.body.faq)
    await faq.save()
    req.flash('success', 'Succesfully created a new frequently asked question')
    res.redirect('faq');
}

//this helps render the faqs page
module.exports.renderFAQ = async (req, res) => {
    const faqs = await FAQ.find({});
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/faqs', { faqs, title });
}
//this helps render the edit faqs page
module.exports.renderEditFAQ = async (req, res) => {
    const { id } = req.params;
    const faqs = await FAQ.findById(id);
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/editFaq', { faqs, title });
}
//this helps us save the edited faq
module.exports.updateFAQ = async (req, res) => {
    const { id } = req.params;
    await FAQ.findByIdAndUpdate(id, { ...req.body.faq });
    req.flash('success', 'Succesfully updated the frequently asked question')
    res.redirect('../faq')

}

//this allows us export the method for deleting faqs
module.exports.deleteFAQ = async (req, res) => {
    const { id } = req.params;
    await FAQ.findByIdAndDelete(id);
    req.flash('success', 'You have successfully deleted this frequently asked question')
}

//this helps render the reviews page
module.exports.renderReview = async (req, res) => {
    const reviews = await Review.find({});
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/review', { reviews, title });
}

//this helps  render the edit reviews page
module.exports.renderEditReview = async (req, res) => {
    const { id } = req.params;
    const reviews = await Review.findById(id);
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/editReview', { reviews, title });
}

//this helps render the page for adding a revieiw
module.exports.addReview = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('admin/addReview', { title });
}

//this helps save a newly created faq
module.exports.createReview = async (req, res) => {
    const review = new Review(req.body.review)
    review.revImage.url = req.file.path;
    review.revImage.filename = req.file.filename;
    await review.save()
    req.flash('success', 'Succesfully created a new review')
    res.redirect('review');
}

//this helps save an edited review
module.exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, { ...req.body.review });
    if (req.file) {
        await cloudinary.uploader.destroy(review.revImage.filename)
        review.revImage.url = req.file.path;
        review.revImage.filename = req.file.filename;
    }
    await review.save()
    req.flash('success', 'Succesfully updated the review')
    res.redirect('../review')

}

//this allows for exporting the method for deleting faqs
module.exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    req.flash('success', 'You have successfully deleted this review')
    res.redirect('../review');
}

//this passes the favicon and title  data into the adminboilerplate
module.exports.AdminBoilerplate = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('layouts/adminBoilerplate', { title });
}
//this passes the favicon and title e data into the overview page
module.exports.AdminSidebar = async (req, res) => {
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    res.render('layouts/adminSidebar', { title });
}


//this exports the logout method
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!, you have logged out successfully')
    res.redirect('login');
}


