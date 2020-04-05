import * as model from '@/models/scheduleItem';

export function scheduleForGroup(_, { groupSlug }: { groupSlug: string }) {
  return model.getScheduleForGroup(groupSlug);
}

export { getSchedule as schedule } from '@/models/scheduleItem';
