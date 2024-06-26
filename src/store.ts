import { create } from "zustand";

interface Props {
  size: number;
  user1symbol: string;
  player1color: string;
  player2color: string;
  recordCells: string[];
  setRecordSize: (size: number) => void;
  set1S: (user1symbol: string) => void;
  setP1C: (player1color: string) => void;
  setP2C: (player2color: string) => void;
  setRecordCells: (newCells: string[]) => void;
}

interface TimerStore {
  timer: number;
  startTimer: () => void;
  resetTimer: () => void;
}

interface TurnStore {
  firstTurn: string;
  setFirstTurn: (firstTurn: string) => void;
}

export const useCellsStore = create<Props>((set) => ({
  size: 3,
  setRecordSize: (size) => {
    set((state) => ({ ...state, size: size }));
  },
  user1symbol: "X",
  set1S: (user1symbol) => {
    set((state) => ({ ...state, user1symbol: user1symbol }));
  },
  player1color: "#2196f3",
  setP1C: (player1color) => {
    set((state) => ({ ...state, player1color: player1color }));
  },
  player2color: "#DB4455",
  setP2C: (player2color) => {
    set((state) => ({ ...state, player2color: player2color }));
  },
  recordCells: ["", "", "", "", "", "", "", "", ""],
  setRecordCells: (newCells) =>
    set((state) => ({ ...state, recordCells: newCells })),
}));

export const useTimerStore = create<TimerStore>((set) => ({
  timer: 0,
  startTimer: () =>
    set((state) => ({
      timer: state.timer + 1,
    })),
  resetTimer: () =>
    set(() => ({
      timer: 0,
    })),
}));

export const useFirstTurn = create<TurnStore>((set) => ({
  firstTurn: "1P",
  setFirstTurn: (firstTurn) => {
    set((state) => ({ ...state, firstTurn: firstTurn }));
  },
}));
