window.addEventListener("load", function() {
    document.getElementById('pw-gen-form').addEventListener("submit", function(e) {
      e.preventDefault(); // before the code
      var charList = "";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const specialChars = "!@#$%^&*()_-+=";

    if ( document.getElementById('lowercase').checked == true ) {
        charList += lowercase;
    }
    if ( document.getElementById('uppercase').checked == true ) {
        charList += uppercase;
    }
    if ( document.getElementById('numbers').checked == true ) {
        charList += numbers;
    }
    if ( document.getElementById('special').checked == true ) {
        charList += specialChars;
    }

    var pwLength = document.getElementById("lengthText").value;
    document.getElementById("output-p").innerHTML = "Generated password: <br>";
    document.getElementById("output-t").value = generatePW(pwLength, charList);
    })
  });


function generatePW(length, charList) {
    var result = "";
    for (var i = 0; i < length; i++) {
        result += charList.charAt(Math.floor(Math.random() * charList.length));
    }
    return result;

}