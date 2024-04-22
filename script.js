const params = new URLSearchParams(window.location.search);

const paramsObject = {};

for (let [key, value] of params.entries()) {
  paramsObject[key] = value;
}

console.log(paramsObject);



const fetchBlob = () => {
  
}
