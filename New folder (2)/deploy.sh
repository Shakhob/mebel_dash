echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@185.104.112.35:/var/www/185.104.112.35/

echo "Done!"