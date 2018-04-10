const xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		// console.warn(xhr.responseText)
		const res = JSON.parse(xhr.response)

		if (res.length) {
			appendAccountNameToHeader(res)
			res.forEach(function(account) {
				appendOneElementToBody(account)
			})
		} else {
			appendOneElementToBody(res)
		}


		function showAllPropsInObject(object) {
			for (prop in res) {
				console.log(`${prop} ${res[prop]}`)
			}
		}

		console.log(res)
	}
}

function appendAccountNameToHeader(res) {
	
	res = res instanceof Array ? res[0] : res;
	
	// let headerOne = ...;
	let existingAccntHeader = document.querySelector('.accountNameContainer')
	if(existingAccntHeader) existingAccntHeader.parentElement.removeChild(existingAccntHeader)
		// remove headerOne;
	
	const headerOne = document.querySelector('.main__top')
	
	const accountNameContainer = document.createElement('div')
	accountNameContainer.classList.add('accountNameContainer')
	
	appendElement(accountNameContainer, createElement('p',
	res.account.accountName))
	appendElement(accountNameContainer, createElement('p',
	res.account.fundsTotalAmnt))
	appendElement(headerOne, accountNameContainer)
}

//function appendAccountAmountToHeader(res) {
//	const headerOne = document.querySelector('.main__top')
//
//	const accountNameContainer = document.createElement('div')
//	accountNameContainer.classList.add('accountNameContainer')
//
//	appendElement(accountNameContainer, createElement('p',
//			res.account.accountName))
//	appendElement(accountNameContainer, createElement('p',
//			res.account.fundsTotalAmnt))
//	appendElement(headerOne, accountNameContainer)
//}


function appendOneElementToBody(res) {
	const body = document.querySelector('.fundContainer')

	const fundContainer = document.createElement('div')
	fundContainer.classList.add('fundContainer')
	
	let xButton = createElement('button', 'x')
	xButton.className = 'removeButton'
	xButton.onclick = removeFund
	let fund = createElement('h2', res.fundName)
	
	appendElement(fundContainer, fund)
	appendElement(fundContainer, xButton)
	appendElement(fundContainer, createElement('p', res.fundAmount))
	
	fundContainer.setAttribute('data-fund-id', res.id)

	appendElement(body, fundContainer)
}

xhr.open('GET', 'http://localhost:8080/account/1/funds', true)
xhr.send()

function createElement(elem, textValue) {
			const newElem = document.createElement(elem)
			newElem.innerText = textValue

			return newElem
		}

		function appendElement(parent, child) {
			parent.appendChild(child)
		}