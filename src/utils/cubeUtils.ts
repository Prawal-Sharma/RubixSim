import { CubeState, Face, Color, MoveNotation } from '../types/cube'

export const FACE_COLORS: Record<Face, Color> = {
  U: 'white',
  D: 'yellow',
  F: 'green',
  B: 'blue',
  L: 'orange',
  R: 'red'
}

export const COLOR_HEX: Record<Color, string> = {
  white: '#FFFFFF',
  yellow: '#FFD500',
  red: '#C41E3A',
  orange: '#FF5800',
  green: '#009E60',
  blue: '#0051BA'
}

export function createSolvedCube(): CubeState {
  const faces: CubeState['faces'] = {} as CubeState['faces']
  
  Object.entries(FACE_COLORS).forEach(([face, color]) => {
    faces[face as Face] = Array(3).fill(null).map(() => Array(3).fill(color))
  })
  
  return { faces }
}

export function rotateFaceClockwise(face: Color[][]): Color[][] {
  const n = face.length
  const rotated = Array(n).fill(null).map(() => Array(n).fill('white' as Color))
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = face[i][j]
    }
  }
  
  return rotated
}

export function rotateFaceCounterClockwise(face: Color[][]): Color[][] {
  const n = face.length
  const rotated = Array(n).fill(null).map(() => Array(n).fill('white' as Color))
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[n - 1 - j][i] = face[i][j]
    }
  }
  
  return rotated
}

export function applyMove(state: CubeState, move: MoveNotation): CubeState {
  const newState = JSON.parse(JSON.stringify(state)) as CubeState
  
  switch (move) {
    case 'F':
      newState.faces.F = rotateFaceClockwise(newState.faces.F)
      rotateEdgesF(newState)
      break
    case "F'":
      newState.faces.F = rotateFaceCounterClockwise(newState.faces.F)
      rotateEdgesFPrime(newState)
      break
    case 'F2':
      return applyMove(applyMove(state, 'F'), 'F')
    case 'U':
      newState.faces.U = rotateFaceClockwise(newState.faces.U)
      rotateEdgesU(newState)
      break
    case "U'":
      newState.faces.U = rotateFaceCounterClockwise(newState.faces.U)
      rotateEdgesUPrime(newState)
      break
    case 'U2':
      return applyMove(applyMove(state, 'U'), 'U')
    case 'R':
      newState.faces.R = rotateFaceClockwise(newState.faces.R)
      rotateEdgesR(newState)
      break
    case "R'":
      newState.faces.R = rotateFaceCounterClockwise(newState.faces.R)
      rotateEdgesRPrime(newState)
      break
    case 'R2':
      return applyMove(applyMove(state, 'R'), 'R')
    case 'L':
      newState.faces.L = rotateFaceClockwise(newState.faces.L)
      rotateEdgesL(newState)
      break
    case "L'":
      newState.faces.L = rotateFaceCounterClockwise(newState.faces.L)
      rotateEdgesLPrime(newState)
      break
    case 'L2':
      return applyMove(applyMove(state, 'L'), 'L')
    case 'D':
      newState.faces.D = rotateFaceClockwise(newState.faces.D)
      rotateEdgesD(newState)
      break
    case "D'":
      newState.faces.D = rotateFaceCounterClockwise(newState.faces.D)
      rotateEdgesDPrime(newState)
      break
    case 'D2':
      return applyMove(applyMove(state, 'D'), 'D')
    case 'B':
      newState.faces.B = rotateFaceClockwise(newState.faces.B)
      rotateEdgesB(newState)
      break
    case "B'":
      newState.faces.B = rotateFaceCounterClockwise(newState.faces.B)
      rotateEdgesBPrime(newState)
      break
    case 'B2':
      return applyMove(applyMove(state, 'B'), 'B')
    
    // Slice moves
    case 'M':
      rotateM(newState)
      break
    case "M'":
      rotateMPrime(newState)
      break
    case 'M2':
      return applyMove(applyMove(state, 'M'), 'M')
    case 'E':
      rotateE(newState)
      break
    case "E'":
      rotateEPrime(newState)
      break
    case 'E2':
      return applyMove(applyMove(state, 'E'), 'E')
    case 'S':
      rotateS(newState)
      break
    case "S'":
      rotateSPrime(newState)
      break
    case 'S2':
      return applyMove(applyMove(state, 'S'), 'S')
      
    // Cube rotations
    case 'x':
      return applyMove(applyMove(applyMove(state, 'R'), "M'"), "L'")
    case "x'":
      return applyMove(applyMove(applyMove(state, "R'"), 'M'), 'L')
    case 'x2':
      return applyMove(applyMove(state, 'x'), 'x')
    case 'y':
      return applyMove(applyMove(applyMove(state, 'U'), "E'"), "D'")
    case "y'":
      return applyMove(applyMove(applyMove(state, "U'"), 'E'), 'D')
    case 'y2':
      return applyMove(applyMove(state, 'y'), 'y')
    case 'z':
      return applyMove(applyMove(applyMove(state, 'F'), 'S'), "B'")
    case "z'":
      return applyMove(applyMove(applyMove(state, "F'"), "S'"), 'B')
    case 'z2':
      return applyMove(applyMove(state, 'z'), 'z')
      
    default:
      console.warn(`Unknown move: ${move}`)
      return state
  }
  
  return newState
}

function rotateEdgesF(state: CubeState) {
  const temp = [...state.faces.U[2]]
  state.faces.U[2] = [state.faces.L[2][2], state.faces.L[1][2], state.faces.L[0][2]]
  state.faces.L[0][2] = state.faces.D[0][0]
  state.faces.L[1][2] = state.faces.D[0][1]
  state.faces.L[2][2] = state.faces.D[0][2]
  state.faces.D[0] = [state.faces.R[2][0], state.faces.R[1][0], state.faces.R[0][0]]
  state.faces.R[0][0] = temp[0]
  state.faces.R[1][0] = temp[1]
  state.faces.R[2][0] = temp[2]
}

function rotateEdgesFPrime(state: CubeState) {
  const temp = [...state.faces.U[2]]
  state.faces.U[2] = [state.faces.R[0][0], state.faces.R[1][0], state.faces.R[2][0]]
  state.faces.R[0][0] = state.faces.D[0][2]
  state.faces.R[1][0] = state.faces.D[0][1]
  state.faces.R[2][0] = state.faces.D[0][0]
  state.faces.D[0] = [state.faces.L[0][2], state.faces.L[1][2], state.faces.L[2][2]]
  state.faces.L[0][2] = temp[2]
  state.faces.L[1][2] = temp[1]
  state.faces.L[2][2] = temp[0]
}

function rotateEdgesU(state: CubeState) {
  const temp = [...state.faces.F[0]]
  state.faces.F[0] = state.faces.R[0]
  state.faces.R[0] = state.faces.B[0]
  state.faces.B[0] = state.faces.L[0]
  state.faces.L[0] = temp
}

function rotateEdgesUPrime(state: CubeState) {
  const temp = [...state.faces.F[0]]
  state.faces.F[0] = state.faces.L[0]
  state.faces.L[0] = state.faces.B[0]
  state.faces.B[0] = state.faces.R[0]
  state.faces.R[0] = temp
}

function rotateEdgesR(state: CubeState) {
  const temp = [state.faces.F[0][2], state.faces.F[1][2], state.faces.F[2][2]]
  state.faces.F[0][2] = state.faces.D[0][2]
  state.faces.F[1][2] = state.faces.D[1][2]
  state.faces.F[2][2] = state.faces.D[2][2]
  state.faces.D[0][2] = state.faces.B[2][0]
  state.faces.D[1][2] = state.faces.B[1][0]
  state.faces.D[2][2] = state.faces.B[0][0]
  state.faces.B[0][0] = state.faces.U[2][2]
  state.faces.B[1][0] = state.faces.U[1][2]
  state.faces.B[2][0] = state.faces.U[0][2]
  state.faces.U[0][2] = temp[0]
  state.faces.U[1][2] = temp[1]
  state.faces.U[2][2] = temp[2]
}

function rotateEdgesRPrime(state: CubeState) {
  const temp = [state.faces.F[0][2], state.faces.F[1][2], state.faces.F[2][2]]
  state.faces.F[0][2] = state.faces.U[0][2]
  state.faces.F[1][2] = state.faces.U[1][2]
  state.faces.F[2][2] = state.faces.U[2][2]
  state.faces.U[0][2] = state.faces.B[2][0]
  state.faces.U[1][2] = state.faces.B[1][0]
  state.faces.U[2][2] = state.faces.B[0][0]
  state.faces.B[0][0] = state.faces.D[2][2]
  state.faces.B[1][0] = state.faces.D[1][2]
  state.faces.B[2][0] = state.faces.D[0][2]
  state.faces.D[0][2] = temp[0]
  state.faces.D[1][2] = temp[1]
  state.faces.D[2][2] = temp[2]
}

function rotateEdgesL(state: CubeState) {
  const temp = [state.faces.F[0][0], state.faces.F[1][0], state.faces.F[2][0]]
  state.faces.F[0][0] = state.faces.U[0][0]
  state.faces.F[1][0] = state.faces.U[1][0]
  state.faces.F[2][0] = state.faces.U[2][0]
  state.faces.U[0][0] = state.faces.B[2][2]
  state.faces.U[1][0] = state.faces.B[1][2]
  state.faces.U[2][0] = state.faces.B[0][2]
  state.faces.B[0][2] = state.faces.D[2][0]
  state.faces.B[1][2] = state.faces.D[1][0]
  state.faces.B[2][2] = state.faces.D[0][0]
  state.faces.D[0][0] = temp[0]
  state.faces.D[1][0] = temp[1]
  state.faces.D[2][0] = temp[2]
}

function rotateEdgesLPrime(state: CubeState) {
  const temp = [state.faces.F[0][0], state.faces.F[1][0], state.faces.F[2][0]]
  state.faces.F[0][0] = state.faces.D[0][0]
  state.faces.F[1][0] = state.faces.D[1][0]
  state.faces.F[2][0] = state.faces.D[2][0]
  state.faces.D[0][0] = state.faces.B[2][2]
  state.faces.D[1][0] = state.faces.B[1][2]
  state.faces.D[2][0] = state.faces.B[0][2]
  state.faces.B[0][2] = state.faces.U[2][0]
  state.faces.B[1][2] = state.faces.U[1][0]
  state.faces.B[2][2] = state.faces.U[0][0]
  state.faces.U[0][0] = temp[0]
  state.faces.U[1][0] = temp[1]
  state.faces.U[2][0] = temp[2]
}

function rotateEdgesD(state: CubeState) {
  const temp = [...state.faces.F[2]]
  state.faces.F[2] = state.faces.L[2]
  state.faces.L[2] = state.faces.B[2]
  state.faces.B[2] = state.faces.R[2]
  state.faces.R[2] = temp
}

function rotateEdgesDPrime(state: CubeState) {
  const temp = [...state.faces.F[2]]
  state.faces.F[2] = state.faces.R[2]
  state.faces.R[2] = state.faces.B[2]
  state.faces.B[2] = state.faces.L[2]
  state.faces.L[2] = temp
}

function rotateEdgesB(state: CubeState) {
  const temp = [...state.faces.U[0]]
  state.faces.U[0] = [state.faces.R[0][2], state.faces.R[1][2], state.faces.R[2][2]]
  state.faces.R[0][2] = state.faces.D[2][2]
  state.faces.R[1][2] = state.faces.D[2][1]
  state.faces.R[2][2] = state.faces.D[2][0]
  state.faces.D[2] = [state.faces.L[2][0], state.faces.L[1][0], state.faces.L[0][0]]
  state.faces.L[0][0] = temp[2]
  state.faces.L[1][0] = temp[1]
  state.faces.L[2][0] = temp[0]
}

function rotateEdgesBPrime(state: CubeState) {
  const temp = [...state.faces.U[0]]
  state.faces.U[0] = [state.faces.L[2][0], state.faces.L[1][0], state.faces.L[0][0]]
  state.faces.L[0][0] = state.faces.D[2][0]
  state.faces.L[1][0] = state.faces.D[2][1]
  state.faces.L[2][0] = state.faces.D[2][2]
  state.faces.D[2] = [state.faces.R[2][2], state.faces.R[1][2], state.faces.R[0][2]]
  state.faces.R[0][2] = temp[0]
  state.faces.R[1][2] = temp[1]
  state.faces.R[2][2] = temp[2]
}

// Slice move implementations
function rotateM(state: CubeState) {
  const temp = [state.faces.F[0][1], state.faces.F[1][1], state.faces.F[2][1]]
  state.faces.F[0][1] = state.faces.U[0][1]
  state.faces.F[1][1] = state.faces.U[1][1]
  state.faces.F[2][1] = state.faces.U[2][1]
  state.faces.U[0][1] = state.faces.B[2][1]
  state.faces.U[1][1] = state.faces.B[1][1]
  state.faces.U[2][1] = state.faces.B[0][1]
  state.faces.B[0][1] = state.faces.D[2][1]
  state.faces.B[1][1] = state.faces.D[1][1]
  state.faces.B[2][1] = state.faces.D[0][1]
  state.faces.D[0][1] = temp[0]
  state.faces.D[1][1] = temp[1]
  state.faces.D[2][1] = temp[2]
}

function rotateMPrime(state: CubeState) {
  const temp = [state.faces.F[0][1], state.faces.F[1][1], state.faces.F[2][1]]
  state.faces.F[0][1] = state.faces.D[0][1]
  state.faces.F[1][1] = state.faces.D[1][1]
  state.faces.F[2][1] = state.faces.D[2][1]
  state.faces.D[0][1] = state.faces.B[2][1]
  state.faces.D[1][1] = state.faces.B[1][1]
  state.faces.D[2][1] = state.faces.B[0][1]
  state.faces.B[0][1] = state.faces.U[2][1]
  state.faces.B[1][1] = state.faces.U[1][1]
  state.faces.B[2][1] = state.faces.U[0][1]
  state.faces.U[0][1] = temp[0]
  state.faces.U[1][1] = temp[1]
  state.faces.U[2][1] = temp[2]
}

function rotateE(state: CubeState) {
  const temp = [state.faces.F[1][0], state.faces.F[1][1], state.faces.F[1][2]]
  state.faces.F[1][0] = state.faces.L[1][0]
  state.faces.F[1][1] = state.faces.L[1][1]
  state.faces.F[1][2] = state.faces.L[1][2]
  state.faces.L[1][0] = state.faces.B[1][0]
  state.faces.L[1][1] = state.faces.B[1][1]
  state.faces.L[1][2] = state.faces.B[1][2]
  state.faces.B[1][0] = state.faces.R[1][0]
  state.faces.B[1][1] = state.faces.R[1][1]
  state.faces.B[1][2] = state.faces.R[1][2]
  state.faces.R[1][0] = temp[0]
  state.faces.R[1][1] = temp[1]
  state.faces.R[1][2] = temp[2]
}

function rotateEPrime(state: CubeState) {
  const temp = [state.faces.F[1][0], state.faces.F[1][1], state.faces.F[1][2]]
  state.faces.F[1][0] = state.faces.R[1][0]
  state.faces.F[1][1] = state.faces.R[1][1]
  state.faces.F[1][2] = state.faces.R[1][2]
  state.faces.R[1][0] = state.faces.B[1][0]
  state.faces.R[1][1] = state.faces.B[1][1]
  state.faces.R[1][2] = state.faces.B[1][2]
  state.faces.B[1][0] = state.faces.L[1][0]
  state.faces.B[1][1] = state.faces.L[1][1]
  state.faces.B[1][2] = state.faces.L[1][2]
  state.faces.L[1][0] = temp[0]
  state.faces.L[1][1] = temp[1]
  state.faces.L[1][2] = temp[2]
}

function rotateS(state: CubeState) {
  const temp = [state.faces.U[1][0], state.faces.U[1][1], state.faces.U[1][2]]
  state.faces.U[1][0] = state.faces.L[2][1]
  state.faces.U[1][1] = state.faces.L[1][1]
  state.faces.U[1][2] = state.faces.L[0][1]
  state.faces.L[0][1] = state.faces.D[1][0]
  state.faces.L[1][1] = state.faces.D[1][1]
  state.faces.L[2][1] = state.faces.D[1][2]
  state.faces.D[1][0] = state.faces.R[2][1]
  state.faces.D[1][1] = state.faces.R[1][1]
  state.faces.D[1][2] = state.faces.R[0][1]
  state.faces.R[0][1] = temp[0]
  state.faces.R[1][1] = temp[1]
  state.faces.R[2][1] = temp[2]
}

function rotateSPrime(state: CubeState) {
  const temp = [state.faces.U[1][0], state.faces.U[1][1], state.faces.U[1][2]]
  state.faces.U[1][0] = state.faces.R[0][1]
  state.faces.U[1][1] = state.faces.R[1][1]
  state.faces.U[1][2] = state.faces.R[2][1]
  state.faces.R[0][1] = state.faces.D[1][2]
  state.faces.R[1][1] = state.faces.D[1][1]
  state.faces.R[2][1] = state.faces.D[1][0]
  state.faces.D[1][0] = state.faces.L[0][1]
  state.faces.D[1][1] = state.faces.L[1][1]
  state.faces.D[1][2] = state.faces.L[2][1]
  state.faces.L[0][1] = temp[2]
  state.faces.L[1][1] = temp[1]
  state.faces.L[2][1] = temp[0]
}

export function parseAlgorithm(algorithm: string): MoveNotation[] {
  const moves = algorithm.split(' ').filter(move => move)
  const validMoves: MoveNotation[] = []
  
  for (const move of moves) {
    if (isValidMove(move)) {
      validMoves.push(move as MoveNotation)
    } else {
      console.warn(`Invalid move notation: ${move}`)
    }
  }
  
  return validMoves
}

function isValidMove(move: string): boolean {
  const validMoves = [
    'F', "F'", 'F2', 'B', "B'", 'B2',
    'U', "U'", 'U2', 'D', "D'", 'D2',
    'L', "L'", 'L2', 'R', "R'", 'R2',
    'M', "M'", 'M2', 'E', "E'", 'E2',
    'S', "S'", 'S2', 'x', "x'", 'x2',
    'y', "y'", 'y2', 'z', "z'", 'z2'
  ]
  return validMoves.includes(move)
}

export function generateScramble(length: number = 20): string {
  const moves: Face[] = ['F', 'B', 'U', 'D', 'L', 'R']
  const modifiers = ['', "'", '2']
  const scramble: string[] = []
  let lastMove: Face | null = null
  
  for (let i = 0; i < length; i++) {
    let move: Face
    do {
      move = moves[Math.floor(Math.random() * moves.length)]
    } while (move === lastMove)
    
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)]
    scramble.push(move + modifier)
    lastMove = move
  }
  
  return scramble.join(' ')
}