// console.log(Object.keys(process.env))

let apiUrl;

if (Object.keys(process.env).findIndex((key) => key == "REACT_APP_LOCAL_VERSION") == -1) {
	apiUrl = 'https://newsonnews.herokuapp.com/'
} else {
	apiUrl = 'http://localhost:9292'
}

export default apiUrl;