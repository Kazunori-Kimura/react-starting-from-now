# いまからはじめるReact

https://ja.reactjs.org/tutorial/tutorial.html

この資料は *いまからはじめるReact* と題してReact未経験者/初学者向けに チュートリアルを通してReact(およびHooks)について学ぶためのものです。
そのため、サンプルコードには例外処理などが不十分な箇所があります。ご注意ください。

## Reactとは？

Reactとは Facebookが中心となってオープンソースで開発されている ユーザーインターフェースを構築するためのJavaScriptライブラリです。
(2019/10/30現在、v16.10.2 が公開されています)

コンポーネント(部品)を作成し、これらを組み合わせることでSingle Page Applicationのような複雑なユーザーインターフェースを構築できるので、ピュアなJavaScriptやjQueryで実装する場合に比べてコードの見通しがよく、デバッグしやすいものになります。

## 開発環境の準備

以下のツールが必要です。

- エディタ (VisualStudio Codeがオススメです)
- Node.js (頻繁にバージョンアップするので、nvmなどのバージョン管理ツールを使用することをオススメします)

Reactの開発ではOSを選びません。
Windows/Mac/Linuxどれでも好きな環境で開発できます。

## Reactをはじめる前に

Reactを使用する際に頻出する JavaScript (ECMAScript2015) の基本文法について確認します。


### 変数の宣言 let, const

JavaScriptにおける変数/定数の宣言方法は3つあります。
- `var`
- `let`
- `const`

#### varの問題点 その1: 巻き上げ

参考: https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Variables

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

#### varの問題点 その2: 変数の上書き

> `var` を使用するとき、好きなだけ同じ変数を何度でも宣言することができます、しかし `let` ではできません。

```js
var myName = 'Chris';
var myName = 'Bob';
```

上記の例で `var` を `let` に変更すると、エラーで失敗します。


これらの問題点は潜在的なバグの要因になりかねません。
Reactの開発において `var` が必要になることはありませんので、使用しないこと！

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

```js
const obj = {
  number: 42,
};

try {
  obj.number = 99;
} catch(err) {
  console.log(err);
}

console.log(obj.number);
// => 99
```

JavaScriptでは型がないため、変数にどのような値が格納されるのか制限できません。
変数を定義する際は `const` で宣言することで、意図しない値が格納されることを防げます。
ループのカウンタなど、どうしても再代入が必要な変数のみ `let` を使用するのがオススメです。

### arrow function

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

> アロー関数式は、より短く記述できる、通常の function 式の代替構文です。

> 2 つの理由から、アロー関数が導入されました。1 つ目の理由は関数を短く書きたいということで、2 つ目の理由は this を束縛したくない、ということです。

アロー関数は以下のように使用します。

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

#### 構文

状況によってカッコを省略できます。
カッコの有無ではなく、`=>` を見てアロー関数かどうかを判断してください。

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

------

## はじめてのReact

### create-react-app

Reactのプロジェクトを作成するには `create-react-app` コマンドを使用します。
`create-react-app` は `npm` でインストールできます。

```sh
$ npm install -g create-react-app
```

では、プロジェクトを作成します。

```sh
$ create-react-app todo-app
$ cd todo-app
$ code .
```

### 実行してみる

`create-react-app` でプロジェクトを作成すると、すでにいくつかのファイルが生成されており
すぐに実行することが可能です。

```sh
$ npm start
```

ブラウザが立ち上がり、Reactのロゴが表示されます。
まずはこのファイルを変更して、Reactの基本を学習します。

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

`import` はライブラリやファイルの読み込みです。
`export` は他のファイルから指定した要素を参照できるようにします。

### JSXに式を埋め込む

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