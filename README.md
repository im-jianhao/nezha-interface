# Nezha Interface

A modern web interface built with React, Web3, and Ethereum integrations. Visit the homepage at [https://imjianhao.xyz](https://imjianhao.xyz).

## Description

Nezha Interface is a front-end application designed to interact with Ethereum-based smart contracts leveraging libraries like `ethers.js`, `wagmi`, and `@web3-react`. It provides a seamless user experience with tools like React Query for data fetching and Tailwind CSS for styling.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd nezha-interface
npm install
```

## Usage

The project includes several scripts to run the application in different modes:

- **Development Mode**: Start the client in development mode with hot reloading.
  ```bash
  npm run clent:dev
  ```

- **Server Mode**: Run the client server (assumed to be a development server).
  ```bash
  npm run clent:server
  ```

- **Production Build**: Build the project for production.
  ```bash
  npm run clent:prod
  ```

- **Testing**: Run tests with Jest and generate coverage reports.
  ```bash
  npm test
  ```

- **UI Difference Testing**: Run visual regression tests with BackstopJS.
  ```bash
  npm run test:uidiff
  ```

## Project Structure

- **Main File**: `index.js`
- **Homepage**: [https://imjianhao.xyz](https://imjianhao.xyz)
- **License**: ISC

## Dependencies

### Runtime Dependencies
- `@ethersproject/*`: Ethereum JavaScript utilities
- `@tanstack/react-query`: Data fetching and state management
- `@web3-react/*`: Web3 provider integrations (e.g., MetaMask)
- `connectkit`: Web3 connection UI toolkit
- `ethers`: Ethereum library for interacting with the blockchain
- `react`, `react-dom`, `react-router-dom`: React ecosystem for UI
- `wagmi`: React hooks for Ethereum
- `lucide-react`: Icon library
- `css-loader`, `postcss`, `postcss-loader`: CSS processing

### Development Dependencies
- `@swc/*`: Fast JavaScript/TypeScript compiler
- `@tailwindcss/postcss`, `tailwindcss`: Styling with Tailwind CSS
- `jest`, `@swc/jest`, `jest-stare`: Testing framework and reporting
- `webpack`, `webpack-cli`, `webpack-dev-server`: Build tools
- `backstopjs`: Visual regression testing
- `html-webpack-plugin`, `clean-webpack-plugin`: Webpack utilities

For a full list, see the `package.json`.

## Testing

The project uses Jest for unit testing with coverage reports stored in `docs/jest-stare`. Run the following to execute tests:

```bash
npm test
```

Visual regression tests are powered by BackstopJS:

```bash
npm run test:uidiff
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the ISC License. See the `package.json` for details.

---

This `README.md` is tailored to the information provided in the `package.json`. If you have specific features, workflows, or additional details you'd like to include (e.g., API usage, deployment instructions), let me know, and I can refine it further!