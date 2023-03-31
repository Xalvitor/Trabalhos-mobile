window.addEventListener("DOMContentLoaded", (event) => {

    const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
    const endpointMarcas = `${baseUrl}carros/marcas`

    const marcasList = document.querySelector("#vehicles_brand")
    const modeloList = document.querySelector("#vehicles_model")
    const anosList = document.querySelector("#vehicles_year")

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

});