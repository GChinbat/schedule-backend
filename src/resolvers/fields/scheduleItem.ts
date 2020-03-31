import * as lessonGroupModel from '@/models/lessonGroup';
import { ScheduleItem } from '@/models/scheduleItem';

export default {
  lessonGroup: async (item: ScheduleItem) =>
    lessonGroupModel.getGroup(item.lessonGroup),
};
