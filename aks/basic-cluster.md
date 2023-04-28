## basic AKS deployment

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
