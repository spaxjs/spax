#! /usr/bin/env node --harmony

const program = require("commander");

const packageJson = require("./package.json");

program
  .version(packageJson.version, "-v, --version")
  .usage("[command] [args]")
  .command(
    "init <project-directory> [template]",
    "initialize a scaffolder from github repositories.",
    { isDefault: true },
  )
  .parse(process.argv);
