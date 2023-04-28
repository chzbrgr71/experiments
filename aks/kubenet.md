## custom vnet (kubenet)

```bash
export RG=aks
export CLUSTERNAME=briar-aks
export K8SVERSION=1.26.3
export VNETNAME=aksvnet
export SUBNETNAME=nodesubnet
export LOCATION=eastus
export VMSIZE=Standard_D2_v2
export NODECOUNT=5

az group create --name $RG --location $LOCATION

az network vnet create \
    --resource-group $RG \
    --name $VNETNAME \
    --address-prefixes 192.168.0.0/16 \
    --subnet-name $SUBNETNAME \
    --subnet-prefix 192.168.1.0/24

SUBNET_ID=$(az network vnet subnet show --resource-group $RG --vnet-name $VNETNAME --name $SUBNETNAME --query id -o tsv)

az aks create \
    --resource-group $RG \
    --name $CLUSTERNAME \
    --node-count $NODECOUNT \
    --node-vm-size $VMSIZE \
    --kubernetes-version $K8SVERSION \
    --network-plugin kubenet \
    --service-cidr 10.0.0.0/16 \
    --dns-service-ip 10.0.0.10 \
    --pod-cidr 10.244.0.0/16 \
    --vnet-subnet-id $SUBNET_ID

az aks get-credentials -n $CLUSTERNAME -g $RG    
```

