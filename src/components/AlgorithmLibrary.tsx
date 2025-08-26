import { useState } from 'react'
import { useCubeStore } from '../store/cubeStore'
import { Algorithm } from '../types/cube'
import { FaPlay, FaSearch, FaBookmark } from 'react-icons/fa'

const algorithms: Algorithm[] = [
  // Basic Patterns
  { name: 'Sexy Move', notation: 'R U R\' U\'', category: 'Basic', description: 'Fundamental trigger used in many algorithms' },
  { name: 'Sledgehammer', notation: 'R\' F R F\'', category: 'Basic', description: 'Another fundamental trigger' },
  { name: 'Sune', notation: 'R U R\' U R U2 R\'', category: 'Basic', description: 'Orients corners, very common OLL' },
  { name: 'Anti-Sune', notation: 'R U2 R\' U\' R U\' R\'', category: 'Basic', description: 'Reverse of Sune' },
  
  // F2L Cases
  { name: 'F2L Case 1', notation: 'U R U\' R\'', category: 'F2L', description: 'Basic insertion - right' },
  { name: 'F2L Case 2', notation: 'U\' L\' U L', category: 'F2L', description: 'Basic insertion - left' },
  { name: 'F2L Case 3', notation: 'R U R\' U\' R U R\' U\' R U R\'', category: 'F2L', description: 'Corner and edge separated' },
  { name: 'F2L Case 4', notation: 'U R U2 R\' U R U\' R\'', category: 'F2L', description: 'Edge in slot, corner in U' },
  
  // OLL Cases (Orientation of Last Layer)
  { name: 'OLL 21 (Cross)', notation: 'F R U R\' U\' R U R\' U\' R U R\' U\' F\'', category: 'OLL', description: 'Cross shape' },
  { name: 'OLL 22', notation: 'R U2 R2 U\' R2 U\' R2 U2 R', category: 'OLL', description: 'Pi shape' },
  { name: 'OLL 23', notation: 'R2 D R\' U2 R D\' R\' U2 R\'', category: 'OLL', description: 'Headlights' },
  { name: 'OLL 27 (Sune)', notation: 'R U R\' U R U2 R\'', category: 'OLL', description: 'Classic Sune' },
  
  // PLL Cases (Permutation of Last Layer)
  { name: 'T-Perm', notation: 'R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'', category: 'PLL', description: 'Swaps two corners and two edges' },
  { name: 'Y-Perm', notation: 'F R U\' R\' U\' R U R\' F\' R U R\' U\' R\' F R F\'', category: 'PLL', description: 'Diagonal corner swap' },
  { name: 'H-Perm', notation: 'M2 U M2 U2 M2 U M2', category: 'PLL', description: 'Swaps opposite edges' },
  { name: 'U-Perm (a)', notation: 'R U\' R U R U R U\' R\' U\' R2', category: 'PLL', description: 'Cycles 3 edges clockwise' },
  { name: 'U-Perm (b)', notation: 'R2 U R U R\' U\' R\' U\' R\' U R\'', category: 'PLL', description: 'Cycles 3 edges counter-clockwise' },
  { name: 'Z-Perm', notation: 'M2 U M2 U M\' U2 M2 U2 M\'', category: 'PLL', description: 'Swaps adjacent edges' },
  
  // Advanced Patterns
  { name: 'Checkerboard', notation: 'M2 E2 S2', category: 'Advanced', description: 'Creates checkerboard pattern' },
  { name: 'Cube in Cube', notation: 'F L F U\' R U F2 L2 U\' L\' B D\' B\' L2 U', category: 'Advanced', description: 'Creates cube in cube pattern' },
  { name: 'Six Spot', notation: 'U D\' R L\' F B\' U D\'', category: 'Advanced', description: 'Creates spots on each face' },
]

export default function AlgorithmLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Algorithm['category'] | 'All'>('All')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { executeAlgorithm, reset } = useCubeStore()
  
  const categories: (Algorithm['category'] | 'All')[] = ['All', 'Basic', 'F2L', 'OLL', 'PLL', 'Advanced']
  
  const filteredAlgorithms = algorithms.filter(alg => {
    const matchesSearch = alg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alg.notation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alg.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || alg.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(name)) {
        newFavorites.delete(name)
      } else {
        newFavorites.add(name)
      }
      return newFavorites
    })
  }
  
  const handleExecute = (algorithm: string) => {
    reset()
    setTimeout(() => executeAlgorithm(algorithm), 100)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Algorithm Library</h2>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search algorithms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Algorithm List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlgorithms.map(alg => (
          <div
            key={alg.name}
            className="border rounded p-3 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{alg.name}</h3>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {alg.category}
                  </span>
                </div>
                <code className="font-mono text-sm text-blue-600 block mt-1">
                  {alg.notation}
                </code>
                {alg.description && (
                  <p className="text-sm text-gray-600 mt-1">{alg.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(alg.name)}
                  className={`p-2 rounded ${
                    favorites.has(alg.name)
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FaBookmark />
                </button>
                <button
                  onClick={() => handleExecute(alg.notation)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                >
                  <FaPlay className="text-xs" /> Execute
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Info */}
      <div className="mt-4 text-xs text-gray-600">
        <p>Total algorithms: {filteredAlgorithms.length}</p>
        <p>Click Execute to see the algorithm on a solved cube</p>
      </div>
    </div>
  )
}