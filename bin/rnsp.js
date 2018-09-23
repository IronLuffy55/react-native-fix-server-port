#!/usr/bin/env node
const path = require("path");
const cp = require("child_process");
const scriptPort =
  process.platform === "win32" ? `%npm_package_port%` : `$npm_package_port`;
const p = require(path.join(process.cwd(), "package.json"));
if (!p) throw new Error(`${p} does not exist`);

cp.spawn("react-native", ["start", "--port", p.port || 8081], {
  stdio: "inherit"
});
