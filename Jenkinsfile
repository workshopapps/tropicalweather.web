pipeline {

	agent any
	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/tropicalweather.web"
				sh "git clone https://github.com/workshopapps/tropicalweather.web.git"
				sh "sudo cp -r ${WORKSPACE}/tropicalweather.web /home/johnoni/avatarai.web"
			}

		}

		stage("build frontend"){

			steps {
				sh "cd frontend"
				sh "cd frontend && npm i --force && CI=false npm run build"
			} 
        }
        stage("build backend"){

			steps {
                sh "cd backend"
                sh "cd backend && python3 -m pip install --upgrade pip"
                sh "cd backend && pip install -r requirements.txt"
            }  
        }
		// stage("deploy") {
		
		// 	steps {
        //         sh "sudo cp -rf backend /home/johnoni/tropicalweather/backend"
        //         sh "sudo cp -rf ${WORKSPACE}/frontend/build/* /home/johnoni/tropicalweather/frontend"
        //     // sh "sudo su - johnoni && whoami"
        //     //  sh "sudo pm2 stop tropicalweather"
	    // 	//  sh "sudo pm2 stop server"
        //         sh "sudo pm2 serve /home/johnoni/tropicalweather/frontend/build --port 55001"
        //         sh "sudo pm2 start /home/johnoni/tropicalweather/backend/app/main.py --interpreter python3"
        //     }
			
	    // }
	}
}


// uvicorn api:app --host 0.0.0.0 --port 8173
