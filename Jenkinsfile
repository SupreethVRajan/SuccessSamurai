pipeline {
    agent any

    stages {
        stage('Github Pull') {
            steps {
                git branch: 'main', credentialsId: 'GithubCredentials', url: 'https://github.com/SupreethVRajan/SuccessSamurai.git'
            }
        }
        stage('Mocha Tests') {
            steps {
                dir('server') {
                    sh "npm install"
                    sh "npm test"
                }
            }
        }
        stage('Docker Build - Server') {
            steps {
                dir('server') {
                    sh "pwd"
                    script {
                        serverImage=docker.build("supreethv/successsamurai-backend:latest")
                    }
                }
            }
        }
        stage('Docker Build - Client') {
            steps {
                dir('client') {
                    sh "pwd"
                    script {
                        clientImage=docker.build("supreethv/successsamurai-frontend:latest")
                    }
                }
            }
        }
        stage('Docker push images') {
            steps {
                script{
                    docker.withRegistry('','DockerCredentials'){
                    serverImage.push()
                    clientImage.push()
                    }
                }
            }
        }
        stage("Delete docker image"){
            steps{
                sh "docker rmi supreethv/successsamurai-backend"
                sh "docker rmi supreethv/successsamurai-frontend"
            }
        }
        stage('Ansible Deploy') {
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'playbook.yml', sudoUser: null
            }
        }
    }
}