const url = 'findato.json';

        const query = new URLSearchParams(window.location.search)
        const params = query.get('Id')

        document.addEventListener('DOMContentLoaded', (e) => {
            getForIdCompanie()
        });

        const getForIdCompanie = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()

                console.log(data)

                const filterData = data.data.filter(item => item.Id === params)
                console.log(filterData)

                renderForId(filterData)
            } catch (error) {
                console.error(error)
            }
        }

        const companieData = document.querySelector('#details')

        const renderForId = (data) => {
            let element = '';

            for(let [index, item] of data.entries()) {
                element += `
                <div class="col-md-10 col-sm-12 col-lg-10 col-xl-10 col-xxl-10 mt-3 mx-auto">
                <div class="card shadow-lg">
                    <div class="card-header">ID: ${item.Id}</div>
                    <div class="card-body">
                        <h5 class="card-title">
                            Empresa: ${item.Empresa} - Título: ${item.Titulo}
                        </h5>
                        <h5 class="card-title">
                           Categoría: ${item.CatName}
                        </h5>
                        <p class="card-text">
                            Puesto: ${item.Puesto} - ${item.TipoEmpleo}
                        </p>
                        <p class="card-text">
                            Ciudad y Estado: ${item.UbicacionCiudad} - ${item.UbicacionEstado}
                        </p>
                        <p>
                            Sueldo: ${item.Sueldo} ${item.Moneda}
                        </p>
                        
                        Descripción: <p>${item.Descri}</p>

                        <p>
                            <a href="/" class="btn btn-primary">Regresar</a>    
                        </p>
                    </div>
                </div>
            </div>
                `
            }

            companieData.innerHTML = element;
        }
        