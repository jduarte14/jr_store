const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');

router.post('/groups', GroupController.createGroup);
router.get('/groups', GroupController.getGroups);
router.get('/groups/:id', GroupController.getGroupById);
router.patch('/groups/:id', GroupController.editGroup);
router.delete('/groups/:id', GroupController.deleteGroup);

module.exports = router;
