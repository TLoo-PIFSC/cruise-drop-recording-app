export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DropEventsDB', 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('dropEvents')) {
        db.createObjectStore('dropEvents', { keyPath: 'id' });
        store.createIndex('idIndex', 'id', { unique: true });
        store.createIndex('cruiseNumberIndex', 'cruise_number', { unique: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function saveToDatabase(data) {
  try {
    const db = await openDatabase(); // Get the database instance
    const transaction = await db.transaction('dropEvents', 'readwrite'); // Start a read/write transaction
    const objectStore = await transaction.objectStore('dropEvents'); // Get the object store

    // Add or update the data (based on keyPath)
    const request = await objectStore.put(data); // `put` adds or updates an entry

    request.onsuccess = () => {
      console.log('Data saved successfully');
    };
    request.onerror = (event) => {
      console.error('Error saving data:', event);
    };
  } catch (error) {
    console.error('Error opening database:', error);
  }
}

export async function getList() {
  const db = await openDatabase();
  const tx = db.transaction('dropEvents', 'readonly');
  const store = tx.objectStore('dropEvents');

  const request = store.getAll();

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return result;
}
