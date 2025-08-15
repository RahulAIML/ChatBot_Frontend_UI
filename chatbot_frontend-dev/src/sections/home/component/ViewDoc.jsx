import React from 'react';

const ViewDoc = ({ link }) => {
  return (
    <div>
      <iframe src={link} width={'100%'} height={'700px'} allowFullScreen autoFocus></iframe>
    </div>
  );
};

export default ViewDoc;
