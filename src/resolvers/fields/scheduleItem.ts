import * as lessonGroupModel from '@/models/lessonGroup';
import { ScheduleItem } from '@/models/scheduleItem';

export default {
  id: (item: ScheduleItem) => item._id.toHexString(),
  lessonGroup: async (item: ScheduleItem) =>
    lessonGroupModel.getGroup(item.lessonGroup),
};
