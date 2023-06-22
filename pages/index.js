import Table from '../components/Table';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Form from '../components/Form';

const initialState = {
  name: '',
  points: null,
  category: 'singlePoints'
};

export default function Home() {
  const [tData, setTData] = useState([]);
  const [tHeader, setTHeader] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState(initialState);
  const [currentId, setCurrentId] = useState(null);

  const renderTableData = () => {
    api.get(`/entries?category=${values.category}`).then(({ data }) => {
      setTData(data.entries);
      let tempHeaders = Object.keys(data.entries[0]);

      var index = tempHeaders.indexOf('__v');
      if (index !== -1) {
        tempHeaders.splice(index, 1);
      }

      let headers = [];
      if(values.category === 'singlePoints'){
        headers = [
          {
            Header: '#',
            accessor: (row, i) => i + 1,
          },
          {
            Header: 'Name',
            accessor: tempHeaders[1],
          },
          {
            Header: 'Points',
            accessor: tempHeaders[2],
          },
          {
            Header: 'Action',
          },
        ];
      } else {
        headers = [
          {
            Header: '#',
            accessor: (row, i) => i + 1,
          },
          {
            Header: 'Name',
            accessor: tempHeaders[0],
          },
          {
            Header: 'Total Points',
            accessor: tempHeaders[1],
          },
          {
            Header: 'Action',
          },
        ];
      }

      setTHeader(headers);
    });
  };

  const createEntries = async (entry) => {
    try {
      await api.post('/entries', entry);
      window.alert('Entry created!');
      setShowForm(false);
      setValues({ ...values, name: '', points: null });
      renderTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const populateEntries = async (id) => {
    setCurrentId(id);
    setShowForm(true);
    try {
      const { data } = await api.get(`/entries/${id}`);
      setValues({
        ...values,
        name: data.entry.name,
        points: data.entry.points,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editEntries = async (id) => {
    try {
      const { name, points } = values;
      await api.patch(`/entries/${id}`, { name, points });
      window.alert(`Entry with Id: ${id} edited!`);
      setShowForm(false);
      setValues({ ...values, name: '', points: null });
      setCurrentId(null);
      renderTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntries = async (id) => {
    try {
      await api.delete(`/entries/${id}`);
      window.alert(`Entry with Id: ${id} deleted!`);
      renderTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, points } = values;
    if (!name || !points) {
      window.alert('Please provide all values!!!');
      return;
    }

    const entry = { name, points };
    //check if the entry id is present
    if (currentId) {
      editEntries(currentId)
    } else {
      createEntries(entry);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formToggleHandler = () => {
    setShowForm(!showForm);
    setValues({ ...values, name: '', points: null });
    setCurrentId(null);
  };

  const toggleTableData = (category) => {
    setValues({ ...values, category: category })
  }

  useEffect(() => {
    renderTableData();
  }, [values]);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
      <main className='mx-auto max-w-screen-md px-4 sm:px-14 lg:px-12'>
        <h1 className='text-xl font-semibold'>Leaderboard</h1>
        <div className='mt-4'>
          {showForm && (
            <Form
              formSubmit={onSubmit}
              handleChange={handleChange}
              name={values.name}
              points={values.points}
            />
          )}
          <Table
            tData={tData}
            tHeader={tHeader}
            toggleForm={formToggleHandler}
            populateEntries={populateEntries}
            deleteEntries={deleteEntries}
            showForm={showForm}
            category={values.category}
            toggleTableData={toggleTableData}
          />
        </div>
      </main>
    </div>
  );
}
