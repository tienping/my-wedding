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

# TODO: delete everything in release/ except README.md and CNAME
# cp -r build/* release/*

