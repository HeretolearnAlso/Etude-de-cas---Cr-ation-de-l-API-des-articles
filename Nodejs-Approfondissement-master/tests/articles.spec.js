// articles.service.test.js
const mockSave = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockDeleteOne = jest.fn();
const mockFind = jest.fn();

const ArticleDataStore = { lastConstructorArgs: null };

// On mock le modèle Mongoose
jest.mock("../api/articles/articles.model", () => {
  function Article(data) {
    ArticleDataStore.lastConstructorArgs = data;
    this.save = mockSave;
  }

  Article.findByIdAndUpdate = mockFindByIdAndUpdate;
  Article.deleteOne = mockDeleteOne;
  Article.find = mockFind;

  return Article;
});

const articleService = require("../api/articles/articles.service");

describe("ArticleService", () => {
  beforeEach(() => {
    mockSave.mockReset();
    mockFindByIdAndUpdate.mockReset();
    mockDeleteOne.mockReset();
    mockFind.mockReset();
    ArticleDataStore.lastConstructorArgs = null;
  });

  describe("create", () => {
    it("creer et sauvegarde un article", async () => {
      const data = { title: "Titre toto", content: "Contenu toto", status: "draft" };
      const userId = 42;
      const savedArticle = { _id: "513", ...data, userId };

      mockSave.mockResolvedValue(savedArticle);

      const result = await articleService.create(data, userId);

      expect(result).toEqual(savedArticle);
    });
  });

  describe("update", () => {
    it("met a jour l'article", async () => {
      const id = 561;
      const data = { title: "Titre modifié par toto" };
      const updatedArticle = { _id: id, ...data };

      mockFindByIdAndUpdate.mockResolvedValue(updatedArticle);

      const result = await articleService.update(id, data);


      expect(result).toBe(updatedArticle);
    });
  });

  describe("delete", () => {
    it("suprimme l'article", async () => {
      const id = "to-delete";
      const deleteResult = { deletedCount: 1 };

      mockDeleteOne.mockResolvedValue(deleteResult);

      const result = await articleService.delete(id);

      expect(result).toBe(deleteResult);
    });
  });

  describe("getByUser", () => {
    it("cherche par utilisateur", async () => {
      const userId = 199;
      const articles = [{ _id: "1" }, { _id: "2" }];

      const mockPopulate = jest.fn().mockResolvedValue(articles);
      mockFind.mockReturnValue({ populate: mockPopulate });

      const result = await articleService.getByUser(userId);

      expect(result).toBe(articles);
    });
  });
});
