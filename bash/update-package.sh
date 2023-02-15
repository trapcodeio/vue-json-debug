#u update readme
cp ./README.md ./package/README.md

# delete package src folder
rm -rf ./package/src

# Copy all component files to package/src folder
cp -r ./src/components/debug ./package/src

# delete tailwind source code
rm -rf ./package/src/tailwind.css

# Build debug.css
npx tailwindcss -i ./src/components/debug/tailwind.css -o ./package/src/debug.css --minify
