let branches = [];

const branchContainer =
document.getElementById("branches");

const branchCount =
document.getElementById("branchCount");

function spawnBranch(){

    const id = Date.now();

    branches.push(id);

    stability -= 5;

    if(stability < 0){
        stability = 0;
    }

    renderBranches();

    updateUI();
}

function renderBranches(){

    branchContainer.innerHTML = "";

    branches.forEach(id => {

        const div =
        document.createElement("div");

        div.className = "branch";

        div.innerHTML = `
            Timeline Branch
            <br><br>
            <button onclick="pruneBranch(${id})">
                Prune
            </button>
        `;

        branchContainer.appendChild(div);

    });

    branchCount.textContent =
    branches.length;
}

function pruneBranch(id){

    branches =
    branches.filter(
        branch => branch !== id
    );

    stability += 5;

    if(stability > 100){
        stability = 100;
    }

    renderBranches();

    updateUI();
}

setInterval(() => {

    spawnBranch();

},15000);