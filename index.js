const cp = require("child_process");
const path = require("path");
const fs = require("fs");
const cwd = process.cwd();
const defaultPort = 8081;
function isNewPortDefined(filepath, port) {
  try {
    const cmd = `grep ${port} ${filepath} | wc -l`;
    const results = cp.execSync(cmd);
    const str = results.toString();
    const count = parseInt(str);
    return count > 0;
  } catch (error) {
    console.log(error);
  }
  return false;
}
function replacePort(filepath, newPort, oldPort) {
  if (isNewPortDefined(filepath, newPort)) {
    return;
  }
  const cmd = `sed 's/${oldPort}/${newPort}/g' ${filepath}`;
  const buffer = cp.execSync(cmd);
  const content = buffer.toString();
  fs.writeFileSync(filepath, content);
}
function getPackagePath() {
  return path.join(cwd, "package.json");
}
function getPackageJSON() {
  const p = getPackagePath();
  if (!fs.existsSync(p)) {
    return null;
  }
  const package = require(p);
  if (!package) {
    throw new Error(`package.json not found in ${p}`);
  }
  return package;
}
function fixPortForIOS(port, oldPort) {
  const baseReactPath = path.join(cwd, "node_modules", "react-native", "React");
  const filesToChange = [
    {
      baseDir: "base",
      filename: "RCTBridgeDelegate.h"
    },
    {
      baseDir: "base",
      filename: "RCTDefines.h"
    },
    {
      baseDir: "base",
      filename: "RCTDefines.h"
    },
    {
      baseDir: "DevSupport",
      filename: "RCTInspectorDevServerHelper.mm"
    }
  ];

  filesToChange.forEach(({ baseDir, filename }) => {
    const filepath = path.join(baseReactPath, baseDir, filename);
    if (!fs.existsSync(filepath)) {
      console.log(`${filepath} does not exist`);
      return;
    }
    replacePort(filepath, port, oldPort);
  });
}
function fixPort(port, oldPort = defaultPort) {
  let package = getPackageJSON();
  if (!port) {
    port = package.port;
  }
  if (!port) {
    console.log("No server port defined");
    return;
  }
  fixPortForIOS(port, oldPort);
  package.port = port;
  fs.writeFileSync(getPackagePath(), JSON.stringify(package, null, 2));
}
module.exports = { fixPort, defaultPort, getPackageJSON };
