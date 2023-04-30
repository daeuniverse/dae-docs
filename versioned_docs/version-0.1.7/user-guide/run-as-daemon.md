---
position: 4
---

# Run as Systemd Service

dae can run as a **daemon(systemd) service** so that it can run at boot.

[systemd](https://wiki.debian.org/systemd) allows you to create and manage services in extremely powerful and flexible ways.

:::note note

If your distribution's service manager is provided by systemd.

:::

## Prerequisites

### Optional Geo Data Files

For more convenient traffic split, dae relies on the following data sources, [geoip.dat](https://github.com/v2ray/geoip/releases/latest) and [geosite.dat](https://github.com/v2fly/domain-list-community/releases/latest).

```bash
mkdir -p /usr/local/share/dae/
pushd /usr/local/share/dae/
curl -L -o geoip.dat https://github.com/v2ray/geoip/releases/latest/download/geoip.dat
curl -L -o geosite.dat https://github.com/v2ray/domain-list-community/releases/latest/download/dlc.dat
popd
```

### Configuration File

:::tip tips

The config file is recommended to save under `/etc/dae`

:::

Download the sample config file:

```bash
mkdir -p /etc/dae
curl -L -o /etc/dae/config.dae https://github.com/daeuniverse/dae/raw/main/example.dae
```

## Setup

```bash
# download the sample systemd.service
sudo curl -L -o /etc/systemd/system/dae.service https://github.com/daeuniverse/dae/raw/main/install/dae.service

# reload and restart daemon to take effect
sudo systemctl daemon-reload
sudo systemctl enable dae --now
sudo systemctl status dae
```

## Check System Logs

```bash
sudo journalctl -xefu dae
```
