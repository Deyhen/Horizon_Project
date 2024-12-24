import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import posts from './posts';
import servers from './servers';
import privileges from './privileges';

export const reducer = combineReducers({
  user,
  users,
  posts,
  servers,
  privileges,
});
