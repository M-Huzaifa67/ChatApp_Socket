

const ip = require("ip");
// const os = require("os");

function getIPV4() {
return ip.address();

  // const interfaces = os.networkInterfaces();
  // for (const name of Object.keys(interfaces)) {
  //   for (const net of interfaces[name]) {
  //     if (net.family === "IPv4" && !net.internal) {
  //       return net.address;
  //     }
  //   }
  // }
}

module.exports = {getIPV4};