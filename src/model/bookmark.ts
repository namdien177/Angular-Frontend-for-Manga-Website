import { Manga } from "./manga";

export class Bookmark {
    id: number;
    idUser:number;
    idManga: number;
    read: number;
    created_at: String;
    updated_at: String;
}

export class displayBookmark{
    manga:Bookmark;
    latestChap:number;
    info:Manga;
}