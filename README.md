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
        
        {libraries.map(item => (<p>{item}</p>))}
        
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
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Message />

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

> **コンポーネント名は常に大文字で始めてください。**
> React は小文字で始まるコンポーネントを DOM タグとして扱います。

### props

`App` から `Message` に値を渡して、動的にメッセージを組み立ててみます。

`App.js`

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Message name="kimura" />

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
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Message name="kimura" />
        <Message name="tanaka" />
        <Message name="suzuki" />

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

React は柔軟ですが、1 つだけ厳格なルールがあります：
**自分自身の props は決して変更してはいけません。**

データを更新する場合には `state` を使用します。

### stateを使用する

予め用意した配列ではなく、テキストボックスに名前を入力して Message コンポーネントに渡してみます。
`state` の機能を使用するには `useState` メソッドを使用します。

```js
import React, { useState } from 'react';
import logo from './logo.svg';
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
        <img src={logo} className="App-logo" alt="logo" />

        <div className="form">
          <input type="text" onChange={handleTextInput} />
        </div>
        
        <Message name={name} />

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

テキストボックスの内容が変わると `handleTextInput` メソッドが呼ばれます。
`handleTextInput` で `setName` メソッドにテキストボックスの値を渡します。
`name` の値が更新されると `Message` が再描画されます。

------

## Todoアプリの実装

### Todoのデータ設計

- ID: TodoごとにユニークなIDを持つ
- Content: 内容
- Done: 完了フラグ
- CreatedAt: 作成日時
- UpdatedAt: 更新日時

### Todoコンポーネントの作成

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
        {/* とりあえずはcontentをそのまま表示 */}
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn">Edit</button>
      <button className="btn">Delete</button>
    </div>
  );
}

export default Todo;
```

`TodoForm.js`

```js
import React from 'react';
import './Todo.css';

function TodoForm(props = { Done: false, Content: '' }) {
  return (
    <div className="todo">
      <div className="check">
        <input type="checkbox" checked={props.Done} />
      </div>
      <div className="body">
        <textarea>{props.Content}</textarea>
      </div>
      <button className="btn">Save</button>
      {props.ID && (
        <button className="btn">Cancel</button>
      )}
    </div>
  );
}

export default TodoForm;
```



------

### APIを呼ぶ

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

