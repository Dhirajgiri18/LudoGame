import type { PlayerColor } from './types';

export interface Character {
  name: string;
  image: string;
}

export const CHARACTER_DATA: Record<PlayerColor, Character> = {
  red: {
    name: 'Chhota Bheem',
    image: '/chhota_bheem.png',
  },
  green: {
    name: 'Doraemon',
    image: '/doraemon.png',
  },
  blue: {
    name: 'Pikachu',
    image: '/Pikachu.png',
  },
  yellow: {
    name: 'Shinchan',
    image: '/Shinchan.png',
  },
};

export const CHARACTER_HINTS: Record<PlayerColor, string> = {
    red: "Chhota Bheem",
    green: "Doraemon",
    blue: "Pikachu pokemon",
    yellow: "Shinchan"
}
