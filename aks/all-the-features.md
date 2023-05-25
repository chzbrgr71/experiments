## AKS most things turned on

```bash
export RG=aks
export CLUSTERNAME=contoso-aks-01
export K8SVERSION=1.26.3
export NODECOUNT=5
export LOCATION=eastus

az group create --name $RG --location $LOCATION

# deploy log analytics workspace
WORKSPACENAME=briarloganalytics

az monitor log-analytics workspace create -g $RG -n $WORKSPACENAME

WORKSPACEID=$(az monitor log-analytics workspace show --resource-group $RG --workspace-name $WORKSPACENAME --query id -o tsv)
echo $WORKSPACEID

# deploy AKS
az aks create \
    --resource-group $RG \
    --tier standard \
    --name $CLUSTERNAME \
    --node-count $NODECOUNT \
    --kubernetes-version $K8SVERSION \
    --location $LOCATION \
    --enable-addons monitoring,azure-policy \
    --workspace-resource-id $WORKSPACEID \
    --auto-upgrade-channel stable \
    --enable-asm \
    --enable-keda \
    --enable-aad \
    --aad-admin-group-object-ids 76fe8a2a-9592-43c9-8a00-ccaa00b7d1d8 \
    --aad-tenant-id 78a2f008-3a0b-4413-a7d7-ce2be074a18c

# Add a nodepool
USER_POOL_NAME=apppool1

az aks nodepool add \
--resource-group $RG \
--cluster-name $CLUSTERNAME \
--name $USER_POOL_NAME \
--node-vm-size Standard_D4s_v3 \
--enable-cluster-autoscaler \
--min-count 1 \
--max-count 3 \
--mode User

az aks get-credentials -n $CLUSTERNAME -g $RG

# Istio
https://learn.microsoft.com/en-us/azure/aks/istio-deploy-addon 

kubectl label namespace tracker istio.io/rev=asm-1-17


```
