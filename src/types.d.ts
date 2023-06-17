
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
