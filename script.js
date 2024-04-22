const params = new URLSearchParams(window.location.search);

const paramsObject = {};
const downloadBtn = document.getElementById("downloadButton");

for (let [key, value] of params.entries()) {
  paramsObject[key] = value;
}

const fetchBlob = async () => {
  if (paramsObject.dUrl) {
    downloadBtn.innerHTML = `<a class='' href=${paramsObject.dUrl}>Download Video</a>`;
  }
};

fetchBlob();
