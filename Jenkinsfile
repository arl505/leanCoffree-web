pipeline {
  agent any

  stages {

    stage("Build/Test: Frontend") {
      steps {
        sh "yarn install"
        sh "yarn build"
      }
    }

    stage("Deploy: Frontend") {
      when {
        expression {
           env.BRANCH_NAME == "main"
        }
      }
      steps {
        sh "cp -r build /usr/share/nginx/leanCoffree/"
      }
    }
  }
}