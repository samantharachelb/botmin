---
menu:
    usage:
        identifier: faq
        weight: 4
title: Frequently Asked Questions
description: "Your questions, answered."
layout: index
icon: fal fa-question
partof: "install guide"
---

## Why isn't Windows supported?
Fuck Windows, that's why. Windows is several dumpsters filled with adware stacked on top of each other disguised as an operating system that can
barely function as an operating system.  

### "But something something market share!!!!1!!1!111"
I don't care

### "I tried running it on Windows anyway and it's not working right can you help"
I already told you. No.

<hr>

## Does it scale?
As far as the database goes, it uses MongoDB, so that should scale fine. The bot itself should also scale fine if you're
using Kubernetes

<hr>

## Can I use the container image with something other than Kubernetes?
The image was built using podman which conforms with the OCI standard. It should run fine.

