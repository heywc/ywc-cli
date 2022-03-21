const ora = require('ora')

// 封装loading
const waitFnLoading = async(fn,message,...args) => {
    const spinner = ora(message);
    spinner.start(); // 开始加载loading
    let repos = await fn(...args);
    spinner.succeed('succeed ！'); // 结束加载loading
    return repos
}

// 临时下载目录
const downloadDirectory = `${process.env[process.platform === 'win32'? 'USERPROFILE' : 'HOME']}/.template`;

module.exports = {
    waitFnLoading,
    downloadDirectory
}