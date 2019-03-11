pipeline {
    agent {
        dockerfile {
            filename: 'Dockerfile.dev'
        }
    }

    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'npm run test'
            }
        }
    }
}

