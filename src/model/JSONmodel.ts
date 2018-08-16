import { Author } from "./author";
import { Chap } from "./chap";
import { LinkJson } from "./linkJson";
import { MetaJson } from "./metaJson";
import { Manga } from "./manga";
import { ImageManga } from "./manga-img";
import { TagManga } from './tags';
import { User } from "./user";

export class UserJSON{
    data:User
}

export class AuthorJSON{
    data:Author[];
}

export class ChapJSON{
    data:Chap[];
    links:LinkJson;
    meta:MetaJson;
}

export class MangaJSON{

    data:Manga[];

    links:LinkJson;

    meta:MetaJson;
}

export class MangaAllJSON{
    aManga: Manga;
    aAuthor: Author[];
    newestChap: number;
}

export class MangaCoverJSON{
    Data:ImageManga[];
}

export class TagJSON {

    data: TagManga[];

}
