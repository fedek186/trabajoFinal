let profileController =
{
    index: function(req, res) {
       res.render('profile');
      },
    edit: function(req, res) {
        res.render('profile-edit');
       },
};

module.exports = profileController;