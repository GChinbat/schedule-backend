import * as model from '@/models/lesson';
import { requireAdmin } from '@/util';

type LessonInput = {
  name: string;
  teachers: string[];
};
type EditLessonInput = Partial<LessonInput>;

export const addLesson = requireAdmin(
  (_, { lesson: { name, teachers } }: { lesson: LessonInput }) =>
    model.addLesson(name, teachers),
);

export const editLesson = requireAdmin(
  (
    _,
    { lessonSlug, lesson }: { lessonSlug: string; lesson: EditLessonInput },
  ) => model.editLesson(lessonSlug, lesson),
);

export const removeLesson = requireAdmin(
  (_, { lessonSlug }: { lessonSlug: string }) => model.removeLesson(lessonSlug),
);
