export type Topic = {
  id: string;
  label: string;
  description: string;
};

export type Level = {
  id: string;
  number: string;
  suffix: string;
  topics: Topic[];
};

export const levels: Level[] = [
  {
    id: '1m',
    number: '1',
    suffix: 'ste middelbaar',
    topics: [
      {
        id: 'machten',
        label: 'Machten',
        description: 'Bereken de macht van een getal',
      },
      {
        id: 'vierkantswortels',
        label: 'Vierkantswortels',
        description: 'Bereken de vierkantswortel',
      },
    ],
  },
  {
    id: '3m',
    number: '3',
    suffix: 'de middelbaar',
    topics: [
      {
        id: 'vergelijkingen',
        label: 'Vergelijkingen',
        description: 'Los vergelijkingen op naar x',
      },
      {
        id: 'ongelijkheden',
        label: 'Ongelijkheden',
        description: 'Bepaal de grenswaarde bij ongelijkheden',
      },
    ],
  },
];

export function findLevel(levelId: string): Level | undefined {
  return levels.find((l) => l.id === levelId);
}
