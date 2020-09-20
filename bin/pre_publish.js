const path = require("path");
const fs = require("fs");
const ncp = require("ncp");
const packageJson = require("../package.json");

const distDir = path.join(__dirname, "..", "dist");

const copyFileToPublish = (fileName) => {
  const srcPath = path.join(__dirname, "..", fileName);
  const destPath = path.join(distDir, fileName);
  if(fs.existsSync(srcPath)){
    fs.copyFileSync(srcPath, destPath);
  }
};

copyFileToPublish("README.md");
copyFileToPublish("LICENSE");
copyFileToPublish("CHANGELOG");

if(typeof packageJson.dependencies !== "undefined") delete packageJson.dependencies;
if(typeof packageJson.devDependencies !== "undefined") delete packageJson.devDependencies;
if(typeof packageJson.scripts !== "undefined") delete packageJson.scripts;

fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(packageJson, null, 2));

const distSrcDir = path.join(distDir, "src");
if(fs.existsSync(distSrcDir)){
  fs.rmdirSync(distSrcDir, {recursive: true});
}
ncp(path.join(__dirname, "..", "src"), distSrcDir);
