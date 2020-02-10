/* パターン1 */
// 1ファイルだけならまあなんとかわかる
// const xhr1 = new XMLHttpRequest();
// xhr1.open("GET", "http://localhost:7070/a.txt");
// xhr1.addEventListener("load", event => console.log(xhr1.response));
// xhr1.send();

/* パターン2 */
// コールバック地獄
// 複数ファイルになるとネストされてつらい
// const xhr1 = new XMLHttpRequest();
// xhr1.open("GET", "http://localhost:7070/a.txt");
// xhr1.addEventListener("load", event => {
//   const xhr2 = new XMLHttpRequest();
//   xhr2.open("GET", "http://localhost:7070/b.txt");
//   xhr2.addEventListener("load", event => {
//     const xhr3 = new XMLHttpRequest();
//     xhr3.open("GET", "http://localhost:7070/c.txt");
//     xhr3.addEventListener("load", event => {
//       console.log(xhr3.response);
//     });
//     xhr3.send();
//     console.log(xhr2.response);
//   });
//   xhr2.send();
//   console.log(xhr1.response);
// });
// xhr1.send();

/* パターン3 */
// もう少し綺麗にも書けるがネストされるのは変わらないので辛い
function openFile(url, onload) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("load", e => {
    onload(e, xhr);
    console.log(xhr.response);
  });
  xhr.send();
}

openFile("http://localhost:7070/a.txt", (event, xhr) => {
  openFile("http://localhost:7070/b.txt", (event, xhr) => {
    openFile("http://localhost:7070/c.txt", (event, xhr) => {});
  });
});
