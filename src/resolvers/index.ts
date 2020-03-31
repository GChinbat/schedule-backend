import * as lessonQueries from './queries/lessons';
import * as lessonMutations from './mutations/lessons';

import * as lessonGroupMutations from './mutations/lessonGroup';

export default {
  Query: { ...lessonQueries },
  Mutation: { ...lessonMutations, ...lessonGroupMutations },
};
