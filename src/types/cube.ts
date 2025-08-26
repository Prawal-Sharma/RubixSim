export type Face = 'F' | 'B' | 'U' | 'D' | 'L' | 'R'
export type Color = 'white' | 'yellow' | 'red' | 'orange' | 'green' | 'blue'
export type MoveNotation = Face | `${Face}'` | `${Face}2` | 'M' | 'E' | 'S' | 'x' | 'y' | 'z' |
  `M'` | `E'` | `S'` | `x'` | `y'` | `z'` | 'M2' | 'E2' | 'S2' | 'x2' | 'y2' | 'z2'

export interface CubeState {
  faces: {
    [key in Face]: Color[][]
  }
}

export interface Move {
  notation: MoveNotation
  timestamp: number
}

export interface Algorithm {
  name: string
  notation: string
  category: 'OLL' | 'PLL' | 'F2L' | 'Basic' | 'Advanced'
  description?: string
}