import slugify from 'slugify';
import { ObjectID } from 'mongodb';

import { db } from './init';

export type Lesson = {
  _id?: ObjectID;
  slug: string;
  name: string;
  groups: ObjectID[];
  teachers: string[];
};

export async function findLesson(name: string) {
  const nameSlug = slugify(name);

  const lessonsCollection = db.collection<Lesson>('lessons');
  const [lessons1, lessons2] = await Promise.all([
    lessonsCollection.find({ $text: { $search: name } }).toArray(),
    lessonsCollection.find({ $text: { $search: nameSlug } }).toArray(),
  ]);

  return [...lessons1, ...lessons2];
}

export async function getLessons() {
  const lessonsCollection = db.collection<Lesson>('lessons');
  return lessonsCollection.find().toArray();
}

export async function addLesson(name: string, teachers: string[]) {
  const nameSlug = slugify(name);

  const lessonsCollection = db.collection<Lesson>('lessons');
  if ((await lessonsCollection.find({ slug: nameSlug }).count()) > 0) {
    throw Error(`Lesson with name ${name} already exists!`);
  }

  const lesson: Lesson = {
    name,
    slug: nameSlug,
    groups: [],
    teachers,
  };
  const result = await lessonsCollection.insertOne(lesson);
  lesson._id = result.insertedId;

  return lesson;
}

export async function editLesson(
  slug: string,
  lesson: { name?: string; teachers?: string[] },
) {
  const lessonsCollection = db.collection<Lesson>('lessons');
  if ((await lessonsCollection.find({ slug }).count()) > 0) {
    throw Error(`Lesson ${slug} was not found!`);
  }

  return (
    await lessonsCollection.findOneAndUpdate(
      { slug },
      { $set: lesson },
      { returnOriginal: false },
    )
  ).value;
}

export async function removeLesson(slug: string) {
  const lessonsCollection = db.collection<Lesson>('lessons');
  await lessonsCollection.deleteOne({ slug });
  return true;
}
