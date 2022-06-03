const fileInput= document.getElementById("image")
const dragZone= document.getElementById("result-image")
const img= document.getElementById("img-result")

dragZone.addEventListener('click', () => fileInput.click)
dragZone.addEventListener('dragover', () => {
    e.preventDefault()
    //dragZone.classList.add("classname styles")
    
})
dragZone.addEventListener('dragleave', () => {
    e.preventDefault()
    //dragZone.classList.remove("classname styles")
    
})

export const uploadImage = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.addEventListener('load', (e) => {
        img.setAttribute('src', e.target.result)
        console.log(e.target)
    })
}

dragZone.addEventListener('drop', () => {
    e.preventDefault()

    fileInput.files = e.dataTransfer.files
    const file = fileInput.files[0]
    console.log(file)
    uploadImage(file)
})
