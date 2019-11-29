aws2 s3 mb s3://demo-sam

aws2 cloudformation package --template-file template.yaml --output-template-file sam-template.yaml --s3-bucket demo-sam

aws2 cloudformation deploy --template-file sam-template.yaml --stack-name hello-sam-stack --capabilities CAPABILITY_IAM
