
export interface Word {
    word_in_line_nr: number;
    qazaq_cyr: string;
    qazaq_lat: string;
    english: string;
    russian: string;
  }

export interface Lyrics {
    line_nr: number;
    qazaq_cyr: string;
    qazaq_lat: string;
    english: string;
    russian: string;
    original_lang: string;
    words: Word[];
  }

export interface Artist {
	lat: string,
	cyr: string
}

export interface Verse {
	lat?: string,
	cyr?: string,
	rus?: string,
	eng?: string
}

export interface Song {
  id: number;
  title_cyr: string;
  title_lat: string;
  cover_art?: string;
  release_date?: string;
  artists: {
    id: number;
    name_cyr: string;
    name_lat: string;
  }[];
  lyrics: Record<string, Record<string, any>>;
}
