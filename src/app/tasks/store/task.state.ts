import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Task } from './../model/task';

export interface TaskState extends EntityState<Task> {
  isLoading: boolean;
  error: any;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false
});

export const taskInitialState: TaskState = taskAdapter.getInitialState({
  isLoading: true,
  error: null
});

// custom selectors
export const taskState = createFeatureSelector<TaskState>('task');
// export const selectedRecords = createSelector(taskState, (state: TaskState) => state.tasks);
export const selectIsLoading = createSelector(taskState, (state: TaskState) => state.isLoading);
export const selectError = createSelector(taskState, (state: TaskState) => state.error);

// entity selectors
export const selectors = taskAdapter.getSelectors(taskState);