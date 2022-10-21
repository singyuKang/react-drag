import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface Counter {
  id: number;
}

interface IToDoState {
  [key: string]: ITodo[];
}

interface CounterState {
  [key: string]: Counter[];
}

export const todoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const counter = atom<CounterState>({
  key: "myCounter",
  default: {
    counter: [],
  },
});
