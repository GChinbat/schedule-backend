import Lesson from './fields/lesson';
import LessonGroup from './fields/lessonGroup';
import ScheduleItem from './fields/scheduleItem';

import * as lessonQueries from './queries/lessons';
import * as lessonMutations from './mutations/lessons';

import * as lessonGroupMutations from './mutations/lessonGroup';

export default {
  Lesson,
  LessonGroup,
  ScheduleItem,
  Query: { ...lessonQueries },
  Mutation: { ...lessonMutations, ...lessonGroupMutations },
};
