import { create } from 'zustand'
import { CubeState, Move, MoveNotation } from '../types/cube'
import { createSolvedCube, applyMove, parseAlgorithm, generateScramble } from '../utils/cubeUtils'

interface CubeStore {
  cubeState: CubeState
  moveHistory: Move[]
  redoStack: Move[]
  isTimerRunning: boolean
  startTime: number | null
  solveTime: number | null
  moveCount: number
  scramble: string
  
  // Actions
  executeMove: (notation: MoveNotation) => void
  executeAlgorithm: (algorithm: string) => void
  undo: () => void
  redo: () => void
  reset: () => void
  scrambleCube: () => void
  setScramble: (scramble: string) => void
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useCubeStore = create<CubeStore>((set, get) => ({
  cubeState: createSolvedCube(),
  moveHistory: [],
  redoStack: [],
  isTimerRunning: false,
  startTime: null,
  solveTime: null,
  moveCount: 0,
  scramble: '',
  
  executeMove: (notation) => {
    const currentState = get().cubeState
    const newState = applyMove(currentState, notation)
    const move: Move = { notation, timestamp: Date.now() }
    
    set(state => ({
      cubeState: newState,
      moveHistory: [...state.moveHistory, move],
      redoStack: [],
      moveCount: state.moveCount + 1
    }))
    
    // Auto-start timer on first move after scramble
    const { isTimerRunning, startTime, scramble } = get()
    if (!isTimerRunning && !startTime && scramble) {
      get().startTimer()
    }
  },
  
  executeAlgorithm: (algorithm) => {
    const moves = parseAlgorithm(algorithm)
    moves.forEach(move => get().executeMove(move))
  },
  
  undo: () => {
    const { moveHistory, cubeState } = get()
    if (moveHistory.length === 0) return
    
    const lastMove = moveHistory[moveHistory.length - 1]
    const reversedMove = reverseMove(lastMove.notation)
    const newState = applyMove(cubeState, reversedMove)
    
    set(state => ({
      cubeState: newState,
      moveHistory: state.moveHistory.slice(0, -1),
      redoStack: [...state.redoStack, lastMove],
      moveCount: Math.max(0, state.moveCount - 1)
    }))
  },
  
  redo: () => {
    const { redoStack } = get()
    if (redoStack.length === 0) return
    
    const moveToRedo = redoStack[redoStack.length - 1]
    get().executeMove(moveToRedo.notation)
    
    set(state => ({
      redoStack: state.redoStack.slice(0, -1)
    }))
  },
  
  reset: () => {
    set({
      cubeState: createSolvedCube(),
      moveHistory: [],
      redoStack: [],
      moveCount: 0,
      scramble: '',
      isTimerRunning: false,
      startTime: null,
      solveTime: null
    })
  },
  
  scrambleCube: () => {
    const scramble = generateScramble()
    get().reset()
    get().setScramble(scramble)
    get().executeAlgorithm(scramble)
    set({ moveHistory: [], moveCount: 0 })
  },
  
  setScramble: (scramble) => {
    set({ scramble })
  },
  
  startTimer: () => {
    set({
      isTimerRunning: true,
      startTime: Date.now(),
      solveTime: null
    })
  },
  
  stopTimer: () => {
    const { startTime } = get()
    if (!startTime) return
    
    const solveTime = Date.now() - startTime
    set({
      isTimerRunning: false,
      solveTime
    })
    
    // Check if cube is solved
    if (isCubeSolved(get().cubeState)) {
      // Save to local storage for progress tracking
      const solves = JSON.parse(localStorage.getItem('solves') || '[]')
      solves.push({
        time: solveTime,
        moveCount: get().moveCount,
        scramble: get().scramble,
        date: new Date().toISOString()
      })
      localStorage.setItem('solves', JSON.stringify(solves))
    }
  },
  
  resetTimer: () => {
    set({
      isTimerRunning: false,
      startTime: null,
      solveTime: null
    })
  }
}))

function reverseMove(move: MoveNotation): MoveNotation {
  if (move.endsWith('2')) return move
  if (move.endsWith("'")) return move.slice(0, -1) as MoveNotation
  return (move + "'") as MoveNotation
}

function isCubeSolved(state: CubeState): boolean {
  for (const face of Object.values(state.faces)) {
    const color = face[0][0]
    for (const row of face) {
      for (const cell of row) {
        if (cell !== color) return false
      }
    }
  }
  return true
}