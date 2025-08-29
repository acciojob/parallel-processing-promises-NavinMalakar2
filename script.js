//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading= document.getElementById("loading");
const errorDiv= document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadimg(url) {
	return new Promise((res,rej)=>{
		const img = new Image();
		img.src=url;

		img.onload=()=>res(img);
		img.onerror=()=>rej(new Error(`Faild to img download: ${url}`));
		
	})
}


async function downloadIMGS(urls) {
	output.innerHTML="";
	errorDiv.textContent="";
	loading.style.display="block";

	try {
		let imgs =await Promise.all(urls.map(obj=>downloadimg(obj.url)));
		loading.style.display="none";
		imgs.forEach(img=>output.appendChild(img));
	} catch (error) {
		loading.style.display = "none";
          errorDiv.textContent = error.message;
	}
}
btn.addEventListener("click",()=>{
	downloadIMGS(images);
})