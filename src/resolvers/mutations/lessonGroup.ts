import * as model from '@/models/lessonGroup';
import { requireAdmin } from '@/util';

export const addLessonGroup = requireAdmin(
  (_, { group }: { group: model.LessonGroupInput }) =>
    model.addLessonGroup(group),
);

export const renameLessonGroup = requireAdmin(
  (_, { groupSlug, newName }: { groupSlug: string; newName: string }) =>
    model.renameLessonGroup(groupSlug, newName),
);

export const removeLessonGroup = requireAdmin(
  (_, { groupSlug }: { groupSlug: string }) =>
    model.removeLessonGroup(groupSlug),
);
