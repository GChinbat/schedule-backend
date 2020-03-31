import { LessonGroup } from '@/models/lessonGroup';
import * as lessonModel from '@/models/lesson';

export default {
  lesson: async (group: LessonGroup) => lessonModel.getLesson(group.lesson),
};
