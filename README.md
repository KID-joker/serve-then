# serve-then

[![NPM version](https://img.shields.io/npm/v/serve-then?color=a1b858&label=)](https://www.npmjs.com/package/serve-then)

Inspired by [start-server-and-test](https://github.com/bahmutov/start-server-and-test), but this isn't a cli tool.
It will run a server in the **child_process**, and return the **URL**, then you can do what you want. *When the current process ends, the child_process will also end.*

### features

1. Based on and offering all features of [live-server](https://github.com/tapio/live-server), But [it](https://github.com/KID-joker/live-server) has a few changes:
   - convert start/shutdown into Promise style.
   - reject if port is specified and already in use. (0 means random)
2. Ships ESM and CJS bundles.
3. Can get the server URL.
4. Destroy child_process following the current process.

### usage

```ts
import { serve, serveOptions } from 'serve-then'

serve(options as serveOptions).then(url => {
  // serving root at url
}).catch(err => {})
```

### License

[MIT](./LICENSE) License © 2023 [KID-joker](https://github.com/KID-joker)