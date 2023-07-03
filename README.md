# dae-docs

Official documentation site for [daeuniverse/dae](https://github.com/daeuniverse/dae).

Built with [Docusarus](https://docusaurus.io/), hosted on [Kubernetes](http://kubernetes.io/) with [Kong API Gateway](https://github.com/Kong/kong).

## How to run

bootstrap

```bash
npm install
```

run locally

```bash
npm start
```

compile as dist and host with http-server

```bash
# build artifacts
npm run build
# serve static files
npx http-server ./build/
```

release a new version

```bash
npm run docusaurus docs:version <version tag>
# or
npm run release <version tag>
# e.g npm run release v0.2.0
```

## References

- [Docusarus - Using Plugins](https://docusaurus.io/docs/next/using-plugins#using-themes)
- [Docusarus - Configurations](https://docusaurus.io/docs/next/configuration#theme-plugin-and-preset-configurations)
