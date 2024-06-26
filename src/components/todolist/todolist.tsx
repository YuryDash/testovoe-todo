import React, {ChangeEvent} from 'react';
import {AddItemForm} from '../add-item-form/add-Item-form';
import {EditableSpan} from '../editable-span/editable-span';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType} from "../../app/App";
import {Task} from "../task/task";
import s from './todolist.module.css'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  date: string
}

export function Todolist(props: PropsType) {

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  }

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  return <div>
    <h3 className={s.todoTitle}>
      <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <div className={s.date}>{props.date}</div>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          }

          return <Task
            isDone={t.isDone}
            id={t.id}
            onClickHandler={onClickHandler}
            onChangeHandler={onChangeHandler}
            onTitleChangeHandler={onTitleChangeHandler}
            title={t.title}
            key={t.id}
          />
        })
      }
    </div>
    <div style={{paddingTop: "10px"}}>
      <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'inherit'}
      >All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
}


