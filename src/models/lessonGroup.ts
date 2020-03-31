import { ObjectID } from 'mongodb';

import { slugify } from '@/util';

import { db } from './init';
import { Lesson } from './lesson';

export type LessonGroup = {
  _id?: ObjectID;
  slug: string;
  lesson: ObjectID;
  groupName: string;
};

export type LessonGroupInput = {
  groupName: string;
  lessonSlug: string;
};

export async function getGroup(id: ObjectID): Promise<LessonGroup | null> {
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  return (await groupsCollection.findOne({ _id: id })) ?? null;
}

export async function addLessonGroup({
  groupName,
  lessonSlug,
}: LessonGroupInput) {
  const lessonsCollection = db.collection<Lesson>('lessons');
  const lesson = await lessonsCollection.findOne({ slug: lessonSlug });
  if (!lesson) {
    throw Error(`Lesson ${lessonSlug} was not found!`);
  }

  const groupSlug = `${lessonSlug}-${slugify(groupName)}`;
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  if ((await groupsCollection.find({ slug: groupSlug }).count()) > 0) {
    throw Error(`Lesson group with slug ${groupSlug} already exists!`);
  }

  const group: LessonGroup = {
    slug: groupSlug,
    lesson: lesson._id,
    groupName,
  };
  group._id = (await groupsCollection.insertOne(group)).insertedId;

  await lessonsCollection.updateOne(
    { slug: lessonSlug },
    { $push: { groups: group._id } },
  );
  return group;
}

export async function renameLessonGroup(groupSlug: string, newName: string) {
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  return (
    await groupsCollection.findOneAndUpdate(
      { slug: groupSlug },
      { $set: { groupName: newName } },
      { returnOriginal: false },
    )
  ).value;
}

export async function removeLessonGroup(groupSlug: string) {
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  await groupsCollection.deleteOne({ slug: groupSlug });
  return true;
}
