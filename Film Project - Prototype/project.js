const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films"); 

// UI Objesini Başlatma
const ui = new UI();   // uı kullanıcının gördüğü yer.

// Storage Objesi üret 
const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);   // submit olduğunda bir tane addFilm event i çalışsın diyoruz.
    document.addEventListener("DOMContentLoaded", function(){ 
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
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
    ui.displayMessages("Tüm alanları doldurun...","danger")
 }  
 else {
     // Yeni film 
     const newFilm = new Film(title, director,url);

     ui.addFilmToUI(newFilm); // Arayüze film ekleme
     // 9. satırda oluşturduğumuz uı objesi üzerinde bir tane fonksiyon oluşturcaz
   // filmi burda göndererek arayüze eklicez.
     storage.addFilmToStorage(newFilm);  // storage a film ekleme

     ui.displayMessages("Film başarıyla eklendi...", "success")
   

 }


 ui.clearInputs(titleElement, urlElement, directorElement);


    e.preventDefault();  
}



function deleteFilm(e){

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
       
        ui.displayMessages("Silme işlemi başarılı...", "success");
    }
}
function clearAllFilms(){
    if (confirm("eminmisiniz ? ")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage(); 
    }

}