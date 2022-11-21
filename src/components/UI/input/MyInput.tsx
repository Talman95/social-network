import React, { useState } from 'react';

import cl from './MyInput.module.css';

type PropsType = {
  text: string;
};

export const MyInput = ({ text }: PropsType) => {
  const [value, setValue] = useState(text);

  return (
    <div className={cl.myInput}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
    </div>
  );
};
