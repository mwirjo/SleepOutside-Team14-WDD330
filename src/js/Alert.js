export default class Alert {
    // dude i'm gonna be honest i'm just ASGRBDGFSFBSKing it 
    async getAlertData() {
        const url = "/json/alerts.json";
        const response = await fetch(url);
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            this.renderAlert(result);
        }
       
    }
    // tthhbhbtthtb sure
    renderAlert(result) {
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.classList.add("alert-list");
        
        result.forEach(object => {
            section.style.background = `${object.background}`;
            const p = document.createElement("p");
            p.textContent = `${object.message}`
            p.style.color = `${object.color}`;

            section.appendChild(p);
        });
    
        main.prepend(section);    
    }
}

const alert = new Alert();
alert.getAlertData();