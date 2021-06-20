const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
    res.render('./articles/new', {article: new Article()});
});

router.get("/:slug", (req, res) => {
    Article.findOne({slug: req.params.slug})
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
        res.redirect(`/articles/${article.slug}`);
    }).catch((err) => {
        console.log(err);
        res.render('./articles/new', {article:article});
    });
});
module.exports = router;