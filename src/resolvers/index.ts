import * as lessonQueries from './queries/lessons';
import * as lessonMutations from './mutations/lessons';

export default {
  Query: { ...lessonQueries },
  Mutation: { ...lessonMutations },
};
