var baseURL = "https://realtime-chat-4a438-default-rtdb.firebaseio.com/"
var username = "";
var destinatario = "";
var novaMensagem = "";
function users() {
    username = document.getElementById("idUsername").value;
    destinatario = document.getElementById("idDestinatario").value;
    if (username == "" || destinatario == "" || username == destinatario) {
        alert("Digite nomes de usuario corretos!")
        return;
    }
    displayUsers()
}
function enviarMensagem() {
    entrada = document.getElementById("mensagem").value;
    if (entrada == "") {
        return;
    }
    console.log(entrada);
    console.log(username);
    console.log(destinatario);
    fetch(baseURL+"mensagens.json", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            mensagem: entrada,
            remetente: username,
            destinatario: destinatario,
        }),
    })
}

function atualizarMensagens() {
    mensagensURL = `${baseURL}/mensagens.json`;
    fetch(mensagensURL)
        .then((response) => response.json())
        .then((data) => {
            Object.values(data).forEach((item) => {
                if (item.destinatario == destinatario && item.remetente == username) {
                    novaMensagem += "<div class='enviada'><p>" + item.mensagem + "</p></div>";
                }
                if (item.destinatario == username && item.remetente == destinatario) {
                    novaMensagem += "<div class='recebida'><p>" + item.mensagem + "</p></div>";
                }
            })
            if (document.getElementById("mensagens") != "" || novaMensagem != "") {
                document.getElementById("mensagens").innerHTML = novaMensagem;
                novaMensagem = "";
            }
        })
}

function displayUsers() {
    document.getElementById("nomeRemetente").innerHTML = username;
    document.getElementById("nomeDestinatario").innerHTML = destinatario;
    document.getElementById("sectionFormulario").style.display = "none";
    document.getElementById("sectionNomes").style.display = "block";
    document.getElementById("sectionMensagens").style.display = "block";
    setInterval(atualizarMensagens, 1000);
}

function removerTagsHTML(input) {
    var textoSemTags = input.value.replace(/<\/?[^>]+(>|$)/g, "");
    input.value = textoSemTags;
}
