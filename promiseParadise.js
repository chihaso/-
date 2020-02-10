const prefix = "http://localhost:7070/";

function openFile(url) {
  const p = new Promise(function(onFulfilled, onRejected) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", e => {
      console.log(xhr.responseText);
      onFulfilled(console.log(`${url}をよみこんだ！`));
    });
    xhr.send();
  });
  return p;
}

openFile(prefix + "a.txt")
  .then(() => {
    openFile(prefix + "b.txt");
    console.log("ひとつめのthenメソッド");
  })
  .then(() => {
    openFile(prefix + "c.txt");
    console.log("ふたつめのthenメソッド");
  });

for (let i = 0; i < 10; i++) {
  openFile(prefix + "/a.txt");
}
console.log("これが最終行です");
