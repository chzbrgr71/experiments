## AKS most things turned on

```bash
export RG=aks
export CLUSTERNAME=briar-aks-test
export K8SVERSION=1.26.3
export NODECOUNT=5
export LOCATION=eastus

az group create --name $RG --location $LOCATION

# deploy log analytics workspace
WORKSPACENAME=briarloganalytics

az monitor log-analytics workspace create -g $RG -n $WORKSPACENAME

WORKSPACEID=$(az monitor log-analytics workspace show --resource-group $RG --workspace-name $WORKSPACENAME --query id -o json)

# deploy AKS
az aks create \
    --resource-group $RG \
    --name $CLUSTERNAME \
    --node-count $NODECOUNT \
    --kubernetes-version $K8SVERSION \
    --location $LOCATION \
    --enable-addons monitoring,virtual-node \
    --workspace-resource-id $WORKSPACEID

az aks get-credentials -n $CLUSTERNAME -g $RG
```
