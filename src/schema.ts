import { gql } from 'apollo-server';

export default gql`
  type Time {
    hours: Int!
    minutes: Int!
  }

  type ScheduleItem {
    id: String!
    day: Int!
    endTime: Time!
    startTime: Time!
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
    scheduleForGroup(groupSlug: String!): [[ScheduleItem!]!]!

    login(username: String!, password: String!): String
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

  input TimeInput {
    hours: Int!
    minutes: Int!
  }
  input ScheduleItemInput {
    day: Int!
    endTime: TimeInput!
    startTime: TimeInput!
    groupSlug: String!
  }
  input EditScheduleItemInput {
    day: Int
    endTime: TimeInput
    startTime: TimeInput
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

    register(username: String!, password: String!): Boolean
  }
`;
