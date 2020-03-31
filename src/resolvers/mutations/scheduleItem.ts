import * as model from '@/models/scheduleItem';
import { requireAdmin } from '@/util';

export const addScheduleItem = requireAdmin(
  (_, { item }: { item: model.ScheduleItemInput }) =>
    model.addScheduleItem(item),
);

export const editScheduleItem = requireAdmin(
  (_, { id, item }: { id: string; item: model.EditScheduleItemInput }) =>
    model.editScheduleItem(id, item),
);

export const removeScheduleItem = requireAdmin((_, { id }: { id: string }) =>
  model.removeScheduleItem(id),
);
