import { gql } from 'apollo-server';

export default gql`
  type ScheduleItem {
    id: String!
    day: Int!
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
    day: Int!
    endTime: Int!
    startTime: Int!
    groupSlug: String!
  }
  input EditScheduleItemInput {
    day: Int
    endTime: Int
    startTime: Int
  }

  type Mutation {
    addLesson(lesson: LessonInput!): Lesson
    editLesson(lessonSlug: String!, lesson: EditLessonInput!): Lesson
    removeLesson(lessonSlug: String!): Boolean

    addLessonGroup(group: LessonGroupInput!): LessonGroup
    renameLessonGroup(groupSlug: String!, newName: String!): LessonGroup
    removeLessonGroup(groupSlug: String!): Boolean

    addScheduleItem(item: ScheduleItemInput!): ScheduleItem
    editScheduleItem(id: String!, item: EditScheduleItemInput!): ScheduleItem
    removeScheduleItem(id: String!): Boolean
  }
`;
