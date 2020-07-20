/* eslint-disable indent */

const express = require('express');

const router = express.Router({ mergeParams: true });
const { PodcastController } = require('../controllers/podcastController');

router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);

router.get('/', PodcastController.getAllPodcasts);
router.get('/', PodcastController.get4LatestPodcasts);
router.get('/:id', PodcastController.getOnePodcast);
router.put('/:id', PodcastController.putPodcast);
router.delete('/:id', PodcastController.delPodcast);
router.post('/', PodcastController.postPodcast);

module.exports = router;
