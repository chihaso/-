function openFile(url) {
  const p = new Promise(function(onFulfilled, onRejected) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", e => {
      console.log(xhr.responseText);
      // onFulfilled();
    });
    xhr.send();
  });
  return p;
}

const prefix = "http://localhost:7070/";

/* パターン1 */
// thenでチェーンすると、a,b,cと順番に表示する
// openFile(prefix + "a.txt")
//   .then(() => {
//     openFile(prefix + "b.txt");
//     // console.log("ひとつめのthenメソッド");
//   })
//   .then(() => {
//     openFile(prefix + "c.txt");
//     // console.log("ふたつめのthenメソッド");
//   });

/* パターン2 */
// thenを使わないと、順不同となる
// openFile(prefix + "a.txt");
// openFile(prefix + "b.txt");
// openFile(prefix + "c.txt");

/* パターン3 */
// 繰り返し文によるthenチェーンの実現
let promise = Promise.resolve(); // 解決済みの空のPromiseを作る

const dataIds = ["a", "b", "c"];
for (const id of dataIds) {
  promise = promise.then(() => openFile(prefix + `${id}.txt`));
}
console.log("これが最終行です");
