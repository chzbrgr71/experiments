## AKS Azure CNI Powered by Cilium

```bash
export RG=aks-cilium
export LOCATION=eastus
export VNET=briartesting
export AKSCLUSTER=briarakscilium
export NODESUBNET='/subscriptions/593604cd-86cd-46f6-b68e-4b4d7d8e99bd/resourceGroups/aks-cilium/providers/Microsoft.Network/virtualNetworks/briartesting/subnets/nodesubnet'
export PODSUBNET='/subscriptions/593604cd-86cd-46f6-b68e-4b4d7d8e99bd/resourceGroups/aks-cilium/providers/Microsoft.Network/virtualNetworks/briartesting/subnets/podsubnet'

# Create the resource group
az group create --name $RG --location $LOCATION

# Create a virtual network with a subnet for nodes and a subnet for pods
az network vnet create -g $RG --location $LOCATION --name $VNET --address-prefixes 10.0.0.0/8

az network vnet subnet create -g $RG --vnet-name $VNET --name nodesubnet --address-prefixes 10.240.0.0/16
az network vnet subnet create -g $RG --vnet-name $VNET --name podsubnet --address-prefixes 10.241.0.0/16

az aks create -n $AKSCLUSTER -g $RG -l $LOCATION \
  --max-pods 250 \
  --network-plugin azure \
  --vnet-subnet-id $NODESUBNET \
  --pod-subnet-id $PODSUBNET \
  --network-dataplane cilium





```
