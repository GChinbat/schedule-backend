import * as model from '@/models/scheduleItem';

export function addScheduleItem(
  _,
  { item }: { item: model.ScheduleItemInput },
) {
  return model.addScheduleItem(item);
}

export function editScheduleItem(
  _,
  { id, item }: { id: string; item: model.EditScheduleItemInput },
) {
  return model.editScheduleItem(id, item);
}

export function removeScheduleItem(_, { id }: { id: string }) {
  return model.removeScheduleItem(id);
}
