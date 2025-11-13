#!/bin/bash
# Build the React frontend
cd frontend
npm install
npm run build
cd ..
echo "Frontend built successfully!"