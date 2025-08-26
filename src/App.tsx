import { useState } from 'react'
import Cube3D from './components/Cube3D'
import Controls from './components/Controls'
import NotationGuide from './components/NotationGuide'
import Tutorial from './components/Tutorial'
import AlgorithmLibrary from './components/AlgorithmLibrary'
import Statistics from './components/Statistics'
import PracticeMode from './components/PracticeMode'
import { useCubeStore } from './store/cubeStore'
import { FaCube, FaGraduationCap, FaBook, FaListAlt, FaChartLine, FaDumbbell } from 'react-icons/fa'

type Tab = 'controls' | 'tutorial' | 'notation' | 'algorithms' | 'practice' | 'statistics'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('controls')
  const cubeState = useCubeStore(state => state.cubeState)
  
  const tabs = [
    { id: 'controls' as const, label: 'Controls', icon: FaCube },
    { id: 'tutorial' as const, label: 'Tutorial', icon: FaGraduationCap },
    { id: 'notation' as const, label: 'Notation', icon: FaBook },
    { id: 'algorithms' as const, label: 'Algorithms', icon: FaListAlt },
    { id: 'practice' as const, label: 'Practice', icon: FaDumbbell },
    { id: 'statistics' as const, label: 'Stats', icon: FaChartLine },
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
              {activeTab === 'practice' && <PracticeMode />}
              {activeTab === 'statistics' && <Statistics />}
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

export default App