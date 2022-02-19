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
        const userName = auth.user.username;
        document.getElementById("username").innerHTML = userName;
      })
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

function play_ten() {
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
  
function withdraw() {
  alert('The Pi Core Team have not enabled this feature yet..');
};

// async function won() {
//   alert('Congratulations!!! You have won a draw!!!');
//   document.getElementsByClassName('coin').style.display = 'block';
//   document.getElementsByClassName('a').style.display = 'none';
// }