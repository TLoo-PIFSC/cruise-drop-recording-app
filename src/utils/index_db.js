import Dexie from 'dexie';

export const db = new Dexie('DropEventsDB');
db.version(db.verno + 1).stores({
  dropEvents: '++id, &cruiseNumber', // Primary key and indexed props
});
