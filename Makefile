
start:
	npm run babel-node -- src/bin/gendiff.js
	
publish:
	npm publish --access=public

lint:
	npm run eslint src

test: lint

build:
	npm run build
