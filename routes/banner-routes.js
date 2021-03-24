const express = require('express')
const router = express.Router()
const { authenticate, authorization} = require('../middlewares/auth')
const ControllerBanner =  require('../controllers/banner-controller')

// show all banner
router.get('/banners', ControllerBanner.showBanner)

// add new banner to database
router.post('/addBanner', authenticate, authorization, ControllerBanner.addBanner)

// show edit data to page edit
router.get('/banner/:id', authenticate, authorization, ControllerBanner.showEditbanner)

// edit new Banner to Database
router.put('/banner/:id', authenticate, authorization, ControllerBanner.editBanner)

// delete banner from database
router.delete('/banner/:id', authenticate, authorization, ControllerBanner.deleteBanner)


module.exports = router