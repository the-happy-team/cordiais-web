export type EmotionType = {
    happiness: number,
    neutral: number,
    surprise: number,
    sadness: number,
    disgust: number,
    anger: number,
    fear: number
};

export type CordialType = {
    title: string;
    year: string;
    medium: string;
    artist: string;
    dimension: { width: number, height: number, unit: string };
    collection: string;
    emotions: EmotionType;
    slug: string;
    face_rectangle: {
        height: number;
        left: number;
        top: number;
        width: number;
    }
};

export const EmotionOrder: Array<string> = [
    'happiness',
    'neutral',
    'surprise',
    'sadness',
    'disgust',
    'anger',
    'fear'
];
