import { writable } from 'svelte/store';
import { Languages } from "./types/cordiais.types";

export const language = writable(Languages.PT);
