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
  NoFilter = 0,
  ByWoman = "byWoman",
  ByMan = "byMan",
  ByNudes = "nudes",
}

export enum OrderType {
  Date = "year",
  Happiness = "happiness",
  Neutral = "neutral",
  Surprise = "surprise",
  Sadness = "sadness",
  Disgust = "disgust",
  Anger = "anger",
  Fear = "fear",
}

export const EmotionOrder: Array<string> = [
  "happiness",
  "neutral",
  "surprise",
  "sadness",
  "disgust",
  "anger",
  "fear",
];
