# Remove old readme and preview
rm -rf ./package/README.md
rm -rf ./package/preview.png

# update readme & preview
cp ./README.md ./package/README.md
cp ./preview.png ./package/preview.png

# delete package src folder
rm -rf ./package/src

# Copy all component files to package/src folder
cp -r ./src/components/debug ./package/src

# delete tailwind source code
rm -rf ./package/src/tailwind.*

# Build debug.css
npx tailwindcss -i ./src/components/debug/tailwind.css -o ./package/src/debug.css --minify
