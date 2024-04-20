import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editable-span/editable-span";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import s from './task.module.css'

type TaskProps = {
  id: string
  isDone: boolean
  onTitleChangeHandler: (newValue: string) => void
  onClickHandler: () => void
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  title: string
}

export const Task = ({onClickHandler, onChangeHandler, onTitleChangeHandler, isDone, id, title}: TaskProps) => {

  return (
    <div key={id} className={s.wrapper}>
      <div>
        <Checkbox
          checked={isDone}
          color="primary"
          onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} isDone={isDone}/>
        <IconButton onClick={onClickHandler}>
          <Delete/>
        </IconButton>
      </div>
    </div>
  )
}
