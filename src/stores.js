import { writable } from 'svelte/store';
import { Lang } from "./types/cordiais.types";

export const lang = writable(Lang.PT);
