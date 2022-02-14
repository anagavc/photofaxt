//requiring express
const express = require('express');

//requiring express' router
const router = express.Router();
//requiring our isLoggedIn middleware
const { isAdmin, isLoggedIn } = require('../middleware');
//requiring our user controller
const admins = require('../controllers/admins')

//requiring passport
const passport = require('passport');

//requiring multer
const multer = require('multer');

//requiring the new cloudinary storage we set uop in our cloudinary/index.js file
const { storage } = require('../cloudinary');

//this is where we specify the path we want multer to store files to
const upload = multer({ storage });

//requiring our catchAsync error handler
const catchAsync = require('../utils/catchAsync')

router.route('/register')
    //route to get registration page
    .get(admins.renderRegister)
    //route to make new registrations, we use req.login to ensure the user gets logged in right after registration and the err function is just incase we encounter any error before logging them in which is quite rare
    .post(catchAsync(admins.register));

router.route('/login')
    //route to get to our login page
    .get(admins.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), admins.login);



router.route('/overview')
    .get(isAdmin, catchAsync(admins.renderOverview));

router.route('/addHomepage')
    .get(isAdmin, admins.renderAddHomepage)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync0 is for catching errors
    .post(isAdmin, upload.single('heroImage'), catchAsync(admins.addHomepage));

router.route('/editHomepage')
    .get(isAdmin, admins.renderEditHomepage)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync0 is for catching errors
    .put(isAdmin, upload.single('heroImage'), catchAsync(admins.updateHomepage));

router.route('/addAbout')
    .get(isAdmin, admins.renderAddAbout)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync is for catching errors
    .post(isAdmin, upload.single('aboutUsImg'), catchAsync(admins.addAbout));

router.route('/editAbout')
    .get(isAdmin, admins.renderEditAbout)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync0 is for catching errors
    .put(isAdmin, upload.single('aboutUsImg'), catchAsync(admins.updateAbout));

router.route('/addTitle')
    .get(isAdmin, admins.renderAddTitle)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync is for catching errors
    .post(isAdmin, upload.single('favicon'), catchAsync(admins.addTitle));

router.route('/editTitle')
    .get(isAdmin, admins.renderEditTitle)
    //saving our newly created campground and redirecting back to the show page for the new campground. the catchAsync0 is for catching errors
    .put(isAdmin, upload.single('favicon'), catchAsync(admins.updateTitle));

router.route('/services')
    .get(isAdmin, admins.renderServices);
router.route('/services/:id')
    .get(isAdmin, admins.renderEditService)
    .delete(isAdmin, catchAsync(admins.deleteService))
    .put(isAdmin, catchAsync(admins.updateService));

router.route('/addServices')
    .get(isAdmin, admins.renderAddServices)
    .post(isAdmin, catchAsync(admins.createService));

router.route('/gallery')
    .get(isAdmin, admins.renderGallery);

router.route('/gallery/:id')
    .delete(isAdmin, catchAsync(admins.deleteGallery))


router.route('/gallery/:id/edit')
    .get(isAdmin, admins.renderEditGallery)
    .put(isAdmin, upload.single('gallImage'), catchAsync(admins.updateGallery));

router.route('/gallery/:id/image')
    .get(isAdmin, admins.renderGalleryImages);

router.route('/gallery/:id/image/:imageId/edit')
    .get(isAdmin, admins.editImage)
    .put(upload.single('catImage'), catchAsync(admins.updateImage));

router.route('/gallery/:id/image/:imageId')
    .delete(isAdmin, catchAsync(admins.deleteImage))

router.route('/gallery/:id/images/new')
    .get(isAdmin, admins.addImage)
    .post(isAdmin, upload.single('catImage'), catchAsync(admins.createImage));

router.route('/addGallery')
    .get(isAdmin, admins.addGallery)
    .post(isAdmin, upload.single('gallImage'), catchAsync(admins.createGallery));


router.route('/bookings')
    .get(isAdmin, admins.renderBookings);

router.route('/bookings/:id')
    .delete(isAdmin, admins.deleteBooking);

router.route('/faq')
    .get(isAdmin, admins.renderFAQ);

router.route('/faq/:id')
    .get(isAdmin, admins.renderEditFAQ)
    .delete(isAdmin, catchAsync(admins.deleteFAQ))
    .put(isAdmin, catchAsync(admins.updateFAQ));

router.route('/addFAQ')
    .get(isAdmin, admins.renderAddFAQ)
    .post(isAdmin, catchAsync(admins.createFAQ));

router.route('/review')
    .get(isAdmin, admins.renderReview);

router.route('/review/:id')
    .get(isAdmin, admins.renderEditReview)
    .delete(isAdmin, catchAsync(admins.deleteReview))
    .put(isAdmin, upload.single('revImage'), catchAsync(admins.updateReview));


router.route('/addReview')
    .get(isAdmin, admins.addReview)
    .post(isAdmin, upload.single('revImage'), catchAsync(admins.createReview));


//route for logging out
router.get('/logout', admins.logout);

//exporing our router
module.exports = router;





