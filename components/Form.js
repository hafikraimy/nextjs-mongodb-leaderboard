const Form = ({ formSubmit, handleChange, name, points }) => {
  return (
    <form className='mb-6' onSubmit={formSubmit}>
      <div className='mb-6'>
        <label
          htmlFor='name'
          className='block mb-1 text-sm font-medium text-gray-900'
        >
          Name
        </label>
        <input
          type='text'
          name='name'
          value={name}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2'
          placeholder='Name'
          required
          onChange={handleChange}
        />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='points'
          className='block mb-1 text-sm font-medium text-gray-900'
        >
          Points
        </label>
        <input
          type='number'
          pattern="[0-9]*"
          name='points'
          value={points}
          placeholder='Points'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2'
          required
          onChange={handleChange}
        />
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        onClick={formSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default Form