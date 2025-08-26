import { useHotkeys } from 'react-hotkeys-hook'
import { FaUndo, FaRedo, FaSyncAlt, FaRandom, FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { useCubeStore } from '../store/cubeStore'
import { MoveNotation } from '../types/cube'

export default function Controls() {
  const {
    executeMove,
    undo,
    redo,
    reset,
    scrambleCube,
    isTimerRunning,
    startTimer,
    stopTimer,
    solveTime,
    moveCount,
    scramble
  } = useCubeStore()
  
  // Keyboard shortcuts for moves
  useHotkeys('f', () => executeMove('F'))
  useHotkeys('shift+f', () => executeMove("F'"))
  useHotkeys('b', () => executeMove('B'))
  useHotkeys('shift+b', () => executeMove("B'"))
  useHotkeys('u', () => executeMove('U'))
  useHotkeys('shift+u', () => executeMove("U'"))
  useHotkeys('d', () => executeMove('D'))
  useHotkeys('shift+d', () => executeMove("D'"))
  useHotkeys('l', () => executeMove('L'))
  useHotkeys('shift+l', () => executeMove("L'"))
  useHotkeys('r', () => executeMove('R'))
  useHotkeys('shift+r', () => executeMove("R'"))
  
  // Control shortcuts
  useHotkeys('ctrl+z', () => undo())
  useHotkeys('ctrl+shift+z', () => redo())
  useHotkeys('escape', () => reset())
  useHotkeys('n', () => scrambleCube())
  useHotkeys('space', (e) => {
    e.preventDefault()
    if (isTimerRunning) stopTimer()
    else if (!solveTime) startTimer()
  })
  
  const formatTime = (ms: number | null) => {
    if (ms === null) return '0:00.00'
    const totalSeconds = ms / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = (totalSeconds % 60).toFixed(2)
    return `${minutes}:${seconds.padStart(5, '0')}`
  }
  
  const handleMoveClick = (notation: MoveNotation) => {
    executeMove(notation)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Controls</h2>
      
      {/* Timer and Stats */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Timer:</span>
          <span className="text-2xl font-mono">{formatTime(solveTime)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Moves:</span>
          <span className="text-xl font-mono">{moveCount}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => isTimerRunning ? stopTimer() : startTimer()}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            {isTimerRunning ? <FaPause /> : <FaPlay />}
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <FaStop />
          </button>
        </div>
      </div>
      
      {/* Face Moves */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Face Moves</h3>
        <div className="grid grid-cols-3 gap-2">
          {(['F', 'B', 'U', 'D', 'L', 'R'] as const).map(face => (
            <div key={face} className="flex gap-1">
              <button
                onClick={() => handleMoveClick(face)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
              >
                {face}
              </button>
              <button
                onClick={() => handleMoveClick(`${face}'` as MoveNotation)}
                className="flex-1 bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500 text-sm"
              >
                {face}'
              </button>
              <button
                onClick={() => handleMoveClick(`${face}2` as MoveNotation)}
                className="flex-1 bg-blue-300 text-white px-3 py-2 rounded hover:bg-blue-400 text-sm"
              >
                {face}2
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={undo}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center justify-center gap-2"
        >
          <FaUndo /> Undo
        </button>
        <button
          onClick={redo}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center justify-center gap-2"
        >
          <FaRedo /> Redo
        </button>
        <button
          onClick={reset}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center justify-center gap-2"
        >
          <FaSyncAlt /> Reset
        </button>
        <button
          onClick={scrambleCube}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <FaRandom /> Scramble
        </button>
      </div>
      
      {/* Current Scramble */}
      {scramble && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold">Current Scramble:</p>
          <p className="text-xs font-mono mt-1">{scramble}</p>
        </div>
      )}
      
      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 text-xs text-gray-600">
        <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
        <p>Face moves: F, B, U, D, L, R</p>
        <p>Prime moves: Shift + letter</p>
        <p>Undo: Ctrl+Z | Redo: Ctrl+Shift+Z</p>
        <p>Reset: Esc | Scramble: N</p>
        <p>Timer: Space</p>
      </div>
    </div>
  )
}