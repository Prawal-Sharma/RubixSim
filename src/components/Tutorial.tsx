import { useState } from 'react'
import { useCubeStore } from '../store/cubeStore'
import { FaChevronLeft, FaChevronRight, FaPlay, FaRedo } from 'react-icons/fa'

interface TutorialStep {
  title: string
  content: string
  moves?: string
  tips?: string[]
}

const beginnerTutorial: TutorialStep[] = [
  {
    title: 'Welcome to Rubik\'s Cube!',
    content: 'This tutorial will teach you how to solve a Rubik\'s Cube using the Layer-by-Layer method, perfect for beginners.',
    tips: ['Take your time to understand each step', 'Practice moves repeatedly', 'Don\'t worry about speed initially']
  },
  {
    title: 'Understanding the Cube',
    content: 'A Rubik\'s Cube has 6 faces (colors), 12 edges (2 colors), and 8 corners (3 colors). The center pieces never move relative to each other.',
    tips: ['White is opposite yellow', 'Red is opposite orange', 'Green is opposite blue']
  },
  {
    title: 'Basic Notation',
    content: 'F = Front, B = Back, U = Up, D = Down, L = Left, R = Right. Adding \' means counter-clockwise, 2 means 180°.',
    moves: 'F R U R\' U\' F\'',
    tips: ['Practice each move slowly', 'Use keyboard shortcuts for faster input']
  },
  {
    title: 'Step 1: White Cross',
    content: 'Start by making a white cross on the top. Match the edge pieces with their center colors.',
    moves: 'F R U R\' U\' F\'',
    tips: ['Focus on one edge at a time', 'Don\'t worry about corners yet', 'Keep white center on top']
  },
  {
    title: 'Step 2: White Corners',
    content: 'Position white corners using the algorithm: R\' D\' R D. Repeat until the corner is solved.',
    moves: 'R\' D\' R D',
    tips: ['Place corner below its target position', 'Repeat algorithm 2-4 times per corner', 'Don\'t disturb the cross']
  },
  {
    title: 'Step 3: Middle Layer',
    content: 'Insert edge pieces into the middle layer. Use these algorithms based on direction.',
    moves: 'U R U\' R\' U\' F\' U F',
    tips: ['Find edges without yellow', 'Position edge above target', 'Use mirror algorithm for left side']
  },
  {
    title: 'Step 4: Yellow Cross',
    content: 'Create a yellow cross on top using the algorithm: F R U R\' U\' F\'',
    moves: 'F R U R\' U\' F\'',
    tips: ['Don\'t worry about edge alignment yet', 'May need to repeat 1-3 times', 'Look for patterns: dot, L, line']
  },
  {
    title: 'Step 5: Position Yellow Edges',
    content: 'Align yellow edges with center colors using: R U R\' U R U2 R\'',
    moves: 'R U R\' U R U2 R\'',
    tips: ['Find two adjacent correct edges', 'Place them at front and right', 'Repeat if needed']
  },
  {
    title: 'Step 6: Position Yellow Corners',
    content: 'Move corners to correct positions (ignore orientation) using: U R U\' L\' U R\' U\' L',
    moves: 'U R U\' L\' U R\' U\' L',
    tips: ['Find one correct corner', 'Keep it at front-right-up', 'Repeat until all corners positioned']
  },
  {
    title: 'Step 7: Orient Yellow Corners',
    content: 'Final step! Orient corners using: R\' D\' R D repeatedly on each corner.',
    moves: 'R\' D\' R D',
    tips: ['Don\'t rotate top layer between corners', 'Cube will look messy until the end', 'Trust the process!']
  },
  {
    title: 'Congratulations!',
    content: 'You\'ve learned to solve the Rubik\'s Cube! Keep practicing to improve your speed and learn advanced methods.',
    tips: ['Practice daily for muscle memory', 'Try to solve without looking at instructions', 'Learn F2L next for faster solves']
  }
]

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const { executeAlgorithm, reset } = useCubeStore()
  
  const step = beginnerTutorial[currentStep]
  
  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]))
    if (currentStep < beginnerTutorial.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handlePractice = () => {
    if (step.moves) {
      reset()
      executeAlgorithm(step.moves)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Beginner Tutorial</h2>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{currentStep + 1} / {beginnerTutorial.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / beginnerTutorial.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-blue-600">
          Step {currentStep + 1}: {step.title}
        </h3>
        <p className="text-gray-700 mb-4">{step.content}</p>
        
        {/* Algorithm Display */}
        {step.moves && (
          <div className="bg-gray-100 rounded p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Algorithm:</span>
              <button
                onClick={handlePractice}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
              >
                <FaPlay className="text-xs" /> Practice
              </button>
            </div>
            <code className="font-mono text-lg">{step.moves}</code>
          </div>
        )}
        
        {/* Tips */}
        {step.tips && (
          <div className="bg-blue-50 rounded p-3">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              {step.tips.map((tip, index) => (
                <li key={index} className="text-sm">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            currentStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          <FaChevronLeft /> Previous
        </button>
        
        <button
          onClick={reset}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2"
        >
          <FaRedo /> Reset Cube
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStep === beginnerTutorial.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            currentStep === beginnerTutorial.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next <FaChevronRight />
        </button>
      </div>
      
      {/* Completed Steps Indicator */}
      <div className="mt-4 flex gap-1 justify-center">
        {beginnerTutorial.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentStep
                ? 'bg-blue-500'
                : completedSteps.has(index)
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}