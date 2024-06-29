let numInputs = document.querySelectorAll('.bht input');
numInputs.forEach((e)=>{
  e.addEventListener('input',()=>{
    if(e.value.length > 3){
      if(+e.value > 1000){
        e.value = e.value.slice(0,3)
        return false;
      }
    }
  })
})