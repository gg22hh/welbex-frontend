import { DataType } from '../../models';

type SortT = {
  name: boolean;
  amount: boolean;
  distance: boolean;
};

type HandleSetSortT = {
  column: string;
  sort: SortT;
  setSort: (obj: SortT) => void;
};

type HandleSortT = {
  e: React.MouseEvent;
  sort: SortT;
  filtredData: DataType[];
  setFiltredData: (arr: DataType[]) => void;
  setSort: (obj: SortT) => void;
};

const handleSetSort = ({ column, sort, setSort }: HandleSetSortT) => {
  switch (column) {
    case 'Название':
      setSort({ ...sort, name: !sort.name });
      break;
    case 'Количество':
      setSort({ ...sort, amount: !sort.amount });
      break;
    case 'Расстояние':
      setSort({ ...sort, distance: !sort.distance });
      break;
  }
};

export const handleSort = ({
  e,
  sort,
  filtredData,
  setFiltredData,
  setSort,
}: HandleSortT) => {
  switch ((e.target as HTMLElement).innerText) {
    case 'Расстояние':
      if (sort.distance) {
        const data = filtredData.sort((a, b) => +b.distance - +a.distance);
        setFiltredData(data);
      } else {
        const data = filtredData.sort((a, b) => +a.distance - +b.distance);
        setFiltredData(data);
      }
      handleSetSort({ column: 'Расстояние', sort, setSort });
      break;
    case 'Количество':
      if (sort.amount) {
        const data = filtredData.sort((a, b) => +b.amount - +a.amount);
        setFiltredData(data);
      } else {
        const data = filtredData.sort((a, b) => +a.amount - +b.amount);
        setFiltredData(data);
      }
      handleSetSort({ column: 'Количество', sort, setSort });
      break;
    case 'Название':
      if (sort.name) {
        const data = filtredData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setFiltredData(data);
      } else {
        const data = filtredData.sort().reverse();
        setFiltredData(data);
      }
      handleSetSort({ column: 'Название', sort, setSort });
      break;
  }
};
