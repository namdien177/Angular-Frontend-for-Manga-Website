export class Chap {
    id: number;
    idManga: number;
    chap: number;
    title:String;
    created_at: String;
    updated_at: String;
}

export class ChapFull{
    chap:Chap;
    viewCount:number
}
