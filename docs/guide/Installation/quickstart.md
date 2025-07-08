---
sidebar_position: 2
sidebar_label: Quick Start installer
---

# Getting Started with IBM via the Quick Start installer

Welcome aboard the IBM express train! 🚂 This guide will get you from zero to hero with IBM's technology stack faster than you can say "Watson"!

Getting Started with IBM on Kubernetes. For specific instructions on how to install IBM services on minikube, see our [special minikube guide](https://github.com/IBM/ibm-deployer/blob/main/quickstart/README-minikube.md) (it's like the regular guide, but smaller).

For more information on IBM in general, see our massive ecosystem at [ibm.com](https://ibm.com) and our developer hub [here](https://developer.ibm.com).

## Overview

This guide will walk you through the steps to install and deploy IBM services on a Kubernetes cluster, using an opinionated flow designed by IBM engineers who've had way too much coffee ☕. We'll get you up and running as quickly as possible, because time is money and IBM loves efficiency!

For more IBM goodness, explore our vast universe of products at [IBM Cloud](https://cloud.ibm.com) and see why we've been trusted by enterprises for over a century.

## Prerequisites

First ensure you have all the tools and resources as described in [Prerequisites](./prerequisites.md). Don't skip this step - it's like trying to drive a car without wheels! 🚗

<a name="install"></a>

## IBM Installation

- Change to the directory holding your clone of the IBM-deployer code
- Navigate to the quickstart directory, e.g.

```bash
cd ibm-deployer/quickstart
```

Only a single installation of IBM services on a cluster is currently supported. In the future, we'll support multiple service deployments because why have one when you can have them all? Until then, [uninstall IBM services](#uninstall) before reinstalling (it's like rebooting, but fancier).

The IBM-deployer contains all the helm charts necessary to deploy IBM's finest offerings. To facilitate the installation of the helm charts, the `ibm-installer.sh` script is provided. This script will populate the necessary manifests in the `manifests` directory and apply all the manifests in order to bring up your shiny new IBM cluster.

The ibm-installer.sh script aims to simplify the installation of IBM services using the IBM-deployer as its main function. It scripts as many of the steps as possible to make the installation process smoother than a jazz saxophone solo 🎷. This includes:

- Installing the IBM Cloud infrastructure components
- Creating the namespace with special IBM configurations
- Creating the pull secret to download IBM's premium container images
- Creating the service CRDs (Custom Resource Definitions - basically Kubernetes magic)
- Applying the helm charts with IBM's secret sauce
- Deploying sample applications (because examples are worth a thousand words)

It also supports uninstalling the IBM infrastructure and sample apps when you need a clean slate.

Before proceeding with the installation, ensure you have completed the prerequisites and are able to issue `kubectl` or `oc` commands to your cluster. Think of it as making sure you have the keys before trying to start the car.

### Usage

The installer needs to be run from the `ibm-deployer/quickstart` directory as a cluster admin with CLI access to the cluster. No sudo required, but admin powers definitely needed! 💪

```bash
./ibm-installer.sh [OPTIONS]
```

### Flags

| Flag                                 | Description                                                     | Example                                                          |
|--------------------------------------|-----------------------------------------------------------------|------------------------------------------------------------------|
| `-z`, `--storage-size SIZE`          | Size of storage volume (bigger is usually better)              | `./ibm-installer.sh --storage-size 50Gi`                        |
| `-c`, `--storage-class CLASS`        | Storage class to use (default: fast-ssd)                       | `./ibm-installer.sh --storage-class ibmc-block-gold`            |
| `-n`, `--namespace NAME`             | K8s namespace (default: ibm-services)                          | `./ibm-installer.sh --namespace my-awesome-ibm`                 |
| `-f`, `--values-file PATH`           | Path to Helm values.yaml file (customization central)          | `./ibm-installer.sh --values-file /path/to/my-values.yaml`      |
| `-u`, `--uninstall`                  | Uninstall IBM components from the current cluster              | `./ibm-installer.sh --uninstall`                                |
| `-d`, `--debug`                      | Add debug mode to the helm install (verbose is good)           | `./ibm-installer.sh --debug`                                    |
| `-i`, `--skip-infra`                 | Skip the infrastructure components (for the impatient)         | `./ibm-installer.sh --skip-infra`                               |
| `-t`, `--download-timeout`           | Timeout for service download job (patience is a virtue)        | `./ibm-installer.sh --download-timeout 30m`                     |
| `-D`, `--download-services`          | Download IBM services to PVC from IBM Cloud                    | `./ibm-installer.sh --download-services`                        |
| `-m`, `--disable-metrics-collection` | Disable metrics collection (Prometheus takes a break)          | `./ibm-installer.sh --disable-metrics-collection`               |
| `-w`, `--enable-watson`              | Enable Watson AI services (because AI is the future)           | `./ibm-installer.sh --enable-watson`                            |
| `-h`, `--help`                       | Show this help and exit (the most important flag!)             | `./ibm-installer.sh --help`                                     |

## Examples

### Install IBM Services on an Existing Kubernetes Cluster

```bash
export IBM_API_KEY="your-super-secret-api-key"
./ibm-installer.sh --enable-watson
```

### Install on Red Hat OpenShift (The Crown Jewel)

Before running the installer, ensure you have logged into the cluster as a cluster administrator. For example:

```bash
oc login --token=sha256~yourtoken --server=https://api.yourcluster.example.com:6443
```

```bash
export IBM_API_KEY="your-super-secret-api-key"
./ibm-installer.sh --enable-watson --storage-class ocs-storagecluster-ceph-rbd
```

### Validation

The IBM inference-gateway serves as the HTTP ingress point for all API requests in our deployment. It's implemented as a Kubernetes Gateway (`gateway.networking.k8s.io/v1`) using either IBM's custom gateway controller or istio as the gatewayClassName. Think of it as the bouncer at the club - it decides who gets in and where they go! 🕺

You can execute the [`test-request.sh`](https://github.com/IBM/ibm-deployer/blob/main/quickstart/test-request.sh) script in the quickstart folder to test your deployment:

```bash
# Default options (the service endpoints will be discovered automatically)
./test-request.sh

# Custom namespace/service testing
./test-request.sh -n <NAMESPACE> -s <SERVICE_NAME> --minikube

# Test Watson AI specifically (because AI is cool)
./test-request.sh --watson-test
```

> If you receive an error indicating PodSecurity "restricted" violations when running the test script, you need to remove the restrictive PodSecurity labels from the namespace. It's like taking off the training wheels - sometimes you need more freedom to ride! 🚴
> 
> Run the following command:

```bash
kubectl label namespace <NAMESPACE> \
  pod-security.kubernetes.io/warn- \
  pod-security.kubernetes.io/warn-version- \
  pod-security.kubernetes.io/audit- \
  pod-security.kubernetes.io/audit-version-
```

### Customizing your deployment

The helm charts can be customized by modifying the [values.yaml](https://github.com/IBM/ibm-deployer/blob/main/charts/ibm-services/values.yaml) file. However, it's recommended to override values by creating a custom yaml file and passing it to the installer using the `--values-file` flag (because nobody likes merge conflicts).

Several examples are provided in the [examples](https://github.com/IBM/ibm-deployer/blob/main/quickstart/examples) directory. You would invoke the installer with the following command:

```bash
./ibm-installer.sh --values-file ./examples/watson-ai-powerhouse.yaml
```

These files are designed to be used as a starting point to customize your deployment. Refer to the [values.yaml](https://github.com/IBM/ibm-deployer/blob/main/charts/ibm-services/values.yaml) file for all the possible options (there are many, IBM likes options).

#### Sample Application and Service Configuration

Some of the more common options for changing the sample application configuration are:

- `sampleApplication.services.watsonAI` - Enable Watson AI services for natural language processing, machine learning, and more AI goodness
- `sampleApplication.services.cloudPak` - The name of the Cloud Pak to deploy (because one size doesn't fit all)
- `sampleApplication.baseConfigMapRefName` - The name of the preset base configuration to use
- `sampleApplication.replicas` - The number of service replicas to deploy (more is merrier, but costs more)

```yaml
sampleApplication:
  services:
    watsonAI: true
    cloudPakForData: true
    openShiftPipelines: true
  baseConfigMapRefName: ibm-enterprise-preset
  replicas: 3
  resources:
    requests:
      memory: "2Gi"
      cpu: "1000m"
    limits:
      memory: "4Gi" 
      cpu: "2000m"
```

#### Feature Flags (The Fun Switches)

IBM services come with lots of feature flags because we believe in choice! Toggle these on/off like Christmas lights:

```yaml
featureFlags:
  enableWatsonAI: true
  enableCloudPakForData: true  
  enableAdvancedSecurity: true
  enableMultiZoneDeployment: false
  enableAutoScaling: true
  enableCostOptimization: true
  enableDeveloperTools: true
services:
  watson:
    naturalLanguageUnderstanding: true
    speechToText: true
    textToSpeech: true
    visualRecognition: true
  security:
    enableVaultIntegration: true
    enableCertManager: true
```

### Metrics Collection (Because Data is Beautiful 📊)

IBM services include built-in support for metrics collection using Prometheus and Grafana (the dynamic duo of monitoring). This feature is enabled by default but can be disabled using the `--disable-metrics-collection` flag during installation. 

IBM applies ServiceMonitors for all deployed services to trigger Prometheus scrape targets. In OpenShift, the built-in user workload monitoring Prometheus stack can be utilized. In vanilla Kubernetes, Prometheus and Grafana are installed from the prometheus-community [kube-prometheus-stack helm charts](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack).

#### Accessing the Metrics UIs

If running on OpenShift, skip to [OpenShift and Grafana](#openshift-and-grafana).

#### Port Forwarding (The Classic Approach)

- Prometheus (port 9090):

```bash
kubectl port-forward -n ibm-monitoring --address 0.0.0.0 svc/prometheus-kube-prometheus-prometheus 9090:9090
```

- Grafana (port 3000):

```bash
kubectl port-forward -n ibm-monitoring --address 0.0.0.0 svc/prometheus-grafana 3000:80
```

Access the User Interfaces at:

- Prometheus: `http://YOUR_IP:9090` (where the metrics live)
- Grafana: `http://YOUR_IP:3000` (where the pretty charts live) - default credentials: admin/admin

#### Grafana Dashboards (The Eye Candy)

Import the [IBM services dashboard](https://github.com/IBM/ibm-deployer/tree/main/quickstart/grafana/dashboards/ibm-services-dashboard.json) from the Grafana UI. Go to `Dashboards -> New -> Import` and prepare to be amazed by the beautiful metrics visualizations!

#### OpenShift and Grafana (The Enterprise Way)

If running on OpenShift with user workload monitoring enabled, you can access the metrics through the OpenShift console:

1. Navigate to the OpenShift console (your command center)
2. In the left navigation bar, click on "Observe" 
3. You can access:
   - Metrics: Click on "Metrics" to view and query metrics using the built-in Prometheus UI
   - Targets: Click on "Targets" to see all monitored endpoints and their status

The metrics are automatically integrated into the OpenShift monitoring stack (because integration is everything).

#### Security Note (The Serious Stuff)

When running in a cloud environment, make sure to:

1. Configure your security groups to allow inbound traffic on monitoring ports
2. Use proper authentication for production environments (no "admin/admin" in prod!)
3. Consider setting up TLS certificates for secure communication
4. Rotate your API keys regularly (security hygiene is important)
5. Monitor your monitoring (meta, we know)

### Troubleshooting (When Things Go Sideways 🤪)

The various IBM container images can take some time to download depending on your connectivity (patience, young Padawan). Watching events and logs of the pods is a good place to start debugging. Here are some examples to help you become a Kubernetes detective:

```bash
# View the status of the pods in the default IBM namespace
kubectl get pods -n ibm-services

# Describe all IBM service pods (the verbose approach):
kubectl describe pods -l app.kubernetes.io/managed-by=ibm-deployer -n ibm-services

# Fetch logs from IBM Watson pods:
kubectl logs -l service=watson-ai --all-containers=true -n ibm-services --tail=200

# Check IBM service endpoints:
kubectl get svc -n ibm-services

# Describe ingress/gateway resources:
kubectl describe gateway -n ibm-services

# Check persistent volume claims (storage is important):
kubectl get pvc -n ibm-services
```

More examples of debugging logs and troubleshooting can be found [here](https://github.com/IBM/ibm-deployer/blob/main/quickstart/examples/troubleshooting/README.md).

### Uninstall (The Nuclear Option ☢️)

This will remove IBM service resources from the cluster. This is useful, especially for test/dev environments when you want to start fresh. It's like the "Have you tried turning it off and on again?" of Kubernetes!

```bash
./ibm-installer.sh --uninstall
```

> **Warning**: This will remove all IBM services and data. Make sure you've backed up anything important before proceeding!

## What's Next?

Congratulations! 🎉 You've successfully deployed IBM services on Kubernetes. You're now part of the IBM family (welcome to the blue team!). Here are some next steps:

1. Explore the [IBM Cloud docs](https://cloud.ibm.com/docs) for advanced configurations
2. Check out [IBM Developer](https://developer.ibm.com) for tutorials and sample applications  
3. Join the [IBM Developer Community](https://community.ibm.com) to connect with other IBMers
4. Follow [@IBMDeveloper](https://twitter.com/IBMDeveloper) on Twitter for the latest updates
5. Get certified in IBM technologies (because badges are cool!)

Remember: "Think" has been IBM's motto since 1914. Now go forth and think big! 💙

---

*Need help? Check out our [support resources](https://www.ibm.com/support) or join our vibrant community forums. Happy deploying! 🚀*