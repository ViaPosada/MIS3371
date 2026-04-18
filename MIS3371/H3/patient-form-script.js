 window.onload = function() {
      showDate();
      updateHealthValue();
  } 

  function showDate() {
      const now = new Date();
      const formatted = now.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      document.getElementById("date").textContent = formatted;

      setDOBRange();
  }
  
  function setDOBRange() {
    const dobInput = document.getElementById("dob");
    const today = new Date();

    const maxDate = today.toISOString().split("T")[0];
    const minDate = new Date(
      today.getFullYear() - 120, 
      today.getMonth(), 
      today.getDate()
    ).toISOString().split("T")[0];

    dobInput.setAttribute("max", maxDate);
    dobInput.setAttribute("min", minDate);
  }

  function updateHealthValue() {
    let slider = document.getElementById("current_health");
    let output = document.getElementById("healthValue");
    output.textContent = slider.value;
  }

  function lowercaseUserID() {
    let useridInput = document.getElementById("userid");
    useridInput.value = useridInput.value.toLowerCase();
  } 

  function validateDOB() {
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    const dobValue = dobInput.value;

    if (dobValue === "") {
      dobError.style.display = "none";
      return false;
    }

    const dobDate = new Date(dobValue);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 120, 
      today.getMonth(), 
      today.getDate()
    );

    if (dobDate >= today || dobDate < minDate) {
      dobError.style.display = "block";
      return false;
    } 
    else {
      dobError.style.display = "none";
      return true;
    }
  }  

  function displayError(errorId) {
    let error = document.getElementById(errorId); 
    error.style.display = "block";
  }

  function hideError(errorId) {
    let error = document.getElementById(errorId); 
    error.style.display = "none";
  }

  function validateFirstName() {
    let firstNameInput = document.getElementById("first_name").value.trim();
    let validFirstName = /^[A-Za-z'-]{1,30}$/.test(firstNameInput);
    
    document.getElementById("firstNameError").style.display = validFirstName ? "none" : "block";
    
    return validFirstName;
  }

  function validateMiddleInitial() {
    let middleInitInput = document.getElementById("middleinit").value.trim();
    let validMiddleInit = /^[A-Za-z]?$/.test(middleInitInput);
   
    document.getElementById("middleInitError").style.display = validMiddleInit ? "none" : "block";
    
    return validMiddleInit;
  }

  function validateLastName() {
    let lastNameInput = document.getElementById("last_name").value.trim();
    let validLastName = /^[A-Za-z'-]{1,30}$/.test(lastNameInput);
    
    document.getElementById("lastNameError").style.display = validLastName ? "none" : "block";
    
    return validLastName;

  }

  function formatSSN() {
    let ssnInput = document.getElementById("ssn");
    let value = ssnInput.value.replace(/\D/g, "").substring(0, 9); 
    let formatted = "";

    if (value.length >= 3) {
      formatted = value.substring(0, 3) + "-";
    }
    if (value.length >= 5) {
      formatted += value.substring(3, 5) + "-";
    }
    if (value.length >= 9) {
      formatted += value.substring(5, 9);
    }

    ssnInput.value = formatted;
  }

  function validateSSN() {
    let ssnInput = document.getElementById("ssn").value.trim();
    let validSSN = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(ssnInput);

    document.getElementById("ssnError").style.display = validSSN ? "none" : "block";

    return validSSN;
  }

  function validateEmail() {
    let emailField = document.getElementById("email");
    let emailInput = emailField.value.trim().toLowerCase();
    emailField.value = emailInput;
    
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    
    document.getElementById("emailError").style.display = validEmail ? "none" : "block";

    return validEmail;
  }

  function validatePhone() {
    let phoneInput = document.getElementById("phone").value.trim();
    let validPhone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phoneInput);
    
    document.getElementById("phoneNumError").style.display = validPhone ? "none" : "block";
    
    return validPhone;
  }

  function validateUserID() {
    let userIdInput = document.getElementById("userid").value.trim();
    let validUserId = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/.test(userIdInput);

    document.getElementById("userIdError").style.display = validUserId ? "none" : "block";

    return validUserId;
  }

   function validatePasswords() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let userid = document.getElementById("userid").value.toLowerCase();
    let firstName = document.getElementById("first_name").value.toLowerCase();
    let lastName = document.getElementById("last_name").value.toLowerCase();

    let pwError = document.getElementById("pwError");
    let passwordError = document.getElementById("passwordError");

    pwError.style.display = "none";
    passwordError.style.display = "none";

    if (password !== confirmPassword) {
      pwError.style.display = "block";
      return false;
    }

    let lowerPassword = password.toLowerCase();

    if (
      lowerPassword === userid || 
      (userid !== "" && lowerPassword.includes(userid)) ||
      (firstName !== "" && lowerPassword.includes(firstName)) ||
      (lastName !== "" && lowerPassword.includes(lastName))
    ) {
      passwordError.style.display = "block";
      return false;
    }

    return true;
  }

  function validateAddress1() {
    let address1Input = document.getElementById("address1").value.trim();
    let validAddress1 = /^.{2,30}$/.test(address1Input);

    document.getElementById("address1Error").style.display = validAddress1 ? "none" : "block";

    return validAddress1;
  }

  function validateAddress2() {
    let address2Input = document.getElementById("address2").value.trim();
    let validAddress2 = address2Input === "" || /^.{2,30}$/.test(address2Input);

    document.getElementById("address2Error").style.display = validAddress2 ? "none" : "block";

    return validAddress2;
  }

  function validateCity() {
    let cityInput = document.getElementById("city").value.trim();
    let validCity = /^.{2,30}$/.test(cityInput);
    
    document.getElementById("cityError").style.display = validCity ? "none" : "block";

    return validCity;
  }

  function validateZip() {
    let zipInput = document.getElementById("zip").value.trim();
    let validZip = /^[0-9]{5}$/.test(zipInput);
    
    document.getElementById("zipError").style.display = validZip ? "none" : "block";  

    return validZip;
  }

  function validateFields() {
    let validFirstName = validateFirstName();
    let validMiddleInit = validateMiddleInitial();
    let validLastName = validateLastName();
    let validDOB = validateDOB();
    let validSSN = validateSSN();
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validUserId = validateUserID();
    let validPassword = validatePasswords();
    let validAddress1 = validateAddress1();
    let validAddress2 = validateAddress2();
    let validCity = validateCity();
    let validZip = validateZip();

    document.getElementById("submit-btn").disabled = !(
      validFirstName && validMiddleInit && validLastName && 
      validDOB && validSSN && validEmail && validPhone && 
      validUserId && validPassword && 
      validAddress1 && validAddress2 && validCity && validZip
    );
  }

  function validateForm() {
    validateFields();
    return !document.getElementById("submit-btn").disabled;
  }
 
  function reviewForm() {
    let firstName = document.getElementById("first_name").value;
    let middle = document.getElementById("middleinit").value;
    let lastName = document.getElementById("last_name").value;
    let dob = document.getElementById("dob").value;
    let ssn = document.getElementById("ssn").value;
    let email = document.getElementById("email").value;

    let phoneNum = document.getElementById("phone");
    let phone = "";
    if (phoneNum) {
      phone = phoneNum.value;
    }

    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;

    let symptoms = document.getElementById("symptoms").value;
    let userid = document.getElementById("userid").value;
    let password = document.getElementById("password").value;
    let currentHealth = document.getElementById("current_health").value;

    let conditionsList = [];
    let conditions = document.getElementsByName("prior_conditions");

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i].checked) {
        conditionsList.push(conditions[i].value);
      }
    }

    let gender = "";
    let genders = document.getElementsByName("gender");

    for (let i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        gender = genders[i].value;
      }
    }

    let vaccineStatus = "";
    let vaccinated = document.getElementsByName("vaccinated");

    for (let i = 0; i < vaccinated.length; i++) {
      if (vaccinated[i].checked) {
        vaccineStatus = vaccinated[i].value;
      }
    }

    let insuranceStatus = "";
    let insuranceTypes = document.getElementsByName("insurance");

    for (let i = 0; i < insuranceTypes.length; i++) {
      if (insuranceTypes[i].checked) {
        insuranceStatus = insuranceTypes[i].value;
      }
    }

    document.getElementById("review-name").textContent = `${firstName} ${middle} ${lastName}`;
    document.getElementById("review-dob").textContent = dob;
    document.getElementById("review-ssn").textContent = ssn;
    document.getElementById("review-email").textContent = email;

    if (document.getElementById("review-phone")) {
      document.getElementById("review-phone").textContent = phone;
    }

    document.getElementById("review-address1").textContent = address1;
    document.getElementById("review-address2").textContent = address2;
    document.getElementById("review-city").textContent = city;
    document.getElementById("review-state").textContent = state;
    document.getElementById("review-zip").textContent = zip;

    document.getElementById("review-conditions").textContent = conditionsList.join(", ");
    document.getElementById("review-gender").textContent = gender;
    document.getElementById("review-vaccinated").textContent = vaccineStatus;
    document.getElementById("review-insurance").textContent = insuranceStatus;
    document.getElementById("review-symptoms").textContent = symptoms;
    document.getElementById("review-health").textContent = currentHealth;
    document.getElementById("review-userid").textContent = userid;
    document.getElementById("review-password").textContent = password;

    document.getElementById("review-info").style.display = "block";
  }
  
  

  
  









  







  
