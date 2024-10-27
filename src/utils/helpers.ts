import { parseISO, isBefore, isAfter, isEqual } from 'date-fns';

export const hasIntersection = (
  startDate1,
  endDate1,
  startDate2,
  endDate2,
  shouldIncludeBoundaries = false,
) => {
  const start1 = parseISO(startDate1);
  const end1 = parseISO(endDate1);
  const start2 = parseISO(startDate2);
  const end2 = parseISO(endDate2);

  if (shouldIncludeBoundaries) {
    const beforeOrEqual = isBefore(start1, end2) || isEqual(start1, end2);
    const afterOrEqual = isAfter(end1, start2) || isEqual(end1, start2);

    return beforeOrEqual && afterOrEqual;
  }

  return isBefore(start1, end2) && isAfter(end1, start2);
};
