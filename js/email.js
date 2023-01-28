//update this with your js_form selector
var form_id_js = "contact_form";

var data_js = {
    "access_token": "yq6wdlguwtkorck3s101eqs3"
};

function js_onSuccess() {
    sendButton.value = 'Sent!';
}

function js_onError(error) {
    sendButton.value = 'Error!';
}

var sendButton = document.getElementById("js_send");

function js_send() {
    sendButton.value = 'Sending…';
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else if (request.readyState == 4) {
            js_onError(request.response);
        }
    };

    var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
    var message = document.querySelector("#" + form_id_js + " [name='text']").value;
    var email = document.querySelector("#" + form_id_js + " [name='email']").value;
    var phone = document.querySelector("#" + form_id_js + " [name='phone']").value;
    data_js['subject'] = subject;
    data_js['text'] = message;
    data_js['extra_email'] = email;
    data_js['extra_phone'] = phone;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});