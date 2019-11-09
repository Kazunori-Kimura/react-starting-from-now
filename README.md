# いまからはじめるReact

https://ja.reactjs.org/tutorial/tutorial.html

## Reactとは？

## Node.jsのインストール

## Reactをはじめる前に

JavaScript (ECMAScript2015) の基本文法について確認

### let, const

#### var, letの違い

https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Variables

> *varの巻き上げ（hoisting）*
> 変数の宣言 (および一般的な宣言) はコードを実行する前に処理されますので、変数はコード内のどこで宣言しても、コードの先頭で宣言したものと等価になります。また、変数を宣言する前に変数を使用することもできます。この動作は、変数の宣言が関数やグローバルのコードの先頭に移動したように見えるため、"巻き上げ (hoisting)" と呼ばれます。

```js
myName = 'Chris';

function logName() {
  console.log(myName);
}

logName();

var myName;
```

上記の例で `var` を `let` に変更すると、エラーで失敗します。

> `var` を使用するとき、好きなだけ同じ変数を何度でも宣言することができます、しかし `let` ではできません。

```js
var myName = 'Chris';
var myName = 'Bob';
```

上記の例で `var` を `let` に変更すると、エラーで失敗します。

コードでは `var` ではなく可能な限り `let` を使用すること！


#### const

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const

> const 宣言は、値への読み取り専用の参照を作ります。その値が不変ということではなく、その変数識別子が再代入できないというだけです。

```js
const number = 42;

try {
  number = 99;
} catch(err) {
  console.log(err);
  // expected output: TypeError: invalid assignment to const `number'
  // Note - error messages will vary depending on browser
}

console.log(number);
// expected output: 42
```

JavaScriptでは型がないため、変数にどのような値が格納されているのか確認できません。
変数を定義する際は `const` で宣言することで、意図しない値が格納されることを防げます。
ループのカウンタなど、どうしても再代入が必要な変数のみ `let` を使用するのがオススメです。

### arrow function

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

> アロー関数式は、より短く記述できる、通常の function 式の代替構文です。また、this, arguments, super, new.target を束縛しません。アロー関数式は、メソッドでない関数に最適で、コンストラクタとして使うことはできません。

> 2 つの理由から、アロー関数が導入されました。1 つ目の理由は関数を短く書きたいということで、2 つ目の理由は this を束縛したくない、ということです。

```js
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]
```

*構文*

```
(param1, param2, …, paramN) => { statements } 
(param1, param2, …, paramN) => expression
// 上記の式は、次の式と同等です: => { return expression; }

// 引数が 1 つしかない場合、丸括弧 () の使用は任意です:
(singleParam) => { statements }
singleParam => { statements }

// 引数がない場合、丸括弧を書かねばいけません:
() => { statements }
```

## create-react-app

```sh
$ create-react-app todo-app
$ cd todo-app
$ code .
```

### 実行してみる

```sh
$ npm start
```

ブラウザが立ち上がり、Reactのロゴが表示されます。

### App.js

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

`App` ファンクションが定義されています。
AppファンクションはHTMLのようなものを返却しています。これは `JSX` とよばれる JavaScriptの構文の拡張です。

### JSXに式を埋め込む

`App.js` を以下のように修正します。

`{} 中カッコ` の中に式を埋め込むことで表示内容を動的に変更できます。

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const message = 'Hello, React!';

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

あらゆる有効な JavaScript の式を JSX 内で中括弧に囲んで使用できます。

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const libraries = [
    'jQuery',
    'React',
    'Vue.js'
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {libraries.map((item => (<p>{item}</p>))}
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```


### Todoの実装

```
kimki@DESKTOP-HSDP8B1 MINGW64 ~/Repository/react-tutorial
$ cd todo-app/src

kimki@DESKTOP-HSDP8B1 MINGW64 ~/Repository/react-tutorial/todo-app/src (master)
$ mkdir components

kimki@DESKTOP-HSDP8B1 MINGW64 ~/Repository/react-tutorial/todo-app/src (master)
$ touch components/Todo.js

kimki@DESKTOP-HSDP8B1 MINGW64 ~/Repository/react-tutorial/todo-app/src (master)
$ touch components/TodoList.js

kimki@DESKTOP-HSDP8B1 MINGW64 ~/Repository/react-tutorial/todo-app/src (master)
$ touch components/TodoForm.js
```
