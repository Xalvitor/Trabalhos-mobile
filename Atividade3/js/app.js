window.addEventListener("DOMContentLoaded", (event) => {

    const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
    const endpointMarcas = `${baseUrl}carros/marcas`

    const marcasList = document.querySelector("#vehicles_brand")
    const modeloList = document.querySelector("#vehicles_model")
    const anosList = document.querySelector("#vehicles_year")
    const searchButton = document.querySelector('#search_button')
    const modal = document.querySelector('#modal')
    const fechar = document.querySelector('#fechar')
    const price = document.querySelector('#price')

    fetch(endpointMarcas)
        .then((res)=>{
            
            return res.json()
            
        }).then((data)=> {

            data.map((marca)=>{

                let listItem = document.createElement("option")
                listItem.innerText = marca.nome
                listItem.value = marca.codigo
                marcasList.appendChild(listItem)
        
            })
        })
    
    marcasList.addEventListener("change", function () {

        modeloList.innerHTML = "";
        anosList.innerHTML = "";
        searchButton.classList.add('hide')
        fetch(`${endpointMarcas}/${this.value}/modelos`)
            .then((resp) => {

                return resp.json()

            }).then((data) => {

                modeloList.appendChild(document.createElement("option"))
                data.modelos.map((modelo)=>{

                    let listItem = document.createElement("option")
                    listItem.innerText = modelo.nome
                    listItem.value = modelo.codigo
                    modeloList.appendChild(listItem)

                })

            })

    })

    modeloList.addEventListener("change", () => {

        anosList.innerHTML = "";
        searchButton.classList.add('hide')
        fetch(`${endpointMarcas}/${marcasList.value}/modelos/${modeloList.value}/anos`)
            .then((resp) => {
                return resp.json()
            }).then((data) => {

                anosList.appendChild(document.createElement("option"))

                data.map((anos)=>{
                    let listItem = document.createElement("option")
                    listItem.innerText = anos.nome
                    listItem.value = anos.codigo
                    anosList.appendChild(listItem)
                })

            })
    })    
    anosList.addEventListener("change", () =>{


        if(!anosList.value){
            searchButton.classList.add('hide')
        }else{
            searchButton.classList.remove('hide')
        }
        

    })

    searchButton.addEventListener("click", () =>{

        if(!anosList.value){
            return;
        }

        modal.classList.remove('hide_modal')

        fetch(`${endpointMarcas}/${marcasList.value}/modelos/${modeloList.value}/anos/${anosList.value}`)
        .then((resp) => {
            return resp.json()
        }).then((data) => {
            price.innerHTML = data.Valor
            document.getElementById('valueMesReferencia').innerHTML = data.MesReferencia
            document.getElementById('valueFipe').innerHTML = data.CodigoFipe
            document.getElementById('valueAno').innerHTML = data.AnoModelo
            document.getElementById('valueMarca').innerHTML = data.Marca
        })

        console.log(anosList)
        var value = anosList.options[anosList.selectedIndex].value
        var text = anosList.options[anosList.selectedIndex].text


    })

    fechar.addEventListener("click", () =>{

        if(!anosList.innerHTML){
            return;
        }
        console.log(modal.classList)
        modal.classList.add('hide_modal')
    })
});

