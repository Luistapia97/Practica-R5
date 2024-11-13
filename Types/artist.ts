export interface Artist {
    id: number;
    name: string;
    image: string;
}

export interface ArtistResource {
    id: number;
    name: string;
    mbid: string;
    image: [
        imageUrl //maybe any
    ]
}

interface imageUrl {
    '#text': string;
}