## aks web application routing

https://learn.microsoft.com/en-us/azure/aks/web-app-routing?tabs=with-osm

#### deployment

```bash
export RG=aks
export KV_NAME=briarkv1
export LOCATION=eastus
export AKS_CLUSTERNAME=briar-aks-test

openssl req -new -x509 -nodes -out aks-ingress-tls.crt -keyout aks-ingress-tls.key -subj "/CN=briarwebapp" -addext "subjectAltName=DNS:briarwebapp"

openssl pkcs12 -export -in aks-ingress-tls.crt -inkey aks-ingress-tls.key -out aks-ingress-tls.pfx

az keyvault create -g $RG -l $LOCATION -n $KV_NAME

az keyvault certificate import --vault-name $KV_NAME -n aksingress -f aks-ingress-tls.pfx

az network dns zone create -g $RG -n briarweb.com

az aks enable-addons -g $RG -n $AKS_CLUSTERNAME --addons azure-keyvault-secrets-provider,open-service-mesh,web_application_routing --enable-secret-rotation

# Provide values for your environment
RGNAME=$RG
CLUSTERNAME=$AKS_CLUSTERNAME
LOCATION=eastus

# Retrieve user managed identity object ID for the add-on
SUBSCRIPTION_ID=$(az account show --query id --output tsv)
MANAGEDIDENTITYNAME="webapprouting-${CLUSTERNAME}"
MCRGNAME=$(az aks show -g ${RGNAME} -n ${CLUSTERNAME} --query nodeResourceGroup -o tsv)
USERMANAGEDIDENTITY_RESOURCEID="/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${MCRGNAME}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/${MANAGEDIDENTITYNAME}"
MANAGEDIDENTITY_OBJECTID=$(az resource show --id $USERMANAGEDIDENTITY_RESOURCEID --query "properties.principalId" -o tsv | tr -d '[:space:]')

ZONEID=$(az network dns zone show -g $RG -n briarweb.com --query "id" --output tsv)

az role assignment create --role "DNS Zone Contributor" --assignee $MANAGEDIDENTITY_OBJECTID --scope $ZONEID

az aks addon update -g $RG -n $AKS_CLUSTERNAME --addon web_application_routing --dns-zone-resource-id=$ZONEID

az keyvault set-policy --name $KV_NAME --object-id $MANAGEDIDENTITY_OBJECTID --secret-permissions get --certificate-permissions get

az keyvault certificate show --vault-name $KV_NAME -n aksingress --query "id" --output tsv



```