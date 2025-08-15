import React from 'react';

const ViewInDoc = ({ link }) => {
  return (
    <div>
      <iframe src={link} width={'100%'} height={'500px'} allowFullScreen autoFocus></iframe>
    </div>
  );
};

export default ViewInDoc;
