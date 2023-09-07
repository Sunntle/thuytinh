import React from 'react';

// eslint-disable-next-line react/prop-types
const Backdrop = ({onClick}) => {
    return <div className="fixed inset-0 bg-black opacity-50 z-50" onClick={onClick}></div>;
};

export default Backdrop;