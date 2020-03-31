import { MongoClient, Db } from 'mongodb';

// eslint-disable-next-line
export let db: Db;

export default async () => {
  const auth =
    process.env.DB_USER && process.env.DB_PASSWORD
      ? { user: process.env.DB_USER, password: process.env.DB_PASSWORD }
      : undefined;

  const client = await MongoClient.connect(process.env.DB_ADDRESS, {
    auth,
    useUnifiedTopology: true,
  });
  db = client.db(process.env.DB_NAME);

  await db.collection('lessons').createIndex({ name: 'text', slug: 'text' });
};
