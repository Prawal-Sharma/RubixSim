import { useState } from 'react'
import { useCubeStore } from '../store/cubeStore'
import { MoveNotation } from '../types/cube'

interface NotationItem {
  notation: MoveNotation
  name: string
  description: string
  category: 'basic' | 'prime' | 'double' | 'slice' | 'rotation'
}

const notationData: NotationItem[] = [
  // Basic moves
  { notation: 'F', name: 'Front', description: 'Rotate front face clockwise', category: 'basic' },
  { notation: 'B', name: 'Back', description: 'Rotate back face clockwise', category: 'basic' },
  { notation: 'U', name: 'Up', description: 'Rotate up face clockwise', category: 'basic' },
  { notation: 'D', name: 'Down', description: 'Rotate down face clockwise', category: 'basic' },
  { notation: 'L', name: 'Left', description: 'Rotate left face clockwise', category: 'basic' },
  { notation: 'R', name: 'Right', description: 'Rotate right face clockwise', category: 'basic' },
  
  // Prime moves
  { notation: "F'", name: 'Front Prime', description: 'Rotate front face counter-clockwise', category: 'prime' },
  { notation: "B'", name: 'Back Prime', description: 'Rotate back face counter-clockwise', category: 'prime' },
  { notation: "U'", name: 'Up Prime', description: 'Rotate up face counter-clockwise', category: 'prime' },
  { notation: "D'", name: 'Down Prime', description: 'Rotate down face counter-clockwise', category: 'prime' },
  { notation: "L'", name: 'Left Prime', description: 'Rotate left face counter-clockwise', category: 'prime' },
  { notation: "R'", name: 'Right Prime', description: 'Rotate right face counter-clockwise', category: 'prime' },
  
  // Double moves
  { notation: 'F2', name: 'Front Double', description: 'Rotate front face 180°', category: 'double' },
  { notation: 'B2', name: 'Back Double', description: 'Rotate back face 180°', category: 'double' },
  { notation: 'U2', name: 'Up Double', description: 'Rotate up face 180°', category: 'double' },
  { notation: 'D2', name: 'Down Double', description: 'Rotate down face 180°', category: 'double' },
  { notation: 'L2', name: 'Left Double', description: 'Rotate left face 180°', category: 'double' },
  { notation: 'R2', name: 'Right Double', description: 'Rotate right face 180°', category: 'double' },
]

export default function NotationGuide() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'prime' | 'double'>('all')
  const executeMove = useCubeStore(state => state.executeMove)
  
  const filteredNotations = selectedCategory === 'all' 
    ? notationData 
    : notationData.filter(item => item.category === selectedCategory)
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Notation Guide</h2>
      
      {/* Category Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'basic', 'prime', 'double'] as const).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded ${
              selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Notation List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredNotations.map(item => (
          <div
            key={item.notation}
            className="border rounded p-3 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => executeMove(item.notation)}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono text-lg font-bold text-blue-600">
                  {item.notation}
                </span>
                <span className="ml-2 font-semibold">{item.name}</span>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  executeMove(item.notation)
                }}
              >
                Try
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
      
      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p className="font-semibold">Tips:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Click any notation to execute the move</li>
          <li>Prime (') means counter-clockwise</li>
          <li>2 means rotate 180 degrees</li>
          <li>Lowercase letters (r, u, etc.) mean wide moves</li>
        </ul>
      </div>
    </div>
  )
}