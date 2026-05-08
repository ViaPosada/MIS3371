window.onload = function() {
      showDate();
      updateHealthValue();
      loadStates();
      setFirstNameCookie();
      setLocalStorage();
  } 

function loadStates() {
    fetch("states.txt")
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            document.getElementById("state").innerHTML = data;
            loadForm(); 
        })
        .catch(function(error) {
            console.error("State list did not load:", error);
        });
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

    if (value.length > 0) {
      formatted = value.substring(0, 3);
    }
    
    if (value.length > 3) {
      formatted += "-" + value.substring(3, 5);
    }

    if (value.length > 5) {
      formatted += "-" + value.substring(5, 9);
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

  function setCookie(name, cvalue, expiryHours) {
    let date = new Date();
    date.setTime(date.getTime() + (expiryHours * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(cvalue) + "; " + expires + "; path=/";
  }

  function getCookie(name) {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }

    return "";
  }

  function deleteAllCookies() {
    document.cookie.split(";").forEach(function(cookie) {
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  }

  function setFirstNameCookie(firstName) {
    let firstNameSaved = getCookie("firstName");
    let nameInput = document.getElementById("first_name");
    let welcomeMessage = document.getElementById("welcome-message");
    let newUser = document.getElementById("new-user-message");
    let rememberMe = document.getElementById("remember-me");

    if (firstNameSaved !== "") {
      nameInput.value = firstNameSaved;
      welcomeMessage.textContent = "Welcome back, " + firstNameSaved + "!";
      
      newUser.innerHTML = 
      '<label><input type="checkbox" id="new-user-check"> Not ' +
      firstNameSaved + '? Click here to start as a new user.</label>';

      document.getElementById("new-user-check").addEventListener("change", function() {
        if (this.checked) {
          clearSavedData();
        }
      });
    } else {
      welcomeMessage.textContent = "Welcome, new user";
      newUser.innerHTML = "";
    }

    nameInput.addEventListener("blur", function() {
      if (rememberMe.checked && nameInput.value.trim() !== "") {
        setCookie("firstName", nameInput.value.trim(), 48);
        localStorage.setItem("first_name", nameInput.value.trim());
      }
    });

    rememberMe.addEventListener("change", function() {
      if (!this.checked) {
        clearSavedData();
      } else {
        if (nameInput.value.trim() !== "") {
          setCookie("firstName", nameInput.value.trim(), 48);
          saveForm();
        }
      }
    });
  }

  let storageFields = [
    "first_name",
    "middleinit",
    "last_name",
    "dob",
    "email",
    "phone",
    "address1",
    "address2",
    "city",
    "state",
    "zip",
    "symptoms",
    "userid"
  ];

  let radioGroups = [
    "gender",
    "vaccinated",
    "insurance"
  ];

  let checkboxGroups = [
    "prior_conditions"
  ];

  let extraFields = [
    "current_health"
  ];

  function saveForm() {
    let rememberMe = document.getElementById("remember-me");
    let firstName = document.getElementById("first_name").value.trim();

    if (!rememberMe.checked) {
      localStorage.clear();
      deleteAllCookies();
      return;
    }

    if (firstName !== "") {
      setCookie("firstName", firstName, 48);    
    }

    for (let i = 0; i < storageFields.length; i++) {
      let field = document.getElementById(storageFields[i]);
      if (field) {
        localStorage.setItem(storageFields[i], field.value);
      }
    } 

    for (let i = 0; i < radioGroups.length; i++) {
      let radios = document.querySelector("input[name='" + radioGroups[i] + "']:checked");
      if (radios) {
        localStorage.setItem(radioGroups[i], radios.value);
      }
    }

    for (let i = 0; i < checkboxGroups.length; i++) {
      let checkboxes = document.querySelectorAll("input[name='" + checkboxGroups[i] + "']:checked");
      let checkedValues = [];
      
      for (let j = 0; j < checkboxes.length; j++) {
        checkedValues.push(checkboxes[j].value);
      }

      localStorage.setItem(checkboxGroups[i], checkedValues.join(","));
    }

    for (let i = 0; i < extraFields.length; i++) {
      let field = document.getElementById(extraFields[i]);
      if (field) {
        localStorage.setItem(extraFields[i], field.value);
      }
    }
  }

  function loadForm() {
    let rememberMe = document.getElementById("remember-me");
    let firstNameSaved = getCookie("firstName");
    let localName = localStorage.getItem("first_name");

    if (!rememberMe.checked || firstNameSaved === "") {
      return;
    }

    if (localName !== null && localName !== firstNameSaved) {
      return;
    }

    for (let i = 0; i < storageFields.length; i++) {
      let field = document.getElementById(storageFields[i]);
      let savedValue = localStorage.getItem(storageFields[i]);
      if (field && savedValue !== null) {
        field.value = savedValue;
      }
    }

    for (let i = 0; i < radioGroups.length; i++) {
      let savedRadio = localStorage.getItem(radioGroups[i]);
      if (savedRadio !== null) {
        let radio = document.querySelector(
          "input[name='" + radioGroups[i] + "'][value='" + savedRadio + "']"
        );

        if (radio) {
          radio.checked = true;
        }
      }
    }

    for (let i = 0; i < checkboxGroups.length; i++) {
      let savedCheckboxes = localStorage.getItem(checkboxGroups[i]);
      
      if (savedCheckboxes !== null) {
        let values = savedCheckboxes.split(",");

        for (let j = 0; j < values.length; j++) {
          let checkbox = document.querySelector(
            "input[name='" + checkboxGroups[i] + "'][value='" + values[j] + "']"
          );

          if (checkbox) {
            checkbox.checked = true;
          }
        }
      }
    }

    for (let i = 0; i < extraFields.length; i++) {
      let field = document.getElementById(extraFields[i]);
      let savedValue = localStorage.getItem(extraFields[i]);

      if (field && savedValue !== null) {
        field.value = savedValue;
      }
    }

    updateHealthValue();
  }

  function clearSavedData() {
    deleteAllCookies();
    localStorage.clear();
    document.querySelector("form").reset();
    document.getElementById("welcome-message").textContent = "Welcome, new user";
    document.getElementById("new-user-message").innerHTML = "";
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("review-info").style.display = "none";
    updateHealthValue();
  }

  function setLocalStorage() {
    for (let i = 0; i < storageFields.length; i++) {
      let field = document.getElementById(storageFields[i]);
      
      if (field) {
        field.addEventListener("blur", saveForm);
        field.addEventListener("change", saveForm);
      }
    }

    for (let i = 0; i < radioGroups.length; i++) {
      let radios = document.getElementsByName(radioGroups[i]);

      for (let j = 0; j < radios.length; j++) {
        radios[j].addEventListener("change", saveForm);
      }
    }

    for (let i = 0; i < checkboxGroups.length; i++) {
      let checkboxes = document.getElementsByName(checkboxGroups[i]);

      for (let j = 0; j < checkboxes.length; j++) {
        checkboxes[j].addEventListener("change", saveForm);
      }
    }

    for (let i = 0; i < extraFields.length; i++) {
      let field = document.getElementById(extraFields[i]);

      if (field) {
        field.addEventListener("change", saveForm);
        field.addEventListener("input", saveForm);
      }
    }
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

    document.getElementById("review-info").style.display = "block";
  }
  
  

  
  









  
