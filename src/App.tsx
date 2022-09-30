import React, { useEffect, useState } from 'react';
import './App.css';
import { Filter } from './components/Filter/Filter';
import { Pagination } from './components/Pagination/Pagination';
import { Table } from './components/Table/Table';
import { DataType } from './models';
import { handleFilter } from './static/helpers/handleFilter';
import { handleSort } from './static/helpers/handleSort';
import usePagination from './static/hooks/usePagination';

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtredData, setFiltredData] = useState<DataType[]>(data);
  const [column, setColumn] = useState('');
  const [condition, setCondition] = useState('');
  const [value, setValue] = useState('');
  const [sort, setSort] = useState({
    name: true,
    amount: true,
    distance: true,
  });

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(
          'https://welbex-back.herokuapp.com/records'
        );
        const json = await response.json();
        setData(json);
        setFiltredData(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    page,
    prevPage,
    setPage,
    totalPages,
  } = usePagination(5, filtredData.length);

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColumn(e.target.value);
  };
  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setFiltredData(data);
  };

  const handleTableSort = (e: React.MouseEvent) => {
    handleSort({ e, sort, filtredData, setFiltredData, setSort });
  };

  const handleTableFilter = (e: React.FormEvent) => {
    handleFilter({
      e,
      column,
      condition,
      data,
      setFiltredData,
      setValue,
      setCondition,
      setColumn,
      value,
    });
  };

  return (
    <div>
      <Filter
        value={value}
        column={column}
        handleValueChange={handleValueChange}
        handleConditionChange={handleConditionChange}
        handleColumnChange={handleColumnChange}
        handleFilter={handleTableFilter}
        handleReset={handleReset}
      />
      <div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <Table
            data={filtredData}
            handleTableSort={handleTableSort}
            firstContentIndex={firstContentIndex}
            lastContentIndex={lastContentIndex}
          />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
