let myRecord;
let userId = "tourist";
if (localStorage.getItem("key") != null) userId = localStorage.getItem("key");
console.log(userId);
asyncMain();
const styles = document.querySelector("body");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("called");
  userId = request;
  asyncMain();
});

async function asyncMain() {
  await fetch(`https://acrating.netlify.app/`, { mode: "cors" }).then(
    (response) => {
      return response.json().then((userInfo) => {
        myRecord = userInfo;
      });
    }
  );
  if (myRecord[0] === undefined) {
    styles.style.background = "black";
  } else {
    const rating = myRecord[myRecord.length - 1].NewRating;
    if (rating >= 3600) styles.style.background = "rgb(255, 215, 0)";
    else if (rating >= 3200) styles.style.background = "rgb(128, 128, 128)";
    else if (rating >= 2800) styles.style.background = "red";
    else if (rating >= 2400) styles.style.background = "rgb(255, 128, 0)";
    else if (rating >= 2000) styles.style.background = "rgb(192, 192, 0)";
    else if (rating >= 1600) styles.style.background = "blue";
    else if (rating >= 1200) styles.style.background = "rgb(0, 192, 192)";
    else if (rating >= 800) styles.style.background = "green";
    else if (rating >= 400) styles.style.background = "rgb(128, 64, 0)";
    else styles.style.background = "grey";
    localStorage.setItem("key", userId);
  }
}
