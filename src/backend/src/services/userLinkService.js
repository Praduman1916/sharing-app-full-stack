const {UserLink} = require('../models');

const getUserLinks = async (userId) => {
    try {
        const links = await UserLink.findAll({ where: { userId } });
        return {
            status: 200,
            data: links,
        };
    } catch (err) {
        return {
            status: 500,
            data: { message: 'Failed to fetch links', error: err.message },
        };
    }
};

const createLink = async ({ userId, platform, url, order }) => {
    console.log(userId, platform, url, order)
    try {
      const newLink = await UserLink.create({ userId,platform, url, order });
      return {
        status: 201,
        data: { message: 'Link created', link: newLink },
      };
    } catch (err) {
      return {
        status: 500,
        data: { message: 'Failed to create link', error: err.message },
      };
    }
  };

const updateLink = async (id, { platform, url, order }) => {
    try {
        const updated = await UserLink.update(
            { platform, url, order },
            { where: { id } }
        );
        return {
            status: 200,
            data: { message: 'Link updated', updated },
        };
    } catch (err) {
        return {
            status: 500,
            data: { message: 'Failed to update link', error: err.message },
        };
    }
};

const deleteLink = async (id) => {
    try {
        await UserLink.destroy({ where: { id } });
        return {
            status: 200,
            data: { message: 'Link deleted' },
        };
    } catch (err) {
        return {
            status: 500,
            data: { message: 'Failed to delete link', error: err.message },
        };
    }
};

module.exports = {
    getUserLinks,
    createLink,
    updateLink,
    deleteLink,
};
