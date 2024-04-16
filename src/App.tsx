import React from 'react';
import Cities from './components/Cities';

const App: React.FC = () => {
  return (
    <div className='w-full min-h-screen p-10 bg-slate-700 grid place-items-center'>
      <Cities />
    </div>
  );
};

export default App;
