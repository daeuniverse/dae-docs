---
sidebar_position: 8
---

# Changelogs

Also seen in [GitHub Releases](https://github.com/daeuniverse/dae/releases)

## Query history releases

```bash
curl --silent "https://api.github.com/repos/daeuniverse/dae/releases" | jq -r '.[] | {tag_name,created_at,prerelease}'
```

## Releases

- [0.1.7 (Pre-release)](#0.1.7)
- [0.1.6](#0.1.6)
- [0.1.5 (Current)](#0.1.5)
- [0.1.4](#0.1.4)
- [0.1.3](#0.1.3)
- [0.1.2](#0.1.2)
- [0.1.1](#0.1.1)
- [0.1.0](#0.1.0)

### 0.1.7 (Pre-release)

> Release date: 2023/04/12

#### Feature

1. Add support to use `global.sniffing` to set the timeout of sniffing, and it is useful to increase the timeout for LANS with high latency.

#### Fix

1. Fix the issue of not being able to resolve the `VMESS + WS + TLS` share link in ShadowRocket.
2. Fix the issue of domain name sniffing failure.

#### PR

- chore: fix domain regex example by @troubadour-hell in https://github.com/daeuniverse/dae/pull/53
- doc: add badges and contribution guide by @yqlbu in https://github.com/daeuniverse/dae/pull/54

#### New Contributors

- @troubadour-hell made their first contribution in https://github.com/daeuniverse/dae/pull/53

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.6...v0.1.7

### 0.1.6

> Release date: 2023/04/09

#### Feature

- Add supports to use `reject` for outbound in `DNS request routing section.
- Add support for outbound routing using `must group names`. This rule will be enforced on DNS requests directly through a specific group, bypassing DNS modules, available to users that have special use cases.
- Add support to use `must_rules` four outbound routing. Requests that hit such outbound will bypass the DNS module and will route based on rules for users that have special use cases.
- Add support to non-standard `bool` value parsing in VMESS formatting followed by V2RAYN.
- Add supports to use `ipversion_prefer` in DNS section. Specify return ONLY ipv4 or ipv6 response if the NIC is dual-stack.

#### Fix

- Fix support for unordered IP sequences in response routing in DNS.
- Fix potential panic issue for `trojan` protocol
- Add support to re-route traffic under the condition of the DNS cache is lost and the dial is domain, to mitigate the problem of not being able to use domain for routing when the DNS cache is lost.
- Fix issue of not being able to load some video games that rely heavily on internet connection. The reason behind the scene is that dae always waits for the client to send packets when TCP establishes a connection, but in some games, the first packet is pushed by the server, so it gets stuck in an infinite wait.

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.5...v0.1.6

### 0.1.5 (Latest)

> Release date: 2023/03/29

#### Changelogs

- Fix a problem that might occur when WAN binding sets to auto.
- Fix support of HTTPS (naiveproxy), adding long connections and multiplexing to H2.
- Remove the DNS answer detector as it does not always work in all locales and slows down queries when it fails.
- doc(example.dae)：add examples to demonstrate how to select a specific node @yqlbu in https://github.com/daeuniverse/dae/pull/44
- doc(example.dae)：add a new tcp health check url by @yqlbu in https://github.com/daeuniverse/dae/pull/46

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.4...v0.1.5

### 0.1.4

> Release date: 2023/03/25

#### Changelogs

- Domain-based routing will ignore rather than prompting error when giving a non-standard domain name.
- Add the config directory to the search path for geodata.
- Optimize udp memory usage.
- Ignore Sighup and use SIGUSR2 as the suspend signal.
- Add support to config sysctl params automatically
- Documentation: Add debian-kernel-upgrade-guide by @yqlbu in https://github.com/daeuniverse/dae/pull/39

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.3...v0.1.4

### 0.1.3

> Release date: 2023/03/24

#### User related

- Add support to build `amd64_v2_sse` and `amd64_v3_avx` executables. Use a higher version to build could theoretically improve some performance (the CI for this Release failed, but maybe next time) by @MarksonHon in https://github.com/daeuniverse/dae/pull/38
- Supports automatic detection of WAN interfaces by filling auto in the WAN.
- Fix incorrect rollback behavior when a hot overload failed and fix possible inability to connect to a new group when changing the group configuration under certain conditions.
- Fix bind to WAN network connectivity issues in the condition of MAC address routing.
- Modify the link used for network connectivity checks at startup.
- Fix possible failure of DNS split under certain conditions.

#### Developer related

- Source code, including go vendor and Git submodules, is packaged and published with releases.
- Added a description of the export command.

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.2...v0.1.3

### 0.1.2

> Release date: 2023/03/22

1. Optimize DNS cache behavior for outbound out of range for hot overload.
2. Add Qualcomm's generate_204 as a link to check the network connectivity, addressing the problem of some users not being able to access www.msftconnecttest.com.
3. Support Loong64 architecture.
4. Fix possible crashes under large concurrency use case.

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.1...v0.1.2

### 0.1.1

> Release date: 2023/03/16

#### What's Changed

- feat: shorten docker command arguments by leveraging CMD by @kunish in https://github.com/daeuniverse/dae/pull/35

#### New Contributors

- @kunish made their first contribution in https://github.com/daeuniverse/dae/pull/35

**Full Changelog**: https://github.com/daeuniverse/dae/compare/v0.1.0...v0.1.1

### 0.1.0

> Release date: 2023/03/14

Goose out of shell.
