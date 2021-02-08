---
menu:
    install:
        identifier: install-macos
        weight: 2
title: macOS
description: "Installation Instructions"
layout: index
icon: fab fa-apple
partof: "install guide"
---

Installing LotionBoy via the command line is relatively easy and it is the recommended way to set-up the LotionBoy for unexperienced users. To start, install the dependencies needed to run LotionBoy.

### Requirements
- Xcode Tools
- Node v14.x (latest)
- npm 6.14.x

## Installing Xcode Tools

There are two ways that you can install Xcode tools. The first method is via the command line and requires that you have Xcode installed on your device. You can install Xcode tools with the following command.
```shell script
xcode-select --install
```
A software update popup will appear that asks: The xcode-select command requires the command line developer tools. Would you like to install the tools now?” choose to confirm this by clicking “Install”, then _read_ and agree to the Terms of Service when the box pops up.

Wait for the Command Line Tools package download to complete. The installer will go away  on its own once complete and you can then confirm that everything is working by trying to use one of the commands that were just installed like `gcc` or `git`.

### Alternate method

If you do not have Xcode installed or do not wish to install Xcode, you can download a copy of just the tools from the [Apple Developer](developer.apple.com/download) website. An account is required (it's free) to download the installer. Once the `xcode-tools` installer is downloaded, double-click to run the installer and follow the instructions presented.

## Installing Node and npm

This part is easy. To install the latest version of Node and npm, just grab a copy of the installer from the [Official NodeJS Website](https://nodejs.org/en/download/current/). At the time of this writing, the latest version should be 14.13.1. Run the installer and follow the instructions presented.

## Installing and Running LotionBoy

Start by cloning the latest release of LotionBoy
```shell script
git clone https://github.com/samantharachelb/botmin.git ~/botmin
```

Install the project's dependencies and then build the project
```shell script
cd ~/botmin
npm i
npm prune --production
npm run build
```

You're done. You can now move onto configuring the robot.
