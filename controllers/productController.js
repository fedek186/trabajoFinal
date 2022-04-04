let productController =
{
    index: function(req, res) {
       res.render('../product');
      },
    edit : function(req, res) {
        res.send('productEdit');
       },
};

module.exports = productController;