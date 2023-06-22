import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
// import MOCK_DATA from './MOCK_DATA.json';
import 'regenerator-runtime';
import SearchBar from './SearchBar';

const Table = ({ tData, tHeader, toggleForm, populateEntries, deleteEntries, showForm, category, toggleTableData }) => {
  const columns = tHeader
  const data = tData

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    setGlobalFilter,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
  } = tableInstance;

  return (
    <>
      <div className='bg-white relative shadow-md sm:rounded-lg overflow-hidden'>
        
        {/* search bar */}
        <SearchBar
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          toggleForm={toggleForm}
          showForm={showForm}
          category={category}
          toggleTableData={toggleTableData}
        />

        {/* table */}
        <table
          {...getTableProps()}
          className='w-full text-sm text-left text-gray-500'
        >
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup} {...headerGroup.getFooterGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                  key={column}
                    className='px-6 py-3'
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className='flex justify-center'>
                      {column.render('Header')} {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps}
            className='border-b divide-y divide-gray-200'
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    const id = cell.row.original._id
                    if (i === row.cells.length - 1) {
                      return (
                        <td key={cell} className='mx-2 px-4 py-3 justify-center flex gap-2'>
                          <div>
                            <button disabled={category === 'groupedPoints'} onClick={() => populateEntries(id)} className='bg-transparent hover:bg-blue-500 text-xs text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded disabled:opacity-50 disabled:cursor-not-allowed'>
                              Edit
                            </button>
                          </div>
                          <div>
                            <button disabled={category === 'groupedPoints'} onClick={() => deleteEntries(id)} className='bg-transparent hover:bg-red-500 text-xs text-red-700 font-semibold hover:text-white py-1 px-1 border border-red-500 hover:border-transparent rounded disabled:opacity-50 disabled:cursor-not-allowed'>
                              Delete
                            </button>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className='px-6 py-3 whitespace-nowrap '
                        >
                          <div className='flex justify-center'>
                            {cell.render('Cell')}
                          </div>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* pagination */}
        <nav
          className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4'
          aria-label='Table navigation'
        >
          <span className='text-sm font-normal text-gray-500'>
            Page
            <span className='font-semibold text-gray-900'>
              {' '}
              {state.pageIndex + 1}{' '}
            </span>
            of
            <span className='font-semibold text-gray-900'>
              {' '}
              {pageOptions.length}{' '}
            </span>
          </span>
          <ul className='inline-flex items-stretch -space-x-px cursor-pointer'>
            <li>
              <div
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </li>
            <li>
              <div
                className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                onClick={() => gotoPage(0)}
              >
                1
              </div>
            </li>
            <li>
              <div
                className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                onClick={() => gotoPage(1)}
              >
                2
              </div>
            </li>
            <li>
              <div
                className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                onClick={() => gotoPage(2)}
              >
                3
              </div>
            </li>
            <li>
              <div className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                ...
              </div>
            </li>
            <li>
              <div
                className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                onClick={() => gotoPage(pageOptions.length - 1)}
              >
                {pageOptions.length}
              </div>
            </li>
            <li>
              <div
                className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Table;
