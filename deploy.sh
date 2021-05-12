#!/bin/bash

echo what shoud the version be?
read VERSION

docker buildx build --platform linux/amd64 --push -t 937830328/$VERSION .
ssh root@139.59.243.223 "docker pull 937830328/tcc:$VERSION && docker tag 937830328/tcc:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"