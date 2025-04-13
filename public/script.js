let shortMemory = {url: null, short: null};
let baseUrl = "https://mnfy.lat/";
let api = "https://mnfy.onrender.com/"

document.querySelector('#submit')?.addEventListener('click', async () => {
  const input = document.querySelector('input');
  const warning = document.querySelector('#warning');
  const sucess = document.querySelector('#sucess');
  const url = input?.value?.trim();
  if (!url){
      warning.innerText = "Ei boboca! Cole um link pra eu minificar!"
      return warning.style.display = "block";
  } 
  if (url === shortMemory.url) {
warning.style.display = "block";
sucess.style.display = "none";
return warning.innerText = `Ei! Esse link já foi gerado! ${shortMemory.short}`;

  }

  sucess.innerText = "aguarde...";
  warning.style.display = "none";
  const res = await fetch(`${api}short`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: (url.startsWith("http://") || url.startsWith("https://")) ? url : "https://" + url
    })
  });

  const data = await res.json();
  if (data.shortLink){
      sucess.style.display = "block";
      sucess.innerHTML = `Seu link foi minificado com sucesso!<br/><span>${baseUrl}${data.shortLink}</span>`;
      shortMemory.url = url;
      shortMemory.short = `${baseUrl}${data.shortLink}`;
      return;
  } else {
      warning.style.display = "block";
      warning.innerText = "Desculpe, mas um erro ocorreu :("
      return console.log(data)
  }
});

function copy(){
  const link = document.querySelector('#sucess span');
  navigator.clipboard.writeText(link.innerText).then(() => {
    alert('Texto copiado!');
  }).catch(err => {
    console.error('Falha ao copiar: ', err);
  });
}