import { gql } from 'apollo-server';

export default gql`
  type ScheduleItem {
    id: String!
    endTime: Int!
    startTime: Int!
    lessonGroup: LessonGroup!
  }

  type LessonGroup {
    slug: String!
    lesson: Lesson!
    groupName: String!
  }

  type Lesson {
    slug: String!
    name: String!
    groups: [LessonGroup!]
    teachers: [String!]!
  }

  type Query {
    getLessons: [Lesson!]!
    findLesson(name: String!): [Lesson!]!

    # schedule is array with length 5, with schedule items
    schedule: [[ScheduleItem!]!]!
  }

  input LessonInput {
    name: String!
    teachers: [String!]!
  }
  input EditLessonInput {
    name: String
    teacher: String
  }

  input LessonGroupInput {
    groupName: String!
    lessonSlug: String!
  }

  input ScheduleItemInput {
    endTime: Int!
    startTime: Int!
    groupSlug: String!
    lessonSlug: String!
  }
  input EditScheduleItemInput {
    endTime: Int
    startTime: Int
    groupSlug: String
    lessonSlug: String
  }

  type Mutation {
    addLesson(lesson: LessonInput!): Lesson
    editLesson(lessonSlug: String!, lesson: EditLessonInput!): Lesson
    removeLesson(lessonSlug: String!): Boolean

    addLessonGroup(group: LessonGroupInput!): LessonGroup
    renameLessonGroup(
      lessonSlug: String!
      groupSlug: String!
      newName: String!
    ): LessonGroup
    removeLessonGroup(lessonSlug: String!, groupSlug: String!): Boolean

    addScheduleItem(item: ScheduleItemInput!): ScheduleItem
    editScheduleItem(id: String!, item: EditScheduleItemInput!): ScheduleItem
    removeScheduleItem(id: String!): Boolean
  }
`;
