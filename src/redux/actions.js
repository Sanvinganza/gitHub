import * as actionType from "./actionTypes";

export const userNotFound = data => ({
  type: actionType.USER_NOT_FOUND,
  payload: data,
});

export const addUser = data => ({
  type: actionType.ADD_USER,
  payload: data,
});

export const addRepositories = data => ({
  type: actionType.ADD_REPOSITORIES,
  payload: data,
});
