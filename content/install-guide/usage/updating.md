---
menu:
    usage:
        identifier: updating
        weight: 3
title: Updates
description: "Updating LotionBoy"
layout: index
icon: fal fa-cloud-download
partof: "install guide"
---

## Updating Kubernetes Deployment

Just run the command. Replace `my-namespace` with the namespace you created during deployment.
```shell script
kubectl rollout restart --namespace my-namespace deployment lotionboy
```
Kubernetes will pull the newest version of the LotionBoy image from the channel that was set in the deployment manifest and restart the pod.


## Updating from GIT

If you're not using LotionBoy, run the following commands to update LotionBoy.
```shell script
git pull --tags
git tag -l
git checkout tags/<whatever the latest tag is>
npm i
npm run build
```

You can now restart LotionBoy.
