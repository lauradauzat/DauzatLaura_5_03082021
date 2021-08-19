/** Affichage d'un teddie */

class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle); 
    }
}

class ArticleManager {
    constructor(listArticle) {
        this.listArticle = listArticle; 
    }
}