#! /usr/bin/env node --harmony

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const download = require("download-git-repo");
const home = require("user-home");
const inquirer = require("inquirer");
const Metalsmith = require("metalsmith");
const ora = require("ora");
const program = require("commander");
const rimraf = require("rimraf");
const validateProjectName = require("validate-npm-package-name");

const packageJson = require("./package.json");

program
  .version(packageJson.version, "-v, --version")
  .parse(process.argv);

const [destDir, template = "crossjs/spax-starter-boilerplate"] = program.args;

if (!destDir) {
  console.error(chalk.red("请输入项目目录名，如:"));
  console.log(`  ${chalk.green("spax")} ${chalk.cyan("my-spax-app")}`);
  process.exit(1);
}

const root = path.resolve(destDir);

if (fs.pathExistsSync(root)) {
  console.error(chalk.red(`目录 ${chalk.cyan(destDir)} 已存在！请重新选择一个不存在的目录`));
  process.exit(1);
}

const name = path.basename(root);
checkName();

fs.ensureDirSync(root);

async function run(callback) {
  console.log();

  const { version, description } = await inquirer.prompt([{
    type: "input",
    name: "version",
    message: "版本号？",
    default: "1.0.0",
  }, {
    type: "input",
    name: "description",
    message: "项目简介？",
    default: "一个 SPAX 项目",
  }]);

  console.log();
  console.log(`将在 ${chalk.cyan(destDir)} 目录下创建 SPAX 项目`);
  console.log();

  const tmpDir = await dl();

  callback(version, description, tmpDir);
}

run((version, description, tmpDir) => {
  Metalsmith(tmpDir)
    .source(".")
    .destination(root)
    .use((files, metalsmith, done) => {
      const metadata = { name, version, description };

      Object.keys(files).forEach(key => {
        const str = files[key].contents.toString();
        files[key].contents = Buffer.from(
          str.replace(
            /\{\{(?<matchKey>name|version|description)\}\}/g,
            (__, matchKey) => metadata[matchKey],
          ),
        );
      });

      done();
    })
    .build(err => {
      if (err) {
        console.error(chalk.red(err.message.trim()));
        process.exit(1);
      }
      console.log(`项目 ${chalk.cyan(name)} 已就绪`);
      console.log();
      console.log(chalk.gray("===================================="));
      console.log(`  ${chalk.gray("$")} cd ${destDir}`);
      console.log(`  ${chalk.gray("$")} yarn`);
      console.log(`  ${chalk.gray("$")} yarn start`);
      console.log(chalk.gray("===================================="));
      console.log();
      console.log(chalk.green("使用手册请访问：https://spax.js.org"));
      console.log();
    });
});

function checkName() {
  const validationResult = validateProjectName(name);
  if (!validationResult.validForNewPackages) {
    console.error(
      `项目命名 ${chalk.red(name)} 不符合 NPM 规范：`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
}

function printValidationResults(results) {
  if (typeof results !== "undefined") {
    results.forEach(error => {
      console.error(chalk.red(`  * ${error}`));
    });
  }
}

async function dl() {
  return new Promise(resolve => {
    const tmp = path.join(home, ".spax", "cli", template);
    rimraf(tmp, () => {
      const spinner = ora("下载模板……");
      spinner.start();
      download(template, tmp, { clone: false }, err => {
        spinner.stop();
        if (err) {
          console.error(chalk.red(`模板 ${template} 下载失败：`));
          console.error(chalk.red(err.message.trim()));
          process.exit(1);
        }
        resolve(tmp);
      });
    });
  });
}
