sam validate    
sam package --template-file template.yaml --output-template-file sam.yaml --s3-bucket demo-sam
sam deploy --template-file sam.yaml --stack-name sam-rest-api --capabilities CAPABILITY_IAM
sam logs -n GetUser --stack-name sam-rest-api --tail
