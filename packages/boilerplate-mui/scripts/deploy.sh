set -e
echo "Enter message: "
read MESSAGE

echo "Deploying $MESSAGE ..."

# build
yarn build

# commit
cd build
git init
git add -A
git commit -m "$MESSAGE"
git push -f https://github.com/crossjs/spax.git master:gh-pages

# back to root
cd ..
