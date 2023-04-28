## Azure managed prometheus 

https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/prometheus-metrics-enable?tabs=cli 

```bash
export RG=aks
export CLUSTERNAME=briar-aks-testing
export WORKSPACENAME=wsbriarazmonitor
export LOCATION=eastus

# create an azure monitor workspace
az resource create --resource-group $RG --namespace microsoft.monitor --resource-type accounts --name $WORKSPACENAME --location $LOCATION --properties {}

WORKSPACEID=/subscriptions/e10caac4-ff80-424b-8499-ee8ee0b2e090/resourcegroups/aks/providers/microsoft.monitor/accounts/wsbriarazmonitor

az aks update --enable-azuremonitormetrics \
    -n $CLUSTERNAME \
    -g $RG \
    --azure-monitor-workspace-resource-id $WORKSPACEID


```