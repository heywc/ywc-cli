const path = require('path');
const inquirer = require('inquirer');

const {downloadDirectory} = require('./constants');
const {promisify} = require("util");
let downLoadGitRepo = require("download-git-repo");
downLoadGitRepo = promisify(downLoadGitRepo);

let ncp = require('ncp');
ncp = promisify(ncp);

const { waitFnLoading } = require('../utils/utils');

// 从远程仓库下载模板
const downloadTemplate = async(tag)=>{
    let api = `1842347744/${tag}`
    const dest = `${downloadDirectory}/${tag}`
    await downLoadGitRepo(api,dest);
    return dest;
}
module.exports = async(proName) => {
    // 从远程获取模板名
    // let tags = await waitFnLoading(fetchRepoList, 'template down loading....');
    // tags = tags.map(item => item.name)
    // 预设 模板名
    tags = ['vue2template', 'vue3template']
    const { tag } = await inquirer.prompt([/* 设置问题 */{
        type: 'list',
        name: 'tag',
        message: 'please choose a template to create project',
        choices: tags,
    }])
    // 下载模板,返回一个临时的目录
    const result = await waitFnLoading(downloadTemplate,'download template', tag);
    // 将临时目录的文件下载到当前目录中
    await ncp(result, path.resolve(proName))
}