pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    tools {
        nodejs 'NodeJS 22'
    }

    environment {
        API_USERNAME = credentials('restful-booker-username')
        API_PASSWORD = credentials('restful-booker-password')
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run API tests') {
            steps {
                bat 'npm run test:api'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'mochawesome-report/**/*',
                allowEmptyArchive: true
            )
        }
    }
}
