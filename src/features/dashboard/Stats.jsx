import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkIns = confirmedStays?.length;

  // 4.
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked night / all available night (numDays * cabinCount)
  return (
    <>
      <Stat
        title="Booking"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Checked ins"
        color="indigo"
        value={checkIns}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        value={Math.round(occupation * 100) + '%'}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
