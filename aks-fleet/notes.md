## AKS Fleet Manager

https://learn.microsoft.com/en-us/azure/kubernetes-fleet/quickstart-create-fleet-and-members

```bash

export GROUP=aks
export FLEET=briar-aks-fleet

az group create --name ${GROUP} --location eastus

az fleet create --resource-group ${GROUP} --name ${FLEET} --location eastus

export MEMBER_CLUSTER_ID_1=/subscriptions/e10caac4-ff80-424b-8499-ee8ee0b2e090/resourcegroups/reddog-aks-27952/providers/Microsoft.ContainerService/managedClusters/reddog-aks-27952
export MEMBER_NAME_1=reddog-aks-27952

az fleet member create \
    --resource-group ${GROUP} \
    --fleet-name ${FLEET} \
    --name ${MEMBER_NAME_1} \
    --member-cluster-id ${MEMBER_CLUSTER_ID_1}

```