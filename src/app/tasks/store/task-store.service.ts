import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { AppState } from './../../store/app.reducer'
import { Task } from './../model/task';
import * as State from './task.state';
import * as Action from './task.actions';

@Injectable()
export class TaskStoreService {

  constructor(private store: Store<AppState>) { }

  private dispatchAction(action: Action.TaskAction) {
    this.store.dispatch(action);
  }

  dispatchLoadAction() {
    this.dispatchAction(new Action.LoadAction({ tasks: [] }));
  }

  dispatchCreateAction(record: Task) {
    this.dispatchAction(new Action.CreateAction({ task: record }));
  }

  dispatchUpdateAction(record: Task) {
    this.dispatchAction(new Action.UpdateAction({ id: record.id, task: record }));
  }

  dispatchRemoveAction(id) {
    this.dispatchAction(new Action.RemoveAction({ id: id }));
  }

  // sample of how to select piece of the state
  // ngrx/entity
  getTasks() {
    return this.store.select(State.selectors.selectAll);
  }

  getIsLoading() {
    return this.store.select(State.selectIsLoading);
  }

  getError() {
    return this.store.select(State.selectError);
  }
}