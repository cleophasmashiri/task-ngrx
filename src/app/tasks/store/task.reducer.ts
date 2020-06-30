import { Task } from './../model/task';
import { TaskAction, TaskActionTypes } from './task.actions';
import { taskAdapter, taskInitialState, TaskState } from './task.state';

export function taskReducer(
  state = taskInitialState, action: TaskAction): TaskState {

  switch (action.type) {

    case TaskActionTypes.LOAD_SUCCESS:
      return {
        ...taskAdapter.addMany(action.payload.tasks, state),
        isLoading: false,
        error: null
      };

    case TaskActionTypes.CREATE_SUCCESS:
      return {
        ...taskAdapter.addOne(action.payload, state),
        error: null
      };

    case TaskActionTypes.UPDATE_SUCCESS:
      return {
        ...taskAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state),
        error: null
      };

    case TaskActionTypes.REMOVE_SUCCESS:
      return {
        ...taskAdapter.removeOne(action.payload.id, state),
        error: null,
      };

    case TaskActionTypes.ERROR: {
      return Object.assign({}, state, {
        error: action.payload.message
      });
    }

    default:
      return state;
  }
};