const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
// const x = document.querySelector('.ghost');

// function changeUrl(){
// 	javascript:window.location.href="/menu/signup";
// 	container.classList.add("right-panel-active");
// }

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});