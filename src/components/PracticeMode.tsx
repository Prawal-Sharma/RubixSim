import { useState } from 'react'
import { useCubeStore } from '../store/cubeStore'
import { FaPlay, FaRedo, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface PracticeSet {
  name: string
  description: string
  cases: {
    name: string
    setup: string
    solution: string
    hint?: string
  }[]
}

const practiceSets: Record<string, PracticeSet> = {
  cross: {
    name: 'White Cross',
    description: 'Practice solving the white cross efficiently',
    cases: [
      {
        name: 'Basic Cross',
        setup: 'R U R\' U\' F\' U F',
        solution: 'F R U\' R\' F\'',
        hint: 'Focus on edge orientation first'
      },
      {
        name: 'Advanced Cross',
        setup: 'F2 D R2 U\' L2 U',
        solution: 'D R F\' L\' D2',
        hint: 'Look for pieces that are already aligned'
      }
    ]
  },
  f2l: {
    name: 'F2L (First Two Layers)',
    description: 'Master the 41 F2L cases',
    cases: [
      {
        name: 'Basic Insert Right',
        setup: 'R U R\' U\' R U R\' U\'',
        solution: 'U R U\' R\'',
        hint: 'Corner and edge are separated'
      },
      {
        name: 'Basic Insert Left',
        setup: 'L\' U\' L U L\' U\' L U',
        solution: 'U\' L\' U L',
        hint: 'Mirror of right insertion'
      },
      {
        name: 'Split Pair',
        setup: 'R U R\' U2 R U R\'',
        solution: 'U\' R U R\' U R U R\'',
        hint: 'Pair needs to be split first'
      }
    ]
  },
  oll: {
    name: 'OLL (Orientation of Last Layer)',
    description: 'Learn all 57 OLL algorithms',
    cases: [
      {
        name: 'Sune (OLL 27)',
        setup: 'R U\' R\' U\' R U2 R\'',
        solution: 'R U R\' U R U2 R\'',
        hint: 'One of the most common OLLs'
      },
      {
        name: 'Anti-Sune (OLL 26)',
        setup: 'R U2 R\' U\' R U\' R\'',
        solution: 'R U2 R\' U\' R U\' R\'',
        hint: 'Mirror of Sune'
      },
      {
        name: 'T-Shape (OLL 45)',
        setup: 'F R\' U\' R U F\'',
        solution: 'F R U R\' U\' F\'',
        hint: 'Creates a T shape on top'
      }
    ]
  },
  pll: {
    name: 'PLL (Permutation of Last Layer)',
    description: 'Master all 21 PLL algorithms',
    cases: [
      {
        name: 'T-Perm',
        setup: 'R\' U\' R U R F\' R2 U R U R\' U\' F R',
        solution: 'R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'',
        hint: 'Swaps two corners and two edges'
      },
      {
        name: 'Y-Perm',
        setup: 'F\' R\' U R U R\' U\' R F R\' U R U\' R\' F\' R F',
        solution: 'F R U\' R\' U\' R U R\' F\' R U R\' U\' R\' F R F\'',
        hint: 'Diagonal corner swap'
      },
      {
        name: 'U-Perm (a)',
        setup: 'R\' U R\' U\' R\' U\' R\' U R U R2',
        solution: 'R U\' R U R U R U\' R\' U\' R2',
        hint: 'Cycles three edges clockwise'
      }
    ]
  }
}

export default function PracticeMode() {
  const [selectedSet, setSelectedSet] = useState<keyof typeof practiceSets>('cross')
  const [currentCase, setCurrentCase] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)
  const { reset, executeAlgorithm } = useCubeStore()
  
  const practiceSet = practiceSets[selectedSet]
  const currentPracticeCase = practiceSet.cases[currentCase]
  
  const setupCase = () => {
    reset()
    setTimeout(() => {
      executeAlgorithm(currentPracticeCase.setup)
      setShowSolution(false)
      setSolved(false)
      setAttempts(attempts + 1)
    }, 100)
  }
  
  const showSolutionHandler = () => {
    reset()
    setTimeout(() => {
      executeAlgorithm(currentPracticeCase.setup)
      setTimeout(() => {
        executeAlgorithm(currentPracticeCase.solution)
        setShowSolution(true)
        setSolved(true)
      }, 500)
    }, 100)
  }
  
  const nextCase = () => {
    if (currentCase < practiceSet.cases.length - 1) {
      setCurrentCase(currentCase + 1)
    } else {
      setCurrentCase(0)
    }
    setShowSolution(false)
    setSolved(false)
  }
  
  const previousCase = () => {
    if (currentCase > 0) {
      setCurrentCase(currentCase - 1)
    } else {
      setCurrentCase(practiceSet.cases.length - 1)
    }
    setShowSolution(false)
    setSolved(false)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Practice Mode</h2>
      
      {/* Practice Set Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Practice Set:</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(practiceSets).map(([key, set]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSet(key as keyof typeof practiceSets)
                setCurrentCase(0)
                setShowSolution(false)
                setSolved(false)
              }}
              className={`p-3 rounded text-left transition-colors ${
                selectedSet === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="font-semibold">{set.name}</div>
              <div className="text-xs opacity-80">{set.cases.length} cases</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Practice Case */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{currentPracticeCase.name}</h3>
          <span className="text-sm text-gray-600">
            Case {currentCase + 1} / {practiceSet.cases.length}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{practiceSet.description}</p>
        
        {/* Setup Algorithm */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-700">Setup:</label>
          <code className="block bg-white rounded p-2 mt-1 font-mono text-sm">
            {currentPracticeCase.setup}
          </code>
        </div>
        
        {/* Solution (Hidden/Shown) */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-700">Solution:</label>
          {showSolution ? (
            <code className="block bg-green-50 rounded p-2 mt-1 font-mono text-sm text-green-700">
              {currentPracticeCase.solution}
            </code>
          ) : (
            <div className="bg-gray-100 rounded p-2 mt-1 text-sm text-gray-500">
              Hidden - Try to solve it first!
            </div>
          )}
        </div>
        
        {/* Hint */}
        {currentPracticeCase.hint && (
          <div className="bg-yellow-50 rounded p-2 text-sm">
            <span className="font-semibold">Hint:</span> {currentPracticeCase.hint}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={setupCase}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <FaPlay /> Setup Case
        </button>
        <button
          onClick={showSolutionHandler}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
        >
          {solved ? <FaCheckCircle /> : <FaTimesCircle />} Show Solution
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={previousCase}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        
        <button
          onClick={() => reset()}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center justify-center gap-2"
        >
          <FaRedo /> Reset
        </button>
        
        <button
          onClick={nextCase}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
      
      {/* Stats */}
      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <div className="flex justify-between">
          <span>Session Attempts:</span>
          <span className="font-semibold">{attempts}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Current Status:</span>
          <span className={`font-semibold ${solved ? 'text-green-600' : 'text-yellow-600'}`}>
            {solved ? 'Solved' : 'Practicing'}
          </span>
        </div>
      </div>
    </div>
  )
}