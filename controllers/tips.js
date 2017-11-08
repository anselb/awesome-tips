const TipModel = require('../db/models/index').Tip;
const UserModel = require('../db/models/index').User;

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

    //GET all tip locations for map markers
    app.get('/tips', function(req,res) {
      TipModel.findAll({

      }).then((tips) => {
        res.send(tips);
      })
    });

    // SUCCESSFULLY POSTS TO DB // (DONE 11/01)
    //POST create new tips
    app.post('/tips', function (req, res) {
        TipModel.create({
            body : req.body.tipContent,
            longitude : req.body.tipLng,
            latitude : req.body.tipLat,
            owner: req.user.id
        }).then( (tip) => {
            tip.save({}).then( () => {
              res.redirect('/')
            });
        });
    });

    //PUT edit tips
    app.put('/tips/:id', function (req, res) {
        // console.log(req.body);
        TipModel.findByIdAndUpdate(req.params.id, req.body, function (err, tip) {
            res.redirect('/tips/' + tip._id)
        })
    });

    //PUT update vote
    app.put('/tips/:id/voteup', function (req, res) {

        TipModel.findById(req.params.id).then(function(tip){
            if(tip) {
                let votes = tip.vote + 1;
                tip.update(
                    { vote: votes },
                    { where: { id: req.params.id } });
                res.redirect('/')
            } else {
                res.send(404);
            }
        });
    });

    //PUT update vote
    app.put('/tips/:id/votedown', function (req, res) {

        TipModel.findById(req.params.id).then(function(tip){
            if(tip) {
                let votes = tip.vote - 1;
                tip.update(
                    { vote: votes },
                    { where: { id: req.params.id } });
                res.redirect('/')
            } else {
                res.send(404);
            }
        });
    });

    //DELETE tips
    app.delete('/tips/:id', function (req, res) {
        TipModel.findById(req.params.id).then((tip) => {
            tip.destroy();
            res.redirect('/')
        })
    })

};
