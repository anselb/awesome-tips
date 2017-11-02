const Tip = require('../db/models/tip');

module.exports = function (app) {
    //GET new tip form
    app.get('/tips/new', function (req, res) {
        res.render('tips-new', {})
    });

    //GET individual tips
    app.get('/tips/:id', function (req, res) {
        Tip.findById(req.params.id).then((tip) => {
            res.render('tips-show', { tip: tip })
        })
    });

    //GET tips edit form
    app.get('/tips/:id/edit', function (req, res) {
        Tip.findById(req.params.id).then((tip) => {
            res.render('tips-edit', { tip: tip })
        })
    });

    //POST create new tips
    app.post('/tips', function (req, res) {
        Tip.create(req.body, function (err, tip) {
            console.log(tip);
            res.redirect('/')
        })
    });

    //PUT edit tips
    app.put('/tips/:id', function (req, res) {
        console.log(req.body);
        Tip.findByIdAndUpdate(req.params.id, req.body, function (err, tip) {
            res.redirect('/tips/' + tip._id)
        })
    });

    //DELETE tips
    app.delete('/tips/:id', function (req, res) {
        Tip.findByIdAndRemove(req.params.id, function (err) {
            res.redirect('/')
        })
    })
};
