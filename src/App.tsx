import { useState } from 'react'
import Cube3D from './components/Cube3D'
import Controls from './components/Controls'
import NotationGuide from './components/NotationGuide'
import Tutorial from './components/Tutorial'
import AlgorithmLibrary from './components/AlgorithmLibrary'
import { useCubeStore } from './store/cubeStore'
import { FaCube, FaGraduationCap, FaBook, FaListAlt, FaChartLine } from 'react-icons/fa'

type Tab = 'controls' | 'tutorial' | 'notation' | 'algorithms' | 'progress'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('controls')
  const cubeState = useCubeStore(state => state.cubeState)
  
  const tabs = [
    { id: 'controls' as const, label: 'Controls', icon: FaCube },
    { id: 'tutorial' as const, label: 'Tutorial', icon: FaGraduationCap },
    { id: 'notation' as const, label: 'Notation', icon: FaBook },
    { id: 'algorithms' as const, label: 'Algorithms', icon: FaListAlt },
    { id: 'progress' as const, label: 'Progress', icon: FaChartLine },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCube className="text-3xl text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">RubixSim</h1>
              <span className="text-sm text-gray-600">Learn to Solve Rubik's Cube</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - 3D Cube */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-[500px]">
              <Cube3D cubeState={cubeState} />
            </div>
          </div>
          
          {/* Right Column - Tabbed Interface */}
          <div>
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4 bg-white rounded-lg shadow p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="text-sm" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="min-h-[450px]">
              {activeTab === 'controls' && <Controls />}
              {activeTab === 'tutorial' && <Tutorial />}
              {activeTab === 'notation' && <NotationGuide />}
              {activeTab === 'algorithms' && <AlgorithmLibrary />}
              {activeTab === 'progress' && <ProgressTracker />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-600">
            Built for the cubing community | 
            <span className="ml-1">Keyboard shortcuts enabled</span> | 
            <a href="https://github.com/Prawal-Sharma/RubixSim" className="ml-1 text-blue-500 hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProgressTracker() {
  const solves = JSON.parse(localStorage.getItem('solves') || '[]')
  
  const bestTime = solves.length > 0 
    ? Math.min(...solves.map((s: any) => s.time))
    : null
  
  const avgTime = solves.length > 0
    ? solves.reduce((acc: number, s: any) => acc + s.time, 0) / solves.length
    : null
  
  const formatTime = (ms: number | null) => {
    if (ms === null) return 'N/A'
    const totalSeconds = ms / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = (totalSeconds % 60).toFixed(2)
    return `${minutes}:${seconds.padStart(5, '0')}`
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Progress Tracker</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded p-4">
          <p className="text-sm text-gray-600">Total Solves</p>
          <p className="text-3xl font-bold text-blue-600">{solves.length}</p>
        </div>
        <div className="bg-green-50 rounded p-4">
          <p className="text-sm text-gray-600">Best Time</p>
          <p className="text-2xl font-bold text-green-600">{formatTime(bestTime)}</p>
        </div>
        <div className="bg-yellow-50 rounded p-4">
          <p className="text-sm text-gray-600">Average Time</p>
          <p className="text-2xl font-bold text-yellow-600">{formatTime(avgTime)}</p>
        </div>
        <div className="bg-purple-50 rounded p-4">
          <p className="text-sm text-gray-600">Avg Moves</p>
          <p className="text-3xl font-bold text-purple-600">
            {solves.length > 0 
              ? Math.round(solves.reduce((acc: number, s: any) => acc + s.moveCount, 0) / solves.length)
              : 'N/A'}
          </p>
        </div>
      </div>
      
      {/* Recent Solves */}
      <div>
        <h3 className="font-semibold mb-2">Recent Solves</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {solves.slice(-10).reverse().map((solve: any, index: number) => (
            <div key={index} className="border rounded p-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono">{formatTime(solve.time)}</span>
                <span>{solve.moveCount} moves</span>
                <span className="text-gray-500">
                  {new Date(solve.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {solves.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No solves recorded yet. Complete a solve to track your progress!
        </p>
      )}
    </div>
  )
}

export default App