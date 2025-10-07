export const DeriveStatus = ({
  status,
  startDate,
  endDate,
}: {
  status:string;
  startDate:string;
  endDate:string;
}) => {
  const startDateN = new Date(startDate).getTime();
  const endDateN = new Date(endDate).getTime();

  const now = Date.now();

  if (startDateN > now) {
    return 'Upcoming';
  } else if (endDateN < now) {
    return 'Completed';
  }

  if (status === 'Active') return 'Available';
  return 'Completed';
};
