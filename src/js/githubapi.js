

let dataview = $('#dataview');
function getData(gitHubUser) {
    let rezultat = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            // url: `https://api.github.com/users/${gitHubUser}/repos`,
            url: `https://api.github.com/users/${gitHubUser}/repos?per_page=6&page=1&sort=updated`,
            // headers: { "Access-Control-Allow-Origin": "*" },
            dataType: 'json',
            contentType: 'application/json',

        }).done(function (data) {
            if (data.length > 0) {
                resolve(data);
            }
            else {
                reject('Error, nu s-au primit date!');
            }

        }).fail(function (status, errorThrown) {
            reject('Error: a aparut o eroare ' + JSON.stringify(status) + JSON.stringify(errorThrown))

        }).always(function () {
            console.log('Cererea a fost tratata complet.')
        });
    });
    return rezultat;
}

function showData(repos) {
    //const posts = JSON.parse(data);
    let allRepo = '';
    repos.forEach(item => {
        allRepo += `
        <div class="col-md-4">
                <div class="service-box">
                    <div class="service-ico">
                        <a href='${item.html_url}' target='_blank'>
                            <img style="max-width:100%; height:auto; aspect-ratio: 960 / 600; object-fit: contain;" src ="https://raw.githubusercontent.com/${item.owner.login}/${item.name}/${item.default_branch}/banner.png">
                        </a>
                    </div>
                    <div class="service-content">
                        <h2 class="s-title"><a href='${item.html_url}' target='_blank'>${item.name}</a></h2>
                        <p class="s-description text-center">
                        ${item.description}
                        </p>
                        <span> Date: ${item.updated_at}</span> <br>
                        <span> Programming Language: ${item.language}</span> 
                    </div>
                </div>
            </div>`
    });
    dataview.append(allRepo);
};


function isElementInViewport(el, offset = 100) {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return elementTop <= windowHeight - offset && elementBottom >= 0;
}

let githubSectionLoaded = false;

function lazyLoadGitHubRepos() {
    const workSection = document.getElementById('work');
    const dataview = document.getElementById('dataview');

    if (!githubSectionLoaded && workSection && isElementInViewport(workSection, 150)) {
        githubSectionLoaded = true;

        if (dataview) {
            dataview.style.opacity = '0';
            dataview.style.transition = 'opacity 1s ease';
        }

        getData('mihaelaraducu').then((myRepos) => {
            showData(myRepos);

            if (dataview) {
                setTimeout(() => {
                    dataview.style.opacity = '1';
                }, 50);
            }

            console.log('GitHub Repos loaded successfully.');
        }).catch((err) => {
            console.log('Failed to load GitHub repos', err);
        });

        // Dezactivez event-ul de scroll dupa ce se incarca
        window.removeEventListener('scroll', lazyLoadGitHubRepos);
    }
}

// Asculta evenimentul scroll
window.addEventListener('scroll', lazyLoadGitHubRepos);

// Adaug si pe load + DOMContentLoaded ca sa declansez daca deja e vizibil
window.addEventListener('DOMContentLoaded', lazyLoadGitHubRepos);
window.addEventListener('load', lazyLoadGitHubRepos);
