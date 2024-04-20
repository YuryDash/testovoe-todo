import {FilterValuesType, TodolistType} from '../app/App';
import {v1} from 'uuid';
import dayjs from "dayjs";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>


const initialState: Array<TodolistType> = [
  {id: '1', date: dayjs().format('HH:mm:ss - DD:MM:YYYY'), title:'Hello in TODO', filter:'all'}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {

  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id != action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolistId,
        title: action.title,
        filter: 'all',
        date: dayjs().format('HH:mm:ss - DD:MM:YYYY'),

      }, ...
        state
      ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state]
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
  return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}

type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>