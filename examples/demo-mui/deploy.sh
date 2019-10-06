set -e
echo "Enter message: "
read MESSAGE

echo "Deploying $MESSAGE ..."

# commit
cd build
git init
git add -A
git commit -m "$MESSAGE"
git push -f https://github.com/spaxjs/spax.git master:gh-pages

# back to root
cd ..
