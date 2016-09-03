import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';

var routes = require('./db/login-and-register.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(express.static('./public'));

app.get('/hello', function (req, res) {
    res.send('Hello, world!');
});

app.post("/register", routes.insert);
app.post('/login', routes.login);

app.listen(process.env.PORT, function () {
    console.log('Listening on 3000');
});
mongoose.connect(process.env.PROD_MONGODB);
