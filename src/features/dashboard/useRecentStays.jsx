import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('stays')
    ? 7
    : Number(searchParams.get('stays'));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ['stays', `stays-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || 'checked-out'
  );
  return { stays, isLoading, confirmedStays };
}
