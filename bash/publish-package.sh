bash ./bash/update-package.sh

versionType="patch" # default to patch
if [ $# -eq 1 ]
  then
    versionType=$1
fi

echo "Publishing version $versionType"


cd ./package

# if versionType is `none` the skip the versioning and publish
if [ "$versionType" != "none" ]
  then
    # version the project
    npm version $versionType
fi

npm publish