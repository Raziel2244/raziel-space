pipeline {
  agent none

  stages {
    stage('Fetch Dependencies') {
      agent {
        docker 'node:alpine'
      }
      steps {
        sh 'npm install -g @angular/cli'
        sh 'npm install'
        stash includes: 'node_modules/', name: 'node_modules'
      }
    }

    stage('Lint') {
      agent {
        docker 'node:alpine'
      }
      steps {
        unstash 'node_modules'
        sh 'npm run lint'
      }
    }

    stage('Unit Tests') {
       agent {
        docker 'circleci/node:latest-browsers'
      }
      steps {
        sh 'npm install -g @angular/cli'
        sh 'npm install'
        sh 'npm run test --code-coverage --progress=false'
        stash includes: 'node_modules/', name: 'ci_node_modules'
      } 
    }

    stage('E2E Tests') {
       agent {
        docker 'circleci/node:latest-browsers'
      }
      steps {
        unstash 'ci_node_modules'
        sh 'npm run e2e'
      }
    }

    stage('Clean') {
      agent any
      steps {
        /* https://www.projectatomic.io/blog/2015/07/what-are-docker-none-none-images/ */
        /* https://docs.docker.com/config/pruning*/
        /** sh 'sudo docker rmi $(docker images -f "dangling=true" -q)' **/
        sh 'sudo docker system prune -f'
      }
    }
  }
}

