import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import s from './editable-span.module.css'


type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  isDone?: boolean
}

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
    : <span onDoubleClick={activateEditMode} className={props.isDone ? s.decoration : ''}>{props.value}</span>
}
