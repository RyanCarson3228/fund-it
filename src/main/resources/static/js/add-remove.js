
document.addEventListener("DOMContentLoaded", function() {
	createAddFundButton()
});

function createAddFundButton() {
	const addFundButton = document.querySelector('.fund-add-button');
	addFundButton.addEventListener('click', addFund)
}

function removeFund(event) {
	event.preventDefault();
	const theButton = event.target
	const fundId = theButton.parentElement.getAttribute('data-fund-id')
	const arrayIndex = fundsApp.funds.indexOf(fundId)
	fundsApp.funds.splice(arrayIndex, 1)
	console.log(theButton)
	
	const xhr = new XMLHttpRequest()// ajax request
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
			let fundContainer = theButton.parentElement
			fundContainer.parentElement.removeChild(fundContainer)

			//document.querySelector('#fundsAmnt').textContent = xhr.responseText
			drawChart(fundsApp.funds)
		}
	}
	xhr.open('POST', '/account/1/fund/' + fundId + '/remove-fund', true)
	xhr.send()
}

function addFund(event) {
	event.preventDefault();// prevents forms from refreshing
	const theButtonAdd = event.target;
	const fundName = document.querySelector('#fund_input').value; // Fund name

	console.log(fundName);
	const xhr = new XMLHttpRequest()// ajax request
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const newFund = JSON.parse(xhr.response)
			fundsApp.funds.push(newFund);
			console.log(xhr.responseText);
			appendOneElementToBody(newFund)
			appendAccountNameToHeader(newFund)
			drawChart(fundsApp.funds);
		}
	}

	xhr.open('POST', '/add-fund/account/1/' + fundName, true)
	xhr.send()
}

function createElement(elem, textValue) {
	const newElem = document.createElement(elem)
	newElem.innerText = textValue

	return newElem
}

function appendElement(parent, child) {
	parent.appendChild(child)
}