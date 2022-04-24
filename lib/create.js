const path = require("path");
const inquirer = require("inquirer");
const { promisify } = require("util");
// loading;临时下载目录
const { waitFnLoading, downloadDirectory } = require("../utils/utils");
// 拷贝文件
let ncp = require("ncp");
ncp = promisify(ncp);
// 下载远程git仓库代码
let downLoadGitRepo = require("download-git-repo");
downLoadGitRepo = promisify(downLoadGitRepo);

// 从远程仓库下载模板
// tag: 模板名; proName:项目名; sign:是否作为临时文件
const downloadTemplate = async (tag, proName, sign) => {
  let api = `heywc/${tag}`;
  let pro = sign ? `${downloadDirectory}/${tag}` : proName;
  let repo = await downLoadGitRepo(api, pro);
  // 后续版本会使用
  return repo;
};

module.exports = async (proName) => {
  // 预设 模板名
  let tags = ["vue2template", "vue3template"];
  const { tag } = await inquirer.prompt([
    /* 设置问题 */ {
      type: "list",
      name: "tag",
      message: "please choose a template to create project",
      choices: tags,
    },
  ]);
  // 下载指定模板
  await waitFnLoading(
    downloadTemplate,
    "download template",
    tag,
    proName,
    false
  );

  // 后续版本使用
  // // 下载模板,返回一个临时文件
  // const result = await waitFnLoading(downloadTemplate,'download template', tag, proName, true);
  // // 将临时文件拷贝到当前目录中
  // await ncp(result, path.resolve(proName))
};
