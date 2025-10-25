# Contributing to FHEVM SDK

Thank you for your interest in contributing to the FHEVM SDK! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/fhevm-react-template.git`
3. Add upstream remote: `git remote add upstream https://github.com/MyleneMcClure/fhevm-react-template.git`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

### Installation

```bash
# Install all dependencies
npm install --workspaces

# Build the SDK
cd packages/fhevm-sdk
npm run build

# Run examples
cd examples/nextjs-showcase
npm install
npm run dev
```

## How to Contribute

### Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) to report bugs.

Please include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Code samples
- Error messages

### Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) to suggest new features.

Please include:
- Clear feature description
- Use cases
- Proposed implementation
- Framework compatibility considerations

### Improving Documentation

Use the [Documentation Issue template](.github/ISSUE_TEMPLATE/documentation.md) for documentation improvements.

Documentation areas:
- Main README
- SDK API documentation
- Example guides
- Code comments
- Type definitions

## Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   # Build SDK
   cd packages/fhevm-sdk
   npm run build

   # Run type checks
   npx tsc --noEmit

   # Test examples
   cd ../../examples/nextjs-showcase
   npm run build
   ```

2. **Update documentation**
   - Update relevant README files
   - Add/update code comments
   - Update type definitions if needed

3. **Follow coding standards**
   - Use TypeScript for all code
   - Follow existing code style
   - Add JSDoc comments for public APIs

### Submitting

1. Push your branch to your fork
2. Open a pull request against `main`
3. Fill out the PR template completely
4. Link related issues
5. Wait for review

### PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be credited

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Define explicit types
- Avoid `any` types
- Export types for public APIs

Example:
```typescript
export interface FHEVMConfig {
  provider: Provider;
  signer?: Signer;
  contractAddress: string;
  contractABI: any[];
}

export async function createFHEVMClient(
  config: FHEVMConfig
): Promise<FHEVMClient> {
  // Implementation
}
```

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in objects/arrays
- Use descriptive variable names
- Keep functions small and focused

### Comments

- Add JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up-to-date with code

Example:
```typescript
/**
 * Encrypts a value using FHEVM encryption
 * @param client - The initialized FHEVM client
 * @param input - The value and type to encrypt
 * @returns Promise resolving to encrypted value with handles and proof
 */
export async function encryptValue(
  client: FHEVMClient,
  input: EncryptionInput
): Promise<EncryptedValue> {
  // Implementation
}
```

## Testing

### Manual Testing

1. Test your changes locally
2. Test with different frameworks (React, Next.js)
3. Test with different Node.js versions
4. Test all affected examples

### Writing Tests

If adding new features, please add tests:

```typescript
describe('encryptValue', () => {
  it('should encrypt uint8 value', async () => {
    const result = await encryptValue(client, {
      value: 25,
      type: 'uint8'
    });
    expect(result).toHaveProperty('handles');
    expect(result).toHaveProperty('inputProof');
  });
});
```

## Documentation

### README Updates

When adding features, update:
- Main README.md
- Relevant example READMEs
- API documentation in packages/fhevm-sdk/README.md

### Code Documentation

- Add JSDoc comments for all public functions
- Document parameters and return types
- Include usage examples
- Explain complex logic

### Examples

When adding new features, consider adding:
- Code examples in documentation
- Usage examples in example apps
- Demo in Next.js showcase

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/          # Core SDK
│       ├── src/
│       │   ├── core/       # Framework-agnostic core
│       │   ├── hooks/      # React hooks (optional)
│       │   └── utils/      # Utilities
│       └── README.md       # SDK documentation
├── examples/
│   ├── museum-tracker/     # Smart contract example
│   └── nextjs-showcase/    # Next.js example
└── .github/                # GitHub configuration

```

## Areas for Contribution

### High Priority

- Vue.js framework integration
- Svelte framework integration
- Additional example applications
- Performance optimizations
- Test coverage improvements

### Medium Priority

- Advanced encryption patterns
- Batch operation optimizations
- Developer CLI tools
- Additional utility functions
- Documentation improvements

### Good First Issues

Look for issues labeled `good first issue` for beginner-friendly contributions.

## Questions?

- Open a [GitHub Issue](https://github.com/MyleneMcClure/fhevm-react-template/issues)
- Check existing documentation
- Review closed issues for similar questions

## Recognition

Contributors will be:
- Listed in the project's contributors
- Credited in release notes
- Mentioned in the README (for significant contributions)

---

Thank you for contributing to FHEVM SDK! Your efforts help build a better privacy-preserving Web3 ecosystem.
