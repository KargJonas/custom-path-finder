const cnv = document.createElement("canvas");
const ctx = cnv.getContext("2d");
cnv.oncontextmenu = () => false;
document.body.appendChild(cnv);

const width = height = 750;
cnv.width = width;
cnv.height = height;