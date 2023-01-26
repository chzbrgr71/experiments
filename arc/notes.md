## Azure Arc

#### deploy k3s and Arc

```bash
export RG='arc-k8s'
export LOCATION='eastus'
export VM1='k3sclusternode1'
export K3STOKEN='CAa6BYPyp+6NwLY5f3or'

az group create --name $RG --location $LOCATION

# deploy ubuntu VM1
az vm create \
  --resource-group $RG \
  --name $VM1 \
  --image UbuntuLTS \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub

az vm run-command invoke \
   -g $RG \
   -n $VM1 \
   --command-id RunShellScript \
   --scripts "curl -sfL https://get.k3s.io | K3S_TOKEN=$K3STOKEN sh -s -"
 
# deploy ubuntu VM2
export VM2='k3sclusternode2'

az vm create \
  --resource-group $RG \
  --name $VM2 \
  --image UbuntuLTS \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub

az vm run-command invoke \
   -g $RG \
   -n $VM2 \
   --command-id RunShellScript \
   --scripts "curl -sfL https://get.k3s.io | K3S_URL=https://10.0.0.4:6443 K3S_TOKEN=$K3STOKEN sh -"

# deploy ubuntu VM3
export VM3='k3sclusternode3'

az vm create \
  --resource-group $RG \
  --name $VM3 \
  --image UbuntuLTS \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub

az vm run-command invoke \
   -g $RG \
   -n $VM3 \
   --command-id RunShellScript \
   --scripts "curl -sfL https://get.k3s.io | K3S_URL=https://10.0.0.4:6443 K3S_TOKEN=$K3STOKEN sh -"

# fix SSH ports
vi /etc/ssh/sshd_config
sudo vi /etc/ssh/sshd_config
# port 22000
sudo systemctl restart sshd
az vm open-port --port 22000 --resource-group $RG --name $VM1

# connect to K3s and Arc enable
export VM1_PIP=''
ssh -i ~/.ssh/id_rsa -p 22000 azureuser@$VM1_PIP

sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER ~/.kube/config && sudo chmod 600 ~/.kube/config && export KUBECONFIG=~/.kube/config

export KUBECONFIG=~/.kube/config
alias k=kubectl
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

az login --use-device-code --tenant 16b3c013-d300-468d-ac64-7eda0820b6d3

export RG='arc'
export LOCATION='eastus'

az group create --name $RG --location $LOCATION
az extension add --name connectedk8s
az connectedk8s connect --name k3scluster --resource-group $RG

Remote Development
```

#### Flux GitOps Extension

```bash
# aks
az k8s-configuration flux create -g aks \
-c briar-aks \
-n cluster-config \
--namespace cluster-config \
-t managedClusters \
--scope cluster \
-u https://github.com/Azure/gitops-flux2-kustomize-helm-mt \
--branch main  \
--kustomization name=infra path=./infrastructure prune=true \
--kustomization name=apps path=./apps/staging prune=true dependsOn=\["infra"\]

# arc
az k8s-configuration flux create -g arc \
-c k3scluster \
-n cluster-config \
--namespace cluster-config \
-t connectedClusters \
--scope cluster \
-u https://github.com/Azure/gitops-flux2-kustomize-helm-mt \
--branch main  \
--kustomization name=infra path=./infrastructure prune=true \
--kustomization name=apps path=./apps/staging prune=true dependsOn=\["infra"\]
```

#### Policy

```bash

kubectl run -i -t busybox --image=busybox --restart=Never

```

#### Cluster Connect

https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/cluster-connect?tabs=azure-cli#service-account-token-authentication-option

```bash
export RG='arc'
export CLUSTER='k3scluster'
export TOKEN=''

az connectedk8s proxy -n $CLUSTER -g $RG --token $TOKEN

```





