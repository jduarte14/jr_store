const Group = require('../models/Group');

const createGroup = async (req, res) => {
    try {
        const { name, category, type, itemModel, items } = req.body;

        if (!name || !type || !itemModel || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }

        if ((type === 'article' && itemModel !== 'JArticle') ||
            (type === 'product' && itemModel !== 'JProduct')) {
            return res.status(400).json({ status: 'error', message: 'Item model does not match group type' });
        }

        const newGroup = new Group({
            name,
            category,
            type,
            itemModel,
            items
        });

        await newGroup.save();

        return res.status(200).json({
            status: 'success',
            message: 'Group created successfully',
            group: newGroup
        });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

const getGroups = async (req, res) => {
    try {
        const { ids, category, type } = req.query;
        let query = {};

        if (ids) {
            const idArray = ids.split(',');
            query._id = { $in: idArray };
        } else {
            if (category) query.category = category;
            if (type) query.type = type;
        }

        const groups = await Group.find(query).populate('items');

        return res.status(200).json({
            status: 'success',
            groups
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};
;
;

const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        const group = await Group.findById(id)
            .populate({ path: 'items', model: doc => doc.itemModel });

        if (!group) {
            return res.status(404).json({ status: 'error', message: 'Group not found' });
        }

        return res.status(200).json({
            status: 'success',
            group
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

const editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, items } = req.body;

        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { name, category, ...(items && { items }) },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ status: 'error', message: 'Group not found' });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Group updated successfully',
            group: updatedGroup
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Group.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ status: 'error', message: 'Group not found' });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Group deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createGroup,
    getGroups,
    getGroupById,
    editGroup,
    deleteGroup
};
