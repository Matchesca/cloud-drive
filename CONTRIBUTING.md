# Contributing to SwiftDrive

Thank you for your interest in contributing to SwiftDrive! This document provides guidelines and instructions to help you get started.

## Code of Conduct

Please help us maintain a welcoming, inclusive environment. Be respectful and considerate in all interactions.

## Getting Started

1. **Fork the repository**
2. **Clone your fork locally**
3. **Set up the development environment** following the instructions in the README.md
4. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

Please follow these guidelines when contributing code:

### Code Style

- Follow TypeScript best practices with strict mode
- Adhere to the ESLint and Prettier configurations
- Use path aliases (`@/*`) for imports from `src/*`
- Use the `cn()` utility for conditional Tailwind classes
- Handle unused variables with underscore prefix (e.g., `_varName`)
- Use Zod for runtime type validation
- Follow Next.js App Router conventions for routing
- Write meaningful comments for non-trivial logic

### Pull Requests

1. **Keep PRs focused** on a single feature or bug fix
2. **Write descriptive PR titles and descriptions**
3. **Include tests** when applicable
4. **Ensure all tests pass** before submitting your PR
5. **Update documentation** if your changes affect the API or user interface

### Commit Messages

Follow conventional commit format:
- `feat: add new feature`
- `fix: fix bug`
- `docs: update documentation`
- `refactor: refactor code`
- `test: add tests`
- `chore: update build tasks, etc.`

## Reporting Issues

When reporting issues:
1. Check if the issue already exists
2. Use a clear, descriptive title
3. Include steps to reproduce the issue
4. Describe expected vs. actual behavior
5. Include relevant environment details

## Feature Requests

We welcome feature requests! Please:
1. Clearly describe the feature and its value
2. Explain how it aligns with SwiftDrive's goals
3. If possible, suggest an implementation approach

## Review Process

All submissions require review before being merged:
1. Maintainers will review your PR
2. You may be asked to make changes
3. Once approved, your PR will be merged

Thank you for contributing to SwiftDrive!