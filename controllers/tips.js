const TipModel = require('../db/models').Tip;


module.exports = function (app) {
    //GET new tip form
    app.get('/tips/new', function (req, res) {
        res.render('tips-new', {})
    });

    //GET individual tips
    app.get('/tips/:id', function (req, res) {
        TipModel.findById(req.params.id).then((tip) => {
            res.render('tips-show', { tip: tip })
        })
    });


    //GET tips edit form
    app.get('/tips/:id/edit', function (req, res) {
        TipModel.findById(req.params.id).then((tip) => {
            res.render('tips-edit', { tip: tip })
        })
    });

    //GET all the tips
    app.get('/tips', function(req,res) {
      TipModel.findAll({}).then((tips) => {
        res.send(tips);
      })
    })

    // SUCCESSFULLY POSTS TO DB // (DONE 11/01)
    //POST create new tips
    app.post('/tips', function (req, res) {
        console.log(req.body.lng);
        TipModel.create({body : req.body.tipContent, longitude : req.body.tipLng, latitude : req.body.tipLat}).then( (tip) => {
            tip.owner = req.user.username;
            tip.save({}).then( () => {
              res.redirect('/')
            });
        });
    });

    //PUT edit tips
    app.put('/tips/:id', function (req, res) {
        console.log(req.body);
        TipModel.findByIdAndUpdate(req.params.id, req.body, function (err, tip) {
            res.redirect('/tips/' + tip._id)
        })
    });

    //DELETE tips
    app.delete('/tips/:id', function (req, res) {
        TipModel.findById(req.params.id).then((tip) => {
            tip.destroy()
            res.redirect('/')
        })
    })

};
