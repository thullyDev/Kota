# Kota

## Prerequisites

You need to have **Bun** and **Node.js** installed.
### 1. Install Node.js
Download and install Node.js from [https://nodejs.org](https://nodejs.org).

### 2. Install Bun
```bash
npm install -g bun
```
---

## Setting Up the Project

1. **Clone the project or navigate to your `server` directory**:
    ```bash
    cd kota/server
    ```

2. **Create a `.env` file in the `server` directory** with the following content:
    ```plaintext
    DATABASE_URL=postgres://{user}:{password}@127.0.0.1:5432/{dbname}
    SECRET_KEY=1234567890
    FRONTEND_ORIGIN=http://localhost:5173
    PORT=3000
    ```

3. **Install dependencies** in the `base_dir`:
    ```bash
    npm install
    ```
    This will install all packages needed in the base_dir, server, and client

4. **Setup database** in the `base_dir`:
    ```bash
    npm run db:generate
    npm run db:migrate
    ```
    This will setup the data with postgres and drizzle orm

5. **Run the development** in the `base_dir`:
    - With Bun:
      ```bash
      npm run dev
      ```
      This will concurrently run server (with bun) and client 

---

the app should run on `http://localhost:3000` and `http://localhost:5173` on default.
