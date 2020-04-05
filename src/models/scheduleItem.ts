import { ObjectID } from 'mongodb';

import { db } from './init';
import { LessonGroup } from './lessonGroup';

export type Time = {
  hours: number;
  minutes: number;
};

export type ScheduleItem = {
  _id?: ObjectID;
  day: number;
  endTime: Time;
  startTime: Time;
  lessonGroup: ObjectID;
};

export type ScheduleItemInput = {
  day: number;
  endTime: Time;
  startTime: Time;
  groupSlug: string;
};
export type EditScheduleItemInput = Partial<
  Omit<ScheduleItemInput, 'groupSlug'>
>;

export async function getSchedule() {
  const scheduleCollection = db.collection<ScheduleItem>('schedule');
  const scheduleItems = await scheduleCollection
    .aggregate([
      {
        $sort: {
          'startTime.hours': 1,
          'startTime.minutes': 1,
          'endTime.hours': 1,
          'endTime.minutes': 1,
        },
      },
    ])
    .toArray();

  const results: ScheduleItem[][] = [[], [], [], [], []];
  scheduleItems.forEach((item) => results[item.day - 1].push(item));

  return results;
}
export async function getScheduleForGroup(groupSlug: string) {
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  const group = await groupsCollection.findOne({ slug: groupSlug });
  if (!group) {
    throw Error(`Lesson group ${groupSlug} was not found`);
  }

  const scheduleCollection = db.collection<ScheduleItem>('schedule');
  const scheduleItems = await scheduleCollection
    .find({ lessonGroup: group._id })
    .sort({
      'startTime.hours': 1,
      'startTime.minutes': 1,
      'endTime.hours': 1,
      'endTime.minutes': 1,
    })
    .toArray();

  const results: ScheduleItem[][] = [[], [], [], [], []];
  scheduleItems.forEach((item) => results[item.day - 1].push(item));

  return results;
}

export async function getScheduleItem(
  id: ObjectID,
): Promise<ScheduleItem | null> {
  const scheduleCollection = db.collection<ScheduleItem>('schedule');
  return (await scheduleCollection.findOne({ _id: id })) ?? null;
}

export async function addScheduleItem({
  day,
  endTime,
  startTime,
  groupSlug,
}: ScheduleItemInput) {
  const groupsCollection = db.collection<LessonGroup>('lessonGroups');
  const group = await groupsCollection.findOne({ slug: groupSlug });
  if (!group) {
    throw Error(`Lesson group ${groupSlug} was not found!`);
  }

  const scheduleItem: ScheduleItem = {
    day,
    endTime,
    startTime,
    lessonGroup: group._id,
  };
  const scheduleCollection = db.collection<ScheduleItem>('schedule');
  scheduleItem._id = (
    await scheduleCollection.insertOne(scheduleItem)
  ).insertedId;

  return scheduleItem;
}

export async function editScheduleItem(
  id: string,
  item: EditScheduleItemInput,
) {
  const scheduleCollection = db.collection<ScheduleItem>('schedule');

  const _id = ObjectID.createFromHexString(id);
  if ((await scheduleCollection.find({ _id }).count()) === 0) {
    throw Error(`Schedule item with ID ${id} was not found!`);
  }

  return (
    await scheduleCollection.findOneAndUpdate(
      { _id },
      { $set: item },
      { returnOriginal: false },
    )
  ).value;
}

export async function removeScheduleItem(id: string) {
  const scheduleCollection = db.collection<ScheduleItem>('schedule');
  await scheduleCollection.deleteOne({ _id: ObjectID.createFromHexString(id) });
  return true;
}
