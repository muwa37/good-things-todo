export type User = {
  name: string;
  tag: string;
  todoList: Todo[];
  id: string;
};

export type Todo = {
  title: string;
  isDone: boolean;
  id: string;
};
