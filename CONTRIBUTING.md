# Contributing to RubixSim

Thank you for your interest in contributing to RubixSim! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the problem
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas you might have

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Prawal-Sharma/RubixSim.git
   cd RubixSim
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   npm install
   npm run dev
   npm run build
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## 📁 Project Structure

```
RubixSim/
├── src/
│   ├── components/      # React components
│   │   ├── Cube3D.tsx   # 3D cube rendering
│   │   ├── Controls.tsx # Control panel
│   │   ├── Tutorial.tsx # Tutorial system
│   │   └── ...
│   ├── store/           # State management
│   │   └── cubeStore.ts # Zustand store
│   ├── utils/           # Utility functions
│   │   └── cubeUtils.ts # Cube logic
│   ├── types/           # TypeScript types
│   │   └── cube.ts      # Type definitions
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🎨 Code Style Guidelines

### TypeScript/React
- Use functional components with hooks
- Properly type all props and state
- Use descriptive variable names
- Keep components focused and small

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors

### Git Commits
- Use clear, concise commit messages
- Start with a verb (Add, Fix, Update, etc.)
- Reference issues when applicable

## 🧪 Testing

Before submitting a PR, ensure:
- No TypeScript errors: `npx tsc --noEmit`
- No linting errors: `npm run lint`
- Build succeeds: `npm run build`
- All features work in development mode

## 📚 Adding New Features

### Adding a New Algorithm
1. Add to `src/components/AlgorithmLibrary.tsx`
2. Include name, notation, category, and description
3. Test the algorithm execution

### Adding a New Practice Case
1. Update `src/components/PracticeMode.tsx`
2. Add setup and solution algorithms
3. Include helpful hints

### Adding a New Move Type
1. Update `src/types/cube.ts` with the notation
2. Implement logic in `src/utils/cubeUtils.ts`
3. Add keyboard shortcut if applicable

## 🚀 Performance Considerations

- Minimize re-renders in React components
- Use memoization where appropriate
- Keep bundle size under control
- Optimize 3D rendering performance

## 📝 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for complex functions
- Update this guide for process changes

## ❓ Questions?

Feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Join the community discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to RubixSim! 🎉