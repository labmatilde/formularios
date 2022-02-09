'use strict'

M.AutoInit();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        "defaultDate": new Date(1988, 1, 1),
        "maxDate": new Date(),
        "yearRange": 50
    });
});


document.getElementById("cep").addEventListener("change", busca_cep);
document.getElementById("cep-rep").addEventListener("change", busca_cep_representante);

document.getElementById("nascimento").addEventListener("change", verifica_idade);
document.getElementById("nascimento-rep").addEventListener("change", verifica_idade_representante);

function verifica_idade_representante() {
    const birthday = new Date(document.getElementById("nascimento-rep").value);
    const now = new Date();

    var anos = now.getFullYear() - birthday.getFullYear();
    if (now.getMonth() < birthday.getMonth() || now.getMonth() == birthday.getMonth() &&
        now.getDate() < birthday.getDate()) {
        anos--;
    }
    if (anos < 18) {
        document.getElementById("nascimento-rep").value = null;
        alert("Representante precisa ser maior de 18 anos de idade");
    }
}

function verifica_idade() {

    const birthday = new Date(document.getElementById("nascimento").value);
    const now = new Date();

    var anos = now.getFullYear() - birthday.getFullYear();
    if (now.getMonth() < birthday.getMonth() || now.getMonth() == birthday.getMonth() &&
        now.getDate() < birthday.getDate()) {
        anos--;
    }
    if (anos < 18) {
        document.getElementById("menor-idade").style.display = "block";
        document.querySelectorAll(".years-old").forEach(elem => {
            elem.required = true;
        });
        document.getElementById("idade").value = 'Declaro ser menor de 18 anos';
    } else {
        document.getElementById("idade").value = 'Declaro ser maior de 18 anos';
    }

}

function busca_cep() {
    const value = document.getElementById("cep").value;
    if (value.length == 8) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", `https://viacep.com.br/ws/${value}/json/`, true);
        xhr.send();
        xhr.onload = () => {
            document.getElementById("endereco").value = xhr.response.logradouro
            document.getElementById("bairro").value = xhr.response.bairro
            document.getElementById("cidade").value = xhr.response.localidade
            document.getElementById("estado").value = xhr.response.uf
            document.getElementById("pais").value = 'Brasil'
        };
        xhr.onprogress = (event) => {
            console.log(`Loaded ${event.loaded} of ${event.total}`);
        };
        xhr.onerror = () => {
            console.log("Request failed!");
        };
    }
}

function busca_cep_representante() {
    const value = document.getElementById("cep-rep").value;
    if (value.length == 8) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", `https://viacep.com.br/ws/${value}/json/`, true);
        xhr.send();
        xhr.onload = () => {
            document.getElementById("endereco-rep").value = xhr.response.logradouro
            document.getElementById("bairro-rep").value = xhr.response.bairro
            document.getElementById("cidade-rep").value = xhr.response.localidade
            document.getElementById("estado-rep").value = xhr.response.uf
            document.getElementById("pais-rep").value = 'Brasil'
        };
        xhr.onprogress = (event) => {
            console.log(`Loaded ${event.loaded} of ${event.total}`);
        };
        xhr.onerror = () => {
            console.log("Request failed!");
        };
    }
}

document.querySelectorAll(".mask-cpf").forEach(elem => {
    elem.addEventListener('input', (e) => {
        if (e.target.value.length < 11) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
            e.target.value = `${x[1]}.${x[2]}.${x[3]}-${x[4]}`
        }
    })
});

document.querySelectorAll(".mask-phone").forEach(elem => {
    elem.addEventListener('input', (e) => {
        if (e.target.value.length < 11) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{2})(\d{1})(\d{4})(\d{4})/);
            e.target.value = `+55 ${x[1]} ${x[2]} ${x[3]}-${x[4]}`
        }
    })
});

document.querySelectorAll(".check-phone").forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (e.target.checked) {
            document.querySelectorAll(".solicitante").forEach(solic => {
                var whatsapp = document.getElementById("whatsapp");
                if (solic.value != "" && solic.value != 'on') {
                    whatsapp.value = solic.value;
                    //whatsapp.disabled = true
                }
            });
        }
    });
});


document.querySelectorAll(".check-address").forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (e.target.checked) {
            document.getElementById('cep-rep').value = document.getElementById('cep').value;
            document.getElementById('numero-rep').value = document.getElementById('numero').value;
            document.getElementById('complemento-rep').value = document.getElementById('complemento').value;
        }
    });
});

console.log("rg " + document.querySelectorAll(".mask-rg"));
console.log("cep " + document.querySelectorAll(".mask-cep"));
console.log("birth " + document.querySelectorAll(".mask-birthplace"));
console.log("nat " + document.querySelectorAll(".mask-nationality"));
console.log("name " + document.querySelectorAll(".mask-full-name"));
console.log("check-address " + document.querySelectorAll(".check-address"));



/*
.addEventListener('input', (e) => {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '-' + x[4];
});*/




bairro: "Jardim Santa Terezinha (Zona Leste)"
cep: "03572-020"
complemento: ""
ddd: "11"
gia: "1004"
ibge: "3550308"
localidade: "São Paulo"
logradouro: "Avenida Olga Fadel Abarca"
siafi: "7107"
uf: "SP"