import express from 'express';
import Article from '../model/articleModel.js';
import User from "../model/userModel.js";
import { isAuth, response } from '../utils.js';

const articleRouter = express.Router();

articleRouter.put('/:userId', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            user.name = req.body.name || user.name;
            user.age = req.body.age || user.age;
            const updatedUser = await user.save();
            const resData = response({
                statusCode: 200,
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    age: updatedUser.age
                },
                message: "Success",
                error: null
            });
            res.status(200).json(resData);
        }
    } catch (error) {
        res.status(500).json(response({
            statusCode: 500,
            data: null,
            message: "Failed",
            error
        }));
    }
});

articleRouter.post('/:userId/articles', isAuth, async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            res.status(400).json(response({
                statusCode: 400,
                data: null,
                message: "Failed",
                error: "title and description are required"
            }));
            return;
        }

        const article = new Article({
            title: req.body.title,
            description: req.body.description,
            owner: req.params.userId
        });
        const createdArticle = await article.save();
        const resData = response({
            statusCode: 200,
            data: {
                _id: createdArticle._id,
                title: createdArticle.title,
                description: createdArticle.description,
            },
            message: "Success",
            error: null
        });

        res.status(200).json(resData);
    } catch (error) {
        res.status(500).json(response({
            statusCode: 500,
            data: null,
            message: "Failed",
            error
        }));
    }
});

articleRouter.get('/', isAuth, async (req, res) => {
    try {
        const articles = await Article.find({});
        const resData = response({
            statusCode: 200,
            data: articles,
            message: "Success",
            error: null
        });
        res.send(resData);
    } catch (error) {
        res.status(500).json(response({
            statusCode: 500,
            data: null,
            message: "Failed",
            error
        }));
    }
})

export default articleRouter;