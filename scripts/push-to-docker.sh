#!/bin/sh

# CONFIG
repoPath="/tobiaswaelde"

get_env() {
  env_value=$(printenv "$1")
  if [ -z "$env_value" ]; then
    echo "$2"
  else
    echo "$env_value"
  fi
}

# get environment variables
registry=$(get_env "REGISTRY_DOMAIN" "docker.com")
username=$(get_env "DOCKER_USERNAME" "")
password=$(get_env "DOCKER_PASSWORD" "")

# extract package version + name
version=`npm pkg get version | cut -d"\"" -f 2`
name=`npm pkg get name | cut -d"\"" -f 2`

image="${registry}${repoPath}/${name}"

# sign in to docker registry
echo "try docker sign in"
if [ -n "$username" ] && [ -n "$password" ]; then
  docker login -u "$username" -p "$password" "$registry"
else
  echo "Sign in to docker failed."
  exit 1
fi

# build + tag image
docker build -t ${image}:latest .
docker build -t ${image}:${version} .

# push to registry
docker push ${image}:latest
docker push ${image}:${version}