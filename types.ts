export type Phase = 'COVENANT' | 'NAVIGATING' | 'RESONATING';

export interface Coordinates {
  x: number; // -1 (Abstinent) to 1 (Feverish)
  y: number; // -1 (Possession) to 1 (Redemption)
}

export interface UserInput {
  userName: string;
  targetName: string;
}

export interface CorpusItem {
  id: string;
  text: string;
  tags: ('cold' | 'hot' | 'light' | 'dark')[];
}

export interface ResonanceResult {
  composition: {
    element: string;
    percentage: number;
    type: 'sensation' | 'atmosphere' | 'trace';
  }[];
  tastingNote: string;
}
