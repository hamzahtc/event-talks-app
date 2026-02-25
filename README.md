# Event Talks App - TechDay 2026

A simple web application to display and filter technical talks for the TechDay 2026 conference.

## Features

- **Talk Schedule:** Displays a list of technical talks with their titles, speakers, times, locations, and descriptions.
- **Search & Filter:** Users can search for talks by category (e.g., Performance, Security, Architecture) to find specific areas of interest.
- **Dynamic Data:** The schedule is dynamically loaded from a JSON backend.

## Tech Stack

- **Backend:** Node.js with [Express](https://expressjs.com/)
- **Frontend:** Vanilla HTML5, CSS3, and JavaScript
- **Data:** JSON-based storage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hamzahtc/event-talks-app.git
   cd event-talks-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

- `server.js`: Express server and API endpoints.
- `public/`: Static frontend assets (HTML, CSS, JS).
- `data/`: JSON data files for the talk schedule.
- `package.json`: Project dependencies and metadata.

## License

This project is licensed under the ISC License.
