const { fixPort, defaultPort } = require("./fixport");
module.exports = [
  {
    name: "fix-server-port [newport]",
    description: `Replace default port with new port. Default port is 8081`,
    options: [
      {
        command: "-o --oldport [port#]",
        description: "Old port number to be replaced. Default 8081"
      }
    ],
    func: (argv, args, options) => {
      const oldPort = options.oldport || defaultPort;
      fixPort(argv[0], oldPort);
    }
  }
];
