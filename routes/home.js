//requiring express
const express = require('express');

//requiring express' router
const router = express.Router();

//requiring our user controller
const home = require('../controllers/home');

router.route('/')
    .get(home.renderHomepage)
    .post(home.addBooking);

router.route('/booking')
    .post(home.addBooking);

router.route('/about')
    .get(home.renderAboutpage);

router.route('/gallery/:id/image/')
    .get(home.renderGallery);

router.route('/gallery/:id/image/:imageId/galleryDesc')
    .get(home.renderGalleryDesc);


module.exports = router;