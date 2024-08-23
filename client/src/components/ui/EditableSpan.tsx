import React, { ChangeEvent, useState } from 'react';
import MyInput from './MyInput';

type Props = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan: React.FC<Props> = React.memo(
  ({ title, changeTitle }) => {
    const [editMode, setEditMode] = useState(false);
    const [inputTitle, setInputTitle] = useState('');

    const activateEditMode = () => {
      setEditMode(true);
      setInputTitle(title);
    };

    const activateViewMode = () => {
      setEditMode(false);
      changeTitle(inputTitle);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.currentTarget.value);
    };

    return editMode ? (
      <MyInput
        value={inputTitle}
        onChange={onChangeTitleHandler}
        onBlur={activateViewMode}
        type='text'
        autoFocus
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{title}</span>
    );
  }
);
