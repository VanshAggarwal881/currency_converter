url = "https://v6.exchangerate-api.com/v6/4a5e50b447207b8ef78842a6/latest"
const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector('form button')

const fromcurr = document.querySelector('.from select')
const tocurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')



// for (const currcode in countryList) {
//     console.log(currcode);
    
// }
for (const select of dropdowns) {
    for (const currcode in countryList) {
       let newoption = document.createElement('option')
       newoption.value = currcode
       newoption.innerText = currcode
       if (select.name === 'from' && currcode === 'USD') {
        newoption.selected = 'selected'
       }else if (select.name === 'to' && currcode === 'INR') {
        newoption.selected = 'selected'
       }
       select.append(newoption)
    //    console.log(newoption);
    }

    select.addEventListener('change',(e)=>{
        updateflag(e.target)
    })
}

const updateflag = (element)=>{
    // console.log(element); // select element
    let currcode = element.value;
    // console.log(currcode); // inr jpy
    // finding country code to update the images of the flags
    let countrycode = countryList[currcode]
    // console.log(countrycode); // in us 
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newsrc

};



btn.addEventListener('click',async (e)=>{
    e.preventDefault();
    let amount = document.querySelector('.amount input')
    let amtval = amount.value
    // console.log(amtval);
    if (amtval === '' || amtval < 1) {
        amtval = 1
        amount.value ='1'
        
    }

    // console.log(fromcurr.value ,  tocurr.value);
    mainurl = `${url}/${fromcurr.value}`
    let response = await fetch(mainurl)
    let data = await response.json()
    // console.log(data);
    // console.log(data.base_code);
    // console.log(data['base_code']);
    newcurr = tocurr.value
    // console.log(newcurr);
    dataconversion = data.conversion_rates
    rate = [dataconversion[newcurr]]
    // console.log(dataconversion[newcurr]);
    
    let finalamount = amtval * rate
    console.log(finalamount);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${newcurr}`
})