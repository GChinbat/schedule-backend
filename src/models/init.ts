import { MongoClient, Db } from 'mongodb';

// eslint-disable-next-line
export let db: Db;

export default async () => {
  const client = await MongoClient.connect(process.env.DB_ADDRESS, {
    useUnifiedTopology: true,
  });
  db = client.db(process.env.DB_NAME);

  await db.collection('lessons').createIndex({ name: 'text', slug: 'text' });
};
