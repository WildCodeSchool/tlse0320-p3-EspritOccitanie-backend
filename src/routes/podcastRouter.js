/* eslint-disable indent */

const express = require('express');

const router = express.Router({ mergeParams: true });
const { PodcastController } = require('../../controllers/podcastController');

/* const { checkPodcastForm } = require('../../controllers/validations/podcastValidation'); */
// const { Check } = require('../../controllers/checkErrors');

router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);

router.get('/', PodcastController.getAllPodcasts);
router.get('/', PodcastController.get4LatestPodcasts);
router.put('/:id', PodcastController.putPodcast);
router.delete('/:id', PodcastController.delPodcast);
router.get('/:id', PodcastController.getOnePodcast);
router.post('/', PodcastController.postPodcast);

module.exports = router;
