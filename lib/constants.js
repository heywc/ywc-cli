// 临时下载目录
const downloadDirectory = `${process.env[process.platform === 'win32'? 'USERPROFILE' : 'HOME']}/.template`;
module.exports = {
    downloadDirectory
}