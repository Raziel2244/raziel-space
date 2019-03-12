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

#    stage('Compile Browser') {
#       agent {
#        docker 'node:alpine'
#      }
#      steps {
#        unstash 'node_modules'
#        sh 'npm run build --prod'
#      }
#    }

#    stage('Compile SSR') {
#      agent {
#        docker 'node:alpine'
#      }
#      steps {
#        unstash 'node_modules'
#        sh 'npm run build:server'
#        sh 'npm run webpack:server'
#      }
#    }

#    stage('Deploy Beta') {
#      agent any
#      environment {
#          TAG = sh (script: "git log -n 1 --pretty=format:'%h'", returnStdout: true)
#          PREV_TAG = sh (script: "git log -n 1 --skip 1 --pretty=format:'%h'", returnStdout: true)
#      }
#      steps { 
#        echo "${env.TAG}"
#        /* Forcing the name, it will remove old image and build a new one, saving space
#        this will image will be reused by prod as well */
#        sh "sudo docker build -t educatex:${env.TAG} -f app.dockerfile ."
#        /** specific file names reference to specific containers does not 
#        ensure different instances, just one instance run in that directory
#        SOLVE : project name -p provides a context to the instance and putting
#        project up/down will effect containers on the project. 
#        By default project name is the current directory hence the issue.**/
#        /* sh 'sudo -E docker-compose -f docker-compose.beta.yml -p BETA down' */
#        /* sh 'sudo -E docker-compose -f docker-compose.beta.yml -p BETA up -d' */
#        /* Removed above lines as it causes inconsistency between prod and beta */
#        sh 'sudo -E docker stack deploy -c docker-compose.beta.yml educatex_beta'
#      } 
#    }

#    stage('Approve') {
#      input {
#          message "Should we continue?"
#          ok "Yes, we should."
#          submitter "educatex"
#          parameters {
#              string(name: 'STATUS', defaultValue: 'Approved', description: 'Is Beta working fine?')
#          }
#      }
#      steps {
#          echo "${STATUS}"
#      }
#    }

#    stage('Deploy Prod') {
#      agent any
#      environment {
#          TAG = sh (script: "git log -n 1 --pretty=format:'%h'", returnStdout: true)
#      }
#      steps {
#        echo "${env.TAG}"
#        sh "sudo docker build -t educatex_prod:${env.TAG} -f app.dockerfile ."
#        /* This will take care of changes first start or changes in compose
#        or changes in image. No need to put it down. 
#        This will also ensure availability/rollback while deploying as per update-config
#        attribute in compose.*/
#        /* Put -E so that it is able to access env variables set above */
#        /* See : https://forums.docker.com/t/docker-compose-not-seeing-environment-variables-on-the-host/11837/8 **/
#        sh 'sudo -E docker stack deploy -c docker-compose.prod.yml educatex'
#        /** sh 'sudo docker-compose -f docker-compose.prod.yml -p PROD down'
#        sh 'sudo docker-compose -f docker-compose.prod.yml -p PROD up -d'**/
#      }
#    }

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

