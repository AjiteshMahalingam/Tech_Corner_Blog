const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb+srv://Torvus:Aji1407MERN@testcluster.7frqt.mongodb.net/Tech_Corner?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    Article.find().sort({createdAt: -1})
        .then((result) => {
            res.render('./articles/index', {articles: result});
        })
        .catch((err) => console.log(err));    
});

app.listen(3000);