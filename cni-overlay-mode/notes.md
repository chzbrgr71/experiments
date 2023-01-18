## Azure CNI Overlay Mode

https://learn.microsoft.com/en-us/azure/aks/azure-cni-overlay

```bash
clusterName="briar-aks-overlay"
resourceGroup="aks"
location="eastus"

az aks create -n $clusterName -g $resourceGroup --location $location --network-plugin azure --network-plugin-mode overlay --pod-cidr 192.168.0.0/16

az aks get-credentials -n $clusterName -g $resourceGroup




```