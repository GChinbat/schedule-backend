import auth from './auth';

import Lesson from './fields/lesson';
import LessonGroup from './fields/lessonGroup';
import ScheduleItem from './fields/scheduleItem';

import * as lessonQueries from './queries/lessons';
import * as lessonMutations from './mutations/lessons';

import * as lessonGroupMutations from './mutations/lessonGroup';

import * as scheduleQueries from './queries/schedule';
import * as scheduleItemMutations from './mutations/scheduleItem';

export default {
  Lesson,
  LessonGroup,
  ScheduleItem,
  Query: { ...lessonQueries, ...scheduleQueries, login: auth.login },
  Mutation: {
    ...lessonMutations,
    ...lessonGroupMutations,
    ...scheduleItemMutations,
    register: auth.register,
  },
};
