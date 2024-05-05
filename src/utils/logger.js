import chalk from "chalk";

const customLog = globalThis.console.log;

const lineDivider = () =>
  customLog("+++++++++++++++++++++++++++++++++++++++++++++++++");

const lineFeed = () => customLog("\n");

const logServerRun = ({ appVersion, port }) => {
  lineDivider();
  lineFeed();
  customLog(
    chalk.yellow("👋", chalk.bold("Notekeeper API"), `v.${appVersion} is up!`)
  );
  lineFeed();
  customLog(chalk.green(`🚀 Server running at http://localhost:${port} ...`));
  lineFeed();
  lineDivider();
};

export default { logServerRun };
