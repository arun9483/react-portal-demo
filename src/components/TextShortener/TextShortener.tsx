import React, { useCallback, useState } from 'react';
import Model from '../Model/Model';

import './TextShortener.css';

interface IItem {
  key: string;
  title: string;
}
const MAX_CHARACTERS = 6;
const TextDetail: React.FC<IItem> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="text-detail-container">
      <div onClick={() => setIsOpen(true)}>
        {title.length <= MAX_CHARACTERS
          ? title
          : `${title.slice(0, MAX_CHARACTERS)}...`}
      </div>
      <Model isOpen={isOpen} closeHandler={closeHandler}>
        {title}
      </Model>
    </div>
  );
};

const TextShortener: React.FC<{}> = () => {
  const [list, updateList] = useState<IItem[]>([]);

  const [value, setValue] = useState('');

  // onChange handler
  const inputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  // onSubmit handler
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      updateList([
        { key: `title-${Math.random()}`, title: value.trim() },
        ...list,
      ]);
      setValue('');
    }
  };

  return (
    <div className="text-shortener-container">
      <header>
        <form onSubmit={submitHandler}>
          <input
            name="str"
            onChange={inputHandler}
            value={value}
            placeholder="Enter text"
          />
        </form>
      </header>
      <ul>
        {list.map((item) => (
          <li key={item.key}>
            <TextDetail title={item.title} key={item.key} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextShortener;
