pipeline {
    options {
        // only allowing 1 build at a time for each branch.
        disableConcurrentBuilds()
        //fail the pipeline after 30 min
        timeout(time: 30, unit: 'MINUTES')
    }
    agent any
    stages {

        stage("Apply Kubernetes files"){
            steps{
                dir("k8s_scripts"){
                    sh "kubectl apply -f nginx-config.yaml"
                    sh "kubectl apply -f nginx-lb.yaml -f nginx.yaml"

                    sh "kubectl apply -f svc_backend_createticket.yaml -f svc_backend_readticket.yaml -f svc_backend_updateticket.yaml -f svc_backend_deleteticket.yaml"
                    sh "kubectl apply -f backend_createticket.yaml -f backend_readticket.yaml -f backend_updateticket.yaml -f backend_deleteticket.yaml"

                    sh "kubectl set env deployment/create_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    sh "kubectl set env deployment/create_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    sh "kubectl set env deployment/create_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    sh "kubectl set env deployment/read_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    sh "kubectl set env deployment/read_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    sh "kubectl set env deployment/read_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    sh "kubectl set env deployment/update_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    sh "kubectl set env deployment/update_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    sh "kubectl set env deployment/update_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    sh "kubectl set env deployment/delete_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    sh "kubectl set env deployment/delete_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    sh "kubectl set env deployment/delete_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"            
                }
            }
                
            }
        
        //TODO: add conditional to check if branch name contains frontend, main, or dev.
        //TODO: frontend testing.
        //TODO: frontend build package (npm?).
        //TODO: create frontend image using dockerfile.
        //TODO: push frontend container image to dockerhub.
        //TODO: push frontend test results to github.
        //TODO: archive frontend npm package.
        //TODO: clean workspace.
        //TODO: change node to kubernetes cluster (or maybe just run kubectl commands using the endpoint?)
        //TODO: use kubernetes yaml files to run containers (where does dockercompose come into this?)
    }
}