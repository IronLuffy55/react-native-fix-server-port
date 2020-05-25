const { fixPort, defaultPort, getPackageJSON } = require("./");
module.exports = {
  commands: [
    {
      name: "fix-server-port [newport]",
      description: `Replace default port with new port. Default port is 8081`,
      options: [
        {
          command: "-o --oldport [port#]",
          description: "Old port number to be replaced. Default 8081",
        },
      ],
      func: (argv, args, options) => {
        let oldPort = options.oldport;
        if (!oldPort) oldPort = getPackageJSON().port;
        if (!oldPort) oldPort = defaultPort;
        fixPort(argv[0], oldPort);
      },
    },
  ],
};
