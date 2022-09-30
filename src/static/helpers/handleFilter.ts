import { DataType } from '../../models';

type HandleFiltredDataT = {
  value: string;
  condition: string;
  option: string;
  data: DataType[];
  setFiltredData: (arr: DataType[]) => void;
};

type handleFilterT = {
  e: React.FormEvent;
  column: string;
  condition: string;
  value: string;
  data: DataType[];
  setFiltredData: (arr: DataType[]) => void;
  setValue: (str: string) => void;
  setCondition: (str: string) => void;
  setColumn: (str: string) => void;
};

const handleFilterData = ({
  value,
  condition,
  option,
  data,
  setFiltredData,
}: HandleFiltredDataT) => {
  const newData = data.filter((item) => {
    if (condition === 'Больше') {
      return +item[option] > +value;
    } else if (condition === 'Меньше') {
      return +item[option] < +value;
    }
    return +item[option] === +value;
  });
  setFiltredData(newData);
};

export const handleFilter = ({
  e,
  column,
  condition,
  data,
  setFiltredData,
  setValue,
  setCondition,
  setColumn,
  value,
}: handleFilterT) => {
  e.preventDefault();
  switch (column) {
    case 'Расстояние':
      switch (condition) {
        case 'Больше':
          handleFilterData({
            condition: 'Больше',
            option: 'distance',
            value,
            data,
            setFiltredData,
          });
          break;
        case 'Меньше':
          handleFilterData({
            condition: 'Меньше',
            option: 'distance',
            value,
            data,
            setFiltredData,
          });
          break;
        case 'Равно':
          handleFilterData({
            condition: 'Равно',
            option: 'distance',
            value,
            data,
            setFiltredData,
          });
          break;
      }
      break;
    case 'Количество':
      switch (condition) {
        case 'Больше':
          handleFilterData({
            condition: 'Больше',
            option: 'amount',
            value,
            data,
            setFiltredData,
          });
          break;
        case 'Меньше':
          handleFilterData({
            condition: 'Меньше',
            option: 'amount',
            value,
            data,
            setFiltredData,
          });
          break;
        case 'Равно':
          handleFilterData({
            condition: 'Равно',
            option: 'amount',
            value,
            data,
            setFiltredData,
          });
          break;
      }
      break;
    case 'Название':
      if (condition === 'Равно') {
        const newData = data.filter((item) => {
          return item.name.toLowerCase() === value.toLowerCase();
        });
        setFiltredData(newData);
      } else if (condition === 'Содержит') {
        const newData = data.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
        setFiltredData(newData);
      }
  }
  setValue('');
  setColumn('');
  setCondition('');
};
