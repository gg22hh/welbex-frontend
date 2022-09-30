import React from 'react';
import { DataType } from '../../models';
import s from './Table.module.css';

interface TableProps {
  data: DataType[];
  handleTableSort: (e: React.MouseEvent) => void;
  lastContentIndex: number;
  firstContentIndex: number;
}

export const Table = ({
  data,
  handleTableSort,
  lastContentIndex,
  firstContentIndex,
}: TableProps) => {
  const simpleRow = data
    ?.slice(firstContentIndex, lastContentIndex)
    .map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.data}</td>
          <td>{item.name}</td>
          <td>{item.amount}</td>
          <td>{item.distance}</td>
        </tr>
      );
    });

  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th onClick={handleTableSort}>
              <span className={s.sortButton}>Название</span>
            </th>
            <th onClick={handleTableSort}>
              <span className={s.sortButton}> Количество </span>
            </th>
            <th onClick={handleTableSort}>
              <span className={s.sortButton}> Расстояние </span>
            </th>
          </tr>
        </thead>
        <tbody>{simpleRow}</tbody>
      </table>
    </>
  );
};
