import Dexie, { type EntityTable } from 'dexie';
import type { ExerciseResult, SessionSummary } from './types';

const db = new Dexie('wiskunde-db') as Dexie & {
  exerciseResults: EntityTable<ExerciseResult, 'id'>;
  sessionSummaries: EntityTable<SessionSummary, 'id'>;
};

db.version(1).stores({
  exerciseResults: '++id, sessionId, level, topic, userName, timestamp',
  sessionSummaries: '++id, sessionId, level, topic, userName, date, timestamp',
});

export { db };
