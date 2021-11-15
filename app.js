document.getElementById('calculate').addEventListener('click', function (e) {

  e.preventDefault();

  document.getElementById('gif').style.display = 'block';

  if (document.getElementById('gif').nextElementSibling) {

    document.getElementById('gif').nextElementSibling.nextElementSibling.remove();

    document.getElementById('gif').nextElementSibling.remove();

  }

  setTimeout(calculateLoan, 3000);

});

function calculateLoan(e) {

  let resultsDiv;


  const containerDiv = document.querySelector('.container');

  const loanAmount = document.getElementById('amount');
  const loanInterest = document.getElementById('interest');
  const loanYears = document.getElementById('years');

  resultsDiv = document.createElement('div');
  const h3 = document.createElement('h3');
  const dataDiv1 = document.createElement('div');
  const dataDiv2 = document.createElement('div');
  const dataDiv3 = document.createElement('div');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const input1 = document.createElement('input');
  const input2 = document.createElement('input');
  const input3 = document.createElement('input');

  h3.textContent = 'Results';
  h3.style.paddingTop = '20px';
  h3.style.paddingBottom = '10px';

  span1.className = 'symbol';
  span1.textContent = 'Monthly Payment';

  span2.className = 'symbol';
  span2.textContent = 'Total Payment';

  span3.className = 'symbol';
  span3.textContent = 'Total Interest';

  input1.disabled = true;
  input2.disabled = true;
  input3.disabled = true;

  dataDiv3.style.marginTop = '0';

  // Calculations
  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(loanInterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(loanYears.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    input1.value = monthly.toFixed(2);
    input2.value = (monthly * calculatedPayments).toFixed(2);
    input3.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('gif').style.display = 'none';


    // // Show results
    // document.getElementById('results').style.display = 'block';

    // // Hide loader
    // document.getElementById('loading').style.display = 'none';

  } else {
    // showError('Please check your numbers');
    showError();

    document.getElementById('gif').style.display = 'none';

    return 0;
  }

  dataDiv1.appendChild(span1);
  dataDiv1.appendChild(input1);
  dataDiv1.className = 'data';

  dataDiv2.appendChild(span2);
  dataDiv2.appendChild(input2);
  dataDiv2.className = 'data';

  dataDiv3.appendChild(span3);
  dataDiv3.appendChild(input3);
  dataDiv3.className = 'data';

  resultsDiv.appendChild(dataDiv1);
  resultsDiv.appendChild(dataDiv2);
  resultsDiv.appendChild(dataDiv3);

  containerDiv.appendChild(h3);
  containerDiv.appendChild(resultsDiv);

}

function showError() {

  if (document.querySelector('.error')) {

    document.querySelector('.error').remove();

  }

  const containerDiv = document.querySelector('#container-top');
  const calculationsDiv = document.querySelector('.calculations');

  const errorDiv = document.createElement('div');

  errorDiv.className = 'error';
  errorDiv.textContent = 'Please check your numbers';
  errorDiv.style.cssText = 'width: 100%; background: red; padding: 30px 20px; font-size: 14px; color: #000; margin-bottom: 15px; border-radius: 5px';

  containerDiv.insertBefore(errorDiv, calculationsDiv);

  setTimeout(function () {

    if (document.querySelector('.error')) {

      containerDiv.removeChild(document.querySelector('.error'));

    }

  }, 3000);

}

