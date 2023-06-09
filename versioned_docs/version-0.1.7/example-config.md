---
sidebar_position: 7
---

# Example Config

Original Copy: https://github.com/daeuniverse/dae/blob/main/example.dae

```python
global {
    # tproxy port to listen on. It is NOT a HTTP/SOCKS port, and is just used by eBPF program.
    # In normal case, you do not need to use it.
    tproxy_port: 12345

    # Log level: error, warn, info, debug, trace.
    log_level: info

    # Node connectivity check.
    # Host of URL should have both IPv4 and IPv6 if you have double stack in local.
    # Considering traffic consumption, it is recommended to choose a site with anycast IP and less response.
    #tcp_check_url: 'http://keep-alv.google.com/generate_204'
    tcp_check_url: 'http://gstatic.com/generate_204'

    # This DNS will be used to check UDP connectivity of nodes. And if dns_upstream below contains tcp, it also be used to check
    # TCP DNS connectivity of nodes.
    # This DNS should have both IPv4 and IPv6 if you have double stack in local.
    udp_check_dns: 'dns.google.com:53'

    check_interval: 30s

    # Group will switch node only when new_latency <= old_latency - tolerance.
    check_tolerance: 50ms

    # The LAN interface to bind. Use it if you want to proxy LAN.
    # Multiple interfaces split by ",".
    #lan_interface: docker0

    # The WAN interface to bind. Use it if you want to proxy localhost.
    # Multiple interfaces split by ",". Use "auto" to auto detect.
    wan_interface: auto

    # Allow insecure TLS certificates. It is not recommended to turn it on unless you have to.
    allow_insecure: false

    # Optional values of dial_mode are:
    # 1. "ip". Dial proxy using the IP from DNS directly. This allows your ipv4, ipv6 to choose the optimal path
    #       respectively, and makes the IP version requested by the application meet expectations. For example, if you
    #       use curl -4 ip.sb, you will request IPv4 via proxy and get a IPv4 echo. And curl -6 ip.sb will request IPv6.
    #       This may solve some wierd full-cone problem if your are be your node support that. Sniffing will be disabled
    #       in this mode.
    # 2. "domain". Dial proxy using the domain from sniffing. This will relieve DNS pollution problem to a great extent
    #       if have impure DNS environment. Generally, this mode brings faster proxy response time because proxy will
    #       re-resolve the domain in remote, thus get better IP result to connect. This policy does not impact routing.
    #       That is to say, domain rewrite will be after traffic split of routing and dae will not re-route it.
    # 3. "domain+". Based on domain mode but do not check the reality of sniffed domain. It is useful for users whose
    #       DNS requests do not go through dae but want faster proxy response time. Notice that, if DNS requests do not
    #       go through dae, dae cannot split traffic by domain.
    # 4. "domain++". Based on domain+ mode but force to re-route traffic using sniffed domain to partially recover
    #       domain based traffic split ability. It doesn't work for direct traffic and consumes more CPU resources.
    dial_mode: domain

    # Disable waiting for network before pulling subscriptions.
    disable_waiting_network: false

    # Automatically configure Linux kernel parameters like ip_forward and send_redirects. Check out
    # https://github.com/daeuniverse/dae/blob/main/docs/getting-started/kernel-parameters.md to see what will dae do.
    auto_config_kernel_parameter: true

    # Timeout to waiting for first data sending for sniffing. It is always 0 if dial_mode is ip. Set it higher is useful
    # in high latency LAN network.
    sniffing_timeout: 100ms
}

# Subscriptions defined here will be resolved as nodes and merged as a part of the global node pool.
# Support to give the subscription a tag, and filter nodes from a given subscription in the group section.
subscription {
    # Add your subscription links here.
    my_sub: 'https://www.example.com/subscription/link'
    another_sub: 'https://example.com/another_sub'
    'https://example.com/no_tag_link'
    'file://relative/path/to/mysub.sub' # Put subscription content in /etc/dae/relative/path/to/mysub.sub
}

# Nodes defined here will be merged as a part of the global node pool.
node {
    # Add your node links here.
    # Support socks5, http, https, ss, ssr, vmess, vless, trojan, trojan-go
    'socks5://localhost:1080'
    mylink: 'ss://LINK'
    node1: 'vmess://LINK'
    node2: 'vless://LINK'
}

# See https://github.com/daeuniverse/dae/blob/main/docs/dns.md for full examples.
dns {
    # For example, if ipversion_prefer is 4 and the domain name has both type A and type AAAA records, the dae will only respond to type A queries and response empty answer to type AAAA queries.
    #ipversion_prefer: 4

    upstream {
        # Value can be scheme://host:port, where the scheme can be tcp/udp/tcp+udp.
        # If host is a domain and has both IPv4 and IPv6 record, dae will automatically choose
        # IPv4 or IPv6 to use according to group policy (such as min latency policy).
        # Please make sure DNS traffic will go through and be forwarded by dae, which is REQUIRED for domain routing.
        # If dial_mode is "ip", the upstream DNS answer SHOULD NOT be polluted, so domestic public DNS is not recommended.

        alidns: 'udp://dns.alidns.com:53'
        googledns: 'tcp+udp://dns.google.com:53'
    }
    routing {
        # According to the request of dns query, decide to use which DNS upstream.
        # Match rules from top to bottom.
        request {
            # fallback is also called default.
            fallback: alidns
        }
        # According to the response of dns query, decide to accept or re-lookup using another DNS upstream.
        # Match rules from top to bottom.
        response {
            # Trusted upstream. Always accept its result.
            upstream(googledns) -> accept
            # Possibly polluted, re-lookup using googledns.
            !qname(geosite:cn) && ip(geoip:private) -> googledns
            # fallback is also called default.
            fallback: accept
        }
    }
}

# Node group (outbound).
group {
    my_group {
        # No filter. Use all nodes.

        # Randomly select a node from the group for every connection.
        #policy: random

        # Select the first node from the group for every connection.
        #policy: fixed(0)

        # Select the node with min last latency from the group for every connection.
        #policy: min

        # Select the node with min moving average of latencies from the group for every connection.
        policy: min_moving_avg
    }

    group2 {
        # Filter nodes from the global node pool defined by the subscription and node section above.
        filter: subtag(regex: '^my_', another_sub) && !name(keyword: 'ExpireAt:')
        # Filter nodes from the global node pool defined by tag
        #filter: name(node1, node2)

        # Select the node with min average of the last 10 latencies from the group for every connection.
        policy: min_avg10
    }
}

# See https://github.com/daeuniverse/dae/blob/main/docs/routing.md for full examples.
routing {
    ### Preset rules.

    # Network managers in localhost should be direct to avoid false negative network connectivity check when binding to
    # WAN.
    pname(NetworkManager) -> direct

    # Put it in the front to prevent broadcast, multicast and other packets that should be sent to the LAN from being
    # forwarded by the proxy.
    # "dip" means destination IP.
    dip(224.0.0.0/3, 'ff00::/8') -> direct

    # This line allows you to access private addresses directly instead of via your proxy. If you really want to access
    # private addresses in your proxy host network, modify the below line.
    dip(geoip:private) -> direct

    ### Write your rules below.

    dip(geoip:cn) -> direct
    domain(geosite:cn) -> direct

    fallback: my_group
}
```
