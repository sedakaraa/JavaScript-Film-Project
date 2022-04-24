const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films"); 



// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);   // submit olduğunda bir tane addFilm event i çalışsın diyoruz.
    document.addEventListener("DOMContentLoaded", function(){ 
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
  cardbody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}


function addFilm(e){
 const title = titleElement.value;  // input alanımızdan değerimizi alıyoruz title ın .
 const director = directorElement.value;  // director : yönetmen demek.
 const url = urlElement.value;


 if (title === "" || director === "" || url === ""){  // title boşsa veya director boşsa veya url boşsa 
                                                      // direkt hata mesajı gelicek.

    // hata
    UI.displayMessages("Tüm alanları doldurun...","danger")
 }  
 else {
     // Yeni film 
     const newFilm = new Film(title, director,url);

     UI.addFilmToUI(newFilm); // Arayüze film ekleme
     // 9. satırda oluşturduğumuz uı objesi üzerinde bir tane fonksiyon oluşturcaz
   // filmi burda göndererek arayüze eklicez.
     storage.addFilmToStorage(newFilm);  // storage a film ekleme

     UI.displayMessages("Film başarıyla eklendi...", "success")
   

 }


 UI.clearInputs(titleElement, urlElement, directorElement);


    e.preventDefault();  
}



function deleteFilm(e){

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
       
        UI.displayMessages("Silme işlemi başarılı...", "success");
    }
}
function clearAllFilms(){
    if (confirm("eminmisiniz ? ")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage(); 
    }

}