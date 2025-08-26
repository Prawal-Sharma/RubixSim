import { useEffect, useState } from 'react'
import { FaTrophy, FaClock, FaChartLine, FaFire } from 'react-icons/fa'

interface SolveRecord {
  time: number
  moveCount: number
  scramble: string
  date: string
}

export default function Statistics() {
  const [solves, setSolves] = useState<SolveRecord[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  
  useEffect(() => {
    const loadSolves = () => {
      const stored = JSON.parse(localStorage.getItem('solves') || '[]')
      setSolves(stored)
      calculateStreak(stored)
    }
    
    loadSolves()
    const interval = setInterval(loadSolves, 1000)
    return () => clearInterval(interval)
  }, [])
  
  const calculateStreak = (solvesData: SolveRecord[]) => {
    if (solvesData.length === 0) {
      setCurrentStreak(0)
      return
    }
    
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    let streak = 0
    let checkDate = today
    
    for (let i = solvesData.length - 1; i >= 0; i--) {
      const solveDate = new Date(solvesData[i].date).toDateString()
      if (solveDate === checkDate) {
        if (checkDate === today || checkDate === yesterday) {
          streak++
          checkDate = new Date(new Date(checkDate).getTime() - 86400000).toDateString()
        }
      } else if (streak > 0) {
        break
      }
    }
    
    setCurrentStreak(streak)
  }
  
  const getStats = () => {
    if (solves.length === 0) {
      return {
        best: null,
        worst: null,
        avg5: null,
        avg12: null,
        avg100: null,
        avgAll: null,
        totalSolves: 0,
        todaySolves: 0
      }
    }
    
    const times = solves.map(s => s.time)
    const today = new Date().toDateString()
    const todaySolves = solves.filter(s => new Date(s.date).toDateString() === today)
    
    const best = Math.min(...times)
    const worst = Math.max(...times)
    
    const calculateAverage = (count: number) => {
      if (solves.length < count) return null
      const recent = solves.slice(-count).map(s => s.time)
      if (count > 2) {
        recent.sort((a, b) => a - b)
        recent.shift()
        recent.pop()
      }
      return recent.reduce((a, b) => a + b, 0) / recent.length
    }
    
    return {
      best,
      worst,
      avg5: calculateAverage(5),
      avg12: calculateAverage(12),
      avg100: calculateAverage(100),
      avgAll: times.reduce((a, b) => a + b, 0) / times.length,
      totalSolves: solves.length,
      todaySolves: todaySolves.length
    }
  }
  
  const formatTime = (ms: number | null) => {
    if (ms === null) return '-'
    const totalSeconds = ms / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = (totalSeconds % 60).toFixed(2)
    return `${minutes}:${seconds.padStart(5, '0')}`
  }
  
  const stats = getStats()
  
  const getImprovement = () => {
    if (solves.length < 10) return null
    const firstTen = solves.slice(0, 10).map(s => s.time)
    const lastTen = solves.slice(-10).map(s => s.time)
    const firstAvg = firstTen.reduce((a, b) => a + b, 0) / firstTen.length
    const lastAvg = lastTen.reduce((a, b) => a + b, 0) / lastTen.length
    const improvement = ((firstAvg - lastAvg) / firstAvg) * 100
    return improvement
  }
  
  const improvement = getImprovement()
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaTrophy className="text-yellow-500" />
            <span className="text-xs text-gray-600">Personal Best</span>
          </div>
          <p className="text-xl font-bold text-yellow-600">
            {formatTime(stats.best)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaClock className="text-blue-500" />
            <span className="text-xs text-gray-600">Avg of 5</span>
          </div>
          <p className="text-xl font-bold text-blue-600">
            {formatTime(stats.avg5)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaChartLine className="text-green-500" />
            <span className="text-xs text-gray-600">Total Solves</span>
          </div>
          <p className="text-xl font-bold text-green-600">
            {stats.totalSolves}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaFire className="text-red-500" />
            <span className="text-xs text-gray-600">Day Streak</span>
          </div>
          <p className="text-xl font-bold text-red-600">
            {currentStreak}
          </p>
        </div>
      </div>
      
      {/* Detailed Stats */}
      <div className="space-y-3 mb-6">
        <h3 className="font-semibold text-gray-700">Averages</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Ao5:</span>
            <span className="font-mono font-semibold">{formatTime(stats.avg5)}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Ao12:</span>
            <span className="font-mono font-semibold">{formatTime(stats.avg12)}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Ao100:</span>
            <span className="font-mono font-semibold">{formatTime(stats.avg100)}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Overall:</span>
            <span className="font-mono font-semibold">{formatTime(stats.avgAll)}</span>
          </div>
        </div>
      </div>
      
      {/* Session Stats */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Today's Solves:</span>
          <span className="font-semibold">{stats.todaySolves}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Best Time:</span>
          <span className="font-mono font-semibold text-green-600">
            {formatTime(stats.best)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Worst Time:</span>
          <span className="font-mono font-semibold text-red-600">
            {formatTime(stats.worst)}
          </span>
        </div>
      </div>
      
      {/* Improvement Indicator */}
      {improvement !== null && solves.length >= 10 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Improvement (last 10 vs first 10):</p>
          <p className={`text-lg font-bold ${improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
          </p>
        </div>
      )}
      
      {/* Empty State */}
      {solves.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No solves recorded yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Complete your first solve to start tracking progress!
          </p>
        </div>
      )}
    </div>
  )
}