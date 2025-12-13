import { UnauthorizedError } from "../errors/unauthorized.js";
const articlesService = require("./articles.service");

class ArticlesController {
    async create(req, res, next) {
        try {
            if (!req.user || !req.user.userId || !req.user.isAdmin) {
                throw new UnauthorizedError();
            }

            const article = await articlesService.create(req.body);
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            if (!req.user || !req.user.userId || !req.user.isAdmin) {
                throw new UnauthorizedError();
            }

            const id = req.params.id;
            const data = req.body;
            const articleModified = await articlesService.update(id, data);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.user || !req.user.userId || !req.user.isAdmin) {
                throw new UnauthorizedError();
            }

            const id = req.params.id;
            await articlesService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async getByUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const articles = await articlesService.getByUser(userId);
            res.json(articles);
        } catch (err) {
            next(err);
        }   
    }
}

module.exports = new ArticlesController();
