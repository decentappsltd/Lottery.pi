const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function auth() {
    const scopes = ["username", "payments"];
    function onIncompletePaymentFound(payment) {
      var data = {
        paymentId: payment.identifier,
        txid: payment.transaction.txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    }
    Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        const uid = auth.user.uid;
        localStorage.setItem("uid", uid);
        piLogin();
      })
    }

async function piLogin() {
  if (localStorage.uid !== undefined) {
    if (sessionStorage.userSession == undefined) {
  const config = {
    uid: localStorage.uid,
  };
    const response = await axios.post(`https://pi-lottery.herokuapp.com/login/pi`, config);
    if (response.status === 200) {
      const token = response.data.token;
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("userSession");
      sessionStorage.setItem("userSession", token);
      localStorage.setItem("userSession", token);
      myProfile();
    }
    }
  }
}

async function addUID() {
  const config = {
    uid: localStorage.uid,
  };
  const authToken = localStorage.getItem("userSession");
  const response = await axios.post(`https://pi-lottery.herokuapp.com/login/add`, config, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status === 200) {
    alert("Pi account linked to Lottery.pi");
  };
}

auth();

function testPayment() {
  alert('initiating payment');
  const payment = Pi.createPayment(
  {
    amount: 1,
    memo: "testing",
    metadata: { paymentType: "testing" }
  },
  {
    onReadyForServerApproval: function (paymentId) {
      var data = {
        paymentId: paymentId,
        txid: "",
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/approve", data)
    },
    onReadyForServerCompletion: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/complete", data)
    },
    onCancel: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    },
    onError: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    }
  }
);
}

function play_one() {
  if ( navigator.userAgent.toLowerCase().indexOf("pibrowser")<0 ) {
    alert('Please use the app in the Pi Browser to enter our draw')
    window.open("pi://www.pi-lottery.co.uk")
  }
  const authed = sessionStorage.getItem('userSession');
  if (authed == null) {
    alert('Please login first');
  } else {
  const payment = Pi.createPayment(
  {
    amount: 1,
    memo: "one ticket",
    metadata: { paymentType: "one" }
  },
  {
    onReadyForServerApproval: function (paymentId) {
      var data = {
        paymentId: paymentId,
        txid: "",
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/approve", data)
    },
    onReadyForServerCompletion: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/complete", data);
      playOne();
      const loadTimeout = setTimeout(renderTotals, 5000);
    },
    onCancel: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    },
    onError: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    }
  }
);
  }
}

function play_ten() {
  if ( navigator.userAgent.toLowerCase().indexOf("pibrowser")<0 ) {
    alert('Please use the app in the Pi Browser to enter our draw')
    window.open("pi://www.pi-lottery.co.uk")
  }
  const authed = sessionStorage.getItem('userSession');
  if (authed == null) {
    alert('Please login first');
  } else {
  const payment = Pi.createPayment(
  {
    amount: 8,
    memo: "ten tickets",
    metadata: { paymentType: "ten" }
  },
  {
    onReadyForServerApproval: function (paymentId) {
      var data = {
        paymentId: paymentId,
        txid: "",
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/approve", data)
    },
    onReadyForServerCompletion: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/complete", data);
      playTen();
      const loadTimeout = setTimeout(renderTotals, 5000);
    },
    onCancel: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    },
    onError: function (paymentId, txid) {
      var data = {
        paymentId: paymentId,
        txid: txid,
      };
      axios.post("https://pi-lottery.herokuapp.com/payment/incomplete", data);
    }
  }
);
  }
}
  
function withdraw() {
  alert('Feature not made available in Pi SDK yet..');
};

// async function won() {
//   alert('Congratulations!!! You have won a draw!!!');
//   document.getElementsByClassName('coin').style.display = 'block';
//   document.getElementsByClassName('a').style.display = 'none';
// }
