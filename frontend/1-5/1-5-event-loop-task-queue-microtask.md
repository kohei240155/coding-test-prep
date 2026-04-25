# 1-5. イベントループ・タスクキュー・マイクロタスク — ハンズオン学習ガイド

> JavaScript はシングルスレッドなのに、なぜ非同期処理が実現できるのか。コールスタック（1-4 で学習済み）の「外側」で何が起きているかを、実際にコードを動かしながら理解する教材。

---

## 0. この教材のねらい

**想定所要時間: 約 60 分**

- イベントループの「1 サイクル」で何が起きるかを図と言葉で説明できる
- `setTimeout(fn, 0)` がなぜ「即座に実行されない」のかをメカニズムから説明できる
- タスクキュー（マクロタスク）とマイクロタスクキューの優先度の違いを実演できる
- `Promise.then` / `queueMicrotask` / `setTimeout` / `await` の実行順を正確に予測できる

---

## 1. setTimeout は「すぐ」ではない

### Step 1: setTimeout(fn, 0) はなぜ即実行されないのか

**このステップの狙い:** `setTimeout` が「遅延 API」ではなく「スケジューリング API」であることを、出力順のズレから体感する。

#### 🎯 予想クイズ

以下のコードを実行すると、コンソールには何が出力されるでしょうか？ 予想を書き留めてから次に進んでください。

```js
// non-blocking.js
console.log('1: main 開始');

setTimeout(function delayedTask() {
  console.log('2: setTimeout のコールバック実行');
}, 0); // 0ms 指定なのに…？

console.log('3: main 終了');
```

**予想（いずれかを選ぶ）:**

- A) `1: main 開始` → `2: setTimeout のコールバック実行` → `3: main 終了` ← よくある誤解（0ms だからすぐ実行されるはず）
- B) `1: main 開始` → `3: main 終了` → `2: setTimeout のコールバック実行`
- C) `2: setTimeout のコールバック実行` → `1: main 開始` → `3: main 終了`
- D) エラーになる

#### 💻 実行して答え合わせ

上のコードをコピーしてファイルに保存し、以下で実行:

```bash
node non-blocking.js
```

<details>
<summary>✅ 答え合わせ（予想を書き留めてからクリック）</summary>

**実際の出力:**

```
1: main 開始
3: main 終了
2: setTimeout のコールバック実行
```

正解は **B**。

**なぜこうなるか:**

> `setTimeout(fn, 0)` は「0ms 後に実行」ではなく「**タスクキューに入れて、コールスタックが空になったら実行**」という意味。以下の流れが起きている：
>
> ```
> 1. console.log('1: main 開始')     → コールスタックで即実行
> 2. setTimeout(delayedTask, 0)      → Web API / Node のタイマーに登録。コールバックはキューへ
> 3. console.log('3: main 終了')     → コールスタックで即実行
> 4. --- コールスタックが空になった ---
> 5. イベントループがタスクキューを確認 → delayedTask を取り出して実行
> ```
>
> JavaScript はシングルスレッド。コールスタック上の関数が完了するまで、次のタスクには進めない。`setTimeout` は遅延 API ではなく、**スケジューリング API** と理解するのが正しい。
>
> 「0ms だからすぐ実行されるはず」は最もよくある誤解。**タイマーの遅延は「最短でその時間後」であり、コールスタックが詰まっていればもっと遅れる**。

</details>

---

## 2. イベントループの優先順位

### Step 2: マイクロタスクとマクロタスクの優先順位を観察する

**このステップの狙い:** マイクロタスクキューが「全部消化」、マクロタスクキューが「1 個ずつ」という非対称性を理解する。

予想クイズの前に、イベントループの構造を頭に入れてください。

```
┌──────────────────────────────────────────────┐
│                  コールスタック                  │
│  (同期コードが上から順に積まれて実行される)        │
└──────────────┬───────────────────────────────┘
               │ コールスタックが空になったら
               ▼
┌──────────────────────────────────────────────┐
│             マイクロタスクキュー                  │
│  (Promise.then, queueMicrotask)              │
│  → すべて処理するまで次に進まない               │
└──────────────┬───────────────────────────────┘
               │ マイクロタスクが空になったら
               ▼
┌──────────────────────────────────────────────┐
│         タスクキュー（マクロタスクキュー）          │
│  (setTimeout, setInterval, I/O callbacks)    │
│  → 1 つ取り出して実行 → またマイクロタスク確認    │
└──────────────────────────────────────────────┘
```

> **ポイント:** イベントループの 1 サイクルは「マイクロタスクを **全部** 消化 → マクロタスクを **1 つ** 実行」。この非対称性がすべての鍵。

#### 🎯 予想クイズ

以下のコードを実行すると、コンソールには何が出力されるでしょうか？ **1〜5 の番号が書かれた順**を予想してください。

```js
// event-loop-anatomy.js
// イベントループの1サイクルを観察する

console.log('1: script 開始 (同期)');

setTimeout(function macroTask() {
  console.log('5: setTimeout コールバック (マクロタスク)');
}, 0);

Promise.resolve().then(function microTask() {
  console.log('3: Promise.then コールバック (マイクロタスク)');
});

queueMicrotask(function anotherMicroTask() {
  console.log('4: queueMicrotask コールバック (マイクロタスク)');
});

console.log('2: script 終了 (同期)');
```

**予想（いずれかを選ぶ）:**

- A) 1 → 2 → 3 → 4 → 5
- B) 1 → 2 → 5 → 3 → 4 ← よくある誤解（setTimeout の 0ms が最優先だと思う）
- C) 1 → 5 → 2 → 3 → 4
- D) 1 → 3 → 4 → 2 → 5

#### 💻 実行して答え合わせ

上のコードをコピーしてファイルに保存し、以下で実行:

```bash
node event-loop-anatomy.js
```

<details>
<summary>✅ 答え合わせ（予想を書き留めてからクリック）</summary>

**実際の出力:**

```
1: script 開始 (同期)
2: script 終了 (同期)
3: Promise.then コールバック (マイクロタスク)
4: queueMicrotask コールバック (マイクロタスク)
5: setTimeout コールバック (マクロタスク)
```

正解は **A**（ラベル番号と出力順が一致）。

**なぜこうなるか:**

> 1. 同期コード（`1:`, `2:`）がまずコールスタックで実行される
> 2. `setTimeout` のコールバックはタスクキュー（マクロタスク）に入る
> 3. `Promise.then` と `queueMicrotask` のコールバックはマイクロタスクキューに入る
> 4. 同期コードが終わり、コールスタックが空になる
> 5. イベントループがまず **マイクロタスクキューをすべて** 処理（3 → 4）
> 6. マイクロタスクが空になったので、タスクキューから **1 つ** 取り出して実行（5）
>
> さらに重要：マイクロタスクの中で新たなマイクロタスクを追加しても、そのマイクロタスクも「今のマイクロタスク消化フェーズ」で処理される。マイクロタスクキューが完全に空になるまで、マクロタスクキューには手をつけない。
>
> 「setTimeout の 0ms は最優先」という誤解はとても多いが、**マクロタスクはマイクロタスクより必ず後回し**。`setTimeout(fn, 0)` より `Promise.resolve().then(fn)` のほうが常に先に走る。

</details>

#### 🔁 派生クイズ（ミニ予想）

上のコードで、マイクロタスクの中にさらに `queueMicrotask` を入れたら、`5: setTimeout` との実行順はどうなる？

```js
console.log('1: 同期');

setTimeout(() => console.log('5: setTimeout'), 0);

Promise.resolve().then(() => {
  console.log('3: 最初のマイクロタスク');
  queueMicrotask(() =>
    console.log('4: マイクロタスクの中で追加されたマイクロタスク'),
  );
});

console.log('2: 同期 終了');
```

- A) 1 → 2 → 3 → 5 → 4（追加されたマイクロタスクは setTimeout の後）
- B) 1 → 2 → 3 → 4 → 5（追加されたマイクロタスクも setTimeout の前に処理される）
- C) 1 → 2 → 5 → 3 → 4
- D) 1 → 2 → 3 → 4 → 4 → 5（無限ループになる）

<details>
<summary>✅ 答え合わせ</summary>

**実際の出力:**

```
1: 同期
2: 同期 終了
3: 最初のマイクロタスク
4: マイクロタスクの中で追加されたマイクロタスク
5: setTimeout
```

正解は **B**。

**ポイント:**

> マイクロタスク処理中に新たに enqueue されたマイクロタスクも、**今のフェーズ内で処理される**。マイクロタスクキューが本当に空になるまでマクロタスクには進まない。これがマイクロタスクで無限ループを作ると UI が固まる理由でもある（Step 4 で見る）。

</details>

---

## 3. async/await の実行順

### Step 3: async/await の実行順序を予測する

**このステップの狙い:** `await` が「関数を一時停止し、残りをマイクロタスク化する」仕組みを実行順から読み解く。

`async/await` は Promise のシンタックスシュガー。イベントループの観点でどう動くか確認しましょう。

#### 🎯 予想クイズ

以下のコードを実行すると、コンソールには何が出力されるでしょうか？ 1〜6 の番号順を予想してください。

```js
// async-await-order.js
async function asyncFunction() {
  console.log('2: asyncFunction 開始 (同期部分)');

  const result = await Promise.resolve('resolved!');
  // ↑ ここで asyncFunction は一時停止し、残りはマイクロタスクとしてキューに入る

  console.log('5: await の後 (マイクロタスク):', result);
  return result;
}

console.log('1: script 開始');

asyncFunction().then(function thenCallback(value) {
  console.log('6: asyncFunction の .then:', value);
});

Promise.resolve().then(function otherMicro() {
  console.log('4: 別の Promise.then');
});

console.log('3: script 終了');
```

**予想（いずれかを選ぶ）:**

- A) 1 → 2 → 3 → 4 → 5 → 6
- B) 1 → 2 → 3 → 5 → 4 → 6 ← よくある誤解（await の後続が先にキューされるはず）
- C) 1 → 2 → 5 → 3 → 4 → 6
- D) 1 → 2 → 3 → 5 → 6 → 4

#### 💻 実行して答え合わせ

上のコードをコピーしてファイルに保存し、以下で実行:

```bash
node async-await-order.js
```

<details>
<summary>✅ 答え合わせ（予想を書き留めてからクリック）</summary>

**実際の出力:**

```
1: script 開始
2: asyncFunction 開始 (同期部分)
3: script 終了
4: 別の Promise.then
5: await の後 (マイクロタスク): resolved!
6: asyncFunction の .then: resolved!
```

正解は **A**。

**なぜこうなるか:**

> `async function` の中で `await` に到達すると、その関数は **一時停止** する。`await` より後のコードは **マイクロタスクとしてキューに入る**。つまり：
>
> ```js
> // これは概念的にこう変換される：
> async function asyncFunction() {
>   console.log('2: ...'); // 同期実行
>   const result = await Promise.resolve('resolved!');
>   console.log('5: ...'); // ← ここからマイクロタスク
> }
>
> // ↓ 内部的にはこう動く：
> function asyncFunction() {
>   console.log('2: ...');
>   return Promise.resolve('resolved!').then((result) => {
>     console.log('5: ...', result);
>     return result;
>   });
> }
> ```
>
> `4:` が `5:` より先に出力されるのは、`otherMicro` と `await` の後続処理が両方マイクロタスクキューに入るが、`otherMicro` のほうが先にキューに登録されるため。
>
> 「await の後続は同期の直後にすぐ実行される」は典型的な誤解。**await は『Promise.then の糖衣』なので、後続コードは必ずマイクロタスクとして後回しになる**。

</details>

**React との比較:**

> React の `useEffect` のコールバックが実行されるタイミングも、イベントループと密接に関わっている。`useEffect` は描画後（マイクロタスク消化後）に実行される「マクロタスク的」なタイミング。一方 `useLayoutEffect` は描画前（マイクロタスクに近いタイミング）で実行される。

---

## 4. UI を壊す失敗例

### Step 4: マイクロタスクで UI をブロックする失敗例

**このステップの狙い:** 「マイクロタスクを全消化するまで描画されない」仕様を、UI が固まる現象として体感する。

#### 🎯 予想クイズ

以下の HTML をブラウザで開いて「悪い例」ボタンと「良い例」ボタンをそれぞれクリックすると、画面のカウンター表示はどうなるでしょうか？

```html
<!-- microtask-blocking.html -->
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>マイクロタスクによるUIブロック</title>
  </head>
  <body>
    <h1>カウンター: <span id="counter">0</span></h1>
    <button id="startBad">悪い例: マイクロタスクで100万回更新</button>
    <button id="startGood">良い例: マクロタスクで分割更新</button>

    <script>
      const counterEl = document.getElementById('counter');

      // 悪い例: マイクロタスクでループ → UI が固まる
      document
        .getElementById('startBad')
        .addEventListener('click', function onBadClick() {
          console.log('悪い例: 開始');
          let count = 0;

          function microLoop() {
            if (count < 1000000) {
              count++;
              counterEl.textContent = count;
              queueMicrotask(microLoop); // マイクロタスクで再帰
            } else {
              console.log('悪い例: 完了');
            }
          }

          microLoop();
          // マイクロタスクが全部消化されるまでブラウザは描画できない！
          // → 100万回完了するまで画面が固まり、最後に一気に「1000000」と表示される
        });

      // 良い例: setTimeout で分割 → UI が更新される
      document
        .getElementById('startGood')
        .addEventListener('click', function onGoodClick() {
          console.log('良い例: 開始');
          let count = 0;
          const batchSize = 1000;

          function macroLoop() {
            const end = Math.min(count + batchSize, 1000000);
            while (count < end) {
              count++;
            }
            counterEl.textContent = count;

            if (count < 1000000) {
              setTimeout(macroLoop, 0); // マクロタスクで次のバッチをスケジュール
              // → 各バッチの間にブラウザが描画できる
            } else {
              console.log('良い例: 完了');
            }
          }

          macroLoop();
        });
    </script>
  </body>
</html>
```

**予想（いずれかを選ぶ）:**

- A) 悪い例も良い例もカウンターが滑らかに 0 → 1000000 へカウントアップして見える ← よくある誤解（`textContent` を書いた瞬間に描画されると思う）
- B) 悪い例は画面が固まり最後に `1000000` が一瞬で出る／良い例はバッチごとに数字が更新されて見える
- C) 悪い例も良い例も最後に `1000000` だけが表示される
- D) 悪い例はエラーになる（`queueMicrotask` は再帰できない）

#### 💻 実行して答え合わせ

上の HTML を保存してブラウザで開き、両方のボタンを順にクリックして確認:

```bash
# 作業ディレクトリに microtask-blocking.html を保存してから
open microtask-blocking.html   # macOS の場合
# または Finder / Explorer からダブルクリックで開く
```

<details>
<summary>✅ 答え合わせ（予想を書き留めてからクリック）</summary>

**実際の挙動:**

|              | 悪い例（マイクロタスク）                 | 良い例（マクロタスク）            |
| ------------ | ---------------------------------------- | --------------------------------- |
| 画面更新     | 100万回完了まで固まる                    | バッチごとに更新される            |
| ユーザー操作 | 受け付けない                             | 応答可能                          |
| 理由         | マイクロタスクは全消化まで描画をブロック | setTimeout の間に描画が入り込める |

正解は **B**。

**なぜこうなるか:**

> ブラウザは「マイクロタスクキューが空になってから描画する」という仕様で動いている。マイクロタスクの中から別のマイクロタスクを無限に enqueue し続けると、**マイクロタスクキューが永遠に空にならず、描画が一切走らない**。
>
> 一方 `setTimeout` はマクロタスク。各バッチが終わると制御がイベントループに戻り、「次のマクロタスクを実行する前にブラウザが描画できる」隙ができる。これが「UI を固めない長時間処理」の基本パターン。
>
> 「`textContent` を書き換えれば即座に描画される」は非常によくある誤解。**DOM の書き換えはあくまで DOM ツリーの更新であり、実際のペイントはイベントループの隙間でしか走らない**。

</details>

**React との比較:**

> React 18 の Concurrent Mode が解決する問題はまさにこれ。大きなレンダリングを小さなチャンクに分割し、各チャンクの間にブラウザに制御を戻す。内部的には `MessageChannel`（マクロタスク）を使って「マクロタスク単位でチャンクを実行 → ブラウザに描画を許可 → 次のチャンク」というパターンを採用している。`startTransition` で「優先度の低い更新」をマークするのも、このスケジューリングの仕組みの上に成り立っている。

---

## 発展課題（任意）

時間に余裕があれば挑戦してください。

### 課題 1: setTimeout の遅延を変えても順序は変わるか

Step 1 のコードで `setTimeout` の遅延を `0` から `1000` に変えたら、出力の **順序** はどうなるでしょうか？

```js
console.log('1: main 開始');

setTimeout(function delayedTask() {
  console.log('2: setTimeout のコールバック実行');
}, 1000); // 0 から 1000 に変更

console.log('3: main 終了');
```

- A) `1` → `2` → `3`（1 秒待ってから全部順に出る）
- B) `1` → `3` → `2`（同期が先、1 秒後に setTimeout） ← 正しい挙動
- C) `1` → `3` の後、1 秒待っても `2` は出ない
- D) エラーになる ← よくある誤解（遅延が大きいと何かが変わると思う）

<details>
<summary>✅ 答え合わせ</summary>

**実際の結果:**

```
1: main 開始
3: main 終了
（1 秒後）
2: setTimeout のコールバック実行
```

正解は **B**。

**解説:**

> `setTimeout` の遅延は「最短でその時間後にキューに入れる」という意味で、**実行順の原則（同期 → マイクロタスク → マクロタスク）は変わらない**。遅延を大きくすると「マクロタスクが取り出されるまでの待ち時間」が長くなるだけ。順序そのものは 0 でも 1000 でも同じ。

</details>

### 課題 2: 実行順序パズル（面接頻出）

以下の出力順を **紙に書いてから** 実行してください。

```js
console.log('A');
setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => console.log('C'));
}, 0);
Promise.resolve().then(() => {
  console.log('D');
  setTimeout(() => console.log('E'), 0);
});
setTimeout(() => console.log('F'), 0);
Promise.resolve().then(() => console.log('G'));
console.log('H');
```

- A) A → H → D → G → B → C → F → E
- B) A → H → D → G → B → F → C → E ← よくある誤解（B の後、Promise の C より次のマクロタスク F が先に走ると思う）
- C) A → D → G → H → B → C → F → E
- D) A → H → B → F → D → G → C → E

<details>
<summary>✅ 答え合わせ</summary>

**実際の結果:**

```
A
H
D
G
B
C
F
E
```

正解は **A**。

**解説:**

> 1. 同期: `A` → `H`
> 2. マイクロタスクキュー消化: `D`（このとき `setTimeout(E)` がマクロタスクキューに追加される）→ `G`
> 3. マクロタスク 1 個: `B`（このとき `Promise.then(C)` がマイクロタスクキューに追加される）
> 4. マクロタスク 1 個終わるごとにマイクロタスクを全消化: `C`
> 5. 次のマクロタスク: `F`
> 6. マイクロタスクは空なので次: `E`
>
> **キーポイント:** マクロタスクを 1 つ実行したら、次のマクロタスクに進む前に必ずマイクロタスクキューを全消化する。だから `B` の直後に `C` が走り、`F` より先に出る。

</details>

### 課題 3: Node.js の process.nextTick と setImmediate

Node.js には `process.nextTick`（マイクロタスクより優先）と `setImmediate`（setTimeout の後）という固有 API がある。以下の出力順を予測して実行してみよう。

```js
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
```

- A) nextTick → promise → setTimeout → setImmediate
- B) nextTick → promise → setImmediate → setTimeout
- C) promise → nextTick → setTimeout → setImmediate ← よくある誤解（`Promise` のほうが優先度が高い気がする）
- D) setTimeout → setImmediate → nextTick → promise

<details>
<summary>✅ 答え合わせ</summary>

**実際の結果（典型例）:**

```
nextTick
promise
setTimeout
setImmediate
```

正解は **A**（環境により `setTimeout` と `setImmediate` の順は入れ替わることがある）。

**解説:**

> - `process.nextTick` は Node.js 固有で、**マイクロタスクよりさらに優先度が高い**（正確には nextTick キューが先）。
> - `Promise.then` は通常のマイクロタスク。
> - `setTimeout(fn, 0)` と `setImmediate(fn)` はどちらもマクロタスクだが、それぞれ別のフェーズで処理される。スクリプトのトップレベルから呼ぶ場合は OS のタイマー精度の影響で順が揺れるが、I/O コールバック内から呼ぶ場合は `setImmediate` が必ず先。
>
> Node.js の Event Loop は Phases（timers → pending → idle → poll → check → close）で構成されており、ブラウザよりも複雑。面接では「nextTick はマイクロタスクよりも優先」と言えれば十分。

</details>

---

## 理解チェック — 面接で聞かれたら

### Q1: 「JavaScript のイベントループを説明してください」

**模範回答（30 秒版）:**

> JavaScript はシングルスレッドで、1 つのコールスタックしか持ちません。イベントループは、コールスタックが空になったときにキューからタスクを取り出して実行する仕組みです。キューには優先度があり、マイクロタスク（Promise.then など）はマクロタスク（setTimeout など）より先に処理されます。マイクロタスクは全部消化してからマクロタスクに進むのが重要な特徴です。

### Q2: 「`setTimeout(fn, 0)` は本当に 0ms 後に実行されますか？」

**模範回答（30 秒版）:**

> いいえ。`setTimeout(fn, 0)` は「最短で次のマクロタスクのタイミングで実行」という意味です。コールスタックが空になり、マイクロタスクがすべて消化された後に初めて実行されます。また、ブラウザには最小遅延（ネストが深い場合は 4ms）の制限があるため、実際には 0ms にはなりません。
