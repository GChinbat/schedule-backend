import * as model from '@/models/lesson';

export function findLesson(_, { name }: { name: string }) {
  return model.findLesson(name);
}

export { getLessons } from '@/models/lesson';
