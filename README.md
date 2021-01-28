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
4. 컴파일된 결고를 파일 혹은 폴더로 정리하고 싶다면 다음 명령어
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
2. 번들링된 결과를 dist/conde.bundle.js 파일
3. 자바스크립트 파일을 babel-loader 가 처리하도록 설정 babel-loader는 바벨의 설정 파일을 이용하므로 이전에 만들어 놓은 babel.config.js 파일의 내용이 설정 값으로 사용됨
4. 웹팩은 기본적으로 자바스크립트 파일을 압축하지만 바벨이 제대로 실행됐는지 확인하기 위해 압축 기능 끈다.