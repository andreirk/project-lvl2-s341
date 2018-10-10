install: install-deps

start:
	npm run babel-node -- src/bin/gendiff.js
	
publish:
	npm publish --access=public

lint:
	npx eslint src

run:
	npx babel-node -- 'src/bin/gendiff.js'

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test
