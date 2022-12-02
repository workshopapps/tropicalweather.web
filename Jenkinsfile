pipeline {

	agent any
	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/tropicalweather.web"
				sh "git clone https://github.com/workshopapps/tropicalweather.web.git"
				sh "sudo cp -r ${WORKSPACE}/tropicalweather.web /home/johnoni/"
				sh "sudo cp -r /home/johnoni/tropicalweather_env/app.env /home/johnoni/tropicalweather.web/backend/app/.env"
				// sh "sudo cp -r /home/johnoni/tropicalweather.web/app.env /home/johnoni/tropicalweather.web/tropicalweather.web/backend/app/.env"
				sh "sudo ls -la /home/johnoni/tropicalweather.web/"
			}

		}

		stage("build frontend"){

			steps {
				// sh "cd frontend"
				sh "cd frontend && npm i --force && CI=false npm run build"
			} 
        }
        stage("build backend"){

			steps {
                // sh "cd backend"
                sh "cd backend && python3 -m pip install --upgrade pip"
                sh "cd backend && pip install -r requirements.txt"
            }  
        }
		stage("deploy") {
		
			steps {
                sh "sudo cp -rf ${WORKSPACE}/backend/* /home/johnoni/tropicalweather.web/backend"
                sh "sudo cp -rf ${WORKSPACE}/frontend/build/* /home/johnoni/tropicalweather.web/frontend"

				sh "sudo systemctl restart tropicalweatherf.service"
				sh "sudo systemctl restart tropicalweatherb.service"
            }
			
	    }
	}
}

