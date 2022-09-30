import React from 'react';
import s from './Filter.module.css';

type FilterProps = {
  column: string;
  value: string;
  handleColumnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleConditionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (e: React.FormEvent) => void;
  handleReset: () => void;
};

export const Filter = ({
  column,
  value,
  handleColumnChange,
  handleConditionChange,
  handleValueChange,
  handleFilter,
  handleReset,
}: FilterProps) => {
  return (
    <form onSubmit={handleFilter} className={s.form}>
      <div className={s.selectors}>
        <select onChange={handleColumnChange}>
          <option hidden>Выберите колонку</option>
          <option>Название</option>
          <option>Количество</option>
          <option>Расстояние</option>
        </select>
        <select onChange={handleConditionChange}>
          <option hidden>Выберите условие</option>
          <option>Равно</option>
          <option disabled={column === 'Количество' || column === 'Расстояние'}>
            Содержит
          </option>
          <option disabled={column === 'Название'}>Больше</option>
          <option disabled={column === 'Название'}>Меньше</option>
        </select>
      </div>
      <div className={s.box}>
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={handleValueChange}
        />
        <button className={s.button} type="submit">
          Фильтр
        </button>
        <button onClick={handleReset} className={s.button}>
          &#8634;
        </button>
      </div>
    </form>
  );
};
