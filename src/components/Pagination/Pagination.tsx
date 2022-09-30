import s from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  prevPage: () => void;
  setPage: (page: number) => void;
  nextPage: () => void;
}

export const Pagination = ({
  page,
  totalPages,
  prevPage,
  setPage,
  nextPage,
}: PaginationProps) => {
  const paginationButtons = [...Array(totalPages)].map((el, i) => i + 1);

  return (
    <div className={s.pagination}>
      <p className={s.total}>
        {page}/{totalPages}
      </p>
      <div className={s.buttons}>
        <button onClick={prevPage} className="page">
          &larr;
        </button>
        {paginationButtons.map((el) => (
          <button
            onClick={() => setPage(el)}
            key={el}
            className={page === el ? s.active : ''}
          >
            {el}
          </button>
        ))}
        <button onClick={nextPage} className="page">
          &rarr;
        </button>
      </div>
    </div>
  );
};
