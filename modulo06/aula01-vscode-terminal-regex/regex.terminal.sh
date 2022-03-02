# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volte para a pasta do modulo06
cp -r ../../modulo02/aula05-tdd-project-pt03

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**'\
| ipt -o \
| xargs -I '{file}' sed -i "" -e 'ls/^/\'$CONTENT'\
/g' {file}

#ls => primeira linha
# ^=> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito

# para mudar tudo
find . -name *.js -not -path '*node_modules**'\
| xargs -I '{file}' sed -i "" -e 'ls/^/\'$CONTENT'\
/g' {file}