import * as model from '@/models/lesson';

type LessonInput = {
  name: string;
  teachers: string[];
};
type EditLessonInput = Partial<LessonInput>;

export function addLesson(
  _,
  { lesson: { name, teachers } }: { lesson: LessonInput },
) {
  return model.addLesson(name, teachers);
}

export function editLesson(
  _,
  { lessonSlug, lesson }: { lessonSlug: string; lesson: EditLessonInput },
) {
  return model.editLesson(lessonSlug, lesson);
}

export function removeLesson(_, { lessonSlug }: { lessonSlug: string }) {
  return model.removeLesson(lessonSlug);
}
