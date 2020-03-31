import { findLesson as modelFindLesson } from '@/models/lesson';

export function findLesson(_, { name }: { name: string }) {
  return modelFindLesson(name);
}

export { getLessons } from '@/models/lesson';
