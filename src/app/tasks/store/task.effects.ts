import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { TasksService } from './../services/tasks.service';
import * as Action from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private api: TasksService, private actions$: Actions) { }

  @Effect()
  loadAction$ = this.actions$
    .ofType<Action.LoadAction>(Action.TaskActionTypes.LOAD)
    .switchMap(payload =>
      this.api
        .load()
        .map(res => new Action.LoadActionSuccess({ tasks: res }))
        .catch(error => this.handleError(error))
    );

  @Effect()
  createAction$ = this.actions$
    .ofType<Action.CreateAction>(Action.TaskActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.api
        .create(payload.task)
        .map(res => new Action.CreateActionSuccess({ task: res }))
        .catch(error => this.handleError(error))
    );

  @Effect()
  updateAction$ = this.actions$
    .ofType<Action.UpdateAction>(Action.TaskActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.api
        .update(payload.task)
        .map(res => new Action.UpdateActionSuccess({ task: res }))
        .catch(error => this.handleError(error))
    );

  @Effect()
  removeAction$ = this.actions$
    .ofType<Action.RemoveAction>(Action.TaskActionTypes.REMOVE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.api
        .remove(payload.id)
        .map(res => new Action.RemoveActionSuccess({ id: res }))
        .catch(error => this.handleError(error))
    );

  private handleError(error) {
    return Observable.of(new Action.ErrorAction(error));
  }
}
