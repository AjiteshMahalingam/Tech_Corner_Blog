const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
    res.render('./articles/new', {article: new Article()});
});

router.get("/edit/:id", (req, res) => {
    Article.findById(req.params.id)
        .then((result) => {
            res.render('./articles/edit', {article: result});
        })
        .catch((err) => console.log(err));
});
router.get("/:id", (req, res) => {
    Article.findById(req.params.id)
        .then((result) => {
            if(result == null)
                res.redirect('/');
            res.render('./articles/show', {article: result});
        }).catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    article.save().then((result) => {
        console.log(result);
        res.redirect(`/articles/${article.id}`);
    }).catch((err) => {
        console.log(err);
        res.render('./articles/new', {article:article});
    });
});

router.put('/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    }).then((result) => res.redirect(`/articles/${req.params.id}`))
      .catch((err) => {
          console.log(err);
          res.redirect(`/articles/edit/${req.params.id}`);
      });
});
router.delete('/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err));
});
module.exports = router;