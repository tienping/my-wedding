DIRECTORY=release
if [ -d "$DIRECTORY" ]; then
    echo "$DIRECTORY folder already exist"
else
    echo "$DIRECTORY folder does not exist, building..."
    git clone git@github.com:tienping/whenimeetu.git
    mv whenimeetu release
fi

if [ -d "node_modules" ]; then
    echo "node_modules already exist"
else
    npm install
fi

npm run build
# cp -r build/* release/*