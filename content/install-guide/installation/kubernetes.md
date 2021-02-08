---
menu:
    install:
        identifier: install-kubernetes
        weight: 1
title: Kubernetes
description: "Deployment"
layout: index
icon: fal fa-dharmachakra
partof: "install guide"
---

LotionBoy can and does run on Kubernetes without any problems at all. LotionBoy is actually running on a  Kubernetes Cluster right now. It's highly recommended that you follow these instructions exactly as written or you're gonna have a bad time.


### Requirements
- Kubernetes Cluster with at least one (1) node
- The Kubernetes CLI tool `kubectl`

> Note: This installation guide assumes that you _already have_ a Kubernetes cluster set up. If you don't already have one set up, you're probably better off following one of the other installation guides available. However, if you insist on following this installation guide on deploying an instance of LotionBoy to Kubernetes, go set one up now. The cluster used in this guide is hosted on DigitalOcean, but any cloud provider that offers a Managed Kubernetes Service should be fine. If you don't already have cloud provider, you can use this [referral code](https://m.do.co/c/abec6930cf9d) and get a $100 credit for 60 days with DigitalOcean.



In order to deploy LotionBoy to Kubernetes, you're going to need a couple of configuration files. You can find these either in the `kubernetes/` folder in the LotionBoy repository, or you can use the examples provided in this guide.

## Creating the Namespace
To get started, create a file that defines the namespace to hold the LotionBoy deployment and any future associated resources. 

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-namespace
  labels:
    name: my-namespace
```

Replace `my-namespace` with whatever you want to call your namespace. Save the file as `namespace.yaml`.

Create the namespace by running:
```shell script
kubectl create -f namespace.yaml
```

Verify that this step was successful by running:
```shell script
kubectl get namespaces --show-labels
```

You should see an output similar to this:
```shell script
NAME                  STATUS  AGE   LABELS
default               Active  30m   <none>
kube-node-lease       Active  30m   <none>
kube-public           Active  30m   <none>
kube-system           Active  30m   istio-injection=disabled
my-namespace          Active  21s   name=prometheus-operator
prometheus-operator   Active  30m   name=my-namespace
```

## Shhh, it's a secret
Instructions on setting up Kubernetes secret goes here

## Creating the deployment

Create a file that defines the LotionBoy deployment.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: botmin
  namespace: my-namespace
  labels:
    app.kubernetes.io/name: botmin
    app.kubernetes.io/instance: botmin
spec:
  selector:
    matchLabels:
      app.kuberrnetes.io/name: botmin
      app.kubernetes.io/instance: botmin
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  minReadySeconds: 10
  template:
    metadata:
      labels:
        app.kubernetes.io/name: botmin
        app.kubernetes.io/instance: botmin
  spec:
    containers:
      - name: botmin
        image: gcr.io/shitty-discord-bots/botmin:stable
        imagePullPolicy: Always
        env:
          - name: DD_AGENT_HOST   # you can get rid of this if you're not using datadog for monitoring
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
          - name: BOT_TOKEN
            valueFrom:
              secretKeyRef:
                name: botmin-secrets
                key: bot_token
          - name: BOT_OWNER
            valueFrom:
              secretKeyRef:
                name: botmin-secrets
                key: bot_owner
          - name: BOT_DEVIDS
            value: "163424842714972160 288406661364842497 321422395682455552 338716026650755073 663127636641316864"
          - name: BIND_TO_CHANNELS
            value: "754928211040665681"
          - name: UNBOUND_MODE
            value: "no"
          - name: COMMAND_PREFIX
            value: "."
          - name: DELETE_MESSAGES
            value: "yes"
          - name: DELETE_INVOKING
            value: "yes"
          - name: MESSAGE_TIMEOUT
            value: "5"
```
Make sure to change `namespace` to the name of the namespace you created in the first step. The deployment is currently set to pull images from the `stable` channel. Change the tag from `stable` to: 
The deployment will be configured to pull images from the `stable` branch. If you like bugs and spending literal hours pulling out your own hair
and crying for several days because something in the code changed, go ahead and change the image tag from `stable` to `latest`.


It is highly recommended that you do not change this setting.

The environment variables set here are all configuration options for the Discord Bot.

Variable | Description | Type
:------- | :---------- | :--------
`DD_AGENT_HOST` | Sets the DataDog Agent Host. You can get rid of this if you don't use DataDog for monitoring. | Optional
`BOT_TOKEN` | Discord bot user token. This is needed to run the LotionBoy. See [configuration][configuration] for details. | Required
`BOT_DEVIDS` | IDs of users that are allowed to manage the bot. Make sure that the IDs are inside quotation marks and that you separate each ID with a single space. See [configuration][configuration] for details. | Optional 
`BIND_TO_CHANNELS` | IDs of channels that the Bot can interact on. Leave blank if you want it to interact on all channels. If using multiple channel IDs separate each ID with a single space. See [configuration][configuration] for details. | Required if `UNBOUND_MODE` set to `no`
`UNBOUND_MODE` | Do you want the bot to be bound to specific channels or do you want a free for all? | Optional (Defaults to `yes`) 
`DELETE_MESSAGES` | Do you want the bot to delete info embeds generated when a command is run? | Optional (Defaults to `yes`)
`DELETE_INVOKING` | Do you want the bot to delete command messages sent by the user? | Optional (Defaults to `yes`)
`MESSAGE_TIMEOUT` | How long should the bot wait before deleting messages? | Optional (Defaults to `5` seconds)


[configuration]: /install-guide/usage/getting-started
