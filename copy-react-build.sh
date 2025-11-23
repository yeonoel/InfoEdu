#!/bin/bash

echo "🔨 Building React..."
cd ../frontend
npm run build

echo "📦 Copying build to NestJS..."
rm -rf ../backend/build
cp -r build ../backend/build

echo "✅ React build copied successfully!"