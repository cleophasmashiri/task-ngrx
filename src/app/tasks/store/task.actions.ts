import { Action } from '@ngrx/store';

import { Task } from './../model/task';

export enum TaskActionTypes {
  LOAD = '[Task] LOAD Requested',
  LOAD_SUCCESS = '[Task] LOAD Success',
  CREATE = '[Task] CREATE Requested',
  CREATE_SUCCESS = '[Task] CREATE Success',
  UPDATE = '[Task] UPDATE Requested',
  UPDATE_SUCCESS = '[Task] UPDATE Success',
  REMOVE = '[Task] REMOVE Requested',
  REMOVE_SUCCESS = '[Task] REMOVE Success',
  ERROR = '[Task] Error'
}

export class LoadAction implements Action {
  type = TaskActionTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadActionSuccess implements Action {
  type = TaskActionTypes.LOAD_SUCCESS;
  constructor(public payload: { tasks: Task[] }) { }
}

export class CreateAction implements Action {
  type = TaskActionTypes.CREATE;
  constructor(public payload: { task: Task }) { }
}

export class CreateActionSuccess implements Action {
  type = TaskActionTypes.CREATE_SUCCESS;
  constructor(public payload: { task: Task }) { }
}

export class UpdateAction implements Action {
  type = TaskActionTypes.UPDATE;
  constructor(public payload: { id: string, task: Task }) { }
}

export class UpdateActionSuccess implements Action {
  type = TaskActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { task: Task }) { }
}

export class RemoveAction implements Action {
  type = TaskActionTypes.REMOVE;
  constructor(public payload: { id: string }) { }
}

export class RemoveActionSuccess implements Action {
  type = TaskActionTypes.REMOVE_SUCCESS;
  constructor(public payload: { id: string }) { }
}

export class ErrorAction implements Action {
  type = TaskActionTypes.ERROR;
  constructor(public payload: any) { }
}

export type TaskAction =
  LoadAction | LoadActionSuccess |
  CreateAction | CreateActionSuccess |
  UpdateAction | UpdateActionSuccess |
  RemoveAction | RemoveActionSuccess |
  ErrorAction;