# Technical Documentation - RubixSim

## Architecture Overview

RubixSim is built as a single-page application (SPA) using React with TypeScript. The architecture follows a component-based design pattern with centralized state management.

## Core Technologies

### Frontend Framework
- **React 18**: Provides the component-based UI framework
- **TypeScript 5**: Adds static typing for better code quality and IDE support

### 3D Rendering
- **Three.js**: Core 3D graphics library for WebGL
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for common 3D patterns

### State Management
- **Zustand**: Lightweight state management solution
  - Single store pattern for cube state
  - Automatic React component updates
  - DevTools integration for debugging

### Build & Development
- **Vite**: Fast build tool with HMR (Hot Module Replacement)
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing for Tailwind

## Key Components

### Cube3D Component
```typescript
// Renders the 3D cube using Three.js
- Uses 27 cubies (3x3x3 minus center)
- Maps cube state to 3D positions
- Handles material colors for each face
- Implements OrbitControls for rotation
```

### CubeStore (Zustand)
```typescript
// Centralized state management
- cubeState: Current cube configuration
- moveHistory: Array of moves for undo/redo
- timer: Solving time tracking
- executeMove(): Applies moves to cube
- scrambleCube(): Generates random scrambles
```

### Cube Utils
```typescript
// Core cube manipulation logic
- applyMove(): Implements all 54 move types
- rotateFace(): Matrix rotation for faces
- parseAlgorithm(): Converts notation to moves
- generateScramble(): Creates random sequences
```

## Cube Mathematics

### Coordinate System
- Origin (0,0,0) is the cube center
- X-axis: Left (-1) to Right (+1)
- Y-axis: Down (-1) to Up (+1)
- Z-axis: Back (-1) to Front (+1)

### Face Mapping
```javascript
Front (F): z = 1
Back (B): z = -1
Up (U): y = 1
Down (D): y = -1
Left (L): x = -1
Right (R): x = 1
```

### Move Implementation
Each move involves:
1. Rotating the face 90° (clockwise/counter-clockwise)
2. Cycling edge pieces around the face
3. Maintaining color positions

### Rotation Algorithm
```typescript
// Clockwise rotation matrix
newPos[j][n-1-i] = oldPos[i][j]

// Counter-clockwise rotation matrix
newPos[n-1-j][i] = oldPos[i][j]
```

## Performance Optimizations

### React Optimizations
- Memoization of expensive calculations
- Proper key usage in lists
- Minimal state updates

### 3D Rendering
- Instanced geometry for cubies
- Optimized material usage
- Frustum culling enabled

### Bundle Size
- Code splitting for routes
- Tree shaking for unused code
- Dynamic imports for heavy libraries

## Data Persistence

### Local Storage Schema
```javascript
{
  solves: [
    {
      time: number,        // Milliseconds
      moveCount: number,   // Total moves
      scramble: string,    // Scramble notation
      date: string        // ISO timestamp
    }
  ],
  favorites: string[],     // Algorithm names
  settings: {
    theme: string,
    animationSpeed: number
  }
}
```

## Algorithm Notation

### Basic Moves
- F, B, U, D, L, R: 90° clockwise
- F', B', U', D', L', R': 90° counter-clockwise
- F2, B2, U2, D2, L2, R2: 180°

### Slice Moves
- M: Middle slice (between L and R)
- E: Equatorial slice (between U and D)
- S: Standing slice (between F and B)

### Rotations
- x: Rotate entire cube on R axis
- y: Rotate entire cube on U axis
- z: Rotate entire cube on F axis

## State Flow

```
User Input → Event Handler → Store Action → State Update → React Re-render → UI Update
     ↑                                            ↓
     └────────────── 3D Cube Update ←─────────────┘
```

## Testing Strategy

### Unit Tests
- Cube manipulation functions
- Algorithm parsing
- State management logic

### Integration Tests
- Component interactions
- Timer functionality
- Save/load operations

### E2E Tests
- Complete solve flows
- Tutorial progression
- Statistics tracking

## Security Considerations

- No external API calls
- All data stored locally
- No user authentication required
- XSS protection via React
- Input validation for algorithms

## Browser APIs Used

- **LocalStorage**: Data persistence
- **Performance API**: Timer precision
- **WebGL**: 3D rendering
- **Keyboard API**: Hotkey support
- **Touch API**: Mobile controls

## Development Workflow

1. **Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Type Checking**
   ```bash
   npx tsc --noEmit
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

4. **Building**
   ```bash
   npm run build
   ```

5. **Preview Production**
   ```bash
   npm run preview
   ```

## Deployment

The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build output is in the `dist/` directory.

## Future Enhancements

### Planned Features
- [ ] WebAssembly solver for optimal solutions
- [ ] Multiplayer racing mode
- [ ] Custom color schemes
- [ ] Video tutorials integration
- [ ] Mobile app versions
- [ ] Cloud sync for progress

### Performance Improvements
- [ ] Web Workers for heavy calculations
- [ ] IndexedDB for larger data storage
- [ ] Service Worker for offline mode
- [ ] GPU acceleration for animations

## Troubleshooting

### Common Issues

1. **3D Cube Not Rendering**
   - Check WebGL support in browser
   - Verify Three.js dependencies
   - Check console for errors

2. **Timer Not Working**
   - Ensure Performance API is available
   - Check browser permissions

3. **Moves Not Executing**
   - Verify keyboard event listeners
   - Check for focus issues
   - Validate move notation

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to the project.

## License

MIT License - See [LICENSE](./LICENSE) for details.