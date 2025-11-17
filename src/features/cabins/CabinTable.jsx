import { useSearchParams } from 'react-router-dom';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import useCabins from './useCabins';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="Cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
