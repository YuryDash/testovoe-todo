import {AppRootStateType} from "./store";
import dayjs from "dayjs";

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}

export function saveState(state: AppRootStateType) {
  if (state.todolists.length === 0) {
    state = {
      todolists: [{id: '1', date: dayjs().format('HH:mm:ss - DD:MM:YYYY'), title: 'Welcome in TODO', filter: 'all'}],
      tasks: {
        ['1']: [{id: '2', title: 'first task', isDone: false}, {id: '3', title: 'second task', isDone: false}],
      }
    }
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e: any) {
    console.log(`Error: ${e}`)
  }
}
