pipeline {

	agent any
	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/tropicalweather.web"
				sh "git clone https://github.com/workshopapps/tropicalweather.web.git"
				
			}

		}

		stage("build frontend"){

			steps {
				sh "pwd"
				sh "cd frontend && sudo npm i --force && CI=false sudo npm run build"
				sh "pwd"
			}
        }
        stage("build backend"){

			steps {
                sh "cd backend && sudo python3 -m pip install --upgrade pip"
                sh "cd backend && sudo pip install -r requirements.txt"
            }
        }
		stage("deploy") {
		
			steps {
				sh "sudo cp -r ${WORKSPACE}/tropicalweather.web /home/johnoni/"
				sh "sudo cp -r /home/johnoni/tropicalweather_env/logged /home/johnoni/tropicalweather.web/backend/logs"
				sh "sudo cp -r /home/johnoni/tropicalweather_env/app.env /home/johnoni/tropicalweather.web/backend/app/.env"

				sh "sudo systemctl restart tropicalweatherf.service"
				sh "sudo systemctl restart tropicalweatherb.service"
            }
			
	    }
	}
}

