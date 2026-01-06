pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerusername/playwright-automation"
        BASE_URL = "website URL here"
        FRANCHISE_URL = "franchise URL here"
        FRANCHISE_USERNAME = "TEST"
        FRANCHISE_PASSWORD = credentials('Franchise_password')
    }

    stages {

        stage('Git Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kushvahasumit/Playwright-Automation.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                  docker build -t ${DOCKER_IMAGE} .
                """
            }
        }

        stage('Check Docker Image') {
            steps {
                sh 'docker images | grep playwright'
            }
        }

        stage('Run Docker Image & tests') {
            steps {
                sh """
                  docker run --rm \
                    -v "\$(pwd)/allure-results:/app/allure-results" \
                    -e Base_url=${BASE_URL} \
                    -e Franchise_url=${FRANCHISE_URL} \
                    -e Franchise_username=${FRANCHISE_USERNAME} \
                    -e Franchise_password=${FRANCHISE_PASSWORD}\
                    ${DOCKER_IMAGE} \
                    sh -c "
                     npm run franchise:login &&
                    npm run test || true
                      "
                """
            }
        }

    }

    post {
        always {
            allure(
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                )
                
            sh 'docker system prune -af  || true'
        }
        success {
            echo "Pipeline ran successfully"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
