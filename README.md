# react-native-fix-server-port
Package can change the port being used by the dev server. 

Removes manual step for projects where dev server needs to run port different from 8081 (default). Which can save time if rm -rf node_module is executed a lot

Notes:
1. iOS only
2. New port is saved to package.json
3. Enter 'yarn rnsp' to start react-native server with the new port

Credit:
Package created using react-native template generated by 'react-native-cli-cli'

TODO:
This is a dirty method that changes the files I know x-ante are required for port change to work. Need to look at how dev server spins up so I can write more intelligent code
