export default class BookDetails {
    constructor(title, author, genre, published, cover, description, uuid) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.published = published;
        this.cover = cover;
        this.description = description;
        this.uuid = uuid;
    }

    static fromJSON(json) {
        return new BookDetails(
            json.title,
            json.author,
            json.genre,
            json.published,
            json.cover,
            json.description,
            json.uuid
        );
    }
}