## What is ArgoCD
Argo CD is implemented as a Kubernetes controller which continuously monitors running applications and compares the current, live state against the desired target state (as specified in the Git repo). ArgoCD helps update, manage and control the code versions during its development phase on k8s.

## Why ArgoCD
Codebase appears in different versions during the development phase. Due to this, DevOps need a tool to automatically set up the deployment process and synchronize the code version in case there’s a change in the GitHub repo.

- Application definition, configuration and environment should be declarative and version control

- Application deployment and lifecycle management should be automated, auditable and easy to understand

## How it works
Argo CD reads the environment configuration (written either as a helm chart, kustomize files, jsonnet or plain YAML files) from the git repository and applies it to Kubernetes namespaces in different formats
- Kustomize files
- Helm chart
- YAML Manifests
- Jsonnet file

## How to set up

1. Install ArgoCD

`kubectl create namespace argocd`

`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`


2. Download ArgoCD CLI

`brew install argocd`

## Our plan
Currently, Quang has been testing ArgoCD for a while. All of our new projects have ArgoCD setup in place. So far, we don’t experience any issues with that. So the only thing we want to check out is the simplicity when we hand over the setup process to team members.

## Benefits stage
Deployment

### Source
- https://blog.argoproj.io/introducing-argo-cd-declarative-continuous-delivery-for-kubernetes-da2a73a780cd

- https://argoproj.github.io/argo-cd/

- https://www.inovex.de/blog/spinnaker-vs-argo-cd-vs-tekton-vs-jenkins-x/
