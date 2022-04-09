export type EmotionType = {
  happiness: number;
  neutral: number;
  surprise: number;
  sadness: number;
  disgust: number;
  anger: number;
  fear: number;
};

export type CordialType = {
  title: string;
  year: string;
  year_sort: number;
  medium: string;
  artist: string;
  dimension: { width: number; height: number; unit: string };
  collection: string;
  emotions: EmotionType;
  slug: string;
  nudes: boolean;
  marcantonio: boolean;
  artist_death: number;
  img: string;
  face_rectangle: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

export enum FilterType {
  NoFilter = "none",
  FemaleArtist = "by_woman",
  MaleArtist = "by_man",
  Nudes = "nudes",
}

export enum OrderType {
  Date = "year_sort",
  happiness = "happiness",
  neutral = "neutral",
  surprise = "surprise",
  sadness = "sadness",
  disgust = "disgust",
  anger = "anger",
  fear = "fear",
}

export const EmotionOrder: Array<string> = [
  "happiness",
  "surprise",
  "sadness",
  "disgust",
  "anger",
  "fear",
  "neutral",
];

export enum MenuItemType {
  None = 0,
  Project,
  OrderBy,
  FilterBy,
  Texts,
  About,
}

export enum Languages {
  EN = "en",
  PT = "pt",
}
