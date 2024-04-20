import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, legacy_createStore} from 'redux';
import {loadState, saveState} from './util-local-storage';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const persistedState = loadState();

export const store = legacy_createStore(
  rootReducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export type AppRootStateType = ReturnType<typeof rootReducer>
