import { Lesson } from '@/models/lesson';
import * as lessonGroupModel from '@/models/lessonGroup';

export default {
  groups: async (lesson: Lesson) => {
    return Promise.all(
      lesson.groups.map((groupID) => lessonGroupModel.getGroup(groupID)),
    );
  },
};
