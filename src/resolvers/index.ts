import Lesson from './fields/lesson';
import LessonGroup from './fields/lessonGroup';

import * as lessonQueries from './queries/lessons';
import * as lessonMutations from './mutations/lessons';

import * as lessonGroupMutations from './mutations/lessonGroup';

export default {
  Lesson,
  LessonGroup,
  Query: { ...lessonQueries },
  Mutation: { ...lessonMutations, ...lessonGroupMutations },
};
