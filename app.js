        const url = 'findato.json';

        const results = document.querySelector('#results');
        const inputSearch = document.querySelector('#searchInput');
    

        let companies = [];
        
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            console.log({ scrollTop, scrollHeight, clientHeight });

            if(clientHeight + scrollTop >= clientHeight - 5) {
                loadCompanies();
            }
        }); 

        function showLoading() {
	        loading.classList.add('show');
	
            setTimeout(getPost, 1000)
        }

        window.addEventListener('DOMContentLoaded', async () => {
            results.innerHTML = '<h1>Cargando...</h1>';


            const data = await loadCompanies()
            companies = data.data;

            console.log(companies)

            renderCompanies(companies)  
        })

        inputSearch.addEventListener('keyup', (e) => {
            const newCompanies = companies.filter(company => `${company.Empresa.toLowerCase()} ${company.Titulo.toLowerCase()} ${company.Puesto.toLowerCase()}`.includes(inputSearch.value.toLowerCase()))

            renderCompanies(newCompanies);
        })

        async function loadCompanies() {
            const response = await fetch(url)
            return await response.json();
        }

        const createCompaniesItems = dataCompany => dataCompany.map(html => `
            <div class="col-md-4 col-sm-12 col-lg-4 col-xl-4 col-xxl-4 mt-3">
                <div class="card shadow-lg">
                    <div class="card-header">ID: ${html.Id}</div>
                    <div class="card-body">
                        <h5 class="card-title">
                            Empresa: ${html.Empresa} - Título: ${html.Titulo}
                        </h5>
                        <p class="card-text">
                            Puesto: ${html.Puesto}
                        </p>

                        <p>
                            <a href="detail.html?Id=${html.Id}" class="btn btn-primary">Detalle</a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="loading">
                <div class="ball"></div>    
                <div class="ball"></div>
                <div class="ball"></div>
            </div>

        `).join(' ');

        function renderCompanies(company) {
            const itemsString = createCompaniesItems(company)

            results.innerHTML = itemsString;
        }