#!/bin/sh

echo "Compiling TS to JS"
rm -rf artifacts && tsc

echo "Bundling zip files"
webpack --mode production

echo "Syncing to S3 bucket"
aws s3 sync "artifacts/built-lambdas/zip"  s3://loudly-noticeably-allowing-goldfish

echo "Updating Function Code"

aws lambda update-function-code \
    --function-name  RecipeCreateUpdate \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key RecipeCreateUpdate.zip

aws lambda update-function-code \
    --function-name  RecipeDelete \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key RecipeDelete.zip

aws lambda update-function-code \
    --function-name  RecipeGetById \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key RecipeGetById.zip

aws lambda update-function-code \
    --function-name  RecipeGetByUser \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key RecipeGetByUser.zip

aws lambda update-function-code \
    --function-name  UserCreateUpdate \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key UserCreateUpdate.zip

aws lambda update-function-code \
    --function-name  UserGet \
    --s3-bucket loudly-noticeably-allowing-goldfish \
    --s3-key UserGet.zip

echo "Deploy Complete"
