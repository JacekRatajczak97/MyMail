const loginInput = document.querySelector(".sign-in__login");
const passwordInput = document.querySelector(".sign-in__password");
const logInButton = document.querySelector(".submit-button");
const containerSignIn = document.querySelector(".container");
const welcomeText = document.querySelector(".welcome-text");
const mainPage = document.querySelector(".main-page");
const logOutButton = document.querySelector(".logout");
const newMailWindow = document.querySelector(".new__mail--window");
const newMailButton = document.querySelector(".new-mail");
const faHover = document.querySelectorAll(".fa-hover");
const dynamicReceivers = document.querySelectorAll(".dynamic-receiver");
const mailReceiver = document.querySelector("#mail-receiver");
const sendMailButton = document.querySelector(".send-mail");
const mails = document.querySelector(".mails");
const sentButton = document.querySelector(".sent");
const inbox = document.querySelector(".inbox");
const important = document.querySelector(".important");
const showMail = document.querySelector(".show-mail");
const sendTo = document.querySelector(".send-to");
const registerButton = document.querySelector("#register-button");
const registerComfirmButton = document.querySelector(
  "#register-button__comfirm"
);
const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");

let active = "";

let users = [
  {
    name: "Jack",
    login: "aaa",
    password: "aaa",
    mailSent: [],
    mailReceived: [],
  },
  {
    name: "Monica",
    login: "bbb",
    password: "bbb",
    mailSent: [],
    mailReceived: [],
  },
  {
    name: "Nico",
    login: "ccc",
    password: "ccc",
    mailSent: [],
    mailReceived: [],
  },
  {
    name: "Olivia",
    login: "ddd",
    password: "ddd",
    mailSent: [],
    mailReceived: [],
  },
];

// who is loged in
logInButton.addEventListener("click", () => {
  if (
    (loginInput.value !== "" && passwordInput.value !== "") ||
    loginInput.value !== "" ||
    passwordInput.value !== ""
  ) {
    users.forEach((e) => {
      if (e.login === loginInput.value) {
        if (e.password === passwordInput.value) {
          active = e.name;
          showMainContainer(e);
          activeUser(e.name);
          createReceivedMail(e.mailReceived);
        }
      }
    });
  }
});

// create main container
const showMainContainer = (e) => {
  containerSignIn.style.display = "none";
  welcomeText.innerHTML = `<h1>Welcome ${e.name}</h1>`;
  mainPage.style.display = "flex";
  loginInput.value = "";
  passwordInput.value = "";
};

//display mails after log in
const createReceivedMail = (currentUserMailReceived) => {
  currentUserMailReceived.forEach((e) => {
    createMailsTemplates(e, "From");
  });
};

const clearScreen = () => {
  document.querySelectorAll(".ul-toggle").forEach((e) => {
    e.remove();
  });
};

// create mails templates
const createMailsTemplates = (element, fromOrTo) => {
  const mailsUl = document.createElement("ul");
  mailsUl.classList.add("ul-toggle");
  mails.appendChild(mailsUl);

  const mailsDiv = document.createElement("div");
  mailsDiv.classList.add("mail");
  mailsDiv.classList.add("mail__unread");
  mailsUl.appendChild(mailsDiv);
  mailsDiv.innerHTML = `<input type="checkbox" ${
    element[4] ? "checked" : null
  } class="main--mail__checkbox"><div class="mailname">${fromOrTo}: ${
    element[0]
  }</div><li class="title">${element[1]}</li><div class="actualtime">${
    element[3]
  }</div>`;

  //event listener show mail details
  mailsDiv.addEventListener("click", (e) => {
    if (e.path[0].classList[0] !== "main--mail__checkbox") {
      showMail.classList.toggle("show-mail__toggle");
      showMail.innerHTML = `<div class="from-whom">${fromOrTo}: <strong>${element[0]}</strong></div>
      <div class="mail-title"><strong>${element[1]}</strong></div>
      <div class="main-mail-content-show">${element[2]}</div> <div class="div-button"><button type="submit" class="close-mail">Close</button></div>`;
      removeUnread();
    }
  });

  //check input status (ischecked?)
  mailsDiv.addEventListener("change", (e) => {
    if (e.path[0].classList[0] === "main--mail__checkbox") {
      let isInputChecked = e.path[0].checked;
      isInputChecked
        ? mailsDiv.classList.add("mail-important")
        : mailsDiv.classList.remove("mail-important");
      users.forEach((e) => {
        if (e.name === active) {
          if (e.mailReceived.includes(element)) {
            let position = e.mailReceived.indexOf(element);
            e.mailReceived[position][4] = isInputChecked;
          }
          if (e.mailSent.includes(element)) {
            let position = e.mailSent.indexOf(element);
            e.mailSent[position][4] = isInputChecked;
          }
        }
      });
    }
  });
};

// close mail window (close show detalis window)
showMail.addEventListener("click", (e) => {
  e.path[0].classList.contains("close-mail")
    ? showMail.classList.remove("show-mail__toggle")
    : null;
});

//close new mail window and details mail window on key ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    showMail.classList.remove("show-mail__toggle");
    newMailWindow.classList.remove("new__mail--window__toggle");
  }
});

//close the new mail window when click outside the container
document.addEventListener("click", (e) => {
  const classArr = ["content", "folder__container", "logo", "search", "navbar"];

  if (classArr.includes(e.path[0].classList[0])) {
    showMail.classList.remove("show-mail__toggle");
    newMailWindow.classList.remove("new__mail--window__toggle");
  }
});

//logout
logOutButton.addEventListener("click", () => {
  clearScreen();
  containerSignIn.style.display = "block";
  mainPage.style.display = "none";
  newMailWindow.classList.remove("new__mail--window__toggle");
  document.querySelectorAll(".dynamic-receiver").forEach((e) => {
    e.remove();
  });
});

//switch to received mails
inbox.addEventListener("click", () => {
  clearScreen();
  users.forEach((e) => {
    if (e.name === active) {
      for (i = 0; i < e.mailReceived.length; i++) {
        createMailsTemplates(e.mailReceived[i], "From");
      }
    }
  });
});

//switch to sent mails
sentButton.addEventListener("click", () => {
  //remove received mails
  clearScreen();

  users.forEach((e) => {
    if (e.name === active) {
      for (i = 0; i < e.mailSent.length; i++) {
        createMailsTemplates(e.mailSent[i], "To");
        document.querySelectorAll(".mail")[i].classList.remove("mail__unread");
      }
    }
  });
});

//show important
important.addEventListener("click", () => {
  clearScreen();

  users.forEach((e) => {
    if (e.name === active) {
      for (i = 0; i < e.mailSent.length; i++) {
        e.mailSent[i][4] ? createMailsTemplates(e.mailSent[i], "To") : null;
      }

      for (i = 0; i < e.mailReceived.length; i++) {
        e.mailReceived[i][4]
          ? createMailsTemplates(e.mailReceived[i], "From")
          : null;
      }
    }
  });
});

//show new mail window
newMailButton.addEventListener("click", () => {
  newMailWindow.classList.toggle("new__mail--window__toggle");
});

//create receivers dynamically
const activeUser = (userName) => {
  document.querySelectorAll(".dynamic-receiver").forEach((e) => {
    e.remove();
  });

  const usersArray = [];

  users.map((e) => {
    if (e.name !== userName) {
      usersArray.push(e.name);
    }
  });
  for (i = 0; i < usersArray.length; i++) {
    const newOption = document.createElement("option");
    newOption.classList.add("dynamic-receiver");
    newOption.innerText = usersArray[i];
    sendTo.parentNode.insertBefore(newOption, sendTo.nextSibling);
  }
};

//send mail button event
sendMailButton.addEventListener("click", () => {
  const toWhom = mailReceiver.options[mailReceiver.selectedIndex].text;
  const displayMinutes = new Date().getMinutes();
  let checkTime = displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes;

  let isChecked = false;

  const mailDate = `${new Date().getHours()}:${checkTime}`;
  const titleText = document.querySelector(".new__mail--title").value;
  const mainText = document.querySelector(".main-mail-content").value;

  pushMailsToArray(toWhom, titleText, mainText, mailDate, isChecked);

  //close new mail window
  newMailWindow.classList.remove("new__mail--window__toggle");

  //clear new mail window after sent
  document.querySelector(".new__mail--title").value = "";
  document.querySelector(".main-mail-content").value = "";
});

// push mails to send/received array
const pushMailsToArray = (toWhom, titleText, mainText, mailDate, isChecked) => {
  users.forEach((e) => {
    if (e.name === active) {
      e.mailSent.push([toWhom, titleText, mainText, mailDate, isChecked]);
    } else if (e.name === toWhom) {
      e.mailReceived.push([active, titleText, mainText, mailDate, isChecked]);
    }
  });
};

//button (inbox, sent, important) hover
faHover.forEach((e) => {
  e.addEventListener("mouseover", () => {
    e.childNodes[1].style.color = "white";
  });
});

faHover.forEach((e) => {
  e.addEventListener("mouseout", () => {
    e.childNodes[1].style.color = "var(--blue)";
  });
});

//registration
registerButton.addEventListener("click", () => {
  containerSignIn.style.display = "none";

  document.querySelector(".container-registration").style.display = "block";
});

// create new account
registerComfirmButton.addEventListener("click", () => {
  const registerLogin = document.querySelector(".register-login").value;
  const registerPassword = document.querySelector(".register-password").value;
  const registerName = document.querySelector(".register-name").value;

  // check if input value is not null
  if (registerLogin === "" || registerPassword === "" || registerName === "") {
  } else {
    users.push({
      name: registerName,
      login: registerLogin,
      password: registerPassword,
      mailSent: [],
      mailReceived: [],
    });

    containerSignIn.style.display = "block";
    document.querySelector(".container-registration").style.display = "none";

    document.querySelector(".register-login").value = "";
    document.querySelector(".register-password").value = "";
    document.querySelector(".register-name").value = "";
  }
});

//search input

const mainSearchFunction = () => {
  clearScreen();
  let searchInputValue = searchInput.value;

  users.forEach((e) => {
    if (e.name === active) {
      e.mailSent.map((element) => {
        for (i = 0; i < element.length - 1; i++) {
          if (
            typeof element[i] === "string" &&
            element[i]
              .toLowerCase()
              .includes(
                searchInputValue.toLowerCase() || searchInputValue !== ""
              )
          ) {
            createMailsTemplates(element, "To");
            removeUnread();
          }
        }
      });
    }
  });

  users.forEach((e) => {
    if (e.name === active) {
      e.mailReceived.map((element) => {
        for (i = 0; i < element.length - 1; i++) {
          if (
            typeof element[i] === "string" &&
            element[i]
              .toLowerCase()
              .includes(
                searchInputValue.toLowerCase() || searchInputValue !== ""
              )
          ) {
            createMailsTemplates(element, "From");
          }
        }
      });
    }
  });
  searchInput.value = "";
};

const removeUnread = () => {
  document
    .querySelectorAll(".mail")
    .forEach((e) => e.classList.remove("mail__unread"));
};

searchButton.addEventListener("click", mainSearchFunction);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    mainSearchFunction();
  }
});
