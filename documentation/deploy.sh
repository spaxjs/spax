echo "Deploying..."

gitbook build

# commit
cd _book
echo spax.js.org > CNAME
git init
git add -A
git commit -m "pub"
git push -f https://github.com/spaxjs/website.git master:gh-pages

# back to root
cd ..
