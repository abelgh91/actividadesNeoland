import fs from "fs"
import puppeteer from "puppeteer"
import inquirer from "inquirer"

const scrapping = async (keyWord) => {
    const BASE_URL =  "https://www.tantanfan.com/";

    const browser = await puppeteer.launch({
        headless: false,
     defaultViewport: null,
     args: ["--start-maximized"],
     });

   // vamos a abrir una pagina en el navegador

   const page = await browser.newPage();

   page.on('dialog', async (dialog) => {
    if (dialog.type() === 'confirm') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });

   // una vez abierta la pagina hay que navegar hasta la url de BASE_URL
   await page.goto(BASE_URL);
 
   // esperamos un poco tiempo a que se cargen todos los elementos de la pagina
   await page.waitForTimeout(6000); /// ----> vamos ac esperar 6 segundos

   await page.click("#onetrust-accept-btn-handler");
   await page.waitForTimeout(6000);
   await page.click(".button-search");
   await page.type(".button-search", keyWord);
   await page.keyboard.press("Enter");
   await page.waitForTimeout(6000);

   await page.evaluate(() => {
    const element = document.querySelector(".df-branding");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });
  await page.waitForTimeout(6000);
  
  await page.waitForSelector(".df-card__main");

  const agendProducts = await page.$$eval(".df-card", (nodes)=>

  nodes.map((n)=>({
    title: n.querySelector(".df-card__title")?.innerText,
    image: n.querySelector("img.df-card__image")?.src,
    price: n.querySelector(".df-card__price")?.innerText,
  })),
  );

  console.log(agendProducts)
  agendProducts.pop();
  

  await browser.close();
}

inquirer.prompt([
    {
        name: "busqueda",
        message: "que quieres buscar?",
    }
]).then((answers)=>{
    let keyWord = answers.busqueda;
    scrapping(keyWord);
})


//----------------------OTRA PAGINA----------------------

// const scrapping = async (keyWord) => {
//   const BASE_URL =  "https://www.futbolemotion.com/";

//   const browser = await puppeteer.launch({
//       headless: false,
//    defaultViewport: null,
//    args: ["--start-maximized"],
//    });

//  // vamos a abrir una pagina en el navegador

//  const page = await browser.newPage();

//  page.on('dialog', async (dialog) => {
//   if (dialog.type() === 'confirm') {
//     await dialog.accept();
//   } else {
//     await dialog.dismiss();
//   }
// });

//  // una vez abierta la pagina hay que navegar hasta la url de BASE_URL
//  await page.goto(BASE_URL);

//  // esperamos un poco tiempo a que se cargen todos los elementos de la pagina
//  await page.waitForTimeout(6000); /// ----> vamos ac esperar 6 segundos

//  await page.click("#onetrust-accept-btn-handler")
//  await page.click("#caja_buscador");
// //  await page.waitForTimeout(6000);
//  await page.click(".fa-kit fa-search navbar-buscador-submit");
//  await page.type("#caja_buscador", keyWord);
//  await page.keyboard.press("Enter");
// //  await page.waitForTimeout(6000);

//  await page.evaluate(() => {
//   const element = document.querySelector(".d-inline-flex w-100 w-xl-auto mt-3 mx-auto mt-xl-0");
//   const y = element.getBoundingClientRect().top + window.pageYOffset;
//   window.scrollTo({ top: y });
// });
// await page.waitForTimeout(6000);

// await page.waitForSelector(".col-12 col-md-8 col-xxl-6 my-3 producto-listado position-relative px-2");

// const shirtProducts = await page.$$eval("producto-listado-imagen", (nodes)=>

// nodes.map((n)=>({
//   title: n.querySelector(".text-secondary")?.innerText,
//   image: n.querySelector(".w-100 blend-multiply p-1")?.src,
//   price: n.querySelector(".precio fw-bold")?.innerText,
// })),
// );

// console.log(shirtProducts)
// shirtProducts.pop();


// await browser.close();
// }

// inquirer.prompt([
//   {
//       name: "busqueda",
//       message: "que quieres buscar?",
//   }
// ]).then((answers)=>{
//   let keyWord = answers.busqueda;
//   scrapping(keyWord);
// })