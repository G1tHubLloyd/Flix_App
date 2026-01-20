#!/bin/bash

# Kill any existing processes on ports 5002 and 5173
echo "Cleaning up ports..."
lsof -ti:5002,5173 2>/dev/null | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 2

# Navigate to the project and start
cd "$(dirname "$0")" || exit
echo "Starting myFlix app..."
npm run dev
