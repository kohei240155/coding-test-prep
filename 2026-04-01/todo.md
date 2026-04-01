# Vanilla JS で Todo アプリを作る — 構築手順ガイド

> **対象**: React は使えるが、素の JavaScript の基礎を固めたい人  
> **所要時間**: 2〜3 時間  
> **完成物**: CRUD 機能 + LocalStorage 保存付き Todo アプリ

---

## 0. この教材のねらい

React では隠れている「ブラウザが本来持っている API」を自分の手で触ることがゴールです。具体的には以下を体験します。

- `document.querySelector` / `createElement` など **DOM API** を直接操作する
- `addEventListener` で **イベントを手動でバインド** する
- `innerHTML` ではなく **安全な DOM 組み立て** を行う
- `localStorage` で **データを永続化** する
- React の状態管理に相当する処理を **自力で設計** する

---

## 1. プロジェクトの準備

ファイルは 3 つだけ。ビルドツールは一切使いません。

```
todo-app/
├── index.html
├── style.css
└── app.js
```

### 1-1. `index.html` を作成

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vanilla JS Todo</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <h1>📝 Todo App</h1>

      <!-- 入力エリア -->
      <div class="input-area">
        <input type="text" id="todo-input" placeholder="タスクを入力..." />
        <button id="add-btn">追加</button>
      </div>

      <!-- フィルター -->
      <div class="filters">
        <button class="filter-btn active" data-filter="all">すべて</button>
        <button class="filter-btn" data-filter="active">未完了</button>
        <button class="filter-btn" data-filter="completed">完了</button>
      </div>

      <!-- Todo リスト -->
      <ul id="todo-list"></ul>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

**React との比較ポイント**:

- React では JSX でコンポーネントを書くが、ここでは **生の HTML** がそのまま初期 UI になる
- `<script>` タグは `</body>` の直前に置く → DOM が読み込まれた後に JS が実行される

---

## 2. CSS を追加（最小限のスタイリング）

```css
/* style.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

#app {
  width: 100%;
  max-width: 480px;
}

h1 {
  margin-bottom: 24px;
}

/* --- 入力エリア --- */
.input-area {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

#todo-input {
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

#todo-input:focus {
  border-color: #4a90d9;
}

#add-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: #4a90d9;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

#add-btn:hover {
  background: #357abd;
}

/* --- フィルター --- */
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  padding: 6px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
}

.filter-btn.active {
  background: #4a90d9;
  color: #fff;
  border-color: #4a90d9;
}

/* --- Todo リスト --- */
#todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}

.delete-btn:hover {
  color: #e74c3c;
}
```

> CSS は学習のメインではないのでコピペで OK。気になったら後から自由にカスタマイズしましょう。

---

## 3. JavaScript — ステップ・バイ・ステップ

ここからが本番です。`app.js` を **段階的に** 書いていきます。

---

### Step 1: DOM 要素を取得する

```js
// =============================
// Step 1: DOM 要素の取得
// =============================

const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
```

**学びポイント**:

- `document.querySelector()` は CSS セレクタで **1 つの要素** を取得する（React の `useRef` に近い）
- `document.querySelectorAll()` は **NodeList（配列っぽいもの）** を返す
- React では ref を使う場面だが、Vanilla JS では **常にこの方法** で DOM にアクセスする

---

### Step 2: データ（状態）を定義する

```js
// =============================
// Step 2: 状態の定義
// =============================

let todos = []; // Todo の配列 — React でいう useState の中身
let currentFilter = 'all'; // 現在のフィルター状態
```

**React との比較**:

- React: `const [todos, setTodos] = useState([])` → 状態が変わると **自動で再レンダリング**
- Vanilla JS: ただの変数 → 状態が変わっても **何も起きない。自分で描画関数を呼ぶ必要がある**

> これが React と Vanilla JS の **最大の違い** です。

---

### Step 3: Todo を追加する関数

```js
// =============================
// Step 3: Todo 追加
// =============================

function addTodo() {
  const text = todoInput.value.trim();

  // 空文字ガード
  if (!text) return;

  // Todo オブジェクトを作成
  const todo = {
    id: Date.now(), // 簡易ユニーク ID
    text: text,
    completed: false,
  };

  // 配列に追加
  todos.push(todo);

  // 入力欄をクリア
  todoInput.value = '';

  // 画面を更新（Step 5 で実装）
  render();

  // LocalStorage に保存（Step 7 で実装）
  saveTodos();
}
```

**学びポイント**:

- `todoInput.value` で input の中身を取得する（React の `e.target.value` に相当）
- `.trim()` で前後の空白を除去
- `Date.now()` はミリ秒のタイムスタンプ — 簡易的なユニーク ID として使える

---

### Step 4: Todo を削除 / 完了トグルする関数

```js
// =============================
// Step 4: 削除 & 完了トグル
// =============================

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
  saveTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
  render();
  saveTodos();
}
```

**React との比較**:

- ロジック自体は React と同じ（`filter` / `map` + スプレッド構文）
- 違いは **`setTodos()` の代わりに `render()` を手動で呼んでいる** こと

---

### Step 5: 画面を描画する関数（最重要）

```js
// =============================
// Step 5: レンダリング — ★ 最も重要 ★
// =============================

function render() {
  // 1. フィルタリング
  const filtered = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // 2. リストを一旦空にする
  todoList.innerHTML = '';

  // 3. Todo ごとに DOM 要素を生成して追加
  filtered.forEach((todo) => {
    // <li> を作成
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    // チェックボックス
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // テキスト
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    // 削除ボタン
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    // li に子要素を追加
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // ul に li を追加
    todoList.appendChild(li);
  });
}
```

**学びポイント（ここが一番大事）**:

| やっていること   | React だと...        | Vanilla JS だと...                             |
| ---------------- | -------------------- | ---------------------------------------------- |
| 要素を作る       | JSX `<li>`           | `document.createElement('li')`                 |
| テキストを入れる | `{todo.text}`        | `span.textContent = todo.text`                 |
| クラスを付ける   | `className="..."`    | `li.className = '...'`                         |
| イベントを付ける | `onChange={handler}` | `checkbox.addEventListener('change', handler)` |
| 子要素を追加     | JSX のネスト         | `li.appendChild(child)`                        |
| リスト描画       | `todos.map(...)`     | `todos.forEach(...)` + `appendChild`           |

- `textContent` を使う理由: `innerHTML` と違い **XSS（スクリプト注入攻撃）を防げる**
- `render()` は **毎回リストを全部作り直す**（React の仮想 DOM がやっていることを手動でやっている）

---

### Step 6: イベントをバインドする

```js
// =============================
// Step 6: イベントリスナー
// =============================

// 「追加」ボタンクリック
addBtn.addEventListener('click', addTodo);

// Enter キーでも追加できるようにする
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// フィルターボタン
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // 現在のフィルターを更新
    currentFilter = btn.dataset.filter;

    // active クラスの付け替え
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // 再描画
    render();
  });
});
```

**学びポイント**:

- `addEventListener(イベント名, コールバック関数)` が Vanilla JS のイベント処理の基本
- `btn.dataset.filter` は HTML の `data-filter` 属性の値を取得する（カスタムデータ属性）
- `classList.add()` / `classList.remove()` でクラスの付け外しができる
- React の `onClick={handler}` は内部的にこの `addEventListener` を使っている

---

### Step 7: LocalStorage で永続化する

```js
// =============================
// Step 7: LocalStorage
// =============================

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}
```

**学びポイント**:

- `localStorage` は **文字列しか保存できない** → `JSON.stringify` / `JSON.parse` で変換する
- ブラウザを閉じてもデータが残る（`sessionStorage` はタブを閉じると消える）
- React で言えば、`useEffect` + `localStorage` でやっていた処理を素の関数で書いているだけ

---

### Step 8: 初期化処理

```js
// =============================
// Step 8: アプリの起動
// =============================

loadTodos(); // 保存済みデータを読み込む
render(); // 画面に表示する
```

ファイルの最後に書きます。これでアプリが起動します。

---

## 4. 完成後にやること — 理解チェック

以下の課題に取り組むことで理解が深まります。

### レベル 1（基礎確認）

- [ ] Todo をダブルクリックして **テキストを編集** できるようにする
- [ ] 「完了済みをすべて削除」ボタンを追加する
- [ ] 残りタスク数を表示する（例: 「残り 3 件」）

### レベル 2（応用）

- [ ] Todo に **期限（日付）** を追加する
- [ ] **ドラッグ & ドロップ** で並べ替えできるようにする（`dragstart` / `dragover` / `drop` イベント）
- [ ] CSS アニメーションで追加・削除時にフェードイン / フェードアウトさせる

### レベル 3（設計力）

- [ ] `render()` を毎回全部作り直すのではなく、**差分だけ更新** するように書き換える（React の仮想 DOM を自力で体験）
- [ ] コードを **モジュール分割** する（ES Modules の `import` / `export`）

---

## 5. React と Vanilla JS の対応まとめ

| 概念           | React                        | Vanilla JS                      |
| -------------- | ---------------------------- | ------------------------------- |
| 状態管理       | `useState` / `useReducer`    | ただの変数（`let`）             |
| 再レンダリング | 状態変更で自動               | `render()` を手動で呼ぶ         |
| DOM 生成       | JSX                          | `document.createElement`        |
| イベント       | `onClick={fn}`               | `addEventListener('click', fn)` |
| 副作用         | `useEffect`                  | 直接関数を呼ぶ                  |
| リスト描画     | `.map()` + `key`             | `.forEach()` + `appendChild`    |
| DOM 参照       | `useRef`                     | `document.querySelector`        |
| データ永続化   | `useEffect` + `localStorage` | 関数を直接呼ぶ                  |

---

## 6. よく使う DOM API 一覧

```
// 要素の取得
document.querySelector(selector)       // 1 つ取得
document.querySelectorAll(selector)    // 全て取得（NodeList）
document.getElementById(id)            // ID で取得

// 要素の作成・追加・削除
document.createElement(tag)            // 要素を作成
parent.appendChild(child)              // 子要素を追加
parent.removeChild(child)              // 子要素を削除
parent.insertBefore(new, ref)          // 指定要素の前に挿入

// 属性・クラス・テキスト
el.textContent = '...'                 // テキストを設定（安全）
el.innerHTML = '...'                   // HTML を設定（XSS 注意）
el.classList.add / remove / toggle     // クラスの操作
el.setAttribute(name, value)           // 属性を設定
el.dataset.xxx                         // data-xxx 属性の取得

// イベント
el.addEventListener(event, callback)   // イベントを登録
el.removeEventListener(event, cb)      // イベントを解除

// スタイル
el.style.property = value              // インラインスタイル
```

---

**Happy Coding! 💪**  
React が「何をやってくれているのか」を体感することで、React 自体の理解も深まります。
