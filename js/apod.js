 const weatherCondition = document.querySelector("#user-list");
 const dataBtn = document.querySelector("#submit")
 const todayBtn = document.querySelector("#submit-today");
 const date = new Date();
 const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `;
 const apodContainer = document.querySelector("#apod-container");
 const apodBtn = document.querySelector("#apod-btn");
 const weatherContainer = document.querySelector("#weather-container");
 const body = document.querySelector("body");

 apodBtn.addEventListener("click", () => {
     apodContainer.classList.toggle("none");
     weatherContainer.classList.toggle("none");
     if (apodContainer.classList.contains("none")) {
         body.classList.toggle("apod");
         apodBtn.classList.toggle("bg-weather");
     } else if (weatherContainer.classList.contains("none")) {
         body.classList.toggle("apod");
         apodBtn.classList.toggle("bg-weather");
     }
 })


 dataBtn.addEventListener("click", (event) => {
     weatherCondition.innerHTML = "";
     const dateStart = document.querySelector("#start-date");
     const dateEnd = document.querySelector("#end-date");
     const start = dateStart.value;
     const end = dateEnd.value;
     if (end > today) {
         alert("bitiş tarihi bugünden büyük olamaz");
         console.log(today);
     } else {
         fetch(`https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=a5WUjjn7x7uYgvseBarpRgJpavlGw8Y4FufpDcbY`, {

             })
             .then(response => response.json())
             .then(json => {
                 for (const key in json) {
                     const li = document.createElement("li");
                     const img = document.createElement("img");
                     const p = document.createElement("p");
                     const h4 = document.createElement("h4")
                     const iframe = document.createElement("iframe");
                     if ((json[key].url.includes('https://www.youtube.com') || json[key].url.includes('https://player.vimeo.com'))) {

                         iframe.setAttribute("src", `${json[key].url}`)
                         iframe.classList.add("col-lg-6");
                         p.classList.add("col-lg-6");
                         p.classList.add("fl-center");
                         p.innerHTML = `${json[key].title.toUpperCase()} <br/><br/> ${json[key].explanation}`;
                         li.classList.add("row");
                         li.classList.add("fade-anim");
                         li.append(iframe);
                         li.append(p);
                         weatherCondition.append(li);
                         weatherCondition.add("fade-anim")
                     } else {
                         img.setAttribute("src", `${json[key].url}`);
                         img.classList.add("col-lg-6");
                         p.classList.add("col-lg-6");
                         p.classList.add("fl-center");
                         p.innerHTML = `${json[key].title.toUpperCase()} <br/><br/> ${json[key].explanation}`;
                         li.classList.add("row");
                         li.classList.add("fade-anim");
                         li.append(img);
                         li.append(p);
                         weatherCondition.append(li);
                         weatherCondition.classList.add("fade-anim")
                     }
                 }
             })
         console.log(end, today);
     }

 })

 todayBtn.addEventListener("click", () => {
     weatherCondition.innerHTML = "";
     showToday();
 })

 window.addEventListener("load", () => {
     showToday();
 })

 function showToday() {
     fetch(`https://api.nasa.gov/planetary/apod?api_key=a5WUjjn7x7uYgvseBarpRgJpavlGw8Y4FufpDcbY`, {})
         .then(response => response.json())
         .then(json => {
             const li = document.createElement("li");
             const img = document.createElement("img");
             const p = document.createElement("p");
             const iframe = document.createElement("iframe");
             if ((json.url.includes('https://www.youtube.com') || json.url.includes('https://player.vimeo.com'))) {
                 iframe.setAttribute("src", `${json.url}`)
                 iframe.classList.add("col-lg-6");
                 p.classList.add("col-lg-6");
                 p.classList.add("fl-center");
                 p.innerHTML = `${json.title.toUpperCase()} <br/><br/> ${json.explanation}`;
                 li.classList.add("row");
                 li.classList.add("fade-anim");
                 li.append(iframe);
                 li.append(p);
                 weatherCondition.append(li);
                 weatherCondition.classList.add("fade-anim")
             } else {
                 img.setAttribute("src", `${json.url}`);
                 img.classList.add("col-lg-6");
                 p.classList.add("col-lg-6");
                 p.classList.add("fl-center");
                 p.innerHTML = `${json.title.toUpperCase()} <br/><br/> ${json.explanation}`;
                 li.classList.add("row");
                 li.classList.add("fade-anim");
                 li.append(img);
                 li.append(p);
                 weatherCondition.append(li);
                 weatherCondition.classList.add("fade-anim")
             }
         })
 }