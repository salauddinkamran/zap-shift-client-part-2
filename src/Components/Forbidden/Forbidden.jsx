import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-screen flex-col'>
        <h2 className='text-5xl font-bold text-center text-red-500 mb-5'>This is forbidden page</h2>
        <div>
          <Link className='btn btn-primary text-secondary' to="/">Go to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;