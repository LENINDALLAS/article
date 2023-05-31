import express from 'express';
import Article from '../model/articleModel.js';
import { isAuth, response } from '../utils.js';

const getArticleRouter = express.Router();

getArticleRouter.get('/', isAuth, async (req, res) => {
    try {
        const articles = await Article.find({});
        const resData = response({
            statusCode: 200,
            data: articles,
            message: "Success",
            error: null
        });
        res.status(200).send(resData);
    } catch (error) {
        res.status(500).json(response({
            statusCode: 500,
            data: null,
            message: "Failed",
            error
        }));
    }
})

export default getArticleRouter;