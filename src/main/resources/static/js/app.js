const xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		// console.warn(xhr.responseText)
		const funds = JSON.parse(xhr.response)

		
			appendUnassignedFundToBody(funds[0])
			appendAccountNameToHeader(funds)
			funds.forEach(function(fund) {
				appendOneElementToBody(fund)
			})
		

		function appendAccountNameToHeader(funds) {
			const headerOne = document.querySelector('.main__top')

			const accountNameContainer = document.createElement('div')
			accountNameContainer.classList.add('accountNameContainer')

			let accntAmnt = createElement('p', funds[0].account.balance.toFixed(2))
			accntAmnt.classList.add('accntAmnt')
			
			appendElement(accountNameContainer, createElement('p',
					funds[0].account.accountName + ": $"))
			appendElement(accountNameContainer, accntAmnt)

					
			appendElement(headerOne, accountNameContainer)
		}

		function showAllPropsInObject(object) {
			for (prop in funds) {
				console.log(`${prop} ${funds[prop]}`)
			}
		}
		console.log(funds)
	}
}

 function appendUnassignedFundToBody(fund) {
 const thirdBody = document.querySelector('.defaultFundContainer')

 const defaultFundContainer = document.createElement('div')
 defaultFundContainer.classList.add('defaultFundContainer')

 let defaultFund = createElement('h2', 'Unassigned Funds')
 defaultFund.className = 'defaultFund'
 // default fund attempt
 appendElement(defaultFundContainer, defaultFund)
 appendElement(defaultFundContainer, createElement('p',
 fund.account.unassignedFundAmount))
 appendElement(thirdBody, defaultFundContainer)
 
 }

function appendOneElementToBody(res) {

//	// default fund attempt
//	const thirdbody = document.querySelector('.defaultFundContainer')
//	const defaultFundContainer = document.createElement('div')
//
//	 defaultFundContainer.classList.add('defaultFundContainer')
//	
//	 let defaultFund = createElement('h2', 'Unassigned Funds')
//	 defaultFund.className = 'defaultFunds'
//	 appendElement(defaultFundContainer, defaultFund)
//	 appendElement(defaultFundContainer, createElement('p',
//	 res.account.unassignedFundAmount))
//	 appendElement(thirdbody, defaultFundContainer)
//	// default fund attempt ends

	const body = document.querySelector('.fundContainer')
	const fundContainer = document.createElement('div')
	fundContainer.classList.add('fundContainer')

	let xButton = createElement('button', 'x')
	xButton.className = 'removeButton'
	xButton.onclick = removeFund
	let fund = createElement('h2', res.fundName)

	fund.className = 'fundInformation'

	let editButton = createElement('button', 'edit')
	editButton.className = 'editButton'

	appendElement(fundContainer, fund)
	appendElement(fundContainer, xButton)
	appendElement(fund, editButton)
	appendElement(fundContainer, createElement('p', res.fundAmount))

	fundContainer.setAttribute('data-fund-id', res.id)

	appendElement(body, fundContainer)
	

	let modal = document.querySelector(".modal");
	// let testTrigger = document.querySelectorAll("[data-fund-id='"+res.id+"']
	// .editButton") //an array

	let closeButton = document.querySelector(".close-button")

	// testTrigger.forEach(function (elem){
	// elem.addEventListener("click", toggleModal);
	// })
	editButton.addEventListener("click", toggleModal);

	function toggleModal() {
		modal.classList.toggle("show-modal");
		console.log('Here')
	}

	// function windowOnClick(event) {
	// if (event.target === modal) {
	// toggleModal()
	// }
	// }

	closeButton.addEventListener("click", toggleModal);

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