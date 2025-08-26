# RubixSim - Interactive Rubik's Cube Simulator

🎯 **Your complete learning platform for mastering the Rubik's Cube**

A comprehensive web-based Rubik's Cube simulator designed to help you progress from beginner to expert. Built with modern web technologies for a smooth, interactive 3D experience with advanced training features and detailed progress tracking.

## 🚀 Features

### Core Functionality
- **3D Interactive Cube**: Fully rendered 3D Rubik's cube with smooth animations
- **Complete Move Set**: All standard notation moves including:
  - Basic moves (F, B, U, D, L, R)
  - Prime variants (F', B', U', D', L', R')
  - Double moves (F2, B2, U2, D2, L2, R2)
  - Slice moves (M, E, S and variants)
  - Cube rotations (x, y, z and variants)
- **Mouse/Touch Controls**: Rotate the cube view with intuitive controls
- **Keyboard Shortcuts**: Fast input for experienced users

### 📚 Learning Tools
- **Interactive Tutorial**: 11-step beginner guide with the layer-by-layer method
- **Notation Guide**: Interactive reference for all 54 possible cube moves
- **Algorithm Library**: 20+ pre-loaded algorithms organized by category
- **Practice Mode**: Focused training with 4 practice sets:
  - White Cross techniques
  - F2L (First Two Layers) - 41 cases
  - OLL (Orientation of Last Layer) - 57 algorithms
  - PLL (Permutation of Last Layer) - 21 algorithms

### 📊 Training & Analytics
- **Smart Scrambler**: Generate random 20-move scrambles
- **Professional Timer**: Track solving times with auto-start on first move
- **Move Counter**: Monitor solving efficiency in real-time
- **Comprehensive Statistics**:
  - Personal best (PB) tracking
  - Average of 5, 12, 100, and overall
  - Daily solve counter
  - Streak tracking
  - Improvement percentage calculator
- **Session Management**: Track attempts per practice session
- **Move History**: Complete undo/redo functionality (Ctrl+Z/Ctrl+Shift+Z)

### 🎯 Progress Tracking
- **Automatic Save**: All solves saved to local storage
- **Historical Data**: View all past solves with time, moves, and scrambles
- **Performance Trends**: Track improvement over time
- **Daily Goals**: Streak counter to encourage consistent practice

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/Prawal-Sharma/RubixSim.git
cd RubixSim

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🎮 Quick Start Guide

#### For Complete Beginners:
1. **Start with the Tutorial** (Tutorial Tab)
   - Follow the 11-step beginner method
   - Learn basic notation and concepts
   - Practice each step before moving on

2. **Understand Notation** (Notation Tab)
   - Learn what F, R, U, etc. mean
   - Practice individual moves
   - Understand prime (') and double (2) modifiers

3. **Practice Basic Patterns** (Practice Tab)
   - Start with "White Cross" exercises
   - Use the setup button to create practice scenarios
   - Try solving before viewing solutions

#### For Intermediate Cubers:
1. **Learn F2L** (Practice Tab → F2L)
   - Master the 41 F2L cases
   - Focus on recognition and execution
   - Track your progress with session attempts

2. **Study Algorithms** (Algorithms Tab)
   - Browse categorized algorithms
   - Save favorites for quick access
   - Practice execution with visual feedback

3. **Time Your Solves** (Controls Tab)
   - Use spacebar to start/stop timer
   - Generate scrambles with 'N' key
   - Track your averages in Statistics

#### For Advanced Cubers:
1. **Master OLL/PLL** (Practice Tab)
   - Learn all 57 OLL algorithms
   - Master all 21 PLL algorithms
   - Focus on recognition speed

2. **Analyze Performance** (Statistics Tab)
   - Monitor Ao5, Ao12, Ao100
   - Track improvement percentage
   - Identify weak points

3. **Optimize Efficiency** (Controls Tab)
   - Minimize move count
   - Practice finger tricks
   - Use keyboard shortcuts for speed

## Keyboard Controls

### Basic Moves
- `F` - Front face clockwise
- `Shift + F` - Front face counter-clockwise (F')
- `B` - Back face clockwise
- `Shift + B` - Back face counter-clockwise (B')
- `U` - Up face clockwise
- `Shift + U` - Up face counter-clockwise (U')
- `D` - Down face clockwise
- `Shift + D` - Down face counter-clockwise (D')
- `L` - Left face clockwise
- `Shift + L` - Left face counter-clockwise (L')
- `R` - Right face clockwise
- `Shift + R` - Right face counter-clockwise (R')

### Wide Moves
- `W` - Wide moves modifier (e.g., `W + R` for Rw)
- `M` - Middle slice
- `E` - Equatorial slice
- `S` - Standing slice

### Cube Rotations
- `X` - Rotate entire cube on R axis
- `Y` - Rotate entire cube on U axis
- `Z` - Rotate entire cube on F axis

### Controls
- `Space` - Start/stop timer
- `Esc` - Reset cube
- `Ctrl + Z` - Undo last move
- `Ctrl + Shift + Z` - Redo move
- `H` - Toggle hint system
- `N` - New scramble

## Learning Path

### Beginner Method (Layer by Layer)
1. **White Cross**: Form a plus sign on the white face
2. **White Corners**: Complete the first layer
3. **Middle Layer**: Position edge pieces
4. **Yellow Cross**: Form cross on top
5. **Yellow Corners**: Position and orient
6. **Final Permutation**: Complete the cube

### CFOP Method (Advanced)
1. **Cross**: Efficient cross solving (< 8 moves)
2. **F2L**: First two layers simultaneously (41 cases)
3. **OLL**: Orient last layer (57 algorithms)
4. **PLL**: Permute last layer (21 algorithms)

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript 5
- **3D Graphics**: Three.js + React Three Fiber for WebGL rendering
- **Build Tool**: Vite 5 for lightning-fast HMR
- **Styling**: Tailwind CSS 3 for responsive design
- **State Management**: Zustand for efficient state updates
- **Keyboard Handling**: React Hotkeys Hook for shortcuts
- **Icons**: React Icons for UI elements

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with WebGL support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Rubik's Cube notation standards from the World Cube Association
- Algorithm database from popular speedcubing resources
- Three.js community for excellent 3D graphics support

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ for the cubing community