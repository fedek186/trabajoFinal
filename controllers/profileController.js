let profileController =
{
    index: function(req, res) {
       res.send('profile');
      },
    edit: function(req, res) {
        res.send('profile edit');
       },
};

module.exports = profileController;