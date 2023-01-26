## aks deployments

#### basic deployment

```bash
export RG=aks
export CLUSTERNAME=briar-aks-test
export K8SVERSION=1.25.4
export VMSIZE=Standard_D2_v2
export NODECOUNT=5
export LOCATION=eastus

az group create --name $RG --location $LOCATION

az aks create \
    --resource-group $RG \
    --name $CLUSTERNAME \
    --node-count $NODECOUNT \
    --kubernetes-version $K8SVERSION \
    --location $LOCATION \
    --vm-set-type VirtualMachineScaleSets \
    --enable-managed-identity

az aks get-credentials -n $CLUSTERNAME -g $RG
```

#### custom vnet

```bash
export RGVNET=aks
export VNETNAME=aks-vnet
export SUBNETNAME=node-subnet

az group create --name $RGNAME --location $LOCATION
az group create --name $RGVNET --location $LOCATION

az network vnet create --resource-group $RGVNET --name $VNETNAME --address-prefixes 192.168.0.0/16 --subnet-name $SUBNETNAME --subnet-prefixes 192.168.1.0/24

VNETID=$(az network vnet show --resource-group $RGVNET --name $VNETNAME --query id -o tsv)
SUBNETID=$(az network vnet subnet show --resource-group $RGVNET --vnet-name $VNETNAME --name $SUBNETNAME --query id -o tsv)
```

