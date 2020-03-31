import * as model from '@/models/lessonGroup';

export function addLessonGroup(
  _,
  { group }: { group: model.LessonGroupInput },
) {
  return model.addLessonGroup(group);
}

export function renameLessonGroup(
  _,
  { groupSlug, newName }: { groupSlug: string; newName: string },
) {
  return model.renameLessonGroup(groupSlug, newName);
}

export function removeLessonGroup(_, { groupSlug }: { groupSlug: string }) {
  return model.removeLessonGroup(groupSlug);
}
