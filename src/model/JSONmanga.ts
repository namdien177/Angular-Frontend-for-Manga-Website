import { Manga } from "./manga";
import { LinkJson } from "./linkJson";
import { MetaJson } from "./metaJson";
import { Author } from "./author";

export class JsonData{

    data:Manga[];

    links:LinkJson;

    meta:MetaJson;
}

export class UnitManga{
    aManga: Manga;
    aAuthor: Author[];
    newestChap: number;
}