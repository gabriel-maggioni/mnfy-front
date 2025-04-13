let baseUrl = "https://mnfy.lat/";
let api = "https://mnfy.onrender.com/";

function isValidUrl(url) {
  try {
    if (url.startsWith("http") && url.includes(".")) {
      return true;
    }
  } catch {
    return false;
  }
}

function getStoredUrl() {
  return {
    url: localStorage.getItem('lastUrl'),
    short: localStorage.getItem('lastShort'),
  };
}

function setStoredUrl(url, short) {
  localStorage.setItem('lastUrl', url);
  localStorage.setItem('lastShort', short);
}

document.querySelector('#submit')?.addEventListener('click', async () => {
  const input = document.querySelector('input');
  const warning = document.querySelector('#warning');
  const sucess = document.querySelector('#sucess');
  const url = input?.value?.trim();
  const { url: lastUrl, short: lastShort } = getStoredUrl();

  if (!url) {
    warning.innerText = "Ei boboca! Cole um link pra eu minificar!";
    return warning.style.display = "block";
  }

  if (url === lastUrl) {
    warning.style.display = "block";
    sucess.style.display = "none";
    return warning.innerText = `Ei! Esse link já foi gerado! ${lastShort}`;
  }

  if (!isValidUrl(url)) {
    warning.style.display = "block";
    sucess.style.display = "none";
    return warning.innerText = `Ei cara, isso aí não é uma URL válida`;
  }

  sucess.innerText = "aguarde...";
  warning.style.display = "none";

  const res = await fetch(`${api}short`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: (url.startsWith("http://") || url.startsWith("https://")) ? url : "https://" + url,
    }),
  });

  const data = await res.json();

  if (data.shortLink) {
    const short = `${baseUrl}${data.shortLink}`;
    sucess.style.display = "block";
    sucess.innerHTML = `Seu link foi minificado com sucesso!<br/><span>${short}</span>`;
    setStoredUrl(url, short);
  } else {
    warning.style.display = "block";
    warning.innerText = "Desculpe, mas um erro ocorreu :(";
    console.log(data);
  }
});

function copy() {
  const link = document.querySelector('#sucess span');
  navigator.clipboard.writeText(link?.innerText || "").then(() => {
    alert('Texto copiado!');
  }).catch(err => {
    console.error('Falha ao copiar: ', err);
  });
}
