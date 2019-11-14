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

------

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

objectのプロパティなどは変更できます。

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


### スプレッド構文 `...`

> *スプレッド構文 - JavaScript | MDN* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
> スプレッド構文を使うと、関数呼び出しでは 0 個以上の引数として、Array リテラルでは 0 個以上の要素として、Object リテラルでは 0 個以上の key-value のペアとして、Array や String などの iterable オブジェクトをその場で展開します。

```js
// 配列の展開
const arr1 = [1, 2, 3];
const arr2 = [4, 5, ...arr1];
console.log(arr2);
// => [4, 5, 1, 2, 3];

// オブジェクトの展開 (ECMAScript 2018以降)
const obj1 = { firstName: 'kazunori', familyName: 'kimura' };
const obj2 = { ...obj1, age: 40 };
console.log(obj2);
// => { firstName: 'kazunori', familyName: 'kimura', age: 40 }

// 関数の引数
const sum = (...args) => {
  // 引数が args という配列に格納される
  let value = 0;
  args.forEach(arg => value += arg);
  return value;
};

console.log(sum(1, 3, 5, 7));
// => 16

// 関数の呼び出し
const multi = (a, b) => {
  return a * b;
}

const arr = [3, 5, 7];
console.log(multi(...arr));
// => 15
```

### 分割代入 (Destructuring assignment)

> *分割代入 - JavaScript | MDN* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
> 分割代入 (Destructuring assignment) 構文は、配列から値を取り出して、あるいはオブジェクトからプロパティを取り出して別個の変数に代入することを可能にする JavaScript の式です。

#### 配列の分割代入

```js
const [one, two] = [1, 2, 3, 4];
console.log(one); // => 1
console.log(two); // => 2

const [a, b, c] = [1, 2];
console.log(a); // => 1
console.log(b); // => 2
console.log(c); // => undefined
```

```js
// 既定値の設定
const [a, b = 4, c = 5] = [1, 2];
console.log(a); // => 1
console.log(b); // => 2
console.log(c); // => 5
```

```js
// スプレッド構文との組み合わせ
const [a, b, ...arr] = [1, 2, 3, 4, 5]; // [a, b, ...arr,] <= 余剰なカンマはエラーとなる
console.log(a); // => 1
console.log(b); // => 2
console.log(arr); // => [3, 4, 5]
```

#### TIPS: Tupleの代替

分割代入によって他言語にある `Tuple` に似た機能を実装できます。

```js
const calc = (a, b) => {
  return [a + b, a * b];
};

const [sum, multi] = calc(3, 5);
console.log(sum); // => 8
console.log(multi); // => 15

// 掛け算の結果だけほしい
const [, m] = calc(4, 8);
console.log(m); // => 32
```

#### TIPS: 変数の入れ替え

配列の分割代入を使用すると、変数の値の入れ替えが簡単に行えます。

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // => 2
console.log(b); // => 1
```

#### オブジェクトの分割代入

配列の分割代入とイメージは大差ありません。

```js
const obj = { name: 'kimura', age: 40 };
const { name } = obj;
console.log(name); // => kimura
```

オブジェクトから変数を取り出して、オブジェクトのプロパティとは異なる名前を持つ変数に代入できます

```js
const obj = { name: 'kimura', age: 40 };
const { name: userName } = obj;
console.log(userName); // => kimura
```

#### TIPS 関数の引数に既定値を設定する

関数の引数にオブジェクトを渡すようにすることで、名前付き引数のような機能を実現できます。
また、既定値を設定することで省略可能な引数を定義できます。

```js
const drawRect = ({ width = 100, height = 100, position = { x: 0, y: 0 } } = {}) => {
  return `x1=${position.x},y1=${position.y},x2=${position.x + width},y2=${position.y + height}`;
};

console.log(drawRect());
// => x1=0,y1=0,x2=100,y2=100

console.log(drawRect({ width: 200, position: {x: 50, y: 100} }));
// => x1=50,y1=100,x2=250,y2=200
```

------

## はじめてのReact

Hello World – React
https://ja.reactjs.org/docs/hello-world.html

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
import './App.css';

function App() {
  const message = 'Hello, React!';

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
```

ファイルを保存すると、自動的にブラウザがリロードされて変更が反映されます。
(ここではaタグ, imgタグは不要なので削除しておきます)

あらゆる有効な JavaScript の式を JSX 内で中括弧に囲んで使用できます。

```js
import React from 'react';
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
        {libraries.map(item => (<p>{item}</p>))}
      </header>
    </div>
  );
}

export default App;
```

### コンポーネント

独自のコンポーネントを定義してみます。

```sh
$ mkdir src/components
$ touch src/components/Message.js
```

`Message.js` は簡単なメッセージを表示するコンポーネントです。

```js
import React from 'react';

function Message() {
  return (
    <p>Original Message.</p>
  );
}

export default Message;
```

`App.js` に `Message` コンポーネントを表示します。

```js
import React from 'react';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message />
      </header>
    </div>
  );
}

export default App;
```

> **コンポーネント名は常に大文字で始めてください。**

### コンポーネントに値を渡す: props

`App` から `Message` に値を渡して、動的にメッセージを組み立ててみます。

`App.js`

```js
import React from 'react';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message name="kimura" />
      </header>
    </div>
  );
}

export default App;
```

`Message` にて値を表示するように修正します。
Reactはコンポーネントを呼び出す際に `props` というobjectに与えられた属性やタグ内の値を渡します。

`Message.js`

```js
import React from 'react';

function Message(props) {
  return (
    <p>Hello, {props.name}!</p>
  );
}

export default Message;
```

コンポーネントは繰り返し使用できます。

`App.js`

```js
import React from 'react';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message name="kimura" />
        <Message name="tanaka" />
        <Message name="suzuki" />
      </header>
    </div>
  );
}

export default App;
```

React は柔軟ですが、1 つだけ厳格なルールがあります：
**自分自身の props は決して変更してはいけません。**

### ユーザーの入力を扱う: state

ステートフックの利用法 – React
https://ja.reactjs.org/docs/hooks-state.html

予め用意した文字列ではなく、テキストボックスに名前を入力して `Message` コンポーネントに渡してみます。

`state` の機能を使用するには `useState` メソッドを使用します。

```js
import React, { useState } from 'react';
import './App.css';
import Message from './components/Message';

function App() {
  const [name, setName] = useState("");

  const handleTextInput = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="form">
          <input type="text" onChange={handleTextInput} />
        </div>
        
        <Message name={name} />
      </header>
    </div>
  );
}

export default App;
```

テキストボックスの内容が変わると `handleTextInput` メソッドが呼ばれます。
`handleTextInput` で `setName` メソッドにテキストボックスの値を渡します。
`name` の値が更新されると `Message` が再描画されます。

### 子から親に値を渡す

フォームをコンポーネント化することを考えます。

```sh
$ touch src/components/NameForm.js
```

子から親にデータを渡すためには、`props` にコールバック関数を渡します。
子にて `props` に渡されたコールバック関数を実行します。

`NameForm.js`

```js
import React from 'react';

function NameForm(props) {
  const handleTextInput = (e) => {
    props.onChangeName(e.target.value);
  };

  return (
    <div className="form">
      <input type="text"
        value={props.name}
        onChange={handleTextInput} />
    </div>
  );
}

export default NameForm;
```

`App.js`

```js
import React, { useState } from 'react';
import './App.css';
import Message from './components/Message';
import NameForm from './components/NameForm';

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <NameForm name={name}
          onChangeName={value => setName(value)} />
        
        <Message name={name} />
      </header>
    </div>
  );
}

export default App;
```

Reactではこのようにバケツリレーのようにして親から子に、子から親にデータを渡していきます。

------

## Todoアプリの実装

それでは、もう少し複雑なアプリの開発を通してReactについて解説していきます。

今回はTodoアプリを作成します。

### Todoのデータ設計

Todoは以下の項目を持つものとします。

- ID: TodoごとにユニークなIDを持つ
- Content: 内容
- Done: 完了フラグ
- CreatedAt: 作成日時
- UpdatedAt: 更新日時

### 下準備

`App.css` の内容を修正しておきます。

```css
.App {
  padding: 10px;
}

.theme-selector {
  padding: 10px;
}
.theme-selector label {
  margin-left: 20px;
}
```

### Todoコンポーネントの作成

では、Todoコンポーネントを実装していきます。

```sh
$ touch src/components/Todo.js
$ touch src/components/Todo.css
```

まずはスタイルを定義します。

`Todo.css`

```css
.todo {
  display: flex;
  width: 100%;
  min-height: 60px;
  align-items: stretch;
  border: 1px solid #ccc;
  border-bottom: 0;
}
.todo:last-child {
  border-bottom: 1px solid #ccc;
}

.todo .check {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00cc00;
  font-weight: bold;
  font-size: xx-large;
}

.todo .body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.todo .actions {
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.todo .body .header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.todo .body .header .date {
  font-size: x-small;
  padding: 4px;
}

.todo .body .content {
  padding: 4px;
}

.todo .body textarea {
  width: calc(100% - 12px);
  height: 100%;
  margin: 3px;
}

.btn {
  width: 50px;
  height: 50px;
  margin: 5px;
}
```

つづいて Todoコンポーネント を作成します。

`Todo.js`

```js
import React from 'react';
import './Todo.css';

function Todo(props) {
  return (
    <div className="todo">
      <div className="check">
        {/* Doneがtrueならチェックマークを表示 */}
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedAt: {props.CreatedAt}</span>
          <span className="date">UpdatedAt: {props.UpdatedAt}</span>
        </div>
        {/* contentをそのまま表示 */}
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn">Edit</button>
      <button className="btn">Delete</button>
    </div>
  );
}

export default Todo;
```

`App.js` を修正し、いくつかTodoを表示してみます。

```js
import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([
    {
      ID: 1,
      Content: 'hoge',
      Done: true,
      CreatedBy: (new Date()).toISOString(),
      UpdatedBy: (new Date()).toISOString(),
    },
  ]);


  return (
    <div className="App">
      {todos.map(item => (
        <Todo key={item.ID} {...item} />
      ))}
    </div>
  );
}

export default App;
```

コンポーネントを `map` メソッドなどで複数登録する場合、Reactが個々のコンポーネントを区別できるように `key` プロパティを指定する必要があります。

この状態で表示内容を確認してください。 **hoge** という項目が一つ表示されているはずです。

### Todoの追加

Todoを追加する機能を実装していきます。
`TodoForm` コンポーネントを作成します。

```sh
$ touch src/components/TodoForm.js
```

`TodoForm.js`

```js
import React, { useState } from 'react';
import './Todo.css';

function TodoForm(props = { Done: false, Content: '', onSave = () => {} }) {
  const [done, setDone] = useState(!!props.Done);
  const [content, setContent] = useState(props.Content);

  const handleSave = () => {
    const data = {
      Done: done,
      Content: content,
    };

    props.onSave(data);
  };

  return (
    <div className="todo">
      <div className="check">
        <input type="checkbox" checked={done}
          onChange={e => setDone(e.target.checked)} />
      </div>
      <div className="body">
        <textarea value={content}
          onChange={e => setContent(e.target.value)} />
      </div>
      <button className="btn" onClick={handleSave}>Save</button>
    </div>
  );
}

export default TodoForm;
```

`App` に `TodoForm` を追加します。
`TodoForm` の `Save` ボタンが押されたらその結果を `state` の配列に追加します。

まず、TodoのIDを重複なく採番するために、 `uuid` というパッケージをインストールします。

```sh
$ npm install --save uuid
```

`App.js` に登録処理を追加します。

```js
import React, { useState } from 'react';
import uuid from 'uuid';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    {
      ID: 1,
      Content: 'hoge',
      Done: true,
      CreatedBy: (new Date()).toISOString(),
      UpdatedBy: (new Date()).toISOString(),
    },
  ]);

  const handleCreate = data => {
    // IDを採番
    data.ID = uuid.v4();
    // 現在日時を取得
    const now = (new Date()).toISOString();
    data.CreatedBy = now;
    data.UpdatedBy = now;
    // 末尾に追加
    setTodos([...todos, data]);
  };

  return (
    <div className="App">
      <TodoForm onSave={handleCreate} />

      {todos.map(item => (
        <Todo key={item.ID} {...item} />)
      )}
    </div>
  );
}

export default App;
```

ここまで実装して、Todoが追加されることを確認します。

### Todoを削除する

TodoコンポーネントにあるDeleteボタンをクリックすると該当のTodoが削除されるように実装していきます。

`App.js` に削除処理を追加します。

```js
import React, { useState } from 'react';
import uuid from 'uuid';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    {
      ID: 1,
      Content: 'hoge',
      Done: true,
      CreatedBy: (new Date()).toISOString(),
      UpdatedBy: (new Date()).toISOString(),
    },
  ]);

  const handleCreate = data => {
    // IDを採番
    data.ID = uuid.v4();
    // 現在日時を取得
    const now = (new Date()).toISOString();
    data.CreatedBy = now;
    data.UpdatedBy = now;
    // 末尾に追加
    setTodos([...todos, data]);
  };

  const handleDelete = id => {
    // IDが一致する項目のindexを取得
    const index = todos.findIndex(item => item.ID === id);
    if (index >= 0) {
      // 新しい配列を生成
      const newList = [...todos];
      // 配列から該当要素を削除
      newList.splice(index, 1);
      // stateに反映
      setTodos(newList);
    }
  };

  return (
    <div className="App">
      <TodoForm onSave={handleCreate} />

      {todos.map(item => (
        <Todo key={item.ID} {...item}
          onDelete={handleDelete}
        />)
      )}
    </div>
  );
}

export default App;
```

`handleDelete` を定義し、`Todo` コンポーネントに渡します。

`Todo.js`

```js
import React from 'react';
import './Todo.css';

function Todo(props) {
  return (
    <div className="todo">
      <div className="check">
        {/* Doneがtrueならチェックマークを表示 */}
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedAt: {props.CreatedAt}</span>
          <span className="date">UpdatedAt: {props.UpdatedAt}</span>
        </div>
        {/* contentをそのまま表示 */}
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn">Edit</button>
      <button className="btn" onClick={() => props.onDelete(props.ID)}>Delete</button>
    </div>
  );
}

export default Todo;
```

Deleteボタンのクリック時に `App` から渡された `onDelete` メソッドを実行します。
その際、TodoのIDを引数に渡します。

削除処理が正常に動くことを確認します。

### Todoを更新する

更新処理は少し複雑です。
ひとつずつ実装していきます。

#### 編集モードの切り替え

まず、TodoコンポーネントのEditボタンをクリックすると、該当Todoが編集モードに切り替わるように実装します。

`Todo.js`

```js
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import './Todo.css';

function Todo(props) {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return (
      <TodoForm
        {...props}
        onSave={() => {})}
      />
    );
  }

  return (
    <div className="todo">
      <div className="check">
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedBy: {props.CreatedBy}</span>
          <span className="date">UpdatedBy: {props.UpdatedBy}</span>
        </div>
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn" onClick={() => setEdit(true)}>Edit</button>
      <button className="btn" onClick={() => props.onDelete(props.ID)}>Delete</button>
    </div>
  );
}

export default Todo;
```

編集モードのフラグをstateで管理します。
初期値は `false` としておきます。

編集モードの場合は従来のTodoコンポーネントの変わりに `TodoForm` コンポーネントを表示するようにします。
`TodoForm` には `Todo` コンポーネントが受け取った `props` を展開してセットします。
`onSave` にはとりあえず空の関数を渡しておきます。

Editボタンをクリックしたら `edit` の値を `true` に変更するように実装します。

この状態で、Editボタンをクリックしたら編集モードに切り替わることを確認します。

#### 編集モードのキャンセル

`TodoForm` コンポーネントにキャンセルボタンを追加し、キャンセルボタンがクリックされたら編集モードが解除されるように実装します。

まずは `TodoForm` にキャンセルボタンを実装します。

```js
import React, { useState } from 'react';
import './Todo.css';

function TodoForm(props = { Done: false, Content: '' }) {
  const [done, setDone] = useState(!!props.Done);
  const [content, setContent] = useState(props.Content || '');

  const handleSave = () => {
    const id = props.ID || 'hoge';
    props.onSave({
      ...props,
      ID: id,
      Done: done,
      Content: content,
    });

    setDone(false);
    setContent('');
  };

  return (
    <div className="todo">
      <div className="check">
        <input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
      </div>
      <div className="body">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleSave}>Save</button>
      {props.ID && (
        <button className="btn" onClick={props.onCancel}>Cancel</button>
      )}
    </div>
  );
}

export default TodoForm;
```

最上位にある登録フォームにはキャンセルボタンが不要なので、`ID`の有無で登録か編集かを判定します。

### APIを呼ぶ

副作用フックの利用法 – React
https://ja.reactjs.org/docs/hooks-effect.html

> データの取得、購読の設定、あるいは React コンポーネント内の DOM の手動での変更、といったものはすべて副作用の例です。

`useEffect` の第2引数を空の配列にすると、`App` コンポーネントが描画されたときにだけ呼び出される

```js
import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const url = 'https://a1uixots8j.execute-api.ap-northeast-1.amazonaws.com/latest/todo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodoes = async () => {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });
      
      const res  = await response.json();

      setTodos(res);
    };

    getTodoes();
  }, []);

.....
```

#### fetch

Fetch API - Web API | MDN
https://developer.mozilla.org/ja/docs/Web/API/Fetch_API

> Fetch API には (ネットワーク越しの通信を含む) リソース取得のためのインターフェイスが定義されています。XMLHttpRequest と似たものではありますが、より強力で柔軟な操作が可能です。

#### cors

オリジン間リソース共有 (CORS) - HTTP | MDN
https://developer.mozilla.org/ja/docs/Web/HTTP/CORS

> オリジン間リソース共有 (CORS: Cross-Origin Resource Sharing) は、追加の HTTP ヘッダーを使用して、あるオリジンで動作しているウェブアプリケーションに、異なるオリジンにある選択されたリソースへのアクセス権を与えるようブラウザーに指示するための仕組みです。ウェブアプリケーションは、自分とは異なるオリジン (ドメイン、プロトコル、ポート番号) にあるリソースをリクエストするとき、オリジン間 HTTP リクエストを実行します。


追加/更新/削除でもAPIを呼び出すように修正する

```js
import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const url = 'https://a1uixots8j.execute-api.ap-northeast-1.amazonaws.com/latest/todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getTodoes = async () => {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });
      
      const res  = await response.json();

      // 作成日時順に返す
      setTodos(res.sort((a, b) => a.CreatedAt < b.CreatedAt ? 1 : -1));
    };

    getTodoes();
  }, [refresh]);

  const handleCreate = data => {
    const createTodo = async () => {
      // ID, CreatedAt, UpdatedAtはAPI側で設定される
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    createTodo();
  };

  const handleUpdate = data => {
    const updateTodo = async () => {
      const response = await fetch(`${url}/${data.ID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    updateTodo();
  };

  const handleDelete = id => {
    const deleteTodo = async () => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    deleteTodo();
  };

  return (
    <div className="App">
      <TodoForm onSave={handleCreate} />

      {todos.map(item => (
        <Todo key={item.ID} {...item} onSave={handleUpdate} onDelete={handleDelete} />)
      )}
    </div>
  );
}

export default App;
```

------

### useContext

コンポーネントのデータ管理の基本は `state` と `props` ですが、コンポーネントが多階層になった場合にバケツリレーのごとくデータを渡すのは非常に面倒です。

そういったときに使える機能が `Context` になります。

例えば、現在の認証済みユーザー・テーマ・優先言語といったデータを共有する場合に有用です。

#### Contextの使用例

Todoアプリにテーマ選択機能を追加してみます。

`App.js`

```js
import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const url = 'https://a1uixots8j.execute-api.ap-northeast-1.amazonaws.com/latest/todo';

// Themeごとのスタイル定義
const Themes = {
  light: {
    color: '#000',
    backgroundColor: '#fff',
  },
  dark: {
    color: '#fff',
    backgroundColor: '#000',
  },
};

// 現在選択されているThemeを共有するContext
export const ThemeContext = createContext(Themes.light);

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // 現在選択されているtheme
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTodoes = async () => {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });
      
      const res  = await response.json();

      // 作成日時順に返す
      setTodos(res.sort((a, b) => a.CreatedAt < b.CreatedAt ? 1 : -1));
    };

    getTodoes();
  }, [refresh]);

  const handleCreate = data => {
    const createTodo = async () => {
      // ID, CreatedAt, UpdatedAtはAPI側で設定される
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    createTodo();
  };

  const handleUpdate = data => {
    const updateTodo = async () => {
      const response = await fetch(`${url}/${data.ID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    updateTodo();
  };

  const handleDelete = id => {
    const deleteTodo = async () => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    deleteTodo();
  };

  const handleTheme = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="App">
      {/* Providerの配下でContextが共有される */}
      <ThemeContext.Provider value={Themes[theme]}>
        {/* Themeの選択 */}
        <div className="theme-selector">
          <label><input type="radio" name="theme" value="light" defaultChecked={theme === 'light'} onChange={handleTheme} />Light</label>
          <label><input type="radio" name="theme" value="dark" defaultChecked={theme === 'dark'} onChange={handleTheme} />Dark</label>
        </div>

        <TodoForm onSave={handleCreate} />

        {todos.map(item => (
          <Todo key={item.ID} {...item} onSave={handleUpdate} onDelete={handleDelete} />)
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

```


`Todo.js`

```js
import React, { useState, useContext } from 'react';
import TodoForm from './TodoForm';
import './Todo.css';

import { ThemeContext } from '../App';

function Todo(props) {
  const [edit, setEdit] = useState(false);
  const theme = useContext(ThemeContext);

  const handleUpdate = (data) => {
    setEdit(false);
    props.onSave(data);
  };

  if (edit) {
    return (
      <TodoForm
        {...props}
        onSave={handleUpdate}
        onCancel={() => setEdit(false)}
      />
    );
  }

  return (
    <div className="todo" style={theme}>
      <div className="check">
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedAt: {props.CreatedAt}</span>
          <span className="date">UpdatedAt: {props.UpdatedAt}</span>
        </div>
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn" onClick={() => setEdit(true)}>Edit</button>
      <button className="btn" onClick={() => props.onDelete(props.ID)}>Delete</button>
    </div>
  );
}

export default Todo;

```

`TodoForm.js`

```js
import React, { useState, useContext } from 'react';
import './Todo.css';

import { ThemeContext } from '../App';

function TodoForm(props = { Done: false, Content: '' }) {
  const [done, setDone] = useState(!!props.Done);
  const [content, setContent] = useState(props.Content || '');
  const theme = useContext(ThemeContext);

  const handleSave = () => {
    const id = props.ID || 'hoge';
    props.onSave({
      ...props,
      ID: id,
      Done: done,
      Content: content,
    });

    setDone(false);
    setContent('');
  };

  return (
    <div className="todo" style={theme}>
      <div className="check">
        <input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
      </div>
      <div className="body">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleSave}>Save</button>
      {props.ID && (
        <button className="btn" onClick={props.onCancel}>Cancel</button>
      )}
    </div>
  );
}

export default TodoForm;

```

`App.js` のラジオボタンを変更すると各Todo、Formのテーマが切り替わります。

