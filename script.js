const params = new URLSearchParams(window.location.search);

const paramsObject = {};

for (let [key, value] of params.entries()) {
  paramsObject[key] = value;
}

const fetchBlob = (mediaType, title) => {};

if (paramsObject.dUrl) {
  location.href = paramsObject.dUrl;
}
