var siteName = document.getElementById("bm-name");
var siteUrl = document.getElementById("bm-url");
var rule = document.getElementById("dialog");
var dialogmessage = document.getElementById("message");

var siteList;

if (localStorage.getItem("site") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("site"));
  display();
}

function add() {
  siteinfo = {
    name: siteName.value,
    url: siteUrl.value,
  };

  var print = true;
  if (siteinfo.name.length >= 3 && siteinfo.url.includes("https://")) {
    if (siteList.length == 0) {
      siteList.push(siteinfo);
      localStorage.setItem("site", JSON.stringify(siteList));
      display();
    } else {
      for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name === siteinfo.name) {
          print = false;
        }
      }

      if (print === true) {
        siteList.push(siteinfo);
        localStorage.setItem("site", JSON.stringify(siteList));
        display();
      } else {
        dialogmessage.showModal();
      }
    }
  } else {
    rule.showModal();
  }
}

function display() {
  var container = "";
  for (var i = 0; i < siteList.length; i++) {
    container += `  <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td><a  class="btn " href="${
                  siteList[i].url
                }" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button onclick="deleteSite(${i})" class="btn"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr> 

      `;
  }

  document.getElementById("tbody").innerHTML = container;
}

function deleteSite(deleteIndex) {
  siteList.splice(deleteIndex, 1);
  localStorage.setItem("site", JSON.stringify(siteList));
  display();
}

function dialogClose(type) {
  type.close();
}
