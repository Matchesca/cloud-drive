# SwiftDrive

A lightning-fast, sleek, and modern self-hosted cloud storage solution.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Common Commands](#common-commands)
  - [Codebase Guidelines](#codebase-guidelines)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

SwiftDrive is designed to be a self-hosted cloud storage solution that just works—fast, uncluttered, and modern. Rather than trying to be a one–size–fits–all solution like other alternatives, SwiftDrive focuses on one task: storing and managing files with the kind of polish you’d expect from a modern, Apple-inspired UX.

Key highlights include:

- **Simplicity and speed**: Get your files up or down in a flash.
- **Clean design**: A minimalist interface that puts your content first.
- **Robust user management**: Role-based controls (e.g., admin, regular users) and per-user quotas.
- **Enhanced security**: Your data is private and completely under your control as it’s self-hosted.
- **Modular Deployment**: Separate frontend and backend repositories orchestrated with Docker Compose (deployment script in progress).

## Features

- **Fast & Lightweight**: Optimized for speedy file uploads and downloads.
- **User-Friendly Interface**: A sleek, intuitive UI inspired by the best in modern design.
- **User Management**: Role-based access controls, admin dashboards, and user quotas.
- **Secure File Sharing**: Easily share files securely with anyone.
- **Self-Hosted Privacy**: Maintain full control over your data in a secure environment.

## Getting Started

These instructions will help you set up SwiftDrive on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

SwiftDrive is structured as two separate repositories (frontend and backend). A deploy script is provided (currently under development) to help manage both. For now, follow these steps:

1. **Clone the Repositories:**

   ```bash
   mkdir ~/swiftdrive && cd ~/swiftdrive
   git clone https://github.com/matchesca/cloud-drive.git frontend
   git clone https://github.com/matchesca/cloud-drive-server.git backend
   ```

2. **Deploy Script:**

   A deploy script is included to help set up both repositories and manage Docker Compose. Make sure you have the proper permissions and run:

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

_Note: Detailed deployment instructions are under active development and will be updated here soon._

## Project Structure

SwiftDrive is split into two main codebases:

- **Frontend Repository**: Contains the Next.js application, featuring the modern UI/UX and all client-side logic.
- **Backend Repository**: Manages API endpoints, file storage logic, user management (with roles and quotas), and integration with WebDAV.

The deploy script coordinates these repositories using Docker Compose for an integrated experience.

## Development

When working on SwiftDrive, please adhere to the guidelines below to ensure a high-quality and consistent codebase.

### Common Commands

The following commands are provided in the `package.json` for both repositories.

- **Development Server:**
  ```bash
  npm run dev
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Linting:**
  ```bash
  npm run lint
  npm run lint:fix
  ```
- **Type Checking (TypeScript):**
  ```bash
  npm run typecheck
  ```
- **Formatting (Prettier):**
  ```bash
  npm run format:check
  npm run format:write
  ```
- **Database Tasks (Backend-specific):**
  ```bash
  npm run db:generate
  npm run db:studio
  ```

### Codebase Guidelines

- **TypeScript**: Use strict types with `noUncheckedIndexedAccess`. Prefer inline type imports:
  ```typescript
  import type { MyType } from "module";
  ```
- **Path Aliases**: Use `@/*` for importing files from `src/*`.
- **Tailwind Utilities**: Use utilities like `clsx` or `twMerge` (via the helper `cn()`) for conditional styling.
- **Unused Variables**: Prefix intentionally unused variables with an underscore (e.g., `_unused`).
- **Runtime Validation**: Use **Zod** for validating data at runtime.
- **Routing**: Follow Next.js App Router conventions where applicable.
- **Database**: Use Drizzle ORM with proper `where` clauses.
- Always include meaningful comments, especially when implementing non–trivial logic.

## Roadmap

We’re continuously working on SwiftDrive to enhance your experience. Upcoming features include:

- **Enhanced UI Scaffolding**: Further refinement and additional responsive design improvements.
- **More Robust User Management**: Improved admin dashboard and role-based functionality.
- **Streamlined Deployment**: Finalizing the Docker Compose-based deploy script.
- **Performance and UX Enhancements**: Ongoing optimizations and bug fixes based on user feedback.

Keep an eye on the changelog for detailed release notes and progress updates.

## Contributing

Contributions are welcome! Please review our [Contribution Guidelines](CONTRIBUTING.md) before submitting a pull request. If you have any significant changes or ideas, feel free to open an issue first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
