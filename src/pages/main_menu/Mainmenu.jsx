import React from 'react';
<link href="/dist/output.css" rel="stylesheet"></link>;

export const Mainmenu = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div
        style={{
          width: '30px',
          border: '1px solid black',
          position: 'absolute',
          left: '0px',
          height: '100vh',
        }}
      >
        Mainmenu
      </div>
    </>
  );
};

export default Mainmenu;
