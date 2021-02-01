## @babel/cli로 실행하기
1.패키지 설치
```bash
npm install @babel/core @babel/cli @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals @babel/preset-react
```

2.프로젝트 루트에 babel.config.js 작성
```javascript
const presets=['@babel/preset-react'];
const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
];
module.exports = {presets, plugins};
```  

3.코드 작성 
src/code.js 
```javascript
const element = <div>babel test</div>; 
const text = `element type is ${element.type}`;
const add = (a,b) => a + b;
```
4. 컴파일된 결과를 파일 혹은 폴더로 정리하고 싶다면 다음 명령어
```bash
npx babel src/code.js --out-file dist.js
npx babel src --out-dir dist
```

## 웹팩의 babel-loader 로 실행하기

1. 패키지 설치하기 
npm install webpack webpack-cli babel-loader 

2. babel-loader를 설정 webpack.config.js
```javascript
const path = require('path');
module.exports = {
    entry:"./src/code.js", //1
    output:{
        path:path.resolve(__dirname,"dist"), //2
        filename:"code.bundle.js", //2
    },
    module:{
        rules:[{test:/\.js$/,use:'babel-loader'}], //3
    },
    optimization:{minimizer:[]}, //4
}
```

1. 웹팩으로 번들링(bundling)할 파일을 지정한다.
2. 번들링된 결과를 dist/code.bundle.js 파일
3. 자바스크립트 파일을 babel-loader 가 처리하도록 설정 babel-loader는 바벨의 설정 파일을 이용하므로 이전에 만들어 놓은 babel.config.js 파일의 내용이 설정 값으로 사용됨
4. 웹팩은 기본적으로 자바스크립트 파일을 압축하지만 바벨이 제대로 실행됐는지 확인하기 위해 압축 기능 끈다.

## @babel/core를 직접 이용하기
@babel/cli와 babel-loader 는 모두 @babel/core를 이용해서 바벨을 실행한다. 직접 @babel/core 를 사용하는 코드를 작성해서 바벨을 실행한다.

1. runBabel.js 파일 생성
```javascript
const babel = require('@babel/core');//1
const fs = require('fs');

const filename = "./src/code.js";
const source = fs.readFileSync(filename, 'utf8');//2
const presets = ['@babel/preset-react'];//3
const plugins = [ //3
    '@babel/plugin-transform-template-literals',
    "@babel/plugin-transform-arrow-functions",
];
const {code} = babel.transformSync(source,{
    filename,
    presets,
    plugins,
    configFile:false, //5
});
console.log(code); //6
```
1. @babel/core 모듈을 가져온다.
2. 컴파일할 내용을 가져온다.
3. 바벨 플러그인과 프리셋을 설정한다.
4. transformSync 함수를 호출해서 바벨을 실행한다.
5. babel.config.js 파일을 사용하지 않도록 한다.
6. 변환된 코드를 콘솔에 출력한다.

2. node runBabel.js 명령어 실행


바벨은 컴파일 시 다음 세 단계를 거친다.
- 파싱(parse) 단계: 입력된 코드로부터 AST(abstract syntax tree)를 생성한다.
- 변환(transform)단계: AST를 원하는 형태로 변환한다.
- 생성(generate)단계: AST를 코드로 출력한다.

 AST는 코드의 구문(syntax)이 분석된 결과를 담고있는 구조체. 코드가 같다면 AST도 같기 때문에 같은 코드에 대해서 하나의 AST를 만들어 놓고 재사용할 수 있다.

 ```javascript
 //AST를 활용해서 효율적으로 바벨을 실행하는 코드
const babel = require('@babel/core');
const fs = require("fs");

const filename = "./src/code.js";
const source = fs.readFileSync(filename,"utf8");
const presets = ['@babel/preset-react'];

const {ast} = babel.transformSync(source,{
    filename,
    ast:true,
    code:false,
    presets,
    configFile:false
});

const {code: code1} = babel.transformFromAstSync(ast,source,{
    filename,
    plugins:["@babel/plugin-transform-template-literals"],
    configFile:false,
});
const {code:code2} = babel.transformFromAstSync(ast,source,{
    filename,
    plugins:['@babel/plugin-transform-arrow-functions'],
    configFile:false
});

console.log('code1:\n', code1),
console.log('code2"\n',code2)
 ```