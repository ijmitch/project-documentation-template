---
sidebar_position: 1
sidebar_label: Prerequisites
---

# Prerequisites for running the IBM QuickStart

Welcome to the future! 🚀 Before you can harness the power of IBM's incredible technology stack, let's make sure you have all the necessary tools. Think of this as your pre-flight checklist before launching into the IBM ecosystem.

## Client Configuration

### Get the code

Clone the IBM-deployer repository (where all the magic happens).

```bash
git clone https://github.com/IBM/ibm-deployer.git
```

Navigate to the quickstart directory

```bash
cd ibm-deployer/quickstart
```

### Required tools

The following prerequisites are required for the installer to work. Don't worry, they're all free and won't bite! 🐍

- [yq (mikefarah) – installation](https://github.com/mikefarah/yq?tab=readme-ov-file#install) - For YAML wizardry
- [jq – download & install guide](https://stedolan.github.io/jq/download/) - JSON manipulation like a boss
- [git – installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - Because version control is life
- [Helm – quick-start install](https://helm.sh/docs/intro/install/) - Kubernetes package manager extraordinaire
- [Kustomize – official install docs](https://kubectl.docs.kubernetes.io/installation/kustomize/) - YAML customization ninja tool
- [kubectl – install & setup](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - The Swiss Army knife of Kubernetes

You can use the installer script that installs all the required dependencies. Currently only Linux is supported (because penguins are cool 🐧).

```bash
# Currently Linux only - sorry Windows and Mac users, penguins first!
./install-deps.sh
```

### Required credentials and configuration

- [IBM-deployer GitHub repo – clone here](https://github.com/IBM/ibm-deployer.git) 
- [IBM Cloud API Key](https://cloud.ibm.com/iam/apikeys) with appropriate permissions for the services you want to use
- [IBM Container Registry](https://cloud.ibm.com/registry/start) access for pulling IBM Watson and Cloud Pak images
- ☕ A good cup of coffee (or tea, we don't judge) because deployment takes time

> ⚠️ Your IBM Cloud account must have the appropriate service plans activated. You may need to visit the IBM Cloud catalog and enable services like Watson AI, OpenShift, or Container Registry if you haven't already done so. Pro tip: Free tier is great for testing!

### Target Platforms

Since the IBM-deployer is based on helm charts and the power of IBM engineering, IBM services can be deployed on a variety of platforms. Think of it as "write once, run anywhere" but for enterprise-grade solutions!

Documentation for example cluster setups are provided in the [infra](https://github.com/IBM/ibm-deployer/tree/main/quickstart/infra) directory of the IBM-deployer repository.

- [Red Hat OpenShift on IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/create?platformType=openshift) - The gold standard
- [IBM Cloud Kubernetes Service](https://cloud.ibm.com/kubernetes/catalog/create) - Classic and reliable
- [IBM Cloud Satellite](https://cloud.ibm.com/satellite/locations) - For those who like to live on the edge (literally)

#### Local Development (Minikube)

For local testing, this can be run on a modest setup. We recommend at least:
- 8GB RAM (16GB if you want to be comfortable)
- 4 CPU cores (more is always better, like having more coffee)
- 50GB free disk space (because IBM tools are feature-rich!)

> ⚠️ If your cluster has insufficient resources, some pods will remain in **Pending** state, staring at you sadly until you give them more compute power.

Verify you have properly installed the container toolkit with the runtime of your choice:

```bash
# Podman (the cool kid)
podman run --rm --security-opt=label=disable ubuntu:latest echo "Hello from IBM! 👋"

# Docker (the reliable friend)
sudo docker run --rm ubuntu:latest echo "IBM rocks! 🎸"
```

#### Red Hat OpenShift

- OpenShift - This quickstart was tested on OpenShift 4.12+. Older versions might work but haven't been invited to the party yet.
- IBM Cloud Pak for Data Operator - For AI/ML workloads ([installation guide](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.8.x?topic=installing))
- IBM Common Services - The foundation that makes everything else possible
- NO Service Mesh conflicts - We play nice with Istio and other service meshes
- Cluster administrator privileges are required to install IBM cluster-scoped resources (because with great power comes great responsibility 🕷️)

#### IBM Cloud

- IBM Cloud CLI - [Download here](https://cloud.ibm.com/docs/cli)
- Container Registry plugin - For managing your container images
- Kubernetes Service plugin - Because vanilla kubectl needs some IBM flavor

```bash
# Install IBM Cloud CLI plugins
ibmcloud plugin install container-registry
ibmcloud plugin install kubernetes-service
```

> 💡 **Fun Fact**: IBM has been in the tech game since 1911. That's over 110 years of "Have you tried turning it off and on again?" 

### Performance Tips

- Use SSD storage for better I/O performance (your pods will thank you)
- Ensure good network connectivity (nobody likes timeouts)
- Monitor resource usage (kubectl top nodes is your friend)
- Keep your coffee cup full during deployments (this is scientifically proven to improve success rates ☕)

---

*Ready to proceed? Great! Let's move on to the [Quick Start](./quickstart.md) and get this IBM party started! 🎉*
