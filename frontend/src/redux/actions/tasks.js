import { OVERDUE_TASKS, UPCOMING_TASKS } from './types';
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */

const overdueTasks = (tasks) => ({
  type: OVERDUE_TASKS,
  payload: tasks,
});

const upcomingTasks = (tasks) => ({
  type: UPCOMING_TASKS,
  payload: tasks,
});

export const tasks = {
  overdueTasks,
  upcomingTasks,
};