# RubixSim - Interactive Rubik's Cube Simulator

A comprehensive web-based Rubik's Cube simulator designed to help you progress from beginner to expert. Built with modern web technologies for a smooth, interactive 3D experience.

## Features

### Core Functionality
- **3D Interactive Cube**: Fully rendered 3D Rubik's cube with smooth animations
- **Complete Move Set**: All standard notation moves (F, B, U, D, L, R) with prime and double variants
- **Mouse/Touch Controls**: Rotate the cube view with intuitive controls
- **Keyboard Shortcuts**: Fast input for experienced users

### Learning Tools
- **Tutorial Mode**: Step-by-step guides for beginners
- **Notation Guide**: Interactive reference for all cube moves
- **Algorithm Library**: Collection of common patterns and solutions
- **Practice Modes**: Focused training for specific techniques
  - Cross solving
  - F2L (First Two Layers)
  - OLL (Orientation of Last Layer)
  - PLL (Permutation of Last Layer)

### Advanced Features
- **Smart Scrambler**: Generate random or pattern-specific scrambles
- **Timer**: Track your solving times with statistics
- **Move Counter**: Monitor solving efficiency
- **Solution Finder**: Get optimal solutions for any position
- **Hint System**: Contextual suggestions for next moves
- **Move History**: Complete undo/redo functionality
- **Save States**: Bookmark interesting positions

### Progress Tracking
- **Learning Path**: Structured progression from beginner to advanced
- **Statistics Dashboard**: Track improvement over time
- **Achievement System**: Unlock milestones as you improve
- **Personal Records**: Best times for different categories

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

### Quick Start Guide

1. **First Time Users**: Start with Tutorial Mode to learn basic concepts
2. **Learn Notation**: Use the Notation Guide to understand move symbols
3. **Practice Basics**: Begin with the white cross in Practice Mode
4. **Track Progress**: Use the timer to measure improvement
5. **Advanced Techniques**: Progress to F2L, OLL, and PLL algorithms

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

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **3D Graphics**: Three.js for WebGL rendering
- **Build Tool**: Vite for fast development
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for app state
- **Animation**: Framer Motion for smooth transitions

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