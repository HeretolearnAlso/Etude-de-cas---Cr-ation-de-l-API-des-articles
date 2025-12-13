const Article = require("./articles.model");

class ArticleService {
    create(data, userId) {
        const article = new Article({ ...data, userId });
        return article.save();
    }
    update(id, data) {
         return Article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return Article.deleteOne({ _id: id });
    }
    getByUser(userId) {
        return Article.find({ userId }).populate('userId');
    }
}
module.exports = new ArticleService();