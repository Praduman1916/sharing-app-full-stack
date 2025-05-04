const userLinkService = require('../services/userLinkService');

const getUserLinks = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId in query params' });
    }

    const result = await userLinkService.getUserLinks(userId);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Get Links Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const createLink = async (req, res) => {
  try {
    const { platform, url, order } = req.body;
    if (!platform || !url) {
      return res.status(400).json({ message: 'Missing required fields (userId, platform, url)' });
    }
     const userId=req.user.id
    const result = await userLinkService.createLink({ userId, platform, url, order });
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Create Link Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !updateData) {
      return res.status(400).json({ message: 'Missing link id or update data' });
    }

    const result = await userLinkService.updateLink(id, updateData);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Update Link Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing link id' });
    }

    const result = await userLinkService.deleteLink(id);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Delete Link Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getUserLinks,
  createLink,
  updateLink,
  deleteLink,
};
