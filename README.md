# Aesthetic Rank

Aesthetic Rank is an AI-powered physique analysis platform that provides users with detailed assessments of their physical attributes and aesthetic rankings. The application leverages modern web technologies, including Next.js, TypeScript, and Tailwind CSS, to deliver a seamless user experience.

## Table of Contents

- [Aesthetic Rank](#aesthetic-rank)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **AI-Powered Analysis**: Get ranked from Iron to Supreme tier based on your overall aesthetics score.
- **Personalized Insights**: Receive genetic potential assessments, sport recommendations, and strength/weakness evaluations.
- **Comprehensive Physique Analysis**: Detailed evaluation of posture, muscle imbalances, skeletal structure, and body symmetry.
- **User-Friendly Interface**: Built with modern UI frameworks for a responsive and intuitive experience.
- **Privacy-Focused**: User data is handled securely, with options for data control and deletion.

## Technologies

Aesthetic Rank is built using a variety of modern technologies to ensure a robust and efficient application. Here are the key technologies used in the project:

- **Frontend**:

  - **Next.js 15**: A React framework for building server-rendered applications.
  - **React**: A JavaScript library for building user interfaces.
  - **TypeScript**: A superset of JavaScript that adds static types.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **Shadcn UI**: A component library for building accessible and customizable UI components.
  - **Radix UI**: A set of unstyled, accessible components for building high-quality design systems.

- **Backend**:

  - **Node.js**: A JavaScript runtime for building server-side applications.
  - **Redis**: An in-memory data structure store used for caching and session management.
  - **R2 Bucket**: A cloud storage solution for storing and serving user-uploaded images and data.
  - **Drizzle ORM**: An Object-Relational Mapping library for interacting with databases.
  - **OpenAI API**: Used for AI-powered physique analysis.

- **Database**:

  - **Neon PostgreSQL**: A serverless PostgreSQL database for storing user data and analysis results.

- **Self-Hosted Services**:

  - **Coolify**: A self-hosted platform for managing and deploying applications.
  - **Umami**: A self-hosted analytics solution for tracking user interactions without compromising privacy.

- **Deployment**:

  - **Docker**: Used for containerizing the application for consistent deployment across environments.

- **State Management**:

  - **Zustand**: A small, fast state management solution for React applications.

- **Validation**:
  - **Zod**: A TypeScript-first schema declaration and validation library.

This combination of technologies allows Aesthetic Rank to provide a seamless user experience while ensuring performance, security, and maintainability.

## Installation

To get started with Aesthetic Rank, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/resulgg/aesthetic-rank.git
   cd aesthetic-rank
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. You can refer to the `.env.example` file for guidance.

4. Run the development server:

   ```bash
   pnpm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Sign Up / Login**: Create an account or log in to access personalized analysis.
- **Upload Photos**: Follow the guidelines to upload your photos for analysis.
- **View Results**: Get your aesthetic ranking and detailed analysis results.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.
