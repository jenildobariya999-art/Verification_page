let p = 0;

const bar = document.getElementById("bar");
const txt = document.getElementById("percent");

const timer = setInterval(async () => {

  p++;

  bar.style.width = p + "%";
  txt.innerHTML = p + "%";

  if (p >= 100) {

    clearInterval(timer);

    const params = new URLSearchParams(location.search);

    const webhook = params.get("webhook");

    const res = await fetch("/api/verify", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        webhook:webhook
      })
    });

    const data = await res.json();

    if(data.success){
      location.href="success.html";
    }else{
      location.href="failed.html";
    }
  }

},40);
